# TEST_INFRA: Marvol s.r.o. E2E Test Suite & Infrastructure Architecture

## 1. Architectural Principles & Philosophy

The Marvol s.r.o. web application (`preview` branch) requires zero-defect quality across client conversion, multi-page routing, state subsidy guidance (SIEA *Zelená domácnostiam* & *Zelená podnikom*), solar savings calculator formulas, responsive navigation, authentic 16:9 widescreen photography, and technical SEO. The test suite follows these core principles:

1. **Opaque-Box Requirement-Driven Testing**:
   Tests assert against observable external behavior without coupling to transient implementation trivia:
   - HTTP status codes (200, 400, 405) across all 13 application routes.
   - Rendered DOM structures and accessibility attributes (`aria-haspopup`, `aria-expanded`, `role="menu"`, touch target sizes >= 44px).
   - Schema.org JSON-LD structured data compliance (`LocalBusiness`, `Service`, `Store`, `OfferCatalog`, `BreadcrumbList`, `FAQPage`).
   - Authentic 16:9 photographic asset integrity in `public/images/` (> 100 KB per photo, valid dimensions, zero external unsplash placeholders).
   - Solar savings calculator formulas (kWp recommendation, annual € savings bounded by physical solar generation, SIEA vouchers up to 1 150 € / 4 600 €, payback years).
   - Lead intake payload contracts, honeypot bot trap isolation (`b_url`, `honeypot`), phone regex validation, and lossless persistence in `data/leads.json`.

2. **Progressive Testability & Strict Zero-Defect Standards**:
   - Every single test case exercises real, executable logic.
   - Zero facade tests, zero dummy passes, zero unchecked edge conditions.
   - Built with `--strict` mode to verify 100% pass rate with 0 pending and 0 failed assertions.

3. **Dual Execution Runtime**:
   - **In-Process Mode (`node tests/e2e/run-all.mjs`)**: Rapid, deterministic execution (~80ms for 135 tests) importing Next.js API route handlers, component tree contracts, XML sitemaps, and authentic assets.
   - **Live HTTP Mode (`TEST_BASE_URL=http://localhost:3000 node tests/e2e/run-all.mjs`)**: Dispatches real network fetch calls against a running local Next.js server.
   - Runs with zero external test framework bloat using native Node.js and lightweight JITI TypeScript loader.

---

## 2. 4-Tier Test Strategy & Coverage Specification

```
                                  ┌──────────────────────────────────────────────┐
                                  │   Tier 4: Real-World Application Workflows   │
                                  │      (10 Full End-to-End User Journeys)      │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │  Tier 3: Cross-Feature Integration (Pairwise)│
                                  │(Toggles, Prefill Bridge, Parity, Schema.org) │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │  Tier 2: Boundary & Corner Cases (Edge Logic)│
                                  │ (Validation, Honeypot, 320px, Stat. Bounds)  │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                  ┌──────────────────────┴───────────────────────┐
                                  │    Tier 1: Feature Coverage (Core Matrix)    │
                                  │(13 Routes, Images, Math, Header, API, Sitemap)│
                                  └──────────────────────────────────────────────┘
```

Total Test Cases: **135 test cases** (exceeding the >= 127 requirement).

---

### Tier 1: Feature Coverage (75 Test Cases, >= 5 per feature)

#### 1. Route `/` (Homepage): 5 Tests
- `T1-R1-01`: Valid Next.js page structure and default export.
- `T1-R1-02`: Brand identity & Marvol value proposition.
- `T1-R1-03`: Primary Hero CTA anchoring to `#kalkulacka`.
- `T1-R1-04`: Interactive calculator controls (monthly bill slider, property type, battery checkbox).
- `T1-R1-05`: SIEA state subsidy guidance transparency (1 150 € / 4 600 € / 4 025 € / 90% solidarita).

