import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function NavrhProjektu() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Návrh projektu & Projektovanie', href: '/sluzby/navrh-projektu' },
  ];

  const parameterCards = [
    {
      id: '3d-simulacia',
      title: '3D Modelovanie a analýza zatienenia',
      badge: 'Fotometrická simulácia',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Digitálna dvojička vašej strechy s fotometrickou simuláciou slnečného svitu. Odhaľujeme mikrotieňovanie komínov, vikierov a stromov ešte pred položením jediného panelu.',
      features: [
        'Presný digitálny 3D model strechy s uvážením sklonu, azimutu a typu krytiny',
        'Simulácia tieňov vrhaných komínmi, vikiermi, okolitými stromami a susednými stavbami',
        'Výpočet optimálnych odstupov radov na plochých strechách (eliminácia vzájomného tienenia)',
        'Porovnanie ziskovosti variantov zapojenia stringov vs. použitie výkonových optimizérov',
        'Hodinová ročná krivka očakávanej výroby energie (PV*SOL / AutoCAD export)',
      ],
    },
    {
      id: 'elektro-projekt-sld',
      title: 'Elektrotechnický projekt & Jednopólové schémy (SLD)',
      badge: 'STN 33 2000-7-712',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Kompletný inžiniersky návrh elektrického zapojenia v súlade so slovenskými elektrotechnickými normami STN, zaručujúci maximálnu požiarnu i prevádzkovú bezpečnosť.',
      features: [
        'Detailné dimenzovanie prierezov solárnych káblov (Solárflex 4 mm² / 6 mm²) s úbytkom napätia < 1%',
        'Návrh DC stringových rozvádzačov s poistkovými odpínačmi gPV a spoľahlivými DC odpojovačmi',
        'Koordinácia stupňov prepäťových ochrán SPD Typ 1 + Typ 2 na DC aj AC strane',
        'Schéma zapojenia inteligentného Smart Metra a hybridného striedača s batériovým úložiskom',
        'Projekt prepojenia s domovým rozvádzačom, záložným okruhom (EPS/UPS) a podružnými okruhmi',
      ],
    },
    {
      id: 'distribucna-sustava',
      title: 'Projekt pripojenia do distribučnej sústavy',
      badge: 'SSD / ZSD / VSD',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Autorizovaná projektová dokumentácia pre prevádzkovateľov distribučných sústav. Garantujeme bezproblémové schválenie žiadosti o pripojenie mikrozdroja aj lokálneho zdroja.',
      features: [
        'Kompletná technická dokumentácia k žiadosti o pripojenie mikrozdroja (do 10,8 kW)',
        'Projektová dokumentácia pre lokálny zdroj a komerčné inštalácie nad 10,8 kW',
        'Posúdenie impedancie siete, skratových pomerov a spätného vplyvu na distribučnú sústavu',
        'Návrh sieťových ochrán a rozpadového miesta podľa technických podmienok distribútora',
        'Garancia rýchleho schválenia a bezproblémového osadenia 4-kvadrantného elektromera',
      ],
    },
    {
      id: 'statika-poziarna-ochrana',
      title: 'Statické a požiarno-bezpečnostné posúdenie',
      badge: 'STN EN 1991 / Eurokódy',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description:
        'Odborné statické výpočty zaťaženia krovu a požiarno-bezpečnostné riešenie stavby (PBS) garantujúce dlhodobú stabilitu a schválenie stavebným úradom i hasičmi.',
      features: [
        'Prepočet zaťaženia strešnej konštrukcie snehom a vetrom pre konkrétnu vetrovú a snehovú oblasť',
        'Výpočet potrebnej balastnej záťaže pre rovné strechy bez mechanického narušenia hydroizolácie',
        'Požiarno-bezpečnostné odstupy od požiarnych stien, svetlíkov a odvodňovacích žľabov',
        'Návrh certifikovaných protipožiarnych prestupov káblových trás triedy odolnosti EI 60 až EI 120',
        'Oficiálny podklad pre stavebný úrad (ohlásenie drobnej stavby alebo stavebné povolenie)',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Zber podkladov & satelitné zameranie',
      description:
        'Zanalyzujeme ortofotomapu vašej strechy, orientáciu, sklon, typ krytiny a vaše ročné vyúčtovacie faktúry pre presné stanovenie energetického profilu.',
    },
    {
      step: '02',
      title: '3D simulácia & optimalizácia rozmiestnenia',
      description:
        'Vytvoríme presný 3D model v simulačnom softvéri PV*SOL. Optimalizujeme rozostupy panelov, eliminujeme tiene z komínov a zvolíme najvýhodnejšie stringy.',
    },
    {
      step: '03',
      title: 'Elektrotechnický návrh & schémy',
      description:
        'Autorizovaný elektrotechnický projektant navrhne jednopólové schémy, dimenzovanie istenia, prepäťové ochrany T1+T2 a komunikačné trasy striedača s batériou.',
    },
    {
      step: '04',
      title: 'Autorizácia & schválenie distribúciou',
      description:
        'Finálnu dokumentáciu podáme na schválenie distribučnej spoločnosti (SSD, ZSD, VSD). Získate projekt pripravený na realizáciu s pečiatkou projektanta.',
    },
  ];

  const faqs = [
    {
      q: 'Prečo je 3D analýza zatienenia taká dôležitá pred montážou panelov?',
      a: 'Aj malý lokálny tieň z komína, vikiera či susedného stromu na jedinom solárnom článku môže znížiť výkon celého stringu o 30 až 50%. Naša fotometrická 3D analýza v PV*SOL presne nasimuluje dráhu slnka počas celých 8 760 hodín v roku, vďaka čomu panely umiestnime iba na nezatienené plochy alebo navrhneme výkonové optimizéry, čím ochránime vašu investíciu.',
    },
    {
      q: 'Aký je rozdiel medzi projektom pre rodinný dom a komerčnú firmu?',
      a: 'Rodinné domy sa štandardne pripájajú v zjednodušenom režime ako mikrozdroj do 10,8 kW, kde postačuje schéma skutočného vyhotovenia a revízia. Firmy a lokálne zdroje nad 10,8 kW vyžadujú autorizovaný elektrotechnický projekt, posúdenie spätnej dodávky do siete, návrh externého rozpadového miesta a často aj statický posudok krovu výrobnej haly.',
    },
    {
      q: 'Musí mať projekt fotovoltiky autorizačnú pečiatku?',
      a: 'Pre pripojenie štandardného mikrozdroja do 10,8 kW distribúcia vyžaduje jednopólovú schému zapojenia a protokol o nastavení ochrán potvrdený odborníkom. Pri inštaláciách nad 10,8 kW, komerčných objektoch a stavbách vyžadujúcich stavebné povolenie je autorizovaný projektant s osvedčením SKSI zákonnou požiadavkou.',
    },
    {
      q: 'Koľko trvá vypracovanie kompletného projektu?',
      a: 'Štandardný projekt pre rodinný dom s 3D fotometrickou simuláciou a jednopólovou schémou pripravíme do 3 až 5 pracovných dní. Komplexné komerčné projekty pre priemyselné budovy a firmy trvajú obvykle 1 až 2 týždne v závislosti od dostupnosti podkladov.',
    },
    {
      q: 'Čo ak distribútor zamietne žiadosť o pripojenie z dôvodu kapacity siete?',
      a: 'V regiónoch s preťaženou distribučnou sieťou môže distribútor obmedziť dodávku do siete. V takom prípade náš projektant navrhne systém s nulovým prietokom do siete (Zero Export) alebo hybridný systém s LiFePO4 batériovým úložiskom, ktorý distribúcia bezodkladne schváli, pretože sieť nijako nezaťažuje.',
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
          name: 'Návrh projektu & Projektovanie',
          item: 'https://marvol.sk/sluzby/navrh-projektu',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/sluzby/navrh-projektu#service',
      name: 'Návrh projektu & 3D simulácia fotovoltiky',
      serviceType: 'Elektrotechnické projektovanie a 3D analýza zatienenia',
      description:
        'Profesionálny elektrotechnický návrh fotovoltiky, 3D analýza zatienenia a jednopólové schémy. Kompletná projektová dokumentácia pre SSD, ZSD, VSD a stavebný úrad.',
      provider: {
        '@id': 'https://marvol.sk/#organization',
        '@type': 'LocalBusiness',
        name: COMPANY_DETAILS.legalName,
        telephone: COMPANY_DETAILS.contact.phoneClean,
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
      title="Návrh projektu & 3D simulácia fotovoltiky | Marvol s.r.o."
      description="Profesionálny elektrotechnický návrh fotovoltiky, 3D analýza zatienenia a jednopólové schémy. Kompletná projektová dokumentácia pre SSD, ZSD, VSD a stavebný úrad."
      canonicalPath="/sluzby/navrh-projektu"
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
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>📐 3D PVSol modelovanie & Inžiniering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Návrh projektu fotovoltiky <br className="hidden sm:block" />
                <span className="text-amber-400">a 3D analýza zatienenia</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Získajte precíznu projektovú dokumentáciu, fotometrickú simuláciu oslnenia a jednopólové schémy zapojenia. Navrhujeme fotovoltické systémy bez kompromisov s <strong className="text-white">garanciou schválenia</strong> u distribučných spoločností SSD, ZSD a VSD.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">98,5%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Presnosť predikcie výroby</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">8 760 h</div>
                  <div className="text-slate-400 text-xs mt-0.5">Simulácia dráhy slnka</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">0 €</div>
                  <div className="text-slate-400 text-xs mt-0.5">3D koncept pri realizácii</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-purple-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Súlad s STN normami</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Nezáväzný dopyt na projekt
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Zavolajte projektantovi: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-amber-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/navrh-projektu.jpg"
                    alt="Ilustračná fotka 3D projektovania a simulácie fotovoltiky Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Ilustračné foto 3D modelovania</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    PV*SOL Premium
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">3D modelovanie &amp; simulácia zatienenia</span>
                      <span className="text-amber-400 font-bold">Presnosť 98,5%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Kompletná projektová dokumentácia pre schválenie SSD, ZSD a VSD na prvé podanie.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Hodinová simulácia 8 760 h</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Jednopólové schémy zapojenia</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Statický posudok krovu</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Garancia schválenia distribúciou</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Parameter Cards Section */}
      <section id="parametre" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Inžinierske portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Projektová dokumentácia a simulácie
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Od vstupnej 3D fotometrie rodinného domu až po rozsiahle projekty firemných lokálnych zdrojov pripojených na vysoké napätie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {parameterCards.map((card) => (
              <div
                key={card.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                    {card.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-800 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Rozsah projektovej činnosti:
                    </div>
                    {card.features.map((feat, idx) => (
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
                    Dopytovať tento projekt
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4-Step Process Roadmap */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Proces inžinieringu
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha návrh fotovoltiky v Marvol s.r.o.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rýchly a transparentný postup od prvých satelitných dát až po autorizovanú dokumentáciu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative">
                <div className="text-4xl font-black text-amber-400/30 mb-2">{step.step}</div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-amber-400 font-bold text-base sm:text-lg">
                Projekt zdarma pri realizácii na kľúč
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Pri podpise zmluvy o dielo na kompletnú dodávku a montáž fotovoltiky od Marvol s.r.o. vám celú sumu za projektovú dokumentáciu odpočítame z ceny diela.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Získať projektový návrh
            </a>
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
              Všetko o projektovaní fotovoltických elektrární
            </h2>
            <p className="text-slate-400 text-sm">
              Máte špecifický projekt alebo atypickú strechu? Naši inžinieri sú pripravení zodpovedať vaše otázky.
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
                Bezplatný 3D návrh
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nezáväzný dopyt na projekt fotovoltiky
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Zašlite nám adresu nehnuteľnosti alebo pôdorys strechy a naši inžinieri pripravia 3D návrh, fotometrickú simuláciu oslnenia a predbežnú technickú kalkuláciu.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na projektantov</div>
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
                    <div className="text-xs text-slate-400">Projektové oddelenie</div>
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

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Garancia inžinierskeho servisu Marvol s.r.o.:</div>
                <div>Garantujeme 100% súlad projektovej dokumentácie s technickými podmienkami prevádzkovateľov distribučných sústav SSD, ZSD a VSD.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_navrh_projektu"
                title="Nezáväzný dopyt na projekt fotovoltiky"
                subtitle="Zašlite nám adresu nehnuteľnosti alebo pôdorys strechy a naši inžinieri pripravia 3D návrh a technickú kalkuláciu."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
