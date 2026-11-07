import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('========================================================================');
console.log('  SECURITY & PRIVACY HARDENING VERIFICATION SUITE                       ');
console.log('========================================================================\n');

let totalTests = 0;
let passedTests = 0;

function check(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}:`, err.message);
  }
}

async function checkAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✔ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}:`, err.message);
  }
}

// -----------------------------------------------------------------------------
// 1. HTTP Security Headers in next.config.ts
// -----------------------------------------------------------------------------
console.log('--- GROUP 1: HTTP Security Headers in next.config.ts ---');

const nextConfigPath = path.join(rootDir, 'next.config.ts');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

check('SEC-NEXT-POWERED-BY: poweredByHeader is disabled', () => {
  assert(nextConfigContent.includes('poweredByHeader: false'), 'poweredByHeader: false must be configured');
});

check('SEC-NEXT-HSTS: Strict-Transport-Security header configured with max-age=63072000', () => {
  assert(nextConfigContent.includes('Strict-Transport-Security'), 'HSTS header missing');
  assert(nextConfigContent.includes('max-age=63072000; includeSubDomains; preload'), 'HSTS parameters mismatch');
});

check('SEC-NEXT-XFO: X-Frame-Options configured with DENY', () => {
  assert(nextConfigContent.includes('X-Frame-Options'), 'X-Frame-Options missing');
  assert(nextConfigContent.includes("value: 'DENY'"), 'X-Frame-Options must be DENY');
});

check('SEC-NEXT-XCTO: X-Content-Type-Options configured with nosniff', () => {
  assert(nextConfigContent.includes('X-Content-Type-Options'), 'X-Content-Type-Options missing');
  assert(nextConfigContent.includes("value: 'nosniff'"), 'X-Content-Type-Options must be nosniff');
});

check('SEC-NEXT-REFERRER: Referrer-Policy configured with strict-origin-when-cross-origin', () => {
  assert(nextConfigContent.includes('Referrer-Policy'), 'Referrer-Policy missing');
  assert(nextConfigContent.includes("value: 'strict-origin-when-cross-origin'"), 'Referrer-Policy must be strict-origin-when-cross-origin');
});

check('SEC-NEXT-PERMISSIONS: Permissions-Policy restricts camera, microphone, geolocation', () => {
  assert(nextConfigContent.includes('Permissions-Policy'), 'Permissions-Policy missing');
  assert(nextConfigContent.includes("camera=(), microphone=(), geolocation=()"), 'Permissions-Policy must restrict sensors');
});

check('SEC-NEXT-CSP: Content-Security-Policy contains trusted domains & security directives', () => {
  assert(nextConfigContent.includes('default-src \'self\''), 'CSP default-src missing');
  assert(nextConfigContent.includes('https://www.googletagmanager.com'), 'CSP must whitelist GTM');
  assert(nextConfigContent.includes('https://va.vercel-scripts.com'), 'CSP must whitelist Vercel Analytics');
  assert(nextConfigContent.includes('https://maps.google.com'), 'CSP must whitelist Google Maps iframe');
  assert(nextConfigContent.includes('object-src \'none\''), 'CSP object-src none missing');
  assert(nextConfigContent.includes('frame-ancestors \'none\''), 'CSP frame-ancestors none missing');
  assert(nextConfigContent.includes('form-action \'self\''), 'CSP form-action self missing');
  assert(nextConfigContent.includes('upgrade-insecure-requests'), 'CSP upgrade-insecure-requests missing');
});

// -----------------------------------------------------------------------------
// 2. API Hardening in pages/api/lead.ts
// -----------------------------------------------------------------------------
console.log('\n--- GROUP 2: API Hardening & Anti-Spam in pages/api/lead.ts ---');

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jiti = require('jiti')(__dirname);
const leadModule = jiti('../pages/api/lead.ts');
const leadHandler = leadModule.default;
const { _resetRateLimitStore, escapeHtml } = leadModule;

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

await checkAsync('SEC-LEAD-METHOD: Non-POST methods are rejected with HTTP 405', async () => {
  const req = { method: 'GET', headers: {}, socket: { remoteAddress: '127.0.0.1' } };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 405, 'Should return HTTP 405');
  assert.strictEqual(res.body.success, false);
});

