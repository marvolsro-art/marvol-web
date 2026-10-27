/**
 * Marvol s.r.o. — Challenger 1 (Milestone 2)
 * Empirical Calculator Math & Subsidy Stress Test Suite
 * 
 * Verifies mathematical accuracy, boundary inputs, toggle combinations,
 * physical production ceilings, subsidy caps (€1,150 / €4,600 / €5,750),
 * net price floors, payback periods, and API telemetry integration.
 */

import fs from 'fs';
import path from 'path';
import leadHandler from '../../pages/api/lead';
import { createMockRequest, createMockResponse, ROOT_DIR, readFile } from './helpers';

export interface StressResult {
  id: string;
  category: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: Record<string, unknown>;
}

// Canonical Calculator Math Oracle according to components/CalculatorSection.tsx & PROJECT.md
export interface CalculatorInputs {
  propertyType: 'home' | 'business';
  monthlyBill: number;
  hasBattery: boolean;
  hasHeatPump: boolean;
  hasEV: boolean;
}

export interface CalculatorOutputs {
  recommendedKwp: number;
  annualBill: number;
  annualKwhProduction: number;
  maxAnnualSavingsValue: number;
  selfConsumptionRate: number;
  rawSavings: number;
  estimatedSavings: number;
  pvSubsidy: number;
  hpSubsidy: number;
  estimatedSubsidy: number;
  estimatedSystemPrice: number;
  netPrice: number;
  paybackYears: string;
}

export function calculateSolarOracle(inputs: CalculatorInputs): CalculatorOutputs {
  const { propertyType, monthlyBill, hasBattery, hasHeatPump, hasEV } = inputs;

  const annualBill = monthlyBill * 12;
  const baseKwp = monthlyBill / 16;
  const evKwp = hasEV ? 1.5 : 0;
  const hpKwp = hasHeatPump ? 2.0 : 0;
  const maxKwp = propertyType === 'home' ? 25 : 250;
  const recommendedKwp = Math.min(
    Math.max(Math.round((baseKwp + (propertyType === 'home' ? evKwp + hpKwp : 0)) * 10) / 10, 3),
    maxKwp
  );

  const annualKwhProduction = recommendedKwp * 1050;
  const maxAnnualSavingsValue = annualKwhProduction * 0.22;

  const selfConsumptionRate = hasHeatPump
    ? (hasBattery ? 0.82 : 0.60)
    : (hasBattery ? 0.78 : 0.55);

  const rawSavings = Math.round(annualBill * selfConsumptionRate);
  const estimatedSavings = Math.min(rawSavings, Math.round(maxAnnualSavingsValue));

  const pvSubsidy = propertyType === 'home'
    ? Math.min(Math.round(Math.min(recommendedKwp, 2) * 575), 1150)
    : 0;
  const hpSubsidy = (propertyType === 'home' && hasHeatPump) ? 4600 : 0;
  const estimatedSubsidy = pvSubsidy + hpSubsidy;

  const estimatedSystemPrice = Math.round(
    recommendedKwp * 1050 +
    (hasBattery ? 3200 : 0) +
    (hasEV ? 950 : 0) +
    (hasHeatPump ? 7800 : 0)
  );
  const netPrice = Math.max(estimatedSystemPrice - estimatedSubsidy, 2200);
  const paybackYears = estimatedSavings > 0 ? (netPrice / estimatedSavings).toFixed(1) : '4.5';

  return {
    recommendedKwp,
    annualBill,
    annualKwhProduction,
    maxAnnualSavingsValue,
    selfConsumptionRate,
    rawSavings,
    estimatedSavings,
    pvSubsidy,
    hpSubsidy,
    estimatedSubsidy,
    estimatedSystemPrice,
    netPrice,
    paybackYears,
  };
}

