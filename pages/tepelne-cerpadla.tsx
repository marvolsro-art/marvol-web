import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function TepelneCerpadla() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Tepelné čerpadlá', href: '/tepelne-cerpadla' },
  ];

  const heatPumpTiers = [
    {
      id: 'tc-compact-6kw',
      name: 'Tepelné čerpadlo 6 kW',
      badge: 'Novostavby & Nízkoenergetické domy',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      cop: 'COP 5.05 (A+++)',
      coverage: 'Pre domy do 130 m²',
      description: 'Ultra úsporné invertorové čerpadlo typu Vzduch-Voda navrhnuté špeciálne pre moderné zateplené rodinné domy s podlahovým vykurovaním.',
      features: [
        'Vysoký vykurovací faktor COP 5.05 pri A7/W35',
        'Ekologické chladivo R290 (propán) alebo R32',
        'Mimoriadne tichá vonkajšia jednotka (od 28 dB vo vzdialenosti 3 m)',
        'Funkcia aktívneho chladenia v letných mesiacoch',
        'Inteligentná SG Ready komunikácia s fotovoltikou',
        'Vybavenie štátnej dotácie Zelená domácnostiam v cene',
      ],
      subsidy: 'Až do 2 760 €',
    },
    {
      id: 'tc-standard-10kw',
      name: 'Tepelné čerpadlo 9 – 12 kW',
      badge: 'Najpredávanejší model',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/15',
      cop: 'COP 4.90 (A+++)',
      coverage: 'Pre domy 130 – 250 m²',
      description: 'Univerzálny výkon pre štandardné rodinné domy aj čiastočne zrekonštruované staršie stavby. Zabezpečí komfortné vykurovanie, chladenie aj ohrev TÚV.',
      features: [
        'Celoročná prevádzka s garantovaným vykurovaním až do -25 °C',
        'All-in-One vnútorná veža s integrovaným 190–250 l nerezovým bojlerom',
        'Vstavaná záložná elektrická špirála 6–9 kW',
        'Ekvitermická regulácia podľa vonkajšej teploty',
        'Diaľkové ovládanie cez mobilnú aplikáciu odkiaľkoľvek',
        'Plná dotácia Zelená domácnostiam až 4 600 €',
      ],
      subsidy: 'Až do 4 600 €',
      popular: true,
    },
    {
      id: 'tc-power-16kw',
      name: 'Tepelné čerpadlo 14 – 16 kW',
      badge: 'Väčšie objekty & Rekonštrukcie',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      cop: 'COP 4.75 (A+++)',
      coverage: 'Pre domy 250+ m² & Radiátorové systémy',
      description: 'Vysokoteplotné riešenie schopné dodávať vykurovaciu vodu s teplotou až 70 °C, ideálne ako náhrada starého kotla na plyn alebo tuhé palivo s radiátormi.',
      features: [
        'Vysokoteplotná výstupná voda do 70 °C vhodná pre radiátory',
        'Invertorový kompresor s plynulou moduláciou výkonu',
        'Dvojitý rotačný kompresor s ochranou proti vibráciám',
        'Kaskádové zapojenie pre firemné objekty a bytové domy',
        'Špičkový záručný a pozáručný servis Marvol s.r.o.',
        'Zvýhodnená sadzba elektriny DD5 / D25 pre celú domácnosť',
      ],
      subsidy: 'Až do 4 600 €',
    },
  ];

  const faqs = [
    {
      q: 'Dokáže tepelné čerpadlo Vzduch-Voda spoľahlivo vykúriť dom aj počas tuhých mrazov (-20 °C)?',
      a: 'Áno. Moderné invertorové tepelné čerpadlá, ktoré inštalujeme, majú garantovanú prevádzku až do -25 °C. Využívajú vstrekovanie chladiva (EVI technológia) a optimalizovaný kompresor. V prípade extrémnych mrazov sa automaticky aktivuje bivalentný zdroj (integrovaná elektrická špirála), takže váš dom má vždy zabezpečený 100% teplotný komfort bez ohľadu na vonkajšie počasie.',
    },
    {
      q: 'Aká je výška dotácie na tepelné čerpadlo z programu Zelená domácnostiam?',
      a: 'Z národného projektu Zelená domácnostiam (SIEA) môžete na tepelné čerpadlo získať dotáciu v sadzbe 460 € na 1 kW inštalovaného výkonu až do výšky 4 600 € (maximálny podporovaný výkon je 10 kW). Pre nízkopríjmové domácnosti v programe Zelená solidarita môže podpora pokryť až 90 % oprávnených nákladov. Marvol s.r.o. zabezpečí kompletnú online rezerváciu prostriedkov v systéme SIEA za vás.',
    },
    {
      q: 'Ako presne funguje hybridná synergia medzi fotovoltikou a tepelným čerpadlom?',
      a: 'Tepelné čerpadlo je najväčším spotrebiteľom elektriny v dome. Keď ho prepojíme s fotovoltikou cez protokol SG Ready (Smart Grid Ready), striedač pošle signál tepelnému čerpadlu v momente, keď má dom prebytky slnečnej energie. Čerpadlo okamžite zvýši teplotu vody v akumulačnej nádrži alebo zásobníku TÚV o niekoľko stupňov (napr. zo 48 °C na 60 °C). Táto nádrž potom funguje ako bezplatná "tepelná batéria", z ktorej dom čerpá teplo večer.',
    },
    {
      q: 'Je vonkajšia jednotka tepelného čerpadla hlučná? Nebude rušiť susedov?',
      a: 'Dnešné prémiové vonkajšie jednotky využívajú aerodynamické lopatky ventilátora a odhlučnené kompresory umiestnené v dvojitej zvukovej izolácii. Hladina akustického tlaku vo vzdialenosti 3 metrov je len 28 až 35 dB(A), čo je tichšie ako tichý šepot alebo jemný dážď. Navyše disponujú nočným tichým režimom (Silent Mode), ktorý znižuje otáčky počas noci.',
    },
    {
      q: 'Môžem tepelné čerpadlo zapojiť na existujúce radiátory, alebo musím mať podlahové kúrenie?',
      a: 'Tepelné čerpadlá dosahujú najvyššiu efektivitu (COP 5.0) pri nízkoteplotnom podlahovom vykurovaní (35 °C). Vďaka vysokoteplotným modelom s výstupnou vodou 60 až 70 °C však vieme tepelné čerpadlo bez problémov napojiť aj na existujúce plechové či liatinové radiátory v starších rodinných domoch po výmene starého plynového kotla alebo kotla na uhlie.',
    },
    {
      q: 'Dokáže tepelné čerpadlo v lete dom aj chladiť?',
      a: 'Áno! Naše tepelné čerpadlá sú vybavené reverzným chodom a funkciou aktívneho chladenia. V lete odoberajú teplo z interiéru a odovzdávajú ho do vonkajšieho vzduchu. Chladenie môže prebiehať buď cirkuláciou chladnej vody v podlahovom kúrení (veľmi príjemné a bezprievanové chladenie), alebo pomocou fancoilových jednotiek (stropné/nástenné fancoily).',
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
          name: 'Tepelné čerpadlá',
          item: 'https://marvol.sk/tepelne-cerpadla',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/tepelne-cerpadla#service',
      name: 'Tepelné čerpadlá vzduch-voda',
      serviceType: 'Montáž a servis tepelných čerpadiel',
      description:
        'Inštalácia úsporných tepelných čerpadiel vzduch-voda s energetickou triedou A+++ a hybridnou integráciou s fotovoltikou.',
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
      title="Tepelné čerpadlá vzduch-voda | Predaj a montáž | Marvol s.r.o."
      description="Úsporné tepelné čerpadlá vzduch-voda s vysokou účinnosťou COP až 5.0. Vykurovanie, chladenie a ohrev vody. Ideálne v kombinácii s fotovoltikou s dotáciou SIEA."
      canonicalPath="/tepelne-cerpadla"
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
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Subsidy Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dotácia Zelená domácnostiam až do {COMPANY_DETAILS.subsidies.maxHeatPumpSubsidy}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Tepelné čerpadlá <br className="hidden sm:block" />
                <span className="text-amber-400">Vzduch-Voda s COP až 5.0</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Najefektívnejší spôsob vykurovania, chladenia a prípravy teplej vody pre váš dom. V kombinácii s fotovoltikou Marvol dosiahnete až <strong className="text-white">75% zníženie prevádzkových nákladov na vykurovanie</strong> vďaka inteligentnej akumulácii solárnych prebytkov do vody.
              </p>

              {/* Quick Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">A+++</div>
                  <div className="text-slate-400 text-xs mt-0.5">Najvyššia energetická trieda</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">COP 5.05</div>
                  <div className="text-slate-400 text-xs mt-0.5">1 kW elektriny = 5 kW tepla</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">SG Ready</div>
                  <div className="text-slate-400 text-xs mt-0.5">Hybridné solárne prepojenie</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#modely-tc"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Prehľad modelov & výkonov
                </a>
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Kalkulácia tepelných strát zdarma
                </a>
              </div>
            </div>

            {/* Visual Value Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-emerald-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/tepelne-cerpadla/hero.jpg"
                    alt="Ilustračná fotka inštalácie moderného tepelného čerpadla vzduch-voda Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Ilustračné foto inštalácie TČ</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    A+++ Účinnosť
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Monoblok / Split Vzduch-Voda</span>
                      <span className="text-emerald-400 font-bold">COP až 5.05</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Kombinácia vykurovania, chladenia a ohrevu teplej úžitkovej vody s prepojením na fotovoltiku.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Dotácia do {COMPANY_DETAILS.subsidies.maxHeatPumpSubsidy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>SG Ready solárna synergia</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Mimoriadne tichý chod (od 28 dB)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Záručný servis a revízie chladiva</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Heat Pump Models Section */}
      <section id="modely-tc" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Kategórie výkonov
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Dimenzované presne podľa tepelnej straty
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Poddimenzované čerpadlo bude v zime využívať drahú elektrickú špirálu. Predimenzované bude neekonomicky cyklovať. Náš certifikovaný technik vypočíta presnú tepelnú stratu vášho domu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {heatPumpTiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  tier.popular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-md">
                    Najobľúbenejší výkon
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Dotácia: {tier.subsidy}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                    {tier.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs font-semibold py-2 text-slate-300 mb-3">
                    <span className="text-amber-400 font-bold">{tier.cop}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-sky-400 font-bold">{tier.coverage}</span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-800 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Výbava a parametre:
                    </div>
                    {tier.features.map((feat, idx) => (
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
                      tier.popular
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg shadow-amber-400/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    Dopytovať kalkuláciu
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PV + Heat Pump Hybrid Synergy Deep Dive */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Dokonalá kombinácia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Fotovoltika + Tepelné čerpadlo = Maximálna nezávislosť
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Samostatná fotovoltika vyrába najviac energie vtedy, keď dom nepotrebuje kúriť. Prepojením s tepelným čerpadlom využijete solárnu elektrinu na maximum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-2xl font-black">
                ♨️
              </div>
              <h3 className="text-xl font-bold text-white">Zásobník vody ako tepelná batéria</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Slnečné prebytky namiesto lacného predaja do siete zohrejú akumulačnú nádrž na 60 °C. Uložená tepelná energia vykuruje dom večer a v noci bez nutnosti odberu zo siete.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400 text-2xl font-black">
                ❄️
              </div>
              <h3 className="text-xl font-bold text-white">Bezplatné letné chladenie</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                V najhorúcejších dňoch roka, kedy fotovoltika dosahuje špičkový výkon, tepelné čerpadlo beží v reverznom režime a chladí dom na príjemných 23 °C zadarmo priamo zo slnka.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-2xl font-black">
                💰
              </div>
              <h3 className="text-xl font-bold text-white">Dvojitá štátna dotácia</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Kombináciou fotovoltiky a tepelného čerpadla môžete v programe Zelená domácnostiam získať dotácie na obidve zariadenia – spolu až viac ako 7 800 € štátnej podpory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Installation Process */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Proces inštalácie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha inštalácia tepelného čerpadla?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Od prvotného výpočtu tepelných strát až po hydraulické zaregulovanie celej vykurovacej sústavy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400/40 mb-2">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Obhliadka & Výpočet</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Posúdime tepelnú izoláciu domu, stav radiátorov či podlahovky a určíme presný potrebný výkon čerpadla.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400/40 mb-2">02</div>
              <h4 className="text-lg font-bold text-white mb-2">Projekt & Dotácia</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Navrhneme hydraulickú schému, zabezpečíme online rezerváciu dotácie v portáli SIEA a pripravíme komponenty.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400/40 mb-2">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Hydraulická montáž</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Osadenie vonkajšej jednotky na antivibračný podstavec, zapojenie hydroboxu a akumulačnej nádrže v kotolni.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl font-black text-emerald-400/40 mb-2">04</div>
              <h4 className="text-lg font-bold text-white mb-2">Spustenie & Skúšky</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vákuovanie chladivového okruhu, napustenie upravenou vodou, odvzdušnenie, nastavenie ekvitermiky a zaškolenie.
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
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o tepelných čerpadlách a úspore tepla
            </h2>
            <p className="text-slate-400 text-sm">
              Potrebujete technické poradenstvo pre vašu konkrétnu stavbu? Radi vám pomôžeme.
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
              <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                Návrh vykurovania zdarma
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Získajte nezáväznú kalkuláciu tepelného čerpadla
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Napíšte nám podlahovú plochu domu, typ vykurovania (podlahovka / radiátory) a súčasný zdroj tepla. Náš technik vám pripraví kalkuláciu úspor a výšky štátnej dotácie.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Poradenstvo k vykurovaniu</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mailový dopyt</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    🏷️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Dotácia Zelená domácnostiam</div>
                    <span className="text-white font-medium">Až 4 600 € odpočítaných priamo z faktúry</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="cerpadlo"
                source="page_tepelne_cerpadla"
                title="Dopyt na tepelné čerpadlo"
                subtitle="Vyplňte formulár a pripravíme pre vás bezplatný prepočet tepelnej straty a cenovú ponuku."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
