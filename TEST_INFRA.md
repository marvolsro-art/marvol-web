# TEST_INFRA: Marvol Multi-Page Architecture & SEO E2E Test Suite

## 1. Architectural Principles & Philosophy

The Marvol s.r.o. web application requires zero-defect quality across client conversion, multi-page routing, state subsidy guidance (€4,025 *Zelená domácnostiam* & *Zelená podnikom*), responsive navigation, and technical SEO. The test suite follows these core principles:

1. **Opaque-Box Requirement-Driven Testing**:
   Tests assert against observable external behavior:
   - HTTP status codes (200, 400, 405)
   - Rendered DOM structures and accessibility attributes (`aria-haspopup`, `aria-expanded`, `role="menu"`)
   - Schema.org JSON-LD structured data compliance (`LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`)
   - Canonical URLs, OpenGraph meta tags, and `public/sitemap.xml` entries
   - Lead intake payload contracts, honeypot bot trap isolation, and persistence in `data/leads.json`.

2. **Progressive Testability Across Implementation Milestones**:
   The test harness operates in dual awareness mode:
   - Features already implemented (e.g. Landing Page `/`, Statutory Constants, Privacy Policy, Lead API handler) are strictly tested and MUST pass.
   - Features belonging to upcoming milestones (M1 Header Dropdowns, M3 Service Subpages, M4 Contact Page, M5 Technical SEO & Sitemap, M6 Mobile Hardening) are verified with rich diagnostic reporting:
     - In **Standard Mode**, pending milestone features are reported as `PENDING (Milestone M#)` with clear specifications of what is required to pass.
     - In **Strict Mode (`--strict`)**, any pending feature is treated as a failure, allowing CI to enforce 100% completion at final acceptance.

3. **Multi-Environment Execution Support**:
   - **Offline / In-Process Mode**: Directly imports Next.js API handlers, inspects component contracts, validates sitemap XML, and parses page route definitions without requiring an active network server. Perfect for restricted sandbox environments and static CI audits.
   - **Live HTTP Mode (`TEST_BASE_URL=http://localhost:3000`)**: Dispatches real network HTTP requests against the running Next.js dev server (`http://localhost:3000` or `http://localhost:3030`).
   - Runs with zero external test framework dependencies using modern Node.js (`node --experimental-strip-types tests/e2e/run-tests.ts` or `node tests/e2e/runner.mjs`).

---

## 2. 4-Tier Test Strategy & Coverage Specification

```
                                  ┌──────────────────────────────────────────────┐
                                  │   Tier 4: Real-World Application Scenarios   │
                                  │   (5 Multi-Step End-to-End User Journeys)   │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │  Tier 3: Cross-Feature Combinations (Pairwise)│
                                  │ (Page Nav -> Preselection -> API -> Sitemap) │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │  Tier 2: Boundary & Corner Cases (Edge Logic)│
                                  │ (Malformed email, phone bounds, 320px layout)│
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │    Tier 1: Feature Coverage (Core Matrix)     │
                                  │  (7 Main Routes, Header, Drawer, API, Sitemap)│
                                  └──────────────────────────────────────────────┘
```

---

### Tier 1: Feature Coverage (Core Functional Matrix)
*Mandatory Rule: >= 5 test cases per feature.*

#### 1. Route 1: Homepage (`/`)
- `T1-R1-01`: HTTP 200 OK & document layout shell loaded.
- `T1-R1-02`: Document title contains "Marvol" and core brand value proposition.
- `T1-R1-03`: Hero section renders primary CTA linking to savings calculator (`#kalkulacka`).
- `T1-R1-04`: Solar savings calculator renders input sliders (monthly bill, property type, battery checkbox).
- `T1-R1-05`: State subsidies banner highlights up to 4,025 € (*Zelená domácnostiam*).

#### 2. Route 2: Residential Photovoltaics (`/fotovoltika-pre-domacnosti`)
- `T1-R2-01`: HTTP 200 OK on `/fotovoltika-pre-domacnosti`.
- `T1-R2-02`: Displays €4,025 Green Households state subsidy guidance (*Zelená domácnostiam*).
- `T1-R2-03`: Features turnkey residential PV packages (e.g. 5 kWp, 10 kWp).
- `T1-R2-04`: Embeds `LeadForm` pre-selected with `initialService="fotovoltika-dom"`.
- `T1-R2-05`: Declares unique canonical URL `https://marvol.sk/fotovoltika-pre-domacnosti` and Schema.org `Service` JSON-LD.

