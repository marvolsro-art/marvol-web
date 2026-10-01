import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function FotovoltikaPreDomacnosti() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Fotovoltika pre domácnosti', href: '/fotovoltika-pre-domacnosti' },
  ];

  const packages = [
    {
      id: 'zakladny-3kwp',
      name: 'Základný Štart 3 kWp',
      badge: 'Pre menšie domy',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description: 'Ideálne riešenie pre menšie domácnosti s ročnou spotrebou do 3 500 kWh bez tepelného čerpadla.',
      panels: '7× N-Type TOPCon 435–450 Wp',
      inverter: '1-fázový / 3-fázový sieťový On-Grid striedač (GoodWe / Growatt)',
      storage: 'Bez batérie (s možnosťou neskoršieho doplnenia)',
      subsidy: 'Až do 1 500 €',
      annualProduction: 'cca 3 300 – 3 600 kWh / rok',
      savings: 'Úspora až 550 € ročne',
      features: [
        '7 ks Tier-1 celočiernych N-Type TOPCon panelov',
        'Značkový inteligentný menič s Wi-Fi monitoringom',
        'Kompletná konštrukcia na šikmú alebo rovnú strechu',
        'Kabeláž, DC/AC rozvádzač s prepäťovými ochranami',
        'Odborná revízna správa OPOS v cene',
        'Vybavenie dotácie Zelená domácnostiam na kľúč',
      ],
      popular: false,
    },
    {
      id: 'standard-hybrid-6kwp',
      name: 'Štandard Hybrid 6 kWp s batériou',
      badge: 'Najobľúbenejší balík',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/15',
      description: 'Zlatý štandard pre moderné rodinné domy. Akumuluje prebytky energie na večer a poskytuje záložné napájanie pri výpadku.',
      panels: '14× N-Type TOPCon 440–450 Wp',
      inverter: '3-fázový hybridný asymetrický striedač 6–8 kW',
      storage: 'Kapacitná LiFePO4 batéria 5,12 až 10,24 kWh',
      subsidy: 'Až do 3 000 €',
      annualProduction: 'cca 6 600 – 7 200 kWh / rok',
      savings: 'Úspora až 1 150 € ročne',
      features: [
        '14 ks prémiových Tier-1 TOPCon panelov s účinnosťou 22,5%',
        'Asymetrický 3-fázový hybridný menič najnovšej generácie',
        'Modulárne LiFePO4 batériové úložisko (6 000+ cyklov)',
        'Funkcia záložného zdroja (UPS) pri výpadku verejnej siete',
        'Smart meter a meranie spotreby v reálnom čase',
        'Vybavenie poukážky SIEA a distribučného pripojenia (SSD/ZSD/VSD)',
      ],
      popular: true,
    },
    {
      id: 'premium-max-10kwp',
      name: 'Prémium Max 10 kWp s batériou a UPS',
      badge: 'Maximálna nezávislosť',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description: 'Nekompromisný výkon pre domy s tepelným čerpadlom, klimatizáciou, bazénom alebo elektromobilom (EV).',
      panels: '22–24× N-Type TOPCon 440–450 Wp',
      inverter: '3-fázový hybridný asymetrický striedač 10 kW',
      storage: 'Vysokonapäťová LiFePO4 batéria 10,24 až 15,36 kWh',
      subsidy: 'Plná dotácia až 4 025 €',
      annualProduction: 'cca 10 500 – 11 800 kWh / rok',
      savings: 'Úspora až 1 900 € ročne',
      features: [
        '22–24 ks vysokovýkonných N-Type panelov s bifaciálnym ziskom',
        '10 kW trojfázový hybridný menič s mikrosekundovým EPS/UPS zálohovaním',
        'Veľkokapacitné batériové úložisko LiFePO4 s 15-ročnou životnosťou',
        'Plná integrácia s tepelným čerpadlom (SG Ready) a Wallboxom',
        'Kompletný inžiniering: projekt, revízia, pripojenie do siete',
        'Prioritný záručný a pozáručný servis od Marvol s.r.o.',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'Akú vysokú dotáciu môžem získať na fotovoltiku pre rodinný dom?',
      a: 'Z národného projektu Zelená domácnostiam (SIEA) môžete získať príspevok až do výšky 4 025 €. Základná sadzba je 500 € na 1 kWp inštalovaného výkonu (max. 1 500 € do 3 kWp), pričom pri inštalácii batériového úložiska alebo pri vyššej spotrebe elektriny sa dotácia navyšuje až na maximálnych 4 025 €. Pre nízkopríjmové domácnosti v programe Zelená solidarita je podpora až do 90% oprávnených výdavkov. Spoločnosť Marvol s.r.o. vybaví celú administratívu bezplatne za vás.',
    },
    {
      q: 'Ako dlho trvá kompletná inštalácia fotovoltickej elektrárne na kľúč?',
      a: 'Samotná fyzická montáž panelov na strechu, inštalácia striedača, batérie a elektroinštalačné prepojenie trvá našim certifikovaným technikom obvykle 1 až 2 pracovné dni. Celý proces vrátane vstupnej obhliadky, schválenia žiadosti u distribučnej spoločnosti (SSD, ZSD alebo VSD), registrácie poukážky SIEA a oficiálnej revízie trvá štandardne 3 až 5 týždňov.',
    },
    {
      q: 'Čo sa stane s prebytočnou vyrobenou elektrinou počas slnečných dní?',
      a: 'Pokiaľ máte hybridný systém s batériou (LiFePO4), všetka prebytočná energia sa ukladá do vášho vlastného úložiska, odkiaľ ju čerpáte večer a v noci. Pokiaľ je batéria plne nabitá, prebytky môžete posielať do distribučnej siete v rámci služby Virtuálna batéria (od vášho dodávateľa elektriny) alebo ich využiť na ohrev vody v bojleri či nabíjanie elektromobilu.',
    },
    {
      q: 'Funguje fotovoltika aj v zime, pri zamračenej oblohe alebo snežení?',
      a: 'Áno. Moderné fotovoltické panely typu N-Type TOPCon využívajú difúzne denné svetlo a vyrábajú elektrinu aj pri zamračenom počasí či miernom daždi. Výroba v zime je pochopiteľne nižšia kvôli kratšiemu slnečnému svitu a nižšej trajektórii slnka (cca 20–25% letného výkonu), avšak systém stále pomáha kryť stálu spotrebu domu (chladnička, obehové čerpadlá, router, osvetlenie).',
    },
    {
      q: 'Aká je životnosť fotovoltických panelov, meniča a batérií?',
      a: 'Námi dodávané Tier-1 N-Type TOPCon fotovoltické panely majú lineárnu garanciu výkonu 25 až 30 rokov (garantovaný minimálny výkon 85% po 30 rokoch). Hybridné meniče majú životnosť 12–15 rokov s možnosťou predĺženej záruky na 10 rokov. Batérie s chémiou LiFePO4 zvládnu viac ako 6 000 plných nabíjacích cyklov, čo pri bežnom dennom cyklovaní predstavuje životnosť 16 až 20 rokov.',
    },
    {
      q: 'Vybaví Marvol s.r.o. celú komunikáciu s distribučnou spoločnosťou a štátom?',
      a: 'Áno, garantujeme 100% bezstarostný proces bez byrokracie. Pripravíme žiadosť o pripojenie do distribučnej sústavy (Stredoslovenská distribučná SSD, Západoslovenská ZSD, Východoslovenská VSD), vypracujeme projektovú dokumentáciu skutočného vyhotovenia, vydáme úradnú revíznu správu (OPOS) a zaregistrujeme poukážku v portáli SIEA Zelená domácnostiam.',
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
          name: 'Fotovoltika pre domácnosti',
          item: 'https://marvol.sk/fotovoltika-pre-domacnosti',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/fotovoltika-pre-domacnosti#service',
      name: 'Fotovoltika pre rodinné domy na kľúč',
      serviceType: 'Inštalácia fotovoltických systémov pre domácnosti',
      description:
        'Kompletné dodanie a montáž fotovoltických elektrární pre rodinné domy s vybavením dotácie Zelená domácnostiam až do výšky 4 025 €.',
      provider: {
        '@id': 'https://marvol.sk/#organization',
        '@type': 'LocalBusiness',
        name: 'Marvol s.r.o.',
        telephone: '+421948123456',
        email: 'info@marvol.sk',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chotárna 3394/6',
          addressLocality: 'Vrútky',
          postalCode: '038 61',
          addressCountry: 'SK',
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
      title="Fotovoltika pre rodinné domy | Dotácia až 4 025 € | Marvol s.r.o."
      description="Fotovoltické elektrárne pre rodinné domy na kľúč. Získajte dotáciu Zelená domácnostiam až 4 025 €. Projekt, montáž, revízia a pripojenie do siete bez starostí."
      canonicalPath="/fotovoltika-pre-domacnosti"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Subsidy Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Štátna dotácia Zelená domácnostiam až do {COMPANY_DETAILS.subsidies.maxHomeSubsidy}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Fotovoltika pre rodinné domy <span className="text-amber-400">na kľúč</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Znížte účty za elektrinu až o <strong className="text-white">80%</strong>, zabezpečte si energetickú sebestačnosť pri výpadkoch a získajte štátnu podporu bez jedinej návštevy úradu. Všetko zabezpečíme za vás – od obhliadky cez projekt až po zapojenie do distribučnej siete.
              </p>

              {/* Quick Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">1–2 dni</div>
                  <div className="text-slate-400 text-xs mt-0.5">Rýchla čistá montáž</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Vybavenie dotácie</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">30 rokov</div>
                  <div className="text-slate-400 text-xs mt-0.5">Garancia výkonu panelov</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#baliky"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Pozrieť balíky & ceny
                </a>
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Bezplatná kalkulácia na mieru
                </a>
              </div>
            </div>

            {/* Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                  Marvol Záruka
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-amber-400 text-2xl">⚡</span>
                  Prečo rodinná fotovoltika od Marvol?
                </h3>

                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>N-Type TOPCon technológia:</strong> vyššia účinnosť aj pri rozptýlenom svetle a nízka ročná degradácia (&lt;0.4%).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Asymetrické hybridné striedače:</strong> dodávajú energiu iba do tej fázy, kde ju dom v reálnom čase spotrebúva.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Bezpečná LiFePO4 batéria:</strong> nehorľavé články s 6 000+ cyklami a mikrosekundovým záložným režimom (UPS).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>0 € starostí s byrokraciou:</strong> kompletne zastrešujeme distribúciu (SSD/ZSD/VSD), projekt aj dotáciu SIEA.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Mobilná aplikácia v slovenčine:</strong> prehľad o výrobe, spotrebe a stave batérie priamo vo vašom telefóne.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Autorizovaný zhotoviteľ SIEA</span>
                  <span className="text-amber-400 font-bold">IČO: {COMPANY_DETAILS.tax.ico}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Turnkey Package Tiers Section */}
      <section id="baliky" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Kompletné inštalácie na kľúč
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Vyberte si overený fotovoltický balík
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Všetky balíky zahŕňajú prémiové komponenty, kompletnú inštaláciu, kabeláž, rozvádzač, revíznu správu a bezplatné vybavenie štátnej dotácie Zelená domácnostiam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-md">
                    Najobľúbenejšia voľba
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${pkg.badgeColor}`}>
                      {pkg.badge}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Dotácia: {pkg.subsidy}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-3 py-4 border-y border-slate-800/80 mb-6 text-xs text-slate-300">
                    <div>
                      <div className="text-slate-500 uppercase font-semibold text-[10px] tracking-wider">Panely</div>
                      <div className="font-medium text-white">{pkg.panels}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 uppercase font-semibold text-[10px] tracking-wider">Striedač</div>
                      <div className="font-medium text-white">{pkg.inverter}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 uppercase font-semibold text-[10px] tracking-wider">Batériové úložisko</div>
                      <div className="font-medium text-white">{pkg.storage}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 uppercase font-semibold text-[10px] tracking-wider">Odhadovaná ročná úspora</div>
                      <div className="font-bold text-amber-400">{pkg.savings}</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Čo balík obsahuje:
                    </div>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="text-amber-400 font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href="#dopyt"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-center block text-sm transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    Mám záujem o tento balík
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
            * Ceny a konfigurácie môžu byť upravené podľa konkrétneho typu strechy, dĺžky káblových trás a individuálnych požiadaviek rodinného domu. Presná kalkulácia je vždy bezplatná po obhliadke.
          </div>
        </div>
      </section>

      {/* Technical Specifications & Hardware Quality */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Prémiové technológie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Komponenty s overenou 30-ročnou životnosťou
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Neinštalujeme no-name komponenty. Pre vaše domovy volíme výhradne Tier-1 technológie, ktoré garantujú maximálnu bezpečnosť, vysokú účinnosť a bezproblémový servis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 1 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-2xl font-black">
                ☀️
              </div>
              <h3 className="text-xl font-black text-white">Fotovoltické panely N-Type TOPCon</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Nová generácia kremíkových článkov N-Type TOPCon prekonáva staršie P-Type PERC panely. Prináša vyššiu účinnosť (&gt;22,5%), mimoriadny výkon pri slabom rannom i večernom osvetlení a zanedbateľnú degradáciu (max. 0,4% ročne).
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                <li>• 12 až 25 rokov produktová záruka</li>
                <li>• 30 rokov lineárna garancia výkonu (min. 87,4%)</li>
                <li>• Celočierny elegantný Full-Black dizajn</li>
              </ul>
            </div>

            {/* Tech 2 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-2xl font-black">
                ⚡
              </div>
              <h3 className="text-xl font-black text-white">Asymetrické hybridné striedače</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Používame trojfázové hybridné meniče (GoodWe, Growatt, Deye, Huawei) s plnou asymetriou. To znamená, že ak máte na jednej fáze zapnutú rýchlovarnú kanvicu a na druhej nič, menič pošle energiu presne tam, kde vzniká spotreba.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                <li>• Mikrosekundový záložný výstup UPS / EPS</li>
                <li>• Integrovaná prepäťová ochrana DC aj AC typu II</li>
                <li>• Mobilná aplikácia pre iOS aj Android v slovenčine</li>
              </ul>
            </div>

            {/* Tech 3 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-2xl font-black">
                🔋
              </div>
              <h3 className="text-xl font-black text-white">Bezpečné LiFePO4 batérie</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Lítium-železo-fosfátová chémia (LiFePO4) je celosvetovo považovaná za najbezpečnejšiu technológiu pre domáce úložiská. Netrpí rizikom samovznietenia ani tepelného úniku a ponúka viac ako 6 000 plných nabíjacích cyklov pri 90% DoD.
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                <li>• Životnosť 16 až 20 rokov pri dennom cyklovaní</li>
                <li>• Modulárne rozširovanie kapacity od 5 kWh do 20+ kWh</li>
                <li>• Nehorľavé články s pokročilým BMS riadením</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidy Process: 100% Zero-Bureaucracy Guarantee */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              100% bez byrokracie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha vybavenie dotácie a inštalácia?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Celý administratívny proces prebieha pod taktovkou Marvol s.r.o. Vy nemusíte navštevovať žiadne úrady ani vypĺňať zložité technické formuláre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="text-4xl font-black text-amber-400/30 mb-2">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Bezplatná obhliadka</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Náš technik zameria strechu, preverí orientáciu a stav elektroinštalácie a navrhne optimálny výkon pre vašu spotrebu.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="text-4xl font-black text-amber-400/30 mb-2">02</div>
              <h4 className="text-lg font-bold text-white mb-2">Projekt a žiadosť</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Pripravíme technickú dokumentáciu pre distribúciu (SSD/ZSD/VSD) a podáme žiadosť o poukážku v systéme SIEA Zelená domácnostiam.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="text-4xl font-black text-amber-400/30 mb-2">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Montáž za 1–2 dni</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Naši certifikovaní montážnici osadia panely, zapoja hybridný striedač, batériu a bezpečnostné ochrany bez poškodenia strešnej krytiny.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="text-4xl font-black text-amber-400/30 mb-2">04</div>
              <h4 className="text-lg font-bold text-white mb-2">Revízia a spustenie</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Vydáme úradnú revíznu správu (OPOS), odovzdáme systém distribučnej spoločnosti na osadenie 4-kvadrantného elektromera a zaškolíme vás do mobilnej aplikácie.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-emerald-400 font-bold text-base sm:text-lg">
                Garancia odpočtu dotácie z faktúry
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Dotáciu Zelená domácnostiam uplatňujeme priamo na konečnej faktúre. Nemusíte čakať mesiace na preplatenie od štátu.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Overiť nárok na dotáciu
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko, čo potrebujete vedieť o domácej fotovoltike
            </h2>
            <p className="text-slate-400 text-sm">
              Máte ďalšie otázky? Náš technický tím vám rád odpovie počas bezplatnej konzultácie.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-amber-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Form Consultation Section */}
      <section id="dopyt" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Bezplatný návrh & kalkulácia
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Získajte nezáväznú cenovú ponuku do 24 hodín
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Pošlite nám krátky dopyt. Náš technik posúdi vašu lokalitu, vypočíta optimálny výkon fotovoltiky a pripraví kalkuláciu s odpočtom štátnej dotácie.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy telefonický kontakt</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mailové poradenstvo</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sídlo spoločnosti</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_fotovoltika_dom"
                title="Dopyt na rodinnú fotovoltiku"
                subtitle="Vyplňte údaje nižšie a náš certifikovaný technik vás bude kontaktovať s bezplatným návrhom."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
