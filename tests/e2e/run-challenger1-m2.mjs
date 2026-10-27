#!/usr/bin/env node
/**
 * Launcher for Challenger 1 M2 Calculator Stress Test Suite
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jiti = require('jiti')(__dirname);
const { runCalculatorStressSuite } = jiti('./challenger1-m2-calculator-stress.ts');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';

runCalculatorStressSuite()
  .then(summary => {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}${CYAN}  CHALLENGER 1 (M2) — CALCULATOR MATH & SUBSIDY STRESS SUITE  ${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    let currentCat = '';
    for (const r of summary.results) {
      if (r.category !== currentCat) {
        currentCat = r.category;
        console.log(`\n  ${BOLD}${currentCat}:${RESET}`);
      }
      const icon = r.passed ? `${GREEN}✔ [PASS]${RESET}` : `${RED}✖ [FAIL]${RESET}`;
      console.log(`    ${icon} ${r.id}: ${r.name}`);
      if (!r.passed && r.error) {
        console.log(`      ${RED}Error: ${r.error}${RESET}`);
      }
    }

    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`  Total Stress Tests : ${summary.total}`);
    console.log(`  Passed             : ${GREEN}${summary.passed}${RESET}`);
    console.log(`  Failed             : ${summary.failed > 0 ? RED : GREEN}${summary.failed}${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    if (summary.failed > 0) {
      process.exit(1);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal runner error:', err);
    process.exit(1);
  });