#### 2. Route `/fotovoltika-pre-domacnosti`: 5 Tests
- `T1-R2-01`: Residential PV subpage exists and exports React component.
- `T1-R2-02`: Green Households state subsidy guidance (*Zelená domácnostiam*).
- `T1-R2-03`: Turnkey residential packages (5 kWp, 10 kWp hybrid).
- `T1-R2-04`: Embeds `LeadForm` preselected with `initialService="fotovoltika-dom"`.
- `T1-R2-05`: Declares canonical path and Layout wrapper.

#### 3. Route `/fotovoltika-pre-firmy`: 5 Tests
- `T1-R3-01`: Commercial PV subpage exists and exports React component.
- `T1-R3-02`: Green Enterprises subsidy guidance (*Zelená podnikom*).
- `T1-R3-03`: Peak shaving and commercial energy cost reduction.
- `T1-R3-04`: Embeds `LeadForm` preselected with `initialService="fotovoltika-firma"`.
- `T1-R3-05`: Declares canonical path and Layout wrapper.

#### 4. Route `/bateriove-uloziska-bess`: 5 Tests
- `T1-R4-01`: BESS battery storage subpage exists and exports React component.
- `T1-R4-02`: LiFePO4 battery chemistry, cycle life, and safety specs.
- `T1-R4-03`: UPS backup switchover (<20ms) and EV Wallbox smart charging integration.
- `T1-R4-04`: Embeds `LeadForm` preselected with `initialService="baterie"`.
- `T1-R4-05`: Declares canonical path and Layout wrapper.

#### 5. Route `/tepelne-cerpadla`: 5 Tests
- `T1-R5-01`: Heat Pumps subpage exists and exports React component.
- `T1-R5-02`: Air-to-water seasonal coefficient of performance (COP 5.0).
- `T1-R5-03`: Hybrid solar PV + heat pump synergy.
- `T1-R5-04`: Embeds `LeadForm` preselected with `initialService="cerpadlo"`.
- `T1-R5-05`: Declares canonical path and Layout wrapper.

#### 6. Route `/elektroinstalacie-revizie`: 5 Tests
- `T1-R6-01`: Electrical engineering subpage exists and exports React component.
- `T1-R6-02`: Industrial and residential switchboards and lightning protection.
- `T1-R6-03`: Official electrical inspection reports (revízie EZ).
- `T1-R6-04`: Embeds `LeadForm` preselected with `initialService="elektro"`.
- `T1-R6-05`: Declares canonical path and Layout wrapper.

#### 7. Route `/kontakt`: 5 Tests
- `T1-R7-01`: Dedicated contact page exists and exports React component.
- `T1-R7-02`: Statutory corporate details (§ 3a Obch. zák.: IČO 53 060 091, DIČ 2121255961, Mestský súd Žilina).
- `T1-R7-03`: Direct communication channels (phone, email, WhatsApp).
- `T1-R7-04`: Interactive map embed container.
- `T1-R7-05`: Embeds `LeadForm` configured with `initialService="vseobecny-kontakt"`.

#### 8. Header Dropdowns: 5 Tests
- `T1-HD-01`: "Fotovoltika" dropdown button with accessibility attributes.
- `T1-HD-02`: "Fotovoltika" flyout links to Domácnosti, Firmy, and BESS.
- `T1-HD-03`: "Služby" dropdown button with accessibility attributes.
- `T1-HD-04`: "Služby" flyout links to all 5 `/sluzby/*` subpages.
- `T1-HD-05`: Direct top-level links to `/eshop` and `/kontakt` with hover bridge.

#### 9. Mobile Drawer: 5 Tests
- `T1-MD-01`: Mobile menu button has accessible `aria-label`.
- `T1-MD-02`: Drawer renders backdrop blur overlay.
- `T1-MD-03`: Drawer locks body scroll when open.
- `T1-MD-04`: Expandable accordions for subpages.
- `T1-MD-05`: Tap targets meet touch standard (>= 44px / 48px).

