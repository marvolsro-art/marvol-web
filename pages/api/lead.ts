import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type LeadData = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyType?: string;
  monthlyBill?: number;
  hasBattery?: boolean;
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
  service?: string;
  message?: string;
  source: string;
};

type ResponseData = {
  success: boolean;
  message: string;
  leadId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Metóda nie je povolená' });
  }

  try {
    const {
      name,
      phone,
      email,
      city,
      propertyType,
      monthlyBill,
      hasBattery,
      hasEV,
      recommendedKwp,
      estimatedSavings,
      netPrice,
      service,
      message,
      source = 'website'
    } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Meno a telefónne číslo sú povinné údaje'
      });
    }

    const leadId = `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newLead: LeadData = {
      id: leadId,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      city: city ? city.trim() : '',
      propertyType,
      monthlyBill,
      hasBattery,
      hasEV,
      recommendedKwp,
      estimatedSavings,
      netPrice,
      service,
      message: message ? message.trim() : '',
      source
    };

    // Store lead locally in data/leads.json to guarantee 0% data loss
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const leadsFilePath = path.join(dataDir, 'leads.json');
    let leads: LeadData[] = [];
    if (fs.existsSync(leadsFilePath)) {
      try {
        const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
        leads = JSON.parse(fileContent);
      } catch (e) {
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
            content: `⚡ **Nový Dopyt pre Marvol s.r.o.!**\n**Meno:** ${newLead.name}\n**Tel:** ${newLead.phone}\n**E-mail:** ${newLead.email || 'Nezadané'}\n**Lokalita:** ${newLead.city || 'Nezadané'}\n**Výkon:** ${newLead.recommendedKwp || '-'} kWp | **Úspora:** ${newLead.estimatedSavings || '-'} €/rok\n**Investícia:** ${newLead.netPrice || '-'} €`
          })
        });
      } catch (err) {
        console.error('Webhook error:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Ďakujeme! Váš dopyt bol úspešne zaregistrovaný.',
      leadId
    });
  } catch (error) {
    console.error('Error handling lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Chyba pri spracovaní dopytu na serveri.'
    });
  }
}
