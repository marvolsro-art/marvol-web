import nodemailer from 'nodemailer';
import type { LeadRecord } from '@/pages/api/lead';

export interface EmailDispatchResult {
  success: boolean;
  provider?: 'resend' | 'smtp';
  messageId?: string;
  error?: string;
}

/**
 * Formats Slovak currency or string
 */
function formatEur(value?: number): string {
  if (typeof value !== 'number' || isNaN(value)) return '-';
  return `${value.toLocaleString('sk-SK')} €`;
}

/**
 * Builds high-converting, professional HTML email for Marvol sales team
 */
export function buildLeadNotificationHtml(lead: LeadRecord): string {
  const isCalculatorLead =
    lead.recommendedKwp !== undefined ||
    lead.estimatedSavings !== undefined ||
    lead.netPrice !== undefined;

  const quickCallUrl = `tel:${lead.phone.replace(/\s+/g, '')}`;
  const quickMailUrl = lead.email ? `mailto:${lead.email}?subject=Marvol%20s.r.o.%20-%20Odpoved%20na%20dopyt` : '';

  return `
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nový dopyt pre Marvol s.r.o.</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 24px 12px; color: #0f172a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #f59e0b; }
    .brand-pill { display: inline-block; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; rounded-radius: 6px; margin-bottom: 12px; }
    .header h1 { margin: 0 0 6px 0; font-size: 24px; color: #ffffff; font-weight: 900; letter-spacing: -0.5px; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 28px; }
    .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; margin: 24px 0 12px 0; padding-bottom: 6px; border-bottom: 2px solid #f1f5f9; }
    .section-title:first-child { margin-top: 0; }
    .table-data { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .table-data td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table-data td.label { font-weight: 600; color: #64748b; width: 38%; }
    .table-data td.value { font-weight: 700; color: #0f172a; }
    .kpi-grid { display: table; width: 100%; margin: 16px 0; border-spacing: 8px; border-collapse: separate; }
    .kpi-cell { display: table-cell; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; width: 33.33%; }
    .kpi-num { font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 4px; }
    .kpi-sub { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; }
    .kpi-amber { color: #d97706; }
    .kpi-emerald { color: #059669; }
    .note-box { background: #f8fafc; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 16px 0; font-size: 14px; line-height: 1.5; color: #334155; }
    .actions { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; }
    .btn { display: inline-block; padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; text-decoration: none; margin: 4px 6px; }
    .btn-call { background: #f59e0b; color: #020617; }
    .btn-mail { background: #0f172a; color: #ffffff; }
    .footer { background: #f8fafc; padding: 20px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand-pill">⚡ Nový dopyt z webu</div>
      <h1>${lead.name}</h1>
      <p>Prijaté: ${new Date(lead.timestamp).toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' })} • ID: ${lead.id}</p>
    </div>

    <div class="content">
      
      <div class="section-title">Kontaktné údaje zákazníka</div>
      <table class="table-data">
        <tr>
          <td class="label">Meno a priezvisko</td>
          <td class="value">${lead.name}</td>
        </tr>
        <tr>
          <td class="label">Telefónne číslo</td>
          <td class="value"><a href="${quickCallUrl}" style="color: #d97706; text-decoration: none; font-weight: 800;">${lead.phone}</a></td>
        </tr>
        <tr>
          <td class="label">E-mail</td>
          <td class="value">${lead.email ? `<a href="mailto:${lead.email}" style="color: #0284c7; text-decoration: none;">${lead.email}</a>` : '<span style="color:#94a3b8; font-weight:normal;">Nezadaný</span>'}</td>
        </tr>
        <tr>
          <td class="label">Mesto / Lokalita</td>
          <td class="value">${lead.city || '<span style="color:#94a3b8; font-weight:normal;">Nezadaná</span>'}</td>
        </tr>
        <tr>
          <td class="label">Kategória / Služba</td>
          <td class="value">${lead.service || '<span style="color:#94a3b8; font-weight:normal;">Všeobecný dopyt</span>'}</td>
        </tr>
        <tr>
          <td class="label">Zdroj na webe</td>
          <td class="value"><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:12px;">${lead.source}</code></td>
        </tr>
      </table>

      ${isCalculatorLead ? `
      <div class="section-title">Parametre solárnej kalkulácie</div>
      <div class="kpi-grid">
        <div class="kpi-cell">
          <div class="kpi-sub">Výkon FVE</div>
          <div class="kpi-num">${lead.recommendedKwp ? `${lead.recommendedKwp} kWp` : '-'}</div>
        </div>
        <div class="kpi-cell">
          <div class="kpi-sub">Ročná úspora</div>
          <div class="kpi-num kpi-emerald">${formatEur(lead.estimatedSavings)}/rok</div>
        </div>
        <div class="kpi-cell">
          <div class="kpi-sub">Dotácia SIEA</div>
          <div class="kpi-num kpi-amber">${lead.subsidy !== undefined ? formatEur(lead.subsidy) : '-'}</div>
        </div>
      </div>

      <table class="table-data" style="margin-top: 8px;">
        <tr>
          <td class="label">Investícia po dotácii</td>
          <td class="value" style="color: #0f172a; font-size: 16px;">${formatEur(lead.netPrice)}</td>
        </tr>
        <tr>
          <td class="label">Mesačný účet za elektrinu</td>
          <td class="value">${lead.monthlyBill ? `${lead.monthlyBill} € / mesiac` : '-'}</td>
        </tr>
        <tr>
          <td class="label">Batériové úložisko BESS</td>
          <td class="value">${lead.hasBattery ? '✅ Áno (Hybridný systém)' : '❌ Nie (On-Grid)'}</td>
        </tr>
        <tr>
          <td class="label">Tepelné čerpadlo</td>
          <td class="value">${lead.hasHeatPump ? '✅ Áno' : '❌ Nie'}</td>
        </tr>
        <tr>
          <td class="label">EV Wallbox (nabíjanie auta)</td>
          <td class="value">${lead.hasEV ? '✅ Áno' : '❌ Nie'}</td>
        </tr>
      </table>
      ` : ''}

      ${lead.message ? `
      <div class="section-title">Poznámka / Správa od klienta</div>
      <div class="note-box">
        ${lead.message.replace(/\n/g, '<br/>')}
      </div>
      ` : ''}

      <div class="actions">
        <a href="${quickCallUrl}" class="btn btn-call">📞 Zavolať zákazníkovi</a>
        ${lead.email ? `<a href="${quickMailUrl}" class="btn btn-mail">✉️ Odpovedať na e-mail</a>` : ''}
      </div>

    </div>

    <div class="footer">
      Marvol s.r.o. Lead Management System • Chotárna 3394/6, 038 61 Vrútky<br/>
      Oficiálny registrovaný zhotoviteľ SIEA pre Zelená domácnostiam &amp; Zelená podnikom
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Builds plain-text fallback version for mail clients that do not support HTML
 */
export function buildLeadNotificationPlainText(lead: LeadRecord): string {
  const lines: string[] = [
    `=== NOVÝ DOPYT PRE MARVOL S.R.O. ===`,
    `ID dopytu: ${lead.id}`,
    `Prijaté: ${new Date(lead.timestamp).toLocaleString('sk-SK', { timeZone: 'Europe/Bratislava' })}`,
    ``,
    `KONTAKTNÉ ÚDAJE ZÁKAZNÍKA:`,
    `- Meno a priezvisko: ${lead.name}`,
    `- Telefón: ${lead.phone}`,
    `- E-mail: ${lead.email || 'Nezadaný'}`,
    `- Mesto / Lokalita: ${lead.city || 'Nezadaná'}`,
    `- Kategória / Služba: ${lead.service || 'Všeobecný'}`,
    `- Zdroj: ${lead.source}`,
  ];

  if (
    lead.recommendedKwp !== undefined ||
    lead.estimatedSavings !== undefined ||
    lead.netPrice !== undefined
  ) {
    lines.push(
      ``,
      `PARAMETRE KALKULÁCIE:`,
      `- Odporúčaný výkon FVE: ${lead.recommendedKwp ? `${lead.recommendedKwp} kWp` : '-'}`,
      `- Odhadovaná ročná úspora: ${lead.estimatedSavings ? `${lead.estimatedSavings} € / rok` : '-'}`,
      `- Štátna dotácia SIEA: ${lead.subsidy !== undefined ? `${lead.subsidy} €` : '-'}`,
      `- Odhadovaná investícia po dotácii: ${lead.netPrice ? `${lead.netPrice} €` : '-'}`,
      `- Mesačná platba za elektrinu: ${lead.monthlyBill ? `${lead.monthlyBill} €` : '-'}`,
      `- Batéria: ${lead.hasBattery ? 'Áno' : 'Nie'}`,
      `- Tepelné čerpadlo: ${lead.hasHeatPump ? 'Áno' : 'Nie'}`,
      `- EV Wallbox: ${lead.hasEV ? 'Áno' : 'Nie'}`
    );
  }

  if (lead.message) {
    lines.push(``, `POZNÁMKA / SPRÁVA OD KLIENTA:`, lead.message);
  }

  lines.push(``, `---`, `Marvol s.r.o. - robíme svet zelenším`);
  return lines.join('\n');
}

/**
 * Dispatches lead email notification via available provider:
 * 1. Resend (HTTP REST API - zero config, instant)
 * 2. SMTP (Nodemailer - for standard Websupport / Gmail / custom mail server)
 */
export async function sendLeadNotificationEmail(
  lead: LeadRecord
): Promise<EmailDispatchResult> {
  const recipientEmail =
    process.env.NOTIFICATION_EMAIL ||
    process.env.LEAD_RECIPIENT_EMAIL ||
    'info@marvol.sk';

  const subject = `⚡ Nový dopyt: ${lead.name} (${lead.service || 'Fotovoltika'}) [${lead.phone}]`;
  const htmlContent = buildLeadNotificationHtml(lead);
  const plainTextContent = buildLeadNotificationPlainText(lead);

  let lastError: string | undefined;

  // ---------------------------------------------------------------------------
  // METHOD 1: Resend HTTP REST API
  // ---------------------------------------------------------------------------
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromEmail = process.env.RESEND_FROM || 'Marvol Web <onboarding@resend.dev>';

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey.trim()}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: lead.email ? lead.email : undefined,
          subject,
          html: htmlContent,
          text: plainTextContent,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.id) {
        return {
          success: true,
          provider: 'resend',
          messageId: data.id,
        };
      } else {
        lastError = data?.message || (typeof data === 'object' ? JSON.stringify(data) : 'RESEND_DISPATCH_FAILED');
        console.error('[EMAIL_RESEND_ERROR]', data);
        // Continue to check if SMTP is configured as fallback
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error('[EMAIL_RESEND_FETCH_ERROR]', err);
    }
  }

  // ---------------------------------------------------------------------------
  // METHOD 2: Custom SMTP (Websupport / Gmail / Dedicated Mail Server)
  // ---------------------------------------------------------------------------
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
      const smtpSecure =
        process.env.SMTP_SECURE !== undefined
          ? process.env.SMTP_SECURE === 'true'
          : smtpPort === 465;

      const fromAddress = process.env.SMTP_FROM || `Marvol s.r.o. <${smtpUser}>`;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          // Do not fail on self-signed certificates
          rejectUnauthorized: false,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: recipientEmail,
        replyTo: lead.email || undefined,
        subject,
        text: plainTextContent,
        html: htmlContent,
      });

      return {
        success: true,
        provider: 'smtp',
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      console.error('[EMAIL_SMTP_ERROR]', err);
      return {
        success: false,
        provider: 'smtp',
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // ---------------------------------------------------------------------------
  // NO PROVIDER CONFIGURED: Return informative state without crashing
  // ---------------------------------------------------------------------------
  console.warn(
    '[EMAIL_SERVICE] No active email provider configured (RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS). Lead was saved locally in data/leads.json, but email was not sent.'
  );

  return {
    success: false,
    error: lastError || 'NO_EMAIL_PROVIDER_CONFIGURED',
  };
}
