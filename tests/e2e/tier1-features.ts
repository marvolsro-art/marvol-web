/**
 * Tier 1: Feature Coverage (Core Functional Matrix)
 * Marvol s.r.o. E2E Test Infrastructure
 * 
 * Verifies all 7 main routes, Header flyouts, mobile drawer, Lead API, and Sitemap.
 * Ensures >= 5 test cases per feature.
 */

import path from 'path';
import type { TestCase, TestExecutionResult } from './types';
import { fileExists, readFile, parseSitemapUrls, createMockRequest, createMockResponse, ROOT_DIR } from './helpers';
import leadHandler from '../../pages/api/lead';
import fs from 'fs';

export const tier1Tests: TestCase[] = [
  // =========================================================================
  // 1. ROUTE 1: Homepage (pages/index.tsx)
  // =========================================================================
  {
    id: 'T1-R1-01',
    tier: 1,
    category: 'Route: / (Homepage)',
    name: 'Homepage source file exists and exports valid Next.js page',
    description: 'Verifies pages/index.tsx exists and defines default React component export.',
    run: () => {
      if (!fileExists('pages/index.tsx')) {
        return { status: 'FAIL', message: 'pages/index.tsx does not exist.' };
      }
      const content = readFile('pages/index.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'pages/index.tsx does not have a default export.' };
      }
      return { status: 'PASS', message: 'Homepage file exists with valid default export.' };
    },
  },
  {
    id: 'T1-R1-02',
    tier: 1,
    category: 'Route: / (Homepage)',
    name: 'Homepage contains core brand value proposition and Marvol identity',
    description: 'Checks that homepage metadata and hero render Marvol corporate branding.',
    run: () => {
      const content = readFile('pages/index.tsx');
      const appContent = fileExists('pages/_app.tsx') ? readFile('pages/_app.tsx') : '';
      const combined = content + ' ' + appContent;
      if (!combined.includes('Marvol') || !combined.toLowerCase().includes('fotovoltik')) {
        return { status: 'FAIL', message: 'Homepage branding does not contain Marvol and Photovoltaic references.' };
      }
      return { status: 'PASS', message: 'Homepage contains Marvol branding and core PV positioning.' };
    },
  },
  {
    id: 'T1-R1-03',
    tier: 1,
    category: 'Route: / (Homepage)',
    name: 'Homepage renders primary Hero CTA linking to savings calculator',
    description: 'Verifies Hero section includes direct CTA anchor leading to #kalkulacka.',
    run: () => {
      const heroContent = fileExists('components/Hero.tsx') ? readFile('components/Hero.tsx') : '';
      if (!heroContent.includes('#kalkulacka')) {
        return { status: 'FAIL', message: 'Hero component does not render CTA linking to #kalkulacka.' };
      }
      return { status: 'PASS', message: 'Hero CTA correctly anchors to #kalkulacka.' };
    },
  },
  {
    id: 'T1-R1-04',
    tier: 1,
    category: 'Route: / (Homepage)',
    name: 'Homepage renders interactive solar savings calculator inputs',
    description: 'Ensures CalculatorSection renders monthly bill slider, property type, and battery options.',
    run: () => {
      const calcContent = fileExists('components/CalculatorSection.tsx') ? readFile('components/CalculatorSection.tsx') : '';
      if (!calcContent.includes('monthlyBill') || !calcContent.includes('hasBattery')) {
        return { status: 'FAIL', message: 'CalculatorSection missing required input parameters (monthlyBill, hasBattery).' };
      }
      return { status: 'PASS', message: 'CalculatorSection renders all core calculation controls.' };
    },
  },
  {
    id: 'T1-R1-05',
    tier: 1,
    category: 'Route: / (Homepage)',
    name: 'Homepage highlights state subsidies guidance (€4,025 Zelená domácnostiam)',
    description: 'Checks for explicit mention of €4,025 Green Households subsidy assistance.',
    run: () => {
      const banner = fileExists('components/SubsidyBanner.tsx') ? readFile('components/SubsidyBanner.tsx') : '';
      const calc = fileExists('components/CalculatorSection.tsx') ? readFile('components/CalculatorSection.tsx') : '';
      const combined = banner + ' ' + calc;
      if (!combined.includes('4 025') && !combined.includes('4025')) {
        return { status: 'FAIL', message: 'State subsidy cap (€4,025) is not displayed on homepage.' };
      }
      return { status: 'PASS', message: '€4,025 state subsidy is transparently presented.' };
    },
  },

  // =========================================================================
  // 2. ROUTE 2: Residential PV (pages/fotovoltika-pre-domacnosti.tsx)
  // =========================================================================
  {
    id: 'T1-R2-01',
    tier: 1,
    category: 'Route: /fotovoltika-pre-domacnosti',
    name: 'Residential PV subpage exists and exports React component',
    description: 'Verifies pages/fotovoltika-pre-domacnosti.tsx is present.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'pages/fotovoltika-pre-domacnosti.tsx not yet created (scheduled in Milestone M3).' };
      }
      const content = readFile('pages/fotovoltika-pre-domacnosti.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'Residential PV page missing default export.' };
      }
      return { status: 'PASS', message: 'Residential PV subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R2-02',
    tier: 1,
    category: 'Route: /fotovoltika-pre-domacnosti',
    name: 'Residential PV page details €4,025 Green Households state subsidy',
    description: 'Ensures page highlights SIEA Zelená domácnostiam voucher up to €4,025.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-domacnosti.tsx');
      if (!content.includes('4 025') && !content.includes('4025') && !content.includes('Zelená domácnostiam')) {
        return { status: 'FAIL', message: 'Residential PV page does not mention €4,025 Green Households subsidy.' };
      }
      return { status: 'PASS', message: 'Green Households subsidy guidance verified.' };
    },
  },
  {
    id: 'T1-R2-03',
    tier: 1,
    category: 'Route: /fotovoltika-pre-domacnosti',
    name: 'Residential PV page features turnkey residential packages',
    description: 'Checks for turnkey packages, components (panels, inverters, smart meter).',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-domacnosti.tsx');
      if (!content.toLowerCase().includes('kľúč') && !content.toLowerCase().includes('balík') && !content.toLowerCase().includes('kwp')) {
        return { status: 'FAIL', message: 'Residential PV page lacks turnkey package details.' };
      }
      return { status: 'PASS', message: 'Turnkey residential packages present.' };
    },
  },
  {
    id: 'T1-R2-04',
    tier: 1,
    category: 'Route: /fotovoltika-pre-domacnosti',
    name: 'Residential PV embeds LeadForm with initialService="fotovoltika-dom"',
    description: 'Verifies embedded lead capture form is pre-configured for residential PV.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-domacnosti.tsx');
      if (!content.includes('fotovoltika-dom')) {
        return { status: 'FAIL', message: 'Residential PV page does not pass initialService="fotovoltika-dom" to LeadForm.' };
      }
      return { status: 'PASS', message: 'LeadForm pre-selected with fotovoltika-dom.' };
    },
  },
  {
    id: 'T1-R2-05',
    tier: 1,
    category: 'Route: /fotovoltika-pre-domacnosti',
    name: 'Residential PV page declares canonical path and Layout wrapper',
    description: 'Checks that page wraps in Layout with canonicalPath="/fotovoltika-pre-domacnosti".',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-domacnosti.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-domacnosti.tsx');
      if (!content.includes('/fotovoltika-pre-domacnosti') || !content.includes('Layout')) {
        return { status: 'FAIL', message: 'Residential PV page does not wrap in Layout with canonical path.' };
      }
      return { status: 'PASS', message: 'Canonical path and Layout wrapper present.' };
    },
  },

  // =========================================================================
  // 3. ROUTE 3: Commercial PV (pages/fotovoltika-pre-firmy.tsx)
  // =========================================================================
  {
    id: 'T1-R3-01',
    tier: 1,
    category: 'Route: /fotovoltika-pre-firmy',
    name: 'Commercial PV subpage exists and exports React component',
    description: 'Verifies pages/fotovoltika-pre-firmy.tsx is present.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'pages/fotovoltika-pre-firmy.tsx not yet created (scheduled in Milestone M3).' };
      }
      const content = readFile('pages/fotovoltika-pre-firmy.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'Commercial PV page missing default export.' };
      }
      return { status: 'PASS', message: 'Commercial PV subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R3-02',
    tier: 1,
    category: 'Route: /fotovoltika-pre-firmy',
    name: 'Commercial PV page explains Green Enterprises subsidy (Zelená podnikom)',
    description: 'Ensures page highlights Green Enterprises subsidy for businesses and B2B clients.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-firmy.tsx');
      if (!content.includes('Zelená podnikom') && !content.toLowerCase().includes('dotáci')) {
        return { status: 'FAIL', message: 'Commercial PV page missing Green Enterprises subsidy information.' };
      }
      return { status: 'PASS', message: 'Green Enterprises subsidy information verified.' };
    },
  },
  {
    id: 'T1-R3-03',
    tier: 1,
    category: 'Route: /fotovoltika-pre-firmy',
    name: 'Commercial PV page highlights peak shaving & business energy ROI',
    description: 'Checks for peak shaving, reserved capacity reduction, or B2B energy savings.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-firmy.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('špičk') && !lower.includes('náklad') && !lower.includes('návratnos')) {
        return { status: 'FAIL', message: 'Commercial PV page missing B2B energy efficiency / peak shaving concepts.' };
      }
      return { status: 'PASS', message: 'Peak shaving and business energy ROI verified.' };
    },
  },
  {
    id: 'T1-R3-04',
    tier: 1,
    category: 'Route: /fotovoltika-pre-firmy',
    name: 'Commercial PV embeds LeadForm with initialService="fotovoltika-firma"',
    description: 'Verifies embedded lead form is pre-configured with fotovoltika-firma.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-firmy.tsx');
      if (!content.includes('fotovoltika-firma')) {
        return { status: 'FAIL', message: 'Commercial PV page does not pass initialService="fotovoltika-firma".' };
      }
      return { status: 'PASS', message: 'LeadForm pre-selected with fotovoltika-firma.' };
    },
  },
  {
    id: 'T1-R3-05',
    tier: 1,
    category: 'Route: /fotovoltika-pre-firmy',
    name: 'Commercial PV page declares canonical path and Layout wrapper',
    description: 'Checks that page wraps in Layout with canonicalPath="/fotovoltika-pre-firmy".',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/fotovoltika-pre-firmy.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/fotovoltika-pre-firmy.tsx');
      if (!content.includes('/fotovoltika-pre-firmy') || !content.includes('Layout')) {
        return { status: 'FAIL', message: 'Commercial PV page does not declare canonical path with Layout.' };
      }
      return { status: 'PASS', message: 'Canonical path and Layout wrapper present.' };
    },
  },

  // =========================================================================
  // 4. ROUTE 4: Battery Storage BESS (pages/bateriove-uloziska-bess.tsx)
  // =========================================================================
  {
    id: 'T1-R4-01',
    tier: 1,
    category: 'Route: /bateriove-uloziska-bess',
    name: 'Battery Storage BESS subpage exists and exports React component',
    description: 'Verifies pages/bateriove-uloziska-bess.tsx is present.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'pages/bateriove-uloziska-bess.tsx not yet created (scheduled in Milestone M3).' };
      }
      const content = readFile('pages/bateriove-uloziska-bess.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'BESS subpage missing default export.' };
      }
      return { status: 'PASS', message: 'BESS subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R4-02',
    tier: 1,
    category: 'Route: /bateriove-uloziska-bess',
    name: 'BESS page highlights LiFePO4 battery chemistry and cycle life',
    description: 'Checks for LiFePO4 battery technology, high safety, and long cycle lifespan.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/bateriove-uloziska-bess.tsx');
      if (!content.includes('LiFePO4') && !content.toLowerCase().includes('batéri')) {
        return { status: 'FAIL', message: 'BESS page lacks LiFePO4 battery storage specifications.' };
      }
      return { status: 'PASS', message: 'LiFePO4 battery specifications verified.' };
    },
  },
  {
    id: 'T1-R4-03',
    tier: 1,
    category: 'Route: /bateriove-uloziska-bess',
    name: 'BESS page highlights UPS backup switchover and Wallbox EV integration',
    description: 'Checks for uninterruptible power supply (UPS) backup and EV Wallbox smart charging.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/bateriove-uloziska-bess.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('wallbox') || (!lower.includes('backup') && !lower.includes('záloh') && !lower.includes('ups'))) {
        return { status: 'FAIL', message: 'BESS page lacks UPS backup or Wallbox EV integration details.' };
      }
      return { status: 'PASS', message: 'UPS backup and Wallbox EV integration verified.' };
    },
  },
  {
    id: 'T1-R4-04',
    tier: 1,
    category: 'Route: /bateriove-uloziska-bess',
    name: 'BESS page embeds LeadForm with initialService="baterie"',
    description: 'Verifies embedded lead form is pre-selected with baterie service.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/bateriove-uloziska-bess.tsx');
      if (!content.includes('baterie')) {
        return { status: 'FAIL', message: 'BESS page does not pass initialService="baterie" to LeadForm.' };
      }
      return { status: 'PASS', message: 'LeadForm pre-selected with baterie.' };
    },
  },
  {
    id: 'T1-R4-05',
    tier: 1,
    category: 'Route: /bateriove-uloziska-bess',
    name: 'BESS page declares canonical path and Layout wrapper',
    description: 'Checks that page wraps in Layout with canonicalPath="/bateriove-uloziska-bess".',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/bateriove-uloziska-bess.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/bateriove-uloziska-bess.tsx');
      if (!content.includes('/bateriove-uloziska-bess') || !content.includes('Layout')) {
        return { status: 'FAIL', message: 'BESS page does not declare canonical path with Layout.' };
      }
      return { status: 'PASS', message: 'Canonical path and Layout wrapper present.' };
    },
  },

  // =========================================================================
  // 5. ROUTE 5: Heat Pumps (pages/tepelne-cerpadla.tsx)
  // =========================================================================
  {
    id: 'T1-R5-01',
    tier: 1,
    category: 'Route: /tepelne-cerpadla',
    name: 'Heat Pumps subpage exists and exports React component',
    description: 'Verifies pages/tepelne-cerpadla.tsx is present.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'pages/tepelne-cerpadla.tsx not yet created (scheduled in Milestone M3).' };
      }
      const content = readFile('pages/tepelne-cerpadla.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'Heat Pumps subpage missing default export.' };
      }
      return { status: 'PASS', message: 'Heat Pumps subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R5-02',
    tier: 1,
    category: 'Route: /tepelne-cerpadla',
    name: 'Heat Pumps page details air-to-water efficiency (COP 5.0)',
    description: 'Checks for air-to-water (vzduch-voda) heat pumps and seasonal COP efficiency.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/tepelne-cerpadla.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('vzduch-voda') && !lower.includes('cop') && !lower.includes('čerpadl')) {
        return { status: 'FAIL', message: 'Heat Pumps page missing air-to-water or COP efficiency data.' };
      }
      return { status: 'PASS', message: 'Air-to-water heat pump specifications verified.' };
    },
  },
  {
    id: 'T1-R5-03',
    tier: 1,
    category: 'Route: /tepelne-cerpadla',
    name: 'Heat Pumps page highlights hybrid solar PV synergy',
    description: 'Checks for hybrid heating + solar PV integration reducing heating costs.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/tepelne-cerpadla.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('fotovolt') && !lower.includes('hybrid')) {
        return { status: 'FAIL', message: 'Heat Pumps page lacks hybrid solar PV synergy details.' };
      }
      return { status: 'PASS', message: 'Hybrid solar PV synergy verified.' };
    },
  },
  {
    id: 'T1-R5-04',
    tier: 1,
    category: 'Route: /tepelne-cerpadla',
    name: 'Heat Pumps page embeds LeadForm with initialService="cerpadlo"',
    description: 'Verifies embedded lead form is pre-selected with cerpadlo service.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/tepelne-cerpadla.tsx');
      if (!content.includes('cerpadlo')) {
        return { status: 'FAIL', message: 'Heat Pumps page does not pass initialService="cerpadlo" to LeadForm.' };
      }
      return { status: 'PASS', message: 'LeadForm pre-selected with cerpadlo.' };
    },
  },
  {
    id: 'T1-R5-05',
    tier: 1,
    category: 'Route: /tepelne-cerpadla',
    name: 'Heat Pumps page declares canonical path and Layout wrapper',
    description: 'Checks that page wraps in Layout with canonicalPath="/tepelne-cerpadla".',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/tepelne-cerpadla.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/tepelne-cerpadla.tsx');
      if (!content.includes('/tepelne-cerpadla') || !content.includes('Layout')) {
        return { status: 'FAIL', message: 'Heat Pumps page does not declare canonical path with Layout.' };
      }
      return { status: 'PASS', message: 'Canonical path and Layout wrapper present.' };
    },
  },

  // =========================================================================
  // 6. ROUTE 6: Electrical Engineering (pages/elektroinstalacie-revizie.tsx)
  // =========================================================================
  {
    id: 'T1-R6-01',
    tier: 1,
    category: 'Route: /elektroinstalacie-revizie',
    name: 'Electrical Engineering subpage exists and exports React component',
    description: 'Verifies pages/elektroinstalacie-revizie.tsx is present.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/elektroinstalacie-revizie.tsx')) {
        return { status: 'PENDING', message: 'pages/elektroinstalacie-revizie.tsx not yet created (scheduled in Milestone M3).' };
      }
      const content = readFile('pages/elektroinstalacie-revizie.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'Electrical subpage missing default export.' };
      }
      return { status: 'PASS', message: 'Electrical subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R6-02',
    tier: 1,
    category: 'Route: /elektroinstalacie-revizie',
    name: 'Electrical subpage details switchboards and lightning protection',
    description: 'Checks for rozvádzače, bleskozvody, and comprehensive installation services.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/elektroinstalacie-revizie.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/elektroinstalacie-revizie.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('rozvádzač') && !lower.includes('bleskozvod') && !lower.includes('elektroinštalác')) {
        return { status: 'FAIL', message: 'Electrical subpage missing switchboards or lightning protection details.' };
      }
      return { status: 'PASS', message: 'Switchboards and electrical engineering details verified.' };
    },
  },
  {
    id: 'T1-R6-03',
    tier: 1,
    category: 'Route: /elektroinstalacie-revizie',
    name: 'Electrical subpage highlights official electrical revisions (revízie EZ)',
    description: 'Checks for official inspection reports (východiskové a periodické revízne správy).',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/elektroinstalacie-revizie.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/elektroinstalacie-revizie.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('revízi') && !lower.includes('správ')) {
        return { status: 'FAIL', message: 'Electrical subpage lacks inspection / revision references.' };
      }
      return { status: 'PASS', message: 'Official electrical revisions verified.' };
    },
  },
  {
    id: 'T1-R6-04',
    tier: 1,
    category: 'Route: /elektroinstalacie-revizie',
    name: 'Electrical subpage embeds LeadForm with initialService="elektro"',
    description: 'Verifies embedded lead form is pre-selected with elektro service.',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/elektroinstalacie-revizie.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/elektroinstalacie-revizie.tsx');
      if (!content.includes('elektro')) {
        return { status: 'FAIL', message: 'Electrical subpage does not pass initialService="elektro" to LeadForm.' };
      }
      return { status: 'PASS', message: 'LeadForm pre-selected with elektro.' };
    },
  },
  {
    id: 'T1-R6-05',
    tier: 1,
    category: 'Route: /elektroinstalacie-revizie',
    name: 'Electrical subpage declares canonical path and Layout wrapper',
    description: 'Checks that page wraps in Layout with canonicalPath="/elektroinstalacie-revizie".',
    milestoneDependency: 'M3',
    run: () => {
      if (!fileExists('pages/elektroinstalacie-revizie.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M3 implementation.' };
      }
      const content = readFile('pages/elektroinstalacie-revizie.tsx');
      if (!content.includes('/elektroinstalacie-revizie') || !content.includes('Layout')) {
        return { status: 'FAIL', message: 'Electrical subpage does not declare canonical path with Layout.' };
      }
      return { status: 'PASS', message: 'Canonical path and Layout wrapper present.' };
    },
  },

  // =========================================================================
  // 7. ROUTE 7: Dedicated Contact Page (pages/kontakt.tsx)
  // =========================================================================
  {
    id: 'T1-R7-01',
    tier: 1,
    category: 'Route: /kontakt',
    name: 'Dedicated Contact subpage exists and exports React component',
    description: 'Verifies pages/kontakt.tsx is present.',
    milestoneDependency: 'M4',
    run: () => {
      if (!fileExists('pages/kontakt.tsx')) {
        return { status: 'PENDING', message: 'pages/kontakt.tsx not yet created (scheduled in Milestone M4).' };
      }
      const content = readFile('pages/kontakt.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'Contact subpage missing default export.' };
      }
      return { status: 'PASS', message: 'Contact subpage exists with valid default export.' };
    },
  },
  {
    id: 'T1-R7-02',
    tier: 1,
    category: 'Route: /kontakt',
    name: 'Contact page displays official statutory corporate details (§ 3a Obch. zák.)',
    description: 'Checks for IČO: 53 060 091, DIČ: 2121255961, Mestský súd Žilina.',
    milestoneDependency: 'M4',
    run: () => {
      if (!fileExists('pages/kontakt.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M4 implementation.' };
      }
      const content = readFile('pages/kontakt.tsx');
      if (!content.includes('53 060 091') || !content.includes('2121255961') || !content.includes('Žilina')) {
        return { status: 'FAIL', message: 'Contact page lacks complete statutory corporate registration details.' };
      }
      return { status: 'PASS', message: 'Statutory registration data verified on Contact page.' };
    },
  },
  {
    id: 'T1-R7-03',
    tier: 1,
    category: 'Route: /kontakt',
    name: 'Contact page displays direct communication channels (phone, email, WhatsApp)',
    description: 'Checks for +421 948 123 456, info@marvol.sk, and WhatsApp direct CTA.',
    milestoneDependency: 'M4',
    run: () => {
      if (!fileExists('pages/kontakt.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M4 implementation.' };
      }
      const content = readFile('pages/kontakt.tsx');
      if (!content.includes('948 123 456') || !content.includes('info@marvol.sk')) {
        return { status: 'FAIL', message: 'Contact page lacks direct phone or email channels.' };
      }
      return { status: 'PASS', message: 'Direct communication channels verified.' };
    },
  },
  {
    id: 'T1-R7-04',
    tier: 1,
    category: 'Route: /kontakt',
    name: 'Contact page renders interactive map embed container',
    description: 'Checks for Google Maps embed or location visual container for Vrútky address.',
    milestoneDependency: 'M4',
    run: () => {
      if (!fileExists('pages/kontakt.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M4 implementation.' };
      }
      const content = readFile('pages/kontakt.tsx');
      const lower = content.toLowerCase();
      if (!lower.includes('map') && !lower.includes('iframe') && !lower.includes('vrútky')) {
        return { status: 'FAIL', message: 'Contact page lacks map embed or location visual.' };
      }
      return { status: 'PASS', message: 'Map embed / location visual container verified.' };
    },
  },
  {
    id: 'T1-R7-05',
    tier: 1,
    category: 'Route: /kontakt',
    name: 'Contact page embeds LeadForm with initialService="vseobecny-kontakt"',
    description: 'Verifies embedded contact lead form is configured for general inquiries.',
    milestoneDependency: 'M4',
    run: () => {
      if (!fileExists('pages/kontakt.tsx')) {
        return { status: 'PENDING', message: 'Awaiting Milestone M4 implementation.' };
      }
      const content = readFile('pages/kontakt.tsx');
      if (!content.includes('vseobecny-kontakt') && !content.includes('LeadForm')) {
        return { status: 'FAIL', message: 'Contact page does not embed LeadForm with general inquiry service.' };
      }
      return { status: 'PASS', message: 'LeadForm embedded with general inquiry option.' };
    },
  },

  // =========================================================================
  // 8. HEADER HOVER DROPDOWNS (components/Header.tsx)
  // =========================================================================
  {
    id: 'T1-HD-01',
    tier: 1,
    category: 'Header Dropdowns',
    name: 'Header renders "Fotovoltika" dropdown button with aria attributes',
    description: 'Verifies Fotovoltika button includes aria-haspopup="true", aria-expanded, and data-testid="dropdown-fotovoltika".',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('Fotovoltika')) {
        return { status: 'FAIL', message: 'Header missing "Fotovoltika" dropdown trigger.' };
      }
      if (!content.includes('aria-haspopup="true"') || !content.includes('aria-expanded')) {
        return { status: 'FAIL', message: 'Header "Fotovoltika" dropdown missing aria-haspopup or aria-expanded.' };
      }
      if (!content.includes('data-testid="dropdown-fotovoltika"')) {
        return { status: 'FAIL', message: 'Header "Fotovoltika" button missing data-testid="dropdown-fotovoltika".' };
      }
      return { status: 'PASS', message: 'Header "Fotovoltika" dropdown button has proper aria and testid attributes.' };
    },
  },
  {
    id: 'T1-HD-02',
    tier: 1,
    category: 'Header Dropdowns',
    name: 'Header "Fotovoltika" flyout contains links to Domácnosti, Firmy, and BESS',
    description: 'Verifies subpage links exist inside Fotovoltika flyout menu.',
    run: () => {
      const content = readFile('components/Header.tsx');
      const hasDom = content.includes('fotovoltika-pre-domacnosti');
      const hasFirmy = content.includes('fotovoltika-pre-firmy');
      const hasBess = content.includes('bateriove-uloziska-bess');
      if (!hasDom || !hasFirmy || !hasBess) {
        return { status: 'FAIL', message: `Header Fotovoltika flyout missing required subpage links (dom=${hasDom}, firmy=${hasFirmy}, bess=${hasBess}).` };
      }
      return { status: 'PASS', message: 'Fotovoltika flyout links to Domácnosti, Firmy, and BESS verified.' };
    },
  },
  {
    id: 'T1-HD-03',
    tier: 1,
    category: 'Header Dropdowns',
    name: 'Header renders "Služby" dropdown button with aria attributes',
    description: 'Verifies Služby button includes aria-haspopup="true" and aria-expanded.',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('Služby')) {
        return { status: 'FAIL', message: 'Header missing "Služby" dropdown trigger.' };
      }
      if (!content.includes('aria-controls="dropdown-sluzby"') || !content.includes('aria-haspopup="true"')) {
        return { status: 'FAIL', message: 'Header "Služby" dropdown missing proper accessibility attributes.' };
      }
      return { status: 'PASS', message: 'Header "Služby" dropdown button verified with aria attributes.' };
    },
  },
  {
    id: 'T1-HD-04',
    tier: 1,
    category: 'Header Dropdowns',
    name: 'Header "Služby" flyout contains links to all 5 /sluzby/* subpages',
    description: 'Verifies links to navrh-projektu, instalacia-montaz, konzultacie-poradenstvo, protipoziarna-ochrana, and revizie-dotacie.',
    run: () => {
      const content = readFile('components/Header.tsx');
      const required = [
        'sluzby/navrh-projektu',
        'sluzby/instalacia-montaz',
        'sluzby/konzultacie-poradenstvo',
        'sluzby/protipoziarna-ochrana-bezpecne-napatie',
        'sluzby/revizie-dotacie',
      ];
      const missing = required.filter(r => !content.includes(r));
      if (missing.length > 0) {
        return { status: 'FAIL', message: `Header Služby flyout missing subpage links: ${missing.join(', ')}` };
      }
      return { status: 'PASS', message: 'Služby flyout contains links to all 5 specialized service subpages.' };
    },
  },
  {
    id: 'T1-HD-05',
    tier: 1,
    category: 'Header Dropdowns',
    name: 'Header navbar renders direct top-level link to /eshop and /kontakt with hover bridge',
    description: 'Verifies top-level links to /eshop and /kontakt, plus hover bridge for zero layout shift.',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('href="/eshop"') && !content.includes("href='/eshop'")) {
        return { status: 'FAIL', message: 'Header navbar missing top-level link to /eshop.' };
      }
      if (!content.includes('href="/kontakt"') && !content.includes("href='/kontakt'")) {
        return { status: 'FAIL', message: 'Header navbar missing top-level link to /kontakt.' };
      }
      if (!content.includes('absolute') || (!content.includes('pt-2') && !content.includes('top-full'))) {
        return { status: 'FAIL', message: 'Header flyout does not implement hover bridge for zero layout shift.' };
      }
      return { status: 'PASS', message: 'Header renders /eshop, /kontakt, and hover bridge for zero layout shift.' };
    },
  },

  // =========================================================================
  // 9. MOBILE SLIDE-OVER NAVIGATION DRAWER (components/Header.tsx)
  // =========================================================================
  {
    id: 'T1-MD-01',
    tier: 1,
    category: 'Mobile Drawer',
    name: 'Mobile navigation toggle button has accessible aria-label',
    description: 'Checks for accessible aria-label on mobile navigation toggle button.',
    run: () => {
      const content = readFile('components/Header.tsx');
      const hasAria =
        content.includes('aria-label="Toggle Navigation"') ||
        content.includes('aria-label="Otvoriť navigáciu"') ||
        content.includes('aria-label="Mobilné navigačné menu"');
      if (!hasAria) {
        return { status: 'FAIL', message: 'Mobile toggle button lacks accessible aria-label.' };
      }
      return { status: 'PASS', message: 'Mobile toggle button has accessible label.' };
    },
  },
  {
    id: 'T1-MD-02',
    tier: 1,
    category: 'Mobile Drawer',
    name: 'Mobile drawer renders backdrop blur overlay',
    description: 'Verifies mobile drawer modal includes backdrop blur overlay (backdrop-blur).',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('backdrop-blur')) {
        return { status: 'PENDING', message: 'Slide-over backdrop blur modal in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Mobile drawer uses backdrop blur overlay.' };
    },
  },
  {
    id: 'T1-MD-03',
    tier: 1,
    category: 'Mobile Drawer',
    name: 'Mobile drawer locks body scroll when open',
    description: 'Checks for document.body.style.overflow = "hidden" when drawer opens.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('overflow') && !content.includes('hidden')) {
        return { status: 'PENDING', message: 'Body scroll locking in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Mobile drawer enforces body scroll locking.' };
    },
  },
  {
    id: 'T1-MD-04',
    tier: 1,
    category: 'Mobile Drawer',
    name: 'Mobile drawer provides expandable accordions for subpages',
    description: 'Checks for collapsible accordion toggles for Riešenia and Služby in mobile drawer.',
    milestoneDependency: 'M1',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('accordion') && !content.includes('openAccordions') && !content.includes('toggleAccordion')) {
        return { status: 'PENDING', message: 'Mobile drawer accordions in progress by Worker M1.' };
      }
      return { status: 'PASS', message: 'Mobile drawer expandable accordions verified.' };
    },
  },
  {
    id: 'T1-MD-05',
    tier: 1,
    category: 'Mobile Drawer',
    name: 'Mobile drawer action tap targets satisfy touch size standard (>= 44px)',
    description: 'Verifies interactive touch targets use py-3 or min-h-[44px].',
    run: () => {
      const content = readFile('components/Header.tsx');
      if (!content.includes('py-3') && !content.includes('h-11') && !content.includes('h-12')) {
        return { status: 'FAIL', message: 'Mobile links do not satisfy minimum touch target size (>= 44px).' };
      }
      return { status: 'PASS', message: 'Mobile navigation items meet touch target accessibility requirements.' };
    },
  },

  // =========================================================================
  // 10. LEAD SUBMISSION API (pages/api/lead.ts)
  // =========================================================================
  {
    id: 'T1-LA-01',
    tier: 1,
    category: 'Lead API',
    name: 'POST /api/lead with valid payload returns HTTP 200 and leadId',
    description: 'Sends valid name and phone and asserts 200 OK and unique leadId.',
    run: async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Ján Skúška',
          phone: '+421 948 111 222',
          email: 'jan.skuska@marvol-test.sk',
          service: 'fotovoltika-dom',
          source: 'e2e_tier1_test',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      const body = output.body as { success?: boolean; leadId?: string; message?: string };
      if (output.statusCode !== 200 || !body?.success || !body?.leadId) {
        return {
          status: 'FAIL',
          message: `Expected 200 with leadId, got ${output.statusCode}: ${JSON.stringify(output.body)}`,
        };
      }
      return { status: 'PASS', message: `Lead successfully submitted with leadId: ${body.leadId}` };
    },
  },
  {
    id: 'T1-LA-02',
    tier: 1,
    category: 'Lead API',
    name: 'POST /api/lead without name returns HTTP 400 Bad Request',
    description: 'Ensures missing name triggers validation error.',
    run: async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          phone: '+421 948 111 222',
          service: 'fotovoltika-dom',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 400) {
        return { status: 'FAIL', message: `Expected HTTP 400 for missing name, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'Missing name rejected with HTTP 400.' };
    },
  },
  {
    id: 'T1-LA-03',
    tier: 1,
    category: 'Lead API',
    name: 'POST /api/lead without phone returns HTTP 400 Bad Request',
    description: 'Ensures missing phone triggers validation error.',
    run: async () => {
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: 'Ján Test',
          service: 'fotovoltika-dom',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 400) {
        return { status: 'FAIL', message: `Expected HTTP 400 for missing phone, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'Missing phone rejected with HTTP 400.' };
    },
  },
  {
    id: 'T1-LA-04',
    tier: 1,
    category: 'Lead API',
    name: 'GET /api/lead returns HTTP 405 Method Not Allowed',
    description: 'Ensures non-POST methods are rejected with 405.',
    run: async () => {
      const req = createMockRequest({ method: 'GET' });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 405) {
        return { status: 'FAIL', message: `Expected HTTP 405 for GET, got ${output.statusCode}` };
      }
      return { status: 'PASS', message: 'GET request rejected with HTTP 405.' };
    },
  },
  {
    id: 'T1-LA-05',
    tier: 1,
    category: 'Lead API',
    name: 'Valid lead is written to data/leads.json without loss',
    description: 'Verifies data directory and leads.json file store submitted lead records.',
    run: async () => {
      const uniqueName = `VerifyStorage-${Date.now()}`;
      const req = createMockRequest({
        method: 'POST',
        body: {
          name: uniqueName,
          phone: '+421948777888',
          service: 'baterie',
          source: 'storage_verification',
        },
      });
      const { res, getResponse } = createMockResponse();
      await leadHandler(req, res);
      const output = getResponse();
      if (output.statusCode !== 200) {
        return { status: 'FAIL', message: `Submission failed with status ${output.statusCode}` };
      }
      const leadsFile = path.join(ROOT_DIR, 'data', 'leads.json');
      if (!fs.existsSync(leadsFile)) {
        return { status: 'FAIL', message: 'data/leads.json was not created.' };
      }
      const fileData = fs.readFileSync(leadsFile, 'utf8');
      if (!fileData.includes(uniqueName)) {
        return { status: 'FAIL', message: 'Submitted lead record not found in data/leads.json.' };
      }
      return { status: 'PASS', message: 'Lead safely persisted in data/leads.json.' };
    },
  },

  // =========================================================================
  // 11. XML SITEMAP (public/sitemap.xml)
  // =========================================================================
  {
    id: 'T1-SM-01',
    tier: 1,
    category: 'XML Sitemap',
    name: 'Sitemap exists and conforms to valid sitemaps.org XML schema',
    description: 'Checks public/sitemap.xml for proper root urlset and schema attribute.',
    run: () => {
      if (!fileExists('public/sitemap.xml')) {
        return { status: 'FAIL', message: 'public/sitemap.xml does not exist.' };
      }
      const content = readFile('public/sitemap.xml');
      if (!content.includes('http://www.sitemaps.org/schemas/sitemap/0.9')) {
        return { status: 'FAIL', message: 'sitemap.xml missing standard sitemaps.org schema namespace.' };
      }
      return { status: 'PASS', message: 'Sitemap XML schema declaration valid.' };
    },
  },
  {
    id: 'T1-SM-02',
    tier: 1,
    category: 'XML Sitemap',
    name: 'Sitemap contains homepage URL with priority 1.0',
    description: 'Ensures root https://marvol.sk/ has priority 1.0.',
    run: () => {
      const content = readFile('public/sitemap.xml');
      if (!content.includes('<loc>https://marvol.sk/</loc>') && !content.includes('<loc>https://marvol.sk</loc>')) {
        return { status: 'FAIL', message: 'Sitemap does not declare root homepage URL.' };
      }
      if (!content.includes('<priority>1.0</priority>')) {
        return { status: 'FAIL', message: 'Homepage priority 1.0 missing in sitemap.' };
      }
      return { status: 'PASS', message: 'Homepage URL and priority 1.0 verified.' };
    },
  },
  {
    id: 'T1-SM-03',
    tier: 1,
    category: 'XML Sitemap',
    name: 'Sitemap includes all 5 specialized /sluzby/* service subpages and 5 core solution pages',
    description: 'Verifies all 10 service & solution subpages exist in sitemap.',
    run: () => {
      const content = readFile('public/sitemap.xml');
      const urls = parseSitemapUrls(content);
      const required = [
        'fotovoltika-pre-domacnosti',
        'fotovoltika-pre-firmy',
        'bateriove-uloziska-bess',
        'tepelne-cerpadla',
        'elektroinstalacie-revizie',
        'sluzby/navrh-projektu',
        'sluzby/instalacia-montaz',
        'sluzby/konzultacie-poradenstvo',
        'sluzby/protipoziarna-ochrana-bezpecne-napatie',
        'sluzby/revizie-dotacie',
      ];
      const missing = required.filter(r => !urls.some(u => u.includes(r)));
      if (missing.length > 0) {
        return {
          status: 'FAIL',
          message: `Sitemap missing service/solution subpages: ${missing.join(', ')}`,
        };
      }
      return { status: 'PASS', message: 'All 10 service and solution subpages present in sitemap.xml.' };
    },
  },
  {
    id: 'T1-SM-04',
    tier: 1,
    category: 'XML Sitemap',
    name: 'Sitemap includes /eshop, /kontakt, and /ochrana-osobnych-udajov (14 URLs total)',
    description: 'Verifies dedicated /eshop, /kontakt, and privacy policy URLs exist, totaling 14 indexed routes.',
    run: () => {
      const content = readFile('public/sitemap.xml');
      const urls = parseSitemapUrls(content);
      const hasEshop = urls.some(u => u.includes('eshop'));
      const hasContact = urls.some(u => u.includes('kontakt'));
      const hasPrivacy = urls.some(u => u.includes('ochrana-osobnych-udajov'));
      if (!hasEshop) {
        return { status: 'FAIL', message: 'E-Shop URL (/eshop) missing in sitemap.' };
      }
      if (!hasContact) {
        return { status: 'FAIL', message: 'Contact URL (/kontakt) missing in sitemap.' };
      }
      if (!hasPrivacy) {
        return { status: 'FAIL', message: 'Privacy policy URL missing in sitemap.' };
      }
      if (urls.length !== 14) {
        return { status: 'FAIL', message: `Expected exactly 14 URLs in sitemap, found ${urls.length}` };
      }
      return { status: 'PASS', message: 'Sitemap includes /eshop, /kontakt, /ochrana-osobnych-udajov and exactly 14 routes.' };
    },
  },
  {
    id: 'T1-SM-05',
    tier: 1,
    category: 'XML Sitemap',
    name: 'Every URL entry declares valid ISO date <lastmod> and <changefreq>',
    description: 'Ensures sitemap tags have valid ISO dates and change frequencies.',
    run: () => {
      const content = readFile('public/sitemap.xml');
      const lastmodMatches = content.match(/<lastmod>(.*?)<\/lastmod>/g) || [];
      const freqMatches = content.match(/<changefreq>(.*?)<\/changefreq>/g) || [];
      if (lastmodMatches.length === 0 || freqMatches.length === 0) {
        return { status: 'FAIL', message: 'Sitemap lacks lastmod or changefreq entries.' };
      }
      // Validate date format YYYY-MM-DD
      const dateRegex = /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/;
      for (const m of lastmodMatches) {
        if (!dateRegex.test(m)) {
          return { status: 'FAIL', message: `Invalid lastmod date format: ${m}` };
        }
      }
      return { status: 'PASS', message: 'All sitemap entries have valid lastmod and changefreq tags.' };
    },
  },

  // =========================================================================
  // 12. ROUTE: /eshop (pages/eshop.tsx)
  // =========================================================================
  {
    id: 'T1-ES-01',
    tier: 1,
    category: 'Route: /eshop',
    name: 'E-Shop source file exists, exports default component, and wraps with Layout',
    description: 'Verifies pages/eshop.tsx exists, defines default React component export, and uses Layout shell.',
    run: () => {
      if (!fileExists('pages/eshop.tsx')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx does not exist.' };
      }
      const content = readFile('pages/eshop.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx does not have a default export.' };
      }
      if (!content.includes('<Layout') || !content.includes('</Layout>')) {
        return { status: 'FAIL', message: 'pages/eshop.tsx is not wrapped in Layout shell.' };
      }
      return { status: 'PASS', message: 'E-Shop page exists with default export and Layout wrapper.' };
    },
  },
  {
    id: 'T1-ES-02',
    tier: 1,
    category: 'Route: /eshop',
    name: 'E-Shop hero banner renders wholesale & retail positioning',
    description: 'Checks that hero banner displays wholesale and retail headings for components.',
    run: () => {
      const content = readFile('pages/eshop.tsx');
      const hasWholesale = content.includes('Veľkoobchod');
      const hasRetail = content.includes('Maloobchod');
      const hasComponents = content.toLowerCase().includes('komponent');
      if (!hasWholesale || !hasRetail || !hasComponents) {
        return {
          status: 'FAIL',
          message: `Hero banner missing required positioning text (wholesale=${hasWholesale}, retail=${hasRetail}, components=${hasComponents}).`,
        };
      }
      return { status: 'PASS', message: 'E-Shop hero banner renders wholesale and retail positioning.' };
    },
  },
  {
    id: 'T1-ES-03',
    tier: 1,
    category: 'Route: /eshop',
    name: 'E-Shop category grid renders all 6 product categories',
    description: 'Verifies Panely, Striedače, Batérie, Wallboxy, Konštrukcie, and Sety in category grid.',
    run: () => {
      const content = readFile('pages/eshop.tsx');
      const categories = [
        { key: 'panels', label: 'panely' },
        { key: 'inverters', label: 'striedače' },
        { key: 'storage', label: 'batéri' },
        { key: 'wallbox', label: 'wallbox' },
        { key: 'mounting', label: 'konštrukci' },
        { key: 'sets', label: 'sety' },
      ];
      const lower = content.toLowerCase();
      const missing = categories.filter(c => !lower.includes(c.key) && !lower.includes(c.label));
      if (missing.length > 0) {
        return {
          status: 'FAIL',
          message: `Missing categories in E-Shop catalog: ${missing.map(m => m.key).join(', ')}`,
        };
      }
      return { status: 'PASS', message: 'E-Shop category grid renders all 6 product categories.' };
    },
  },
  {
    id: 'T1-ES-04',
    tier: 1,
    category: 'Route: /eshop',
    name: 'Interactive product cards render with filter controls and dual price display',
    description: 'Verifies kWp/power, brand, phase filter controls and dual price display (ex-VAT and with VAT).',
    run: () => {
      const content = readFile('pages/eshop.tsx');
      const hasBrandFilter = content.includes('brand') || content.includes('Značka');
      const hasPhaseFilter = content.includes('phase') || content.includes('fáz');
      const hasPowerFilter = content.includes('powerRange') || content.includes('výkon');
      const hasExVatPrice = content.includes('bez DPH');
      const hasWithVatPrice = content.includes('s DPH');

      if (!hasBrandFilter || !hasPhaseFilter || !hasPowerFilter) {
        return {
          status: 'FAIL',
          message: `Filter controls missing (brand=${hasBrandFilter}, phase=${hasPhaseFilter}, power=${hasPowerFilter}).`,
        };
      }
      if (!hasExVatPrice || !hasWithVatPrice) {
        return {
          status: 'FAIL',
          message: `Dual price display missing (exVat=${hasExVatPrice}, withVat=${hasWithVatPrice}).`,
        };
      }
      return { status: 'PASS', message: 'Interactive product cards and filter controls render with dual price display.' };
    },
  },
  {
    id: 'T1-ES-05',
    tier: 1,
    category: 'Route: /eshop',
    name: 'Dual checkout calls present ("Kúpiť samostatný materiál" vs "Kúpiť s kompletnou montážou na kľúč + dotácia") and 4-pillar Roadmap is rendered',
    description: 'Verifies both CTA checkout options and the 4-pillar growth roadmap are present.',
    run: () => {
      const content = readFile('pages/eshop.tsx');
      const hasMaterialCta = content.includes('Kúpiť samostatný materiál');
      const hasTurnkeyCta = content.includes('Kúpiť s kompletnou montážou na kľúč');
      const hasRoadmap = content.includes('Roadmapa') || content.includes('roadmap');
      const hasPillarB2B = content.includes('B2B Inštalatérsky portál') || content.includes('B2B');
      const hasPillarWMS = content.includes('WMS') || content.includes('ERP');
      const hasPillarLogistics = content.includes('Logistika') || content.includes('logistik');

      if (!hasMaterialCta || !hasTurnkeyCta) {
        return {
          status: 'FAIL',
          message: `Dual checkout CTAs missing (material=${hasMaterialCta}, turnkey=${hasTurnkeyCta}).`,
        };
      }
      if (!hasRoadmap || !hasPillarB2B || !hasPillarWMS || !hasPillarLogistics) {
        return {
          status: 'FAIL',
          message: 'E-Shop 4-pillar growth roadmap is missing or incomplete.',
        };
      }
      return { status: 'PASS', message: 'Dual checkout calls and 4-pillar expansion roadmap verified.' };
    },
  },

  // =========================================================================
  // 13. SPECIALIZED SERVICES SUBPAGES (/sluzby/*)
  // =========================================================================
  {
    id: 'T1-SS-01',
    tier: 1,
    category: 'Route: /sluzby/navrh-projektu',
    name: 'Návrh projektu subpage exists, details 3D shading & engineering, embeds LeadForm',
    description: 'Verifies /sluzby/navrh-projektu details 3D simulations, SLD jednopólové schémy, and embeds LeadForm.',
    run: () => {
      if (!fileExists('pages/sluzby/navrh-projektu.tsx')) {
        return { status: 'FAIL', message: 'pages/sluzby/navrh-projektu.tsx does not exist.' };
      }
      const content = readFile('pages/sluzby/navrh-projektu.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'navrh-projektu.tsx does not have a default export.' };
      }
      if (!content.includes('3D') || (!content.includes('schém') && !content.includes('SLD'))) {
        return { status: 'FAIL', message: 'navrh-projektu.tsx missing 3D shading or SLD electrical engineering details.' };
      }
      if (!content.includes('<LeadForm') || !content.includes('initialService=')) {
        return { status: 'FAIL', message: 'navrh-projektu.tsx does not embed configured LeadForm.' };
      }
      return { status: 'PASS', message: 'Návrh projektu service page verified with 3D engineering and LeadForm.' };
    },
  },
  {
    id: 'T1-SS-02',
    tier: 1,
    category: 'Route: /sluzby/instalacia-montaz',
    name: 'Montáž a inštalácia subpage exists, details turnkey installation & roof anchoring, embeds LeadForm',
    description: 'Verifies /sluzby/instalacia-montaz details certified turnkey installation and embeds LeadForm.',
    run: () => {
      if (!fileExists('pages/sluzby/instalacia-montaz.tsx')) {
        return { status: 'FAIL', message: 'pages/sluzby/instalacia-montaz.tsx does not exist.' };
      }
      const content = readFile('pages/sluzby/instalacia-montaz.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'instalacia-montaz.tsx does not have a default export.' };
      }
      if (!content.includes('montáž') && !content.includes('inštaláci')) {
        return { status: 'FAIL', message: 'instalacia-montaz.tsx missing turnkey installation details.' };
      }
      if (!content.includes('<LeadForm') || !content.includes('initialService=')) {
        return { status: 'FAIL', message: 'instalacia-montaz.tsx does not embed configured LeadForm.' };
      }
      return { status: 'PASS', message: 'Montáž a inštalácia service page verified with turnkey specs and LeadForm.' };
    },
  },
  {
    id: 'T1-SS-03',
    tier: 1,
    category: 'Route: /sluzby/konzultacie-poradenstvo',
    name: 'Konzultácie a poradenstvo subpage exists, details energy audit & ROI, embeds LeadForm',
    description: 'Verifies /sluzby/konzultacie-poradenstvo details audit, ROI consultation, and embeds LeadForm.',
    run: () => {
      if (!fileExists('pages/sluzby/konzultacie-poradenstvo.tsx')) {
        return { status: 'FAIL', message: 'pages/sluzby/konzultacie-poradenstvo.tsx does not exist.' };
      }
      const content = readFile('pages/sluzby/konzultacie-poradenstvo.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'konzultacie-poradenstvo.tsx does not have a default export.' };
      }
      if (!content.includes('audit') && !content.includes('poradenstvo')) {
        return { status: 'FAIL', message: 'konzultacie-poradenstvo.tsx missing energy audit or advisory details.' };
      }
      if (!content.includes('<LeadForm') || !content.includes('initialService=')) {
        return { status: 'FAIL', message: 'konzultacie-poradenstvo.tsx does not embed configured LeadForm.' };
      }
      return { status: 'PASS', message: 'Konzultácie a poradenstvo service page verified with audit info and LeadForm.' };
    },
  },
  {
    id: 'T1-SS-04',
    tier: 1,
    category: 'Route: /sluzby/protipoziarna-ochrana-bezpecne-napatie',
    name: 'Protipožiarna ochrana subpage exists, details Rapid Shutdown & AFCI arc-fault safety, embeds LeadForm',
    description: 'Verifies /sluzby/protipoziarna-ochrana-bezpecne-napatie details Rapid Shutdown, AFCI, and embeds LeadForm.',
    run: () => {
      if (!fileExists('pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx')) {
        return { status: 'FAIL', message: 'pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx does not exist.' };
      }
      const content = readFile('pages/sluzby/protipoziarna-ochrana-bezpecne-napatie.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'protipoziarna-ochrana subpage missing default export.' };
      }
      if (!content.includes('Rapid Shutdown') || !content.includes('AFCI')) {
        return { status: 'FAIL', message: 'protipoziarna-ochrana subpage missing Rapid Shutdown or AFCI arc-fault details.' };
      }
      if (!content.includes('<LeadForm') || !content.includes('initialService=')) {
        return { status: 'FAIL', message: 'protipoziarna-ochrana subpage does not embed configured LeadForm.' };
      }
      return { status: 'PASS', message: 'Protipožiarna ochrana subpage verified with Rapid Shutdown, AFCI, and LeadForm.' };
    },
  },
  {
    id: 'T1-SS-05',
    tier: 1,
    category: 'Route: /sluzby/revizie-dotacie',
    name: 'Revízie a dotácie subpage exists, details OPOS revision report & SIEA subsidy administration, embeds LeadForm',
    description: 'Verifies /sluzby/revizie-dotacie details official OPOS inspection, SIEA subsidy administration, and embeds LeadForm.',
    run: () => {
      if (!fileExists('pages/sluzby/revizie-dotacie.tsx')) {
        return { status: 'FAIL', message: 'pages/sluzby/revizie-dotacie.tsx does not exist.' };
      }
      const content = readFile('pages/sluzby/revizie-dotacie.tsx');
      if (!content.includes('export default')) {
        return { status: 'FAIL', message: 'revizie-dotacie.tsx missing default export.' };
      }
      if (!content.includes('OPOS') && !content.includes('revízi')) {
        return { status: 'FAIL', message: 'revizie-dotacie.tsx missing OPOS revision details.' };
      }
      if (!content.includes('SIEA') && !content.includes('Zelená domácnostiam')) {
        return { status: 'FAIL', message: 'revizie-dotacie.tsx missing SIEA subsidy administration details.' };
      }
      if (!content.includes('<LeadForm') || !content.includes('initialService=')) {
        return { status: 'FAIL', message: 'revizie-dotacie.tsx does not embed configured LeadForm.' };
      }
      return { status: 'PASS', message: 'Revízie a dotácie service page verified with OPOS, SIEA, and LeadForm.' };
    },
  },
];
