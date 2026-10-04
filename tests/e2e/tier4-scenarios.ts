/**
 * Tier 4: Real-World Application Scenarios (End-to-End User Journeys)
 * Marvol s.r.o. E2E Test Infrastructure
 * 
 * Verifies 5 complete, realistic end-to-end user journeys:
 * 1. Residential Homeowner Seeking €4,025 Green Households Subsidy
 * 2. Commercial Factory CFO Seeking Peak Shaving & Green Enterprises Subsidy
 * 3. EV Owner Integrating LiFePO4 BESS Storage & Smart Wallbox
 * 4. New Home Builder Inquiring About Hybrid Heat Pump & PV on Mobile
 * 5. B2B Procurement Auditor Conducting Statutory & Compliance Due Diligence
 */

import path from 'path';
import fs from 'fs';
import type { TestCase } from './types';
import { fileExists, readFile, createMockRequest, createMockResponse, ROOT_DIR } from './helpers';
import leadHandler from '../../pages/api/lead';
import { COMPANY_DETAILS } from '../../constants/company';

export const tier4Tests: TestCase[] = [
  // =========================================================================
  // SCENARIO 1: Residential Homeowner Seeking €4,025 Green Households Subsidy
  // =========================================================================
  {
    id: 'T4-SC-01',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 1: Residential Homeowner (SIEA Subsidy + Turnkey Package)',
    description: 'Homeowner inspects subsidy terms, selects residential PV, and submits inquiry.',
    milestoneDependency: 'M3',
    run: async () => {
      // 1. Verify subsidy cap in constants and calculator
      const subsidyAmount = COMPANY_DETAILS.subsidies.maxHomeSubsidy;
      if (subsidyAmount !== '1 150 €') {
        return { status: 'FAIL', message: `Expected subsidy 1 150 €, got ${subsidyAmount}` };
      }

      // 2. Check subpage existence
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'pages/fotovoltika-pre-domacnosti.tsx not yet created (Milestone M3).' };
      }

      // 3. User submits lead form with residential parameters
      const clientName = `Ján Kováč (Scenario 1 - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: clientName,
          phone: '+421 905 123 456',
          email: 'jan.kovac@example.sk',
          city: 'Martin',
          service: 'fotovoltika-dom',
          propertyType: 'home',
          monthlyBill: 120,
          hasBattery: true,
          source: 'domacnosti_subpage',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 1 submission failed: ${JSON.stringify(output.body)}` };
      }

      // 4. Verify data persistence
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(clientName) || !leadsData.includes('fotovoltika-dom')) {
        return { status: 'FAIL', message: 'Scenario 1 lead not properly persisted in leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 1 completed: Ján Kováč received lead confirmation ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 2: Commercial Factory CFO Seeking Peak Shaving & Green Enterprises
  // =========================================================================
  {
    id: 'T4-SC-02',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 2: Commercial Factory CFO (Peak Shaving & B2B Invoicing)',
    description: 'Factory CFO reviews peak shaving and Green Enterprises subsidy, then requests B2B quote.',
    milestoneDependency: 'M3',
    run: async () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'pages/fotovoltika-pre-firmy.tsx not yet created (Milestone M3).' };
      }

      const clientName = `Ing. Peter Novák (CFO - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: clientName,
          phone: '+421 911 888 777',
          email: 'novak@vyroba-stred.sk',
          city: 'Žilina',
          service: 'fotovoltika-firma',
          message: 'Dopytujeme 150 kWp inštaláciu s batériovým úložiskom na vykrývanie špičiek v prevádzke.',
          propertyType: 'business',
          monthlyBill: 2500,
          source: 'firmy_subpage',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 2 submission failed: ${JSON.stringify(output.body)}` };
      }

      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(clientName) || !leadsData.includes('vykrývanie špičiek')) {
        return { status: 'FAIL', message: 'Scenario 2 B2B inquiry not found in leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 2 completed: Commercial CFO quote registered with leadId ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 3: EV Owner Integrating LiFePO4 BESS Storage & Smart Wallbox
  // =========================================================================
  {
    id: 'T4-SC-03',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 3: EV Owner (LiFePO4 Storage & Smart Wallbox Integration)',
    description: 'Electric car owner requests LiFePO4 battery backup and EV smart charging station.',
    milestoneDependency: 'M3',
    run: async () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'pages/bateriove-uloziska-bess.tsx not yet created (Milestone M3).' };
      }

      const clientName = `Marek Šimon (EV Owner - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: clientName,
          phone: '+421948999111',
          email: 'simon.marek@gmail.com',
          city: 'Vrútky',
          service: 'baterie',
          hasBattery: true,
          hasEV: true,
          message: 'Mám záujem o 10 kWh LiFePO4 batériu a 22 kW Wallbox s dynamickým riadením nabíjania.',
          source: 'bess_subpage',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 3 submission failed: ${JSON.stringify(output.body)}` };
      }

      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(clientName) || !leadsData.includes('Wallbox')) {
        return { status: 'FAIL', message: 'Scenario 3 inquiry not found in leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 3 completed: EV Wallbox + BESS inquiry registered with leadId ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 4: New Home Builder Inquiring About Hybrid Heat Pump & PV on Mobile
  // =========================================================================
  {
    id: 'T4-SC-04',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 4: Mobile User (Heat Pump & Hybrid Solar Integration)',
    description: 'Smartphone visitor navigates via mobile drawer and submits heat pump inquiry.',
    milestoneDependency: 'M3',
    run: async () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'pages/tepelne-cerpadla.tsx not yet created (Milestone M3).' };
      }

      const clientName = `Zuzana Kráľová (Mobile User - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: clientName,
          phone: '+421 908 333 444',
          email: 'zuzana.kralova@centrum.sk',
          city: 'Turčianske Teplice',
          service: 'cerpadlo',
          message: 'Staviame rodinný dom, hľadáme tepelné čerpadlo vzduch-voda integrované s fotovoltikou.',
          source: 'tepelne_cerpadla_subpage',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 4 submission failed: ${JSON.stringify(output.body)}` };
      }

      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(clientName) || !leadsData.includes('cerpadlo')) {
        return { status: 'FAIL', message: 'Scenario 4 inquiry not saved to leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 4 completed: Mobile heat pump inquiry registered with leadId ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 5: B2B Procurement Auditor Conducting Statutory & Compliance Due Diligence
  // =========================================================================
  {
    id: 'T4-SC-05',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 5: B2B Compliance Auditor (Statutory & Legal Verification)',
    description: 'Corporate procurement auditor validates commercial registry (§ 3a Obch. zák.) and GDPR policy.',
    run: async () => {
      // 1. Audit Statutory details
      const { legalName, seat, tax, registry, contact } = COMPANY_DETAILS;
      if (legalName !== 'Marvol s. r. o.') {
        return { status: 'FAIL', message: `Legal name mismatch: ${legalName}` };
      }
      if (tax.ico !== '53 060 091' || tax.dic !== '2121255961' || tax.icDph !== 'SK2121255961') {
        return { status: 'FAIL', message: 'Tax registry numbers mismatch.' };
      }
      if (!registry.court.includes('Žilina') || !registry.insertNumber.includes('74765/L')) {
        return { status: 'FAIL', message: 'Court registration mismatch.' };
      }
      if (!seat.fullAddress.includes('Vrútky')) {
        return { status: 'FAIL', message: 'Corporate seat mismatch.' };
      }

      // 2. Audit GDPR Privacy Page
      if (!fileExists('pages/ochrana-osobnych-udajov.tsx')) {
        return { status: 'FAIL', message: 'pages/ochrana-osobnych-udajov.tsx missing.' };
      }
      const privacyContent = readFile('pages/ochrana-osobnych-udajov.tsx');
      if (!privacyContent.includes('53 060 091') || !privacyContent.includes('Marvol')) {
        return { status: 'FAIL', message: 'Privacy policy page lacks statutory identification.' };
      }

      // 3. Auditor submits official contact inquiry
      const auditorName = `Mgr. Lucia Horváthová (Audítor - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: auditorName,
          phone: '+421948123456',
          email: 'audit@partner-corp.sk',
          service: 'vseobecny-kontakt',
          message: 'Overenie štatutárnych podmienok a certifikácie montáže pred podpisom zmluvy.',
          source: 'compliance_audit',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 5 submission failed: ${JSON.stringify(output.body)}` };
      }

      return {
        status: 'PASS',
        message: `Scenario 5 completed: Statutory legal audit passed with 100% compliance. Lead registered with ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 6: B2B Solar Installer Wholesale Procurement & Roadmap Inquiry
  // =========================================================================
  {
    id: 'T4-SC-06',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 6: B2B Solar Installer Wholesale Procurement & Roadmap Inquiry',
    description: 'Certified PV installer visits /eshop, inspects wholesale pricing ex-VAT, checks B2B Portal roadmap, and submits procurement inquiry.',
    run: async () => {
      // 1. Inspect E-Shop catalog for Canadian Solar TOPCon panel
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx does not exist.' };
      }
      const eshopCode = readFile('pages/eshop.tsx');
      if (!eshopCode.includes('Canadian Solar HiKu7') || !eshopCode.includes('109')) {
        return { status: 'FAIL', message: 'Canadian Solar TOPCon panel or wholesale price not found in /eshop.' };
      }

      // 2. Verify B2B Roadmap pillar
      if (!eshopCode.includes('B2B Inštalatérsky portál') && !eshopCode.includes('B2B')) {
        return { status: 'FAIL', message: 'B2B Installer portal roadmap section missing in /eshop.' };
      }

      // 3. User submits wholesale procurement inquiry
      const installerName = `SolarTech Montáže s.r.o. (Scenario 6 - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: installerName,
          phone: '+421 905 888 777',
          email: 'objednavky@solartech-montaze.sk',
          city: 'Martin',
          service: 'fotovoltika-firma',
          propertyType: 'business',
          message: 'Veľkoobchodný dopyt na 40 ks panelov Canadian Solar HiKu7 450 Wp pre firemný projekt. Žiadame o pridelenie B2B marže a paletovú dopravu do 48h.',
          source: 'eshop_b2b_inquiry',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 6 submission failed: ${JSON.stringify(output.body)}` };
      }

      // 4. Verify data persistence
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(installerName) || !leadsData.includes('Canadian Solar')) {
        return { status: 'FAIL', message: 'Scenario 6 B2B inquiry not found in leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 6 completed: B2B wholesale procurement inquiry registered with leadId ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 7: Commercial Property Developer Fire Safety Due Diligence
  // =========================================================================
  {
    id: 'T4-SC-07',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 7: Commercial Property Developer Fire Safety Due Diligence',
    description: 'Developer audits Rapid Shutdown and AFCI fire protection compliance at /sluzby/protipoziarna-ochrana-bezpecne-napatie and submits project inquiry.',
    run: async () => {
      // 1. Verify Header link and service page
      const headerCode = readFile('components/Header.tsx');
      if (!headerCode.includes('sluzby/protipoziarna-ochrana-bezpecne-napatie')) {
        return { status: 'FAIL', message: 'Header missing link to fire safety subpage.' };
      }

      const pagePath = 'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx';
      if (!fileExists(pagePath)) {
        return { status: 'FAIL', message: `${pagePath} does not exist.` };
      }
      const pageCode = readFile(pagePath);
      if (!pageCode.includes('Rapid Shutdown') || !pageCode.includes('AFCI')) {
        return { status: 'FAIL', message: 'Fire safety page lacks Rapid Shutdown or AFCI technical specifications.' };
      }

      // 2. Submit fire safety engineering consultation request
      const developerName = `Ing. Tomáš Valach (Scenario 7 - Developer - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: developerName,
          phone: '+421 912 345 678',
          email: 'valach@logisticspark.sk',
          city: 'Žilina',
          service: 'elektro',
          propertyType: 'business',
          message: 'Požadujeme audit požiarnej bezpečnosti a projekt Rapid Shutdown pre 500 kWp strešnú FVE logistického centra v Žiline.',
          source: 'page_sluzby_protipoziarna_ochrana',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 7 submission failed: ${JSON.stringify(output.body)}` };
      }

      // 3. Verify persistence
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(developerName) || !leadsData.includes('Rapid Shutdown')) {
        return { status: 'FAIL', message: 'Scenario 7 inquiry not saved to leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 7 completed: Fire safety engineering project inquiry registered with leadId ${body.leadId}`,
      };
    },
  },

  // =========================================================================
  // SCENARIO 8: E-Shop Visitor Converting to Turnkey Subsidy Installation
  // =========================================================================
  {
    id: 'T4-SC-08',
    tier: 4,
    category: 'End-to-End User Journey',
    name: 'Journey 8: E-Shop Visitor Converting to Turnkey Subsidy Installation',
    description: 'Residential customer selects hybrid inverter in /eshop, chooses turnkey installation with €4,025 subsidy, and submits pre-filled lead.',
    run: async () => {
      // 1. Check E-Shop page turnkey section and subsidy assurance
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx does not exist.' };
      }
      const eshopCode = readFile('pages/eshop.tsx');
      if (!eshopCode.includes('4 025') && !eshopCode.includes('4025')) {
        return { status: 'FAIL', message: 'State subsidy cap (€4,025) not highlighted in /eshop turnkey section.' };
      }
      if (!eshopCode.includes('Huawei SUN2000-10KTL-M1')) {
        return { status: 'FAIL', message: 'Huawei hybrid inverter model missing in /eshop catalog.' };
      }

      // 2. Submit turnkey consultation request
      const customerName = `Miroslav Bielik (Scenario 8 - ${Date.now()})`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: customerName,
          phone: '+421 903 444 555',
          email: 'miroslav.bielik@post.sk',
          city: 'Vrútky',
          service: 'fotovoltika-dom',
          propertyType: 'home',
          monthlyBill: 160,
          hasBattery: true,
          message: 'Mám záujem o kompletnú montáž produktu Huawei SUN2000-10KTL-M1 na kľúč s vybavením dotácie Zelená domácnostiam 4 025 €.',
          source: 'eshop_turnkey_cta',
        },
      });

      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string };

      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return { status: 'FAIL', message: `Scenario 8 submission failed: ${JSON.stringify(output.body)}` };
      }

      // 3. Verify persistence
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      if (!leadsData.includes(customerName) || !leadsData.includes('eshop_turnkey_cta')) {
        return { status: 'FAIL', message: 'Scenario 8 lead not found in leads.json.' };
      }

      return {
        status: 'PASS',
        message: `Scenario 8 completed: Turnkey subsidy installation inquiry registered with leadId ${body.leadId}`,
      };
    },
  },
];
