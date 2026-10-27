#!/usr/bin/env node
/**
 * Launcher for Challenger 1 (M1) Empirical Audit
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jiti = require('jiti')(__dirname);
const { runChallenger1LeadAudit } = jiti('./challenger1-m1-lead-audit.ts');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

runChallenger1LeadAudit()
  .then(summary => {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}${CYAN}  CHALLENGER 1 (M1) — EMPIRICAL LEAD API AUDIT RESULTS  ${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    let currentGroup = '';
    for (const r of summary.results) {
      if (r.category !== currentGroup) {
        currentGroup = r.category;
        console.log(`\n  ${BOLD}${currentGroup}:${RESET}`);
      }
      const icon = r.passed ? `${GREEN}✔ [PASS]${RESET}` : `${RED}✖ [FAIL]${RESET}`;
      console.log(`    ${icon} ${r.id}: ${r.testCase}`);
      if (!r.passed) {
        console.log(`      ${RED}Expected: ${r.expected}${RESET}`);
        console.log(`      ${RED}Actual  : ${r.actual}${RESET}`);
        if (r.error) console.log(`      ${RED}Error   : ${r.error}${RESET}`);
      }
    }

    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`  Total Probes : ${summary.total}`);
    console.log(`  Passed       : ${GREEN}${summary.passed}${RESET}`);
    console.log(`  Failed       : ${summary.failed > 0 ? RED : GREEN}${summary.failed}${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    if (summary.failed > 0) {
      process.exit(1);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal audit runner error:', err);
    process.exit(1);
  });
