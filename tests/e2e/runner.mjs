#!/usr/bin/env node
/**
 * Standalone Node.js Runner Launcher
 * Marvol s.r.o. E2E Test Suite
 * 
 * Usage:
 *   node tests/e2e/runner.mjs
 *   node tests/e2e/runner.mjs --tier=1
 *   node tests/e2e/runner.mjs --strict
 *   node tests/e2e/runner.mjs --json
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
