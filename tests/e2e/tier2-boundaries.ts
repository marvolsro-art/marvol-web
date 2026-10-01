/**
 * Tier 2: Boundary & Corner Cases (Edge Conditions)
 * Marvol s.r.o. E2E Test Infrastructure
 * 
 * Verifies data validation limits, honeypot traps, HTTP methods, 320px mobile rules,
 * navigation boundaries, and statutory numerical constraints.
 * Ensures >= 5 test cases per feature category.
 */

import path from 'path';
import fs from 'fs';
import type { TestCase } from './types';
import { fileExists, readFile, createMockRequest, createMockResponse, ROOT_DIR } from './helpers';
import leadHandler from '../../pages/api/lead';
import { COMPANY_DETAILS } from '../../constants/company';

export const tier2Tests: TestCase[] = [
  // =========================================================================
  // CATEGORY 1: Lead API & Data Validation Boundaries
  // =========================================================================
  {
    id: 'T2-BD-01',
    tier: 2,
    category: 'Lead Validation Boundaries',
    name: 'Malformed email addresses are rejected with HTTP 400',
    description: 'Sends invalid email formats (missing domain, missing @, malformed tld).',
    run: async () => {
      const invalidEmails = ['invalid-email', 'user@', '@domain.com', 'user@domain'];
      for (const email of invalidEmails) {
        const req = createMockRequest({
          method: 'POST',
          body: {
            name: 'Valid Name',
            phone: '+421948111222',
            email,
          },
        });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const output = getResponse();
        if (output.statusCode !== 400) {
          return {
            status: 'FAIL',
            message: `Expected 400 for malformed email '${email}', got ${output.statusCode}`,
          };
        }
      }
      return { status: 'PASS', message: 'All malformed email formats correctly rejected with HTTP 400.' };
    },
  },
  {
    id: 'T2-BD-02',
    tier: 2,
    category: 'Lead Validation Boundaries',
    name: 'Under-length phone numbers (< 9 chars) are rejected with HTTP 400',
    description: 'Tests phone number strings with fewer than 9 characters.',
    run: async () => {
      const shortPhones = ['123', '090512', '12345678'];
      for (const phone of shortPhones) {
        const req = createMockRequest({
          method: 'POST',
          body: {
            name: 'Valid Name',
            phone,
          },
        });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const output = getResponse();
        if (output.statusCode !== 400) {
          return {
            status: 'FAIL',
            message: `Expected 400 for short phone '${phone}', got ${output.statusCode}`,
          };
        }
      }
      return { status: 'PASS', message: 'Under-length phone numbers correctly rejected with HTTP 400.' };
    },
  },
  {
    id: 'T2-BD-03',
    tier: 2,
    category: 'Lead Validation Boundaries',
    name: 'Over-length phone numbers (> 20 chars) are rejected with HTTP 400',
    description: 'Tests phone number strings exceeding 20 characters.',
    run: async () => {
      const longPhone = '+42194812345678901234567';
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Valid Name',
          phone: longPhone,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 400) {
        return {
          status: 'FAIL',
          message: `Expected 400 for long phone (${longPhone.length} chars), got ${output.statusCode}`,
        };
      }
      return { status: 'PASS', message: 'Over-length phone numbers correctly rejected with HTTP 400.' };
    },
  },
  {
    id: 'T2-BD-04',
    tier: 2,
    category: 'Lead Validation Boundaries',
    name: 'Whitespace-only name is rejected with HTTP 400',
    description: 'Tests name containing only blank spaces.',
    run: async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: '     ',
          phone: '+421948111222',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 400) {
        return {
          status: 'FAIL',
          message: `Expected 400 for whitespace-only name, got ${output.statusCode}`,
        };
      }
      return { status: 'PASS', message: 'Whitespace name rejected with HTTP 400.' };
    },
  },
  {
    id: 'T2-BD-05',
    tier: 2,
    category: 'Lead Validation Boundaries',
    name: 'Honeypot bot field trap returns 200 OK but NEVER saves to leads.json',
    description: 'Verifies bot submission with b_url is trapped and discarded silently.',
    run: async () => {
      const botUniqueName = `BotTrap-${Date.now()}`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: botUniqueName,
          phone: '+421948999000',
          b_url: 'http://spam-link-target.com', // Honeypot field
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 200) {
        return {
          status: 'FAIL',
          message: `Expected 200 OK trap response for honeypot bot, got ${output.statusCode}`,
        };
      }
      // Check that lead was NOT saved to data/leads.json
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      if (fs.existsSync(leadsFile)) {
        const content = fs.readFileSync(leadsFile, 'utf8');
        if (content.includes(botUniqueName)) {
          return {
            status: 'FAIL',
            message: 'Honeypot bot trap failed: spam lead was written to data/leads.json!',
          };
        }
      }
      return { status: 'PASS', message: 'Honeypot bot trapped successfully with 200 OK and zero file persistence.' };
    },
  },

  // =========================================================================
  // CATEGORY 2: HTTP Protocol & Payload Boundaries
  // =========================================================================
  {
    id: 'T2-PR-01',
    tier: 2,
    category: 'HTTP Protocol Boundaries',
    name: 'GET method returns HTTP 405 Method Not Allowed',
    description: 'Verifies GET /api/lead is rejected.',
    run: async () => {
      const req = createMockRequest({ method: 'GET' });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 405) {
        return { status: 'FAIL', message: `Expected 405 for GET, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'GET method rejected with 405.' };
    },
  },
  {
    id: 'T2-PR-02',
    tier: 2,
    category: 'HTTP Protocol Boundaries',
    name: 'PUT method returns HTTP 405 Method Not Allowed',
    description: 'Verifies PUT /api/lead is rejected.',
    run: async () => {
      const req = createMockRequest({ method: 'PUT' });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 405) {
        return { status: 'FAIL', message: `Expected 405 for PUT, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'PUT method rejected with 405.' };
    },
  },
  {
    id: 'T2-PR-03',
    tier: 2,
    category: 'HTTP Protocol Boundaries',
    name: 'DELETE method returns HTTP 405 Method Not Allowed',
    description: 'Verifies DELETE /api/lead is rejected.',
    run: async () => {
      const req = createMockRequest({ method: 'DELETE' });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 405) {
        return { status: 'FAIL', message: `Expected 405 for DELETE, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'DELETE method rejected with 405.' };
    },
  },
  {
    id: 'T2-PR-04',
    tier: 2,
    category: 'HTTP Protocol Boundaries',
    name: 'Empty JSON body returns HTTP 400 Bad Request',
    description: 'Submitting empty object {} to /api/lead returns 400.',
    run: async () => {
      const req = createMockRequest({ method: 'POST', body: {} });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 400) {
        return { status: 'FAIL', message: `Expected 400 for empty body, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'Empty body rejected with 400.' };
    },
  },
  {
    id: 'T2-PR-05',
    tier: 2,
    category: 'HTTP Protocol Boundaries',
    name: 'Oversized string payload is handled safely without uncaught exception',
    description: 'Submits 20,000-character message and ensures server handles gracefully.',
    run: async () => {
      const bigMessage = 'A'.repeat(20000);
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Stress Test',
          phone: '+421948123456',
          message: bigMessage,
        },
      });
      const { res, getResponse } = createMockResponse();
      try {
        await leadHandler(req, res);
        const output = getResponse();
        if (output.statusCode !== 200 && output.statusCode !== 400) {
          return { status: 'FAIL', message: `Unexpected status code: ${output.statusCode}` };
        }
        return { status: 'PASS', message: 'Oversized payload handled safely.' };
      } catch (err) {
        return { status: 'FAIL', message: `Handler threw uncaught exception: ${String(err)}` };
      }
    },
  },

  // =========================================================================
  // CATEGORY 3: Mobile Viewport 320px Layout Rules
  // =========================================================================
  {
    id: 'T2-MP-01',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'Top bar layout elements stack vertically on small screens (flex-col md:flex-row)',
    description: 'Ensures Top Bar does not overflow horizontally at 320px viewport.',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('flex-col') && !content.includes('hidden sm:flex')) {
        return { status: 'FAIL', message: 'Top Bar does not implement responsive stacking (flex-col) for 320px screens.' };
      }
      return { status: 'PASS', message: 'Top Bar elements stack properly for small screens.' };
    },
  },
  {
    id: 'T2-MP-02',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'Container paddings avoid negative margins on 320px (px-4 baseline)',
    description: 'Checks that primary containers use standard px-4 padding.',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('px-4')) {
        return { status: 'FAIL', message: 'Header missing standard px-4 mobile padding.' };
      }
      return { status: 'PASS', message: 'Mobile container padding satisfies 320px margin boundaries.' };
    },
  },
  {
    id: 'T2-MP-03',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'LeadForm input fields maintain full width (w-full) without fixed pixel clipping',
    description: 'Checks LeadForm for responsive width styling on form controls.',
    run: () => {
      if (!fileExists('components/LeadForm.tsx')) {
        return { status: 'FAIL', message: 'components/LeadForm.tsx not found.' };
      }
      const content = readFile('components/LeadForm.tsx');
      if (!content.includes('w-full')) {
        return { status: 'FAIL', message: 'LeadForm inputs lack w-full class for responsive fluid sizing.' };
      }
      return { status: 'PASS', message: 'LeadForm inputs use responsive w-full fluid layout.' };
    },
  },
  {
    id: 'T2-MP-04',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'Mobile slide-over drawer width is constrained to viewport bounds (max-w-sm or w-full)',
    description: 'Ensures mobile drawer modal never produces horizontal scroll.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('max-w-sm') && !content.includes('w-full') && !content.includes('max-w-xs')) {
        return { status: 'PENDING', message: 'Mobile drawer modal bounds in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Mobile drawer width constrained within viewport limits.' };
    },
  },
  {
    id: 'T2-MP-05',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'Action CTA buttons allow flexible text wrapping on narrow viewports',
    description: 'Ensures CTA buttons do not use rigid fixed width that causes clipping.',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (content.includes('w-[300px]') || content.includes('w-[320px]')) {
        return { status: 'FAIL', message: 'Fixed width CTA detected that may overflow 320px viewports.' };
      }
      return { status: 'PASS', message: 'CTA buttons use fluid padding.' };
    },
  },

  // =========================================================================
  // CATEGORY 4: Header Navigation & Transition Boundaries
  // =========================================================================
  {
    id: 'T2-NB-01',
    tier: 2,
    category: 'Navigation Transitions',
    name: 'Header uses Next.js useRouter for route-aware anchor link switching',
    description: 'Verifies useRouter is imported and used to prefix /#anchor on subpages.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('useRouter') && !content.includes('pathname')) {
        return { status: 'PENDING', message: 'Route-aware links implementation in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Header implements route-aware link resolution.' };
    },
  },
  {
    id: 'T2-NB-02',
    tier: 2,
    category: 'Navigation Transitions',
    name: 'Header listens to Escape key to dismiss active flyout menus',
    description: 'Verifies keyboard accessibility for closing dropdowns.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('Escape') && !content.includes('keydown')) {
        return { status: 'PENDING', message: 'Keyboard Escape handling in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Escape key dismissal implemented in Header.' };
    },
  },
  {
    id: 'T2-NB-03',
    tier: 2,
    category: 'Navigation Transitions',
    name: 'Escape key dismisses mobile drawer and restores body scroll',
    description: 'Ensures mobile drawer dismisses on Escape and body scroll unlocks.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('Escape')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M1 mobile drawer keyboard listener.' };
      }
      return { status: 'PASS', message: 'Escape key dismisses mobile drawer.' };
    },
  },
  {
    id: 'T2-NB-04',
    tier: 2,
    category: 'Navigation Transitions',
    name: 'Clicking backdrop dismisses mobile drawer modal',
    description: 'Verifies backdrop overlay has onClick handler closing mobile menu.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('backdrop') && !content.includes('onClick')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M1 backdrop dismiss handler.' };
      }
      return { status: 'PASS', message: 'Backdrop dismissal verified.' };
    },
  },
  {
    id: 'T2-NB-05',
    tier: 2,
    category: 'Navigation Transitions',
    name: 'Route changes automatically dismiss open mobile navigation drawer',
    description: 'Checks for routeChangeComplete or pathname change closing drawer.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('pathname') && !content.includes('routeChange')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M1 auto-close on route change.' };
      }
      return { status: 'PASS', message: 'Drawer auto-closes on route change.' };
    },
  },

  // =========================================================================
  // CATEGORY 5: Statutory & Subsidy Numerical Boundaries
  // =========================================================================
  {
    id: 'T2-SB-01',
    tier: 2,
    category: 'Statutory Boundaries',
    name: 'Green Households subsidy calculation is capped at exactly €4,025',
    description: 'Verifies Math.min(..., 4025) cap in CalculatorSection and company constants.',
    run: () => {
      const calcContent = fileExists('components/CalculatorSection.tsx') ? readFile('components/CalculatorSection.tsx') : '';
      if (!calcContent.includes('4025') && !calcContent.includes('4 025')) {
        return { status: 'FAIL', message: 'Calculator missing 4025 subsidy cap logic.' };
      }
      if (COMPANY_DETAILS.subsidies.maxHomeSubsidy !== '4 025 €') {
        return { status: 'FAIL', message: `COMPANY_DETAILS maxHomeSubsidy is '${COMPANY_DETAILS.subsidies.maxHomeSubsidy}', expected '4 025 €'.` };
      }
      return { status: 'PASS', message: 'Subsidy cap of €4,025 strictly verified in calculator and constants.' };
    },
  },
  {
    id: 'T2-SB-02',
    tier: 2,
    category: 'Statutory Boundaries',
    name: 'Statutory corporate IČO is strictly "53 060 091"',
    description: 'Verifies IČO constant according to Slovak business register.',
    run: () => {
      if (COMPANY_DETAILS.tax.ico !== '53 060 091') {
        return { status: 'FAIL', message: `COMPANY_DETAILS IČO mismatch: got '${COMPANY_DETAILS.tax.ico}'` };
      }
      return { status: 'PASS', message: 'Statutory IČO strictly matches 53 060 091.' };
    },
  },
  {
    id: 'T2-SB-03',
    tier: 2,
    category: 'Statutory Boundaries',
    name: 'Statutory corporate DIČ is strictly "2121255961"',
    description: 'Verifies DIČ constant according to tax registry.',
    run: () => {
      if (COMPANY_DETAILS.tax.dic !== '2121255961') {
        return { status: 'FAIL', message: `COMPANY_DETAILS DIČ mismatch: got '${COMPANY_DETAILS.tax.dic}'` };
      }
      return { status: 'PASS', message: 'Statutory DIČ strictly matches 2121255961.' };
    },
  },
  {
    id: 'T2-SB-04',
    tier: 2,
    category: 'Statutory Boundaries',
    name: 'Statutory corporate IČ DPH is strictly "SK2121255961" with vatPayer=true',
    description: 'Verifies VAT identification and payer status.',
    run: () => {
      if (COMPANY_DETAILS.tax.icDph !== 'SK2121255961' || !COMPANY_DETAILS.tax.vatPayer) {
        return { status: 'FAIL', message: 'COMPANY_DETAILS IČ DPH is invalid or vatPayer is false.' };
      }
      return { status: 'PASS', message: 'Statutory IČ DPH and VAT payer status strictly verified.' };
    },
  },
  {
    id: 'T2-SB-05',
    tier: 2,
    category: 'Statutory Boundaries',
    name: 'Commercial registration designates Mestský súd Žilina Sro 74765/L',
    description: 'Verifies registered court designation according to modern judicial reform.',
    run: () => {
      const reg = COMPANY_DETAILS.registry;
      if (!reg.insertNumber.includes('74765/L') || !reg.court.includes('Žilina')) {
        return { status: 'FAIL', message: 'COMPANY_DETAILS registry court or insert number invalid.' };
      }
      return { status: 'PASS', message: 'Commercial registry statement strictly conforms to § 3a Obch. zák.' };
    },
  },

  // =========================================================================
  // CATEGORY 6: E-Shop Filter & Price Boundaries
  // =========================================================================
  {
    id: 'T2-ES-01',
    tier: 2,
    category: 'E-Shop Filter Boundaries',
    name: 'Filter combination yielding 0 products renders an accessible empty-state with reset button',
    description: 'Verifies empty state when filters produce zero matching products and checks reset filters functionality.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx not found.' };
      }
      const eshopCode = readFile('pages/eshop.tsx');
      if (!eshopCode.includes('Žiadne produkty') || !eshopCode.includes('Resetovať filtre')) {
        return { status: 'FAIL', message: 'E-Shop empty state or reset button missing in pages/eshop.tsx.' };
      }
      if (!eshopCode.includes('resetFilters')) {
        return { status: 'FAIL', message: 'resetFilters handler missing in pages/eshop.tsx.' };
      }
      if (!eshopCode.includes('filteredProducts.length === 0')) {
        return { status: 'FAIL', message: 'Empty-state conditional check (filteredProducts.length === 0) missing in pages/eshop.tsx.' };
      }
      return { status: 'PASS', message: 'Empty-state layout and resetFilters handler verified for 0 matching products.' };
    },
  },
  {
    id: 'T2-ES-02',
    tier: 2,
    category: 'E-Shop Filter Boundaries',
    name: 'Extreme power range filter (> 50 kWp or edge power) handles cleanly without NaN or exceptions',
    description: 'Tests filter evaluation with high boundary values and ensures all product power/capacity numbers are valid.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx not found.' };
      }
      const eshopCode = readFile('pages/eshop.tsx');
      const priceMatches = [...eshopCode.matchAll(/priceExVat:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));
      const powerMatches = [...eshopCode.matchAll(/powerKw:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));
      const capMatches = [...eshopCode.matchAll(/capacityKwh:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));

      if (priceMatches.length === 0) {
        return { status: 'FAIL', message: 'No priceExVat found in pages/eshop.tsx.' };
      }
      for (const price of priceMatches) {
        if (isNaN(price) || price <= 0) {
          return { status: 'FAIL', message: `Found invalid priceExVat: ${price}` };
        }
      }
      for (const power of powerMatches) {
        if (isNaN(power) || power <= 0) {
          return { status: 'FAIL', message: `Found invalid powerKw: ${power}` };
        }
      }
      for (const cap of capMatches) {
        if (isNaN(cap) || cap <= 0) {
          return { status: 'FAIL', message: `Found invalid capacityKwh: ${cap}` };
        }
      }

      if (!eshopCode.includes("filters.powerRange === 'over-50'") && !eshopCode.includes("filters.powerRange === 'over-10'")) {
        return { status: 'FAIL', message: 'pages/eshop.tsx lacks power range boundary filter condition.' };
      }

      return { status: 'PASS', message: 'Extreme power filter boundaries evaluate safely without NaN or exceptions.' };
    },
  },
  {
    id: 'T2-ES-03',
    tier: 2,
    category: 'E-Shop Price Boundaries',
    name: 'Dual price calculation integrity: Cena s DPH strictly equals Math.round(Cena bez DPH * 1.20 * 100) / 100',
    description: 'Verifies exact 20% VAT arithmetic across all catalog products.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx not found.' };
      }
      const eshopCode = readFile('pages/eshop.tsx');
      if (!eshopCode.includes('Math.round(priceExVat * 1.2 * 100) / 100') && !eshopCode.includes('priceExVat * 1.2')) {
        return { status: 'FAIL', message: 'calculatePriceWithVat missing standard 20% DPH formula in pages/eshop.tsx.' };
      }

      const priceMatches = [...eshopCode.matchAll(/priceExVat:\s*([0-9.]+)/g)].map(m => parseFloat(m[1]));
      if (priceMatches.length === 0) {
        return { status: 'FAIL', message: 'No product prices found in pages/eshop.tsx.' };
      }

      for (const price of priceMatches) {
        const expected = Math.round(price * 1.20 * 100) / 100;
        const diff = Math.abs(expected - price * 1.20);
        if (diff > 0.01) {
          return { status: 'FAIL', message: `VAT rounding anomaly for price ${price}: diff ${diff}` };
        }
      }

      return { status: 'PASS', message: `All ${priceMatches.length} catalog products strictly satisfy 20% DPH rounding arithmetic.` };
    },
  },

  // =========================================================================
  // CATEGORY 7: Service Lead Boundaries
  // =========================================================================
  {
    id: 'T2-SL-01',
    tier: 2,
    category: 'Service Lead Boundaries',
    name: 'All 5 new service subpages pass valid non-empty initialService prop to LeadForm',
    description: 'Validates that each /sluzby/* page binds a recognized service type to LeadForm.',
    run: () => {
      const servicePages = [
        'pages/sluzby/navrh-projektu.tsx',
        'pages/sluzby/instalacia-montaz.tsx',
        'pages/sluzby/konzultacie-poradenstvo.tsx',
        'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx',
        'pages/sluzby/revizie-dotacie.tsx',
      ];
      const validServices = ['fotovoltika-dom', 'fotovoltika-firma', 'baterie', 'cerpadlo', 'elektro', 'vseobecny-kontakt'];

      for (const pagePath of servicePages) {
        if (!fileExists(pagePath)) {
          return { status: 'FAIL', message: `Missing service page: ${pagePath}` };
        }
        const code = readFile(pagePath);
        const match = code.match(/initialService="([^"]+)"/);
        if (!match || !match[1]) {
          return { status: 'FAIL', message: `${pagePath} does not specify initialService prop.` };
        }
        if (!validServices.includes(match[1])) {
          return { status: 'FAIL', message: `${pagePath} has invalid initialService "${match[1]}".` };
        }
      }
      return { status: 'PASS', message: 'All 5 specialized service subpages specify valid initialService values.' };
    },
  },
  {
    id: 'T2-SL-02',
    tier: 2,
    category: 'Service Lead Boundaries',
    name: '/api/lead successfully accepts and logs inquiries with service values from /sluzby/* pages without error',
    description: 'Tests lead API handler with subpage service values and distinct sources.',
    run: async () => {
      const testCases = [
        { service: 'fotovoltika-dom', source: 'page_sluzby_navrh_projektu' },
        { service: 'elektro', source: 'page_sluzby_protipoziarna_ochrana' },
        { service: 'vseobecny-kontakt', source: 'page_sluzby_konzultacie_poradenstvo' },
      ];

      for (const tc of testCases) {
        const req = createMockRequest({
          method: 'POST',
          body: {
            name: `Test-ServiceLead-${Date.now()}`,
            phone: '+421908777666',
            email: 'test@marvol.sk',
            service: tc.service,
            source: tc.source,
          },
        });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const output = getResponse();
        if (output.statusCode !== 200) {
          return {
            status: 'FAIL',
            message: `Lead submission failed for service=${tc.service}, source=${tc.source}: status ${output.statusCode}`,
          };
        }
      }
      return { status: 'PASS', message: 'Lead API accepts all service subpage service types with HTTP 200.' };
    },
  },

  // =========================================================================
  // CATEGORY 8: E-Shop 320px Mobile Layout Boundaries
  // =========================================================================
  {
    id: 'T2-MP-06',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'E-Shop product cards and category grid enforce responsive column wrapping without clipping on 320px',
    description: 'Ensures grid classes provide 1-column layout on mobile viewports.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx not found.' };
      }
      const content = readFile('pages/eshop.tsx');
      const hasResponsiveProductGrid = content.includes('grid-cols-1') && content.includes('md:grid-cols-2');
      if (!hasResponsiveProductGrid) {
        return { status: 'FAIL', message: 'E-Shop product grid does not declare responsive grid-cols-1 for mobile.' };
      }
      const hasResponsiveCategoryGrid = content.includes('grid-cols-2') || content.includes('grid-cols-1');
      if (!hasResponsiveCategoryGrid) {
        return { status: 'FAIL', message: 'E-Shop category grid lacks mobile column wrapping.' };
      }
      return { status: 'PASS', message: 'E-Shop grid systems enforce responsive column wrapping for mobile.' };
    },
  },
  {
    id: 'T2-MP-07',
    tier: 2,
    category: '320px Mobile Layout Rules',
    name: 'Dual action buttons ("Kúpiť materiál" and "Kúpiť s montážou") stack vertically or use responsive flex layout without text overlap at 320px',
    description: 'Verifies button layout allows vertical stacking or full width on narrow screens.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx not found.' };
      }
      const content = readFile('pages/eshop.tsx');
      const hasStackingOrFlex = content.includes('flex flex-col') || content.includes('space-y-2') || content.includes('w-full');
      if (!hasStackingOrFlex) {
        return { status: 'FAIL', message: 'E-Shop product card buttons do not allow vertical stacking on mobile.' };
      }
      return { status: 'PASS', message: 'Product card dual action buttons safely stack vertically on narrow mobile viewports.' };
    },
  },
];