#### 3. Route 3: Commercial Photovoltaics (`/fotovoltika-pre-firmy`)
- `T1-R3-01`: HTTP 200 OK on `/fotovoltika-pre-firmy`.
- `T1-R3-02`: Displays Green Enterprises subsidy information (*Zelená podnikom*).
- `T1-R3-03`: Explains peak shaving and commercial energy cost reduction.
- `T1-R3-04`: Embeds `LeadForm` pre-selected with `initialService="fotovoltika-firma"`.
- `T1-R3-05`: Declares canonical URL `https://marvol.sk/fotovoltika-pre-firmy` and Schema.org metadata.

#### 4. Route 4: Battery Storage BESS & Wallbox (`/bateriove-uloziska-bess`)
- `T1-R4-01`: HTTP 200 OK on `/bateriove-uloziska-bess`.
- `T1-R4-02`: Highlights industrial & residential LiFePO4 battery storage systems.
- `T1-R4-03`: Highlights UPS backup power (<20ms switchover) and EV Wallbox smart charging integration.
- `T1-R4-04`: Embeds `LeadForm` pre-selected with `initialService="baterie"`.
- `T1-R4-05`: Declares canonical URL `https://marvol.sk/bateriove-uloziska-bess` and Schema.org metadata.

#### 5. Route 5: Heat Pumps (`/tepelne-cerpadla`)
- `T1-R5-01`: HTTP 200 OK on `/tepelne-cerpadla`.
- `T1-R5-02`: Highlights air-to-water heat pumps with high seasonal coefficient of performance (COP 5.0).
- `T1-R5-03`: Details hybrid solar + heat pump energy integration.
- `T1-R5-04`: Embeds `LeadForm` pre-selected with `initialService="cerpadlo"`.
- `T1-R5-05`: Declares canonical URL `https://marvol.sk/tepelne-cerpadla` and Schema.org metadata.

#### 6. Route 6: Electrical Engineering & Revisions (`/elektroinstalacie-revizie`)
- `T1-R6-01`: HTTP 200 OK on `/elektroinstalacie-revizie`.
- `T1-R6-02`: Highlights industrial and residential electrical installations, switchboards, and lightning protection.
- `T1-R6-03`: Details official electrical inspections and revisions (východiskové a periodické revízie EZ).
- `T1-R6-04`: Embeds `LeadForm` pre-selected with `initialService="elektro"`.
- `T1-R6-05`: Declares canonical URL `https://marvol.sk/elektroinstalacie-revizie` and Schema.org metadata.

#### 7. Route 7: Dedicated Contact Page (`/kontakt`)
- `T1-R7-01`: HTTP 200 OK on `/kontakt`.
- `T1-R7-02`: Displays full statutory corporate details (§ 3a Obch. zák.: IČO 53 060 091, DIČ 2121255961, Mestský súd Žilina).
- `T1-R7-03`: Renders direct contact channels (Phone `+421 948 123 456`, Email `info@marvol.sk`, WhatsApp link).
- `T1-R7-04`: Renders interactive Google Maps embed / location card for Chotárna 3394/6, Vrútky.
- `T1-R7-05`: Embeds `LeadForm` configured with `initialService="vseobecny-kontakt"`.

#### 8. Header Hover Flyout Dropdowns
- `T1-HD-01`: "Riešenia" dropdown button rendered with accessibility markup (`aria-haspopup="true"`, `aria-expanded`).
- `T1-HD-02`: "Riešenia" dropdown contains navigation links to Domácnosti, Firmy, and Samosprávy.
- `T1-HD-03`: "Služby" dropdown button rendered with accessibility markup (`aria-haspopup="true"`, `aria-expanded`).
- `T1-HD-04`: "Služby" dropdown contains navigation links to Fotovoltika, BESS, Tepelné čerpadlá, and Elektroinštalácie.
- `T1-HD-05`: Dropdowns implement the 180ms hover bridge and `pt-2` wrapper for flicker-free zero layout shift.

#### 9. Mobile Slide-Over Navigation Drawer
- `T1-MD-01`: Mobile navigation toggle button rendered with `aria-label="Toggle Navigation"`.
- `T1-MD-02`: Drawer renders fixed slide-over overlay with `backdrop-blur-md`.
- `T1-MD-03`: Drawer enforces body scroll lock (`document.body.style.overflow = 'hidden'`) when active.
- `T1-MD-04`: Collapsible accordions present for "Riešenia" and "Služby" to expand subpage destinations.
- `T1-MD-05`: Interactive mobile touch targets meet or exceed minimum tap size (>= 44px / 48px).

