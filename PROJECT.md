# Project: Marvol Multi-Page Architecture & SEO Transformation

## Architecture
- **Framework**: Next.js 16.1.0 (Pages Router) + React 19.2.3 + TypeScript.
- **Styling**: Tailwind CSS v4.1.11 via `@import "tailwindcss";` in `styles/globals.css`. Dark-mode glassmorphism baseline (`bg-slate-950`, `text-slate-100`, slate-800 borders, solar amber / sky / emerald accents).
- **Navigation Architecture**:
  - `components/Header.tsx`: Fixed header (~100px) with Top Bar and Navbar. Route-aware links using `useRouter`.
  - Desktop: Hover flyout menus for "Riešenia" (Domácnosti, Firmy, Samosprávy) and "Služby" (Fotovoltika, BESS & Wallbox, Tepelné čerpadlá, Elektroinštalácie & Revízie) with 180ms hover bridge and `pt-2` wrapper.
  - Mobile: Full slide-over drawer modal with backdrop blur, body scroll lock, and expandable accordions for subpages.
- **Shared Foundation Components**:
  - `constants/company.ts`: Single source of truth for statutory corporate data (§ 3a Obch. zák.).
  - `components/LeadForm.tsx`: Modular lead capture form with service pre-selection, honeypot spam protection, phone/email validation, and GDPR consent.
  - `components/Layout.tsx`: Shared page shell managing Next.js `<Head>`, top padding (`pt-28 md:pt-36`), `<Header />`, and `<Footer />`.
- **Backend API**:
  - `pages/api/lead.ts`: Hardened lead submission handler with honeypot bot trap, field validation, and local JSON persistence in `data/leads.json`.
- **Technical SEO & Structured Data**:
  - Per-page unique `<title>`, `<meta description>`, OpenGraph, canonical URLs, and Schema.org JSON-LD (`LocalBusiness`/`ElectricalContractor`, `Service`, `BreadcrumbList`, `FAQPage`).
  - `public/sitemap.xml`: XML sitemap containing all 8 routes with accurate change frequencies and priorities.

## Code Layout
- `constants/company.ts`: Statutory corporate details, addresses, phone numbers, subsidy parameters.
- `components/Header.tsx`: Navigation header with desktop hover dropdowns and mobile drawer.
- `components/Footer.tsx`: Global footer with updated subpage internal links and statutory info.
- `components/Layout.tsx`: Shared layout wrapper for all subpages.
- `components/LeadForm.tsx`: Reusable lead capture form.
- `pages/index.tsx`: High-converting landing page.
- `pages/fotovoltika-pre-domacnosti.tsx`: Subpage for residential photovoltaics & €4,025 Green Households subsidy.
- `pages/fotovoltika-pre-firmy.tsx`: Subpage for commercial photovoltaics & Green Enterprises subsidy.
- `pages/bateriove-uloziska-bess.tsx`: Subpage for battery storage systems (BESS) & EV Wallbox charging.
- `pages/tepelne-cerpadla.tsx`: Subpage for heat pumps & hybrid energy integration.
- `pages/elektroinstalacie-revizie.tsx`: Subpage for electrical engineering & inspection services.
- `pages/kontakt.tsx`: Dedicated contact page with statutory details, map embed, and lead form.
- `pages/ochrana-osobnych-udajov.tsx`: Privacy policy & GDPR compliance page.
- `pages/api/lead.ts`: Lead intake API endpoint with anti-spam and validation.
- `public/sitemap.xml`: XML sitemap for search engine indexing.