await checkAsync('SEC-LEAD-CORS-PREFLIGHT: OPTIONS method returns HTTP 204 with CORS headers for allowed origin', async () => {
  const req = {
    method: 'OPTIONS',
    headers: { origin: 'https://marvol.sk' },
    socket: { remoteAddress: '127.0.0.1' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 204, 'Should return HTTP 204');
  assert.strictEqual(res.headers['access-control-allow-origin'], 'https://marvol.sk');
  assert(res.headers['access-control-allow-methods'].includes('POST'));
});

await checkAsync('SEC-LEAD-CORS-FORBIDDEN: Untrusted Origin receives HTTP 403 Forbidden', async () => {
  const req = {
    method: 'POST',
    headers: {
      origin: 'https://malicious-phishing-site.com',
      'content-type': 'application/json',
    },
    body: { name: 'Attacker', phone: '+421908403042' },
    socket: { remoteAddress: '198.51.100.99' },
  };
  const res = mockRes();
  await leadHandler(req, res);
  assert.strictEqual(res.statusCode, 403, 'Untrusted origin must return HTTP 403');
  assert.strictEqual(res.body.success, false);
});

await checkAsync('SEC-LEAD-RATE-LIMIT: Exceeding 5 requests in 10 minutes returns HTTP 429 with Retry-After', async () => {
  _resetRateLimitStore();
  const testIp = '203.0.113.42';

  for (let i = 1; i <= 5; i++) {
    const req = {
      method: 'POST',
      headers: {
        'x-forwarded-for': testIp,
        'content-type': 'application/json',
      },
      body: {
        name: `Rate Tester ${i}`,
        phone: '+421908403042',
        b_url: '',
      },
      socket: { remoteAddress: testIp },
    };
    const res = mockRes();
    await leadHandler(req, res);
    assert.strictEqual(res.statusCode, 200, `Request ${i} should succeed with 200`);
  }

  // 6th request from the same IP must be rate limited
  const req6 = {
    method: 'POST',
    headers: {
      'x-forwarded-for': testIp,
      'content-type': 'application/json',
    },
    body: {
      name: 'Rate Tester 6',
      phone: '+421908403042',
      b_url: '',
    },
    socket: { remoteAddress: testIp },
  };
  const res6 = mockRes();
  await leadHandler(req6, res6);
  assert.strictEqual(res6.statusCode, 429, '6th request must return HTTP 429');
  assert.strictEqual(res6.body.success, false);
  assert(res6.headers['retry-after'], 'Retry-After header must be set on 429 response');
  assert(parseInt(res6.headers['retry-after'], 10) > 0, 'Retry-After must be positive integer');

  // Verify _resetRateLimitStore clears the limits
  _resetRateLimitStore();
  const resReset = mockRes();
  await leadHandler(req6, resReset);
  assert.strictEqual(resReset.statusCode, 200, 'After reset, request should succeed with 200');
});

await checkAsync('SEC-LEAD-HONEYPOT: Populated b_url returns 200 BOT-TRAP without saving to disk', async () => {
  _resetRateLimitStore();
  const leadsPath = path.join(rootDir, 'data', 'leads.json');
  const countBefore = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: 'Spam Bot Victim',
      phone: '+421908403042',
      b_url: 'https://spam-payload.example.com',
    },
    socket: { remoteAddress: '198.51.100.5' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200, 'Honeypot trap must silently return 200');
  assert.strictEqual(res.body.success, true);
  assert(res.body.leadId.startsWith('BOT-TRAP-'), 'LeadId must indicate BOT-TRAP');

  const countAfter = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, 'utf8')).length : 0;
  assert.strictEqual(countAfter, countBefore, 'Honeypot lead must NOT be written to disk');
});

await checkAsync('SEC-LEAD-SANITIZATION: HTML characters in user input are safely escaped', async () => {
  _resetRateLimitStore();
  const maliciousName = 'Jan <script>alert("XSS")</script>';
  const maliciousMessage = 'Test <img src=x onerror=alert(1)> & "quotes" \'apostrophes\'';

  const req = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {
      name: maliciousName,
      phone: '+421908403042',
      message: maliciousMessage,
      service: '<svg onload=alert(1)>',
      city: '<iframe src=x>',
      source: '<test>',
      b_url: '',
    },
    socket: { remoteAddress: '198.51.100.8' },
  };
  const res = mockRes();
  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);

  const leadsPath = path.join(rootDir, 'data', 'leads.json');
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  const storedLead = leads.find((l) => l.id === res.body.leadId);
  assert(storedLead, 'Lead must be saved in data/leads.json');
  assert(!storedLead.name.includes('<script>'), 'Unescaped script tags must not be stored');
  assert(storedLead.name.includes('&lt;script&gt;'), 'Name must be HTML escaped');
  assert(storedLead.message.includes('&lt;img'), 'Message must be HTML escaped');
  assert(storedLead.message.includes('&amp;'), 'Ampersand must be HTML escaped');
  assert(storedLead.message.includes('&quot;'), 'Quotes must be HTML escaped');
  assert(storedLead.message.includes('&#39;'), 'Apostrophes must be HTML escaped');
});

// -----------------------------------------------------------------------------
// 3. Lockdown of pages/api/test-email.ts
// -----------------------------------------------------------------------------
console.log('\n--- GROUP 3: Test Email Route Lockdown ---');

const testEmailModule = jiti('../pages/api/test-email.ts');
const testEmailHandler = testEmailModule.default;

