import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function ProtipoziarnaOchranaBezpecneNapatie() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Protipožiarna ochrana & Bezpečné napätie', href: '/sluzby/protipoziarna-ochrana-bezpecne-napatie' },
  ];

  const parameterCards = [
    {
      id: 'rapid-shutdown',
      title: 'Rapid Shutdown – Zníženie DC napätia na bezpečnú úroveň',
      badge: 'Bezpečné malé napätie SELV',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Okamžitá redukcia nebezpečného jednosmerného napätia na streche. Do 30 sekúnd klesne napätie každého panelu na úroveň bezpečnú pre zásah hasičov i servis.',
      features: [
        'Zníženie napätia na streche pod 120 V DC celkovo (menej ako 1 V na modul) do 30 sekúnd',
        'Umožňuje hasičom bezpečne hasiť objekt vodným prúdom bez rizika zásahu elektrickým prúdom',
        'Automatická aktivácia pri výpadku distribučnej siete alebo stlačení núdzového tlačidla',
        'Eliminácia vysokého napätia (600–1000 V DC), ktoré na bežných paneloch trvalo pretrváva',
        'Plný súlad s medzinárodnými normami NEC 690.12 a STN 33 2000-7-712',
      ],
    },
    {
      id: 'afci-afdd',
      title: 'AFCI & AFDD – Inteligentná AI detekcia elektrického oblúka',
      badge: 'STN EN 63027',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Digitálna ochrana pred vznikom požiaru. Pokročilé algoritmy v reálnom čase analyzujú spektrum prúdu a bleskovo prerušia obvod pri náznaku iskrenia.',
      features: [
        'Neustále digitálne vzorkovanie frekvenčného spektra jednosmerného prúdu na DC zbernici',
        'Okamžité prerušenie obvodu pri detekcii mikroskopického iskrenia do 2,5 milisekundy',
        'Prevencia vzniku plameňov pri uvoľnených, zvetraných alebo zoxidovaných MC4 konektoroch',
        'Ochrana káblov pred prehriatím pri poškodení hlodavcami, kunami alebo mechanickým trením',
        'Integrovaná funkcia v moderných inteligentných striedačoch najvyššej bezpečnostnej kategórie',
      ],
    },
    {
      id: 'hasicsky-vypinac-total-stop',
      title: 'Hasičský bezpečnostný vypínač & Total Stop',
      badge: 'STN 92 0203 / Súlad HaZZ',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Certifikovaný motorický odpojovač inštalovaný na vstupe DC káblov do budovy. Poskytuje okamžité odpojenie fotovoltiky v prípade požiaru alebo mimoriadnej udalosti.',
      features: [
        'Motorický odpínač DC vedenia inštalovaný čo najbližšie k prestupu do chráneného priestoru budovy',
        'Núdzové tlačidlo (Total Stop / Central Stop) umiestnené na prístupnom mieste pre zásah HaZZ',
        'Pružinový mechanizmus fail-safe: automatické rozpojenie kontaktov pri výpadku AC napájania',
        'Prepojenie so systémami EPS (Elektronická požiarna signalizácia) v komerčných objektoch',
        'Jasné reflexné výstražné označenie solárnej inštalácie podľa predpisov hasičského zboru',
      ],
    },
    {
      id: 'protipoziarne-prestupy',
      title: 'Certifikované protipožiarne prestupy EI 60 až EI 120',
      badge: 'Hilti Firestop / LSOH',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description:
        'Odborné utesnenie káblových trás cez obvodové plášte, steny a stropy pomocou atestovaných požiarnych manžiet a intumescentných tmelov Hilti.',
      features: [
        'Dôkladné utesnenie všetkých strešných a stenových prestupov káblov intumescentnými tmelmi',
        'Zamedzenie šírenia dymu, toxických splodín horenia a ohňa medzi jednotlivými požiarnymi úsekmi',
        'Použitie výhradne bezhalogénových solárnych káblov s nízkou dymivosťou (LSOH / FRNC)',
        'Dodržanie bezpečných odstupov fotovoltických panelov od požiarnych stien a odvodňovacích žľabov',
        'Vystavenie protokolu o požiarnych prestupoch potrebného ku kolaudácii a pre poistné krytie',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Požiarny audit & analýza rizík',
      description:
        'Preveríme typ strešnej krytiny, prestupy do interiéru, požiarnu odolnosť krovu a prístupové trasy pre hasičskú techniku.',
    },
    {
      step: '02',
      title: 'Výber bezpečnostných technológií',
      description:
        'Navrhneme konfiguráciu modulov Rapid Shutdown na úrovni jednotlivých panelov, striedač s AI AFDD a umiestnenie hasičského tlačidla.',
    },
    {
      step: '03',
      title: 'Certifikovaná montáž prestupov',
      description:
        'Aplikujeme certifikované protipožiarne tmely a manžety Hilti na všetkých káblových trasách s požiarnou odolnosťou až EI 120.',
    },
    {
      step: '04',
      title: 'Funkčné preskúšanie & požiarny certifikát',
      description:
        'Vykonáme reálny test núdzového odpojenia pod záťažou, zmeriame pokles DC napätia a vystavíme protokol pre kolaudáciu a poisťovňu.',
    },
  ];

  const faqs = [
    {
      q: 'Prečo hasiči nemôžu bežnú fotovoltiku hasiť vodou?',
      a: 'Pri bežnej fotovoltickej inštalácii vyrábajú solárne panely elektrinu nepretržite, pokiaľ na ne dopadá denné svetlo. Na streche a v kábloch tak pretrváva vysoké jednosmerné napätie 600 až 1 000 V DC, ktoré nemožno vypnúť hlavným ističom v dome. Pri hasení kompaktným prúdom vody hrozí zasahujúcim hasičom smrteľný úraz elektrickým prúdom, preto hasiči často musia nechať strechu kontrolovane dohorieť.',
    },
    {
      q: 'Ako presne funguje technológia Rapid Shutdown?',
      a: 'Pod každý solárny panel (alebo dvojicu panelov) sa inštaluje inteligentný odpájací modul. Pri vypnutí hlavného vypínača, výpadku siete alebo stlačení hasičského tlačidla Total Stop moduly okamžite prerušia tok prúdu a znížia výstupné napätie každého panelu na bezpečný 1 volt. Celé DC vedenie na streche i v dome má okamžite bezpečné napätie pod 30 až 120 V DC (SELV).',
    },
    {
      q: 'Čo je to elektrický oblúk a prečo vzniká?',
      a: 'Jednosmerný elektrický oblúk vzniká pri mikroskopickom uvoľnení konektora, narušení izolácie kábla hlodavcom alebo výrobnej chybe solárneho článku. Keďže jednosmerný prúd na rozdiel od striedavého neprechádza nulou, oblúk sám nezhasne, dosahuje teplotu viac ako 3 000 °C a dokáže okamžite prepáliť plech i zapáliť strechu. Technológia AFDD (AFCI) ho deteguje a odpojí do 2,5 milisekundy.',
    },
    {
      q: 'Je hasičský vypínač povinný zo zákona?',
      a: 'Pre komerčné budovy, výrobné haly a vybrané objekty vyplýva povinnosť inštalácie hasičského vypínača priamo z vyhlášky MV SR č. 94/2004 Z. z. a normy STN 92 0203. Pri rodinných domoch ho naši špecialisti dôrazne odporúčajú pre ochranu životov rodiny a bezproblémové plnenie poistnej udalosti bez krátenia poistného.',
    },
    {
      q: 'Dá sa protipožiarna ochrana domontovať aj na existujúcu staršiu fotovoltiku?',
      a: 'Áno. Špecializujeme sa aj na modernizáciu existujúcich fotovoltických elektrární. Vieme dodatočne nainštalovať moduly Rapid Shutdown, externý hasičský bezpečnostný spínač aj certifikované protipožiarne prestupy bez nutnosti výmeny samotných panelov.',
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
          name: 'Protipožiarna ochrana & Bezpečné napätie',
          item: 'https://marvol.sk/sluzby/protipoziarna-ochrana-bezpecne-napatie',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/sluzby/protipoziarna-ochrana-bezpecne-napatie#service',
      name: 'Protipožiarna ochrana fotovoltiky & Bezpečné napätie',
      serviceType: 'Požiarna bezpečnosť fotovoltiky, Rapid Shutdown a AFDD',
      description:
        'Maximálna požiarna bezpečnosť fotovoltiky: Rapid Shutdown, zníženie DC napätia pod 120V, AFDD detekcia elektrického oblúka a súlad s STN 92 0203. Chráňte svoj majetok.',
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
      title="Protipožiarna ochrana fotovoltiky & Bezpečné napätie | Marvol s.r.o."
      description="Maximálna požiarna bezpečnosť fotovoltiky: Rapid Shutdown, zníženie DC napätia pod 120V, AFDD detekcia elektrického oblúka a súlad s STN 92 0203. Chráňte svoj majetok."
      canonicalPath="/sluzby/protipoziarna-ochrana-bezpecne-napatie"
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
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>🛡️ Požiarna bezpečnosť STN 92 0203 & STN EN 62109</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Protipožiarna ochrana fotovoltiky <br className="hidden sm:block" />
                <span className="text-rose-400">a technológia bezpečného napätia</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Chráňte svoju rodinu a nehnuteľnosť. Inštalujeme systémy <strong className="text-white">Rapid Shutdown na okamžité zníženie DC napätia pod 120 V</strong>, pokročilú AFDD detekciu elektrického oblúka a certifikované hasičské vypínače v plnom súlade s predpismi HaZZ SR.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-rose-400 font-black text-xl sm:text-2xl">&lt; 120 V</div>
                  <div className="text-slate-400 text-xs mt-0.5">Bezpečné napätie SELV</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">&lt; 2,5 ms</div>
                  <div className="text-slate-400 text-xs mt-0.5">Čas odpojenia oblúka AFDD</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">EI 60–120</div>
                  <div className="text-slate-400 text-xs mt-0.5">Odolnosť prestupov Hilti</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Súlad s predpismi HaZZ</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400 hover:opacity-95 shadow-xl shadow-rose-500/20 text-center transition-all cursor-pointer"
                >
                  Konzultovať požiarnu bezpečnosť
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Technická podpora: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                  Požiarna Istota
                </div>

                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-rose-400 text-2xl">🛡️</span>
                  Prečo nepodceňovať požiarnu ochranu FV?
                </h3>

                <ul className="space-y-3.5 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Možnosť hasenia vodou:</strong> Zníženie napätia pod 120 V umožní hasičom bezpečne zasiahnuť bez rizika úrazu prúdom.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Okamžité zastavenie oblúka:</strong> AFDD systém rozpozná mikro-iskrenie skôr, ako vznikne otvorený plameň.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Plné plnenie od poisťovní:</strong> Doklad o požiarnych prestupoch a revízii chráni pred krátením poistného plnenia.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Tlačidlo Total Stop:</strong> Núdzový vypínač umiestnený na dostupnom mieste pre okamžité odpojenie celého objektu.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span><strong>Bezhalogénová kabeláž:</strong> Káble LSOH pri prípadnom zahriatí neuvoľňujú jedovaté plynné splodiny ani leptavé kyseliny.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Platná slovenská norma:</span>
                  <span className="text-rose-400 font-bold">STN 92 0203 & HaZZ SR</span>
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
            <span className="text-rose-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
              Bezpečnostné technológie
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Systémy požiarnej ochrany fotovoltiky
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Kombinácia aktívnych a pasívnych bezpečnostných prvkov, ktoré garantujú nekompromisnú ochranu vášho majetku a životov.
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
                      Technické parametre & funkcie:
                    </div>
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="text-rose-400 font-bold shrink-0">✓</span>
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
                    Dopytovať požiarnu ochranu
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
            <span className="text-rose-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
              Bezpečnostný audit
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha zabezpečenie fotovoltiky
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Systematický postup od obhliadky až po finálne preskúšanie a požiarny atest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative">
                <div className="text-4xl font-black text-rose-400/30 mb-2">{step.step}</div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-rose-400 font-bold text-base sm:text-lg">
                Dodatočná montáž bezpečného napätia na existujúcu fotovoltiku
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Máte staršiu fotovoltiku bez Rapid Shutdown a bojíte sa rizika požiaru? Zabezpečíme odbornú dodatočnú inštaláciu bezpečnostných odpájačov.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Objednať požiarny audit
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-rose-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o požiarnej bezpečnosti solárnych systémov
            </h2>
            <p className="text-slate-400 text-sm">
              Máte obavy z požiarnych rizík alebo otázky k hasičským predpisom? Radi vám odborne odpovieme.
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-rose-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-rose-400 transition-transform duration-200 shrink-0 ${
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
              <span className="text-rose-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
                Bezpečnostná konzultácia
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Konzultácia požiarnej bezpečnosti a revízia
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Chcete mať 100% istotu, že vaša fotovoltika spĺňa všetky bezpečnostné normy STN a neohrozuje vašu nehnuteľnosť? Napíšte nám a naši revízni technici posúdia váš systém.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-rose-400/10 border border-rose-400/30 flex items-center justify-center text-rose-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na špecialistu požiarnej ochrany</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-rose-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-rose-400/10 border border-rose-400/30 flex items-center justify-center text-rose-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mail pre zasielanie technickej dokumentácie</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-rose-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-rose-400/10 border border-rose-400/30 flex items-center justify-center text-rose-400 font-bold shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sídlo spoločnosti</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Bezpečnostný certifikát Marvol s.r.o.:</div>
                <div>Všetky nami inštalované bezpečnostné prvky a protipožiarne prestupy sú certifikované a schválené pre bezpečný zásah Hasičského a záchranného zboru SR.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="elektro"
                source="page_sluzby_protipoziarna_ochrana"
                title="Konzultácia požiarnej bezpečnosti a revízia"
                subtitle="Chcete mať 100% istotu, že vaša fotovoltika spĺňa všetky bezpečnostné normy STN a neohrozuje vašu nehnuteľnosť? Napíšte nám."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
