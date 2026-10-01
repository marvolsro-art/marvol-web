import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function FotovoltikaPreFirmy() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Fotovoltika pre firmy a priemysel', href: '/fotovoltika-pre-firmy' },
  ];

  const caseStudies = [
    {
      company: 'EUROTOOLS s.r.o., Martin',
      type: 'Kovovýroba & Presné CNC obrábanie',
      installedPower: '75 kWp',
      roofType: 'Trapézový plech haly, sklon 8°',
      annualProduction: 'cca 81 500 kWh',
      annualSavings: '14 200 € / rok',
      paybackPeriod: '3,8 roka',
      highlights: 'Priama spotreba 92% energie priamo vo výrobe počas pracovnej zmeny, eliminácia rezervovanej kapacity.',
    },
    {
      company: 'Logistický park Žilina',
      type: 'Distribučné sklady & Chladiarenský hub',
      installedPower: '180 kWp + 100 kWh BESS',
      roofType: 'Plochá strecha s PVC fóliou (balastný systém bez kotvenia)',
      annualProduction: 'cca 195 000 kWh',
      annualSavings: '32 500 € / rok',
      paybackPeriod: '4,2 roka',
      highlights: 'Vyhladzovanie 15-minútových špičiek (peak shaving) a záložné napájanie chladiacich boxov pri výpadku.',
    },
    {
      company: 'Administratívne centrum Banská Bystrica',
      type: 'Moderná kancelárska budova A+',
      installedPower: '45 kWp',
      roofType: 'Zelená extenzívna strecha s vyvýšenou konštrukciou',
      annualProduction: 'cca 49 000 kWh',
      annualSavings: '8 600 € / rok',
      paybackPeriod: '4,5 roka',
      highlights: 'Zníženie uhlíkovej stopy (ESG reporting pre nadnárodných nájomcov) a napájanie HVAC tepelných čerpadiel.',
    },
  ];

  const faqs = [
    {
      q: 'Čo je to Lokálny zdroj podľa zákona č. 309/2009 Z. z. a aké má výhody?',
      a: 'Lokálny zdroj je zariadenie na výrobu elektriny z obnoviteľných zdrojov (OZE) s výkonom do 500 kWp, ktoré slúži primárne na krytie vlastnej spotreby odberateľa v danom odbernom mieste. Jeho najväčšou výhodou je 100% oslobodenie od platby Tarify za prevádzkovanie systému (TPS) a Tarify za systémové služby (TSS) na všetku vyrobenú a priamo spotrebovanú elektrinu, čo prináša okamžitú úsporu desiatok eur na každú spotrebovanú megawatthodinu.',
    },
    {
      q: 'Aké dotácie môžu firmy čerpať z programu Zelená podnikom?',
      a: 'Schéma Zelená podnikom (administrovaná SIEA / Ministerstvom hospodárstva SR) poskytuje podnikom nenávratný finančný príspevok (NFP) vo výške 35% až 50% oprávnených nákladov na inštaláciu fotovoltiky a priemyselných batériových úložísk. Nevyhnutnou podmienkou je vypracovanie energetického auditu akreditovaným audítorom. Marvol s.r.o. zabezpečuje energetický audit aj kompletnú žiadosť o dotáciu.',
    },
    {
      q: 'Ako fotovoltika chráni firmu pred pokutami za prekročenie rezervovanej kapacity (RK)?',
      a: 'Kombinácia priemyselnej fotovoltiky a batériového úložiska BESS umožňuje inteligentný "peak-shaving". V momente, keď podnik spúšťa energeticky náročné stroje alebo pece, riadiaci systém okamžite dodá energiu z batérie a solárnych panelov, vďaka čomu odber zo siete neprekročí dohodnutú rezervovanú kapacitu. Tým sa vyhnete drahým sankčným poplatkom distribučnej sústavy.',
    },
    {
      q: 'Poškodí montáž fotovoltiky hydroizoláciu plochej strechy výrobnej haly?',
      a: 'Nie. Na plochých priemyselných strechách s fóliou (PVC, TPO) alebo asfaltovými pásmi používame aerodynamické balastné konštrukcie, ktoré sa nekotvia do nosnej konštrukcie strechy skrz hydroizoláciu. Panely sú zaťažené betónovými závažiami presne podľa statického a veterného výpočtu (Eurokód 1). Pred každou inštaláciou vypracujeme nezávislý statický posudok únosnosti strechy.',
    },
    {
      q: 'Aké sú daňové a odpisové výhody fotovoltiky pre podnikateľov?',
      a: 'Fotovoltické elektrárne patria do zvýhodnených odpisových skupín s možnosťou zrýchleného odpisovania technológií OZE. Navyše, investícia do vlastného zdroja energie priamo znižuje daňový základ a zvyšuje hodnotu nehnuteľnosti bez zvýšenia prevádzkových rizík.',
    },
    {
      q: 'Ako funguje monitoring a záručný servis komerčnej elektrárne?',
      a: 'Každú inštaláciu pripájame na centrálny monitoring s rozhraním SCADA / Modbus TCP. Naše dohľadové centrum v reálnom čase sleduje parametre každého stringu a striedača. V prípade anomálie okamžite zasahujú naši servisní technici. Ponúkame garantované zmluvné SLA s nástupom na servis do 24 hodín.',
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
          name: 'Fotovoltika pre firmy a priemysel',
          item: 'https://marvol.sk/fotovoltika-pre-firmy',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/fotovoltika-pre-firmy#service',
      name: 'Fotovoltika pre firmy a priemysel',
      serviceType: 'Komerčné a priemyselné fotovoltické elektrárne',
      description:
        'Návrh a realizácia lokálnych fotovoltických zdrojov od 10 kWp do 500+ kWp pre výrobné haly a administratívne objekty s programom Zelená podnikom.',
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
      title="Fotovoltika pre firmy a priemysel | Zelená podnikom | Marvol s.r.o."
      description="Priemyselná a komerčná fotovoltika od 10 do 500+ kWp. Znížte prevádzkové náklady firmy, optimalizujte spotrebu a čerpajte dotácie z programu Zelená podnikom."
      canonicalPath="/fotovoltika-pre-firmy"
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
              {/* B2B Subsidy Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>Program Zelená podnikom: Dotácia 35% – 50% oprávnených nákladov</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Fotovoltika pre firmy <br className="hidden sm:block" />
                <span className="text-amber-400">od 10 kWp do 500+ kWp</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Ochráňte svoj podnik pred volatilitou energetického trhu. Zabezpečujeme inžiniering komerčných solárnych elektrární na kľúč s oslobodením od TPS/TSS poplatkov v režime <strong className="text-white">Lokálneho zdroja</strong>, znížením 15-minútových špičiek a návratnosťou už od 3 rokov.
              </p>

              {/* B2B Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">0 € TPS/TSS</div>
                  <div className="text-slate-400 text-xs mt-0.5">Zákon č. 309/2009 Z.z.</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">3 – 5 rokov</div>
                  <div className="text-slate-400 text-xs mt-0.5">Typická návratnosť FVE</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">ESG & CO₂</div>
                  <div className="text-slate-400 text-xs mt-0.5">Zelený audit & certifikácia</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Vyžiadať energetický audit & ponuku
                </a>
                <a
                  href="#referencie-b2b"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Prípadové štúdie firiem
                </a>
              </div>
            </div>

            {/* Visual Value Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-sky-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                  B2B Inžiniering
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-sky-400 text-2xl">🏢</span>
                  Komerčné výhody Marvol s.r.o.
                </h3>

                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Statické posudky & aerodynamika:</strong> bezpečné uloženie bez narušenia hydroizolácie plochých striech hál.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Optimalizácia rezervovanej kapacity:</strong> eliminácia sankčných poplatkov za štvrťhodinové odberové špičky.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>VN/NN rozvodne & trafostanice:</strong> komplexné prepojenie na vnútorné priemyselné rozvody podniku.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Legislatívny inžiniering:</strong> vybavenie povolenia distribúcie (SSD, ZSD, VSD), ÚRSO a dotácie SIEA.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Zmluvné SLA a dispečerský dohľad:</strong> monitoring 24/7 s garanciou rýchleho servisného zásahu.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Energetický manažment</span>
                  <span className="text-sky-400 font-bold">100% Turnkey Delivery</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lokálny zdroj & Zelená podnikom Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Legislatíva & Dotácie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Maximálny profit: Lokálny zdroj & Zelená podnikom
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Využite slovenské legislatívne výhody na zníženie distribučných poplatkov a získajte až 50% investície späť prostredníctvom štátneho grantu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lokálny Zdroj Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl font-black">
                ⚖️
              </div>
              <h3 className="text-2xl font-black text-white">Zákon č. 309/2009 Z. z. – Lokálny zdroj</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Inštalácia v režime Lokálneho zdroja (do 500 kWp) je určená pre výrobné podniky, poľnohospodárov a logistické areály. Umožňuje spotrebovať vlastnú solárnu energiu priamo na mieste výroby.
              </p>
              
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Oslobodenie od TPS a TSS:</strong> Neplatíte tarifu za prevádzkovanie systému ani systémové služby na vlastnú spotrebu.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Zjednodušený proces pripojenia:</strong> Prednostné schvaľovanie v distribučných spoločnostiach SSD, ZSD a VSD.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Bezplatný prenos prebytkov:</strong> Možnosť legálnej dodávky nespotrebovanej energie do siete alebo akumulácie do batériového úložiska.</span>
                </div>
              </div>
            </div>

            {/* Zelená podnikom Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-black">
                💶
              </div>
              <h3 className="text-2xl font-black text-white">Dotácia Zelená podnikom (SIEA)</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nenávratný finančný príspevok z európskych fondov a národných programov pre mikro, malé, stredné aj veľké podniky na území celého Slovenska.
              </p>
              
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Financovanie 35% až 50%:</strong> Výrazné skrátenie návratnosti investície na 2 až 3,5 roka.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Povinný energetický audit:</strong> Náš certifikovaný audítor vypracuje audit presne podľa metodiky SIEA.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Podpora fotovoltiky aj batérií (BESS):</strong> Dotáciu je možné uplatniť na panely, meniče aj veľkokapacitné batérie.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / References */}
      <section id="referencie-b2b" className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sky-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
              Skutočné výsledky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Prípadové štúdie priemyselných inštalácií
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Pozrite sa, ako pomáhame slovenským podnikom šetriť desaťtisíce eur ročne a stabilizovať výrobné náklady.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      Výkon: {study.installedPower}
                    </span>
                    <span className="text-xs text-slate-400">
                      Návratnosť: <strong className="text-emerald-400">{study.paybackPeriod}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {study.company}
                  </h3>
                  <div className="text-xs text-sky-400 font-medium">
                    {study.type}
                  </div>

                  <div className="space-y-2 py-3 border-y border-slate-800 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Typ inštalácie:</span>
                      <span className="text-right text-white font-medium">{study.roofType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ročná výroba:</span>
                      <span className="text-right text-white font-medium">{study.annualProduction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Priama ročná úspora:</span>
                      <span className="text-right text-emerald-400 font-bold">{study.annualSavings}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {study.highlights}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="#dopyt"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-center block text-white transition-colors"
                  >
                    Navrhnúť podobné riešenie
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Capabilities & Step-by-Step Workflow */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Firemný proces
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Od 15-minútovej analýzy po spustenie bez výpadku výroby
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Vážime si plynulosť vašej prevádzky. Inštalácie koordinujeme tak, aby nedošlo k prerušeniu výrobných procesov ani logistiky.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-3xl font-black text-sky-400/40">01</div>
              <h4 className="text-base font-bold text-white">Analýza diagramu</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Preskúmame vaše 15-minútové odberové maximá a navrhneme presný výkon bez zbytočných prebytkov.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-3xl font-black text-sky-400/40">02</div>
              <h4 className="text-base font-bold text-white">Statika & Projekt</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Statické posúdenie strechy, požiarna ochrana (rapid shutdown) a projekt pre distribučnú spoločnosť.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-3xl font-black text-sky-400/40">03</div>
              <h4 className="text-base font-bold text-white">Audit & Dotácia</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vypracovanie energetického auditu a podanie kompletnej žiadosti o grant Zelená podnikom.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-3xl font-black text-sky-400/40">04</div>
              <h4 className="text-base font-bold text-white">Čistá inštalácia</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Profesionálna montáž balastných či trapézových systémov a prepojenie na VN/NN rozvádzače haly.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <div className="text-3xl font-black text-sky-400/40">05</div>
              <h4 className="text-base font-bold text-white">Revízia & SLA</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Oficiálna revízna správa OPOS, kolaudácia, zapojenie do dispečingu a 24/7 monitoring s rýchlym servisom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              B2B Otázky a Odpovede
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Najčastejšie otázky firiem k fotovoltike
            </h2>
            <p className="text-slate-400 text-sm">
              Zaujímajú vás technické detaily, leasingové možnosti alebo legislatívne otázky? Radi vám poradíme.
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

      {/* B2B Lead Form Consultation Section */}
      <section id="dopyt" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-sky-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20">
                B2B Konzultácia & Audit
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Znížte energetické náklady vášho podniku
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Pošlite nám nezáväzný dopyt alebo ročnú faktúru za elektrinu. Náš B2B energetický špecialista pre vás spracuje model návratnosti a technické posúdenie realizácie.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priama B2B infolinka</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Komerčné dopyty & projekty</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
                    📋
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Právna forma & IČO</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.legalName} (IČO: {COMPANY_DETAILS.tax.ico})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-firma"
                source="page_fotovoltika_firma"
                title="B2B Dopyt na firemnú fotovoltiku"
                subtitle="Vyplňte kontaktné údaje vašej spoločnosti. Vypracujeme pre vás predbežnú štúdiu realizovateľnosti zdarma."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