## Feature Inventory
Every feature from the user request and survey is enumerated below with its assigned milestone:
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Centralized Company Statutory Constants | Single source of truth for IČO, DIČ, IČ DPH, registered court, address, phone, email, WhatsApp | M2 | Survey 2 |
| 2 | Modular Reusable LeadForm Component | Shared lead form supporting `initialService`, honeypot bot filter, GDPR consent, and validation | M2 | Survey 2 |
| 3 | Shared Subpage Layout Component | Consistent shell handling top padding (`pt-28 md:pt-36`), `<Header>`, `<Footer>`, and `<Head>` tags | M2 | Survey 1 |
| 4 | Hardened Lead Submission API | `/api/lead` with honeypot bot filtering, phone/email validation, and JSON storage | M2 | Survey 2 |
| 5 | Desktop Hover Flyout Dropdown: Riešenia | Dropdown menu for Domácnosti, Firmy, Samosprávy with 180ms hover bridge and zero layout shift | M1 | R2, Survey 1 |
| 6 | Desktop Hover Flyout Dropdown: Služby | Dropdown menu for Fotovoltika, BESS & Wallbox, Tepelné čerpadlá, Elektroinštalácie with smooth transitions | M1 | R2, Survey 1 |
| 7 | Route-Aware Header Navigation Links | Automatic switching between `#anchor` and `/#anchor` depending on current route | M1 | Survey 1 |
| 8 | Mobile Slide-Over Navigation Drawer | Smooth slide-over modal with backdrop blur overlay, body scroll lock, and close buttons | M1 | R2, Survey 1 |
| 9 | Mobile Drawer Accordions | Collapsible accordions for "Riešenia" and "Služby" in the mobile drawer | M1 | R2, Survey 1 |
| 10 | Residential Photovoltaics Page | `pages/fotovoltika-pre-domacnosti.tsx` with €4,025 Green Households guidance, turnkey packages, and lead form | M3 | R1.1, Survey 1, 3 |
| 11 | Commercial Photovoltaics Page | `pages/fotovoltika-pre-firmy.tsx` with Green Enterprises subsidy, peak shaving, B2B case studies, and lead form | M3 | R1.2, Survey 1, 3 |
| 12 | Battery Storage BESS & Wallbox Page | `pages/bateriove-uloziska-bess.tsx` with LiFePO4 storage, UPS backup, EV Wallbox integration, and lead form | M3 | R1.3, Survey 1, 3 |
| 13 | Heat Pumps Page | `pages/tepelne-cerpadla.tsx` with air-to-water heat pumps, COP 5.0, hybrid solar integration, and lead form | M3 | R1.4, Survey 1, 3 |
| 14 | Electrical Engineering & Revisions Page | `pages/elektroinstalacie-revizie.tsx` with switchboards, lightning arresters, official revisions (EZ), and lead form | M3 | R1.5, Survey 1, 3 |
| 15 | Dedicated Contact Page | `pages/kontakt.tsx` with statutory card, direct contact channels, interactive map embed, and lead form | M4 | R1.6, Survey 1, 2 |
| 16 | Global Footer Internal Linking Update | Update `components/Footer.tsx` with direct links to all new subpages and statutory consistency | M4 | Survey 1, 2 |
| 17 | Per-Page Technical SEO & Meta Tags | Unique `<title>`, `<meta description>`, OpenGraph, and canonical tags on all subpages | M5 | R3, Survey 3 |
| 18 | Structured Data (Schema.org JSON-LD) | `LocalBusiness`/`ElectricalContractor`, `Service`, `BreadcrumbList`, and `FAQPage` rich snippets | M5 | R3, Survey 3 |
| 19 | Updated XML Sitemap | `public/sitemap.xml` with all 8 site routes, priority mappings, and change frequencies | M5 | R3, Survey 3 |
| 20 | Mobile Responsiveness & Touch Optimization | 320px–430px audit, zero horizontal scroll overflow, touch targets >= 48px, accessible contrasts | M6 | R4, Survey 1 |
| 21 | Full E2E Test Suite & Zero-Defect QA | Opaque-box E2E test verification across Tiers 1-4, Tier 5 adversarial testing, `npx tsc --noEmit` 0 errors | M6 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Requirement-driven test harness, HTTP endpoint runner, DOM assertions | none | IN_PROGRESS (fec4eaa4-925f-4677-b151-3ad48e2dba49) |
| M1 | Header Dropdown & Mobile Drawer | Desktop hover flyouts, mobile slide-over drawer with accordions, route-aware links | none | DONE |
| M2 | Core Subpage Architecture & Reusable Components | `constants/company.ts`, `components/LeadForm.tsx`, `components/Layout.tsx`, `/api/lead` hardening | none | DONE |
| M3 | Standalone Service Subpages | 5 service subpages (`fotovoltika-pre-domacnosti`, `fotovoltika-pre-firmy`, `bateriove-uloziska-bess`, `tepelne-cerpadla`, `elektroinstalacie-revizie`) | M2 | DONE |
| M4 | Dedicated Contact Page & Footer Links | `pages/kontakt.tsx` with statutory data, map embed, lead form + `components/Footer.tsx` link updates | M1, M2 | DONE |
| M5 | Technical SEO, Schema.org & Sitemap | Per-page meta tags, canonical links, OpenGraph, Schema.org JSON-LD, `public/sitemap.xml` | M3, M4 | DONE |
| M6 | Mobile Responsiveness, Core Web Vitals & Zero-Defect QA | 320px-430px audit, touch target compliance, 100% E2E test pass, Tier 5 hardening, `npx tsc --noEmit` | M1-M5, E2E | VERIFICATION_GATE |