#### 10. Lead Submission API (`/api/lead`)
- `T1-LA-01`: POST with valid `name` and `phone` returns HTTP 200 and a generated `leadId`.
- `T1-LA-02`: Missing `name` field returns HTTP 400 Bad Request with descriptive Slovak error message.
- `T1-LA-03`: Missing `phone` field returns HTTP 400 Bad Request with descriptive Slovak error message.
- `T1-LA-04`: Non-POST HTTP methods (GET, PUT, DELETE) return HTTP 405 with `Allow: POST` header.
- `T1-LA-05`: Valid lead records are appended safely to `data/leads.json` without data corruption.

#### 11. XML Sitemap (`public/sitemap.xml`)
- `T1-SM-01`: Valid XML document structure adhering to `http://www.sitemaps.org/schemas/sitemap/0.9`.
- `T1-SM-02`: Contains root URL `https://marvol.sk/` with `<priority>1.0</priority>`.
- `T1-SM-03`: Contains all 5 service subpages with valid priorities (`0.8` - `0.9`).
- `T1-SM-04`: Contains `/kontakt` and `/ochrana-osobnych-udajov`.
- `T1-SM-05`: Each URL entry declares a valid ISO date `<lastmod>` and `<changefreq>`.

---

### Tier 2: Boundary & Corner Cases (Edge Conditions)
*Mandatory Rule: >= 5 test cases per feature category.*

#### Category 1: Lead API & Data Validation Boundaries
- `T2-BD-01 (Malformed Email)`: Submitting invalid email formats (e.g. `invalid`, `user@`, `@example.com`, `user@domain`) returns HTTP 400.
- `T2-BD-02 (Under-Length Phone)`: Submitting a phone with fewer than 9 digits (e.g. `12345`) returns HTTP 400.
- `T2-BD-03 (Over-Length Phone)`: Submitting a phone exceeding 20 digits returns HTTP 400.
- `T2-BD-04 (Whitespace Name)`: Submitting whitespace-only name (`"   "`) returns HTTP 400.
- `T2-BD-05 (Honeypot Bot Trap)`: Submitting hidden bot fields (`b_url="http://spam.ru"` or `honeypot="bot"`) returns HTTP 200 but DOES NOT write the lead to `data/leads.json`.

#### Category 2: HTTP Protocol & Payload Boundaries
- `T2-PR-01 (Method GET)`: `GET /api/lead` returns HTTP 405.
- `T2-PR-02 (Method PUT)`: `PUT /api/lead` returns HTTP 405.
- `T2-PR-03 (Method DELETE)`: `DELETE /api/lead` returns HTTP 405.
- `T2-PR-04 (Empty JSON Body)`: Sending `{}` body returns HTTP 400.
- `T2-PR-05 (Extreme Payload)`: Submitting a 50,000-character message payload handles safely without server crash.

#### Category 3: Mobile Viewport 320px Layout Rules
- `T2-MP-01 (No Horizontal Overflow)`: Maximum content width on 320px viewport is constrained to 320px with zero horizontal scrollbar (`overflow-x-hidden`).
- `T2-MP-02 (Form Input Bounds)`: Text inputs and select dropdowns maintain `w-full` with padding inside bounds at 320px.
- `T2-MP-03 (Top Bar Stacking)`: Top Bar infolinka and status banner wrap into vertical flex column on small screens (`flex-col md:flex-row`).
- `T2-MP-04 (Drawer Max Width)`: Mobile slide-over drawer width does not exceed viewport boundaries (`max-w-sm` or `w-full`).
- `T2-MP-05 (Button Wrapping)`: Action buttons at 320px do not truncate text or overlap sibling controls.

#### Category 4: Header Navigation & Transition Boundaries
- `T2-NB-01 (Route-Aware Hash Links)`: On homepage `/`, links use `#anchor`; on subpages `/kontakt`, links dynamically become `/#anchor`.
- `T2-NB-02 (Escape Key Dismissal)`: Pressing `Escape` key closes any open desktop flyout menu.
- `T2-NB-03 (Drawer Escape Dismissal)`: Pressing `Escape` key closes the mobile slide-over drawer and restores body scrolling.
- `T2-NB-04 (Backdrop Tap Dismissal)`: Clicking the backdrop blur outside the drawer closes the drawer.
- `T2-NB-05 (Navigation Auto-Close)`: Route change event automatically closes the mobile drawer.

