# 📊 MARVOL s.r.o. – Evidencia prác, upgradov a fakturačný ledger

Tento dokument slúži ako **oficiálny a transparentný denník všetkých realizovaných aktivít, upgradov, technických riešení a rozšírení** na projekte **Marvol s.r.o.** pre potreby presného a kamarátskeho nacenenia.

- **Klient:** Marvol s.r.o.
- **Dodávateľ & Technický architekt:** Ing. Matej Machej (`mamachej@gmail.com`)
- **Dohodnutá partnerská sadzba:** **25,00 € / hod.** *(Trhová cena senior vývojára: 50 – 75 € / hod.)*
- **Pravidelná mesačná licencia:** **30,00 € / mesiac** (software, AI modely & nástroje)

---

## 1. Prehľad realizovaných aktivít a rozšírení

| ID | Kategória / Modul | Popis činnosti, upgradu a rozšírenia | Rozsah / Hod. | Partnerská cena (25 €/h) | Komerčná hodnota | Stav |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **ACT-01** | **Základný WEB** | Kompletný vývoj responzívneho Next.js webu, Tailwind CSS v4, dark/light glassmorphism estetika, podstránky, SEO štruktúra a Vercel CDN deployment. | *Fixný balík* | **400,00 €** | 1 500,00 € | ✅ Hotovo |
| **ACT-02** | **Servisný režim** | Vývoj samostatnej maintenance stránky (`pages/index.tsx`), zachovanie SEO autority, firemných kontaktov a IČO pred spustením plného webu. | 2,0 h | **50,00 €** | 150,00 € | ✅ Hotovo |
| **ACT-03** | **Úpravy kalkulácie (CK)** | Iteratívne úpravy, testovanie a ladenie výpočtovej logiky cenovej ponuky (4h + 1h + 3h + 1h). | 9,0 h | **225,00 €** | 550,00 € | ✅ Hotovo |
| **ACT-04** | **Aplikácia CK & Scraper** | Samostatná HTML/JS kalkulačka, scraper katalógu Krannich Solar (panely, striedače, batérie, optimizéry), generovanie A4 PDF cenovej ponuky s rozpisom DPH, Google Drive synchronizačný daemon. | 14,0 h | **350,00 €** | 1 500,00 € | ✅ Hotovo |
| **ACT-05** | **Google ekosystém** | Založenie a optimalizácia Google Profil firmy (Mapy), GA4 meranie, Google Search Console, overenie domény a sitemapy. | 3,0 h | **75,00 €** | 200,00 € | ✅ Hotovo |
| **ACT-06** | **DNS & SSL Infraštruktúra** | Websupport DNS správa, Anycast A a CNAME smerovanie na Vercel, riešenie konfliktov, MX záznamy pre e-maily, SPF, DMARC, TLS Let's Encrypt certifikáty pre `marvol.sk` aj `www.marvol.sk`. | 2,0 h | **50,00 €** | 150,00 € | ✅ Hotovo |
| **ACT-07** | **Resend Transakčné Maily** | Overenie domény cez DKIM, konfigurácia Resend API a SMTP relay, implementácia responzívnej HTML notifikácie nového dopytu s klikateľným volaním. | 2,0 h | **50,00 €** | 150,00 € | ✅ Hotovo |
| **ACT-08** | **GDPR Cookies Consent** | Cookie lišta podľa EÚ regulácií s integráciou Google Consent Mode v2, možnosť odmietnutia a dodatočnej zmeny preferencií. | 2,0 h | **50,00 €** | 120,00 € | ✅ Hotovo |
| **ACT-09** | **CyberSecurity Hardening** | Nastavenie HTTP hlavičiek (HSTS 2 roky, CSP, X-Frame DENY, nosniff, Permissions), in-memory IP Rate Limiting (5/10 min), honeypot pasca na botov, ochrana pred CRLF a XSS injection, aktualizácia Next.js na 16.4.5 (0 CVE chýb, 164/164 testov). | 4,0 h | **100,00 €** | 500,00 € | ✅ Hotovo |
| **ACT-10** | **CRM & Spracovanie Leadov** | Dátová štruktúra leadov (JSON backend / log), enrichnuté parametre z kalkulačky (spotreba, kWp, úspory), prevencia straty kontaktov. | 2,0 h | **50,00 €** | 150,00 € | ✅ Hotovo |
| **ACT-11** | **Autor webu & Branding** | Implementácia podpisu autora do päty (`Ing. Matej Machej`, `mamachej@gmail.com`) na vetvách `main` aj `preview`, úprava full-width slideru partnerov. | 1,0 h | *Zahrnuté v balíku (0 €)* | 50,00 € | ✅ Hotovo |
| **ACT-12** | **Anti-Slop refaktoring dizajnu & Impeccable Critique (`components/`)** | Hĺbkový audit dizajnu podľa štandardov `/design-taste-frontend` (tasteskill v2) a Impeccable Critique. Kompletná eliminácia 100 % zakázaných AI-slop vzorov v komponentoch: odstránené ambient multicolour glow efekty v Hero a kalkulačke, zrušené lacné gradienty v SubsidyBanner v prospech čistej architektonickej plochy (amber-400), odstránené tiene (drop shadows) z odpočívajúcich kariet, odstránené hairlines (1px rámiky) a nahradené prirodzeným tone-step krokovaním plôch, eliminácia tiny tracked uppercase micro-labelov a kickerov. Dosiahnuté skóre 0 FAIL naprieč všetkými 48 komponentmi, typová kontrola `tsc --noEmit` s 0 chybami. | 1,5 h | **37,50 €** | 220,00 € | ✅ Hotovo |
| **ACT-13** | **Úprava portfólia služieb** | Dočasné odstránenie ponuky a možnosti výberu tepelných čerpadiel naprieč celým webom: odstránený toggle prepínač a výpočet z interaktívnej kalkulačky (`CalculatorSection`), vyčistená desktopová a mobilná navigácia (`Header`), aktualizované portfólio na 3 hlavné piliere (fotovoltika, BESS batérie, elektroinštalácie & revízie v `ServicesSection`), odstránenie z dopytových formulárov (`LeadForm`, `ContactSection`), úprava dotačného banneru a FAQ (nahradenie dotácie 4 600 € na TČ presnou fotovoltickou a B2B schémou Zelená podnikom). Overené cez anti-slop linter (0 FAIL) a `tsc --noEmit`. | 1,0 h | **25,00 €** | 150,00 € | ✅ Hotovo |
| **ACT-14** | **GDPR & Cookie Compliance v2.0** | Kompletný redesign a technický refaktoring cookie lišty pre 100% zosúladenie so slovenským Zákonom o elektronických komunikáciách (§ 109 ods. 8 zákona č. 452/2021 Z. z.) a GDPR. Implementácia rovnocenných tlačidiel „Prijať všetky“ a „Odmietnuť všetky“ bez dark patterns, rozdelenie do 4 kategórií, zoznam konkrétnych cookies a expirácií v lište i v zásadách na webe, trvalé odvolanie súhlasu, striktné Google Consent Mode v2 default denied načítavanie v hlavičke (`_document.tsx`) a backendový audit log súhlasov (`/api/consent`) s anonymizovanou IP preukázateľný pri kontrole ÚOOÚ a Telekomunikačného úradu. | 1,5 h | **37,50 €** | 250,00 € | ✅ Hotovo |
| **ACT-15** | **CI/CD & Vercel Lockfile Sync** | Vyriešenie zlyhania buildu na Verceli (`ERR_PNPM_OUTDATED_LOCKFILE`) po aktualizácii Next.js na verziu 16.4.5. Kompletná resynchronizácia `pnpm-lock.yaml`, overenie `pnpm install --frozen-lockfile` a redeployment na vetvy `main` aj `preview`. | 0,5 h | *V rámci technickej garancie (0 €)* | 50,00 € | ✅ Hotovo |

---

## 2. Finančný súhrn (Aktuálna bilancia)

- **Celkový počet odpracovaných hodín:** **44,0 hodín + základný balík webu**
- **Jednorazová suma pri kamarátskej sadzbe (25 €/h):** **1 500,00 €**
- **Reálna trhová hodnota (komerčná agentúra):** **~5 490,00 €**
- **Odhadovaná úspora pre Marvol s.r.o.:** **~3 990,00 € (úspora cca 73 %)**

### Pravidelné mesačné položky:
- **Licencia program / nástroje:** **30,00 € / mesiac**
- **Hosting (Vercel + Resend):** **0,00 € / mesiac** (v bezplatnom limite)

---

## 3. Pravidlo pre zaznamenávanie budúcich úprav
*Každá ďalšia nová aktivita, požiadavka klienta (úprava kalkulačky, nové podstránky, napojenie Raynet CRM, ďalšie automatizácie) sa automaticky zaeviduje do tejto tabuľky s presným počtom hodín, popisom a cenou.*