## Interface Contracts

### 1. `constants/company.ts`
```ts
export const COMPANY_DETAILS = {
  legalName: 'Marvol s. r. o.',
  shortName: 'Marvol',
  seat: {
    street: 'Chotárna 3394/6',
    city: 'Vrútky',
    zip: '038 61',
    country: 'Slovenská republika',
    fullAddress: 'Chotárna 3394/6, 038 61 Vrútky, Slovenská republika',
  },
  registry: {
    court: 'Mestský súd Žilina (pôvodne Okresný súd Žilina)',
    section: 'Sro',
    insertNumber: '74765/L',
    legalNotice: 'Zapísaná v Obchodnom registri Okresného súdu Žilina, oddiel: Sro, vložka č. 74765/L',
  },
  tax: {
    ico: '53 060 091',
    dic: '2121255961',
    icDph: 'SK2121255961',
    vatPayer: true,
  },
  contact: {
    phone: '+421 948 123 456',
    phoneClean: '+421948123456',
    email: 'info@marvol.sk',
    whatsappUrl: 'https://wa.me/421948123456?text=Dobry%20den,%20mam%20zaujem%20o%20fotovoltiku%20od%20Marvol%20s.r.o.',
    businessHours: {
      workdays: 'Pondelok – Piatok: 08:00 – 18:00',
      shortDisplay: 'Po - Pia: 8:00 - 18:00',
    },
  },
  subsidies: {
    zelenaDomacnostiam: true,
    zelenaPodnikom: true,
    maxHomeSubsidy: '4 025 €',
  },
} as const;
```

### 2. `components/LeadForm.tsx`
```tsx
export type ServiceType = 
  | 'fotovoltika-dom'
  | 'fotovoltika-firma'
  | 'baterie'
  | 'cerpadlo'
  | 'elektro'
  | 'vseobecny-kontakt';

export interface LeadFormProps {
  initialService?: ServiceType | string;
  source?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  showLocationField?: boolean;
  onSuccess?: (leadId: string) => void;
}
```

### 3. `components/Layout.tsx`
```tsx
export interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonicalPath: string;
  schema?: object | object[];
  isSubpage?: boolean;
}
```

### 4. `pages/api/lead.ts` Payload
```ts
export interface LeadRequestBody {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  source: string;
  b_url?: string; // Honeypot bot trap
  propertyType?: string;
  monthlyBill?: number;
  hasBattery?: boolean;
  hasEV?: boolean;
  recommendedKwp?: number;
  estimatedSavings?: number;
  netPrice?: number;
}
```
