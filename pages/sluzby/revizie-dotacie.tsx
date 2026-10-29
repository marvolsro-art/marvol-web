import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';
import {
  SunIcon,
  BoltIcon,
  ShieldIcon,
  FileTextIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  BuildingOfficeIcon,
  CurrencyEuroIcon,
  StarIcon,
  ClockIcon
} from '@/components/icons';

export default function RevizieDotacie() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeSubsidyTab, setActiveSubsidyTab] = useState<'standard' | 'orko' | 'solidarita' | 'firmy'>('standard');

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Revízie, servis & Dotácie SIEA', href: '/sluzby/revizie-dotacie' },
  ];

  const subsidyTiers = {
    standard: {
      title: 'Zelená domácnostiam – Štandardná dotácia',
      rate: '500 € / kW inštalovaného výkonu',
      maxCap: 'Max. 1 500 € (bez batérie) / až 4 025 € (hybrid s batériou)',
      eligibility: 'Vlastníci rodinných domov na celom území SR (vrátane Bratislavského kraja)',
      points: [
        'Príspevok 500 € za každý 1 kW inštalovaného výkonu fotovoltiky',
        'Pri spotrebe do 3 500 kWh/rok max. 2 kW (1 000 €)',
        'Pri spotrebe nad 3 500 kWh/rok max. 3 kW (1 500 €)',
        'Odpočítanie sumy dotácie priamo z realizačnej faktúry – nečakáte na peniaze od štátu'
      ],
      marvolGuarantee: '100 % garancia registrácie poukážky a jej riadneho preplatenia bez rizika prepadnutia.'
    },
    orko: {
      title: 'Zvýhodnené regióny ORKO (+15 % navyše)',
      rate: '575 € / kW (+15 % bonifikácia)',
      maxCap: 'Až do výšky 1 725 € (3 kW) a viac pri batériových systémoch',
      eligibility: 'Obce a mestá v oblastiach riadenia kvality ovzdušia (väčšina územia SR)',
      points: [
        'Zvýhodnená sadzba 575 € / kW namiesto štandardných 500 €',
        'Platí pre lokality s preukázaným znečistením ovzdušia (napr. Žilina, Martin, Považie)',
        'Naši špecialisti bezplatne overia vašu obec v oficiálnom zozname SHMÚ / SIEA',
        'Vyššia dotácia znižuje počiatočnú investíciu a zrýchľuje návratnosť pod 5 rokov'
      ],
      marvolGuarantee: 'Automatické uplatnenie 15 % zvýhodnenia pre všetky oprávnené nehnuteľnosti.'
    },
    solidarita: {
      title: 'Zelená solidarita (Financovanie až do 90 % nákladov)',
      rate: '900 € / kW (pre nízkopríjmové domácnosti)',
      maxCap: 'Až do 90 % z celkových oprávnených výdavkov na fotovoltiku',
      eligibility: 'Domácnosti ohrozené energetickou chudobou, seniori a rodiny s ťažkým zdravotným postihnutím',
      points: [
        'Mimoriadna sadzba 900 € za 1 kW inštalovaného výkonu',
        'Financovanie takmer celej solárnej elektrárne z prostriedkov Európskej únie',
        'Doplatok majiteľa domu tvorí iba symbolických 10 % z celkovej ceny inštalácie',
        'Kompletnú asistenciu pri dokladovaní sociálnych a dôchodkových kritérií prevezme Marvol'
      ],
      marvolGuarantee: 'Kompletná právna a administratívna podpora pri overení nároku na Zelenú solidaritu.'
    },
    firmy: {
      title: 'Zelená podnikom pre firmy, prevádzky a MSP',
      rate: 'Nenávratný finančný príspevok (NFP)',
      maxCap: 'Až do výšky desiatok tisíc eur (podľa výzvy a energetického auditu)',
      eligibility: 'Malé a stredné podniky (MSP), výrobné areály, agrosektor a komerčné objekty',
      points: [
        'Podpora investícií do znižovania energetickej náročnosti výroby a budov',
        'Nevyhnutnosťou je vypracovanie povinného energetického auditu s výpočtom úspor',
        'Kombinovateľné s fotovoltikou na firemných strechách a priemyselnými batériami BESS',
        'Posúdenie princípu "Výrazne nenarušiť" (DNSH) a dekarbonizačných cieľov'
      ],
      marvolGuarantee: 'Inžiniersky projekt, energetický audit a technická dokumentácia na kľúč.'
    }
  };

  const currentSubsidy = subsidyTiers[activeSubsidyTab];

  const faqs = [
    {
      q: 'Prečo je východisková revízna správa potrebná pre distribúciu?',
      a: 'Distribučné spoločnosti (Stredoslovenská distribučná SSD, Západoslovenská distribučná ZSD a Východoslovenská distribučná VSD) nepovolia trvalé pripojenie fotovoltiky do siete ani nevymenia elektromer za 4-kvadrantný bez platnej východiskovej revíznej správy OPOS. Táto správa je zákonnou garanciou, že fotovoltická elektráreň neohrozí stabilitu distribučnej sústavy ani bezpečnosť technikov pracujúcich na vedení.',
    },
    {
      q: 'Ako prebieha odpočítanie dotácie z faktúry?',
      a: 'Ako oprávnený zhotoviteľ registrovaný v systéme SIEA odpočíta Marvol s.r.o. schválenú hodnotu štátnej dotácie (napr. 1 150 € pri fotovoltike alebo až 4 600 € pri tepelnom čerpadle) priamo z vašej realizačnej faktúry. Vy ako zákazník uhradíte iba doplatok (rozdiel celkovej ceny a dotácie) a administratívne vysporiadanie s agentúrou SIEA vyrieši naša spoločnosť.',
    },
    {
      q: 'Ako často sa musia vykonávať periodické revízie fotovoltiky?',
      a: 'Pre rodinné domy sa odporúča vykonať periodickú kontrolu a revíziu elektroinštalácie a fotovoltiky každé 3 až 4 roky (alebo podľa požiadavky konkrétnej poisťovne v poistnej zmluve). Pre podniky, firmy a výrobné areály sú lehoty striktne stanovené vyhláškou MPSVR SR č. 508/2009 Z. z. podľa vonkajších vplyvov prostredia (obvykle každé 2 až 3 roky).',
    },
    {
      q: 'Čo ak revízny technik zistí na inštalácii nedostatky?',
      a: 'Na rozdiel od bežných externých revíznych technikov disponuje Marvol s.r.o. vlastným montážnym a servisným tímom elektrikárov. Všetky zistené závady (napr. uvoľnené svorky, nedostatočné pospájanie, opotrebovaná prepäťová ochrana) dokážeme bezodkladne priamo na mieste odstrániť a vydať bezchybnú revíznu správu.',
    },
    {
      q: 'Koľko stojí revízia fotovoltickej elektrárne?',
      a: 'Pri inštaláciách na kľúč realizovaných spoločnosťou Marvol s.r.o. je kompletná východisková revízna správa OPOS už zahrnutá v cene diela bez akýchkoľvek skrytých doplatkov. V prípade samostatnej revízie externej elektrárne alebo periodickej prehliadky pripravíme cenovú ponuku podľa inštalovaného výkonu a počtu rozvádzačov.',
    },
  ];

  const jsonLdSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Domov',
          item: 'https://marvol.sk',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Služby',
          item: 'https://marvol.sk/#sluzby',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Revízie, servis & Dotácie SIEA',
          item: 'https://marvol.sk/sluzby/revizie-dotacie',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Úradné revízie fotovoltiky (OPOS) & Dotácie SIEA',
      serviceType: 'Odborné prehliadky a skúšky (OPOS) a dotačný manažment SIEA',
      description:
        'Úradná revízna správa s pečiatkou § 24 podľa STN 33 1500 a STN 33 2000-6. Kalibrované merania Metrel, termovízia Fluke a 100 % garancia dotácie SIEA.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Marvol s.r.o.',
        telephone: COMPANY_DETAILS.contact.phone,
        email: COMPANY_DETAILS.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY_DETAILS.seat.street,
          addressLocality: COMPANY_DETAILS.seat.city,
          postalCode: COMPANY_DETAILS.seat.zip,
          addressCountry: COMPANY_DETAILS.seat.countryCode,
        },
      },
      areaServed: {
        '@type': 'Country',
        name: 'Slovakia',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <Layout
      title="Revízie fotovoltiky (OPOS) & Dotácie SIEA | Marvol s.r.o."
      description="Úradné revízne správy s pečiatkou revízneho technika § 24. Kalibrované merania Metrel, termovízia Fluke a 100 % garancia vybavenia dotácie Zelená domácnostiam."
      canonicalPath="/sluzby/revizie-dotacie"
      schema={jsonLdSchema}
      isSubpage={true}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <ol className="flex items-center space-x-2 text-xs text-slate-400">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-600">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-amber-400 font-semibold">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* HERO SECTION: Certification, Diagnostics & Subsidy Authority */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
                <FileTextIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Revízny technik § 24 &amp; Oprávnený zhotoviteľ SIEA</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Úradné revízie fotovoltiky <br className="hidden sm:block" />
                <span className="text-emerald-400">&amp; 100 % garancia dotácií SIEA</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Vystavujeme oficiálne revízne správy (OPOS) potrebné pre pripojenie do distribučnej siete SSD, ZSD a VSD. Zároveň ako registrovaný zhotoviteľ <strong className="text-white">vybavíme štátnu dotáciu Zelená domácnostiam</strong> a odpočítame ju priamo z faktúry.
              </p>

              {/* Authority Metrics HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">Do 4 025 €</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Dotácia SIEA</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">100 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Preplatenie poukážky</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-mono font-black text-xl sm:text-2xl">§ 24</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Okrúhla pečiatka OPOS</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">Metrel</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Kalibrované prístroje</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-xl font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
                >
                  Objednať revíziu / Dotáciu
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Konzultácia s revíznym technikom
                </a>
              </div>
            </div>

            {/* Right: Real Photography & Certification Status */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/revizie-dotacie.jpg"
                    alt="Revízie a dotácie fotovoltiky SIEA Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Úradná revízna správa OPOS</span>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs rounded-full">
                    SIEA Partner
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Kalibrované merania &amp; Termovízia</span>
                      <span className="text-emerald-400 font-bold font-mono">100% súlad STN</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Meranie izolačných stavov, impedancie slučky a termovízne testy na odhalenie hot-spotov.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 grid grid-cols-2 gap-3 text-xs border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Revízna správa pre SSD/ZSD</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Odpočet dotácie priamo z faktúry</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Termovízna inšpekcia panelov</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Rýchle odstránenie zistených chýb</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: CALIBRATED DIAGNOSTIC HARDWARE (Technical Showcase) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Presnosť meraní
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Špičková meracia technika &amp; Termovízia
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Revízie nevykonávame od stola. Každý parameter preverujeme certifikovanými prístrojmi s platnými kalibračnými certifikátmi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 inline-block mb-3">
                  METREL MI 3108
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multifunkčný PV tester</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Meranie I-U charakteristík solárnych modulov, napätia naprázdno (Uoc) a skratových prúdov (Isc) podľa normy STN EN 62446.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Skúšobné napätie až 1 000 V</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Meranie izolačného odporu</li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 inline-block mb-3">
                  FLUKE TERMOVÍZIA
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Detekcia hot-spotov</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Infračervená termovízna kamera s vysokým rozlíšením odhalí prehrievajúce sa články, vadné bypass diódy a skryté mikrotrhliny.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Termovízia rozvádzačov</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Odhalenie uvoľnených svoriek</li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-lg border border-sky-400/20 inline-block mb-3">
                  RCD &amp; IMPEDANCIA
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Overenie ochrán &amp; RCD</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Testovanie vypínacieho času prúdových chráničov (RCD typ B) a impedancie poruchovej slučky pre bezpečnosť pred dotykom.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-sky-400" /> Ochrana pred dotykom</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-sky-400" /> Test vypínania v milisekundách</li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-400/20 inline-block mb-3">
                  SIEA PROTOKOL
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Kompletná dotačná správa</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Oficiálna správa spĺňajúca všetky legislatívne náležitosti pre distribúciu i preplatenie dotačnej poukážky agentúrou SIEA.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Okrúhla pečiatka § 24</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Garancia bezproblémového schválenia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE SUBSIDY GUIDE 2026 (SIEA Tiers) */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Dotačný sprievodca 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Koľko peňazí od štátu môžete získať?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Vyberte program a pozrite sa na presné podmienky financovania z projektu Zelená domácnostiam a Zelená podnikom.
            </p>
          </div>

          {/* Subsidy Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            <button
              onClick={() => setActiveSubsidyTab('standard')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeSubsidyTab === 'standard'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Štandardná dotácia (500 €/kW)
            </button>
            <button
              onClick={() => setActiveSubsidyTab('orko')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeSubsidyTab === 'orko'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Regióny ORKO (+15 % navyše)
            </button>
            <button
              onClick={() => setActiveSubsidyTab('solidarita')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeSubsidyTab === 'solidarita'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Zelená solidarita (až 90 %)
            </button>
            <button
              onClick={() => setActiveSubsidyTab('firmy')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeSubsidyTab === 'firmy'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Zelená podnikom (Firmy)
            </button>
          </div>

          {/* Active Subsidy Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  <span>{currentSubsidy.rate}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {currentSubsidy.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Oprávnenosť: <strong className="text-white">{currentSubsidy.eligibility}</strong>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentSubsidy.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                      <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2.5 font-medium">
                  <ShieldIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{currentSubsidy.marvolGuarantee}</span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="text-xs font-mono text-slate-400 uppercase">Výška podpory</div>
                <div className="text-2xl font-black font-mono text-emerald-400">{currentSubsidy.maxCap}</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Preveríme vašu nehnuteľnosť na liste vlastníctva a zabezpečíme maximálnu možnú dotáciu.
                </p>
                <a
                  href="#dopyt"
                  className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20 cursor-pointer"
                >
                  Overiť nárok na dotáciu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STATUTORY INSPECTION SCHEDULE (STN 33 1500) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              STN 33 1500 &amp; Vyhláška 508/2009 Z. z.
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Zákonom predpísané revízne lehoty
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Prehľad povinných revízií potrebných pre bezpečnú prevádzku a platnosť poistenia nehnuteľnosti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                PRED SPUSTENÍM
              </span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Východisková revízia OPOS</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Nevyhnutná podmienka pre výmenu elektromera a legálnu prevádzku fotovoltiky. Autorizovaná pečiatka revízneho technika podľa § 24.
              </p>
              <div className="text-[11px] text-slate-300 border-t border-slate-800 pt-3 space-y-1">
                <div>✓ V cene montáže na kľúč od Marvol</div>
                <div>✓ Zákonná podmienka distribútora</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                1x ROČNE
              </span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Servisná &amp; Termovízna inšpekcia</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Kontrola oteplenia DC/AC spojov, premeranie stavu bleskozvodu a vyčistenie solárnych panelov pre zachovanie maximálnej výroby.
              </p>
              <div className="text-[11px] text-slate-300 border-t border-slate-800 pt-3 space-y-1">
                <div>✓ Prevencia pred prehriatím</div>
                <div>✓ Zachovanie záruky výrobcov</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-full border border-sky-400/20">
                KAŽDÉ 3 – 4 ROKY
              </span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">Periodická revízia</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Pravidelná revízia predpísaná vyhláškou 508/2009 Z. z. a poistnými zmluvami. Zabezpečí, že v prípade škody poisťovňa neskráti plnenie.
              </p>
              <div className="text-[11px] text-slate-300 border-t border-slate-800 pt-3 space-y-1">
                <div>✓ Platnosť poistného krytia</div>
                <div>✓ Oficiálna revízna správa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Otázky a odpovede
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o revíziách a dotáciách SIEA
            </h2>
            <p className="text-slate-400 text-sm">
              Máte otázky k postupu vybavovania poukážky alebo k revíznej správe?
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-emerald-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed pt-2 border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: LEAD FORM CONSULTATION */}
      <section id="dopyt" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-emerald-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                100% Dotačný a revízny servis
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Získajte revíznu správu a dotáciu SIEA
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Potrebujete východiskovú revíziu, periodickú prehliadku alebo chcete získať štátnu dotáciu Zelená domácnostiam? Vyplňte formulár a naši odborníci sa vám ozvú do 24 hodín.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <PhoneIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na revízne oddelenie</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-emerald-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <MailIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Dotačný a revízny manažment</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-emerald-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <BuildingOfficeIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Centrála MARVOL s.r.o.</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_revizie_dotacie"
                title="Dopyt na revíziu alebo dotáciu"
                subtitle="Zadajte údaje a my preveríme vašu žiadosť o dotáciu a revíziu."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
