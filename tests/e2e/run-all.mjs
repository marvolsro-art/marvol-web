#!/usr/bin/env node
/**
 * Master E2E Test Suite Runner
 * Marvol s.r.o. Modern Web Redesign
 * 
 * Verifies all 4 test tiers:
 * Tier 1: Feature Coverage (Routes, imagery, calculator math, lead API, sitemap, dropdowns, drawer)
 * Tier 2: Boundary & Corner Cases (Lead validation, honeypot traps, HTTP methods, 320px mobile rules, statutory details, calculator bounds)
 * Tier 3: Cross-Feature Integration (Subpage prefill, BESS & Heat Pump toggles, sitemap parity, Schema.org)
 * Tier 4: Real-World Scenarios (10 full end-to-end user journeys)
 * 
 * Usage:
 *   node tests/e2e/run-all.mjs
 *   node tests/e2e/run-all.mjs --tier=1
 *   node tests/e2e/run-all.mjs --tier=2
 *   node tests/e2e/run-all.mjs --tier=3
 *   node tests/e2e/run-all.mjs --tier=4
 *   node tests/e2e/run-all.mjs --filter=calculator
 *   node tests/e2e/run-all.mjs --strict
 *   node tests/e2e/run-all.mjs --json
 */

import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jiti = require('jiti')(__dirname);
const { runAllTests } = jiti('./run-tests.ts');

const args = process.argv.slice(2);
const options = {};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    options.tier = parseInt(arg.split('=')[1], 10);
  } else if (arg === '--strict') {
    options.strict = true;
  } else if (arg.startsWith('--filter=')) {
    options.filter = arg.split('=')[1];
  } else if (arg === '--json') {
    options.json = true;
  }
}

runAllTests(options)
  .then((summary) => {
    if (summary.failed > 0) {
      process.exit(1);
    }
    if (options.strict && summary.pending > 0) {
      process.exit(1);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal test runner error:', err);
    process.exit(1);
  });