#### 10. Lead Ingestion API (`/api/lead`): 5 Tests
- `T1-LA-01`: Valid POST payload returns HTTP 200 + `leadId`.
- `T1-LA-02`: Missing `name` returns HTTP 400 Bad Request.
- `T1-LA-03`: Missing `phone` returns HTTP 400 Bad Request.
- `T1-LA-04`: GET method rejected with HTTP 405 Method Not Allowed.
- `T1-LA-05`: Valid lead persisted to `data/leads.json` without data loss.

#### 11. XML Sitemap (`public/sitemap.xml`): 5 Tests
- `T1-SM-01`: Conforms to sitemaps.org XML schema.
- `T1-SM-02`: Declares root homepage URL with priority 1.0.
- `T1-SM-03`: Includes all 5 specialized `/sluzby/*` service subpages and 5 solution pages.
- `T1-SM-04`: Includes `/eshop`, `/kontakt`, and `/ochrana-osobnych-udajov` (14 URLs total).
- `T1-SM-05`: Declares valid ISO date `<lastmod>` and `<changefreq>`.

#### 12. Route `/eshop`: 5 Tests
- `T1-ES-01`: E-Shop page exists, exports default component, and wraps with Layout.
- `T1-ES-02`: Hero banner renders wholesale & retail positioning.
- `T1-ES-03`: Category grid renders all 6 product categories.
- `T1-ES-04`: Interactive product cards render with filter controls and dual price display.
- `T1-ES-05`: Dual checkout CTAs present and 4-pillar growth roadmap rendered.

#### 13. Route `/sluzby/*`: 5 Tests
- `T1-SS-01`: `/sluzby/navrh-projektu` details 3D shading & engineering, embeds LeadForm.
- `T1-SS-02`: `/sluzby/instalacia-montaz` details turnkey installation & roof anchoring, embeds LeadForm.
- `T1-SS-03`: `/sluzby/konzultacie-poradenstvo` details energy audit & ROI, embeds LeadForm.
- `T1-SS-04`: `/sluzby/protipoziarna-ochrana-bezpecne-napatie` details Rapid Shutdown & AFCI, embeds LeadForm.
- `T1-SS-05`: `/sluzby/revizie-dotacie` details OPOS revision report & SIEA subsidy administration, embeds LeadForm.

#### 14. Authentic 16:9 Imagery (`public/images/`): 5 Tests
- `T1-IM-01`: Residential & commercial PV authentic photos exist and meet size thresholds (> 100 KB).
- `T1-IM-02`: BESS battery storage & Heat Pump authentic photos exist and meet size thresholds.
- `T1-IM-03`: Electrical switchboard & Showroom contact photos exist and meet size thresholds.
- `T1-IM-04`: All 5 service workflow step photos exist in `public/images/sluzby/`.
- `T1-IM-05`: Authentic images are wired in core components without external placeholder domains.

#### 15. Solar Calculator Math: 5 Tests
- `T1-CM-01`: Recommended kWp formula: `monthlyBill / 16 + (EV ? 1.5 : 0) + (HP ? 2.0 : 0)`, clamped to [3.0, 250].
- `T1-CM-02`: Annual savings ceiling strictly bounded by physics (`recommendedKwp * 1050 * 0.22`).
- `T1-CM-03`: Self-consumption rate accurately models 78% with battery vs 55% without battery.
- `T1-CM-04`: SIEA subsidy formula accurately applies 575 €/kW capped at 1 150 € for residential PV.
- `T1-CM-05`: Net price and payback period formulas produce positive finite numbers.

---

### Tier 2: Boundary & Corner Cases (37 Test Cases)

#### Lead API Boundaries (5 tests)
- `T2-BD-01`: Malformed email formats rejected with HTTP 400.
- `T2-BD-02`: Under-length phone (< 9 chars) rejected with HTTP 400.
- `T2-BD-03`: Over-length phone (> 20 chars) rejected with HTTP 400.
- `T2-BD-04`: Whitespace-only name rejected with HTTP 400.
- `T2-BD-05`: Honeypot bot trap returns 200 OK without saving to `leads.json`.