await checkAsync('SEC-TEST-EMAIL-PROD: In production NODE_ENV, returns HTTP 404', async () => {
  const originalEnv = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = 'production';
    const req = { method: 'POST', query: {}, socket: { remoteAddress: '127.0.0.1' } };
    const res = mockRes();
    await testEmailHandler(req, res);
    assert.strictEqual(res.statusCode, 404, 'Must return 404 in production');
    assert.strictEqual(res.body.success, false);
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

await checkAsync('SEC-TEST-EMAIL-METHOD: GET method is rejected with HTTP 405', async () => {
  const req = { method: 'GET', query: {}, socket: { remoteAddress: '127.0.0.1' } };
  const res = mockRes();
  await testEmailHandler(req, res);
  assert.strictEqual(res.statusCode, 405, 'GET must be rejected with 405');
});

check('SEC-TEST-EMAIL-NO-RELAY: pages/api/test-email.ts removes req.query.to relay', () => {
  const testEmailContent = fs.readFileSync(path.join(rootDir, 'pages/api/test-email.ts'), 'utf8');
  assert(!testEmailContent.includes('req.query.to'), 'req.query.to must not be used');
});

// -----------------------------------------------------------------------------
// 4. Email Security in lib/email.ts
// -----------------------------------------------------------------------------
console.log('\n--- GROUP 4: Email Security & TLS in lib/email.ts ---');

const emailModule = jiti('../lib/email.ts');
const { buildLeadNotificationHtml } = emailModule;

check('SEC-EMAIL-HTML-ESCAPE: buildLeadNotificationHtml escapes user data preventing HTML injection', () => {
  const mockLead = {
    id: 'SEC-TEST',
    timestamp: new Date().toISOString(),
    name: 'Injection <script>alert("XSS")</script>',
    phone: '+421 908 403 042',
    email: 'test@example.com',
    city: '<b onmouseover=alert(1)>Martin</b>',
    service: '<img src=x>',
    source: 'web',
    message: 'Hello <a href="http://phishing.com">Click</a>',
  };

  const html = buildLeadNotificationHtml(mockLead);
  assert(!html.includes('<script>'), 'Unescaped script tags must not be in email HTML');
  assert(html.includes('&lt;script&gt;'), 'Name must be entity-encoded in email HTML');
  assert(!html.includes('<b onmouseover'), 'Unescaped bold tags must not be in email HTML');
  assert(html.includes('&lt;b onmouseover'), 'City must be entity-encoded in email HTML');
  assert(!html.includes('<a href="http://phishing.com">'), 'Unescaped links must not be in message');
  assert(html.includes('&lt;a href='), 'Message links must be entity-encoded');
});

check('SEC-EMAIL-TLS: lib/email.ts enforces valid TLS certificate verification (no rejectUnauthorized: false)', () => {
  const emailContent = fs.readFileSync(path.join(rootDir, 'lib/email.ts'), 'utf8');
  assert(!emailContent.includes('rejectUnauthorized: false'), 'rejectUnauthorized: false must be removed');
  assert(emailContent.includes('rejectUnauthorized: true'), 'rejectUnauthorized: true must be enforced');
});

// -----------------------------------------------------------------------------
// 5. Client Forms Honeypot Parity
// -----------------------------------------------------------------------------
console.log('\n--- GROUP 5: Client Forms Honeypot Parity ---');

check('SEC-FORM-CONTACT: components/ContactSection.tsx includes b_url honeypot input and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'components/ContactSection.tsx'), 'utf8');
  assert(content.includes('name="b_url"'), 'Hidden input b_url missing in ContactSection');
  assert(content.includes('b_url: bUrl'), 'b_url must be included in ContactSection payload');
});

check('SEC-FORM-ESHOP: pages/eshop.tsx includes b_url honeypot input and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'pages/eshop.tsx'), 'utf8');
  assert(content.includes('name="b_url"'), 'Hidden input b_url missing in eshop modal');
  assert(content.includes('b_url: modalFormData.b_url'), 'b_url must be included in eshop payload');
});

check('SEC-FORM-TEST2: pages/test-2.tsx includes b_url honeypot input and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'pages/test-2.tsx'), 'utf8');
  assert(content.includes('name="b_url"'), 'Hidden input b_url missing in test-2 form');
  assert(content.includes('b_url: bUrl'), 'b_url must be included in test-2 payload');
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n========================================================================');
console.log(`  Total Probes : ${totalTests}`);
console.log(`  Passed       : ${passedTests}`);
console.log(`  Failed       : ${totalTests - passedTests}`);
console.log('========================================================================\n');

if (passedTests === totalTests) {
  console.log('✔ All Security & Privacy Hardening probes PASSED with 100% success rate!\n');
  process.exit(0);
} else {
  console.error('✖ Some security probes failed.\n');
  process.exit(1);
}
