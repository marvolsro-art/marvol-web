/**
 * Test Suite Types & Interfaces
 * Marvol s.r.o. E2E Test Infrastructure
 */

export type TestStatus = 'PASS' | 'FAIL' | 'PENDING';

export interface TestCase {
  id: string;
  tier: 1 | 2 | 3 | 4;
  category: string;
  name: string;
  description: string;
  milestoneDependency?: string;
  run: () => Promise<TestExecutionResult> | TestExecutionResult;
}

export interface TestExecutionResult {
  status: TestStatus;
  message?: string;
  durationMs?: number;
  details?: Record<string, unknown>;
}

export interface TestSuiteSummary {
  total: number;
  passed: number;
  failed: number;
  pending: number;
  durationMs: number;
  results: Array<{
    test: TestCase;
    result: TestExecutionResult;
  }>;
}

export interface MockNextApiResponse {
  statusCode: number;
  headers: Record<string, string | string[]>;
  body: unknown;
  status: (code: number) => MockNextApiResponse;
  setHeader: (name: string, value: string | string[]) => MockNextApiResponse;
  json: (data: unknown) => MockNextApiResponse;
  send: (data: unknown) => MockNextApiResponse;
  end: () => MockNextApiResponse;
}
