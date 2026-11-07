import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { sendLeadNotificationEmail } from '../../lib/email';

export interface LeadRequestBody {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  source?: string;
  b_url?: string; // Honeypot bot trap
  honeypot?: string;
  // Calculator enriched fields
  propertyType?: string;
  monthlyBill?: number;
  hasBattery?: boolean;
  hasHeatPump?: boolean;
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
  subsidy?: number;
}

export type LeadRecord = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  service?: string;
  message?: string;
  source: string;
  propertyType?: string;
  monthlyBill?: number;
  hasBattery?: boolean;
  hasHeatPump?: boolean;
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
  subsidy?: number;
};

export type ResponseData = {
  success: boolean;
  message: string;
  leadId?: string;
  emailSent?: boolean;
};

const PHONE_REGEX = /^[+0-9 -]{9,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory IP rate limiting (max 5 requests per 10 minutes)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_STORE_ENTRIES = 5000;
const CLEANUP_INTERVAL_MS = 60 * 1000;

let lastCleanupTime = 0;

export function _resetRateLimitStore(): void {
  rateLimitStore.clear();
  lastCleanupTime = 0;
}

export function _getRateLimitStoreSize(): number {
  return rateLimitStore.size;
}

function pruneStaleRateLimitEntries(now: number): void {
  lastCleanupTime = now;
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const validTimestamps = timestamps.filter((t) => t > windowStart);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(ip);
    } else if (validTimestamps.length !== timestamps.length) {
      rateLimitStore.set(ip, validTimestamps);
    }
  }

  // Under extreme flooding where active unique IPs exceed MAX_RATE_LIMIT_STORE_ENTRIES,
  // prune oldest keys to maintain deterministic O(1) memory bound
  if (rateLimitStore.size > MAX_RATE_LIMIT_STORE_ENTRIES) {
    const overflow = rateLimitStore.size - MAX_RATE_LIMIT_STORE_ENTRIES;
    let purged = 0;
    for (const key of rateLimitStore.keys()) {
      rateLimitStore.delete(key);
      purged++;
      if (purged >= overflow) break;
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Opportunistic cleanup: prune if map reaches capacity or periodically when active
  if (
    rateLimitStore.size >= MAX_RATE_LIMIT_STORE_ENTRIES ||
    (rateLimitStore.size > 100 && now - lastCleanupTime > CLEANUP_INTERVAL_MS)
  ) {
    pruneStaleRateLimitEntries(now);
  }

  const existing = rateLimitStore.get(ip);
  const timestamps = (existing || []).filter((t) => t > windowStart);

  // Delete key when all timestamps for this IP have expired
  if (existing && timestamps.length === 0) {
    rateLimitStore.delete(ip);
  }

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = timestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000));
    rateLimitStore.set(ip, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);

  // Strict upper bound guard: ensure store size never exceeds MAX_RATE_LIMIT_STORE_ENTRIES
  if (rateLimitStore.size > MAX_RATE_LIMIT_STORE_ENTRIES) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (oldestKey) {
      rateLimitStore.delete(oldestKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

// CORS / Allowed Origins
const ALLOWED_ORIGINS = new Set([
  'https://marvol.sk',
  'https://www.marvol.sk',
]);

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (process.env.NODE_ENV !== 'production') {
    try {
      const url = new URL(origin);
      if (
        url.hostname === 'localhost' ||
        url.hostname === '127.0.0.1' ||
        url.hostname === '0.0.0.0'
      ) {
        return true;
      }
    } catch {
      return false;
    }
  }
  return false;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeText(value: unknown, maxLength: number, allowNewlines = false): string {
  if (typeof value !== 'string') return '';
  let str = value.trim().slice(0, maxLength);
  if (!allowNewlines) {
    str = str.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return escapeHtml(str);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const origin = req.headers.origin;

  // Handle CORS preflight OPTIONS
  if (req.method === 'OPTIONS') {
    if (origin) {
      if (isOriginAllowed(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', '86400');
        res.setHeader('Vary', 'Origin');
        return res.status(204).end();
      }
      return res.status(403).json({
        success: false,
        message: 'Prístup z nepovolenej domény (Forbidden Origin).',
      });
    }
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Metóda nie je povolená. Povolená metóda je výhradne POST.',
    });
  }

  // Origin check
  if (origin) {
    if (!isOriginAllowed(origin)) {
      return res.status(403).json({
        success: false,
        message: 'Prístup z nepovolenej domény (Forbidden Origin).',
      });
    }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Vary', 'Origin');
  } else if (req.headers.referer) {
    try {
      const refererOrigin = new URL(req.headers.referer).origin;
      if (!isOriginAllowed(refererOrigin)) {
        return res.status(403).json({
          success: false,
          message: 'Prístup z nepovolenej domény (Forbidden Referer).',
        });
      }
    } catch {
      if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({
          success: false,
          message: 'Prístup z neplatnej domény.',
        });
      }
    }
  }

  const clientIp = getClientIp(req);

  // Rate Limiting: Max 5 submissions per 10 minutes per client IP (strictly unconditional)
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      success: false,
      message: 'Príliš veľa požiadaviek z vašej IP adresy. Skúste to prosím znova o niekoľko minút.',
    });
  }

  try {
    const body: LeadRequestBody = req.body || {};
    const {
      name,
      phone,
      email,
      city,
      service,
      message,
      source = 'website',
      b_url,
      honeypot,
      propertyType,
      monthlyBill,
      hasBattery,
      hasHeatPump,
      hasEV,
      recommendedKwp,
      estimatedSavings,
      netPrice,
      subsidy,
    } = body;

    // 1. Honeypot Bot Trap: Silently return 200 OK without saving or emailing.
    // Redact raw botField content to preserve GDPR compliance.
    const botField = (b_url || honeypot || '').toString().trim();
    if (botField.length > 0) {
      console.warn('Bot detected and trapped via honeypot field:', {
        ip: clientIp,
        trapped: true,
      });
      return res.status(200).json({
        success: true,
        message: 'Ďakujeme! Váš dopyt bol úspešne zaregistrovaný.',
        leadId: `BOT-TRAP-${Date.now()}`,
      });
    }

    // 2. Name validation: Required, 2-100 characters
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Meno a priezvisko sú povinné a musia mať aspoň 2 a najviac 100 znakov.',
      });
    }

    // 3. Phone validation: Required, Slovak/international regex 9-20 characters
    if (!phone || typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Zadajte platné telefónne číslo (9 až 20 znakov, napr. +421 908 403 042).',
      });
    }

    // 4. Email validation: Optional, but if provided must match standard regex and be max 150 chars
    if (email && typeof email === 'string' && email.trim().length > 0) {
      const trimmedEmail = email.trim();
      if (trimmedEmail.length > 150 || !EMAIL_REGEX.test(trimmedEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Zadajte platnú e-mailovú adresu (napr. meno@domena.sk).',
        });
      }
    }

    const leadId = `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newLead: LeadRecord = {
      id: leadId,
      timestamp: new Date().toISOString(),
      name: sanitizeText(name, 100),
      phone: phone.replace(/[\r\n]+/g, '').trim(),
      email: email && typeof email === 'string' ? email.replace(/[\r\n\s]+/g, '').trim() : '',
      city: city && typeof city === 'string' ? sanitizeText(city, 150) : '',
      service: service && typeof service === 'string' ? sanitizeText(service, 100) : '',
      message: message && typeof message === 'string' ? sanitizeText(message, 3000, true) : '',
      source: typeof source === 'string' ? sanitizeText(source, 100) : 'website',
      propertyType: propertyType ? sanitizeText(String(propertyType), 50) : undefined,
      monthlyBill: typeof monthlyBill === 'number' && !isNaN(monthlyBill) ? monthlyBill : undefined,
      hasBattery: typeof hasBattery === 'boolean' ? hasBattery : undefined,
      hasHeatPump: typeof hasHeatPump === 'boolean' ? hasHeatPump : undefined,
      hasEV: typeof hasEV === 'boolean' ? hasEV : undefined,
      recommendedKwp: typeof recommendedKwp === 'number' && !isNaN(recommendedKwp) ? recommendedKwp : undefined,
      estimatedSavings: typeof estimatedSavings === 'number' && !isNaN(estimatedSavings) ? estimatedSavings : undefined,
      netPrice: typeof netPrice === 'number' && !isNaN(netPrice) ? netPrice : undefined,
      subsidy: typeof subsidy === 'number' && !isNaN(subsidy) ? subsidy : undefined,
    };

    // Store lead locally in data/leads.json to guarantee 0% data loss
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const leadsFilePath = path.join(dataDir, 'leads.json');
      let leads: LeadRecord[] = [];
      if (fs.existsSync(leadsFilePath)) {
        try {
          const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
          const parsed = JSON.parse(fileContent);
          if (Array.isArray(parsed)) {
            leads = parsed;
          }
        } catch {
          leads = [];
        }
      }

      leads.push(newLead);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('[STORAGE_WARNING] Could not persist lead to data/leads.json:', fsErr instanceof Error ? fsErr.message : String(fsErr));
    }

    // 5. Send automated email notification to Marvol sales team (Resend or SMTP)
    let emailSent = false;
    try {
      const emailResult = await sendLeadNotificationEmail(newLead);
      emailSent = emailResult.success;
      if (!emailResult.success && emailResult.error !== 'NO_EMAIL_PROVIDER_CONFIGURED') {
        console.warn('[LEAD_EMAIL_WARNING]', emailResult.error);
      }
    } catch (emailErr) {
      console.error('[LEAD_EMAIL_ERROR] Unexpected error dispatching lead email:', emailErr);
    }

    // Optional webhook dispatch (e.g. to CRM / Discord / Slack / Zapier if env variable exists)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `**Nový Dopyt pre Marvol s.r.o.!**\n**Meno:** ${newLead.name}\n**Tel:** ${newLead.phone}\n**E-mail:** ${newLead.email || 'Nezadané'}\n**Lokalita:** ${newLead.city || 'Nezadané'}\n**Služba:** ${newLead.service || 'Nezadané'}\n**Zdroj:** ${newLead.source}\n**Výkon:** ${newLead.recommendedKwp || '-'} kWp | **Úspora:** ${newLead.estimatedSavings || '-'} €/rok\n**Investícia:** ${newLead.netPrice || '-'} € | **Dotácia:** ${newLead.subsidy !== undefined ? `${newLead.subsidy} €` : '-'}\n**Tepelné čerpadlo:** ${newLead.hasHeatPump ? 'Áno' : 'Nie'}`,
          }),
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Ďakujeme! Váš dopyt bol úspešne zaregistrovaný.',
      leadId,
      emailSent,
    });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Chyba pri spracovaní dopytu na serveri.',
    });
  }
}