#### Category 5: Statutory & Subsidy Numerical Boundaries
- `T2-SB-01 (Subsidy Cap)`: Residential subsidy calculation strictly caps at €4,025 regardless of calculated capacity.
- `T2-SB-02 (Statutory IČO Formatting)`: Statutory corporate IČO is exactly `53 060 091` across all occurrences.
- `T2-SB-03 (Statutory DIČ Formatting)`: Statutory corporate DIČ is exactly `2121255961`.
- `T2-SB-04 (Statutory IČ DPH)`: IČ DPH is strictly `SK2121255961` with VAT payer confirmed.
- `T2-SB-05 (Registered Court)`: Registration statement designates `Mestský súd Žilina (pôvodne Okresný súd Žilina), oddiel: Sro, vložka č. 74765/L`.

---

### Tier 3: Cross-Feature Combinations (Pairwise Integration)

- `T3-CF-01 (Residential Page -> Lead Form Pre-Selection -> API Submission)`:
  Navigate to `/fotovoltika-pre-domacnosti` -> Verify embedded form has `service="fotovoltika-dom"` preselected -> Submit form -> Verify API records lead with correct service and source.
- `T3-CF-02 (BESS Storage Page -> Wallbox Inquiry -> JSON Persistence)`:
  Navigate to `/bateriove-uloziska-bess` -> Verify form has `service="baterie"` -> Submit with EV charging message -> Verify persistence in `data/leads.json`.
- `T3-CF-03 (Header Riešenia Dropdown -> Commercial PV Page -> B2B Form)`:
  Select "Firmy" from Header "Riešenia" dropdown -> Land on `/fotovoltika-pre-firmy` -> Form initial service is `fotovoltika-firma` -> Verify submission.
- `T3-CF-04 (Header & Footer Links <-> Sitemap 100% Parity)`:
  Extract every internal hyperlink rendered in `Header.tsx` and `Footer.tsx` -> Verify 100% of these URLs exist in `public/sitemap.xml`.
- `T3-CF-05 (Shared Layout Padding & Canonical Link Uniformity)`:
  Verify all 6 subpages (`/fotovoltika-pre-domacnosti`, `/fotovoltika-pre-firmy`, `/bateriove-uloziska-bess`, `/tepelne-cerpadla`, `/elektroinstalacie-revizie`, `/kontakt`) wrap in `<Layout>`, deliver uniform top padding (`pt-28 md:pt-36`), and set matching `<link rel="canonical">`.
- `T3-CF-06 (Mobile Drawer Accordion Navigation to Subpage)`:
  Open mobile drawer -> Expand "Služby" accordion -> Tap "Tepelné čerpadlá" -> Route changes to `/tepelne-cerpadla` -> Drawer auto-closes and body scroll unlock verified.

---

### Tier 4: Real-World Application Scenarios (End-to-End User Journeys)

#### Journey 1: Residential Homeowner Seeking €4,025 Green Households Subsidy
1. User lands on `/`.
2. Sees subsidy badge highlighting up to 4,025 € from *Zelená domácnostiam*.
3. Navigates to `/fotovoltika-pre-domacnosti`.
4. Inspects 10 kWp turnkey package with subsidy guidance.
5. Fills lead form:
   - Name: `Ján Kováč`
   - Phone: `+421 905 123 456`
   - Email: `jan.kovac@example.sk`
   - Service: `fotovoltika-dom`
   - GDPR consent: `true`
6. Submits form -> Receives HTTP 200 with confirmation `leadId`.
7. Verifies lead record stored in `data/leads.json`.

#### Journey 2: Commercial Factory CFO Seeking Peak Shaving & Green Enterprises Subsidy
1. Industrial CFO accesses site looking to cut factory demand peak charges.
2. Hovers Header "Riešenia", clicks "Firmy" -> Lands on `/fotovoltika-pre-firmy`.
3. Reviews commercial B2B cases and *Zelená podnikom* subsidy terms.
4. Fills inquiry:
   - Name: `Ing. Peter Novák (CFO)`
   - Phone: `+421 911 888 777`
   - Email: `novak@vyroba-stred.sk`
   - City: `Žilina`
   - Service: `fotovoltika-firma`
   - Message: `Dopytujeme 150 kWp inštaláciu s batériovým úložiskom na vykrývanie špičiek.`
