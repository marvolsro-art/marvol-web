import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export interface ConsentRecord {
  consentId: string;
  timestamp: string;
  action: 'accept_all' | 'reject_all' | 'custom' | 'revoke';
  version: string;
  preferences: {
    necessary: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  userAgent?: string;
  anonymizedIp?: string;
}

export type ConsentResponse = {
  success: boolean;
  message: string;
  consentId?: string;
  recordedAt?: string;
};

// In-memory IP rate limiting (max 20 requests per 10 minutes)
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 20;

  const timestamps = (rateLimitStore.get(ip) || []).filter((time) => now - time < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

function maskIp(rawIp: string): string {
  if (!rawIp || rawIp === 'unknown') return 'anonymized';
  // IPv4: mask last octet (e.g., 192.168.1.xxx -> 192.168.1.0)
  if (rawIp.includes('.')) {
    const parts = rawIp.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  // IPv6: mask host bits (e.g. 2001:db8:85a3:: -> 2001:db8:85a3::0)
  if (rawIp.includes(':')) {
    const parts = rawIp.split(':');
    return `${parts.slice(0, 3).join(':')}::0`;
  }
  return 'anonymized';
}

const CONSENT_FILE_PATH = path.join(process.cwd(), 'data', 'consent_logs.json');

function appendConsentLog(record: ConsentRecord) {
  try {
    const dataDir = path.dirname(CONSENT_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let logs: ConsentRecord[] = [];
    if (fs.existsSync(CONSENT_FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(CONSENT_FILE_PATH, 'utf-8');
        logs = JSON.parse(fileContent);
        if (!Array.isArray(logs)) logs = [];
      } catch {
        logs = [];
      }
    }

    logs.push(record);
    // Keep last 5 000 records to prevent infinite disk growth
    if (logs.length > 5000) {
      logs = logs.slice(-5000);
    }

    fs.writeFileSync(CONSENT_FILE_PATH, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (err) {
    // On Vercel / serverless environment, local filesystem might be read-only
    console.warn('[Consent Audit] Serverless local storage fallback:', err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConsentResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Použite metódu POST.',
    });
  }

  const rawIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    'unknown';

  if (isRateLimited(rawIp)) {
    return res.status(429).json({
      success: false,
      message: 'Príliš veľa požiadaviek. Skúste to znova o niekoľko minút.',
    });
  }

  const { consentId, action, version, preferences } = req.body || {};

  // Basic validation
  if (!consentId || typeof consentId !== 'string' || consentId.length < 8 || consentId.length > 64) {
    return res.status(400).json({
      success: false,
      message: 'Neplatný alebo chýbajúci identifikátor súhlasu (consentId).',
    });
  }

  const validActions = ['accept_all', 'reject_all', 'custom', 'revoke'];
  if (!action || !validActions.includes(action)) {
    return res.status(400).json({
      success: false,
      message: 'Neplatná akcia súhlasu (action).',
    });
  }

  const record: ConsentRecord = {
    consentId: String(consentId).trim(),
    timestamp: new Date().toISOString(),
    action,
    version: typeof version === 'string' ? version : 'v2.0',
    preferences: {
      necessary: true,
      preferences: Boolean(preferences?.preferences),
      analytics: Boolean(preferences?.analytics),
      marketing: Boolean(preferences?.marketing),
    },
    userAgent: req.headers['user-agent']?.slice(0, 200),
    anonymizedIp: maskIp(rawIp),
  };

  appendConsentLog(record);

  return res.status(200).json({
    success: true,
    message: 'Záznam o udelení/odvolaní súhlasu bol úspešne zaevidovaný.',
    consentId: record.consentId,
    recordedAt: record.timestamp,
  });
}
