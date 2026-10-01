import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
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
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
};

export type ResponseData = {
  success: boolean;
  message: string;
  leadId?: string;
};

const PHONE_REGEX = /^[+0-9\s-]{9,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Metóda nie je povolená. Povolená metóda je výhradne POST.',
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
      hasEV,
      recommendedKwp,
      estimatedSavings,
      netPrice,
    } = body;

    // 1. Honeypot Bot Trap: If hidden spam field is populated, trap bot with 200 OK without saving
    const botField = (b_url || honeypot || '').toString().trim();
    if (botField.length > 0) {
      console.warn('Bot detected and trapped via honeypot field:', {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        botField,
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
        message: 'Zadajte platné telefónne číslo (9 až 20 znakov, napr. +421 948 123 456).',
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
      name: name.trim(),
      phone: phone.trim(),
      email: email && typeof email === 'string' ? email.trim() : '',
      city: city && typeof city === 'string' ? city.trim().slice(0, 150) : '',
      service: service && typeof service === 'string' ? service.trim().slice(0, 100) : '',
      message: message && typeof message === 'string' ? message.trim().slice(0, 3000) : '',
      source: typeof source === 'string' ? source.trim().slice(0, 100) : 'website',
      propertyType: propertyType ? String(propertyType).slice(0, 50) : undefined,
      monthlyBill: typeof monthlyBill === 'number' && !isNaN(monthlyBill) ? monthlyBill : undefined,
      hasBattery: typeof hasBattery === 'boolean' ? hasBattery : undefined,
      hasEV: typeof hasEV === 'boolean' ? hasEV : undefined,
      recommendedKwp: typeof recommendedKwp === 'number' && !isNaN(recommendedKwp) ? recommendedKwp : undefined,
      estimatedSavings: typeof estimatedSavings === 'number' && !isNaN(estimatedSavings) ? estimatedSavings : undefined,
      netPrice: typeof netPrice === 'number' && !isNaN(netPrice) ? netPrice : undefined,
    };

    // Store lead locally in data/leads.json to guarantee 0% data loss
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
      } catch (e) {
        console.error('Failed reading existing leads.json, resetting array:', e);
        leads = [];
      }
    }

    leads.push(newLead);
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');

    // Optional webhook dispatch (e.g. to CRM / Discord / Slack / Zapier if env variable exists)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚡ **Nový Dopyt pre Marvol s.r.o.!**\n**Meno:** ${newLead.name}\n**Tel:** ${newLead.phone}\n**E-mail:** ${newLead.email || 'Nezadané'}\n**Lokalita:** ${newLead.city || 'Nezadané'}\n**Služba:** ${newLead.service || 'Nezadané'}\n**Zdroj:** ${newLead.source}\n**Výkon:** ${newLead.recommendedKwp || '-'} kWp | **Úspora:** ${newLead.estimatedSavings || '-'} €/rok\n**Investícia:** ${newLead.netPrice || '-'} €`,
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
    });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Chyba pri spracovaní dopytu na serveri.',
    });
  }
}
