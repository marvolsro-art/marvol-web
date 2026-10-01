#!/usr/bin/env node
/**
 * Launcher for Challenger 2 Adversarial UX, Responsiveness & Navigation Audit Suite
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jiti = require('jiti')(__dirname);
const { runUXResponsivenessSuite } = jiti('./challenger2-ux-suite.ts');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

runUXResponsivenessSuite()
  .then(summary => {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}${CYAN}  CHALLENGER 2 — ADVERSARIAL UX & RESPONSIVENESS AUDIT RESULTS  ${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    let currentGroup = '';
    for (const r of summary.results) {
      if (r.group !== currentGroup) {
        currentGroup = r.group;
        console.log(`\n  ${BOLD}${currentGroup}:${RESET}`);
      }
      const icon = r.passed ? `${GREEN}✔ [PASS]${RESET}` : `${RED}✖ [FAIL]${RESET}`;
      console.log(`    ${icon} ${r.id}: ${r.name}`);
      if (!r.passed && r.error) {
        console.log(`      ${RED}Error: ${r.error}${RESET}`);
      }
    }

    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`  Total UX Tests     : ${summary.total}`);
    console.log(`  Passed             : ${GREEN}${summary.passed}${RESET}`);
    console.log(`  Failed             : ${summary.failed > 0 ? RED : GREEN}${summary.failed}${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}\n`);

    if (summary.failed > 0) {
      process.exit(1);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal UX audit runner error:', err);
    process.exit(1);
  });
