# Original User Request

## 2026-09-21T19:59:00Z

Comprehensive multi-sphere executive audit and strategic improvement roadmap for the Marvol s.r.o. website (http://localhost:3000).

Working directory: /Users/matejmachej/Desktop/Marvol
Integrity mode: development

## Requirements

### R1. Executive Multi-Sphere Audit (CEO & C-Suite Viewpoint)
Perform an in-depth, multi-faceted analysis of the Marvol s.r.o. website across all 4 key corporate spheres:
1. **Conversion & Sales (CRO / Sales Lead)**: Audit solar savings calculator, lead capture forms, call-to-actions, pricing transparency, and inquiry friction.
2. **Technology & Architecture (CTO / Tech Lead)**: Audit Next.js/TypeScript structure, Tailwind CSS v4 performance, mobile responsiveness, DOM efficiency, and type safety.
3. **Marketing & Growth (CMO / Growth Lead)**: Audit branding, headlines, value propositions, clarity of state subsidies (*Zelená domácnostiam* & *Zelená podnikom*), and SEO readiness.
4. **Quality & Compliance (QA / Compliance Officer)**: Audit input validation, dotačné podmienky compliance, zero-defect quality control, and legal information.

### R2. Strategic Improvement Roadmap & Impact Projections
For each area of improvement, specify:
- Current limitation / weakness identified.
- Proposed strategic change / optimization.
- Projected business outcome (conversion rate lift, revenue growth, customer trust, performance optimization).

## Acceptance Criteria

### Comprehensive Strategic Report
- [ ] Detailed findings and evaluations for all 4 corporate spheres (CRO, CTO, CMO, QA)
- [ ] Prioritized list of actionable recommendations mapped to predicted ROI and business outcomes
- [ ] Clear executive summary tailored for the CEO of Marvol s.r.o.

## 2026-09-30T11:54:27Z

Multi-page architecture transformation, SEO enhancement, hover dropdown header navigation, and mobile UX optimization for the Marvol s.r.o. Next.js web application.

Working directory: /Users/matejmachej/Desktop/Marvol
Integrity mode: development

## Requirements

### R1. Multi-Page Architecture & Standalone Service Pages
- Transform the site into a multi-page Next.js application while maintaining the high-converting landing page (`pages/index.tsx`).
- Create standalone pages for each key activity:
  1. `pages/fotovoltika-pre-domacnosti.tsx` — Photovoltaics for residential homes & Green Households subsidy (€4,025 guidance).
  2. `pages/fotovoltika-pre-firmy.tsx` — Commercial photovoltaics for businesses & Green Enterprises subsidy.
  3. `pages/bateriove-uloziska-bess.tsx` — BESS Battery Storage Systems & EV Wallbox charging stations.
  4. `pages/tepelne-cerpadla.tsx` — Heat pumps & hybrid energy integration.
  5. `pages/elektroinstalacie-revizie.tsx` — Electrical engineering & inspection services.
  6. `pages/kontakt.tsx` — Dedicated contact page with lead form submission and official company statutory details.

### R2. Hover Dropdown Navigation Header & Mobile Menu
- Upgrade `components/Header.tsx` with desktop hover dropdown menus (flyout menus) for "Služby" (Services) and "Riešenia" (Solutions) leading directly to subpages.
- Implement a responsive mobile navigation drawer with expandable accordions for subpages and touch-friendly tap targets.

### R3. Comprehensive Technical SEO & Structured Data
- Inject unique `<title>`, `<meta description>`, OpenGraph, canonical tags, and Schema.org JSON-LD (`Service`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`) into every subpage.
- Update `public/sitemap.xml` with all subpages and priority mappings.

### R4. Mobile Responsiveness & Core Web Vitals Optimization
- Ensure 100% mobile responsiveness across all viewports (320px–430px mobile, tablets, desktops).
- Zero horizontal overflow, touch-optimized form sliders, calculator inputs, and accessible color contrasts.

## Acceptance Criteria

### Technical & Type Safety
- [ ] `npx tsc --noEmit` runs with 0 errors across the entire codebase
- [ ] All new subpages render correctly with HTTP 200 OK
- [ ] Desktop hover dropdowns in Header transition smoothly without layout shift
- [ ] Mobile navigation drawer opens, closes, and expands subpages seamlessly
- [ ] Lead submission form (`/api/lead`) works identically on all subpages with GDPR compliance
- [ ] `public/sitemap.xml` includes all new subpage URLs

## 2026-09-30T19:09:32Z

Multi-page structure reorganization, hover dropdown navigation (Fotovoltika & Služby), e-shop layout preparation (`/eshop`), e-shop expansion roadmap, comprehensive technical SEO, and mobile UX optimization for Marvol s.r.o.

Working directory: /Users/matejmachej/Desktop/Marvol
Integrity mode: development

## Requirements

### R1. Restructured Navigation & Hover Dropdowns (Header & Footer)
- Upgrade `components/Header.tsx` with rich desktop hover dropdowns and a responsive mobile drawer for two primary sections:
  1. **Fotovoltika** (Dropdown):
     - Pre domácnosti (`/fotovoltika-pre-domacnosti`)
     - Pre firmy & priemysel (`/fotovoltika-pre-firmy`)
     - Batériové úložiská BESS & EV Wallboxy (`/bateriove-uloziska-bess`)
  2. **Služby** (Dropdown):
     - Návrh projektu & Projektovanie (`/sluzby/navrh-projektu`)
     - Montáž a inštalácia na kľúč (`/sluzby/instalacia-montaz`)
     - Konzultácie a energetické poradenstvo (`/sluzby/konzultacie-poradenstvo`)
     - Protipožiarna ochrana & Bezpečné napätie (`/sluzby/protipoziarna-ochrana-bezpecne-napatie`)
     - Revízie, servis & Dotácie SIEA (`/sluzby/revizie-dotacie`)
  3. **E-shop** (`/eshop`) & **Kontakt** (`/kontakt`).

### R2. Service Subpages Implementation
- Ensure all 5 specialized service subpages (`/sluzby/navrh-projektu`, `/sluzby/instalacia-montaz`, `/sluzby/konzultacie-poradenstvo`, `/sluzby/protipoziarna-ochrana-bezpecne-napatie`, `/sluzby/revizie-dotacie`) are fully created with dedicated Slovak copy, technical parameters, fire-safety compliance (Rapid Shutdown / Arc Fault detection), and lead capture forms.

### R3. E-Shop Layout Preparation (`pages/eshop.tsx`) & Growth Roadmap
- Create a dedicated e-shop preview page (`/eshop`) displaying a clean, high-converting layout skeleton without hardcoded live inventory:
  - Hero Banner: Solar & Energy Components (Wholesale & Retail).
  - Category Grid: Solárne panely (TOPCon, Bifacial), Striedače & Invertory (Huawei, Solax, Fronius), Batériové úložiská, EV Charger Wallboxy, Hliníkové konštrukcie & Kabeláž, Hotové FV sety.
  - Interactive Product Card Mockups with filter controls (Podľa výkonu kWp, značky, fázovania).
  - Dual Checkout Call: "Kúpiť samostatný materiál" vs. "Kúpiť s kompletnou montážou na kľúč + dotácia".
- Provide an integrated E-Shop Expansion Roadmap section outlining future steps (Payment Gateways, B2B installer portal, WMS/ERP integration, freight logistics for solar panels).

### R4. Technical SEO & Schema.org Structured Data
- Inject unique `<title>`, `<meta description>`, OpenGraph, canonical tags, and Schema.org JSON-LD (`Service`, `Store`, `OfferCatalog`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`) for every single page.
- Update `public/sitemap.xml` with all subpages and priority mappings.

### R5. Mobile Viewport Optimization & Performance
- Ensure 100% mobile responsiveness (320px–430px viewports) with expandable mobile accordion drawers, touch-friendly tap targets, and 0 horizontal overflow.

## Acceptance Criteria

### Technical & Type Safety
- [ ] `npx tsc --noEmit` runs with 0 errors across the entire codebase
- [ ] Header hover dropdowns transition smoothly without flickering on desktop
- [ ] Mobile navigation drawer expands/collapses all categories smoothly
- [ ] `/eshop` page renders cleanly with category filters, product mockups, and B2B/B2C CTA buttons
- [ ] All service subpages under `/sluzby/*` render with HTTP 200 OK
- [ ] `public/sitemap.xml` contains all subpages and `/eshop`

## 2026-10-26T20:21:36Z

Kompletný moderný redesign webu Marvol s.r.o. na vetve `preview` s interaktívnymi prvkami, plynulými animáciami a jasnou vizuálnou prezentáciou fotovoltiky, batériových systémov BESS a tepelných čerpadiel pre laikov aj firemných klientov. Zachováva existujúci obsah, pridáva predajné nástroje (solárna kalkulačka) a aplikuje štandardy `design-taste-frontend` (anti-slop, typografia, reálne fotky).

Working directory: /Users/matejmachej/Desktop/Marvol
Integrity mode: development

## Requirements

### R1. Komplexný moderný redesign hlavnej stránky a podstránok
- Aplikovať prémiový art-direction štýl z `design-taste-frontend`: eliminovať generický "AI-template" vzhľad (zbaviť sa prebytočných 1px rámčekov, fialových gradientov, emoji v UI a preplnených mikro-štítkov podľa `lint.mjs`).
- Prepracovať hlavnú stránku (`pages/index.tsx`) aj kľúčové podstránky:
  1. Domácnosti (`pages/fotovoltika-pre-domacnosti.tsx`)
  2. Firmy (`pages/fotovoltika-pre-firmy.tsx`)
  3. Batériové úložiská (`pages/bateriove-uloziska-bess.tsx`)
  4. Tepelné čerpadlá (`pages/tepelne-cerpadla.tsx`)
  5. Elektroinštalácie & Revízie (`pages/elektroinstalacie-revizie.tsx`)
  6. E-shop layout (`pages/eshop.tsx`)
  7. Kontakt (`pages/kontakt.tsx`)
  8. Služby (`pages/sluzby/*`)
- Zabezpečiť plynulú navigáciu (`components/Header.tsx`, `components/Footer.tsx`, mobilný panel).

### R2. Okamžitá vizuálna zrozumiteľnosť pre laika (Fotografie & Diagramy)
- Do každého hero bloku a kľúčovej sekcie zakomponovať reálne tematické fotografie z `public/images/` (rodinné domy, priemyselné strechy, batériové racky, tepelné čerpadlá, práca v rozvádzači).
- Každý segment musí vizuálne okamžite komunikovať, čo Marvol robí (pred / po montáži, komponenty, 3D návrh, revízia).

### R3. Interaktívne predajné prvky a kalkulačka úspor
- Implementovať intuitívnu solárnu kalkulačku s okamžitou spätnou väzbou (výpočet kWp, odhad ročnej úspory v €, výška štátnej dotácie SIEA až do 1 150 € / 4 600 € a návratnosť v rokoch).
- Vizuálne prepínače (s batériou / bez batérie, tepelné čerpadlo, EV Wallbox) s dynamickým zobrazením obsahu zostavy.
- Plynulý prechod na nezáväzný dopyt s predfillovanými údajmi.

### R4. Plynulé animácie a interaktívne mikroskopické interakcie
- Plynulé fade/slide prechody prvkov pri scrollovaní.
- Interaktívne tabs, hover efekty kariet a akordeóny v FAQ bez skákania layoutu (zero cumulative layout shift).
- Mobilná optimalizácia: dotykové ciele min. 44–48 px, ochrana pred iOS zoomom pri formulároch (16px fonty).

### R5. Izolácia vo vetve preview & nulová defektovosť
- Všetky úpravy vykonávať výlučne vo vetve `preview`. Produkčná vetva `main` zostáva nedotknutá.
- Commit a push zmien do `origin/preview`.
- Zero-defect kontrola kvality: `npx tsc --noEmit` musí prejsť s 0 chybami.

## Acceptance Criteria

### Vizuálna a funkčná kvalita
- [ ] Všetky stránky a podstránky renderujú s HTTP 200 na vetve `preview`
- [ ] Hlavná stránka a podstránky obsahujú relevantné fotografie z `public/images/`
- [ ] Interaktívna kalkulačka okamžite reaguje na zmenu mesačnej platby a prepínače technológií
- [ ] Formuláre správne odosielajú dopyt na `/api/lead` s GDPR súhlasom
- [ ] Mobilné zobrazenie (320px – 430px) je bez horizontálneho scrollu a s min. 44px dotykovými prvkami

### Technická integrita a typová bezpečnosť
- [ ] `npx tsc --noEmit` končí s 0 chybami
- [ ] Vetva `main` nie je modifikovaná; všetky commity sú na vetve `preview`
- [ ] Zmeny sú pushnuté na `origin/preview` pre Vercel preview deployment
