import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function BaterioveUloziskaBess() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Batériové úložiská BESS & Wallbox', href: '/bateriove-uloziska-bess' },
  ];

  const storageCategories = [
    {
      id: 'domace-baterie',
      title: 'Domáce úložiská LiFePO4',
      capacity: '5,12 – 20,48 kWh',
      power: '3 kW – 10 kW',
      badge: 'Rezidenčné riešenia',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description: 'Kompaktné modulárne batérie pre rodinné domy. Akumulujú denné prebytky fotovoltiky a poskytujú nepretržité záložné napájanie (UPS) počas výpadku verejnej siete.',
      features: [
        'Overená a bezpečná chémia LiFePO4 (nehorľavá)',
        'Životnosť viac ako 6 000 plných nabíjacích cyklov (15+ rokov)',
        'Hĺbka vybitia až 95% (DoD) bez degradácie kapacity',
        'Prepnutie do záložného režimu za menej ako 20 milisekúnd',
        'Možnosť postupného dokupovania batériových modulov',
        'Plná integrácia s hybridnými meničmi GoodWe, Growatt, Deye',
      ],
    },
    {
      id: 'komercne-bess',
      title: 'Komerčné & Priemyselné BESS',
      capacity: '30 kWh – 500+ kWh',
      power: '20 kW – 250 kW',
      badge: 'Priemysel & Firmy',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description: 'Výkonné rackové a kontajnerové batériové systémy (Battery Energy Storage Systems) pre priemyselné haly, polikliniky, servery a energeticky náročné prevádzky.',
      features: [
        'Efektívny "Peak Shaving" – vyrovnávanie 15-minútových odberových špičiek',
        'Arbitráž na spotovom trhu (nabíjanie za lacnú nočnú / zápornú elektrinu)',
        'Záloha citlivých IT technológií, CNC strojov a chladiarenských boxov',
        'Vnútorné rackové skrine alebo vonkajšie klimatizované kontajnery',
        'SCADA a Modbus TCP rozhranie pre dispečerské riadenie',
        'Dotovateľné z programu Zelená podnikom (až 50% NFP)',
      ],
    },
    {
      id: 'smart-wallbox',
      title: 'Smart EV Wallbox nabíjačky',
      capacity: '11 kW / 22 kW',
      power: '3-fázové dynamické riadenie',
      badge: 'Elektromobilita',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description: 'Inteligentné domáce i firemné nabíjacie stanice pre elektromobily a plug-in hybridy s dynamickým vyrovnávaním záťaže (DLB) a nabíjaním výhradne zo slnka.',
      features: [
        'Režim "Solar Only" – auto sa nabíja výhradne zo slnečných prebytkov',
        'Dynamické riadenie výkonu (DLB) chráni hlavný istič pred vyrazením',
        'Univerzálny konektor Type 2 kompatibilný so všetkými značkami EV',
        'Autorizácia cez RFID kartu alebo mobilnú aplikáciu',
        'Meranie spotreby a podklady pre služobné vyúčtovanie nabíjania',
        'Krytie IP65 a IK10 pre bezpečnú vonkajšiu montáž na stenu či stĺpik',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Prečo sú LiFePO4 batérie bezpečnejšie ako bežné lítiové (NMC / Li-ion) batérie?',
      a: 'Lítium-železo-fosfátové články (LiFePO4) majú mimoriadne silnú chemickú väzbu medzi železom, fosforom a kyslíkom. Vďaka tomu nepodliehajú tepelnému úniku (tzv. thermal runaway), sú nehorľavé a nevznietia sa ani pri mechanickom poškodení či prebití. Sú ideálne a bezpečné pre montáž priamo do technických miestností rodinných domov či administratívnych budov.',
    },
    {
      q: 'Ako funguje záložné napájanie (UPS / Full Backup) pri výpadku elektrickej siete?',
      a: 'Keď distribučná sieť zaznamená výpadok (blackout), hybridný striedač sa v priebehu 10 až 20 milisekúnd galvanicky odpojí od vonkajšej siete a prepne dom do ostrovného režimu. Tento prechod je taký rýchly, že nedôjde k vypnutiu stolných počítačov, televízorov ani k resetovaniu domácej Wi-Fi či kotla. Pokiaľ svieti slnko, batéria sa dokáže priebežne dobíjať aj počas trvajúceho blackoutu.',
    },
    {
      q: 'Môžem si batériové úložisko dokúpiť aj k už existujúcej fotovoltike?',
      a: 'Áno. Pokiaľ už máte fotovoltiku s bežným sieťovým striedačom (On-Grid), môžeme systém doplniť o tzv. AC-Coupled batériový striedač s úložiskom bez nutnosti výmeny pôvodného striedača. Pokiaľ plánujete novú inštaláciu, odporúčame hybridný menič DC-Coupled, ktorý dosahuje vyššiu účinnosť premeny energie (až 97,5%).',
    },
    {
      q: 'Ako funguje nabíjanie elektromobilu výhradne zo slnka cez Smart Wallbox?',
      a: 'Náš inteligentný Wallbox komunikuje v reálnom čase so smart metrom v rozvádzači. Keď zistí, že fotovoltika vyrába napríklad 4,2 kW prebytkov, ktoré dom nespotrebúva, Wallbox plynule nastaví nabíjací prúd auta presne na túto hodnotu. Jazdíte tak na skutočne bezplatnú a 100% čistú slnečnú energiu bez odberu drahej elektriny zo siete.',
    },
    {
      q: 'Aká je životnosť batérie a koľko kapacity stratí za 10 rokov?',
      a: 'Kvalitné LiFePO4 batérie garantujú minimálne 6 000 plných nabíjacích cyklov pri 90% hĺbke vybitia (DoD). V bežnom rodinnom dome batéria absolvuje približne 250 až 280 plných cyklov ročne. Po 10 rokoch každodennej prevádzky (cca 2 800 cyklov) má batéria stále viac ako 80% svojej pôvodnej nominálnej kapacity.',
    },
    {
      q: 'Dá sa na batériové úložisko získať štátna dotácia?',
      a: 'Áno. Pre rodinné domy je batéria podporovaná v rámci programu Zelená domácnostiam ako integrálna súčasť hybridného systému (dotácia SIEA na fotovoltiku do 1 150 €, v schéme Zelená solidarita až do 90 % oprávnených nákladov). Pre podniky a firmy je priemyselné úložisko BESS oprávneným výdavkom v programe Zelená podnikom (podpora 35 % – 50 % formou nenávratného finančného príspevku).',
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
          name: 'Batériové úložiská BESS & Wallbox',
          item: 'https://marvol.sk/bateriove-uloziska-bess',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/bateriove-uloziska-bess#service',
      name: 'Batériové úložiská BESS a Wallbox nabíjacie stanice',
      serviceType: 'Inštalácia batériových systémov a nabíjacej infraštruktúry',
      description:
        'Kapacitné batériové systémy LiFePO4 (od 5 kWh do 120+ kWh) s núdzovým UPS zálohovaním a inteligentným nabíjaním elektromobilov zo slnka.',
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
      title="Batériové úložiská BESS & Wallbox stanice | Marvol s.r.o."
      description="Batériové úložiská LiFePO4 (BESS) a inteligentné Wallbox nabíjačky pre elektromobily. Maximálna nezávislosť, záložné napájanie UPS a riadenie prebytkov zo slnka."
      canonicalPath="/bateriove-uloziska-bess"
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
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Energetická sebestačnosť & Bezpečnosť 24/7</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Batériové úložiská BESS <br className="hidden sm:block" />
                <span className="text-amber-400">& Smart EV Wallboxy</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Neplytvajte solárnou energiou do siete za zlomkové ceny. Uložte si prebytky do bezpečných <strong className="text-white">LiFePO4 batérií</strong> s mikrosekundovým záložným režimom (UPS) a nabíjajte svoj elektromobil čistou energiou zo slnka.
              </p>

              {/* Quick Specs Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">&lt; 20 ms</div>
                  <div className="text-slate-400 text-xs mt-0.5">Bleskové UPS prepnutie</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">6 000+</div>
                  <div className="text-slate-400 text-xs mt-0.5">Cyklov LiFePO4 (15+ rokov)</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">11 / 22 kW</div>
                  <div className="text-slate-400 text-xs mt-0.5">Smart Wallbox s DLB</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#riesenia-bess"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Prehľad batériových systémov
                </a>
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Nezáväzný technický návrh
                </a>
              </div>
            </div>

            {/* Visual Storage Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-sky-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/bateriove-uloziska/hero.jpg"
                    alt="Ilustračná fotka batériového úložiska a smart EV Wallboxu Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Ilustračné foto BESS &amp; Wallbox</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    Blackout Ready
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">LiFePO4 batérie &amp; Smart EV Wallbox</span>
                      <span className="text-emerald-400 font-bold">Záloha &lt; 20 ms</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Nehorľavá technológia s dynamickým riadením záťaže (DLB) a plnou trojfázovou asymetriou.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>6 000+ cyklov (15+ rokov)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>11 kW / 22 kW smart nabíjanie</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Škálovateľnosť 5 až 500 kWh</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Automatický UPS záskok</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Storage & Wallbox Categories Section */}
      <section id="riesenia-bess" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Modulárne systémy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Riešenia pre domy, firmy aj elektromobilitu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Od kompaktných závesných batérií pre moderný bungalov až po komplexné priemyselné BESS stanice s pripojením do vnútropodnikových trafostaníc.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {storageCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                    {cat.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-semibold py-2 text-slate-300 mb-4">
                    <span className="text-amber-400 font-bold">Kapacita: {cat.capacity}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-sky-400 font-bold">Výkon: {cat.power}</span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-800 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Kľúčové parametre:
                    </div>
                    {cat.features.map((feat, idx) => (
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
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center block text-sm transition-all border border-slate-700 cursor-pointer"
                  >
                    Dopytovať toto riešenie
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive: Safety & UPS Microseconds */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sky-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
              Technologická prevaha
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Prečo na type batérie a elektroniky záleží?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Batéria nie je len pasívny zásobník energie. Je to srdce energetického manažmentu vašej nehnuteľnosti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-2xl font-black">
                🛡️
              </div>
              <h3 className="text-xl font-black text-white">Pokročilé BMS riadenie</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Integrovaný Battery Management System (BMS) monitoruje napätie a teplotu každého jedného článku v batérii. Zabezpečuje rovnomerné nabíjanie, chráni pred podbitím a optimalizuje prenos energie.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-2xl font-black">
                ⚡
              </div>
              <h3 className="text-xl font-black text-white">Mikrosekundový Full Backup</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Bežné záložné systémy vyžadujú manuálne prepnutie alebo výpadok trvá niekoľko sekúnd. Naše riešenia disponujú vstavaným EPS/UPS stýkačom s prepnutím do 20 ms. Váš dom beží bez jediného bliknutia žiarovky.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-2xl font-black">
                🚗
              </div>
              <h3 className="text-xl font-black text-white">Solar-Only EV Charging</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Prepojenie fotovoltiky, batérie a Smart Wallboxu umožňuje automaticky usmerňovať slnečné prebytky do batérie vozidla. Ak máte doma 2 autá, systém inteligentne rozdelí nabíjací výkon medzi ne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o batériových úložiskách a nabíjačkách
            </h2>
            <p className="text-slate-400 text-sm">
              Potrebujete poradiť s výberom kapacity úložiska alebo výkonom Wallboxu? Sme vám k dispozícii.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
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
      <section id="dopyt" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Konzultácia batériových riešení
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Navrhneme ideálnu kapacitu úložiska pre váš objekt
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Či už chcete zabezpečiť rodinný dom proti blackoutu alebo vyriešiť peak-shaving vo výrobnej hale, pripravíme vám technický návrh na mieru.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Technická podpora & dopyty</div>
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
                    <div className="text-xs text-slate-400">E-mailová konzultácia</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Certifikované montáže</div>
                    <span className="text-white font-medium">Záručný a pozáručný servis po celom Slovensku</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="baterie"
                source="page_baterie_bess"
                title="Dopyt na batériové úložisko & Wallbox"
                subtitle="Zanechajte nám kontakt a uveďte vašu aktuálnu spotrebu alebo výkon existujúcej fotovoltiky."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
