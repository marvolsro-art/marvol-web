/**
 * Marvol s.r.o. — Adversarial Stress Test Suite (Challenger 1)
 * 
 * Deep stress-testing of Conversion & Lead Engine:
 * - Bot honeypot trap absorption & leads.json exclusion
 * - Input boundaries, malformed phones, invalid emails, empty payload
 * - Extreme string lengths (1,000+ chars), XSS script injection, prototype pollution
 * - Lead JSON persistence on-disk integrity & schema conformance
 * - Dynamic service preselection across subpages and /kontakt?service=...
 */

import fs from 'fs';
import path from 'path';
import leadHandler from '../../pages/api/lead';
import { createMockRequest, createMockResponse, ROOT_DIR, readFile } from './helpers';

export interface StressTestResult {
  id: string;
  group: string;
  name: string;
  passed: boolean;
  error?: string;
  details?: unknown;
}

export async function runAdversarialStressSuite(): Promise<{
  total: number;
  passed: number;
  failed: number;
  results: StressTestResult[];
}> {
  const results: StressTestResult[] = [];

  function record(id: string, group: string, name: string, passed: boolean, error?: string, details?: unknown) {
    results.push({ id, group, name, passed, error, details });
  }

  // Backup data/leads.json
  const leadsFilePath = path.join(ROOT_DIR, 'data', 'leads.json');
  let originalLeadsBackup: string | null = null;
  if (fs.existsSync(leadsFilePath)) {
    originalLeadsBackup = fs.readFileSync(leadsFilePath, 'utf8');
  }

  try {
    // =========================================================================
    // GROUP 1: Bot Honeypot Trap Absorption & leads.json Exclusion
    // =========================================================================
    
    // Test 1.1: Honeypot b_url with spam link
    {
      const botId = `SPAM-BOT-${Date.now()}-1`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: botId,
          phone: '+421948999888',
          b_url: 'https://viagra-crypto-casino-spambot.ru',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
      const parsedLeads = JSON.parse(fileContent);
      const leakedIntoDb = parsedLeads.some((l: { name: string }) => l.name === botId);

      const pass = resData.statusCode === 200 &&
                   body.success === true &&
                   typeof body.leadId === 'string' &&
                   body.leadId.startsWith('BOT-TRAP-') &&
                   !leakedIntoDb;

      record(
        'ADV-HP-01',
        'Honeypot Trap',
        'Standard b_url honeypot absorbs bot with 200 OK and excludes from leads.json',
        pass,
        pass ? undefined : `Status: ${resData.statusCode}, leadId: ${body.leadId}, leaked: ${leakedIntoDb}`
      );
    }

    // Test 1.2: Honeypot field named "honeypot"
    {
      const botId = `SPAM-BOT-${Date.now()}-2`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: botId,
          phone: '+421948999888',
          honeypot: 'automated_headless_submission',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
      const parsedLeads = JSON.parse(fileContent);
      const leakedIntoDb = parsedLeads.some((l: { name: string }) => l.name === botId);

      const pass = resData.statusCode === 200 &&
                   body.success === true &&
                   typeof body.leadId === 'string' &&
                   body.leadId.startsWith('BOT-TRAP-') &&
                   !leakedIntoDb;

      record(
        'ADV-HP-02',
        'Honeypot Trap',
        'Alternative "honeypot" field traps bot with 200 OK and excludes from leads.json',
        pass,
        pass ? undefined : `Status: ${resData.statusCode}, leadId: ${body.leadId}, leaked: ${leakedIntoDb}`
      );
    }

    // Test 1.3: Honeypot field with leading/trailing whitespace
    {
      const botId = `SPAM-BOT-${Date.now()}-3`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: botId,
          phone: '+421948999888',
          b_url: '   https://bot-crawler.com/trap   ',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
      const parsedLeads = JSON.parse(fileContent);
      const leakedIntoDb = parsedLeads.some((l: { name: string }) => l.name === botId);

      const pass = resData.statusCode === 200 &&
                   body.success === true &&
                   typeof body.leadId === 'string' &&
                   body.leadId.startsWith('BOT-TRAP-') &&
                   !leakedIntoDb;

      record(
        'ADV-HP-03',
        'Honeypot Trap',
        'Whitespace-padded b_url honeypot traps bot cleanly without persistence',
        pass,
        pass ? undefined : `Status: ${resData.statusCode}, leadId: ${body.leadId}, leaked: ${leakedIntoDb}`
      );
    }

    // Test 1.4: Empty b_url does NOT trigger trap (legitimate user)
    {
      const legitName = `LegitUser-${Date.now()}`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: legitName,
          phone: '+421948123456',
          b_url: '',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.existsSync(leadsFilePath) ? fs.readFileSync(leadsFilePath, 'utf8') : '[]';
      const parsedLeads = JSON.parse(fileContent);
      const savedInDb = parsedLeads.some((l: { name: string }) => l.name === legitName);

      const pass = resData.statusCode === 200 &&
                   body.success === true &&
                   typeof body.leadId === 'string' &&
                   !body.leadId.startsWith('BOT-TRAP-') &&
                   savedInDb;

      record(
        'ADV-HP-04',
        'Honeypot Trap',
        'Legitimate submission with empty b_url is saved and not flagged as bot',
        pass,
        pass ? undefined : `Status: ${resData.statusCode}, leadId: ${body.leadId}, savedInDb: ${savedInDb}`
      );
    }

    // =========================================================================
    // GROUP 2: Boundary & Invalid Input Rejection
    // =========================================================================

    // Test 2.1: Empty JSON payload {}
    {
      const req = createMockRequest({ method: 'POST', body: {} });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-01', 'Input Validation', 'Empty JSON body {} returns HTTP 400 Bad Request', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.2: Missing phone
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Peter Horvath' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-02', 'Input Validation', 'Missing phone returns HTTP 400 Bad Request', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.3: Name single char (< 2 chars)
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'A', phone: '+421948123456' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-03', 'Input Validation', 'Single-char name (< 2 chars) returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.4: Whitespace-only name
    {
      const req = createMockRequest({ method: 'POST', body: { name: '     ', phone: '+421948123456' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-04', 'Input Validation', 'Whitespace-only name returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.5: Over-length name (101 chars)
    {
      const longName = 'A'.repeat(101);
      const req = createMockRequest({ method: 'POST', body: { name: longName, phone: '+421948123456' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-05', 'Input Validation', 'Name > 100 chars returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.6: Malformed phone: under 9 chars
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '12345678' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-06', 'Input Validation', 'Phone < 9 chars returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.7: Malformed phone: over 20 chars
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456789012345' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-07', 'Input Validation', 'Phone > 20 chars returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.8: Malformed phone with alphabetic characters
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948ABCDE' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-08', 'Input Validation', 'Phone with letters returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.9: Malformed phone with invalid symbols
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421-948-!@#$' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-09', 'Input Validation', 'Phone with symbols (!@#$) returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.10: Valid Slovak & international phone formats accepted
    {
      const validPhones = [
        '+421 948 123 456',
        '+421948123456',
        '0948 123 456',
        '0948123456',
        '00421 905 111 222',
        '+420 777 888 999',
      ];
      let allPassed = true;
      for (const phone of validPhones) {
        const req = createMockRequest({ method: 'POST', body: { name: 'Jan Valid', phone } });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        if (getResponse().statusCode !== 200) {
          allPassed = false;
          break;
        }
      }
      record('ADV-IN-10', 'Input Validation', 'All standard Slovak and international phone formats return 200 OK', allPassed);
    }

    // Test 2.11: Malformed email: missing @
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: 'invalid-email-address' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-11', 'Input Validation', 'Email missing @ returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.12: Malformed email: missing domain
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: 'user@' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-12', 'Input Validation', 'Email missing domain (user@) returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.13: Malformed email: missing username
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: '@marvol.sk' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-13', 'Input Validation', 'Email missing username (@marvol.sk) returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.14: Malformed email: missing TLD dot
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: 'user@marvolsk' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-14', 'Input Validation', 'Email missing TLD (user@marvolsk) returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.15: Malformed email: spaces in email
    {
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: 'user name@marvol.sk' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-15', 'Input Validation', 'Email containing spaces returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.16: Overlength email (> 150 chars)
    {
      const longEmail = 'a'.repeat(140) + '@marvol.sk'; // 150 chars
      const tooLongEmail = 'a'.repeat(142) + '@marvol.sk'; // 152 chars
      const req = createMockRequest({ method: 'POST', body: { name: 'Valid Name', phone: '+421948123456', email: tooLongEmail } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-IN-16', 'Input Validation', 'Email > 150 chars returns HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 2.17: HTTP Protocol Method Guard (GET, PUT, DELETE, PATCH)
    {
      let allMethodsGuarded = true;
      for (const method of ['GET', 'PUT', 'DELETE', 'PATCH']) {
        const req = createMockRequest({ method });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const resp = getResponse();
        if (resp.statusCode !== 405) {
          allMethodsGuarded = false;
          break;
        }
      }
      record('ADV-IN-17', 'Protocol Guard', 'HTTP methods GET/PUT/DELETE/PATCH are rejected with HTTP 405', allMethodsGuarded);
    }

    // =========================================================================
    // GROUP 3: Extreme Payloads & Injection Hardening
    // =========================================================================

    // Test 3.1: Extreme string length in name (1,500 chars)
    {
      const extremeName = 'X'.repeat(1500);
      const req = createMockRequest({ method: 'POST', body: { name: extremeName, phone: '+421948123456' } });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 400;
      record('ADV-EX-01', 'Extreme Payloads', 'Extreme 1,500 chars name rejected with HTTP 400', pass, pass ? undefined : `Got ${resData.statusCode}`);
    }

    // Test 3.2: Extreme string length in message (5,000 chars) safely sliced to 3,000
    {
      const extremeMsg = 'M'.repeat(5000);
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Extreme Message User',
          phone: '+421948123456',
          message: extremeMsg,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      const leads = JSON.parse(fileContent);
      const savedLead = leads.find((l: { id: string }) => l.id === body.leadId);

      const pass = resData.statusCode === 200 &&
                   savedLead &&
                   savedLead.message.length === 3000;

      record('ADV-EX-02', 'Extreme Payloads', 'Extreme 5,000 chars message is safely capped to 3,000 chars without crash', pass, pass ? undefined : `Saved length: ${savedLead?.message?.length}`);
    }

    // Test 3.3: Extreme string length in city (1,000 chars) safely sliced to 150
    {
      const extremeCity = 'C'.repeat(1000);
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Extreme City User',
          phone: '+421948123456',
          city: extremeCity,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      const leads = JSON.parse(fileContent);
      const savedLead = leads.find((l: { id: string }) => l.id === body.leadId);

      const pass = resData.statusCode === 200 &&
                   savedLead &&
                   savedLead.city.length === 150;

      record('ADV-EX-03', 'Extreme Payloads', 'Extreme 1,000 chars city is safely sliced to 150 chars', pass, pass ? undefined : `Saved length: ${savedLead?.city?.length}`);
    }

    // Test 3.4: XSS / Script Injection attempt in name, city, message
    {
      const xssPayload = "<script>alert('XSS-ATTACK');</script><img src=x onerror=alert(1)>";
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Jan <script>alert(1)</script>',
          phone: '+421948123456',
          city: '<svg onload=alert(document.domain)>',
          message: xssPayload,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      // Verify leads.json is still 100% valid JSON after saving raw strings
      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      let validJson = false;
      try {
        const parsed = JSON.parse(fileContent);
        validJson = Array.isArray(parsed);
      } catch {
        validJson = false;
      }

      const pass = resData.statusCode === 200 && validJson;
      record('ADV-EX-04', 'Injection Hardening', 'XSS/HTML script tags do not crash JSON persistence or corrupt leads.json', pass, pass ? undefined : `Status: ${resData.statusCode}, validJson: ${validJson}`);
    }

    // Test 3.5: Prototype pollution attempt
    {
      const pollutedPayload = JSON.parse('{"__proto__": {"isAdmin": true}, "name": "Proto Tester", "phone": "+421948123456"}');
      const req = createMockRequest({ method: 'POST', body: pollutedPayload });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      
      const isProtoPolluted = ({} as Record<string, unknown>).isAdmin !== undefined;
      const pass = resData.statusCode === 200 && !isProtoPolluted;
      record('ADV-EX-05', 'Injection Hardening', 'Prototype pollution payload does not contaminate Object.prototype', pass, pass ? undefined : `isProtoPolluted: ${isProtoPolluted}`);
    }

    // Test 3.6: SQL Injection / comment delimiter strings
    {
      const sqliPayload = "Robert'); DROP TABLE leads;--";
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: sqliPayload,
          phone: '+421948123456',
          message: "1' OR '1'='1' /* comments */",
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const pass = resData.statusCode === 200;
      record('ADV-EX-06', 'Injection Hardening', "SQL injection payload (Robert'); DROP TABLE leads;--) handled safely", pass, pass ? undefined : `Status: ${resData.statusCode}`);
    }

    // Test 3.7: Non-numeric strings in numeric fields sanitized to undefined
    {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Numeric Type Tester',
          phone: '+421948123456',
          monthlyBill: 'invalid-string',
          netPrice: NaN,
          recommendedKwp: 'ten kWp',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      const leads = JSON.parse(fileContent);
      const saved = leads.find((l: { id: string }) => l.id === body.leadId);

      const pass = resData.statusCode === 200 &&
                   saved.monthlyBill === undefined &&
                   saved.netPrice === undefined &&
                   saved.recommendedKwp === undefined;

      record('ADV-EX-07', 'Type Sanitization', 'Non-numeric strings and NaN in numeric fields are stripped to undefined', pass, pass ? undefined : `Saved: ${JSON.stringify(saved)}`);
    }

    // =========================================================================
    // GROUP 4: Valid Lead Submission & Disk JSON Integrity
    // =========================================================================

    // Test 4.1: Clean full lead record structure
    {
      const testTimestamp = Date.now();
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Ing. Martin Dvořák',
          phone: '+421 948 555 777',
          email: 'martin.dvorak@example.sk',
          city: 'Vrútky',
          service: 'fotovoltika-dom',
          message: 'Kompletná fotovoltika 10 kWp s LiFePO4 batériou 15 kWh a dotáciou Zelená domácnostiam.',
          source: 'calculator_lead',
          propertyType: 'rodinny_dom',
          monthlyBill: 160,
          hasBattery: true,
          hasEV: false,
          recommendedKwp: 9.8,
          estimatedSavings: 1450,
          netPrice: 7800,
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const resData = getResponse();
      const body = resData.body as { success?: boolean; leadId?: string };

      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      const leads = JSON.parse(fileContent);
      const saved = leads.find((l: { id: string }) => l.id === body.leadId);

      const hasValidTimestamp = saved && !isNaN(Date.parse(saved.timestamp));
      const hasIdFormat = saved && /^LEAD-\d+-\d+$/.test(saved.id);
      const exactFields = saved &&
                          saved.name === 'Ing. Martin Dvořák' &&
                          saved.phone === '+421 948 555 777' &&
                          saved.email === 'martin.dvorak@example.sk' &&
                          saved.city === 'Vrútky' &&
                          saved.service === 'fotovoltika-dom' &&
                          saved.propertyType === 'rodinny_dom' &&
                          saved.monthlyBill === 160 &&
                          saved.hasBattery === true &&
                          saved.recommendedKwp === 9.8 &&
                          saved.estimatedSavings === 1450 &&
                          saved.netPrice === 7800;

      const pass = resData.statusCode === 200 && hasValidTimestamp && hasIdFormat && exactFields;
      record('ADV-PS-01', 'Persistence Integrity', 'Valid full lead record is persisted to data/leads.json with clean schema and types', pass, pass ? undefined : `Saved: ${JSON.stringify(saved)}`);
    }

    // Test 4.2: Multiple sequential submissions retain array integrity
    {
      const count = 5;
      const leadIds: string[] = [];
      let allOk = true;

      for (let i = 0; i < count; i++) {
        const req = createMockRequest({
          method: 'POST',
          body: {
            name: `Sequential User ${i + 1}`,
            phone: `+42194811100${i}`,
            source: 'sequential_stress_test',
          },
        });
        const { res, getResponse } = createMockResponse();
        await leadHandler(req, res);
        const resp = getResponse();
        const b = resp.body as { leadId?: string };
        if (resp.statusCode !== 200 || !b.leadId) {
          allOk = false;
        } else {
          leadIds.push(b.leadId);
        }
      }

      const fileContent = fs.readFileSync(leadsFilePath, 'utf8');
      const leads = JSON.parse(fileContent);
      const allFound = leadIds.every(id => leads.some((l: { id: string }) => l.id === id));

      const pass = allOk && allFound;
      record('ADV-PS-02', 'Persistence Integrity', '5 sequential rapid lead submissions are 100% retained without data loss', pass, pass ? undefined : `Found: ${allFound}`);
    }

    // =========================================================================
    // GROUP 5: Dynamic Service Preselection & Subpage Wiring
    // =========================================================================

    // Test 5.1: LeadForm SERVICE_OPTIONS enum
    {
      const leadFormCode = readFile('components/LeadForm.tsx');
      const expectedServices = [
        'fotovoltika-dom',
        'fotovoltika-firma',
        'baterie',
        'cerpadlo',
        'elektro',
        'vseobecny-kontakt',
      ];
      const hasAll = expectedServices.every(s => leadFormCode.includes(`value: '${s}'`));
      record('ADV-SP-01', 'Service Preselection', 'LeadForm exports all 6 standardized ServiceType options', hasAll);
    }

    // Test 5.2: Check pages bindings for initialService
    {
      const bindings = [
        { file: 'pages/fotovoltika-pre-domacnosti.tsx', expected: 'fotovoltika-dom' },
        { file: 'pages/fotovoltika-pre-firmy.tsx', expected: 'fotovoltika-firma' },
        { file: 'pages/bateriove-uloziska-bess.tsx', expected: 'baterie' },
        { file: 'pages/tepelne-cerpadla.tsx', expected: 'cerpadlo' },
        { file: 'pages/elektroinstalacie-revizie.tsx', expected: 'elektro' },
      ];

      let allBound = true;
      for (const b of bindings) {
        const fullPath = path.join(ROOT_DIR, b.file);
        const content = fs.readFileSync(fullPath, 'utf8');
        const expectedPattern = `initialService="${b.expected}"`;
        if (!content.includes(expectedPattern)) {
          allBound = false;
          record('ADV-SP-02', 'Service Preselection', `${b.file} embeds LeadForm with initialService="${b.expected}"`, false, `Missing pattern ${expectedPattern}`);
        }
      }
      if (allBound) {
        record('ADV-SP-02', 'Service Preselection', 'All 5 standalone service subpages bind correct initialService to LeadForm', true);
      }
    }

    // Test 5.3: Dedicated /kontakt dynamic query reading
    {
      const kontaktFile = path.join(ROOT_DIR, 'pages/kontakt.tsx');
      const kontaktContent = fs.readFileSync(kontaktFile, 'utf8');
      
      const hasQueryReading = kontaktContent.includes('router.query.service') &&
                              kontaktContent.includes('initialService={queryService}');
      const hasFallback = kontaktContent.includes("'vseobecny-kontakt'");

      const pass = hasQueryReading && hasFallback;
      record('ADV-SP-03', 'Service Preselection', '/kontakt reads router.query.service and defaults to vseobecny-kontakt', pass, pass ? undefined : 'router.query.service reading missing or malformed');
    }

    // Test 5.4: Fallback option in LeadForm when custom service is passed
    {
      const leadFormFile = path.join(ROOT_DIR, 'components/LeadForm.tsx');
      const leadFormContent = fs.readFileSync(leadFormFile, 'utf8');

      const hasFallbackOption = leadFormContent.includes('!SERVICE_OPTIONS.some') &&
                                leadFormContent.includes('<option value={formData.service}>{formData.service}</option>');

      record('ADV-SP-04', 'Service Preselection', 'LeadForm provides dynamic fallback <option> for unlisted query service parameters', hasFallbackOption);
    }

    // Test 5.5: Header links to subpages contain correct href targets
    {
      const headerFile = path.join(ROOT_DIR, 'components/Header.tsx');
      const headerContent = fs.readFileSync(headerFile, 'utf8');

      const expectedLinks = [
        '/fotovoltika-pre-domacnosti',
        '/fotovoltika-pre-firmy',
        '/bateriove-uloziska-bess',
        '/tepelne-cerpadla',
        '/elektroinstalacie-revizie',
        '/kontakt',
      ];

      const allPresent = expectedLinks.every(link => 
        headerContent.includes(`href="${link}"`) || 
        headerContent.includes(`href: '${link}'`) ||
        headerContent.includes(`href: "${link}"`)
      );
      record('ADV-SP-05', 'Navigation Links', 'Header navigation links contain exact routes to all 5 service subpages and /kontakt', allPresent);
    }

  } finally {
    // Restore backup if original existed, or clean up test records
    if (originalLeadsBackup !== null) {
      fs.writeFileSync(leadsFilePath, originalLeadsBackup, 'utf8');
    }
  }

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;

  return {
    total: results.length,
    passed,
    failed,
    results,
  };
}
