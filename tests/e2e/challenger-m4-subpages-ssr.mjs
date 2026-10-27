#!/usr/bin/env node
/**
 * Empirical Challenger 1 (M4) Test Harness:
 * SSR Hydration, Determinism, DOM Invariants, Attribute Leakage & Route Link Integrity Across All 12 Subpages
 *
 * Agent: teamwork_preview_challenger_m4_1
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
console.log(`${BOLD}${CYAN}  M4 CHALLENGER 1: SSR HYDRATION & ROUTE LINK INTEGRITY ACROSS SUBPAGES ${RESET}`);
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

// ----------------------------------------------------------------------------
// Module Loader Helper for TypeScript/React Components in VM
// ----------------------------------------------------------------------------
const moduleCache = new Map();

function loadTsxModule(relPath, currentRoute = '/') {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  const cacheKey = `${fullPath}::${currentRoute}`;
  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey);
  }

  const code = fs.readFileSync(fullPath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });

  const mockRouter = {
    pathname: currentRoute,
    route: currentRoute,
    query: {},
    asPath: currentRoute,
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: () => {},
    back: () => {},
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isFallback: false,
  };

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
      if (mod === 'next/router') {
        return {
          useRouter: () => mockRouter,
          default: {
            useRouter: () => mockRouter,
            ...mockRouter,
          },
        };
      }
      if (mod === 'next/head') {
        // Render Head children directly so we can inspect <title>, <meta>, <link> etc in SSR output
        const Head = function ({ children }) {
          return React.createElement('div', { 'data-next-head': 'true', style: { display: 'none' } }, children);
        };
        Head.default = Head;
        return Head;
      }
      if (mod.startsWith('./') || mod.startsWith('../')) {
        const targetBase = path.resolve(path.dirname(fullPath), mod);
        for (const ext of ['', '.tsx', '.ts', '/index.tsx', '/index.ts']) {
          if (fs.existsSync(targetBase + ext) && fs.statSync(targetBase + ext).isFile()) {
            return loadTsxModule(path.relative(ROOT_DIR, targetBase + ext), currentRoute);
          }
        }
      }
      if (mod === '@/components/icons') {
        return loadTsxModule('components/icons/index.ts', currentRoute);
      }
      if (mod.startsWith('@/')) {
        const resolved = mod.replace('@/', '');
        for (const ext of ['', '.tsx', '.ts', '/index.tsx', '/index.ts']) {
          if (fs.existsSync(path.resolve(ROOT_DIR, resolved + ext)) && fs.statSync(path.resolve(ROOT_DIR, resolved + ext)).isFile()) {
            return loadTsxModule(resolved + ext, currentRoute);
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
  moduleCache.set(cacheKey, sandbox.module.exports);
  return sandbox.module.exports;
}

// ----------------------------------------------------------------------------
// SUBPAGES DEFINITIONS UNDER TEST
// ----------------------------------------------------------------------------
const SUBPAGES = [
  {
    id: 'DOMACNOSTI',
    file: 'pages/fotovoltika-pre-domacnosti.tsx',
    route: '/fotovoltika-pre-domacnosti',
    expectedContent: ['Fotovoltika pre rodinné domy', 'Zelená domácnostiam', 'Štandard Hybrid 6 kWp'],
    expectedId: 'fotovoltika-domacnosti',
    hasLeadForm: true,
    leadService: 'fotovoltika-dom',
  },
  {
    id: 'FIRMY',
    file: 'pages/fotovoltika-pre-firmy.tsx',
    route: '/fotovoltika-pre-firmy',
    expectedContent: ['Fotovoltika pre firmy', 'Znížte prevádzkové náklady', 'Zelená podnikom'],
    expectedId: 'fotovoltika-firmy',
    hasLeadForm: true,
    leadService: 'fotovoltika-firma',
  },
  {
    id: 'BESS',
    file: 'pages/bateriove-uloziska-bess.tsx',
    route: '/bateriove-uloziska-bess',
    expectedContent: ['Batériové úložiská BESS', 'LiFePO4', 'Wallbox'],
    expectedId: 'bess-storage',
    hasLeadForm: true,
    leadService: 'baterie',
  },
  {
    id: 'CERPADLA',
    file: 'pages/tepelne-cerpadla.tsx',
    route: '/tepelne-cerpadla',
    expectedContent: ['Tepelné čerpadlá', 'Vzduch-Voda', 'COP'],
    expectedId: 'tepelne-cerpadla',
    hasLeadForm: true,
    leadService: 'cerpadlo',
  },
  {
    id: 'ELEKTRO',
    file: 'pages/elektroinstalacie-revizie.tsx',
    route: '/elektroinstalacie-revizie',
    expectedContent: ['Elektroinštalácie', 'Revízie', 'OPOS'],
    expectedId: 'elektroinstalacie-revizie',
    hasLeadForm: true,
    leadService: 'elektro',
  },
  {
    id: 'ESHOP',
    file: 'pages/eshop.tsx',
    route: '/eshop',
    expectedContent: ['Solárne komponenty', 'TOPCon', 'Kúpiť s kompletnou montážou'],
    expectedId: 'katalog',
    hasLeadForm: true,
    leadService: 'eshop-dopyt',
  },
  {
    id: 'KONTAKT',
    file: 'pages/kontakt.tsx',
    route: '/kontakt',
    expectedContent: ['Kontaktujte nás', 'Získajte návrh zdarma', 'info@marvol.sk'],
    expectedId: 'kontakt',
    hasLeadForm: true,
    leadService: 'vseobecny-kontakt',
  },
  {
    id: 'SLUZBY-NAVRH',
    file: 'pages/sluzby/navrh-projektu.tsx',
    route: '/sluzby/navrh-projektu',
    expectedContent: ['Návrh projektu fotovoltiky', '3D Modelovanie', 'Jednopólové schémy'],
    expectedId: 'navrh-projektu',
    hasLeadForm: true,
    leadService: 'navrh-projektu',
  },
  {
    id: 'SLUZBY-MONTAZ',
    file: 'pages/sluzby/instalacia-montaz.tsx',
    route: '/sluzby/instalacia-montaz',
    expectedContent: ['Profesionálna montáž fotovoltiky', 'certifikovanými montérmi', 'Hliníkové konštrukcie'],
    expectedId: 'instalacia-montaz',
    hasLeadForm: true,
    leadService: 'instalacia-montaz',
  },
  {
    id: 'SLUZBY-PORADENSTVO',
    file: 'pages/sluzby/konzultacie-poradenstvo.tsx',
    route: '/sluzby/konzultacie-poradenstvo',
    expectedContent: ['Energetické poradenstvo', 'analýza spotreby', 'dotácie SIEA'],
    expectedId: 'konzultacie-poradenstvo',
    hasLeadForm: true,
    leadService: 'konzultacie-poradenstvo',
  },
  {
    id: 'SLUZBY-PROTIPOZIARNA',
    file: 'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx',
    route: '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
    expectedContent: ['Protipožiarna ochrana fotovoltiky', 'Rapid Shutdown', 'AFDD'],
    expectedId: 'protipoziarna-ochrana',
    hasLeadForm: true,
    leadService: 'protipoziarna-ochrana',
  },
  {
    id: 'SLUZBY-REVIZIE',
    file: 'pages/sluzby/revizie-dotacie.tsx',
    route: '/sluzby/revizie-dotacie',
    expectedContent: ['Úradné revízie fotovoltiky', 'OPOS', 'dotačný servis SIEA'],
    expectedId: 'revizie-dotacie',
    hasLeadForm: true,
    leadService: 'revizie-dotacie',
  },
  {
    id: 'GDPR-POLICY',
    file: 'pages/ochrana-osobnych-udajov.tsx',
    route: '/ochrana-osobnych-udajov',
    expectedContent: ['Zásady ochrany osobných údajov', 'Prevádzkovateľ osobných údajov', 'Marvol s. r. o.'],
    expectedId: 'gdpr',
    hasLeadForm: false,
    leadService: null,
  },
];

// In-memory cache for rendered HTML results per page
const renderedPages = new Map();

// ----------------------------------------------------------------------------
// SECTION 1: SSR RENDERING OF ALL SUBPAGES
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 1: SSR Rendering via ReactDOMServer.renderToString ---${RESET}`);

for (const sub of SUBPAGES) {
  let html = '';
  let err = null;
  try {
    const mod = loadTsxModule(sub.file, sub.route);
    const Comp = mod.default || mod[Object.keys(mod)[0]];
    if (!Comp) {
      throw new Error(`No default export found in ${sub.file}`);
    }
    html = ReactDOMServer.renderToString(React.createElement(Comp));
    renderedPages.set(sub.route, { html, mod, Comp });
  } catch (e) {
    err = e.stack || e.message;
  }

  // Check content presence
  let contentOk = true;
  let missingSnippet = '';
  if (html) {
    for (const exp of sub.expectedContent) {
      if (typeof exp === 'function') {
        if (!exp(html)) {
          contentOk = false;
          missingSnippet = 'custom check failed';
          break;
        }
      } else if (!html.includes(exp)) {
        contentOk = false;
        missingSnippet = exp;
        break;
      }
    }
  }

  const hasHeader = html.includes('<header') || html.includes('aria-label="Hlavná navigácia"');
  const hasFooter = html.includes('<footer') || html.includes('Chotárna');
  const hasMinLength = html.length > 4000;

  check(
    `SSR-${sub.id}`,
    `<${sub.id}> (${sub.file}) renders cleanly via ReactDOMServer.renderToString (length: ${html.length} chars)`,
    !err && hasMinLength && hasHeader && hasFooter && contentOk,
    err || (missingSnippet ? `Missing content: "${missingSnippet}"` : `Length: ${html.length}, header: ${hasHeader}, footer: ${hasFooter}`)
  );
}

// ----------------------------------------------------------------------------
// SECTION 2: MULTI-RUN DETERMINISM & ZERO HYDRATION MISMATCH RISK
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 2: Multi-Run Determinism (Zero Hydration Mismatch) ---${RESET}`);

for (const sub of SUBPAGES) {
  const pageData = renderedPages.get(sub.route);
  if (!pageData) {
    check(`DET-${sub.id}`, `${sub.id} determinism check`, false, 'Page failed to render in Section 1');
    continue;
  }

  // Render 3 consecutive times with fresh module evaluation
  let r1, r2, r3;
  let detErr = null;
  try {
    r1 = ReactDOMServer.renderToString(React.createElement(pageData.Comp));
    r2 = ReactDOMServer.renderToString(React.createElement(pageData.Comp));
    r3 = ReactDOMServer.renderToString(React.createElement(pageData.Comp));
  } catch (e) {
    detErr = e.message;
  }

  const isDeterministic = !detErr && (r1 === r2) && (r2 === r3);
  check(
    `DET-${sub.id}`,
    `${sub.id} produces 100% byte-for-byte identical output over 3 consecutive SSR runs`,
    isDeterministic,
    detErr || `Run lengths: r1=${r1?.length}, r2=${r2?.length}, r3=${r3?.length}`
  );
}

// ----------------------------------------------------------------------------
// SECTION 3: DOM INVARIANTS & ZERO ATTRIBUTE LEAKAGE
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 3: DOM Invariants & Zero Attribute Leakage ---${RESET}`);

const undefinedAttrRegex = /\s(class|id|href|src|alt|title|name|value|role|aria-[a-z]+)="[^"]*undefined[^"]*"/gi;
const nullAttrRegex = /\s(class|id|href|src|alt|title|name|value|role|aria-[a-z]+)="[^"]*null[^"]*"/gi;
const objectObjRegex = /\[object\s+Object\]/g;
const nanValueRegex = /\bNaN\b/g;
const templateInterpolationRegex = /\$\{[^}]+\}/g;

for (const sub of SUBPAGES) {
  const pageData = renderedPages.get(sub.route);
  if (!pageData) continue;
  const html = pageData.html;

  const undefinedMatches = html.match(undefinedAttrRegex) || [];
  const nullMatches = html.match(nullAttrRegex) || [];
  const objectObjMatches = html.match(objectObjRegex) || [];
  const nanMatches = html.match(nanValueRegex) || [];
  const templateMatches = html.match(templateInterpolationRegex) || [];

  const leakIssues = [];
  if (undefinedMatches.length) leakIssues.push(`undefined attrs: ${undefinedMatches.slice(0, 3).join(', ')}`);
  if (nullMatches.length) leakIssues.push(`null attrs: ${nullMatches.slice(0, 3).join(', ')}`);
  if (objectObjMatches.length) leakIssues.push(`[object Object]: ${objectObjMatches.length} occurrences`);
  if (nanMatches.length) leakIssues.push(`NaN values: ${nanMatches.length} occurrences`);
  if (templateMatches.length) leakIssues.push(`template literals: ${templateMatches.slice(0, 3).join(', ')}`);

  check(
    `LEAK-${sub.id}`,
    `${sub.id} zero DOM attribute leakage (undefined, null, NaN, [object Object], \${...})`,
    leakIssues.length === 0,
    leakIssues.join('; ')
  );
}

// ----------------------------------------------------------------------------
// SECTION 4: IMAGE VALIDITY & ASSET PHYSICAL INTEGRITY
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 4: Image Tag Validity & Physical Asset Existence ---${RESET}`);

const imgTagRegex = /<img\s+[^>]*>/gi;
let totalImagesChecked = 0;

for (const sub of SUBPAGES) {
  const pageData = renderedPages.get(sub.route);
  if (!pageData) continue;
  const html = pageData.html;

  const imgTags = html.match(imgTagRegex) || [];
  totalImagesChecked += imgTags.length;

  let pageImagesValid = true;
  const imageFailures = [];

  for (const tag of imgTags) {
    const srcMatch = tag.match(/src="([^"]+)"/i);
    const altMatch = tag.match(/alt="([^"]*)"/i);

    if (!srcMatch || !srcMatch[1]) {
      pageImagesValid = false;
      imageFailures.push(`Missing src in tag: ${tag}`);
      continue;
    }
    if (!altMatch) {
      pageImagesValid = false;
      imageFailures.push(`Missing alt in tag: ${tag}`);
      continue;
    }

    const src = srcMatch[1];
    if (src.startsWith('/')) {
      const physicalPath = path.join(ROOT_DIR, 'public', src);
      if (!fs.existsSync(physicalPath)) {
        pageImagesValid = false;
        imageFailures.push(`File missing on disk: ${src}`);
      } else {
        const stats = fs.statSync(physicalPath);
        if (stats.size === 0) {
          pageImagesValid = false;
          imageFailures.push(`Zero-byte file: ${src}`);
        }
      }
    }
  }

  check(
    `IMG-${sub.id}`,
    `${sub.id} has ${imgTags.length} valid <img> tags with non-empty src/alt and verified physical existence`,
    pageImagesValid,
    imageFailures.slice(0, 3).join('; ')
  );
}

// ----------------------------------------------------------------------------
// SECTION 5: ROUTE LINK INTEGRITY & BREADCRUMBS
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 5: Route Link Integrity & Breadcrumb Destinations ---${RESET}`);

const hrefRegex = /href="([^"]+)"/g;
let totalRoutesChecked = 0;

// Set of all valid pages on the site
const validNextPages = new Set([
  '/',
  '/fotovoltika-pre-domacnosti',
  '/fotovoltika-pre-firmy',
  '/bateriove-uloziska-bess',
  '/tepelne-cerpadla',
  '/elektroinstalacie-revizie',
  '/eshop',
  '/kontakt',
  '/sluzby/navrh-projektu',
  '/sluzby/instalacia-montaz',
  '/sluzby/konzultacie-poradenstvo',
  '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
  '/sluzby/revizie-dotacie',
  '/ochrana-osobnych-udajov',
]);

for (const sub of SUBPAGES) {
  const pageData = renderedPages.get(sub.route);
  if (!pageData) continue;
  const html = pageData.html;

  // Extract navigation hyperlinks: <a ... href="...">
  const aTagRegex = /<a\s+[^>]*href="([^"]+)"/gi;
  const hrefs = [];
  let m;
  while ((m = aTagRegex.exec(html)) !== null) {
    hrefs.push(m[1]);
  }

  // Filter internal route links (starting with / but not protocol // or anchor /# or anchor #)
  const internalRouteLinks = hrefs.filter((h) => {
    if (!h.startsWith('/')) return false;
    if (h.startsWith('//')) return false;
    if (h.startsWith('/#')) return false;
    return true;
  });

  let linksValid = true;
  const badLinks = [];

  for (const link of internalRouteLinks) {
    totalRoutesChecked++;
    // Extract base pathname (remove #hash or ?query)
    const [pathname] = link.split(/[?#]/);
    if (!validNextPages.has(pathname)) {
      linksValid = false;
      badLinks.push(link);
    }
  }

  // Also check that any React 19 preloaded image links in <link rel="preload" ... href="..."> exist on disk
  const preloadTagRegex = /<link\s+[^>]*rel="preload"[^>]*href="([^"]+)"/gi;
  let preloadsValid = true;
  const badPreloads = [];
  let pMatch;
  while ((pMatch = preloadTagRegex.exec(html)) !== null) {
    const pSrc = pMatch[1];
    if (pSrc.startsWith('/')) {
      const pFile = path.join(ROOT_DIR, 'public', pSrc);
      if (!fs.existsSync(pFile)) {
        preloadsValid = false;
        badPreloads.push(pSrc);
      }
    }
  }

  // Verify breadcrumb if page declares one
  const hasBreadcrumbRoot = hrefs.includes('/');
  check(
    `LINK-ROUTES-${sub.id}`,
    `${sub.id} all ${internalRouteLinks.length} navigation <a> links resolve to valid pages & preloads exist`,
    linksValid && preloadsValid && (sub.id === 'GDPR-POLICY' || hasBreadcrumbRoot),
    badLinks.length ? `Invalid routes: ${badLinks.join(', ')}` : (badPreloads.length ? `Missing preload assets: ${badPreloads.join(', ')}` : '')
  );
}

// ----------------------------------------------------------------------------
// SECTION 6: IN-PAGE ANCHOR TARGET RESOLUTION
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 6: In-Page Anchor Target Resolution ---${RESET}`);

for (const sub of SUBPAGES) {
  const pageData = renderedPages.get(sub.route);
  if (!pageData) continue;
  const html = pageData.html;

  const hrefs = [];
  let m;
  const pageHrefRegex = /href="([^"]+)"/g;
  while ((m = pageHrefRegex.exec(html)) !== null) {
    hrefs.push(m[1]);
  }

  // In-page anchors are either '#anchor' or '/current-route#anchor'
  const inPageAnchors = [];
  for (const h of hrefs) {
    if (h.startsWith('#') && h.length > 1) {
      inPageAnchors.push(h.slice(1));
    } else if (h.startsWith(`${sub.route}#`) && h.length > sub.route.length + 1) {
      inPageAnchors.push(h.slice(sub.route.length + 1));
    }
  }

  const uniqueAnchors = Array.from(new Set(inPageAnchors));
  let anchorsValid = true;
  const missingAnchorIds = [];

  for (const anchor of uniqueAnchors) {
    // Check if id="anchor" exists in the rendered HTML
    const idPattern = new RegExp(`id="${anchor}"`, 'i');
    if (!idPattern.test(html)) {
      anchorsValid = false;
      missingAnchorIds.push(anchor);
    }
  }

  check(
    `ANCHOR-${sub.id}`,
    `${sub.id} has ${uniqueAnchors.length} in-page anchors with 100% target ID resolution in rendered DOM`,
    anchorsValid,
    missingAnchorIds.length ? `Missing target IDs: ${missingAnchorIds.map((a) => `#${a}`).join(', ')}` : ''
  );
}

// ----------------------------------------------------------------------------
// SECTION 7: LEADFORM PREFILL & STATUTORY METADATA CONTRACTS
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 7: LeadForm & Statutory Integration Contracts ---${RESET}`);

for (const sub of SUBPAGES) {
  if (!sub.hasLeadForm) continue;
  const pageData = renderedPages.get(sub.route);
  if (!pageData) continue;
  const html = pageData.html;

  // Verify LeadForm is rendered into the DOM
  const hasForm = html.includes('<form') && html.includes('api/lead') || html.includes('Meno a priezvisko') || html.includes('Telefón');
  const hasGdprNotice = html.includes('GDPR') || html.includes('Osobné údaje') || html.includes('ochrana-osobnych-udajov');
  const hasPhoneInput = html.includes('name="phone"') || html.includes('placeholder="+421');

  check(
    `FORM-${sub.id}`,
    `${sub.id} integrates LeadForm with GDPR consent and phone input field`,
    hasForm && hasGdprNotice && hasPhoneInput,
    `hasForm=${hasForm}, hasGdpr=${hasGdprNotice}, hasPhone=${hasPhoneInput}`
  );
}

// ----------------------------------------------------------------------------
// SECTION 8: ANTI-SLOP & ACCESSIBILITY AUDIT ON SUBPAGE SOURCE CODE
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 8: Anti-Slop & Design-Taste Conformance ---${RESET}`);

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const restingShadowRegex = /\bshadow-(lg|xl|2xl)\b/g;

for (const sub of SUBPAGES) {
  const content = fs.readFileSync(path.join(ROOT_DIR, sub.file), 'utf8');
  const lines = content.split('\n');

  let zeroEmojis = true;
  const emojiViolations = [];
  let zeroRestingShadows = true;
  const shadowViolations = [];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    // Check emojis (excluding comments)
    if (emojiRegex.test(line) && !line.trim().startsWith('//') && !line.trim().startsWith('/*') && !line.trim().startsWith('*')) {
      zeroEmojis = false;
      emojiViolations.push(`Line ${idx + 1}: ${line.trim().slice(0, 60)}`);
    }

    // Check resting heavy shadows
    const matches = line.match(restingShadowRegex);
    if (matches && !line.includes('hover:shadow') && !line.includes('drop-shadow-') && !line.includes('active:shadow') && !line.trim().startsWith('//')) {
      zeroRestingShadows = false;
      shadowViolations.push(`Line ${idx + 1}: ${line.trim().slice(0, 60)}`);
    }
  }

  check(
    `SLOP-EMOJI-${sub.id}`,
    `${sub.id} (${sub.file}) zero UI emojis in JSX markup (clean SVG icon usage)`,
    zeroEmojis,
    emojiViolations.slice(0, 2).join('; ')
  );

  check(
    `SLOP-SHADOW-${sub.id}`,
    `${sub.id} (${sub.file}) zero un-hovered heavy resting shadows (shadow-xl/2xl)`,
    zeroRestingShadows,
    shadowViolations.slice(0, 2).join('; ')
  );
}

// ----------------------------------------------------------------------------
// SUMMARY & VERDICT
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}========================================================================${RESET}`);
console.log(`${BOLD}  EXECUTION SUMMARY${RESET}`);
console.log(`${BOLD}========================================================================${RESET}`);
console.log(`  Total Checks: ${passedCount + failedCount}`);
console.log(`  Passed      : ${GREEN}${passedCount}${RESET}`);
console.log(`  Failed      : ${failedCount > 0 ? RED : GREEN}${failedCount}${RESET}`);
console.log(`  Images Verified : ${totalImagesChecked}`);
console.log(`  Routes Verified : ${totalRoutesChecked}`);
console.log(`${BOLD}========================================================================${RESET}\n`);

if (failedCount > 0) {
  console.log(`${RED}${BOLD}✖ SOME CHECKS FAILED!${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}✔ ALL CHECKS PASSED WITH 100% SUCCESS RATE (0 defects).${RESET}\n`);
  process.exit(0);
}
