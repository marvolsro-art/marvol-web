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
  WrenchIcon,
  AlertCircleIcon,
  ClockIcon
} from '@/components/icons';

export default function InstalaciaMontaz() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeRoofTab, setActiveRoofTab] = useState<'skridla' | 'falc' | 'plocha' | 'trapez'>('skridla');

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Montáž a inštalácia na kľúč', href: '/sluzby/instalacia-montaz' },
  ];

  const roofSystems = [
    {
      id: 'skridla',
      title: 'Pálená & Betónová škridla (Bramac, Tondach, Terran)',
      badge: 'Nerez A2 Vario háky',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      description:
        'Používame zosilnené nerezové háky triedy A2 s nastaviteľnou výškou. Každú škridlu nad hákom jemne a presne zabrusujeme diamantovým kotúčom, aby dokonale doľahla bez bodového pnutia či prasknutia.',
      highlights: [
        'Kotvenie priamo do nosných krokiev krovu certifikovanými nerezovými vrutmi',
        'Presné diamantové zabrúsenie škridiel – strecha zostáva 100% vodotesná',
        'Použitie tesniacich EPDM podložiek a penových manžiet proti vnikaniu snehu',
        'Eloxované hliníkové profily 40x40 mm triedy Al 6060 T6 s nerezovým spojovacím materiálom'
      ],
      guarantee: 'Garantujeme nulové zatekanie a plné zachovanie životnosti strešného plášťa.'
    },
    {
      id: 'falc',
      title: 'Falcovaný plech & Klip-panel',
      badge: '100% Bez vŕtania do krytiny',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
      description:
        'Montáž bez jediného prevŕtania plechu! Používame špeciálne falcové svorky, ktoré pevne zovrú stojatý falc. Strešná krytina zostáva úplne neporušená, vďaka čomu nestrácate záruku od výrobcu strechy.',
      highlights: [
        'Uchytenie výhradne mechanickým zovretím falcu kalibrovaným momentom',
        'Nulový prienik skrutiek cez plech – absolútna ochrana pred koróziou a zatekaním',
        'Dilatačné medzery zohľadňujúce tepelnú rozťažnosť kovových striech v lete a zime',
        'Nerezové skrutky so špeciálnym poistným zubom zamedzujúce samovoľnému uvoľneniu'
      ],
      guarantee: '100 % zachovanie továrenskej záruky na plechovú strešnú krytinu.'
    },
    {
      id: 'plocha',
      title: 'Plochá strecha (Fatrafol, PVC fólia, EPDM, Štrk)',
      badge: 'Aerodynamický balastný systém',
      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      description:
        'Samonosné aerodynamické konštrukcie orientované na Východ-Západ alebo Juh so sklonom 10° až 15°. Žiadne mechanické kotvenie cez hydroizolačnú fóliu – stabilita je zabezpečená presne vypočítanou betónovou záťažou.',
      highlights: [
        'Konštrukcia spočíva na hrubých EPDM gumových podložkách chrániacich fóliu',
        'Veterné deflektory na zadnej strane znižujú sací účinok vetra na minimum',
        'Výpočet balastnej záťaže v simulačnom softvéri podľa vetrovej mapy danej obce',
        'Otvorený odvodňovací systém – dažďová voda voľne odteká do strešných vpustí'
      ],
      guarantee: 'Certifikovaná montáž bez porušenia hydroizolácie a bez rizika pretekania.'
    },
    {
      id: 'trapez',
      title: 'Trapézový plech & Sendvičové PUR panely',
      badge: 'EPDM vulkanizované tesnenie',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      description:
        'Montáž pomocou hliníkových minirailov kotvených priamo do koruny trapézového profilu. Každý spoj je vybavený vulkanizovaným tesnením EPDM odolným voči UV žiareniu, mrazu a teplotám do 120 °C.',
      highlights: [
        'Krátke hliníkové koľajnice (Minirails) pre minimálne zaťaženie konštrukcie',
        'Samovrtné nerezové bimetalové skrutky s EPDM tesniacou podložkou',
        'Rýchla a čistá inštalácia bez narušenia nosnej konštrukcie haly či prístrešku',
        'Ideálne riešenie pre firemné haly, prístrešky pre autá a hospodárske budovy'
      ],
      guarantee: 'Vysoká odolnosť voči veternému saniu testovaná v aerodynamických tuneloch.'
    }
  ];

  const currentRoof = roofSystems.find(r => r.id === activeRoofTab) || roofSystems[0];

  const faqs = [
    {
      q: 'Koľko trvá samotná fyzická montáž na rodinnom dome?',
      a: 'Štandardnú inštaláciu pre rodinný dom (výkon 3 až 10 kWp s batériou) zvládne náš certifikovaný montážny tím za 1 až 2 pracovné dni. Prvý deň obvykle prebiehajú práce na streche a kabeláž, druhý deň montáž striedača, batérie, zapojenie rozvádzačov, oživenie a testovanie.',
    },
    {
      q: 'Hrozí pri montáži poškodenie škridly alebo zatekanie strechy?',
      a: 'Rozhodne nie. Na pálenú aj betónovú škridlu používame pevné nerezové háky s presným nastavením výšky. Každú škridlu, pod ktorou vedie hák, jemne a presne zabrusujeme diamantovým kotúčom, aby dokonale doľahla a nevzniklo bodové pnutie ani škára pre vniknutie vody.',
    },
    {
      q: 'Kam je najlepšie umiestniť striedač a batérie?',
      a: 'Ideálnym miestom je technická miestnosť, garáž, kotolňa alebo suchá vetraná pivnica. Tieto priestory poskytujú stabilnú teplotu (odporúčané rozmedzie 10 až 25 °C), ktorá maximalizuje životnosť LiFePO4 batériových článkov a zabraňuje ich predčasnej degradácii.',
    },
    {
      q: 'Aké kvalifikácie majú vaši montéri?',
      a: 'Všetci členovia nášho elektro tímu majú platné elektrotechnické osvedčenia podľa vyhlášky MPSVR SR č. 508/2009 Z. z. (§ 21, § 22 samostatný elektrotechnik a § 23 elektrotechnik na riadenie činnosti). Zároveň disponujú certifikátmi pre práce vo výškach a výrobnými školeniami pre striedače a batérie.',
    },
    {
      q: 'Čo sa stane, ak počas montáže začne pršať?',
      a: 'Bezpečnosť našich technikov i nehnuteľnosti klienta je prvoradá. V prípade silného dažďa práce na streche dočasne prerušíme a venujeme sa elektroinštalačným prácam v interiéri. Strecha je počas celej realizácie plne chránená proti zatekaniu.',
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
          name: 'Montáž a inštalácia na kľúč',
          item: 'https://marvol.sk/sluzby/instalacia-montaz',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Profesionálna montáž fotovoltiky na kľúč',
      serviceType: 'Inštalácia fotovoltických panelov, meničov a batériových úložísk',
      description:
        'Odborná montáž fotovoltických panelov certifikovanými elektrikármi § 22 a § 23. Nerezové konštrukcie, garancia proti zatekaniu strechy a montáž do 30 dní.',
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
      title="Profesionálna montáž fotovoltiky na kľúč | Marvol s.r.o."
      description="Odborná montáž fotovoltiky, striedačov a batérií certifikovanými montérmi (§ 22, § 23). Hliníkové konštrukcie bez zatekania, Stäubli náradie a garancia do 30 dní."
      canonicalPath="/sluzby/instalacia-montaz"
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

      {/* HERO SECTION: Craftsmanship & 30-Day Guarantee */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
                <WrenchIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Certifikovaní elektrotechnici § 22 &amp; § 23</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Profesionálna montáž fotovoltiky <br className="hidden sm:block" />
                <span className="text-amber-400">s garanciou do 30 dní</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Montujeme fotovoltické systémy, hybridné striedače a batériové úložiská vlastným tímom certifikovaných majstrov. Používame nerezové a hliníkové konštrukcie, <strong className="text-white">garantujeme nulové zatekanie</strong> a bezchybné elektroinštalačné práce v súlade s normami STN.
              </p>

              {/* Quality Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">Do 30 dní</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Garantovaný termín</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-mono font-black text-xl sm:text-2xl">1 – 2 dni</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Trvanie montáže RD</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">100 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Stäubli MC4 náradie</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">10 rokov</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Záruka na montáž</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                >
                  Dopytovať realizáciu na kľúč
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Zavolať vedúcemu montáží
                </a>
              </div>
            </div>

            {/* Right: Real Photography & Guarantee Badge */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/montaz-instalacia.jpg"
                    alt="Odborná montáž fotovoltických panelov Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Vlastný elektro tím</span>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full">
                    Garantované do 30 dní
                  </div>

                  {/* Bottom description */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Precízna montáž bez zatekania</span>
                      <span className="text-emerald-400 font-bold font-mono">100% tesnosť</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Diamantové zabrusovanie škridiel, originálne konektory Stäubli a revízia priamo pri odovzdaní.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 grid grid-cols-2 gap-3 text-xs border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Nerezové A2/A4 háky</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>UV chráničky Kopoflex</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>IP65 rozvádzače s SPD T1+T2</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Zaškolenie do mobilnej appky</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE ROOF MOUNTING SELECTOR */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Certifikované systémy kotvenia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Strešné konštrukcie bez kompromisov a bez zatekania
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Každá strecha vyžaduje iný inžiniersky prístup. Vyberte váš typ krytiny a zistite, ako zabezpečujeme jej 100% tesnosť.
            </p>
          </div>

          {/* Roof Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {roofSystems.map((roof) => (
              <button
                key={roof.id}
                onClick={() => setActiveRoofTab(roof.id as any)}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  activeRoofTab === roof.id
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {roof.id === 'skridla' && 'Pálená & Betónová škridla'}
                {roof.id === 'falc' && 'Falcovaný plech & Klip'}
                {roof.id === 'plocha' && 'Plochá strecha (Fólia / Štrk)'}
                {roof.id === 'trapez' && 'Trapéz & Sendvičový panel'}
              </button>
            ))}
          </div>

          {/* Active Roof Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentRoof.badgeColor}`}>
                  {currentRoof.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {currentRoof.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {currentRoof.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentRoof.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                      <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2.5 font-medium">
                  <ShieldIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{currentRoof.guarantee}</span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                  <WrenchIcon className="w-8 h-8" />
                </div>
                <div className="text-lg font-bold text-white">Máte atypickú strechu?</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Náš statik a šéf montáží osobne posúdia typ krytiny, stav krovu a navrhnú individuálne riešenie kotvenia.
                </p>
                <a
                  href="#dopyt"
                  className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Konzultovať môj typ strechy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CRAFTSMANSHIP COMPARISON (Marvol vs. Lacná montáž) */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Kvalita v detailoch
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Prečo remeselná kvalita montáže rozhoduje o požiari a zatekaní
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Fotovoltická elektráreň pracuje s jednosmerným napätím až 1 000 V. Každý zlý spoj je potenciálnym zdrojom požiaru.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                  <th className="py-4 px-6 w-1/3">Technický detail montáže</th>
                  <th className="py-4 px-6 w-1/3 text-red-400 bg-red-950/10 rounded-t-xl">Bežná lacná montáž</th>
                  <th className="py-4 px-6 w-1/3 text-emerald-400 bg-emerald-950/20 rounded-t-xl font-bold">Štandard MARVOL s.r.o.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Solárne DC konektory</td>
                  <td className="py-4 px-6 bg-red-950/5 text-slate-400">Nekompatibilné čínske klony krimpované kliešťami z hobby marketu (Riziko oblúka).</td>
                  <td className="py-4 px-6 bg-emerald-950/10 text-white font-medium">Originálne konektory Stäubli MC4 Evo-2 krimpované certifikovaným kalibrovaným náradím.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Ochrana káblových trás</td>
                  <td className="py-4 px-6 bg-red-950/5 text-slate-400">Voľne pohodené káble na škridle bez chráničiek – degradácia UV žiarením do 3 rokov.</td>
                  <td className="py-4 px-6 bg-emerald-950/10 text-white font-medium">Kopoflex a UV stabilné chráničky po celej dĺžke, bezpečné prestupy cez krov s požiarnou penou.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Uťahovanie spojov</td>
                  <td className="py-4 px-6 bg-red-950/5 text-slate-400">Uťahovanie aku-vŕtačkou od oka – strhnuté závity alebo nedostatočný prítlak.</td>
                  <td className="py-4 px-6 bg-emerald-950/10 text-white font-medium">Každý spoj dotiahnutý certifikovaným momentovým kľúčom na presný predpísaný moment (Nm).</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Strešné háky &amp; Tesnenie</td>
                  <td className="py-4 px-6 bg-red-950/5 text-slate-400">Tenké pozinkované háky, škridly vypodložené nasilu, vznik pnutia a praskania.</td>
                  <td className="py-4 px-6 bg-emerald-950/10 text-white font-medium">Zosilnené nerezové Vario háky A2, jemné diamantové zabrúsenie škridiel a penové tesnenia.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Oživenie &amp; Revízia</td>
                  <td className="py-4 px-6 bg-red-950/5 text-slate-400">Montéri zapnú menič a odídu; revízna správa príde poštou po týždňoch bez merania.</td>
                  <td className="py-4 px-6 bg-emerald-950/10 text-white font-medium">Oživenie kalibrovaným prístrojom Metrel, meranie Voc/Isc, test EPS zálohy a zaškolenie majiteľa.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3-STAGE WORKFLOW TIMELINE */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Priebeh realizácie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Harmonogram montáže rodinného domu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Od príchodu montážnej dodávky po oživenie meniča pracujeme čisto, precízne a bez zbytočného hluku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-lg font-mono mb-4">
                FÁZA 1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Strecha &amp; Mechanická montáž</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Osadenie nerezových hákov do krovu, montáž hliníkových profilov, precízne diamantové zabrúsenie škridiel a uloženie fotovoltických panelov.
              </p>
              <div className="text-[11px] text-slate-300 space-y-1 border-t border-slate-800/80 pt-3 font-mono">
                <div>✓ Čas: cca 4 až 6 hodín</div>
                <div>✓ Čistota na pracovisku</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-lg font-mono mb-4">
                FÁZA 2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Elektroinštalácia &amp; Rozvádzače</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Vedenie DC káblov v UV chráničkách, montáž DC/AC rozvádzačov s prepäťovými ochranami T1+T2 a pripojenie Smart Metra do hlavného domového rozvádzača.
              </p>
              <div className="text-[11px] text-slate-300 space-y-1 border-t border-slate-800/80 pt-3 font-mono">
                <div>✓ Certifikovaní elektrikári § 22</div>
                <div>✓ Pospájanie HUS uzemnenia</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg font-mono mb-4">
                FÁZA 3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Menič, Batéria &amp; Zaškolenie</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Zavesenie striedača, inštalácia LiFePO4 batérie, konfigurácia záložného režimu EPS, testovanie kalibrovaným prístrojom a inštalácia mobilnej appky do vášho smartfónu.
              </p>
              <div className="text-[11px] text-slate-300 space-y-1 border-t border-slate-800/80 pt-3 font-mono">
                <div>✓ Okamžitá výroba energie</div>
                <div>✓ Detailné zaškolenie majiteľa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o montáži fotovoltiky
            </h2>
            <p className="text-slate-400 text-sm">
              Máte otázky k postupu prác, termínom alebo umiestneniu batérie?
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
              <span className="text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Garantovaná montáž do 30 dní
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nezáväzný dopyt na montáž fotovoltiky
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Vyplňte krátky dopyt a náš šéf montáží vás bude kontaktovať ohľadom zamerania strechy a dohodnutia garantovaného termínu inštalácie.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <PhoneIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na vedúceho montáží</div>
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
                    <div className="text-xs text-slate-400">Dopyty a technická podpora</div>
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
                    <div className="text-xs text-slate-400">Montážne stredisko MARVOL s.r.o.</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_instalacia_montaz"
                title="Dopyt na montáž na kľúč"
                subtitle="Rezervujte si termín montáže s garanciou realizácie do 30 dní."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