#### HTTP Protocol Boundaries (5 tests)
- `T2-PR-01`: GET method returns HTTP 405 Method Not Allowed.
- `T2-PR-02`: PUT method returns HTTP 405 Method Not Allowed.
- `T2-PR-03`: DELETE method returns HTTP 405 Method Not Allowed.
- `T2-PR-04`: Empty JSON body `{}` returns HTTP 400 Bad Request.
- `T2-PR-05`: Oversized payload (50,000 characters) handled safely without crash.

#### 320px Mobile Viewport Layout Rules (7 tests)
- `T2-MP-01`: Top bar elements stack vertically (`flex-col md:flex-row`).
- `T2-MP-02`: Container paddings avoid negative margins on 320px.
- `T2-MP-03`: LeadForm inputs maintain fluid full width (`w-full`).
- `T2-MP-04`: Mobile drawer width constrained to viewport bounds (`max-w-sm` or `w-full`).
- `T2-MP-05`: Action CTA buttons allow flexible text wrapping on narrow viewports.
- `T2-MP-06`: E-Shop product cards and category grid enforce responsive column wrapping without clipping on 320px.
- `T2-MP-07`: Dual action buttons stack vertically or use responsive flex layout without text overlap at 320px.

#### Navigation Transitions (5 tests)
- `T2-NB-01`: Header uses Next.js `useRouter` for route-aware anchor link switching.
- `T2-NB-02`: Header listens to Escape key to dismiss active flyout menus.
- `T2-NB-03`: Escape key dismisses mobile drawer and restores body scroll.
- `T2-NB-04`: Clicking backdrop dismisses mobile drawer modal.
- `T2-NB-05`: Route changes automatically dismiss open mobile drawer.

#### Statutory & Subsidy Boundaries (5 tests)
- `T2-SB-01`: Green Households subsidy calculation is capped at current SIEA regulation.
- `T2-SB-02`: Statutory corporate IČO is strictly "53 060 091".
- `T2-SB-03`: Statutory corporate DIČ is strictly "2121255961".
- `T2-SB-04`: Statutory corporate IČ DPH is strictly "SK2121255961" with vatPayer=true.
- `T2-SB-05`: Commercial registration designates Mestský súd Žilina Sro 74765/L.

#### E-Shop & Service Boundaries (5 tests)
- `T2-ES-01`: Filter combination yielding 0 products renders accessible empty-state with reset button.
- `T2-ES-02`: Extreme power range filter (> 50 kWp or edge power) handles cleanly without NaN.
- `T2-ES-03`: Dual price calculation integrity (`Cena s DPH == round(Cena bez DPH * 1.20 * 100) / 100`).
- `T2-SL-01`: All 5 new service subpages pass valid non-empty initialService prop to LeadForm.
- `T2-SL-02`: `/api/lead` accepts inquiries with service values from `/sluzby/*` pages without error.

#### Calculator Boundary Inputs (5 tests)
- `T2-CB-01`: Minimum monthly bill (50 €) yields valid clamped 3.0 kWp minimum system and non-negative savings.
- `T2-CB-02`: Upper residential bill boundary (800 €) yields valid residential system size.
- `T2-CB-03`: Upper commercial bill boundary (3 000 €) calculates large-scale B2B solar array up to 250 kWp.
- `T2-CB-04`: Zero or anomalous input values fall back safely to minimum bounds without division by zero.
- `T2-CB-05`: High-power EV Wallbox toggle boundary adds exactly 1.5 kWp to recommended system size.

---

### Tier 3: Cross-Feature Integration (13 Test Cases)

