#!/usr/bin/env node
/**
 * Empirical Challenger 2 (M2) Test Harness:
 * React SSR Rendering, PrefillData Bridge, Thumbnail Images & Lead Payload Serialization
 * 
 * Agent: teamwork_preview_challenger_m2_2
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import vm from 'vm';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

React.default = React;
fs.default = fs;
path.default = path;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';

console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`${BOLD}${CYAN}  M2 CHALLENGER 2: SSR RENDERING, PREFILL BRIDGE & PAYLOAD SERIALIZATION ${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

let passedCount = 0;
let failedCount = 0;
const failures = [];

function check(id, title, condition, failureDetails = '') {
  if (condition) {
    passedCount++;
    console.log(`  ${GREEN}✔ [PASS]${RESET} ${BOLD}${id}${RESET}: ${title}`);
  } else {
    failedCount++;
    failures.push({ id, title, failureDetails });
    console.log(`  ${RED}✖ [FAIL]${RESET} ${BOLD}${id}${RESET}: ${title}`);
    if (failureDetails) {
      console.log(`     ${RED}↳ Details: ${failureDetails}${RESET}`);
    }
  }
}

// Backup data/leads.json
const leadsFilePath = path.join(ROOT_DIR, 'data/leads.json');
let originalLeadsBackup = null;
if (fs.existsSync(leadsFilePath)) {
  originalLeadsBackup = fs.readFileSync(leadsFilePath, 'utf8');
}

// ----------------------------------------------------------------------------
// Module Loader Helper for TypeScript/React Components in VM
// ----------------------------------------------------------------------------
function loadTsxModule(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });

  const sandbox = {
    exports: {},
    module: { exports: {} },
    require: (mod) => {
      if (mod === 'react') return React;
      if (mod === 'fs') return fs;
      if (mod === 'path') return path;
      if (mod === 'react/jsx-runtime') {
        const runtime = {
          jsx: React.createElement,
          jsxs: React.createElement,
          Fragment: React.Fragment,
        };
        runtime.default = runtime;
        return runtime;
      }
      if (mod === 'next/link') {
        const Link = function ({ href, children, ...rest }) {
          return React.createElement('a', { href, ...rest }, children);
        };
        Link.default = Link;
        return Link;
      }
      if (mod.startsWith('./') || mod.startsWith('../')) {
        const targetBase = path.resolve(path.dirname(fullPath), mod);
        for (const ext of ['', '.tsx', '.ts', '/index.tsx', '/index.ts']) {
          if (fs.existsSync(targetBase + ext) && fs.statSync(targetBase + ext).isFile()) {
            return loadTsxModule(path.relative(ROOT_DIR, targetBase + ext));
          }
        }
      }
      if (mod === '@/components/icons') {
        return loadTsxModule('components/icons/index.ts');
      }
      if (mod.startsWith('@/')) {
        const resolved = mod.replace('@/', '');
        for (const ext of ['', '.tsx', '.ts', '/index.tsx', '/index.ts']) {
          if (fs.existsSync(path.resolve(ROOT_DIR, resolved + ext)) && fs.statSync(path.resolve(ROOT_DIR, resolved + ext)).isFile()) {
            return loadTsxModule(resolved + ext);
          }
        }
      }
      return {};
    },
    console,
    process,
  };
  sandbox.module.exports = sandbox.exports;
  vm.createContext(sandbox);
  vm.runInContext(transpiled.outputText, sandbox);
  return sandbox.module.exports;
}

// ----------------------------------------------------------------------------
// GROUP 1: Hardware Thumbnail Images in public/images/
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- GROUP 1: Hardware Thumbnail Images in public/images/ ---${RESET}`);

const calcSource = fs.readFileSync(path.join(ROOT_DIR, 'components/CalculatorSection.tsx'), 'utf8');
const leadSource = fs.readFileSync(path.join(ROOT_DIR, 'components/LeadForm.tsx'), 'utf8');

// Required thumbnail images mapped in CalculatorSection.tsx
const requiredImages = [
  { id: 'IMG-RES-HERO', path: 'public/images/fotovoltika-domacnosti/hero.jpg', desc: 'Residential PV hero' },
  { id: 'IMG-COM-HERO', path: 'public/images/fotovoltika-firmy/hero.jpg', desc: 'Commercial PV hero' },
  { id: 'IMG-RES-HYBRID', path: 'public/images/fotovoltika-domacnosti/hybrid-system.jpg', desc: '3F Hybrid Inverter' },
  { id: 'IMG-COM-INV', path: 'public/images/fotovoltika-firmy/industrial-inverter.jpg', desc: 'Industrial Inverter' },
  { id: 'IMG-BESS', path: 'public/images/bateriove-uloziska/hero.jpg', desc: 'LiFePO4 BESS Battery' },
  { id: 'IMG-HP', path: 'public/images/tepelne-cerpadla/hero.jpg', desc: 'Heat Pump' },
  { id: 'IMG-WALLBOX', path: 'public/images/sluzby/montaz-instalacia.jpg', desc: 'EV Wallbox installation' },
  { id: 'IMG-REVISION', path: 'public/images/sluzby/revizie-dotacie.jpg', desc: 'Official OPOS revision' },
];

for (const img of requiredImages) {
  const fullPath = path.join(ROOT_DIR, img.path);
  const exists = fs.existsSync(fullPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(fullPath).size;
  }
  check(
    img.id,
    `Image exists and is non-empty (> 10 KB): ${img.path} (${img.desc})`,
    exists && size > 10240,
    `Exists: ${exists}, Size: ${size} bytes`
  );
}

// Check that CalculatorSection uses only valid public/images paths and no placeholder domains
const placeholderRegex = /(unsplash\.com|placeholder\.com|via\.placeholder|picsum\.photos|placehold\.co)/i;
const hasPlaceholderInCalc = placeholderRegex.test(calcSource);
const hasPlaceholderInLead = placeholderRegex.test(leadSource);
check(
  'IMG-NO-PLACEHOLDER',
  'Zero placeholder domains (unsplash, picsum, etc.) in CalculatorSection and LeadForm',
  !hasPlaceholderInCalc && !hasPlaceholderInLead
);

// Check that thumbnail <img> tags in CalculatorSection declare loading="lazy" and alt
const imgTags = calcSource.match(/<img[\s\S]*?\/>/g) || [];
const allImgsHaveAltAndLazy = imgTags.length >= 6 && imgTags.every(
  (tag) => tag.includes('alt="') && tag.includes('loading="lazy"') && tag.includes('src=')
);
check(
  'IMG-LAZY-ALT',
  `All ${imgTags.length} thumbnail <img> elements in CalculatorSection declare loading="lazy" and non-empty alt`,
  allImgsHaveAltAndLazy,
  `Found ${imgTags.length} img tags, all verified.`
);

// ----------------------------------------------------------------------------
// GROUP 2: React SSR Rendering & Hydration Integrity
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- GROUP 2: React SSR Rendering & Hydration Integrity ---${RESET}`);

const { CalculatorSection } = loadTsxModule('components/CalculatorSection.tsx');
const { LeadForm, SERVICE_OPTIONS } = loadTsxModule('components/LeadForm.tsx');

// Probe 2.1: Default SSR render of CalculatorSection
let calcDefaultHtml = '';
let calcDefaultErr = null;
try {
  calcDefaultHtml = ReactDOMServer.renderToString(React.createElement(CalculatorSection));
} catch (e) {
  calcDefaultErr = e.message;
}
check(
  'SSR-CALC-DEFAULT',
  'CalculatorSection renders via ReactDOMServer.renderToString without error',
  !calcDefaultErr && calcDefaultHtml.includes('id="kalkulacka"'),
  calcDefaultErr || `Rendered HTML length: ${calcDefaultHtml.length}`
);

// Probe 2.2: Business mode & custom bill SSR render
let calcBizHtml = '';
let calcBizErr = null;
try {
  calcBizHtml = ReactDOMServer.renderToString(
    React.createElement(CalculatorSection, {
      defaultPropertyType: 'business',
      defaultMonthlyBill: 1200,
      className: 'custom-calc-class',
    })
  );
} catch (e) {
  calcBizErr = e.message;
}
check(
  'SSR-CALC-BIZ',
  'CalculatorSection renders in business mode with customMonthlyBill=1200 and custom className',
  !calcBizErr && calcBizHtml.includes('custom-calc-class') && calcBizHtml.includes('1200'),
  calcBizErr
);

// Probe 2.3: Boundary bill values SSR render (50 € and 3000 €)
let calcBoundsOk = true;
try {
  const htmlMin = ReactDOMServer.renderToString(
    React.createElement(CalculatorSection, { defaultMonthlyBill: 50 })
  );
  const htmlMax = ReactDOMServer.renderToString(
    React.createElement(CalculatorSection, { defaultPropertyType: 'business', defaultMonthlyBill: 3000 })
  );
  calcBoundsOk = htmlMin.includes('50') && htmlMax.includes('3000') && !htmlMin.includes('NaN') && !htmlMax.includes('NaN');
} catch (e) {
  calcBoundsOk = false;
}
check(
  'SSR-CALC-BOUNDS',
  'CalculatorSection renders boundary bills (50 € min, 3000 € max) cleanly without NaN',
  calcBoundsOk
);

// Probe 2.4: Default SSR render of LeadForm
let leadDefaultHtml = '';
let leadDefaultErr = null;
try {
  leadDefaultHtml = ReactDOMServer.renderToString(React.createElement(LeadForm));
} catch (e) {
  leadDefaultErr = e.message;
}
check(
  'SSR-LEAD-DEFAULT',
  'LeadForm renders via ReactDOMServer.renderToString with default props',
  !leadDefaultErr && leadDefaultHtml.includes('<form') && leadDefaultHtml.includes('id="lead-phone"'),
  leadDefaultErr
);

// Probe 2.5: LeadForm renders across all 6 SERVICE_OPTIONS
let allServicesOk = true;
for (const opt of SERVICE_OPTIONS) {
  try {
    const html = ReactDOMServer.renderToString(
      React.createElement(LeadForm, { initialService: opt.value })
    );
    if (!html.includes(opt.value)) {
      allServicesOk = false;
    }
  } catch {
    allServicesOk = false;
  }
}
check(
  'SSR-LEAD-SERVICES',
  `LeadForm renders cleanly with all ${SERVICE_OPTIONS.length} service options in initialService`,
  allServicesOk
);

// Probe 2.6: LeadForm compact and showLocationField SSR options
let leadCompactHtml = '';
try {
  leadCompactHtml = ReactDOMServer.renderToString(
    React.createElement(LeadForm, {
      compact: true,
      showLocationField: true,
      title: 'Kompaktný Dopyt',
      subtitle: 'Kompaktný podnadpis',
    })
  );
} catch (e) {
  leadCompactHtml = '';
}
check(
  'SSR-LEAD-COMPACT',
  'LeadForm renders with compact=true and showLocationField=true including location input and titles',
  leadCompactHtml.includes('id="lead-city"') &&
  leadCompactHtml.includes('Kompaktný Dopyt') &&
  leadCompactHtml.includes('Kompaktný podnadpis')
);

// Probe 2.7: LeadForm SSR with full prefillData
const fullPrefill = {
  name: 'Martin Dopytovateľ',
  phone: '+421948111222',
  email: 'martin@marvol-test.sk',
  city: 'Martin',
  service: 'fotovoltika-dom',
  propertyType: 'home',
  monthlyBill: 160,
  recommendedKwp: 10.0,
  hasBattery: true,
  hasHeatPump: true,
  hasEV: false,
  estimatedSavings: 1400,
  netPrice: 7200,
  subsidy: 5750,
  source: 'calculator_section',
};

let leadPrefillHtml = '';
let leadPrefillErr = null;
try {
  leadPrefillHtml = ReactDOMServer.renderToString(
    React.createElement(LeadForm, { prefillData: fullPrefill })
  );
} catch (e) {
  leadPrefillErr = e.message;
}
check(
  'SSR-LEAD-PREFILL',
  'LeadForm renders with full calculator prefillData without SSR errors',
  !leadPrefillErr && leadPrefillHtml.includes('Konfigurácia z kalkulačky'),
  leadPrefillErr
);

// Probe 2.8: Deterministic rendering (Zero Hydration Mismatch probe)
// Server-side renders executed consecutively must produce 100% byte-for-byte identical output
const run1 = ReactDOMServer.renderToString(React.createElement(CalculatorSection));
const run2 = ReactDOMServer.renderToString(React.createElement(CalculatorSection));
const runLead1 = ReactDOMServer.renderToString(React.createElement(LeadForm, { prefillData: fullPrefill }));
const runLead2 = ReactDOMServer.renderToString(React.createElement(LeadForm, { prefillData: fullPrefill }));

const calcDeterministic = run1 === run2;
const leadDeterministic = runLead1 === runLead2;
check(
  'SSR-DETERMINISM',
  'Zero hydration mismatch: consecutive SSR renders produce 100% byte-identical DOM strings (no random/timestamp DOM leakage)',
  calcDeterministic && leadDeterministic
);

// Probe 2.9: Zero DOM Attribute Leakage
// Check that internal props like prefillData, hasBattery, hasHeatPump are not rendered as attributes on <form> or <section>
const leakedAttributes = [
  'prefilldata=',
  'hasbattery=',
  'hasheatpump=',
  'hasev=',
  'recommendedkwp=',
  'estimatedsavings=',
  'netprice=',
  'initialservice=',
  'initialmessage=',
];

let leakFound = false;
let leakDetails = '';
for (const attr of leakedAttributes) {
  if (leadPrefillHtml.toLowerCase().includes(attr) || calcDefaultHtml.toLowerCase().includes(attr)) {
    leakFound = true;
    leakDetails = `Attribute "${attr}" leaked into HTML`;
    break;
  }
}
check(
  'SSR-NO-DOM-LEAK',
  'Zero DOM attribute leakage: React props (prefillData, hasBattery, etc.) do not leak into DOM tag attributes',
  !leakFound,
  leakDetails
);

// Probe 2.10: Offscreen Honeypot input presence in SSR
const calcHasHoneypot = calcDefaultHtml.includes('name="b_url"') && calcDefaultHtml.includes('tabindex="-1"');
const leadHasHoneypot = leadDefaultHtml.includes('name="b_url"') && leadDefaultHtml.includes('tabindex="-1"');
check(
  'SSR-HONEYPOT',
  'Both CalculatorSection and LeadForm render invisible honeypot input with name="b_url" and tabIndex="-1"',
  calcHasHoneypot && leadHasHoneypot
);

// ----------------------------------------------------------------------------
// GROUP 3: PrefillData Bridge & Dynamic Context Confirmation
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- GROUP 3: PrefillData Bridge & Dynamic Context Confirmation ---${RESET}`);

// Probe 3.1: Confirmation strip renders with calculator outputs
const hasConfirmationStrip = leadPrefillHtml.includes('Konfigurácia z kalkulačky');
const displaysPropertyType = leadPrefillHtml.includes('Rodinný dom');
const displaysMonthlyBill = leadPrefillHtml.includes('160') && leadPrefillHtml.includes('€/mes.');
const displaysRecommendedKwp = leadPrefillHtml.includes('10') && leadPrefillHtml.includes('kWp');
const displaysSubsidy = leadPrefillHtml.includes('Dotácia:') && leadPrefillHtml.includes('5') && leadPrefillHtml.includes('750');
const displaysBattery = leadPrefillHtml.includes('Batéria');
const displaysHeatPump = leadPrefillHtml.includes('Tepelné čerpadlo');
const displaysSavings = leadPrefillHtml.includes('1400') && leadPrefillHtml.includes('€/rok');

check(
  'BRIDGE-CONFIRM-STRIP',
  'LeadForm renders complete confirmation strip with propertyType, monthlyBill, kWp, subsidy, add-on badges, savings',
  hasConfirmationStrip &&
  displaysPropertyType &&
  displaysMonthlyBill &&
  displaysRecommendedKwp &&
  displaysSubsidy &&
  displaysBattery &&
  displaysHeatPump &&
  displaysSavings,
  `Checks: strip=${hasConfirmationStrip}, type=${displaysPropertyType}, bill=${displaysMonthlyBill}, kwp=${displaysRecommendedKwp}, sub=${displaysSubsidy}, bat=${displaysBattery}, hp=${displaysHeatPump}, sav=${displaysSavings}`
);

// Probe 3.2: Confirmation strip absent when prefillData is empty or has no calculator telemetry
const leadEmptyPrefillHtml = ReactDOMServer.renderToString(
  React.createElement(LeadForm, { prefillData: {} })
);
const leadNoPrefillHtml = ReactDOMServer.renderToString(
  React.createElement(LeadForm, { prefillData: undefined })
);
check(
  'BRIDGE-NO-STRIP-WHEN-EMPTY',
  'Confirmation strip is strictly NOT rendered when prefillData is empty {} or undefined',
  !leadEmptyPrefillHtml.includes('Konfigurácia z kalkulačky') &&
  !leadNoPrefillHtml.includes('Konfigurácia z kalkulačky')
);

// Probe 3.3: Business propertyType maps to "Firma" in confirmation strip
const bizPrefillHtml = ReactDOMServer.renderToString(
  React.createElement(LeadForm, {
    prefillData: {
      propertyType: 'business',
      monthlyBill: 1500,
      recommendedKwp: 45.0,
    },
  })
);
check(
  'BRIDGE-BIZ-TYPE-MAP',
  'propertyType="business" maps cleanly to label "Firma" in LeadForm confirmation pill',
  bizPrefillHtml.includes('Objekt:') && bizPrefillHtml.includes('Firma')
);

// Probe 3.4: Form fields initial value prefill from prefillData & initialMessage
const prefillFormFields = {
  name: 'Elena Zákazníčka',
  phone: '+421905888999',
  email: 'elena@firma.sk',
  city: 'Žilina',
  service: 'cerpadlo',
};
const leadPrefilledFieldsHtml = ReactDOMServer.renderToString(
  React.createElement(LeadForm, {
    prefillData: prefillFormFields,
    initialMessage: 'Predvyplnená správa od klienta',
    showLocationField: true,
  })
);
const nameInHtml = leadPrefilledFieldsHtml.includes('value="Elena Zákazníčka"');
const phoneInHtml = leadPrefilledFieldsHtml.includes('value="+421905888999"');
const emailInHtml = leadPrefilledFieldsHtml.includes('value="elena@firma.sk"');
const cityInHtml = leadPrefilledFieldsHtml.includes('value="Žilina"');
const messageInHtml = leadPrefilledFieldsHtml.includes('Predvyplnená správa od klienta');
check(
  'BRIDGE-FIELD-PREPOP',
  'prefillData initial values (name, phone, email, city) and initialMessage pre-populate into SSR HTML form inputs',
  nameInHtml && phoneInHtml && emailInHtml && cityInHtml && messageInHtml,
  `name=${nameInHtml}, phone=${phoneInHtml}, email=${emailInHtml}, city=${cityInHtml}, msg=${messageInHtml}`
);

// Probe 3.5: Adversarial XSS & Special Characters in prefillData
const adversarialPrefill = {
  name: '<script>alert("xss")</script>',
  phone: '+421948111222',
  email: 'test"onclick="alert(1)"@domain.sk',
  city: '<img src=x onerror=alert(1)>',
  message: '"><marquee>Inject</marquee>',
  recommendedKwp: 12.5,
};
const xssHtml = ReactDOMServer.renderToString(
  React.createElement(LeadForm, {
    prefillData: adversarialPrefill,
    showLocationField: true,
  })
);
const unescapedScript = xssHtml.includes('<script>alert("xss")</script>');
const unescapedImg = xssHtml.includes('<img src=x onerror=alert(1)>');
const unescapedMarquee = xssHtml.includes('<marquee>Inject</marquee>');
check(
  'ADV-XSS-PREFILL-ESCAPED',
  'Adversarial HTML/XSS injection attempts in prefillData are safely encoded by React and never render raw unescaped script tags',
  !unescapedScript && !unescapedImg && !unescapedMarquee
);

// Probe 3.6: Tolerant handling of null / NaN values in prefillData
let nullTolerantOk = true;
try {
  const nullHtml = ReactDOMServer.renderToString(
    React.createElement(LeadForm, {
      prefillData: {
        propertyType: null,
        monthlyBill: NaN,
        recommendedKwp: undefined,
        subsidy: 0,
        hasBattery: null,
      },
    })
  );
  nullTolerantOk = typeof nullHtml === 'string';
} catch {
  nullTolerantOk = false;
}
check(
  'ADV-NULL-PREFILL-TOLERANCE',
  'LeadForm handles null, NaN, and undefined telemetry values gracefully without throwing uncaught exceptions',
  nullTolerantOk
);

// ----------------------------------------------------------------------------
// GROUP 4: Lead Submission Payload Serialization & API Persistence
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- GROUP 4: Lead Submission Payload Serialization & API Persistence ---${RESET}`);

// Import the real lead API handler
const leadHandler = loadTsxModule('pages/api/lead.ts').default;

async function executeLeadApiCall(payload) {
  let statusCode = 0;
  let responseData = null;

  const mockReq = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: payload,
    socket: { remoteAddress: '127.0.0.1' },
  };

  const mockRes = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    setHeader() {},
  };

  await leadHandler(mockReq, mockRes);
  return { statusCode, responseData };
}

// Probe 4.1: CalculatorSection payload format verification
// Verify that CalculatorSection handleSubmit constructs exact expected payload keys
const calcSubmitMatch = calcSource.match(/body:\s*JSON\.stringify\((\{[\s\S]*?\})\)/);
check(
  'PAYLOAD-CALC-KEYS',
  'CalculatorSection handleSubmit constructs payload containing full telemetry (propertyType, monthlyBill, recommendedKwp, subsidy, b_url, etc.)',
  Boolean(calcSubmitMatch) &&
  calcSubmitMatch[1].includes('propertyType') &&
  calcSubmitMatch[1].includes('monthlyBill') &&
  calcSubmitMatch[1].includes('hasBattery') &&
  calcSubmitMatch[1].includes('hasHeatPump') &&
  calcSubmitMatch[1].includes('hasEV') &&
  calcSubmitMatch[1].includes('recommendedKwp') &&
  calcSubmitMatch[1].includes('estimatedSavings') &&
  calcSubmitMatch[1].includes('netPrice') &&
  calcSubmitMatch[1].includes('subsidy: estimatedSubsidy') &&
  calcSubmitMatch[1].includes('b_url: bUrl') &&
  calcSubmitMatch[1].includes("source: 'calculator_section'")
);

// Probe 4.2: LeadForm payload forwarding verification
const leadSubmitMatch = leadSource.match(/body:\s*JSON\.stringify\((\{[\s\S]*?\})\)/);
check(
  'PAYLOAD-LEAD-FORWARD',
  'LeadForm handleSubmit forwards calculator telemetry from prefillData to /api/lead',
  Boolean(leadSubmitMatch) &&
  leadSubmitMatch[1].includes('propertyType: prefillData?.propertyType') &&
  leadSubmitMatch[1].includes('monthlyBill: prefillData?.monthlyBill') &&
  leadSubmitMatch[1].includes('hasBattery: prefillData?.hasBattery') &&
  leadSubmitMatch[1].includes('hasHeatPump: prefillData?.hasHeatPump') &&
  leadSubmitMatch[1].includes('hasEV: prefillData?.hasEV') &&
  leadSubmitMatch[1].includes('recommendedKwp: prefillData?.recommendedKwp') &&
  leadSubmitMatch[1].includes('estimatedSavings: prefillData?.estimatedSavings') &&
  leadSubmitMatch[1].includes('netPrice: prefillData?.netPrice') &&
  leadSubmitMatch[1].includes('subsidy: prefillData?.subsidy') &&
  leadSubmitMatch[1].includes('b_url: bUrl')
);

// Probe 4.3: Real API submission of enriched calculator lead to /api/lead
const testLeadUniqueName = `Challenger2-Lead-${Date.now()}`;
const calcApiPayload = {
  name: testLeadUniqueName,
  phone: '+421948555666',
  email: 'challenger2@marvol.sk',
  city: 'Vrútky',
  propertyType: 'home',
  monthlyBill: 180,
  hasBattery: true,
  hasHeatPump: true,
  hasEV: true,
  recommendedKwp: 14.8,
  estimatedSavings: 1720,
  netPrice: 11200,
  subsidy: 5750,
  b_url: '',
  source: 'calculator_section',
  service: 'fotovoltika-dom',
  message: 'Testovacia správa z kalkulačky s kompletnými telemetrickými dátami.',
};

const apiRes = await executeLeadApiCall(calcApiPayload);
const leadsOnDisk = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
const savedLead = leadsOnDisk.find((l) => l.name === testLeadUniqueName);

const apiSuccess = apiRes.statusCode === 200 && apiRes.responseData?.success === true;
const recordMatches = Boolean(
  savedLead &&
  savedLead.propertyType === 'home' &&
  savedLead.monthlyBill === 180 &&
  savedLead.hasBattery === true &&
  savedLead.hasHeatPump === true &&
  savedLead.hasEV === true &&
  savedLead.recommendedKwp === 14.8 &&
  savedLead.estimatedSavings === 1720 &&
  savedLead.netPrice === 11200 &&
  savedLead.subsidy === 5750 &&
  savedLead.source === 'calculator_section'
);

check(
  'API-CALC-PERSISTENCE',
  'POST /api/lead persists full calculator telemetry with exact types (numbers, booleans) into data/leads.json',
  apiSuccess && recordMatches,
  `Status: ${apiRes.statusCode}, Found lead: ${Boolean(savedLead)}`
);

// Probe 4.4: Honeypot bot trap with enriched payload
const botLeadName = `Bot-Spam-${Date.now()}`;
const botPayload = {
  ...calcApiPayload,
  name: botLeadName,
  b_url: 'http://spam-target.com', // Populated honeypot
};

const botRes = await executeLeadApiCall(botPayload);
const leadsAfterBot = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
const botSaved = leadsAfterBot.some((l) => l.name === botLeadName);

check(
  'API-HONEYPOT-DISCARD',
  'Populated honeypot (b_url) returns HTTP 200 BOT-TRAP and strictly NEVER saves record to data/leads.json',
  botRes.statusCode === 200 &&
  botRes.responseData?.leadId?.startsWith('BOT-TRAP') &&
  !botSaved
);

// Probe 4.5: Protocol enforcement on /api/lead
const getRes = { statusCode: 0, responseData: null };
await leadHandler(
  { method: 'GET', headers: {} },
  {
    status(c) { getRes.statusCode = c; return this; },
    json(d) { getRes.responseData = d; return this; },
    setHeader() {},
  }
);
check(
  'API-METHOD-NOT-ALLOWED',
  'GET /api/lead is rejected with HTTP 405 Method Not Allowed',
  getRes.statusCode === 405
);

// Probe 4.6: Invalid phone numbers rejection
const badPhoneRes = await executeLeadApiCall({
  name: 'Test Testovaci',
  phone: '12345', // Underlength
});
check(
  'API-BAD-PHONE-REJECT',
  'Underlength phone number (< 9 digits) is rejected with HTTP 400',
  badPhoneRes.statusCode === 400
);

// Restore leads.json backup to maintain zero test footprint
if (originalLeadsBackup !== null) {
  fs.writeFileSync(leadsFilePath, originalLeadsBackup, 'utf8');
}

// ----------------------------------------------------------------------------
// SUMMARY & VERDICT
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`  Total Probes : ${passedCount + failedCount}`);
console.log(`  Passed       : ${GREEN}${passedCount}${RESET}`);
console.log(`  Failed       : ${failedCount > 0 ? RED : GREEN}${failedCount}${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

if (failedCount > 0) {
  console.error(`${RED}M2 Challenger 2 stress test suite FAILED with ${failedCount} defects.${RESET}`);
  process.exit(1);
} else {
  console.log(`${GREEN}✔ All M2 Challenger 2 stress test probes PASSED with 100% success rate!${RESET}`);
  process.exit(0);
}
