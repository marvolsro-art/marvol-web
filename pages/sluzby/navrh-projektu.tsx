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
  AlertCircleIcon,
  ClockIcon
} from '@/components/icons';

export default function NavrhProjektu() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeCadTab, setActiveCadTab] = useState<'3d' | 'sld' | 'statika' | 'distribucia'>('3d');

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Návrh projektu & Projektovanie', href: '/sluzby/navrh-projektu' },
  ];

  const cadTabs = [
    {
      id: '3d',
      label: '1. 3D Fotometria & Tiene',
      title: 'Fotometrická simulácia oslnenia v PV*SOL Premium',
      badge: '8 760 hodín simulácie ročne',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      description:
        'Digitálne dvojča vašej strechy s presnosťou na centimetre. Simulujeme dráhu slnka počas celého roka, modelujeme tiene komínov, vikierov a susedných stromov.',
      specs: [
        { label: 'Ročná výroba', val: '1 120 kWh / kWp', note: 'lokalizované podľa GPS' },
        { label: 'Presnosť simulácie', val: '98.5 %', note: 'odchýlka voči realite < 1.5%' },
        { label: 'Analýza tienenia', val: 'Vypočítaná', note: 'rozdelenie na stringy a optimizéry' },
        { label: 'Orientácia & Sklon', val: 'Optimalizované', note: 'maximalizácia priamej spotreby' },
      ],
      output: 'Výstup: 3D vizualizácia rozmiestnenia panelov, diagram strát tienením a hodinová predikcia ročnej výroby energie.'
    },
    {
      id: 'sld',
      label: '2. Jednopólová schéma (SLD)',
      title: 'Elektrotechnický projekt & istenie podľa STN',
      badge: 'STN 33 2000-7-712',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
      description:
        'Kompletný projekt elektrického zapojenia fotovoltického zdroja, hybridného meniča a batériového úložiska. Presné dimenzovanie káblových trás a selektivita ochrán.',
      specs: [
        { label: 'Káblové trasy', val: 'Solárflex 6 mm²', note: 'úbytok napätia na DC strane < 0.8%' },
        { label: 'DC istenie', val: 'gPV 15A / 1000V', note: 'odpínače s poistkovými vložkami' },
        { label: 'Prepäťové ochrany', val: 'SPD Typ 1 + 2', note: 'koordinovaná ochrana AC aj DC' },
        { label: 'Záložný okruh', val: 'EPS / Back-Up', note: 'automatické prepnutie pri výpadku' },
      ],
      output: 'Výstup: Oficiálna schéma skutočného vyhotovenia (SLD), dimenzovanie vodičov, rozvádzačov a zoznam komponentov pre revízneho technika.'
    },
    {
      id: 'statika',
      label: '3. Statika a zaťaženie krovu',
      title: 'Statické a vetrové posúdenie nosnej konštrukcie',
      badge: 'Eurokódy EN 1991',
      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      description:
        'Kalkulácia prídavného zaťaženia strechy fotovoltikou s ohľadom na snehové a vetrové mapy Slovenska. Bezpečnosť bez kompromisov a bez rizika narušenia krovu.',
      specs: [
        { label: 'Prídavná váha', val: '+12 až 15 kg/m²', note: 'minimálna záťaž pre moderné krovy' },
        { label: 'Snehová oblasť', val: 'Oblasť I - IV', note: 'prepočet na extrémne zaťaženie snehom' },
        { label: 'Vetrové sanie', val: 'Aero-dynamické', note: 'spoľahlivé balastovanie plochých striech' },
        { label: 'Hydroizolácia', val: '100% chránená', note: 'špeciálne podložky bez prerazenia fólie' },
      ],
      output: 'Výstup: Posudok zaťaženia strechy, technický list kotvenia a podklad pre stavebný úrad alebo správcu objektu.'
    },
    {
      id: 'distribucia',
      label: '4. Distribúcia SSD / ZSD / VSD',
      title: 'Projekt pre pripojenie do distribučnej sústavy',
      badge: 'Garancia 1. podania',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      description:
        'Príprava žiadosti o pripojenie mikrozdroja (do 10,8 kW) alebo lokálneho zdroja pre firmy. 100% súlad s technickými podmienkami prevádzkovateľov sietí SSD, ZSD a VSD.',
      specs: [
        { label: 'Typ zdroja', val: 'Mikro / Lokálny', note: 'do 10,8 kW alebo firemné nad 10,8 kW' },
        { label: 'Nastavenie ochrán', val: 'Protokol U/F', note: 'presné frekvenčné a napäťové limity' },
        { label: 'Výmena elektromera', val: '4-kvadrantný', note: 'zabezpečíme schválenie distribúcie' },
        { label: 'Garancia schválenia', val: '100 % zmluva', note: 'žiadne prieťahy ani zamietnutia' },
      ],
      output: 'Výstup: Kompletná schválená zmluva o pripojení, protokol o funkčnej skúške a podklad pre montáž 4-kvadrantného elektromera.'
    }
  ];

  const currentTab = cadTabs.find(t => t.id === activeCadTab) || cadTabs[0];

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
      name: 'Návrh projektu fotovoltiky a 3D simulácia',
      serviceType: 'Projektovanie fotovoltických elektrární a elektroinžiniering',
      description:
        'Autorizovaný inžiniersky návrh fotovoltiky, 3D analýza zatienenia v PV*SOL, jednopólové schémy a projektová dokumentácia pre SSD, ZSD a VSD.',
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

      {/* HERO SECTION: Technical Blueprint CAD Theme */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-slate-950 border-b border-slate-800">
        {/* Subtle CAD Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <SunIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Inžinierske projektovanie &amp; 3D PV*SOL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Návrh projektu fotovoltiky <br className="hidden sm:block" />
                <span className="text-amber-400">s 3D analýzou oslnenia</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Navrhujeme solárne elektrárne na základe reálnych satelitných dát a fotometrickej simulácie. Žiadne odhady od stola – presný výpočet oslnenia, eliminácia tieňov a <strong className="text-white">100 % garancia schválenia</strong> distribučnými spoločnosťami SSD, ZSD a VSD.
              </p>

              {/* Technical Metrics HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">98,5 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Presnosť predikcie</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-mono font-black text-xl sm:text-2xl">8 760 h</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Simulácia tieňov/rok</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">0 €</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Projekt pri montáži</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">100 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Súlad s normami STN</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  Nezáväzný dopyt na 3D návrh
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Konzultácia s projektantom
                </a>
              </div>
            </div>

            {/* Right: Interactive CAD Terminal / Blueprint Explorer */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Terminal Header */}
                <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">PV*SOL-CAD-ENGINE.exe</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    Live Simulator
                  </span>
                </div>

                {/* CAD Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-950/60 p-1 border-b border-slate-800 text-xs font-medium">
                  {cadTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCadTab(tab.id as any)}
                      className={`py-2 px-2 text-center rounded-lg transition-all text-[11px] font-mono cursor-pointer ${
                        activeCadTab === tab.id
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      {tab.id.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Tab Active Content Box */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${currentTab.badgeColor}`}>
                        {currentTab.badge}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1.5">
                        {currentTab.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentTab.description}
                  </p>

                  {/* 2x2 Tech Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {currentTab.specs.map((s, idx) => (
                      <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">{s.label}</div>
                        <div className="text-sm font-bold font-mono text-white mt-0.5">{s.val}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{s.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* Output summary box */}
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-200/90 font-mono">
                    <FileTextIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{currentTab.output}</span>
                  </div>
                </div>

                {/* Terminal Footer CTA */}
                <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Potrebujete zamerať vašu strechu?</span>
                  <a href="#dopyt" className="text-amber-400 font-bold hover:underline">
                    Zadať adresu objektu →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: ARCHITECTURAL COMPARISON (Amatérsky odhad vs. Inžiniersky návrh MARVOL) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-amber-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
              Presnosť rozhoduje o návratnosti
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Prečo 90 % zlyhaní fotovoltiky vzniká už na rysovacej doske
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Porovnanie bežnej montážnej firmy vs. certifikovaného elektrotechnického inžinieringu Marvol s.r.o.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Bežný montážnik */}
            <div className="bg-red-950/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <AlertCircleIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Bežný predajca / Montáž od oka</h3>
                  <div className="text-xs text-red-400 font-mono">Časté chyby a skryté straty</div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <div>
                    <strong className="text-white block">Ignorovanie mikrotieňov</strong>
                    Panely umiestnené v blízkosti komína alebo vikiera zrazia výkon celého stringu o 30 až 50 % počas najlepších hodín.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <div>
                    <strong className="text-white block">Preťaženie káblov a úbytky napätia</strong>
                    Použitie poddimenzovaných vodičov (4 mm² na dlhých trasách) vedie k neustálemu vypínaniu meniča na prepätie siete (253 V).
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <div>
                    <strong className="text-white block">Prieťahy pri schvaľovaní distribúciou</strong>
                    Neúplná schéma bez protokolov sieťových ochrán končí zamietnutím zo strany SSD, ZSD alebo VSD a zdržaním o niekoľko mesiacov.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <div>
                    <strong className="text-white block">Žiadna statická kontrola krovu</strong>
                    Riziko priehybu krovu pri snehovej nádielke alebo poškodenia strešnej krytiny pri veterných poryvoch.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Inžiniering Marvol */}
            <div className="bg-emerald-950/15 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl shadow-emerald-950/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Inžiniersky štandard MARVOL s.r.o.</h3>
                  <div className="text-xs text-emerald-400 font-mono">100% bezpečnosť &amp; maximálny energetický výnos</div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <div>
                    <strong className="text-white block">Fotometria PV*SOL (8 760 hodín)</strong>
                    Presne vieme, kam ktorý tieň dopadne v ľubovoľný deň v roku. Panely umiestňujeme iba do zón s maximálnou solárnou ziskovosťou.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <div>
                    <strong className="text-white block">Prémiové káble Solárflex 6 mm² &amp; STN súlad</strong>
                    Úbytok napätia prísne pod 0,8 %. Systém funguje stabilne aj pri horúcich letných špičkách bez výpadkov striedača.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <div>
                    <strong className="text-white block">Garancia schválenia distribúciou na 1. podanie</strong>
                    Projektová dokumentácia vyhotovená v plnom súlade s technickými podmienkami SSD, ZSD a VSD. Žiadne prestoje.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <div>
                    <strong className="text-white block">Statické &amp; požiarno-bezpečnostné posúdenie</strong>
                    Prepočet zaťaženia krovu podľa Eurokódov a návrh certifikovaných protipožiarnych káblových prestupov.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 4 PILIERE PROJEKTOVEJ DOKUMENTÁCIE (Asymmetric Specs Grid) */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-amber-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
              Obsah dokumentácie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Čo presne od nás dostanete do rúk
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Kompletný projektový balík autorizovaný elektrotechnickým inžinierom, pripravený pre realizáciu, revíziu i distribučnú spoločnosť.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                  01
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3D Situačný výkres strechy</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Detailný výkres rozmiestnenia modulov s presnými kótami, odstupmi od hromozvodu a hraníc požiarneho úseku.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Kóty a rozostupy radov</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Odstupy od hromozvodu</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Azimut a sklon krytiny</li>
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                  02
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Jednopólová schéma (SLD)</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Oficiálna elektrotechnická schéma zapojenia stringov, hybridného meniča, LiFePO4 batérie a domového rozvádzača.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-sky-400" /> Dimenzovanie káblových trás</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-sky-400" /> DC a AC prepäťové ochrany</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-sky-400" /> Záložný EPS Back-Up okruh</li>
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                  03
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Technická správa pre SSD / ZSD</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Autorizovaná správa s výpočtom skratových pomerov, spätnej dodávky do siete a nastavenia sieťových ochrán.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Protokol nastavenia ochrán</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Výpočet impedancie slučky</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> Zmluva o pripojení mikrozdroja</li>
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold mb-4 font-mono text-lg">
                  04
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Simulačný audit výnosov</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Certifikovaný PV*SOL výstup s mesačnou a hodinovou bilanciou výroby, priamej spotreby a návratnosti v eurách.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 border-t border-slate-800/80 pt-3">
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Hodinová predikcia výroby</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Percentuálne pokrytie spotreby</li>
                <li className="flex items-center gap-2"><CheckIcon className="w-3.5 h-3.5 text-amber-400" /> Finančný model návratnosti</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INŽINIERSKY HARMONOGRAM (Timeline) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-amber-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
              Ako postupujeme
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Cesta od adresy domu po hotový projekt
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Všetko vybavíme rýchlo a transparentne do 3 až 5 pracovných dní.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative">
              <span className="inline-block text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-3">
                DEŇ 1
              </span>
              <h3 className="text-base font-bold text-white mb-2">Zber dát &amp; Ortofotomapa</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Podľa adresy zanalyzujeme satelitné snímky strechy, orientáciu, sklon a vaše ročné faktúry za elektrinu.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative">
              <span className="inline-block text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-full border border-sky-400/20 mb-3">
                DEŇ 2
              </span>
              <h3 className="text-base font-bold text-white mb-2">3D Model &amp; Fotometria</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vymodelujeme objekt v PV*SOL Premium, nasimulujeme ročné tiene a optimalizujeme umiestnenie panelov.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative">
              <span className="inline-block text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mb-3">
                DEŇ 3 – 4
              </span>
              <h3 className="text-base font-bold text-white mb-2">Jednopólová schéma &amp; Istenie</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Autorizovaný inžinier vypracuje SLD schému zapojenia, dimenzuje prepäťové ochrany a pripraví žiadosť pre SSD/ZSD.
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 relative">
              <span className="inline-block text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-3">
                DEŇ 5
              </span>
              <h3 className="text-base font-bold text-white mb-2">Odovzdanie &amp; Schválenie</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Dostanete autorizovaný projekt s pečiatkou pripravený na montáž. Podklady podávame priamo na distribúciu.
              </p>
            </div>
          </div>

          {/* Value Banner */}
          <div className="mt-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-amber-400 font-bold text-base sm:text-lg">
                Projekt máte ZDARMA pri realizácii na kľúč
              </div>
              <div className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                Pri podpise zmluvy o dielo na kompletnú montáž od Marvol s.r.o. vám celú cenu projektovej dokumentácie odpočítame z realizačnej faktúry.
              </div>
            </div>
            <a
              href="#dopyt"
              className="inline-flex items-center justify-center min-h-[48px] px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 shadow-lg shadow-amber-400/20"
            >
              Získať projektový návrh
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
              Odpovede inžinierov
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Často kladené otázky k projektovaniu
            </h2>
            <p className="text-slate-400 text-sm">
              Máte špecifický projekt alebo atypickú strechu? Radi vám technicky poradíme.
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
              <span className="inline-block text-amber-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                Začnite bezplatným 3D návrhom
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nezáväzný dopyt na projekt fotovoltiky
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Zadajte adresu vašej nehnuteľnosti alebo priložte pôdorys strechy. Naši projektanti pripravia 3D fotometrický model oslnenia a nezáväzný technický posudok.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <PhoneIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priama linka na projektové oddelenie</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <MailIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Projektové a technické dopyty</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <BuildingOfficeIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Inžinierske sídlo MARVOL s.r.o.</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_navrh_projektu"
                title="Dopyt na projekt a 3D simuláciu"
                subtitle="Zadajte adresu a kontaktné údaje. Projektant sa vám ozve s 3D konceptom."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
