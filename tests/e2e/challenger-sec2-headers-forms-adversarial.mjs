#!/usr/bin/env node
/**
 * Adversarial Empirical Verification Suite for Challenger 2
 * - HTTP Security Headers in next.config.ts (exact dynamic evaluation of nextConfig.headers())
 * - poweredByHeader === false verification
 * - Client forms honeypot integration in ContactSection.tsx, pages/eshop.tsx, pages/test-2.tsx
 * - Adversarial honeypot stress testing (PII redaction, oversized inputs, alias fields)
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

const jiti = require('jiti')(__dirname);

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';

console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`${BOLD}${CYAN}  CHALLENGER 2: ADVERSARIAL SECURITY HEADERS & HONEYPOT VERIFICATION     ${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

let passedCount = 0;
let failedCount = 0;
const failures = [];

function check(id, title, fn) {
  try {
    fn();
    passedCount++;
    console.log(`  ${GREEN}✔ [PASS]${RESET} ${BOLD}${id}${RESET}: ${title}`);
  } catch (err) {
    failedCount++;
    failures.push({ id, title, error: err.message });
    console.log(`  ${RED}✖ [FAIL]${RESET} ${BOLD}${id}${RESET}: ${title}`);
    console.log(`     ${RED}↳ Details: ${err.message}${RESET}`);
  }
}

async function checkAsync(id, title, fn) {
  try {
    await fn();
    passedCount++;
    console.log(`  ${GREEN}✔ [PASS]${RESET} ${BOLD}${id}${RESET}: ${title}`);
  } catch (err) {
    failedCount++;
    failures.push({ id, title, error: err.message });
    console.log(`  ${RED}✖ [FAIL]${RESET} ${BOLD}${id}${RESET}: ${title}`);
    console.log(`     ${RED}↳ Details: ${err.message}${RESET}`);
  }
}

// -----------------------------------------------------------------------------
// 1. Dynamic Evaluation of next.config.ts
// -----------------------------------------------------------------------------
console.log(`${BOLD}--- SECTION 1: Dynamic Execution & Exact Header Values in next.config.ts ---${RESET}`);

const nextConfigModule = jiti('../../next.config.ts');
const nextConfig = nextConfigModule.default || nextConfigModule;

check('HDR-POWERED-BY', 'nextConfig.poweredByHeader is strictly false', () => {
  assert.strictEqual(nextConfig.poweredByHeader, false, 'poweredByHeader must be explicitly false');
});

let configuredHeaders = [];
await checkAsync('HDR-INVOKE-FN', 'nextConfig.headers() executes and returns valid route array', async () => {
  assert(typeof nextConfig.headers === 'function', 'nextConfig.headers must be a function');
  const routes = await nextConfig.headers();
  assert(Array.isArray(routes), 'headers() must return an array');
  assert(routes.length >= 1, 'headers() must contain at least 1 route definition');
  
  const rootRoute = routes.find(r => r.source === '/:path*');
  assert(rootRoute, 'Route with source "/:path*" must be defined');
  assert(Array.isArray(rootRoute.headers), 'Route headers must be an array');
  configuredHeaders = rootRoute.headers;
  assert(configuredHeaders.length >= 6, 'Must define at least 6 security headers');
});

function getHeader(key) {
  const h = configuredHeaders.find(item => item.key.toLowerCase() === key.toLowerCase());
  return h ? h.value : null;
}

check('HDR-HSTS-EXACT', 'Strict-Transport-Security has exact required max-age and preload directives', () => {
  const val = getHeader('Strict-Transport-Security');
  assert(val !== null, 'Strict-Transport-Security header must exist');
  assert.strictEqual(
    val,
    'max-age=63072000; includeSubDomains; preload',
    'HSTS must match "max-age=63072000; includeSubDomains; preload"'
  );
});

check('HDR-XFO-EXACT', 'X-Frame-Options is strictly DENY', () => {
  const val = getHeader('X-Frame-Options');
  assert(val !== null, 'X-Frame-Options header must exist');
  assert.strictEqual(val, 'DENY', 'X-Frame-Options must be DENY');
});

check('HDR-XCTO-EXACT', 'X-Content-Type-Options is strictly nosniff', () => {
  const val = getHeader('X-Content-Type-Options');
  assert(val !== null, 'X-Content-Type-Options header must exist');
  assert.strictEqual(val, 'nosniff', 'X-Content-Type-Options must be nosniff');
});

check('HDR-REFERRER-EXACT', 'Referrer-Policy is strictly strict-origin-when-cross-origin', () => {
  const val = getHeader('Referrer-Policy');
  assert(val !== null, 'Referrer-Policy header must exist');
  assert.strictEqual(
    val,
    'strict-origin-when-cross-origin',
    'Referrer-Policy must be strict-origin-when-cross-origin'
  );
});

check('HDR-PERMISSIONS-EXACT', 'Permissions-Policy restricts camera, microphone, and geolocation', () => {
  const val = getHeader('Permissions-Policy');
  assert(val !== null, 'Permissions-Policy header must exist');
  assert.strictEqual(
    val,
    'camera=(), microphone=(), geolocation=()',
    'Permissions-Policy must be camera=(), microphone=(), geolocation=()'
  );
});

check('HDR-CSP-DIRECTIVES', 'Content-Security-Policy contains all required directives and trusted endpoints', () => {
  const csp = getHeader('Content-Security-Policy');
  assert(csp !== null, 'Content-Security-Policy header must exist');

  // Directives breakdown
  const requiredChecks = [
    { directive: "default-src 'self'", desc: "default-src 'self'" },
    { directive: "script-src", desc: "script-src defined" },
    { directive: "'unsafe-eval'", desc: "script-src 'unsafe-eval' for Next.js hydration" },
    { directive: "'unsafe-inline'", desc: "script-src 'unsafe-inline' for inline Next.js scripts" },
    { directive: "https://www.googletagmanager.com", desc: "script-src GTM" },
    { directive: "https://va.vercel-scripts.com", desc: "script-src Vercel Analytics" },
    { directive: "https://*.google-analytics.com", desc: "script-src Google Analytics" },
    { directive: "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", desc: "style-src with Google Fonts" },
    { directive: "img-src", desc: "img-src defined" },
    { directive: "https://marvol.sk", desc: "img-src marvol.sk" },
    { directive: "https://www.marvol.sk", desc: "img-src www.marvol.sk" },
    { directive: "font-src 'self' data: https://fonts.gstatic.com", desc: "font-src with Google Fonts" },
    { directive: "connect-src", desc: "connect-src defined" },
    { directive: "https://stats.g.doubleclick.net", desc: "connect-src DoubleClick" },
    { directive: "https://vitals.vercel-insights.com", desc: "connect-src Vercel Speed Insights" },
    { directive: "ws: wss:", desc: "connect-src WebSockets for HMR" },
    { directive: "frame-src 'self' https://maps.google.com https://www.google.com", desc: "frame-src Google Maps" },
    { directive: "object-src 'none'", desc: "object-src 'none' blocks Flash/plugins" },
    { directive: "base-uri 'self'", desc: "base-uri 'self' blocks base tag hijacking" },
    { directive: "form-action 'self'", desc: "form-action 'self' restricts form posting" },
    { directive: "frame-ancestors 'none'", desc: "frame-ancestors 'none' blocks iframe embedding" },
    { directive: "block-all-mixed-content", desc: "block-all-mixed-content" },
    { directive: "upgrade-insecure-requests", desc: "upgrade-insecure-requests" },
  ];

  for (const item of requiredChecks) {
    assert(
      csp.includes(item.directive),
      `CSP missing required directive/token: ${item.directive} (${item.desc})`
    );
  }
});

// -----------------------------------------------------------------------------
// 2. Client Forms Honeypot Static & AST Inspection
// -----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 2: Client Forms Honeypot Code Inspection ---${RESET}`);

check('FORM-CONTACT-CODE', 'ContactSection.tsx integrates b_url state, hidden input, and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'components/ContactSection.tsx'), 'utf8');
  assert(content.includes('const [bUrl, setBUrl] = useState'), 'bUrl state missing in ContactSection');
  assert(content.includes('b_url: bUrl'), 'b_url must be included in handleSubmit fetch payload');
  assert(content.includes('name="b_url"'), 'input must have name="b_url"');
  assert(content.includes('tabIndex={-1}'), 'input must have tabIndex={-1}');
  assert(content.includes('autoComplete="off"'), 'input must have autoComplete="off"');
  assert(content.includes('aria-hidden="true"'), 'container must have aria-hidden="true"');
  assert(content.includes('display: \'none\'') || content.includes('display: "none"'), 'container must be hidden via style');
});

check('FORM-ESHOP-CODE', 'pages/eshop.tsx material modal integrates b_url in state, JSX, and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'pages/eshop.tsx'), 'utf8');
  assert(content.includes('b_url: \'\'') || content.includes('b_url: ""'), 'b_url state missing in modalFormData');
  assert(content.includes('b_url: modalFormData.b_url'), 'b_url must be included in modal purchase submit payload');
  assert(content.includes('name="b_url"'), 'input must have name="b_url"');
  assert(content.includes('tabIndex={-1}'), 'input must have tabIndex={-1}');
  assert(content.includes('autoComplete="off"'), 'input must have autoComplete="off"');
  assert(content.includes('aria-hidden="true"'), 'container must have aria-hidden="true"');
});

check('FORM-TEST2-CODE', 'pages/test-2.tsx integrates b_url state, hidden input, and payload', () => {
  const content = fs.readFileSync(path.join(rootDir, 'pages/test-2.tsx'), 'utf8');
  assert(content.includes('const [bUrl, setBUrl] = useState'), 'bUrl state missing in test-2.tsx');
  assert(content.includes('b_url: bUrl'), 'b_url must be included in handleLeadSubmit fetch payload');
  assert(content.includes('name="b_url"'), 'input must have name="b_url"');
  assert(content.includes('tabIndex={-1}'), 'input must have tabIndex={-1}');
  assert(content.includes('autoComplete="off"'), 'input must have autoComplete="off"');
  assert(content.includes('aria-hidden="true"'), 'container must have aria-hidden="true"');
});

// -----------------------------------------------------------------------------
// 3. Empirical API Honeypot Stress Testing
// -----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 3: Empirical API Honeypot & Adversarial Stress Testing ---${RESET}`);

const leadModule = jiti('../../pages/api/lead.ts');
const leadHandler = leadModule.default;
const { _resetRateLimitStore } = leadModule;

const leadsFilePath = path.join(rootDir, 'data/leads.json');
let initialLeadsBackup = '[]';
if (fs.existsSync(leadsFilePath)) {
  initialLeadsBackup = fs.readFileSync(leadsFilePath, 'utf8');
}

function mockReq(body, origin = 'https://marvol.sk', ip = '198.51.100.99') {
  return {
    method: 'POST',
    headers: {
      origin,
      'x-forwarded-for': ip,
    },
    body,
  };
}

function mockRes() {
  const headers = {};
  return {
    statusCode: 200,
    headers,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, val) {
      headers[key] = val;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
  };
}

// Ensure clean state before tests
_resetRateLimitStore();

await checkAsync('ADV-HP-CONTACT-LEGIT', 'ContactSection legitimate payload (b_url="") succeeds & persists', async () => {
  const req = mockReq({
    name: 'Ján Kontaktný',
    phone: '+421908403042',
    email: 'jan@example.sk',
    service: 'fotovoltika-dom',
    message: 'Chcem cenovú ponuku',
    source: 'contact_section',
    b_url: '',
  }, 'https://marvol.sk', '198.51.100.10');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200, 'Legitimate ContactSection submission must return 200');
  assert.strictEqual(res.data.success, true, 'Result must be success');
  assert(!res.data.leadId.startsWith('BOT-TRAP'), 'Legitimate lead must NOT have BOT-TRAP leadId');

  // Verify persistence
  const currentLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
  const saved = currentLeads.find(l => l.phone === '+421908403042' && l.source === 'contact_section');
  assert(saved, 'Lead must be saved in data/leads.json');
});

await checkAsync('ADV-HP-CONTACT-TRAPPED', 'ContactSection with filled b_url returns BOT-TRAP and excludes from leads.json', async () => {
  const leadsBefore = fs.readFileSync(leadsFilePath, 'utf8');
  
  const req = mockReq({
    name: 'Spam Bot Contact',
    phone: '+421908403042',
    email: 'bot@spam.com',
    service: 'fotovoltika-dom',
    message: 'Click here for spam',
    source: 'contact_section',
    b_url: 'http://malicious-spam-url.com/contact-trap',
  }, 'https://marvol.sk', '198.51.100.11');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200, 'Trapped bot must receive HTTP 200');
  assert(res.data.leadId.startsWith('BOT-TRAP-'), 'LeadId must indicate BOT-TRAP');

  const leadsAfter = fs.readFileSync(leadsFilePath, 'utf8');
  assert.strictEqual(leadsBefore, leadsAfter, 'data/leads.json must remain completely unchanged');
});

await checkAsync('ADV-HP-ESHOP-LEGIT', 'pages/eshop.tsx modal legitimate payload succeeds & persists', async () => {
  const req = mockReq({
    name: 'Peter Eshopový',
    phone: '+421908111222',
    email: 'peter@eshop.sk',
    city: 'Žilina',
    service: 'vseobecny-kontakt',
    source: 'eshop_material_modal',
    message: 'Záujem o materiál',
    b_url: '',
  }, 'https://marvol.sk', '198.51.100.12');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200, 'Legitimate eshop modal must return 200');
  assert.strictEqual(res.data.success, true);
  assert(!res.data.leadId.startsWith('BOT-TRAP'));

  const currentLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
  const saved = currentLeads.find(l => l.phone === '+421908111222' && l.source === 'eshop_material_modal');
  assert(saved, 'Eshop lead must be saved in data/leads.json');
});

await checkAsync('ADV-HP-ESHOP-TRAPPED', 'pages/eshop.tsx modal with filled b_url returns BOT-TRAP and excludes from leads.json', async () => {
  const leadsBefore = fs.readFileSync(leadsFilePath, 'utf8');

  const req = mockReq({
    name: 'Spam Eshop Bot',
    phone: '+421908111222',
    email: 'spammer@eshop.com',
    service: 'vseobecny-kontakt',
    source: 'eshop_material_modal',
    message: 'Spam eshop',
    b_url: 'http://eshop-spambot.ru',
  }, 'https://marvol.sk', '198.51.100.13');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert(res.data.leadId.startsWith('BOT-TRAP-'));

  const leadsAfter = fs.readFileSync(leadsFilePath, 'utf8');
  assert.strictEqual(leadsBefore, leadsAfter, 'data/leads.json must NOT persist eshop bot');
});

await checkAsync('ADV-HP-TEST2-LEGIT', 'pages/test-2.tsx legitimate payload succeeds & persists', async () => {
  const req = mockReq({
    name: 'Martin Minimalista',
    phone: '+421908333444',
    city: 'Vrútky',
    message: 'Dopyt z minimalistickej stránky (/test-2)',
    propertyType: 'home',
    monthlyBill: 120,
    hasBattery: true,
    hasEV: false,
    source: 'test-2_minimalist',
    b_url: '',
  }, 'https://marvol.sk', '198.51.100.14');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.data.success, true);
  assert(!res.data.leadId.startsWith('BOT-TRAP'));

  const currentLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
  const saved = currentLeads.find(l => l.phone === '+421908333444' && l.source === 'test-2_minimalist');
  assert(saved, 'test-2 lead must be saved in data/leads.json');
});

await checkAsync('ADV-HP-TEST2-TRAPPED', 'pages/test-2.tsx with filled b_url returns BOT-TRAP and excludes from leads.json', async () => {
  const leadsBefore = fs.readFileSync(leadsFilePath, 'utf8');

  const req = mockReq({
    name: 'Test2 Spambot',
    phone: '+421908333444',
    city: 'Vrútky',
    message: 'Dopyt spam',
    source: 'test-2_minimalist',
    b_url: 'http://test2-spambot.com',
  }, 'https://marvol.sk', '198.51.100.15');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert(res.data.leadId.startsWith('BOT-TRAP-'));

  const leadsAfter = fs.readFileSync(leadsFilePath, 'utf8');
  assert.strictEqual(leadsBefore, leadsAfter, 'data/leads.json must NOT persist test-2 bot');
});

await checkAsync('ADV-HP-PII-REDACTION', 'GDPR compliance: Honeypot filled with sensitive client PII is never printed to server logs', async () => {
  const sensitivePII = 'Jozef Tajny, +421999888777, tajny@gdpr.sk, Kvetna 12 Bratislava';
  
  // Intercept console.warn / console.log
  const interceptedLogs = [];
  const origWarn = console.warn;
  const origLog = console.log;
  console.warn = (...args) => {
    interceptedLogs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    origWarn.apply(console, args);
  };
  console.log = (...args) => {
    interceptedLogs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    origLog.apply(console, args);
  };

  try {
    const req = mockReq({
      name: 'Autofill Victim',
      phone: '+421908555666',
      email: 'victim@gdpr.sk',
      service: 'fotovoltika-dom',
      message: 'Autofill error',
      source: 'contact_section',
      b_url: sensitivePII,
    }, 'https://marvol.sk', '198.51.100.16');
    const res = mockRes();

    await leadHandler(req, res);

    assert.strictEqual(res.statusCode, 200);
    assert(res.data.leadId.startsWith('BOT-TRAP-'));

    // Verify logs
    const joinedLogs = interceptedLogs.join('\n');
    assert(!joinedLogs.includes(sensitivePII), 'Sensitive PII inside b_url honeypot must NEVER leak into console logs');
    assert(!joinedLogs.includes('+421999888777'), 'Phone from honeypot must not leak into console logs');
  } finally {
    console.warn = origWarn;
    console.log = origLog;
  }
});

await checkAsync('ADV-HP-OVERSIZED-PAYLOAD', 'Massive honeypot field (64 KB spam payload) is safely absorbed without crash', async () => {
  const giantSpam = 'SPAM-VIAGRA-CRYPTO-'.repeat(3500); // ~66 KB
  const req = mockReq({
    name: 'Massive Spambot',
    phone: '+421908777888',
    message: 'Giant payload test',
    b_url: giantSpam,
  }, 'https://marvol.sk', '198.51.100.17');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert(res.data.leadId.startsWith('BOT-TRAP-'));
});

await checkAsync('ADV-HP-ALIAS-FIELD', 'Legacy alias field "honeypot" is also caught by the bot trap', async () => {
  const req = mockReq({
    name: 'Alias Bot',
    phone: '+421908888999',
    message: 'Alias trap test',
    honeypot: 'http://alias-bot-trap.com',
  }, 'https://marvol.sk', '198.51.100.18');
  const res = mockRes();

  await leadHandler(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert(res.data.leadId.startsWith('BOT-TRAP-'));
});

// Restore original leads.json backup so tests don't leave test leads in database
fs.writeFileSync(leadsFilePath, initialLeadsBackup, 'utf8');

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`${BOLD}  Total Probes : ${passedCount + failedCount}${RESET}`);
console.log(`  ${GREEN}Passed       : ${passedCount}${RESET}`);
console.log(`  ${failedCount === 0 ? GREEN : RED}Failed       : ${failedCount}${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log(`${GREEN}✔ All Challenger 2 Adversarial Probes PASSED with 100% success rate!${RESET}\n`);
}