- `T3-CF-01`: Residential Subpage -> Preselected LeadForm -> Lead API Storage.
- `T3-CF-02`: BESS Battery Subpage -> Preselected LeadForm -> Battery & EV Wallbox Inquiry.
- `T3-CF-03`: Commercial Subpage -> Preselected LeadForm -> B2B Peak Shaving Inquiry.
- `T3-CF-04`: Header & Footer internal links <-> Sitemap 100% Parity.
- `T3-CF-05`: Shared Layout Shell Contract across Subpages.
- `T3-CF-06`: Mobile Drawer Accordion Navigation Flow.
- `T3-CF-07`: E-Shop Product Card -> "Kúpiť s kompletnou montážou" -> opens LeadForm pre-filled -> API persistence.
- `T3-CF-08`: Header "Služby" Dropdown -> `/sluzby/protipoziarna-ochrana-bezpecne-napatie` -> LeadForm pre-selection -> API persistence.
- `T3-CF-09`: Header & Footer internal links <-> Updated Sitemap 100% Parity across all 14 routes.
- `T3-CF-10`: Schema.org validation (`Store`, `OfferCatalog`, and `Service` JSON-LD).
- `T3-CF-11`: Residential PV + BESS toggle integration: verifies 78% self-consumption rate and battery pricing.
- `T3-CF-12`: PV + Heat pump toggle integration: verifies SIEA subsidy guidance and combined subsidy ceiling.
- `T3-CF-13`: Calculator-to-lead prefill flow: verifies full calculator telemetry serializes into Lead API payload.

---

### Tier 4: Real-World Application Workflows (10 End-to-End User Journeys)

- `T4-SC-01 (Journey 1)`: Residential Homeowner (SIEA Subsidy + Turnkey Package).
- `T4-SC-02 (Journey 2)`: Commercial Factory CFO (Peak Shaving & B2B Invoicing).
- `T4-SC-03 (Journey 3)`: EV Owner (LiFePO4 Storage & Smart Wallbox Integration).
- `T4-SC-04 (Journey 4)`: Mobile User (Heat Pump & Hybrid Solar Integration).
- `T4-SC-05 (Journey 5)`: B2B Compliance Auditor (Statutory & Legal Verification).
- `T4-SC-06 (Journey 6)`: B2B Solar Installer Wholesale Procurement & Roadmap Inquiry.
- `T4-SC-07 (Journey 7)`: Commercial Property Developer Fire Safety Due Diligence.
- `T4-SC-08 (Journey 8)`: E-Shop Visitor Converting to Turnkey Subsidy Installation.
- `T4-SC-09 (Journey 9)`: Homeowner Solar & BESS Configuration Flow with prefill bridge.
- `T4-SC-10 (Journey 10)`: Commercial Factory Turnkey Solar Consultation with peak shaving.

---

## 3. Test Runner Architecture & Execution

The test suite resides in `tests/e2e/`:
- `tests/e2e/types.ts`: TypeScript contracts for test definitions, assertions, diagnostic reports, and test results.
- `tests/e2e/helpers.ts`: In-process request/response mock factories, sitemap parser, and filesystem helpers.
- `tests/e2e/tier1-features.ts`: Tier 1 Feature Coverage tests (75 tests).
- `tests/e2e/tier2-boundaries.ts`: Tier 2 Boundary & Corner cases (37 tests).
- `tests/e2e/tier3-cross-feature.ts`: Tier 3 Cross-feature integration tests (13 tests).
- `tests/e2e/tier4-scenarios.ts`: Tier 4 End-to-end user journeys (10 tests).
- `tests/e2e/run-tests.ts`: Central runner engine.
- `tests/e2e/run-all.mjs`: Node executable runner.
- `tests/e2e/runner.mjs`: Backward-compatible Node runner.

### Commands

```bash
# Execute complete E2E test suite (135 tests)
node tests/e2e/run-all.mjs

# Execute in strict mode
node tests/e2e/run-all.mjs --strict

# Execute individual tiers
node tests/e2e/run-all.mjs --tier=1
node tests/e2e/run-all.mjs --tier=2
node tests/e2e/run-all.mjs --tier=3
node tests/e2e/run-all.mjs --tier=4

# Filter tests by keyword
node tests/e2e/run-all.mjs --filter=calculator
node tests/e2e/run-all.mjs --filter=imagery

# Output machine-readable JSON summary
node tests/e2e/run-all.mjs --json

# Verify zero TypeScript compile errors
npx tsc --noEmit
```
