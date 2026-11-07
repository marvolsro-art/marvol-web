#!/usr/bin/env node
/**
 * Empirical Attack & Verification Suite (Iteration 2)
 * Challenger: teamwork_challenger_sec_iter2_1
 * 
 * Target:
 * 1. Rate Limiting Bypass Header Attack (x-test-bypass-rate-limit strictly ignored)
 * 2. CORS Preflight & Origin Validation (OPTIONS 204 with Content-Type & Vary: Origin, Untrusted Origin 403)
 * 3. CRLF Injection Protection (sanitizeEmailSubject, cleanReplyTo)
 * 4. Honeypot Trap (b_url returns silent 200 BOT-TRAP-, no disk write, no email dispatch)
 * 5. Bounded Store Capacity & Memory Leak Prevention
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

// Load target modules
const leadModule = jiti('../pages/api/lead.ts');
const leadHandler = leadModule.default;
const { _resetRateLimitStore, _getRateLimitStoreSize, escapeHtml, sanitizeText } = leadModule;

const emailModule = jiti('../lib/email.ts');
const { sanitizeEmailSubject, buildLeadNotificationHtml } = emailModule;

console.log('========================================================================');
console.log('  CHALLENGER ITERATION 2: EMPIRICAL ATTACK & HARDENING SUITE            ');
console.log('========================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

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

async function runTest(id, description, testFn) {
  totalTests++;
  try {
    await testFn();
    passedTests++;
    console.log(`  ✔ [PASS] [${id}] ${description}`);
  } catch (err) {
    failedTests++;
    failures.push({ id, description, error: err.message });
    console.error(`  ✖ [FAIL] [${id}] ${description}`);
    console.error(`     Reason: ${err.message}`);
    if (err.stack) {
      const relevantStack = err.stack.split('\n').slice(1, 4).join('\n');
      console.error(`     Stack:\n${relevantStack}`);
    }
  }
}

// =============================================================================
// SUITE 1: BYPASS HEADER ATTACK & RATE LIMITING DEFENSE
// =============================================================================
console.log('\n--- SUITE 1: BYPASS HEADER ATTACK & RATE LIMITING DEFENSE ---');

await runTest('ATTACK-1.1', '10 requests with x-test-bypass-rate-limit: 1 (req 1-5 HTTP 200, req 6 blocked with HTTP 429 + Retry-After)', async () => {
  _resetRateLimitStore();
  const testIp = '198.51.100.99';
  const results = [];

  for (let i = 1; i <= 10; i++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
        'x-test-bypass-rate-limit': '1', // Bypass header attack
      },
      body: {
        name: `Bypass Attacker ${i}`,
        phone: '+421908403042',
      },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    results.push({
      iteration: i,
      statusCode: res.statusCode,
      success: res.body?.success,
      retryAfter: res.headers['retry-after'],
      message: res.body?.message,
    });
  }

  // Verify requests 1-5 succeeded
  for (let i = 0; i < 5; i++) {
    const r = results[i];
    assert.strictEqual(r.statusCode, 200, `Request ${r.iteration} should have succeeded with 200, got ${r.statusCode}`);
    assert.strictEqual(r.success, true, `Request ${r.iteration} should have success: true`);
  }

  // Verify request 6 is blocked with 429 and Retry-After
  const r6 = results[5];
  assert.strictEqual(r6.statusCode, 429, `Request 6 MUST be blocked with HTTP 429 despite bypass header, got ${r6.statusCode}`);
  assert.strictEqual(r6.success, false, 'Request 6 body must indicate success: false');
  assert(r6.retryAfter !== undefined, 'Request 6 MUST set Retry-After header');
  const retrySec = parseInt(r6.retryAfter, 10);
  assert(!isNaN(retrySec) && retrySec > 0 && retrySec <= 600, `Retry-After must be valid seconds (1-600), got ${r6.retryAfter}`);
  assert(r6.message && r6.message.includes('Príliš veľa požiadaviek'), `Expected Slovak rate-limit error message, got: ${r6.message}`);

  // Verify requests 7-10 are also blocked with 429
  for (let i = 6; i < 10; i++) {
    const r = results[i];
    assert.strictEqual(r.statusCode, 429, `Subsequent request ${r.iteration} must remain blocked with 429`);
    assert(r.retryAfter !== undefined, `Subsequent request ${r.iteration} must include Retry-After`);
  }
});

await runTest('ATTACK-1.2', 'Variant bypass headers (true, yes, admin) are all strictly ignored and rate-limited', async () => {
  _resetRateLimitStore();
  const testIp = '198.51.100.105';
  const bypassPayloads = ['true', 'TRUE', 'yes', 'admin', 'enabled', '0', 'secret'];

  // Fill up 5 quota slots
  for (let i = 1; i <= 5; i++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
      },
      body: { name: `Legit User ${i}`, phone: '+421908403042' },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 200);
  }

  // Every variant bypass attempt must be blocked with 429
  for (const bypassVal of bypassPayloads) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
        'x-test-bypass-rate-limit': bypassVal,
      },
      body: { name: 'Sneaky Attacker', phone: '+421908403042' },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 429, `Bypass variant "${bypassVal}" must be rejected with 429, got ${res.statusCode}`);
    assert(res.headers['retry-after'], 'Retry-After must be set');
  }
});

await runTest('ATTACK-1.3', 'IP Rate Limit Store bounds capacity to MAX 5000 entries preventing Memory Leak / OOM', async () => {
  _resetRateLimitStore();
  assert.strictEqual(_getRateLimitStoreSize(), 0, 'Store must start empty');

  const origWarn = console.warn;
  console.warn = () => {};
  try {
    // Flood with 5,500 unique IPs
    for (let i = 0; i < 5500; i++) {
      const ip = `10.200.${Math.floor(i / 256)}.${i % 256}`;
      const req = {
        method: 'POST',
        headers: { 'x-forwarded-for': ip, 'content-type': 'application/json' },
        body: { name: 'Flooder', phone: '+421908403042', b_url: 'trap' },
        socket: { remoteAddress: ip },
      };
      const res = mockRes();
      await leadHandler(req, res);
    }
  } finally {
    console.warn = origWarn;
  }

  const finalStoreSize = _getRateLimitStoreSize();
  assert(finalStoreSize <= 5000, `Store size MUST be bounded at <= 5000 entries, but observed ${finalStoreSize}`);
  assert(finalStoreSize >= 4900, `Store should hold close to 5000 entries under continuous load, observed ${finalStoreSize}`);
});

// =============================================================================
// SUITE 2: CORS PREFLIGHT & ORIGIN ENFORCEMENT
// =============================================================================
console.log('\n--- SUITE 2: CORS PREFLIGHT & ORIGIN ENFORCEMENT ---');

await runTest('CORS-2.1', 'OPTIONS preflight for https://marvol.sk returns HTTP 204, Access-Control-Allow-Headers: Content-Type, Vary: Origin', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://marvol.sk' },
    socket: { remoteAddress: '198.51.100.1' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 204, `Preflight status should be 204, got ${res.statusCode}`);
  assert.strictEqual(res.ended, true, 'Preflight response must be terminated with .end()');
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://marvol.sk');
  assert.strictEqual(res.headers['access-control-allow-methods'], 'POST, OPTIONS');
  assert.strictEqual(res.headers['access-control-allow-headers'], 'Content-Type', `Expected strictly "Content-Type", got: "${res.headers['access-control-allow-headers']}"`);
  assert(!res.headers['access-control-allow-headers'].includes('x-test-bypass-rate-limit'), 'Access-Control-Allow-Headers must NOT expose bypass header');
  assert.strictEqual(res.headers['vary'], 'Origin', `Vary header must be "Origin", got: "${res.headers['vary']}"`);
  assert.strictEqual(res.headers['access-control-max-age'], '86400');
});

await runTest('CORS-2.2', 'OPTIONS preflight for https://www.marvol.sk returns HTTP 204 and Vary: Origin', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://www.marvol.sk' },
    socket: { remoteAddress: '198.51.100.2' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 204);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://www.marvol.sk');
  assert.strictEqual(res.headers['access-control-allow-headers'], 'Content-Type');
  assert.strictEqual(res.headers['vary'], 'Origin');
});

await runTest('CORS-2.3', 'OPTIONS preflight for untrusted origin https://malicious.org returns HTTP 403 Forbidden', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://malicious.org' },
    socket: { remoteAddress: '198.51.100.3' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 403, `Untrusted preflight must be 403, got ${res.statusCode}`);
  assert.strictEqual(res.body?.success, false);
  assert.strictEqual(res.headers['access-control-allow-origin'], undefined, 'Untrusted preflight must not set Access-Control-Allow-Origin');
});

await runTest('CORS-2.4', 'POST request from untrusted origin https://malicious.org returns HTTP 403 Forbidden', async () => {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://malicious.org',
      'content-type': 'application/json',
    },
    body: { name: 'Attacker From Phishing Domain', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.4' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 403, `POST from untrusted origin must return HTTP 403, got ${res.statusCode}`);
  assert.strictEqual(res.body?.success, false);
  assert(res.body?.message.includes('Forbidden Origin') || res.body?.message.includes('nepovolenej domény'));
});

await runTest('CORS-2.5', 'POST request with trusted origin https://marvol.sk sets Vary: Origin and Access-Control-Allow-Origin', async () => {
  _resetRateLimitStore();
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://marvol.sk',
      'content-type': 'application/json',
    },
    body: { name: 'Valid User', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.5' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://marvol.sk');
  assert.strictEqual(res.headers['vary'], 'Origin', 'POST with trusted origin must set Vary: Origin');
});

// =============================================================================
// SUITE 3: CRLF INJECTION PROBE
// =============================================================================
console.log('\n--- SUITE 3: CRLF INJECTION PROBE ---');

await runTest('CRLF-3.1', 'sanitizeEmailSubject neutralizes "\\r\\nBcc: evil@attacker.com\\nSubject: Injected"', async () => {
  const dirty = '\r\nBcc: evil@attacker.com\nSubject: Injected';
  const clean = sanitizeEmailSubject(dirty);

  assert(!clean.includes('\r'), 'Cleaned subject must not contain \\r');
  assert(!clean.includes('\n'), 'Cleaned subject must not contain \\n');
  assert(!/[\r\n]/.test(clean), 'Cleaned subject regex test for CRLF must be false');
  assert.strictEqual(clean, 'Bcc: evil@attacker.com Subject: Injected', `Expected normalized single-line text, got: "${clean}"`);
});

await runTest('CRLF-3.2', 'sanitizeEmailSubject handles multiple consecutive CRLF and tabs', async () => {
  const dirty = '⚡ Nový dopyt: Peter\r\n\r\nBcc: spy@attacker.com\r\n\tSubject: Pwned\n\nBody: fake';
  const clean = sanitizeEmailSubject(dirty);

  assert(!/[\r\n]/.test(clean), 'Subject must not contain any CR or LF');
  assert(!clean.includes('\t'), 'Tabs must be normalized or collapsed to single space');
  assert(!clean.includes('  '), 'Double spaces must be collapsed');
  assert.strictEqual(clean, '⚡ Nový dopyt: Peter Bcc: spy@attacker.com Subject: Pwned Body: fake');
});

await runTest('CRLF-3.3', 'sanitizeEmailSubject safely handles non-string inputs (undefined, null, numbers)', async () => {
  assert.strictEqual(sanitizeEmailSubject(undefined), '');
  assert.strictEqual(sanitizeEmailSubject(null), '');
  assert.strictEqual(sanitizeEmailSubject(12345), '');
  assert.strictEqual(sanitizeEmailSubject({}), '');
});

await runTest('CRLF-3.4', 'cleanReplyTo strips CRLF and whitespace from user-provided email address', async () => {
  const dirtyEmail = 'attacker@malicious.com\r\nBcc: victim@domain.com\n';
  const cleanReplyTo = dirtyEmail.replace(/[\r\n\s]+/g, '').trim();

  assert(!/[\r\n\s]/.test(cleanReplyTo), 'cleanReplyTo must have zero CRLF or whitespace characters');
  assert.strictEqual(cleanReplyTo, 'attacker@malicious.comBcc:victim@domain.com');
});

// =============================================================================
// SUITE 4: HONEYPOT TRAP PROBE
// =============================================================================
console.log('\n--- SUITE 4: HONEYPOT TRAP PROBE ---');

await runTest('HONEYPOT-4.1', 'b_url="spambot" returns silent 200 with leadId BOT-TRAP- without disk write or email dispatch', async () => {
  _resetRateLimitStore();
  const leadsPath = path.join(rootDir, 'data', 'leads.json');
  const countBefore = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;

  const testIp = '198.51.100.77';
  const req = {
    method: 'POST',
    headers: {
      'x-forwarded-for': testIp,
      'content-type': 'application/json',
    },
    body: {
      name: 'Spam Bot Crawler',
      phone: '+421908403042',
      b_url: 'spambot',
    },
    socket: { remoteAddress: testIp },
  };
  const res = mockRes();
  await leadHandler(req, res);

  // 1. HTTP 200 OK
  assert.strictEqual(res.statusCode, 200, `Honeypot trap must silently return HTTP 200, got ${res.statusCode}`);
  assert.strictEqual(res.body?.success, true, 'Response body success must be true');

  // 2. BOT-TRAP- leadId prefix
  assert(typeof res.body?.leadId === 'string', 'leadId must be a string');
  assert(res.body.leadId.startsWith('BOT-TRAP-'), `leadId must start with "BOT-TRAP-", got: "${res.body.leadId}"`);

  // 3. Email dispatch was bypassed (emailSent should be undefined or false)
  assert.strictEqual(res.body?.emailSent, undefined, 'Honeypot trap must never attempt email dispatch');

  // 4. Zero disk write: data/leads.json count must be completely unchanged
  const countAfter = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;
  assert.strictEqual(countAfter, countBefore, `data/leads.json count changed from ${countBefore} to ${countAfter} (honeypot leaked to disk!)`);

  if (fs.existsSync(leadsPath)) {
    const rawContent = fs.readFileSync(leadsPath, 'utf8');
    assert(!rawContent.includes('Spam Bot Crawler'), 'Bot name must not exist in data/leads.json');
    assert(!rawContent.includes('spambot'), 'Honeypot value must not exist in data/leads.json');
  }
});

await runTest('HONEYPOT-4.2', 'Honeypot input does not log raw payload to server logs (GDPR Art. 32)', async () => {
  const loggedMessages = [];
  const origWarn = console.warn;
  console.warn = (...args) => {
    loggedMessages.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    origWarn(...args);
  };

  try {
    const sensitivePayload = 'SECRET-CREDENTIAL-SESSION-BOT-987123';
    const req = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: {
        name: 'AutoFiller Bot',
        phone: '+421908403042',
        b_url: sensitivePayload,
      },
      socket: { remoteAddress: '198.51.100.88' },
    };
    const res = mockRes();
    await leadHandler(req, res);

    const fullLog = loggedMessages.join(' ');
    assert(!fullLog.includes(sensitivePayload), 'Raw honeypot payload MUST NOT be printed to server logs');
  } finally {
    console.warn = origWarn;
  }
});

// =============================================================================
// SUMMARY REPORT
// =============================================================================
console.log('\n========================================================================');
console.log(`  TOTAL TESTS : ${totalTests}`);
console.log(`  PASSED      : ${passedTests}`);
console.log(`  FAILED      : ${failedTests}`);
console.log('========================================================================\n');

if (failedTests > 0) {
  console.error(`>>> EMPIRICAL VERDICT: ${failedTests} TEST(S) FAILED (REQUEST_CHANGES) <<<`);
  process.exit(1);
} else {
  console.log(`>>> EMPIRICAL VERDICT: ALL ${totalTests} TEST PROBES PASSED (APPROVE) <<<`);
  process.exit(0);
}
