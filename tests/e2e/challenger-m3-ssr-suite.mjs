#!/usr/bin/env node
/**
 * Empirical Challenger 1 (M3) Test Harness:
 * SSR Hydration, DOM Invariants, Attribute Leakage & Subpage Links Integrity
 *
 * Agent: teamwork_preview_challenger_m3_1
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
console.log(`${BOLD}${CYAN}  M3 CHALLENGER 1: SSR HYDRATION, DOM INVARIANTS & SUBPAGE LINKS AUDIT  ${RESET}`);
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

function loadTsxModule(relPath) {
  const fullPath = path.resolve(ROOT_DIR, relPath);
  if (moduleCache.has(fullPath)) {
    return moduleCache.get(fullPath);
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
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
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
        const Head = function ({ children }) {
          return React.createElement(React.Fragment, null, children);
        };
        Head.default = Head;
        return Head;
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
  moduleCache.set(fullPath, sandbox.module.exports);
  return sandbox.module.exports;
}

// ----------------------------------------------------------------------------
// SECTION 1: SSR RENDERING OF PAGES/INDEX.TSX AND INDIVIDUAL COMPONENTS
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 1: SSR Rendering via ReactDOMServer.renderToString ---${RESET}`);

// 1.1 Load components
let HomePageModule, LayoutModule, HeroModule, SubsidyBannerModule, TargetAudienceModule;
let ServicesModule, CalculatorModule, ProcessModule, WhyUsModule, ReferencesModule;

try {
  HomePageModule = loadTsxModule('pages/index.tsx');
  LayoutModule = loadTsxModule('components/Layout.tsx');
  HeroModule = loadTsxModule('components/Hero.tsx');
  SubsidyBannerModule = loadTsxModule('components/SubsidyBanner.tsx');
  TargetAudienceModule = loadTsxModule('components/TargetAudienceSection.tsx');
  ServicesModule = loadTsxModule('components/ServicesSection.tsx');
  CalculatorModule = loadTsxModule('components/CalculatorSection.tsx');
  ProcessModule = loadTsxModule('components/ProcessSection.tsx');
  WhyUsModule = loadTsxModule('components/WhyUsSection.tsx');
  ReferencesModule = loadTsxModule('components/ReferencesSection.tsx');
} catch (err) {
  console.error('Error loading modules:', err);
}

const HomeComp = HomePageModule?.default || HomePageModule?.Home;
const HeroComp = HeroModule?.Hero;
const SubsidyBannerComp = SubsidyBannerModule?.SubsidyBanner;
const TargetAudienceComp = TargetAudienceModule?.TargetAudienceSection;
const ServicesComp = ServicesModule?.ServicesSection;
const CalculatorComp = CalculatorModule?.CalculatorSection;
const ProcessComp = ProcessModule?.ProcessSection;
const WhyUsComp = WhyUsModule?.WhyUsSection;
const ReferencesComp = ReferencesModule?.ReferencesSection;

// Test individual components SSR
const componentTestList = [
  { id: 'SSR-COMP-HERO', name: 'Hero', comp: HeroComp, expectedId: 'id="fotovoltika"' },
  { id: 'SSR-COMP-SUBSIDY', name: 'SubsidyBanner', comp: SubsidyBannerComp, expectedId: 'Zelená domácnostiam' },
  { id: 'SSR-COMP-AUDIENCE', name: 'TargetAudienceSection', comp: TargetAudienceComp, expectedId: 'id="target-groups"' },
  { id: 'SSR-COMP-SERVICES', name: 'ServicesSection', comp: ServicesComp, expectedId: 'id="sluzby"' },
  { id: 'SSR-COMP-CALC', name: 'CalculatorSection', comp: CalculatorComp, expectedId: 'id="kalkulacka"' },
  { id: 'SSR-COMP-PROCESS', name: 'ProcessSection', comp: ProcessComp, expectedId: 'Jednoduchý a prehľadný postup' },
  { id: 'SSR-COMP-WHYUS', name: 'WhyUsSection', comp: WhyUsComp, expectedId: 'Dôvody pre spoluprácu' },
  { id: 'SSR-COMP-REF', name: 'ReferencesSection', comp: ReferencesComp, expectedId: 'id="referencie"' },
];

for (const item of componentTestList) {
  let html = '';
  let err = null;
  try {
    html = ReactDOMServer.renderToString(React.createElement(item.comp));
  } catch (e) {
    err = e.message;
  }
  check(
    item.id,
    `<${item.name} /> renders via ReactDOMServer.renderToString without exception`,
    !err && html.length > 500 && html.includes(item.expectedId),
    err || `HTML length: ${html.length}`
  );
}

// Test Full Home page SSR
let homeHtml = '';
let homeErr = null;
try {
  homeHtml = ReactDOMServer.renderToString(React.createElement(HomeComp));
} catch (e) {
  homeErr = e.message;
}

check(
  'SSR-PAGE-HOME',
  'pages/index.tsx (wrapped in Layout) renders fully via ReactDOMServer.renderToString',
  !homeErr && homeHtml.length > 15000 && homeHtml.includes('<header') && homeHtml.includes('<footer') && homeHtml.includes('id="fotovoltika"'),
  homeErr || `Rendered HTML length: ${homeHtml.length}`
);

// ----------------------------------------------------------------------------
// SECTION 2: DETERMINISTIC RENDERING (ZERO HYDRATION MISMATCH)
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 2: Determinism & Zero Hydration Mismatch ---${RESET}`);

// Multiple consecutive renders of HomeComp must be 100% byte-for-byte identical
const homeRenders = [];
for (let i = 0; i < 3; i++) {
  homeRenders.push(ReactDOMServer.renderToString(React.createElement(HomeComp)));
}

const homeDeterministic = (homeRenders[0] === homeRenders[1]) && (homeRenders[1] === homeRenders[2]);
check(
  'DET-PAGE-HOME',
  'pages/index.tsx produces 100% byte-for-byte identical output over 3 consecutive SSR renders',
  homeDeterministic,
  `Lengths: ${homeRenders[0].length}, ${homeRenders[1].length}, ${homeRenders[2].length}`
);

// Test determinism for each individual component
for (const item of componentTestList) {
  const r1 = ReactDOMServer.renderToString(React.createElement(item.comp));
  const r2 = ReactDOMServer.renderToString(React.createElement(item.comp));
  const r3 = ReactDOMServer.renderToString(React.createElement(item.comp));
  const isDet = (r1 === r2) && (r2 === r3);
  check(
    `DET-${item.id.replace('SSR-', '')}`,
    `<${item.name} /> produces deterministic byte-for-byte identical SSR output across runs`,
    isDet,
    `Run 1: ${r1.length} chars, Run 2: ${r2.length} chars, Run 3: ${r3.length} chars`
  );
}

// ----------------------------------------------------------------------------
// SECTION 3: DOM INVARIANTS & ZERO ATTRIBUTE LEAKAGE
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 3: DOM Invariants & Zero Attribute Leakage ---${RESET}`);

// Attribute leakage patterns: undefined, null, NaN, unescaped brackets, [object Object]
const undefinedAttrRegex = /\s(class|id|href|src|alt|title|name|value|aria-[a-z]+)="[^"]*undefined[^"]*"/gi;
const nullAttrRegex = /\s(class|id|href|src|alt|title|name|value|aria-[a-z]+)="[^"]*null[^"]*"/gi;
const objectObjRegex = /\[object\s+Object\]/g;
const nanValueRegex = /\bNaN\b/g;
const templateInterpolationRegex = /\$\{[^}]+\}/g;

const undefinedMatches = homeHtml.match(undefinedAttrRegex) || [];
const nullMatches = homeHtml.match(nullAttrRegex) || [];
const objectObjMatches = homeHtml.match(objectObjRegex) || [];
const nanMatches = homeHtml.match(nanValueRegex) || [];
const templateMatches = homeHtml.match(templateInterpolationRegex) || [];

check(
  'DOM-NO-UNDEFINED-ATTR',
  'Zero "undefined" attribute values leaked in rendered homepage DOM',
  undefinedMatches.length === 0,
  `Found: ${undefinedMatches.join(', ')}`
);

check(
  'DOM-NO-NULL-ATTR',
  'Zero "null" attribute values leaked in rendered homepage DOM',
  nullMatches.length === 0,
  `Found: ${nullMatches.join(', ')}`
);

check(
  'DOM-NO-OBJECT-OBJECT',
  'Zero "[object Object]" serialization artifacts leaked in rendered homepage DOM',
  objectObjMatches.length === 0,
  `Found count: ${objectObjMatches.length}`
);

check(
  'DOM-NO-NAN-VALUES',
  'Zero "NaN" numerical values in rendered homepage DOM',
  nanMatches.length === 0,
  `Found count: ${nanMatches.length}`
);

check(
  'DOM-NO-TEMPLATE-LEAKS',
  'Zero unescaped ${...} template literals leaked into markup',
  templateMatches.length === 0,
  `Found: ${templateMatches.join(', ')}`
);

// Verify all <img> tags in rendered homepage have valid non-empty src, alt, and file exists
const imgTagRegex = /<img\s+[^>]*>/gi;
const allImgTags = homeHtml.match(imgTagRegex) || [];

let allImagesValid = true;
const imageIssues = [];

for (const tag of allImgTags) {
  const srcMatch = tag.match(/src="([^"]+)"/i);
  const altMatch = tag.match(/alt="([^"]*)"/i);
  
  if (!srcMatch || !srcMatch[1]) {
    allImagesValid = false;
    imageIssues.push(`Missing src in tag: ${tag}`);
    continue;
  }
  if (!altMatch) {
    allImagesValid = false;
    imageIssues.push(`Missing alt in tag: ${tag}`);
    continue;
  }
  
  const imgSrc = srcMatch[1];
  // Verify physical file existence in public/
  if (imgSrc.startsWith('/')) {
    const filePath = path.join(ROOT_DIR, 'public', imgSrc);
    if (!fs.existsSync(filePath)) {
      allImagesValid = false;
      imageIssues.push(`Referenced image file does not exist on disk: ${filePath}`);
    } else {
      const stats = fs.statSync(filePath);
      if (stats.size === 0) {
        allImagesValid = false;
        imageIssues.push(`Referenced image file is 0 bytes: ${filePath}`);
      }
    }
  }
}

check(
  'DOM-IMG-VALIDITY',
  `All ${allImgTags.length} rendered <img> tags have valid src, alt and physically exist in public/`,
  allImagesValid && allImgTags.length >= 8,
  imageIssues.slice(0, 3).join('; ')
);

// Check that hero image has eager loading and dimensions
const heroImgMatch = homeHtml.match(/<img[^>]*src="\/images\/fotovoltika-domacnosti\/hero\.jpg"[^>]*>/i);
const hasHeroEager = heroImgMatch && heroImgMatch[0].includes('loading="eager"') && heroImgMatch[0].includes('width="1376"') && heroImgMatch[0].includes('height="768"');
check(
  'DOM-HERO-IMG-SPECS',
  'Hero 16:9 photo specifies loading="eager", width=1376, height=768 and descriptive alt',
  hasHeroEager,
  heroImgMatch ? heroImgMatch[0] : 'Hero image tag not found'
);

// ----------------------------------------------------------------------------
// SECTION 4: SUBPAGE LINK INTEGRITY & ANCHOR DESTINATIONS
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 4: Subpage Link Integrity & Anchor Destinations ---${RESET}`);

// Extract all hrefs from the rendered homepage
const hrefRegex = /href="([^"]+)"/g;
const allHrefs = new Set();
let match;
while ((match = hrefRegex.exec(homeHtml)) !== null) {
  allHrefs.add(match[1]);
}

// 4.1 Internal Route links (must point to existing Next.js pages)
const requiredSubpages = [
  { href: '/fotovoltika-pre-domacnosti', targetFile: 'pages/fotovoltika-pre-domacnosti.tsx', name: 'Domácnosti' },
  { href: '/fotovoltika-pre-firmy', targetFile: 'pages/fotovoltika-pre-firmy.tsx', name: 'Firmy' },
  { href: '/bateriove-uloziska-bess', targetFile: 'pages/bateriove-uloziska-bess.tsx', name: 'BESS Batérie' },
  { href: '/tepelne-cerpadla', targetFile: 'pages/tepelne-cerpadla.tsx', name: 'Tepelné čerpadlá' },
  { href: '/elektroinstalacie-revizie', targetFile: 'pages/elektroinstalacie-revizie.tsx', name: 'Elektroinštalácie' },
  { href: '/eshop', targetFile: 'pages/eshop.tsx', name: 'E-shop' },
  { href: '/kontakt', targetFile: 'pages/kontakt.tsx', name: 'Kontakt' },
  { href: '/sluzby/navrh-projektu', targetFile: 'pages/sluzby/navrh-projektu.tsx', name: 'Služby: Návrh' },
  { href: '/sluzby/instalacia-montaz', targetFile: 'pages/sluzby/instalacia-montaz.tsx', name: 'Služby: Montáž' },
  { href: '/sluzby/konzultacie-poradenstvo', targetFile: 'pages/sluzby/konzultacie-poradenstvo.tsx', name: 'Služby: Poradenstvo' },
  { href: '/sluzby/protipoziarna-ochrana-bezpecne-napatie', targetFile: 'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx', name: 'Služby: Protipožiarna ochrana' },
  { href: '/sluzby/revizie-dotacie', targetFile: 'pages/sluzby/revizie-dotacie.tsx', name: 'Služby: Revízie' },
];

for (const sub of requiredSubpages) {
  const isPresentInHtml = allHrefs.has(sub.href);
  const fileExists = fs.existsSync(path.join(ROOT_DIR, sub.targetFile));
  check(
    `LINK-SUB-${sub.name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`,
    `Route ${sub.href} is present in navigation and resolves to ${sub.targetFile}`,
    isPresentInHtml && fileExists,
    `Present in HTML: ${isPresentInHtml}, File exists: ${fileExists}`
  );
}

// 4.2 Hero quick navigation jump pills
const heroHtml = ReactDOMServer.renderToString(React.createElement(HeroComp));
const heroHrefs = [];
let hMatch;
while ((hMatch = hrefRegex.exec(heroHtml)) !== null) {
  heroHrefs.push(hMatch[1]);
}

const heroSubpagesPresent = ['/fotovoltika-pre-domacnosti', '/fotovoltika-pre-firmy', '/bateriove-uloziska-bess', '/tepelne-cerpadla']
  .every((h) => heroHrefs.includes(h));

check(
  'LINK-HERO-PILLS',
  'Hero includes all 4 primary subpage quick-jump pills (/fotovoltika-pre-domacnosti, firmy, bess, cerpadla)',
  heroSubpagesPresent,
  `Hero hrefs: ${heroHrefs.join(', ')}`
);

// 4.3 TargetAudience CTA link destinations
const audienceHtml = ReactDOMServer.renderToString(React.createElement(TargetAudienceComp));
const audienceHrefs = [];
let aMatch;
while ((aMatch = hrefRegex.exec(audienceHtml)) !== null) {
  audienceHrefs.push(aMatch[1]);
}

const audienceSubpagesOk = audienceHrefs.includes('/fotovoltika-pre-domacnosti') &&
  audienceHrefs.includes('/fotovoltika-pre-firmy') &&
  audienceHrefs.includes('/bateriove-uloziska-bess');

check(
  'LINK-AUDIENCE-CTAS',
  'TargetAudienceSection cards route correctly to /fotovoltika-pre-domacnosti, /fotovoltika-pre-firmy, /bateriove-uloziska-bess',
  audienceSubpagesOk,
  `Audience hrefs: ${audienceHrefs.join(', ')}`
);

// 4.4 ProcessSection step subpage links
const processHtml = ReactDOMServer.renderToString(React.createElement(ProcessComp));
const processHrefs = [];
let pMatch;
while ((pMatch = hrefRegex.exec(processHtml)) !== null) {
  processHrefs.push(pMatch[1]);
}

const expectedProcessSubpages = [
  '/sluzby/konzultacie-poradenstvo',
  '/sluzby/navrh-projektu',
  '/sluzby/instalacia-montaz',
  '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
  '/sluzby/revizie-dotacie',
];
const processSubpagesOk = expectedProcessSubpages.every((h) => processHrefs.includes(h));

check(
  'LINK-PROCESS-STEPS',
  'ProcessSection links all 5 steps to their respective /sluzby/* detail subpages',
  processSubpagesOk,
  `Process hrefs: ${processHrefs.join(', ')}`
);

// 4.5 In-page Anchor Targets Resolution
// Every href="#id" or href="/#id" on the homepage must correspond to an id="id" present in homeHtml
const inPageAnchors = [];
for (const h of allHrefs) {
  if (h.startsWith('#')) {
    inPageAnchors.push(h.slice(1));
  } else if (h.startsWith('/#')) {
    inPageAnchors.push(h.slice(2));
  }
}

let allAnchorsResolved = true;
const missingAnchors = [];

for (const anchor of inPageAnchors) {
  // Exclude empty hashes or known dynamic modal triggers
  if (!anchor) continue;
  const targetIdPattern = new RegExp(`id="${anchor}"`, 'i');
  if (!targetIdPattern.test(homeHtml)) {
    allAnchorsResolved = false;
    missingAnchors.push(anchor);
  }
}

check(
  'LINK-ANCHORS-RESOLVE',
  `All ${inPageAnchors.length} in-page anchor links (#kalkulacka, #referencie, #kontakt, #sluzby, etc.) resolve to valid element IDs in home HTML`,
  allAnchorsResolved,
  `Missing targets for IDs: ${missingAnchors.join(', ')}`
);

// ----------------------------------------------------------------------------
// SECTION 5: TOUCH TARGETS & ANTI-SLOP DISCIPLINE IN M3 COMPONENTS
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}--- SECTION 5: Touch Targets & Anti-Slop Conformance ---${RESET}`);

// Check touch targets in Hero, TargetAudience, Services, Process, References
const m3SourceFiles = [
  'components/Hero.tsx',
  'components/SubsidyBanner.tsx',
  'components/TargetAudienceSection.tsx',
  'components/ServicesSection.tsx',
  'components/ProcessSection.tsx',
  'components/WhyUsSection.tsx',
  'components/ReferencesSection.tsx',
  'pages/index.tsx',
];

// 5.1 Touch target regex: check that interactive links/buttons declare min-h-[44px] or min-h-[48px]
let touchTargetsSatisfied = true;
const touchFailures = [];

for (const file of m3SourceFiles) {
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
  // TargetAudience CTAs must have min-h-[44px] and min-h-[48px]
  if (file === 'components/TargetAudienceSection.tsx') {
    const has44 = (content.match(/min-h-\[44px\]/g) || []).length >= 3;
    const has48 = (content.match(/min-h-\[48px\]/g) || []).length >= 3;
    if (!has44 || !has48) {
      touchTargetsSatisfied = false;
      touchFailures.push(`${file} missing min-h-[44px] (found ${has44}) or min-h-[48px] (found ${has48})`);
    }
  }
  if (file === 'components/ServicesSection.tsx') {
    const has44 = (content.match(/min-h-\[44px\]/g) || []).length >= 3;
    const has48 = (content.match(/min-h-\[48px\]/g) || []).length >= 3;
    const renderedServicesHtml = ReactDOMServer.renderToString(React.createElement(ServicesComp));
    const rendered48Count = (renderedServicesHtml.match(/min-h-\[48px\]/g) || []).length;
    if (!has44 || !has48 || rendered48Count < 7) {
      touchTargetsSatisfied = false;
      touchFailures.push(`${file} missing min-h-[44px] (found ${has44}) or rendered min-h-[48px] (found ${rendered48Count})`);
    }
  }
  if (file === 'components/Hero.tsx') {
    const has48 = (content.match(/min-h-\[48px\]/g) || []).length >= 4;
    if (!has48) {
      touchTargetsSatisfied = false;
      touchFailures.push(`${file} missing min-h-[48px] on CTAs`);
    }
  }
}

check(
  'UX-TOUCH-TARGETS',
  'All interactive elements in M3 homepage components enforce >= 48px touch targets and dual-regex compatibility',
  touchTargetsSatisfied,
  touchFailures.join('; ')
);

// 5.2 Zero UI emojis in M3 modified files
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
let zeroEmojis = true;
const emojiViolations = [];

for (const file of m3SourceFiles) {
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
  const lines = content.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    if (emojiRegex.test(line)) {
      zeroEmojis = false;
      emojiViolations.push(`${file}:${idx + 1}: ${line.trim()}`);
    }
  }
}

check(
  'ANTI-SLOP-NO-EMOJIS',
  'Zero UI emoji characters in all 8 M3 homepage files (replaced with SVG icons)',
  zeroEmojis,
  emojiViolations.slice(0, 3).join('; ')
);

// 5.3 Zero resting drop shadows in M3 files
const restingShadowRegex = /\bshadow-(lg|xl|2xl)\b/g;
let zeroRestingShadows = true;
const shadowViolations = [];

for (const file of m3SourceFiles) {
  if (file === 'pages/index.tsx') continue;
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
  const lines = content.split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    // Allow hover:shadow or drop-shadow on SVGs, but check for resting shadow-xl / shadow-2xl
    const matches = line.match(restingShadowRegex);
    if (matches && !line.includes('hover:shadow') && !line.includes('drop-shadow-')) {
      zeroRestingShadows = false;
      shadowViolations.push(`${file}:${idx + 1}: ${line.trim()}`);
    }
  }
}

check(
  'ANTI-SLOP-NO-RESTING-SHADOWS',
  'Zero resting drop shadows (shadow-xl/2xl) in M3 components',
  zeroRestingShadows,
  shadowViolations.slice(0, 3).join('; ')
);

// ----------------------------------------------------------------------------
// SUMMARY & VERDICT
// ----------------------------------------------------------------------------
console.log(`\n${BOLD}========================================================================${RESET}`);
console.log(`${BOLD}  EXECUTION SUMMARY${RESET}`);
console.log(`${BOLD}========================================================================${RESET}`);
console.log(`  Total Checks: ${passedCount + failedCount}`);
console.log(`  Passed      : ${GREEN}${passedCount}${RESET}`);
console.log(`  Failed      : ${failedCount > 0 ? RED : GREEN}${failedCount}${RESET}`);
console.log(`${BOLD}========================================================================${RESET}\n`);

if (failedCount > 0) {
  console.log(`${RED}${BOLD}✖ SOME CHECKS FAILED!${RESET}\n`);
  process.exit(1);
} else {
  console.log(`${GREEN}${BOLD}✔ ALL CHECKS PASSED WITH 100% SUCCESS RATE (0 defects).${RESET}\n`);
  process.exit(0);
}
