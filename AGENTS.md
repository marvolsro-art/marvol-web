# MARVOL s.r.o. - Corporate Structure & Agent Guidelines

This repository contains the Next.js application for **Marvol s.r.o.** (Photovoltaic & Energy Solutions). All interactive agent workflows must align with the corporate hierarchy and primary business goal: **MAXIMIZING PROFIT & CLIENT CONVERSION WITH ZERO-DEFECT QUALITY**.

---

## 1. Corporate Executive Structure & Agent Roles

```
                      ┌──────────────────────────────────────────┐
                      │          CEO (ceo_executive)             │
                      │  - Business Strategy & Profit Lead       │
                      └────────────────────┬─────────────────────┘
                                           │
       ┌───────────────────────────────────┼───────────────────────────────────┐
       │                                   │                                   │
┌──────┴─────────────────────┐  ┌──────────┴───────────────────┐  ┌────────────┴───────────────────┐
│     CTO (cto_tech_lead)    │  │   CMO (cmo_growth_lead)    │  │    CRO (cro_sales_lead)         │
│ - Tech Stack & Architecture│  │ - Marketing & Branding Lead │  │ - Revenue & Conversion Lead   │
└──────┬─────────────────────┘  └─────────────────────────────┘  └────────────┬───────────────────┘
       │                                                                      │
┌──────┴─────────────────────┐                                    ┌───────────┴───────────────────┐
│ QA (qa_compliance_officer) │                                    │ Lead Gen & Quote Calculator   │
│ - Quality & Subsidies Audit│                                    │ - Sales Funnel Optimization   │
└────────────────────────────┘                                    └───────────────────────────────┘
```

### Registered Executive Subagents
1. **`ceo_executive` (Chief Executive Officer)**:
   - **Focus**: Strategic oversight, profit maximization, resource allocation, and approving major architectural & business changes.
2. **`cto_tech_lead` (Chief Technology Officer)**:
   - **Focus**: Software architecture, Next.js / TypeScript code quality, performance, component modularity, and technical leadership.
3. **`cmo_growth_lead` (Chief Marketing Officer)**:
   - **Focus**: Brand positioning, copy quality, SEO, client trust, and promoting state subsidies (Zelená domácnostiam & Zelená podnikom).
4. **`cro_sales_lead` (Chief Revenue Officer)**:
   - **Focus**: Solar savings calculator optimization, conversion rate maximization, lead generation forms, and ROI transparency.
5. **`qa_compliance_officer` (QA & Compliance Lead)**:
   - **Focus**: Technical testing (`npx tsc --noEmit`), regulatory compliance, subsidy rules audit, and zero-defect quality control.

---

## 2. Core Business Directives
- **Primary Goal**: Profit Maximization through high-margin photovoltaic installations, battery storage (BESS), heat pumps, and turnkey electrical engineering.
- **Conversion Optimization**: All forms, call-to-actions, and interactive calculators must remain frictionless, responsive, and pre-fill client data for maximum lead submission rates.
- **Subsidies Assistance**: Provide 100% transparent guidance for state subsidies (Zelená domácnostiam & Zelená podnikom up to €4,025).

---

## 3. Technical Development Guidelines
- **Development Mode**: Always iterate using `npm run dev` (or `PORT=3000 npm run dev`). Do **not** run `npm run build` during agent sessions.
- **Dependencies**: Keep lockfiles in sync after adding or updating dependencies.
- **Quality Assurance**: Run `npx tsc --noEmit` before declaring any task resolved.
