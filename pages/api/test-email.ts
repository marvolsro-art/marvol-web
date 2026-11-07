import type { NextApiRequest, NextApiResponse } from 'next';
import { sendLeadNotificationEmail } from '../../lib/email';
import type { LeadRecord } from './lead';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Production lockdown: Endpoint is strictly unavailable in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({
      success: false,
      message: 'Tento testovací koncový bod nie je v produkčnom prostredí dostupný.',
    });
  }

  // 2. Only POST method allowed for testing dispatch
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: 'Povolená metóda je výhradne POST.',
    });
  }

  // 3. Fixed recipient: No arbitrary recipient parameter (prevents open relay abuse)
  const recipient =
    process.env.NOTIFICATION_EMAIL ||
    process.env.LEAD_RECIPIENT_EMAIL ||
    'marvolsro@gmail.com';

  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!resendApiKey && (!smtpHost || !smtpUser || !smtpPass)) {
    return res.status(200).json({
      success: false,
      message: 'E-mailové posielanie zatiaľ nie je nakonfigurované.',
    });
  }

  // Create mock lead for test verification
  const testLead: LeadRecord = {
    id: `TEST-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: 'Testovací Zákazník (Test systému Marvol)',
    phone: '+421 908 403 042',
    email: 'test@marvol.sk',
    city: 'Vrútky / Žilina',
    service: 'Testovacia správa odosielania e-mailov',
    message:
      'Toto je automatická testovacia správa overujúca funkčnosť doručovania dopytov z webu Marvol s.r.o. Ak vidíte tento e-mail, systém odosielania funguje na 100 % správne!',
    source: 'test-email-endpoint',
    recommendedKwp: 6.4,
    estimatedSavings: 1150,
    netPrice: 7800,
    subsidy: 1150,
    hasBattery: true,
    hasHeatPump: false,
    hasEV: false,
    monthlyBill: 140,
  };

  try {
    const result = await sendLeadNotificationEmail(testLead);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `✅ Testovací e-mail bol ÚSPEŠNE odoslaný na internú adresu ${recipient}!`,
        provider: result.provider,
        messageId: result.messageId,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Odoslanie testovacieho e-mailu zlyhalo. Skontrolujte prihlasovacie údaje poskytovateľa.',
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Neočakávaná chyba pri pokuse o odoslanie testovacieho e-mailu.',
    });
  }
}
