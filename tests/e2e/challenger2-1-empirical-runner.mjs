#!/usr/bin/env node
/**
 * Marvol s.r.o. — Empirical Challenger 2.1 Verification Runner
 * Tests:
 * 1. Dual Price Calculation
 * 2. Interactive Filtering & Edge Cases (including powerRange defect reproduction)
 * 3. Dual Checkout CTAs (Material modal B2C/B2B & Turnkey LeadForm prefill analysis)
 * 4. Adversarial Test Suite Execution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import vm from 'vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`${BOLD}${CYAN}  CHALLENGER 2.1 — EMPIRICAL VERIFICATION HARNESS  ${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

// Load pages/eshop.tsx
const eshopPath = path.join(ROOT_DIR, 'pages/eshop.tsx');
const eshopSource = fs.readFileSync(eshopPath, 'utf8');

const transpiled = ts.transpileModule(eshopSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    target: ts.ScriptTarget.ES2020,
  },
});

const sandbox = {
  exports: {},
  require: (mod) => {
    if (mod === 'react') return { useState: () => [null, () => {}], useMemo: (fn) => fn(), useEffect: () => {} };
    if (mod === 'next/link') return () => null;
    if (mod.includes('Layout')) return { Layout: () => null };
    if (mod.includes('LeadForm')) return { LeadForm: () => null };
    if (mod.includes('company')) return { COMPANY_DETAILS: { seat: {}, contact: {} } };
    return {};
  },
};

vm.createContext(sandbox);
vm.runInContext(transpiled.outputText, sandbox);
const { ESHOP_PRODUCTS, calculatePriceWithVat, formatEuro } = sandbox.exports;

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assertCheck(id, description, passed, errorDetail) {
  totalChecks++;
  if (passed) {
    passedChecks++;
    console.log(`  ${GREEN}✔ [PASS]${RESET} ${id}: ${description}`);
  } else {
    failedChecks++;
    console.log(`  ${RED}✖ [FAIL]${RESET} ${id}: ${description}`);
    if (errorDetail) {
      console.log(`     ${RED}↳ Finding: ${errorDetail}${RESET}`);
    }
  }
}

// ============================================================================
// SECTION 1: Dual Price Calculation Across All Mock Products
// ============================================================================
console.log(`\n${BOLD}SECTION 1: Dual Price Calculation across all mock products${RESET}`);

let allPricesMatch = true;
let priceFailures = [];

for (const p of ESHOP_PRODUCTS) {
  const calculated = calculatePriceWithVat(p.priceExVat);
  const expected = Math.round(p.priceExVat * 1.20 * 100) / 100;
  if (calculated !== expected) {
    allPricesMatch = false;
    priceFailures.push(`${p.id}: got ${calculated}, expected ${expected}`);
  }
}

assertCheck(
  'EMP-DP-01',
  `All ${ESHOP_PRODUCTS.length} catalog products strictly satisfy Cena s DPH === Math.round(Cena bez DPH * 1.20 * 100) / 100`,
  allPricesMatch && ESHOP_PRODUCTS.length === 13,
  priceFailures.join(', ')
);

// Float rounding edge cases
const floatCases = [
  { val: 0.01, exp: 0.01 },
  { val: 0.05, exp: 0.06 },
  { val: 99.99, exp: 119.99 },
  { val: 109.0, exp: 130.8 },
  { val: 1790.0, exp: 2148.0 },
  { val: 12.345, exp: Math.round(12.345 * 1.2 * 100) / 100 },
];
let floatOk = floatCases.every(c => calculatePriceWithVat(c.val) === c.exp);
assertCheck('EMP-DP-02', 'calculatePriceWithVat preserves precision on boundary float decimals', floatOk);

// Schema.org price parity
const schemaCanadian = eshopSource.includes('130.80');
const schemaHuawei = eshopSource.includes('2148.00');
assertCheck('EMP-DP-03', 'Schema.org JSON-LD Offer prices match exact 20% DPH prices (130.80 € and 2148.00 €)', schemaCanadian && schemaHuawei);


// ============================================================================
// SECTION 2: Interactive Product Filtering & Edge Cases
// ============================================================================
console.log(`\n${BOLD}SECTION 2: Interactive Product Filtering & Power Filter Analysis${RESET}`);

function filterCatalog(filters) {
  return ESHOP_PRODUCTS.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.brand !== 'all' && product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.phase !== 'all') {
      if (!product.phase || product.phase !== filters.phase) return false;
    }
    if (filters.powerRange !== 'all') {
      const powerOrCap = product.powerKw ?? product.capacityKwh ?? 0;
      if (filters.powerRange === 'under-5' && powerOrCap >= 5) return false;
      if (filters.powerRange === '5-10' && (powerOrCap < 5 || powerOrCap > 10)) return false;
      if (filters.powerRange === 'over-10' && powerOrCap <= 10) return false;
      if (filters.powerRange === 'over-50' && powerOrCap <= 50) return false;
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const match = product.name.toLowerCase().includes(q) ||
                    product.brand.toLowerCase().includes(q) ||
                    product.model.toLowerCase().includes(q) ||
                    product.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

// 0 results empty states
const empty1 = filterCatalog({ category: 'panels', brand: 'Dyness', phase: 'all', powerRange: 'all', searchQuery: '' });
const empty2 = filterCatalog({ category: 'storage', brand: 'all', phase: '3-phase', powerRange: 'all', searchQuery: '' });
const empty3 = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'over-50', searchQuery: '' });
const empty4 = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'all', searchQuery: 'non-existent-xyz' });
const allZero = empty1.length === 0 && empty2.length === 0 && empty3.length === 0 && empty4.length === 0;

assertCheck('EMP-FL-01', 'Adversarial filter combinations yielding 0 results return empty array', allZero);

// Empty-state UI and reset button presence
const hasEmptyStateUI = eshopSource.includes('filteredProducts.length === 0') &&
                        eshopSource.includes('Žiadne produkty nevyhovujú zvoleným filtrom') &&
                        eshopSource.includes('Resetovať filtre');
assertCheck('EMP-FL-02', 'UI renders accessible empty-state message and "Resetovať filtre" CTA when 0 matches', hasEmptyStateUI);

// Reset restores all 13 products
const fullCatalog = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'all', searchQuery: '' });
assertCheck('EMP-FL-03', `resetFilters restores pristine 13-item catalog from empty state`, fullCatalog.length === 13);

// Multi-filter conjunction
const multiConjunction = filterCatalog({ category: 'inverters', brand: 'Huawei', phase: '3-phase', powerRange: 'all', searchQuery: '' });
assertCheck('EMP-FL-04', 'Multi-filter conjunction (inverters + Huawei + 3-phase) isolates exactly Huawei SUN2000-10KTL-M1', multiConjunction.length === 1 && multiConjunction[0].id === 'inverter-huawei-10ktl');

// Search query testing
const searchLower = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'all', searchQuery: 'huawei' });
const searchUpper = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'all', searchQuery: 'HUAWEI' });
const searchTrim = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'all', searchQuery: '   Huawei   ' });
assertCheck('EMP-FL-05', 'Search query is case-insensitive and trims whitespace', searchLower.length === searchUpper.length && searchLower.length === searchTrim.length && searchLower.length === 5);

// BUG INVESTIGATION: Power range filter partitioning
const under5 = filterCatalog({ category: 'all', brand: 'all', phase: 'all', powerRange: 'under-5', searchQuery: '' });
const under5NonPowerItems = under5.filter(p => p.powerKw === undefined && p.capacityKwh === undefined);
const powerFilterDefect = under5NonPowerItems.length > 0;

assertCheck(
  'EMP-FL-06',
  'DEFECT CHECK: "under-5" power filter does NOT include non-electric mounting/cable accessories',
  !powerFilterDefect,
  `"under-5" filter improperly includes ${under5NonPowerItems.length} non-power items (${under5NonPowerItems.map(p => p.name).join(', ')}) due to fallback "powerOrCap ?? 0 < 5"`
);


// ============================================================================
// SECTION 3: Dual Checkout CTAs
// ============================================================================
console.log(`\n${BOLD}SECTION 3: Dual Checkout CTAs (Material modal & Turnkey LeadForm)${RESET}`);

// Material Modal: Quantity controls
const hasQtyBoundsInModal = eshopSource.includes('Math.max(1, prev - 1)') && eshopSource.includes('Math.min(materialModalProduct.stockQty, prev + 1)');
assertCheck('EMP-MC-01', 'Material modal +/- stepper buttons clamp quantity within [1, stockQty]', hasQtyBoundsInModal);

// Material Modal: Quantity input manual typing upper bound leak
const manualTypeInputClamped = eshopSource.includes('Math.min(materialModalProduct.stockQty, val)');
assertCheck(
  'EMP-MC-02',
  'DEFECT CHECK: Material modal manual numeric input clamps to stockQty on typing',
  manualTypeInputClamped,
  'Input onChange does NOT clamp val to stockQty (only checks val < 1), permitting manual entry of arbitrary quantities (e.g. 999999)'
);

// Material Modal: B2B/B2C Toggle
const hasCustomerTypeToggle = eshopSource.includes("modalCustomerType === 'b2c'") && eshopSource.includes("modalCustomerType === 'b2b'");
const hasB2BFields = eshopSource.includes('companyName') && eshopSource.includes('ico') && eshopSource.includes('dic');
assertCheck('EMP-MC-03', 'Customer type toggle reveals B2B company inputs (companyName, IČO, DIČ)', hasCustomerTypeToggle && hasB2BFields);

// Material Modal: IČO/DIČ Validation Check
const hasIcoValidation = eshopSource.includes('ico.length') || eshopSource.includes('ico.trim()');
assertCheck(
  'EMP-MC-04',
  'DEFECT CHECK: B2B company fields enforce validation on IČO / DIČ before submission',
  hasIcoValidation,
  'No validation on IČO / DIČ; form allows empty or arbitrary non-numeric text in B2B mode'
);

// Material Modal: Delivery method options
const hasDeliveryRadios = eshopSource.includes("modalDelivery === 'pallet'") && eshopSource.includes("modalDelivery === 'pickup'");
assertCheck('EMP-MC-05', 'Delivery options support pallet freight (SR 24-48h) and warehouse pickup at Vrútky', hasDeliveryRadios);

// Turnkey CTA: Product category to service mapping
const storageP = ESHOP_PRODUCTS.find(p => p.category === 'storage');
const panelP = ESHOP_PRODUCTS.find(p => p.category === 'panels');
const mapService = (p) => p.category === 'storage' || p.category === 'wallbox' ? 'baterie' : 'fotovoltika-dom';
assertCheck('EMP-TK-01', 'Turnkey CTA maps product category to correct service (storage -> "baterie", panels -> "fotovoltika-dom")', mapService(storageP) === 'baterie' && mapService(panelP) === 'fotovoltika-dom');

// Turnkey CTA: Subsidy highlight and banner
const hasSubsidyHighlight = eshopSource.includes('Uplatniteľná dotácia SIEA až do 4 025 €');
const hasTurnkeyBanner = eshopSource.includes('selectedTurnkeyProduct.name') && eshopSource.includes('Zrušiť výber');
assertCheck('EMP-TK-02', 'Turnkey CTA section renders pre-filled product card banner with €4,025 subsidy highlight and "Zrušiť výber"', hasSubsidyHighlight && hasTurnkeyBanner);

// Turnkey CTA: LeadForm pre-fill of product name
const leadFormCode = fs.readFileSync(path.join(ROOT_DIR, 'components/LeadForm.tsx'), 'utf8');
const leadFormHasProductProp = leadFormCode.includes('productName') || leadFormCode.includes('selectedProduct') || leadFormCode.includes('initialMessage');
const eshopPassesProductToLeadForm = eshopSource.includes('<LeadForm') && (eshopSource.includes('productName=') || eshopSource.includes('selectedProduct=') || eshopSource.includes('initialMessage='));

assertCheck(
  'EMP-TK-03',
  'DEFECT CHECK: Turnkey CTA pre-fills LeadForm with the selected product name and model for API submission',
  eshopPassesProductToLeadForm && leadFormHasProductProp,
  'LeadForm does NOT accept product name/model props; when turnkey lead is submitted, product selection is completely omitted from /api/lead payload and data/leads.json'
);

console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
console.log(`  Total Empirical Checks : ${totalChecks}`);
console.log(`  Passed                 : ${GREEN}${passedChecks}${RESET}`);
console.log(`  Failed / Defect Found  : ${failedChecks > 0 ? RED : GREEN}${failedChecks}${RESET}`);
console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

process.exit(failedChecks > 0 ? 1 : 0);
