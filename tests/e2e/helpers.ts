/**
 * Test Harness Utilities & Assertion Helpers
 * Marvol s.r.o. E2E Test Infrastructure
 */

import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { MockNextApiResponse } from './types';

export const ROOT_DIR = process.cwd();

/**
 * Creates a mock NextApiRequest for unit testing route handlers in-process
 */
export function createMockRequest(options: {
  method?: string;
  url?: string;
  body?: unknown;
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
}): NextApiRequest {
  return {
    method: options.method || 'POST',
    url: options.url || '/api/lead',
    body: options.body || {},
    headers: options.headers || { 'content-type': 'application/json' },
    query: options.query || {},
    cookies: {},
    env: process.env,
    socket: { remoteAddress: '127.0.0.1' },
  } as unknown as NextApiRequest;
}

/**
 * Creates a mock NextApiResponse capturing status, headers, and json body
 */
export function createMockResponse(): {
  res: NextApiResponse;
  getResponse: () => { statusCode: number; headers: Record<string, string | string[]>; body: unknown };
} {
  let statusCode = 200;
  const headers: Record<string, string | string[]> = {};
  let body: unknown = null;

  const mockRes: MockNextApiResponse = {
    statusCode,
    headers,
    body,
    status(code: number) {
      statusCode = code;
      mockRes.statusCode = code;
      return mockRes;
    },
    setHeader(name: string, value: string | string[]) {
      headers[name.toLowerCase()] = value;
      return mockRes;
    },
    json(data: unknown) {
      body = data;
      mockRes.body = data;
      return mockRes;
    },
    send(data: unknown) {
      body = data;
      mockRes.body = data;
      return mockRes;
    },
    end() {
      return mockRes;
    },
  };

  return {
    res: mockRes as unknown as NextApiResponse,
    getResponse: () => ({ statusCode, headers, body }),
  };
}

/**
 * Checks whether a project file exists relative to the project root
 */
export function fileExists(relPath: string): boolean {
  return fs.existsSync(path.join(ROOT_DIR, relPath));
}

/**
 * Reads a project file as UTF-8 string
 */
export function readFile(relPath: string): string {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Parses XML sitemap and extracts all <loc> values
 */
export function parseSitemapUrls(xmlContent: string): string[] {
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const urls: string[] = [];
  let match;
  while ((match = locRegex.exec(xmlContent)) !== null) {
    if (match[1]) {
      urls.push(match[1].trim());
    }
  }
  return urls;
}

/**
 * Optional live HTTP fetcher
 */
export async function fetchLiveUrl(pathname: string, options?: RequestInit): Promise<{ status: number; text: string; json?: unknown }> {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl.replace(/\/$/, '')}${pathname}`;
  const response = await fetch(url, options);
  const text = await response.text();
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    // not JSON
  }
  return { status: response.status, text, json };
}