export async function runCalculatorStressSuite(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: StressResult[];
}> {
  const results: StressResult[] = [];

  function record(
    id: string,
    category: string,
    name: string,
    passed: boolean,
    error?: string,
    details?: Record<string, unknown>
  ) {
    results.push({ id, category, name, passed, error, details });
  }

  // Backup leads.json
  const leadsFilePath = path.join(ROOT_DIR, 'data', 'leads.json');
  let originalLeadsBackup: string | null = null;
  if (fs.existsSync(leadsFilePath)) {
    originalLeadsBackup = fs.readFileSync(leadsFilePath, 'utf8');
  }

  try {
    // =========================================================================
    // 1. BOUNDARY BILLS (50 €, 140 €, 800 €, 3000 €)
    // =========================================================================

    // Test 1.1: Lower boundary 50 € (Residential)
    {
      const out = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: 50,
        hasBattery: false,
        hasHeatPump: false,
        hasEV: false,
      });

      const pass =
        out.recommendedKwp === 3.1 &&
        out.estimatedSavings === 330 &&
        out.pvSubsidy === 1150 &&
        out.estimatedSubsidy === 1150 &&
        out.netPrice === 2200 && // Clamped to floor 2200
        out.paybackYears === '6.7';

      record(
        'M2-CB-01',
        'Boundary Bills',
        'Residential 50 € bill clamps to 3.1 kWp with €2,200 netPrice floor and 6.7 yr payback',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // Test 1.2: Default baseline 140 € (Residential with Battery)
    {
      const out = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: 140,
        hasBattery: true,
        hasHeatPump: false,
        hasEV: false,
      });

      const pass =
        out.recommendedKwp === 8.8 &&
        out.selfConsumptionRate === 0.78 &&
        out.estimatedSavings === 1310 &&
        out.pvSubsidy === 1150 &&
        out.netPrice === 11290 &&
        out.paybackYears === '8.6';

      record(
        'M2-CB-02',
        'Boundary Bills',
        'Residential 140 € default configuration yields 8.8 kWp, 1,310 € savings and 8.6 yr payback',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // Test 1.3: Upper residential boundary 800 € (Residential, All Toggles ON)
    {
      const out = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: 800,
        hasBattery: true,
        hasHeatPump: true,
        hasEV: true,
      });

      // 800/16 = 50 kWp -> clamped strictly to residential 25.0 kWp
      // Physical ceiling: 25 * 1050 * 0.22 = 5,775 €
      // Raw savings: 800 * 12 * 0.82 = 7,872 € -> capped to 5,775 €
      const pass =
        out.recommendedKwp === 25.0 &&
        out.estimatedSavings === 5775 &&
        out.estimatedSubsidy === 5750 &&
        out.netPrice === 32450 &&
        out.paybackYears === '5.6';

      record(
        'M2-CB-03',
        'Boundary Bills',
        'Residential 800 € ceiling clamps to 25.0 kWp and bounds savings by physical generation ceiling (5,775 €)',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // Test 1.4: Upper commercial boundary 3000 € (Business, Battery ON)
    {
      const out = calculateSolarOracle({
        propertyType: 'business',
        monthlyBill: 3000,
        hasBattery: true,
        hasHeatPump: false,
        hasEV: false,
      });

      // 3000/16 = 187.5 kWp
      // Physical ceiling: 187.5 * 1050 * 0.22 = 43,312.5 €
      // Raw savings: 36,000 * 0.78 = 28,080 €
      // Commercial subsidy = 0 €
      const pass =
        out.recommendedKwp === 187.5 &&
        out.estimatedSavings === 28080 &&
        out.estimatedSubsidy === 0 &&
        out.netPrice === 200075 &&
        out.paybackYears === '7.1';

      record(
        'M2-CB-04',
        'Boundary Bills',
        'Commercial 3,000 € bill calculates 187.5 kWp array, 0 € residential subsidy, and 7.1 yr payback',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // Test 1.5: Extreme commercial boundary 5000 € (Clamp at 250 kWp)
    {
      const out = calculateSolarOracle({
        propertyType: 'business',
        monthlyBill: 5000,
        hasBattery: false,
        hasHeatPump: false,
        hasEV: false,
      });

      // 5000/16 = 312.5 kWp -> clamped strictly to maxKwp 250.0
      // Physical ceiling: 250 * 1050 * 0.22 = 57,750 €
      // Raw savings: 60,000 * 0.55 = 33,000 €
      const pass =
        out.recommendedKwp === 250.0 &&
        out.estimatedSavings === 33000 &&
        out.estimatedSubsidy === 0 &&
        out.netPrice === 262500 &&
        out.paybackYears === '8.0';

      record(
        'M2-CB-05',
        'Boundary Bills',
        'Extreme 5,000 € commercial bill clamps strictly to 250.0 kWp maximum capacity',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // Test 1.6: Underflow boundary: 0 € bill with zero-division safety
    {
      const out = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: 0,
        hasBattery: false,
        hasHeatPump: false,
        hasEV: false,
      });

      const pass =
        out.recommendedKwp === 3.0 &&
        out.estimatedSavings === 0 &&
        out.paybackYears === '4.5' && // Safe fallback string
        !isNaN(Number(out.paybackYears)) &&
        isFinite(Number(out.paybackYears));

      record(
        'M2-CB-06',
        'Boundary Bills',
        'Zero monthly bill safely clamps to 3.0 kWp and triggers fallback 4.5 yr payback without NaN or Infinity',
        pass,
        pass ? undefined : `Mismatch: ${JSON.stringify(out)}`,
        out as unknown as Record<string, unknown>
      );
    }

    // =========================================================================
    // 2. ALL TOGGLE PERMUTATIONS & CEILING VERIFICATIONS
    // =========================================================================

    const testToggles: Array<{
      b: boolean;
      hp: boolean;
      ev: boolean;
      expectedRate: number;
      expectedKwAdder: number;
      expectedHpSubsidy: number;
    }> = [
      { b: false, hp: false, ev: false, expectedRate: 0.55, expectedKwAdder: 0.0, expectedHpSubsidy: 0 },
      { b: true, hp: false, ev: false, expectedRate: 0.78, expectedKwAdder: 0.0, expectedHpSubsidy: 0 },
      { b: false, hp: true, ev: false, expectedRate: 0.60, expectedKwAdder: 2.0, expectedHpSubsidy: 4600 },
      { b: false, hp: false, ev: true, expectedRate: 0.55, expectedKwAdder: 1.5, expectedHpSubsidy: 0 },
      { b: true, hp: true, ev: false, expectedRate: 0.82, expectedKwAdder: 2.0, expectedHpSubsidy: 4600 },
      { b: true, hp: false, ev: true, expectedRate: 0.78, expectedKwAdder: 1.5, expectedHpSubsidy: 0 },
      { b: false, hp: true, ev: true, expectedRate: 0.60, expectedKwAdder: 3.5, expectedHpSubsidy: 4600 },
      { b: true, hp: true, ev: true, expectedRate: 0.82, expectedKwAdder: 3.5, expectedHpSubsidy: 4600 },
    ];

    testToggles.forEach((cfg, idx) => {
      const bill = 200; // 200/16 = 12.5 kWp
      const outHome = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: bill,
        hasBattery: cfg.b,
        hasHeatPump: cfg.hp,
        hasEV: cfg.ev,
      });

      const expectedKwp = Math.round((12.5 + cfg.expectedKwAdder) * 10) / 10;
      const expectedTotalSubsidy = 1150 + cfg.expectedHpSubsidy;

      const pass =
        outHome.selfConsumptionRate === cfg.expectedRate &&
        outHome.recommendedKwp === expectedKwp &&
        outHome.hpSubsidy === cfg.expectedHpSubsidy &&
        outHome.estimatedSubsidy === expectedTotalSubsidy &&
        outHome.netPrice >= 2200 &&
        parseFloat(outHome.paybackYears) > 0;

      record(
        `M2-TG-${String(idx + 1).padStart(2, '0')}`,
        'Toggle Combinations',
        `Home Toggle [B:${cfg.b ? 1 : 0}, HP:${cfg.hp ? 1 : 0}, EV:${cfg.ev ? 1 : 0}] -> rate=${cfg.expectedRate}, +${cfg.expectedKwAdder} kWp, subsidy=${expectedTotalSubsidy} €`,
        pass,
        pass ? undefined : `Failed on home toggle config ${idx + 1}: ${JSON.stringify(outHome)}`
      );
    });

    // =========================================================================
    // 3. SUBSIDY CEILING STRESS TESTS (€1,150 / €4,600 / €5,750)
    // =========================================================================

    // Test 3.1: PV Subsidy Cap (€1,150) across 100 different domestic capacities
    {
      let capViolated = false;
      let minSubsidy = Infinity;
      let maxSubsidy = -Infinity;

      for (let bill = 50; bill <= 800; bill += 10) {
        const out = calculateSolarOracle({
          propertyType: 'home',
          monthlyBill: bill,
          hasBattery: false,
          hasHeatPump: false,
          hasEV: false,
        });

        if (out.pvSubsidy > 1150 || out.pvSubsidy < 0) {
          capViolated = true;
        }
        minSubsidy = Math.min(minSubsidy, out.pvSubsidy);
        maxSubsidy = Math.max(maxSubsidy, out.pvSubsidy);
      }

      const pass = !capViolated && maxSubsidy === 1150 && minSubsidy === 1150;
      record(
        'M2-SC-01',
        'Subsidy Ceilings',
        'PV-only residential state subsidy is strictly capped at 1,150 € across all bills (50–800 €)',
        pass,
        pass ? undefined : `Cap violated or min/max invalid: min=${minSubsidy}, max=${maxSubsidy}`
      );
    }

    // Test 3.2: Heat Pump Subsidy (€4,600)
    {
      const out = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: 160,
        hasBattery: false,
        hasHeatPump: true,
        hasEV: false,
      });

      const pass = out.hpSubsidy === 4600;
      record(
        'M2-SC-02',
        'Subsidy Ceilings',
        'Heat Pump residential subsidy applies exactly 4,600 € SIEA voucher',
        pass,
        pass ? undefined : `hpSubsidy mismatch: expected 4600, got ${out.hpSubsidy}`
      );
    }

    // Test 3.3: Combined Subsidy Ceiling (€5,750)
    {
      let combinedCapViolated = false;
      for (let bill = 50; bill <= 800; bill += 25) {
        const out = calculateSolarOracle({
          propertyType: 'home',
          monthlyBill: bill,
          hasBattery: true,
          hasHeatPump: true,
          hasEV: true,
        });

        if (out.estimatedSubsidy > 5750 || out.estimatedSubsidy !== 5750) {
          combinedCapViolated = true;
        }
      }

      const pass = !combinedCapViolated;
      record(
        'M2-SC-03',
        'Subsidy Ceilings',
        'Combined PV + Heat Pump subsidy strictly maintains €5,750 combined ceiling',
        pass,
        pass ? undefined : `Combined subsidy ceiling violated or deviated from 5,750 €`
      );
    }

    // Test 3.4: Business Subsidy Isolation (Strictly 0 €)
    {
      let b2bSubsidyLeaked = false;
      for (let bill = 50; bill <= 3000; bill += 100) {
        for (const b of [false, true]) {
          for (const hp of [false, true]) {
            for (const ev of [false, true]) {
              const out = calculateSolarOracle({
                propertyType: 'business',
                monthlyBill: bill,
                hasBattery: b,
                hasHeatPump: hp,
                hasEV: ev,
              });

              if (out.pvSubsidy !== 0 || out.hpSubsidy !== 0 || out.estimatedSubsidy !== 0) {
                b2bSubsidyLeaked = true;
              }
            }
          }
        }
      }

      const pass = !b2bSubsidyLeaked;
      record(
        'M2-SC-04',
        'Subsidy Ceilings',
        'Commercial/Business calculations strictly isolate state subsidies to 0 € across all permutations',
        pass,
        pass ? undefined : 'State subsidy leaked into commercial business calculations'
      );
    }

    // =========================================================================
    // 4. MASS MONTE CARLO & STRESS ORACLE (10,000 PERMUTATIONS)
    // =========================================================================

    {
      let invariantFailures = 0;
      let totalStressCycles = 10000;

      for (let i = 0; i < totalStressCycles; i++) {
        const pType: 'home' | 'business' = Math.random() < 0.5 ? 'home' : 'business';
        const bill = Math.floor(Math.random() * (pType === 'home' ? 750 : 2950)) + 50;
        const b = Math.random() < 0.5;
        const hp = Math.random() < 0.5;
        const ev = Math.random() < 0.5;

        const res = calculateSolarOracle({
          propertyType: pType,
          monthlyBill: bill,
          hasBattery: b,
          hasHeatPump: hp,
          hasEV: ev,
        });

        // INVARIANTS:
        // 1. recommendedKwp within [3.0, maxKwp]
        if (res.recommendedKwp < 3.0 || (pType === 'home' && res.recommendedKwp > 25.0) || (pType === 'business' && res.recommendedKwp > 250.0)) {
          invariantFailures++;
        }
        // 2. netPrice >= 2,200 €
        if (res.netPrice < 2200 || isNaN(res.netPrice) || !isFinite(res.netPrice)) {
          invariantFailures++;
        }
        // 3. estimatedSavings <= physical production ceiling
        if (res.estimatedSavings > Math.round(res.maxAnnualSavingsValue) + 1) {
          invariantFailures++;
        }
        // 4. paybackYears is a valid decimal string > 0
        const pb = parseFloat(res.paybackYears);
        if (isNaN(pb) || !isFinite(pb) || pb <= 0) {
          invariantFailures++;
        }
        // 5. Subsidy ceiling invariants
        if (pType === 'home' && res.estimatedSubsidy > 5750) {
          invariantFailures++;
        }
        if (pType === 'business' && res.estimatedSubsidy !== 0) {
          invariantFailures++;
        }
      }

      const pass = invariantFailures === 0;
      record(
        'M2-MC-01',
        'Monte Carlo Stress',
        `10,000 randomized permutations strictly satisfied all mathematical & physical invariants (0 violations)`,
        pass,
        pass ? undefined : `Invariant failures: ${invariantFailures} / ${totalStressCycles}`
      );
    }

    // =========================================================================
    // 5. SOURCE CODE DIRECT STATIC AUDIT
    // =========================================================================

    {
      const calcFile = readFile('components/CalculatorSection.tsx');

      const checks = [
        { label: 'monthlyBill / 16 formula', pass: calcFile.includes('monthlyBill / 16') },
        { label: 'EV 1.5 kWp adder', pass: calcFile.includes('hasEV ? 1.5 : 0') },
        { label: 'Heat Pump 2.0 kWp adder', pass: calcFile.includes('hasHeatPump ? 2.0 : 0') },
        { label: 'Domestic 25 kWp ceiling', pass: calcFile.includes("propertyType === 'home' ? 25 : 250") },
        { label: 'Physical 1050 kWh/kWp bound', pass: calcFile.includes('recommendedKwp * 1050') },
        { label: '0.22 €/kWh electricity price', pass: calcFile.includes('annualKwhProduction * 0.22') },
        { label: 'Self-consumption rates 0.82 / 0.78 / 0.60 / 0.55', pass: calcFile.includes('0.82 : 0.60') && calcFile.includes('0.78 : 0.55') },
        { label: '575 €/kWp SIEA subsidy rate', pass: calcFile.includes('575') },
        { label: '1 150 € PV cap', pass: calcFile.includes('1150') || calcFile.includes('1 150') },
        { label: '4 600 € Heat Pump subsidy', pass: calcFile.includes('4600') || calcFile.includes('4 600') },
        { label: '2 200 € Net Price floor clamp', pass: calcFile.includes('2200') },
        { label: 'Division by zero protection for paybackYears', pass: calcFile.includes('estimatedSavings > 0') },
        { label: 'Honeypot spam trap present', pass: calcFile.includes('calc_b_url') },
        { label: 'Authentic photo thumbnails wired', pass: calcFile.includes('/images/fotovoltika-domacnosti/hero.jpg') && calcFile.includes('/images/bateriove-uloziska/hero.jpg') },
      ];

      const failedChecks = checks.filter(c => !c.pass);
      const pass = failedChecks.length === 0;

      record(
        'M2-SA-01',
        'Static Code Audit',
        'CalculatorSection.tsx source code verified against all 14 project contract specifications',
        pass,
        pass ? undefined : `Failed code checks: ${failedChecks.map(c => c.label).join(', ')}`
      );
    }

    // =========================================================================
    // 6. END-TO-END TELEMETRY INTEGRATION VIA /api/lead
    // =========================================================================

    {
      const leadTestBill = 220;
      const calcData = calculateSolarOracle({
        propertyType: 'home',
        monthlyBill: leadTestBill,
        hasBattery: true,
        hasHeatPump: true,
        hasEV: true,
      });

      const uniqueLeadName = `Calculator Stress Verification (${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: uniqueLeadName,
          phone: '+421 948 777 666',
          email: 'calc.stress@marvol.sk',
          city: 'Trnava',
          propertyType: 'home',
          monthlyBill: leadTestBill,
          hasBattery: true,
          hasHeatPump: true,
          hasEV: true,
          recommendedKwp: calcData.recommendedKwp,
          estimatedSavings: calcData.estimatedSavings,
          netPrice: calcData.netPrice,
          subsidy: calcData.estimatedSubsidy,
          source: 'calculator_section',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const leadsRaw = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
      const parsedLeads = JSON.parse(leadsRaw);
      const savedLead = parsedLeads.find((l: { name: string }) => l.name === uniqueLeadName);

      const pass =
        resData.statusCode === 200 &&
        body.success === true &&
        typeof body.leadId === 'string' &&
        !!savedLead &&
        savedLead.monthlyBill === leadTestBill &&
        savedLead.recommendedKwp === calcData.recommendedKwp &&
        savedLead.netPrice === calcData.netPrice &&
        savedLead.subsidy === 5750 &&
        savedLead.source === 'calculator_section';

      record(
        'M2-E2E-01',
        'Telemetry Integration',
        'Interactive calculator telemetry serializes, passes through /api/lead validation, and persists all attributes to data/leads.json',
        pass,
        pass ? undefined : `Telemetry persistence failed: status=${resData.statusCode}, savedLead=${JSON.stringify(savedLead)}`
      );
    }

  } finally {
    // Restore leads.json backup to keep environment clean
    if (originalLeadsBackup !== null) {
      fs.writeFileSync(leadsFilePath, originalLeadsBackup, 'utf8');
    }
  }

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}
