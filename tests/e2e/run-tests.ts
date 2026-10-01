/**
 * E2E Master Test Runner
 * Marvol s.r.o. Multi-Page Architecture & SEO Transformation
 * 
 * Executes 4-Tier test suite:
 * Tier 1: Feature Coverage (7 routes, header, drawer, API, sitemap)
 * Tier 2: Boundary & Corner Cases (validation, honeypot, 320px layout, protocols)
 * Tier 3: Cross-Feature Combinations (subpage to lead form preselection, sitemap parity)
 * Tier 4: Real-World Application Scenarios (5 realistic end-to-end user journeys)
 */

import { tier1Tests } from './tier1-features';
import { tier2Tests } from './tier2-boundaries';
import { tier3Tests } from './tier3-cross-feature';
import { tier4Tests } from './tier4-scenarios';
import type { TestCase, TestExecutionResult, TestSuiteSummary } from './types';

// ANSI terminal color codes
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';
const MAGENTA = '\x1b[35m';

interface RunnerOptions {
  tier?: number;
  strict?: boolean;
  filter?: string;
  json?: boolean;
}

function parseArgs(): RunnerOptions {
  const args = process.argv.slice(2);
  const options: RunnerOptions = {};

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

  return options;
}

export async function runAllTests(options: RunnerOptions = {}): Promise<TestSuiteSummary> {
  const startTime = Date.now();
  let allTests: TestCase[] = [
    ...tier1Tests,
    ...tier2Tests,
    ...tier3Tests,
    ...tier4Tests,
  ];

  if (options.tier) {
    allTests = allTests.filter(t => t.tier === options.tier);
  }

  if (options.filter) {
    const f = options.filter.toLowerCase();
    allTests = allTests.filter(t => t.id.toLowerCase().includes(f) || t.name.toLowerCase().includes(f));
  }

  if (!options.json) {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}${CYAN}  MARVOL s.r.o. — E2E TEST SUITE RUNNER  ${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${GRAY}Target Base URL: ${process.env.TEST_BASE_URL || 'Offline / In-Process Mode'}${RESET}`);
    console.log(`${GRAY}Total Tests Selected: ${allTests.length}${RESET}`);
    console.log(`${GRAY}Strict Mode: ${options.strict ? 'ENABLED (Pending tests will fail)' : 'DISABLED (Milestone diagnostics reported)'}${RESET}\n`);
  }

  const results: Array<{ test: TestCase; result: TestExecutionResult }> = [];
  let passed = 0;
  let failed = 0;
  let pending = 0;

  let currentTier: number | null = null;
  let currentCategory: string | null = null;

  for (const test of allTests) {
    if (!options.json) {
      if (test.tier !== currentTier) {
        currentTier = test.tier;
        console.log(`\n${BOLD}${MAGENTA}--- TIER ${currentTier} ---${RESET}`);
      }
      if (test.category !== currentCategory) {
        currentCategory = test.category;
        console.log(`\n  ${BOLD}${currentCategory}:${RESET}`);
      }
    }

    const testStart = Date.now();
    let res: TestExecutionResult;
    try {
      res = await test.run();
    } catch (err) {
      res = {
        status: 'FAIL',
        message: `Unhandled exception during test execution: ${String(err)}`,
      };
    }
    const duration = Date.now() - testStart;
    res.durationMs = duration;

    if (res.status === 'PASS') {
      passed++;
      if (!options.json) {
        console.log(`    ${GREEN}✔ [PASS]${RESET} ${test.id}: ${test.name} ${GRAY}(${duration}ms)${RESET}`);
      }
    } else if (res.status === 'PENDING') {
      pending++;
      if (!options.json) {
        const dep = test.milestoneDependency ? ` [Milestone ${test.milestoneDependency}]` : '';
        console.log(`    ${YELLOW}⏳ [PENDING${dep}]${RESET} ${test.id}: ${test.name}`);
        if (res.message) {
          console.log(`       ${GRAY}↳ Diagnostic: ${res.message}${RESET}`);
        }
      }
    } else {
      failed++;
      if (!options.json) {
        console.log(`    ${RED}✖ [FAIL]${RESET} ${test.id}: ${test.name} ${GRAY}(${duration}ms)${RESET}`);
        if (res.message) {
          console.log(`       ${RED}↳ Error: ${res.message}${RESET}`);
        }
      }
    }

    results.push({ test, result: res });
  }

  const durationMs = Date.now() - startTime;
  const summary: TestSuiteSummary = {
    total: allTests.length,
    passed,
    failed,
    pending,
    durationMs,
    results,
  };

  if (options.json) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(`\n${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`${BOLD}  EXECUTION SUMMARY${RESET}`);
    console.log(`${BOLD}${CYAN}========================================================================${RESET}`);
    console.log(`  Total Tests : ${BOLD}${allTests.length}${RESET}`);
    console.log(`  Passed      : ${GREEN}${BOLD}${passed}${RESET}`);
    console.log(`  Failed      : ${failed > 0 ? RED : GRAY}${BOLD}${failed}${RESET}`);
    console.log(`  Pending     : ${pending > 0 ? YELLOW : GRAY}${BOLD}${pending}${RESET}`);
    console.log(`  Total Time  : ${durationMs}ms`);
    console.log(`${CYAN}========================================================================${RESET}\n`);

    if (failed > 0) {
      console.log(`${RED}${BOLD}✖ TEST SUITE FAILED with ${failed} failure(s).${RESET}\n`);
    } else if (options.strict && pending > 0) {
      console.log(`${RED}${BOLD}✖ STRICT MODE FAILURE: ${pending} milestone pending test(s) detected.${RESET}\n`);
    } else if (pending > 0) {
      console.log(`${GREEN}${BOLD}✔ ALL CURRENT FEATURES PASSED.${RESET} ${YELLOW}(${pending} test(s) waiting for upcoming milestones)${RESET}\n`);
    } else {
      console.log(`${GREEN}${BOLD}✔ ALL TESTS PASSED WITH 100% SUCCESS RATE (0 defects).${RESET}\n`);
    }
  }

  return summary;
}

// Direct execution entry point
if (typeof require !== 'undefined' && require.main === module) {
  const options = parseArgs();
  runAllTests(options)
    .then(summary => {
      if (summary.failed > 0) {
        process.exit(1);
      }
      if (options.strict && summary.pending > 0) {
        process.exit(1);
      }
      process.exit(0);
    })
    .catch(err => {
      console.error('Fatal runner error:', err);
      process.exit(1);
    });
} else if (typeof process !== 'undefined' && process.argv[1]?.includes('run-tests.ts')) {
  const options = parseArgs();
  runAllTests(options)
    .then(summary => {
      if (summary.failed > 0) {
        process.exit(1);
      }
      if (options.strict && summary.pending > 0) {
        process.exit(1);
      }
      process.exit(0);
    })
    .catch(err => {
      console.error('Fatal runner error:', err);
      process.exit(1);
    });
}
