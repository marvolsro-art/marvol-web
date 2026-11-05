import type { NextApiRequest, NextApiResponse } from 'next';
import { sendLeadNotificationEmail } from '@/lib/email';
import type { LeadRecord } from '@/pages/api/lead';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow GET or POST for testing
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({
      success: false,
      message: 'Povolené metódy sú GET alebo POST.',
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const recipient =
    (req.query.to as string) ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.LEAD_RECIPIENT_EMAIL ||
    'marvolsro@gmail.com';

  const configStatus = {
    resendConfigured: Boolean(resendApiKey),
    smtpConfigured: Boolean(smtpHost && smtpUser && smtpPass),
    targetRecipient: recipient,
    activeProvider: resendApiKey ? 'Resend' : smtpHost ? 'SMTP' : 'Žiadny (nevyplnené)',
  };

  if (!resendApiKey && (!smtpHost || !smtpUser || !smtpPass)) {
    return res.status(200).json({
      success: false,
      message:
        'E-mailové posielanie zatiaľ nie je nakonfigurované. Pridajte do .env.local alebo nastavení hostingu premennú RESEND_API_KEY alebo SMTP údaje (SMTP_HOST, SMTP_USER, SMTP_PASS).',
      configStatus,
      instructions: {
        optionA_Resend: {
          step1: 'Zaregistrujte sa zadarmo na https://resend.com',
          step2: 'Vytvorte API kľúč v sekcii API Keys',
          step3: 'Pridajte do .env.local: RESEND_API_KEY=re_123456...',
          step4: 'Nastavte NOTIFICATION_EMAIL=info@marvol.sk (alebo váš cieľový mail)',
        },
        optionB_SMTP: {
          step1: 'Získajte SMTP údaje k vašej mailovej schránke (napr. Websupport, Gmail, Seznam)',
          step2: 'Pridajte do .env.local: SMTP_HOST=smtp.websupport.sk, SMTP_PORT=465, SMTP_USER=info@marvol.sk, SMTP_PASS=heslo',
          step3: 'Nastavte NOTIFICATION_EMAIL=info@marvol.sk',
        },
      },
    });
  }

  // Create mock lead for test verification
  const testLead: LeadRecord = {
    id: `TEST-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: 'Testovací Zákazník (Test systému Marvol)',
    phone: '+421 948 123 456',
    email: 'test@marvol.sk',
    city: 'Vrútky / Žilina',
    service: 'Testovacia správa odosielania e-mailov',
    message: 'Toto je automatická testovacia správa overujúca funkčnosť doručovania dopytov z webu Marvol s.r.o. Ak vidíte tento e-mail, systém odosielania funguje na 100 % správne!',
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
        message: `✅ Testovací e-mail bol ÚSPEŠNE odoslaný na adresu ${recipient}!`,
        provider: result.provider,
        messageId: result.messageId,
        configStatus,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Odoslanie testovacieho e-mailu zlyhalo. Skontrolujte prosím platnosť prihlasovacích údajov.',
        error: result.error,
        configStatus,
      });
    }
  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      message: 'Neočakávaná chyba pri pokuse o odoslanie testovacieho e-mailu.',
      error: err instanceof Error ? err.message : String(err),
      configStatus,
    });
  }
}
