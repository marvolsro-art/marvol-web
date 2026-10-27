/**
 * Challenger 1 (M1): Exhaustive Empirical Lead API Audit Suite
 * Target: pages/api/lead.ts & data/leads.json
 */

import fs from 'fs';
import path from 'path';
import leadHandler from '../../pages/api/lead';
import { createMockRequest, createMockResponse, ROOT_DIR } from './helpers';

export interface AuditResult {
  id: string;
  category: string;
  testCase: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export async function runChallenger1LeadAudit(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: AuditResult[];
}> {
  const results: AuditResult[] = [];
  const leadsFilePath = path.join(ROOT_DIR, 'data', 'leads.json');

  // Backup existing data/leads.json
  let originalLeadsBackup: string | null = null;
  if (fs.existsSync(leadsFilePath)) {
    originalLeadsBackup = fs.readFileSync(leadsFilePath, 'utf8');
  }

  function getLeadsCount(): number {
    if (!fs.existsSync(leadsFilePath)) return 0;
    try {
      const data = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
      return Array.isArray(data) ? data.length : 0;
    } catch {
      return 0;
    }
  }

  function getLatestLead(): Record<string, unknown> | null {
    if (!fs.existsSync(leadsFilePath)) return null;
    try {
      const data = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
      return Array.isArray(data) && data.length > 0 ? data[data.length - 1] : null;
    } catch {
      return null;
    }
  }

  function record(
    id: string,
    category: string,
    testCase: string,
    passed: boolean,
    expected: string,
    actual: string,
    error?: string
  ) {
    results.push({ id, category, testCase, passed, expected, actual, error });
  }

  try {
    // =========================================================================
    // 1. HTTP METHOD ENFORCEMENT & METHOD GUARDS
    // =========================================================================
    const disallowedMethods = ['GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
    for (const method of disallowedMethods) {
      const req = createMockRequest({ method });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const pass = out.statusCode === 405 && out.headers['allow']?.includes('POST');
      record(
        `CH1-MET-${method}`,
        'HTTP Method Guards',
        `Disallowed method ${method} must return HTTP 405 with Allow: POST`,
        pass,
        'HTTP 405 + Allow: POST',
        `HTTP ${out.statusCode} + Allow: ${out.headers['allow'] || 'none'}`,
        pass ? undefined : `Method ${method} was not strictly rejected with 405.`
      );
    }

    // =========================================================================
    // 2. MALFORMED REQUEST BODY / NON-OBJECT BODY
    // =========================================================================
    const malformedBodies: Array<{ name: string; body: unknown }> = [
      { name: 'null body', body: null },
      { name: 'undefined body', body: undefined },
      { name: 'string body', body: 'not-a-json-object' },
      { name: 'number body', body: 12345 },
      { name: 'array body', body: ['item1', 'item2'] },
      { name: 'empty object', body: {} },
    ];

    for (const item of malformedBodies) {
      const req = createMockRequest({ method: 'POST', body: item.body });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const pass = out.statusCode === 400;
      record(
        `CH1-MAL-${item.name.replace(/\s+/g, '-').toUpperCase()}`,
        'Malformed Body Rejection',
        `Payload with ${item.name} must return HTTP 400 Bad Request`,
        pass,
        'HTTP 400',
        `HTTP ${out.statusCode}`,
        pass ? undefined : `Expected 400, received ${out.statusCode}`
      );
    }

    // =========================================================================
    // 3. HONEYPOT DEEP PENETRATION & ZERO-PERSISTENCE GUARANTEE
    // =========================================================================
    const honeypotCases = [
      { id: 'CH1-HP-BURL', desc: 'Standard b_url filled with spam link', body: { name: 'Bot User', phone: '+421948123456', b_url: 'http://spam.org/affiliate' } },
      { id: 'CH1-HP-HPOT', desc: 'Alternative honeypot field filled', body: { name: 'Bot User', phone: '+421948123456', honeypot: 'crawler_bot_signature' } },
      { id: 'CH1-HP-BOTH', desc: 'Both b_url and honeypot fields populated', body: { name: 'Bot User', phone: '+421948123456', b_url: 'http://evil.com', honeypot: 'yes' } },
    ];

    for (const hp of honeypotCases) {
      const countBefore = getLeadsCount();
      const req = createMockRequest({ method: 'POST', body: hp.body });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const countAfter = getLeadsCount();
      const resBody = out.body as { success?: boolean; leadId?: string };

      const is200 = out.statusCode === 200;
      const isBotTrapId = typeof resBody.leadId === 'string' && resBody.leadId.startsWith('BOT-TRAP-');
      const isNotPersisted = countAfter === countBefore;
      const pass = is200 && isBotTrapId && isNotPersisted;

      record(
        hp.id,
        'Honeypot Trap & Zero-Persistence',
        hp.desc,
        pass,
        'HTTP 200, leadId starts with BOT-TRAP-, count unchanged',
        `HTTP ${out.statusCode}, leadId: ${resBody.leadId}, countDelta: ${countAfter - countBefore}`,
        pass ? undefined : 'Bot was either not trapped or leaked into database.'
      );
    }

    // Legitimate submissions with empty honeypot fields must persist
    {
      const countBefore = getLeadsCount();
      const uniqueName = `Legit Lead HP Test ${Date.now()}`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: uniqueName,
          phone: '+421905000111',
          b_url: '',
          honeypot: '',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const countAfter = getLeadsCount();
      const resBody = out.body as { success?: boolean; leadId?: string };
      const latest = getLatestLead();

      const pass = out.statusCode === 200 &&
                   countAfter === countBefore + 1 &&
                   latest?.name === uniqueName &&
                   !resBody.leadId?.startsWith('BOT-TRAP-');

      record(
        'CH1-HP-LEGIT',
        'Honeypot Trap & Zero-Persistence',
        'Submission with empty honeypots passes legitimately into storage',
        pass,
        'HTTP 200, count + 1, leadId normal, stored in leads.json',
        `HTTP ${out.statusCode}, countDelta: ${countAfter - countBefore}, leadId: ${resBody.leadId}`,
        pass ? undefined : 'Empty honeypot incorrectly flagged or failed to persist.'
      );
    }

    // =========================================================================
    // 4. PHONE BOUNDARY VALUES & FORMAT AUDIT
    // =========================================================================
    const phoneTests = [
      // Under-length
      { id: 'CH1-PH-00', phone: '', passExpected: false, desc: 'Empty phone' },
      { id: 'CH1-PH-01', phone: '1', passExpected: false, desc: '1-char phone' },
      { id: 'CH1-PH-08', phone: '12345678', passExpected: false, desc: '8-char phone (boundary -1)' },
      { id: 'CH1-PH-08P', phone: '+4219051', passExpected: false, desc: '8-char phone with plus (boundary -1)' },
      
      // Exact lower boundary (9 chars)
      { id: 'CH1-PH-09A', phone: '090512345', passExpected: true, desc: '9-char standard Slovak mobile prefix (lower boundary)' },
      { id: 'CH1-PH-09B', phone: '+42190512', passExpected: true, desc: '9-char international format (lower boundary)' },

      // Standard valid formats
      { id: 'CH1-PH-13', phone: '+421905123456', passExpected: true, desc: 'Standard Slovak 13-char international format' },
      { id: 'CH1-PH-16', phone: '+421 905 123 456', passExpected: true, desc: 'Standard spaced 16-char format' },
      { id: 'CH1-PH-16H', phone: '+421-905-123-456', passExpected: true, desc: 'Standard hyphenated 16-char format' },

      // Exact upper boundary (20 chars)
      { id: 'CH1-PH-20A', phone: '+421 905 123 456 78', passExpected: true, desc: 'Exactly 20 chars with spaces (upper boundary)' },
      { id: 'CH1-PH-20B', phone: '01234567890123456789', passExpected: true, desc: 'Exactly 20 digits numeric (upper boundary)' },

      // Over-length
      { id: 'CH1-PH-21A', phone: '+421 905 123 456 7890', passExpected: false, desc: '21 chars with spaces (upper boundary +1)' },
      { id: 'CH1-PH-21B', phone: '012345678901234567891', passExpected: false, desc: '21 digits numeric (upper boundary +1)' },
      { id: 'CH1-PH-30', phone: '+42190512345678901234567890', passExpected: false, desc: 'Extreme 27 chars' },

      // Disallowed characters
      { id: 'CH1-PH-CHAR-LET', phone: '+421 905 123 ABC', passExpected: false, desc: 'Phone containing alphabetic letters' },
      { id: 'CH1-PH-CHAR-PAR', phone: '+421 (905) 123-456', passExpected: false, desc: 'Phone with parentheses (unsupported in regex)' },
      { id: 'CH1-PH-CHAR-SYM', phone: '+421 905 123 456!', passExpected: false, desc: 'Phone containing exclamation symbol' },
      { id: 'CH1-PH-CHAR-DOT', phone: '+421.905.123.456', passExpected: false, desc: 'Phone containing dots' },

      // Punctuation-only edge cases conforming to regex [+0-9\s-]
      { id: 'CH1-PH-EDGE-HYPH', phone: '---------', passExpected: true, desc: 'Adversarial 9-hyphens (matches regex character class)' },
      { id: 'CH1-PH-EDGE-PLUS', phone: '+++++99999', passExpected: true, desc: 'Adversarial multi-plus digits (matches regex character class)' },
      { id: 'CH1-PH-EDGE-NODIGIT', phone: '+ - - - - - -', passExpected: true, desc: 'Zero digits phone (+ and - and spaces only) accepted due to regex character class' },
    ];

    for (const pt of phoneTests) {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Phone Tester',
          phone: pt.phone,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const expectedStatus = pt.passExpected ? 200 : 400;
      const pass = out.statusCode === expectedStatus;

      record(
        pt.id,
        'Phone Boundaries & Formats',
        pt.desc,
        pass,
        `HTTP ${expectedStatus}`,
        `HTTP ${out.statusCode}`,
        pass ? undefined : `Phone '${pt.phone}' expected ${expectedStatus}, got ${out.statusCode}`
      );
    }

    // =========================================================================
    // 5. NAME BOUNDARY VALUES
    // =========================================================================
    const nameTests = [
      { id: 'CH1-NM-00', name: '', passExpected: false, desc: 'Empty name' },
      { id: 'CH1-NM-01', name: 'A', passExpected: false, desc: '1-char name (boundary -1)' },
      { id: 'CH1-NM-02', name: 'Jo', passExpected: true, desc: '2-char name (exact lower boundary)' },
      { id: 'CH1-NM-SPC', name: '   ', passExpected: false, desc: 'Whitespace-only name' },
      { id: 'CH1-NM-100', name: 'A'.repeat(100), passExpected: true, desc: 'Exactly 100 chars name (exact upper boundary)' },
      { id: 'CH1-NM-101', name: 'A'.repeat(101), passExpected: false, desc: '101 chars name (boundary +1)' },
      { id: 'CH1-NM-NUM', name: 12345, passExpected: false, desc: 'Non-string name (number)' },
      { id: 'CH1-NM-BOOL', name: true, passExpected: false, desc: 'Non-string name (boolean)' },
    ];

    for (const nt of nameTests) {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: nt.name,
          phone: '+421905111222',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const expectedStatus = nt.passExpected ? 200 : 400;
      const pass = out.statusCode === expectedStatus;

      record(
        nt.id,
        'Name Boundaries & Sanitization',
        nt.desc,
        pass,
        `HTTP ${expectedStatus}`,
        `HTTP ${out.statusCode}`,
        pass ? undefined : `Name test expected ${expectedStatus}, got ${out.statusCode}`
      );
    }

    // =========================================================================
    // 6. NEW FIELDS PERSISTENCE & TYPE FIDELITY: hasHeatPump & subsidy
    // =========================================================================
    
    // Test 6.1: Full residential bundle with hasHeatPump=true and subsidy=4600
    {
      const countBefore = getLeadsCount();
      const leadPayload = {
        name: 'Ing. Juraj Varga (Challenger 1)',
        phone: '+421 905 444 555',
        email: 'juraj.varga@challenger1.marvol.sk',
        city: 'Žilina',
        service: 'tepelne-cerpadla',
        message: 'Záujem o kombináciu fotovoltiky a tepelného čerpadla s plnou dotáciou SIEA.',
        source: 'kalkulacka-test',
        propertyType: 'home',
        monthlyBill: 200,
        hasBattery: true,
        hasHeatPump: true,
        hasEV: true,
        recommendedKwp: 11.5,
        estimatedSavings: 1840,
        netPrice: 12400,
        subsidy: 4600,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const countAfter = getLeadsCount();
      const resBody = out.body as { success?: boolean; leadId?: string };
      const latest = getLatestLead();

      const pass = out.statusCode === 200 &&
                   countAfter === countBefore + 1 &&
                   latest?.hasHeatPump === true &&
                   typeof latest?.hasHeatPump === 'boolean' &&
                   latest?.subsidy === 4600 &&
                   typeof latest?.subsidy === 'number' &&
                   latest?.hasBattery === true &&
                   latest?.hasEV === true &&
                   latest?.recommendedKwp === 11.5 &&
                   latest?.estimatedSavings === 1840 &&
                   latest?.netPrice === 12400;

      record(
        'CH1-FLD-HP-TRUE-SUBS-4600',
        'New Fields Persistence & Types',
        'hasHeatPump: true and subsidy: 4600 correctly written to data/leads.json with proper types',
        pass,
        'hasHeatPump: true (boolean), subsidy: 4600 (number)',
        `hasHeatPump: ${latest?.hasHeatPump} (${typeof latest?.hasHeatPump}), subsidy: ${latest?.subsidy} (${typeof latest?.subsidy})`,
        pass ? undefined : 'Fields were not persisted with exact values and types.'
      );
    }

    // Test 6.2: Bundle with hasHeatPump=false and PV-only subsidy=1150
    {
      const leadPayload = {
        name: 'Peter Novák (PV Only)',
        phone: '+421 905 888 999',
        email: 'peter.novak@challenger1.marvol.sk',
        hasHeatPump: false,
        subsidy: 1150,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 &&
                   latest?.hasHeatPump === false &&
                   typeof latest?.hasHeatPump === 'boolean' &&
                   latest?.subsidy === 1150 &&
                   typeof latest?.subsidy === 'number';

      record(
        'CH1-FLD-HP-FALSE-SUBS-1150',
        'New Fields Persistence & Types',
        'hasHeatPump: false and subsidy: 1150 correctly persisted with boolean false and number 1150',
        pass,
        'hasHeatPump: false (boolean), subsidy: 1150 (number)',
        `hasHeatPump: ${latest?.hasHeatPump} (${typeof latest?.hasHeatPump}), subsidy: ${latest?.subsidy} (${typeof latest?.subsidy})`,
        pass ? undefined : 'Falsy boolean hasHeatPump: false was not persisted correctly.'
      );
    }

    // Test 6.3: Zero subsidy (subsidy: 0) must NOT be coerced to undefined
    {
      const leadPayload = {
        name: 'Martin Kováč (Commercial Zero Subsidy)',
        phone: '+421 905 777 666',
        propertyType: 'business',
        subsidy: 0,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 &&
                   latest?.subsidy === 0 &&
                   typeof latest?.subsidy === 'number';

      record(
        'CH1-FLD-SUBS-ZERO',
        'New Fields Persistence & Types',
        'subsidy: 0 must be preserved as numeric 0, not omitted as falsy',
        pass,
        'subsidy: 0 (number)',
        `subsidy: ${latest?.subsidy} (${typeof latest?.subsidy})`,
        pass ? undefined : 'Numeric 0 was corrupted or omitted.'
      );
    }

    // Test 6.4: Combined maximal voucher subsidy (subsidy: 5750)
    {
      const leadPayload = {
        name: 'Eva Balážová (Combined Voucher)',
        phone: '+421 905 333 444',
        hasHeatPump: true,
        subsidy: 5750,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 &&
                   latest?.hasHeatPump === true &&
                   latest?.subsidy === 5750;

      record(
        'CH1-FLD-SUBS-MAX-5750',
        'New Fields Persistence & Types',
        'Combined subsidy of 5 750 € (PV 1 150 + HP 4 600) correctly stored',
        pass,
        'hasHeatPump: true, subsidy: 5750',
        `hasHeatPump: ${latest?.hasHeatPump}, subsidy: ${latest?.subsidy}`,
        pass ? undefined : 'Combined subsidy failed to store.'
      );
    }

    // Test 6.5: Type poisoning on hasHeatPump (string "true", number 1)
    {
      const leadPayload = {
        name: 'Type Attack HeatPump',
        phone: '+421 905 123 456',
        hasHeatPump: 'true' as unknown as boolean,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 && latest?.hasHeatPump === undefined;

      record(
        'CH1-FLD-HP-POISON-STR',
        'New Fields Persistence & Types',
        'String "true" passed to hasHeatPump is stripped to undefined (no type leak)',
        pass,
        'hasHeatPump === undefined',
        `hasHeatPump: ${latest?.hasHeatPump}`,
        pass ? undefined : 'String leaked into boolean field.'
      );
    }

    // Test 6.6: Type poisoning on subsidy (string "4600", NaN)
    {
      const leadPayload = {
        name: 'Type Attack Subsidy',
        phone: '+421 905 123 456',
        subsidy: '4600' as unknown as number,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 && latest?.subsidy === undefined;

      record(
        'CH1-FLD-SUBS-POISON-STR',
        'New Fields Persistence & Types',
        'String "4600" passed to subsidy is stripped to undefined (no string leak)',
        pass,
        'subsidy === undefined',
        `subsidy: ${latest?.subsidy}`,
        pass ? undefined : 'String leaked into numeric field.'
      );
    }

    // Test 6.7: NaN passed to subsidy
    {
      const leadPayload = {
        name: 'NaN Subsidy Test',
        phone: '+421 905 123 456',
        subsidy: NaN,
      };

      const req = createMockRequest({ method: 'POST', body: leadPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const out = getResponse();
      const latest = getLatestLead();

      const pass = out.statusCode === 200 && latest?.subsidy === undefined;

      record(
        'CH1-FLD-SUBS-POISON-NAN',
        'New Fields Persistence & Types',
        'NaN passed to subsidy is stripped to undefined',
        pass,
        'subsidy === undefined',
        `subsidy: ${latest?.subsidy}`,
        pass ? undefined : 'NaN corrupted numeric field.'
      );
    }

    // =========================================================================
    // 7. RAPID SEQUENTIAL SUBMISSIONS INTEGRITY (NO DATA LOSS)
    // =========================================================================
    {
      const initialCount = getLeadsCount();
      const BATCH_SIZE = 10;
      const createdIds: string[] = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        const req = createMockRequest({
          method: 'POST',
          body: {
            name: `Rapid Submission #${i + 1}`,
            phone: `+42190500000${i}`,
            hasHeatPump: i % 2 === 0,
            subsidy: i * 500,
          },
        });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const out = getResponse();
        const resBody = out.body as { leadId?: string };
        if (resBody.leadId) createdIds.push(resBody.leadId);
      }

      const finalCount = getLeadsCount();
      const fileData = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8')) as Array<{ id: string }>;
      const allPersisted = createdIds.every((id) => fileData.some((entry) => entry.id === id));
      const pass = finalCount === initialCount + BATCH_SIZE && allPersisted;

      record(
        'CH1-RAPID-PERSIST-10',
        'Persistence Resilience',
        '10 rapid sequential lead submissions are 100% written without race condition or dropped records',
        pass,
        `finalCount === ${initialCount + BATCH_SIZE} && all 10 IDs present`,
        `finalCount === ${finalCount}, persisted IDs: ${createdIds.length}/${BATCH_SIZE}`,
        pass ? undefined : 'Rapid submission dropped one or more records.'
      );
    }

  } finally {
    // Restore backup
    if (originalLeadsBackup !== null) {
      fs.writeFileSync(leadsFilePath, originalLeadsBackup, 'utf8');
    }
  }

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}