5. Submits form -> System logs lead with `source="fotovoltika-pre-firmy"`.

#### Journey 3: EV Owner Integrating LiFePO4 BESS Storage & Smart Wallbox
1. User with electric vehicle wants solar charging and home backup.
2. Hovers Header "Služby", clicks "Batériové úložiská BESS & Wallbox" -> Lands on `/bateriove-uloziska-bess`.
3. Inspects LiFePO4 battery safety parameters and UPS 20ms switchover.
4. Fills inquiry:
   - Name: `Marek Šimon`
   - Phone: `0948999111`
   - Service: `baterie`
   - Message: `Mám záujem o 10 kWh batériu a 22 kW Wallbox pre nabíjanie elektromobilu.`
5. Submits form -> Validated and persisted.

#### Journey 4: New Home Builder Inquiring About Hybrid Heat Pump & PV on Mobile (375px)
1. User accesses site on iPhone (375px viewport).
2. Taps mobile menu hamburger button -> Slide-over drawer opens with backdrop blur.
3. Expands "Služby" accordion -> Taps "Tepelné čerpadlá".
4. Lands on `/tepelne-cerpadla`; drawer closes smoothly.
5. Reviews COP 5.0 efficiency and floor heating integration.
6. Fills lead form with pre-selected `cerpadlo`.
7. Submits inquiry -> Receives confirmation dialog.

#### Journey 5: B2B Procurement Auditor Conducting Statutory & Compliance Due Diligence
1. Legal / procurement officer verifies company legitimacy before signing contract.
2. Navigates to `/kontakt` and `/ochrana-osobnych-udajov`.
3. Validates:
   - Commercial name: `Marvol s. r. o.`
   - Registered address: `Chotárna 3394/6, 038 61 Vrútky`
   - IČO: `53 060 091`
   - DIČ: `2121255961`
   - IČ DPH: `SK2121255961`
   - Registry: `Mestský súd Žilina (pôvodne Okresný súd Žilina), oddiel: Sro, vložka č. 74765/L`
   - Contact phone: `+421 948 123 456`
   - Official email: `info@marvol.sk`
4. Validates interactive Google Maps embed container.
5. Submits general contact inquiry -> Lead recorded with `service="vseobecny-kontakt"`.

---

## 3. Test Runner Architecture & Execution

The test suite is located in `tests/e2e/` and organized into dedicated modules:

- `tests/e2e/types.ts`: TypeScript contracts for test definitions, assertions, diagnostic reports, and test results.
- `tests/e2e/tier1-features.ts`: Tier 1 Feature Coverage tests (All 7 routes, header dropdowns, mobile drawer, API, sitemap).
- `tests/e2e/tier2-boundaries.ts`: Tier 2 Boundary & Corner cases (Email regex, phone lengths, honeypot traps, 320px viewport, HTTP methods).
- `tests/e2e/tier3-cross-feature.ts`: Tier 3 Cross-feature combinations (Pairwise subpage form binding, sitemap link parity, layout consistency).
- `tests/e2e/tier4-scenarios.ts`: Tier 4 End-to-end user journeys (5 realistic real-world persona journeys).
- `tests/e2e/run-tests.ts`: Central test runner supporting command-line arguments, pass/fail summaries, and diagnostic output.
- `tests/e2e/runner.mjs`: Standalone runner launcher compatible with standard Node.js.

### Execution Commands

```bash
# Run the complete test suite (Tiers 1-4) in default mode
node --experimental-strip-types tests/e2e/run-tests.ts

# Run with standard Node.js wrapper
node tests/e2e/runner.mjs

# Run specific tier
node --experimental-strip-types tests/e2e/run-tests.ts --tier=1
node --experimental-strip-types tests/e2e/run-tests.ts --tier=2
node --experimental-strip-types tests/e2e/run-tests.ts --tier=3
node --experimental-strip-types tests/e2e/run-tests.ts --tier=4

# Run in strict mode (fails on pending milestone features)
node --experimental-strip-types tests/e2e/run-tests.ts --strict

# Run against live HTTP server on port 3000
TEST_BASE_URL=http://localhost:3000 node --experimental-strip-types tests/e2e/run-tests.ts

# Type-check the test suite and entire codebase
npx tsc --noEmit
```

### Exit Codes & Semantics
- `0`: All active tests passed successfully. Any pending features are documented with diagnostic guidance.
- `1`: One or more active tests failed (or in `--strict` mode, any pending milestone feature was detected).
