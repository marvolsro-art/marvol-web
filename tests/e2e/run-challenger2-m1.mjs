#!/usr/bin/env node
/**
 * Launcher for Challenger 2 (M1) Empirical Audit
 * Styles, PostCSS/Tailwind v4 Compilation, Mobile Viewport CSS & Icon Stress Testing
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.JITI_JSX = '1';
const jiti = require('jiti')(__dirname, { jsx: true });
const { runChallenger2StylesIconsAudit } = jiti('./challenger2-m1-styles-icons-audit.ts');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';

runChallenger2StylesIconsAudit()
  .then((summary) => {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}${CYAN}  CHALLENGER 2 (M1) — STYLES, CSS & ICON STRESS TEST AUDIT  ${RESET}`);
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
  .catch((err) => {
    console.error('Fatal audit runner error:', err);
    process.exit(1);
  });
