import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function InstalaciaMontaz() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Montáž a inštalácia na kľúč', href: '/sluzby/instalacia-montaz' },
  ];

  const parameterCards = [
    {
      id: 'stresne-konstrukcie',
      title: 'Konštrukcie na všetky typy striech bez zatekania',
      badge: 'Nerez A2 & Al 6060 T6',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Robustné montážne systémy z eloxovaného hliníka a nerezovej ocele triedy A2/A4. Montujeme bezpečne na každú strešnú krytinu s plnou zárukou proti zatekaniu.',
      features: [
        'Šetrná montáž na pálenú a betónovú škridlu pomocou pevných výškovo nastaviteľných nerezových hákov',
        'Bezvŕtacie uchytenie na falcovaný plech pomocou certifikovaných hliníkových falcových svoriek',
        'Hliníkové miniraily s vulkanizovanou EPDM tesniacou vrstvou na trapézový a sendvičový plech',
        'Aerodynamické zaťažené konštrukcie na rovné strechy s veternými deflektormi bez kotvenia do fólie',
        'Prvotriedny spojovací materiál a nerezové skrutky zamedzujúce galvanickej korózii',
      ],
    },
    {
      id: 'elektromontaz-normy',
      title: 'Certifikované elektroinštalačné práce (§ 22 / § 23)',
      badge: 'Vyhláška 508/2009 Z. z.',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Odborné zapojenie DC a AC elektrických rozvodov certifikovanými elektrotechnikmi. Dbáme na najvyššiu kvalitu spojov, bezpečnosť a protipožiarny štandard.',
      features: [
        'Vedenie DC solárnych káblov v certifikovaných chráničkách s vysokou UV stabilitou (Kopoflex / FXP)',
        'Precízne krimpovanie originálnych MC4 konektorov certifikovaným kalibrovaným náradím Stäubli',
        'Zostavenie DC a AC rozvádzačov s prepäťovými ochranami T1+T2 a selektívnymi ističmi',
        'Prepojenie hlavného domového rozvádzača a integrácia Smart Metra pre dynamické riadenie tokov',
        'Dôsledné pospájanie kovových konštrukcií a prepojenie na uzemňovaciu sústavu (STN EN 62305)',
      ],
    },
    {
      id: 'striedace-baterie-bess',
      title: 'Inštalácia hybridných striedačov a batérií (BESS)',
      badge: 'Záložné napájanie UPS',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Montáž a konfigurácia špičkových meničov a bezpečných LiFePO4 batériových modulov. Zabezpečíme plynulý prechod na núdzové napájanie (EPS) pri výpadku siete.',
      features: [
        'Osadenie a zapojenie prémiových striedačov (Solax, GoodWe, Huawei, Fronius, Deye)',
        'Inštalácia bezpečných LiFePO4 batériových modulov s viacstupňovým BMS a balancovaním článkov',
        'Zapojenie vyhradeného havarijného okruhu (EPS / Backup) s prepnutím do mikrosekúnd',
        'Dodržanie predpísaných bezpečnostných odstupov a odvetrania technickej miestnosti',
        'Prepojenie komunikačných zberníc CAN / RS485 a nastavenie online cloudového monitoringu',
      ],
    },
    {
      id: 'ozivenie-diagnostika',
      title: 'Oživenie, diagnostika a odovzdanie',
      badge: 'Protokol o spustení',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description:
        'Komplexné meranie elektrických parametrov každého stringu, testovanie ochrán, spárovanie mobilnej aplikácie a detailné zaškolenie majiteľa.',
      features: [
        'Meranie napätí naprázdno (Voc) a skratových prúdov (Isc) každého solárneho stringu',
        'Meranie izolačného stavu vodičov pred pripojením k striedaču kalibrovaným prístrojom',
        'Nastavenie parametrov siete podľa požiadaviek distribučnej spoločnosti (SSD, ZSD, VSD)',
        'Spárovanie mobilnej aplikácie a zaškolenie majiteľa do bezpečnej a hospodárnej prevádzky',
        'Odovzdanie kompletnej dokumentácie, protokolu o spustení a aktivácia záručných lehôt',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Príprava & logistika materiálu',
      description:
        'Vopred skontrolujeme kompletnosť komponentov, dopravíme certifikované panely, striedač, batérie a kotviaci materiál priamo na miesto inštalácie.',
    },
    {
      step: '02',
      title: 'Strešná montáž panelov',
      description:
        'Montážny tím osadí nerezové háky, hliníkové nosné profily a bezpečne uloží a prepojí fotovoltické moduly bez porušenia hydroizolácie strechy.',
    },
    {
      step: '03',
      title: 'Elektromontáž technológie',
      description:
        'Elektrikári nainštalujú striedač, batériové moduly, DC a AC rozvádzače s prepäťovými ochranami a zapoja Smart meter do hlavného rozvádzača.',
    },
    {
      step: '04',
      title: 'Oživenie & zaškolenie obsluhy',
      description:
        'Vykonáme revízne merania, oživíme systém, otestujeme núdzový režim EPS a zaškolíme vás do obsluhy mobilnej aplikácie na sledovanie výroby.',
    },
  ];

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
      '@id': 'https://marvol.sk/sluzby/instalacia-montaz#service',
      name: 'Montáž a inštalácia fotovoltiky na kľúč',
      serviceType: 'Inštalácia fotovoltických panelov, meničov a batérií',
      description:
        'Profesionálna montáž fotovoltiky, hybridných striedačov a batérií certifikovanými montérmi (§ 22, § 23). Hliníkové konštrukcie, bezchybné elektropráce a záruka.',
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
      title="Montáž a inštalácia fotovoltiky na kľúč | Marvol s.r.o."
      description="Profesionálna montáž fotovoltiky, hybridných striedačov a batérií certifikovanými montérmi (§ 22, § 23). Hliníkové konštrukcie, bezchybné elektropráce a záruka."
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>⚡ Certifikovaní elektrikári § 22 & § 23</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Profesionálna montáž fotovoltiky <br className="hidden sm:block" />
                <span className="text-amber-400">a elektroinštalácia na kľúč</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Montáž fotovoltických panelov, hybridných striedačov a batériových úložísk bez kompromisov. Používame nerezové a hliníkové komponenty, <strong className="text-white">zachovávame záruku na vašu strechu</strong> a garantujeme bezchybné zapojenie elektroinštalácie.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">1 – 2 dni</div>
                  <div className="text-slate-400 text-xs mt-0.5">Doba montáže rodinného domu</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Certifikované náradie Stäubli</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">IP65 / 66</div>
                  <div className="text-slate-400 text-xs mt-0.5">Odolnosť rozvádzačov</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-purple-400 font-black text-xl sm:text-2xl">10 rokov</div>
                  <div className="text-slate-400 text-xs mt-0.5">Záruka na montážne práce</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Dopyt na montáž fotovoltiky
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Technické konzultácie: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-amber-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/montaz-instalacia.jpg"
                    alt="Ilustračná fotka odbornej montáže fotovoltických panelov na strechu Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Ilustračné foto montáže</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    1–2 Dni Na Kľúč
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Certifikovaní montážnici &amp; horolezci</span>
                      <span className="text-amber-400 font-bold">100% Tesnosť</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Precízne kotvenie bez poškodenia strešnej krytiny s EPDM tesnením a zárukou 5 rokov.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Originálne MC4 konektory</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Prepäťové ochrany T1+T2</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Meranie Voc &amp; Isc pred zapnutím</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Čisté pracovisko bez odpadu</span>
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
              Technologické postupy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Špičkové montážne a elektroinštalačné práce
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Detailný prehľad našich inštalačných postupov, ktoré zaručujú bezporuchovú prevádzku fotovoltiky počas desiatok rokov.
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
                      Kľúčové technické parametre:
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
                    Dopytovať montáž
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
              Priebeh realizácie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha inštalácia fotovoltiky krok za krokom
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rýchla, čistá a organizovaná montáž bez narušenia vášho rodinného komfortu.
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
                10-ročná záruka na montážne a konštrukčné práce
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Za našou prácou si 100% stojíme. Na strešné uchytenie, konštrukciu a káblové trasy poskytujeme garanciu stability a tesnosti.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Objednať montáž na kľúč
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
              Všetko o montáži a inštalácii fotovoltiky
            </h2>
            <p className="text-slate-400 text-sm">
              Zaujíma vás technický detail montáže alebo organizácia prác? Radi vám všetko objasníme.
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
                Montáž na kľúč
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Objednajte si profesionálnu montáž na kľúč
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Certifikovaní technici Marvol s.r.o. zabezpečia bezpečnú a rýchlu inštaláciu vašej fotovoltickej elektrárne. Zanecháme čistú prácu, revíznu správu a bezstarostne fungujúci systém.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na dispečing montáží</div>
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
                    <div className="text-xs text-slate-400">E-mail pre technické konzultácie</div>
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
                <div className="font-semibold text-slate-300">Bezpečnostný záväzok Marvol:</div>
                <div>Montáže realizujeme výlučne vlastnými certifikovanými pracovníkmi s osvedčením podľa vyhlášky 508/2009 Z. z. a poistením zodpovednosti za škodu.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_instalacia_montaz"
                title="Objednajte si profesionálnu montáž na kľúč"
                subtitle="Certifikovaní technici Marvol s.r.o. zabezpečia bezpečnú a rýchlu inštaláciu vašej fotovoltickej elektrárne."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
