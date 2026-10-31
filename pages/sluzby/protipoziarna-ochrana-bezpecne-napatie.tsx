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

export default function ProtipoziarnaOchranaBezpecneNapatie() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeScenario, setActiveScenario] = useState<'bežna' | 'marvol'>('marvol');

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Protipožiarna ochrana & Bezpečné napätie', href: '/sluzby/protipoziarna-ochrana-bezpecne-napatie' },
  ];

  const safetyPillars = [
    {
      step: '01',
      title: 'TIGO Rapid Shutdown – Beznapäťová strecha do 30 sekúnd',
      badge: 'Bezpečné dotykové napätie SELV',
      badgeColor: 'border-red-500/30 text-red-400 bg-red-500/10',
      description:
        'Pod každý panel inštalujeme inteligentný odpájací modul. Pri vypnutí hlavného vypínača, výpadku siete alebo stlačení núdzového tlačidla Total Stop moduly zrazia napätie každého panelu na bezpečný 1 V. Celá strecha má okamžite menej ako 30 V DC, takže hasiči môžu bezpečne zasahovať vodným prúdom.',
      points: [
        'Zníženie napätia na streche pod 30 V DC celkovo do 30 sekúnd',
        'Umožňuje hasičom hasiť objekt kompaktným vodným prúdom bez rizika úrazu prúdom',
        'Fail-safe princíp: automatické rozpojenie pri výpadku AC napájania',
        'Plný súlad s medzinárodnými normami NEC 690.12 a STN 33 2000-7-712'
      ]
    },
    {
      step: '02',
      title: 'AFCI – AI Detekcia elektrického oblúka do 2,5 milisekundy',
      badge: 'STN EN 63027 / AI Algoritmus',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Jednosmerný oblúk vzniká pri uvoľnení konektora alebo prehryznutí kábla hlodavcom. Má teplotu vyše 3 000 °C a sám nezhasne. Naše hybridné striedače využívajú umelú inteligenciu, ktorá vzorkuje frekvenčné spektrum prúdu a oblúk okamžite preruší do 2,5 ms – skôr než stihne vzniknúť plameň.',
      points: [
        'Kontinuálne digitálne vzorkovanie DC spektra na zbernici meniča',
        'Bleskové rozpojenie obvodu do 2,5 ms pri prvom náznaku mikroskopického iskrenia',
        'Spoľahlivá prevencia požiarov spôsobených zoxidovanými MC4 konektormi',
        'Ochrana nehnuteľnosti pred prepálením strešnej krytiny a podkrovia'
      ]
    },
    {
      step: '03',
      title: 'Hasičský bezpečnostný vypínač Total Stop',
      badge: 'STN 92 0203 / HaZZ súlad',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Motorický odpojovač inštalovaný čo najbližšie k vstupu solárnych káblov do budovy. Slúži na okamžité odrezanie budovy od solárneho generátora. Vybavený je certifikovaným červeným hríbovým tlačidlom Total Stop na ľahko dostupnom mieste označenom reflexnými piktogramami.',
      points: [
        'Motorický DC odpínač umiestnený pred vstupom káblov do interiéru',
        'Núdzové tlačidlo Total Stop prístupné pre zasahujúce hasičské jednotky',
        'Pružinový mechanizmus: automatické rozopnutie pri výpadku napájania',
        'Možnosť prepojenia so systémom EPS (Elektronická požiarna signalizácia)'
      ]
    },
    {
      step: '04',
      title: 'Certifikované Hilti protipožiarne prestupy EI 60 až EI 120',
      badge: 'Hilti Firestop / LSOH bezhalogén',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Káblové trasy prestupujúce cez strešný plášť, stropy a steny dôkladne utesňujeme certifikovanými intumescentnými tmelmi a manžetami Hilti. Pri pôsobení tepla materiál zväčší svoj objem a nepriedušne utesní otvor, čím zabráni šíreniu toxických splodín a ohňa medzi požiarnymi úsekmi.',
      points: [
        'Atestované požiarno-bezpečnostné manžety s odolnosťou 60 až 120 minút',
        'Použitie bezhalogénových solárnych káblov s nízkou dymivosťou (LSOH / FRNC)',
        'Nevyhnutný doklad ku kolaudácii a pre poistné krytie poisťovňou bez krátenia',
        'Zamedzenie prieniku dymu do obytných miestností pri lokálnom požiari'
      ]
    }
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
      name: 'Protipožiarna ochrana fotovoltiky & Bezpečné napätie',
      serviceType: 'Požiarna bezpečnosť fotovoltických systémov a Rapid Shutdown',
      description:
        'Protipožiarna ochrana fotovoltiky podľa STN 33 2000-7-712 a STN 92 0203. Rapid Shutdown pod 30 V do 30 sekúnd, AI AFCI oblúková ochrana a Hilti prestupy.',
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
      title="Protipožiarna ochrana fotovoltiky & Rapid Shutdown | Marvol s.r.o."
      description="Protipožiarna bezpečnosť fotovoltiky podľa STN 33 2000-7-712 a STN 92 0203. Rapid Shutdown pod 30 V do 30 sekúnd, AI AFCI oblúková ochrana a Hilti prestupy."
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

      {/* HERO SECTION: High-Contrast Safety & Fire Protocol Theme */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-slate-950 border-b border-slate-800">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold tracking-wide">
                <ShieldIcon className="w-4 h-4 text-red-400 shrink-0" />
                <span>Požiarny štandard HaZZ &amp; STN 33 2000-7-712</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Protipožiarna ochrana <br className="hidden sm:block" />
                <span className="text-red-400">a beznapäťová strecha do 30 s</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Bežná fotovoltika vyrába nebezpečných 600 až 1 000 V DC aj keď v dome vypnete hlavný istič. Náš bezpečnostný systém okamžite zrazí napätie na streche pod 30 V, umožní <strong className="text-white">bezpečný zásah hasičov kompaktným prúdom vody</strong> a chráni vašu rodinu i majetok.
              </p>

              {/* Safety Metrics HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-red-400 font-mono font-black text-xl sm:text-2xl">&lt; 30 V</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Bezpečné napätie SELV</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">&lt; 30 s</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Rapid Shutdown limit</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-mono font-black text-xl sm:text-2xl">2,5 ms</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">AI AFCI detekcia oblúka</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">EI 120</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Požiarna odolnosť Hilti</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-xl font-black text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
                >
                  Požiadať o požiarny audit
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Konzultácia s revíznym technikom
                </a>
              </div>
            </div>

            {/* Right: Real Photography & Fire Safety Status Badge */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-red-500/30 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/protipoziarna-ochrana.jpg"
                    alt="Protipožiarna ochrana a bezpečné napätie fotovoltiky Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-red-500/40 text-red-400 font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span>Certifikácia HaZZ / STN 92 0203</span>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white font-black text-xs rounded-full">
                    Total Stop Ready
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Odpájače TIGO na úrovni modulov</span>
                      <span className="text-red-400 font-bold font-mono">100% ochrana</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Po stlačení núdzového tlačidla klesne napätie každého panelu na 1 V. Hasiči môžu bez obáv striekať vodu na strechu.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 grid grid-cols-2 gap-3 text-xs border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Moduly TIGO Rapid Shutdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-red-400 shrink-0" />
                    <span>AI AFCI oblúková ochrana</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Hasičský spínač Total Stop</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Hilti požiarny tmel EI 120</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: 4 OCHRANNÉ ŠTÍTY BEZPEČNOSTI (Pillar Architecture) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-red-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 mb-4 sm:mb-5">
              4 Piliere bezpečnosti MARVOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Viacúrovňový požiarny štít vašej nehnuteľnosti
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Kombinujeme hardvérové odpájače modulov, umelú inteligenciu v striedači a certifikované stavebné protipožiarne prestupy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyPillars.map((p) => (
              <div
                key={p.step}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-2xl font-black font-mono text-red-400/40">
                      {p.step}
                    </span>
                    <span className={`inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5">
                    {p.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {p.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800 pt-4">
                    {p.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-850">
                  <a
                    href="#dopyt"
                    className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
                  >
                    Dopytovať toto zabezpečenie →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: SIMULÁCIA NÚDZOVEJ SITUÁCIE (Interactive Disaster Scenario) */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-red-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 mb-4 sm:mb-5">
              Scenár požiaru v reálnom čase
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Čo sa stane pri požiari susedného objektu alebo podkrovia?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Porovnajte reakciu štandardnej fotovoltiky a certifikovaného bezpečnostného systému Marvol s.r.o.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Bežná inštalácia */}
            <div className="bg-red-950/20 border-2 border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Bežná fotovoltika (Bez Rapid Shutdown)</h3>
                  <div className="text-xs text-red-400 font-mono">Vysoké riziko pre zásah hasičov</div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/20">
                  <strong className="text-red-300 block mb-1">1. Vypnutie hlavného ističa:</strong>
                  V dome síce nejde prúd, ale solárne panely na streche naďalej vyrábajú 600 až 1 000 V DC. Káble v podkroví sú pod plným vysokým napätím.
                </div>
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/20">
                  <strong className="text-red-300 block mb-1">2. Zásah hasičskej jednotky HaZZ:</strong>
                  Pre riziko smrteľného úrazu elektrickým prúdom hasiči nesmú striekať vodu na solárne panely zblízka. Strecha často kontrolovane dohorí.
                </div>
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/20">
                  <strong className="text-red-300 block mb-1">3. Likvidácia poistnej udalosti:</strong>
                  Poisťovňa pri vyšetrovaní zistí absenciu hasičského spínača a necertifikované káblové prestupy, čo vedie ku kráteniu poistného plnenia.
                </div>
              </div>
            </div>

            {/* Right: Marvol Bezpečný systém */}
            <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-emerald-950/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Bezpečný systém MARVOL s.r.o.</h3>
                  <div className="text-xs text-emerald-400 font-mono">Okamžitá beznapäťová zóna pre záchranu majetku</div>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                  <strong className="text-emerald-300 block mb-1">1. Stlačenie Total Stop alebo výpadok siete:</strong>
                  Moduly TIGO okamžite rozpoja obvod priamo na každom paneli. Napätie na celej streche do 30 sekúnd klesne pod 30 V DC (SELV).
                </div>
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                  <strong className="text-emerald-300 block mb-1">2. Okamžité hasenie vodou:</strong>
                  Hasiči vidia reflexné označenie Total Stop a vedomí si beznapäťového stavu môžu okamžite hasiť strechu i krov štandardným vodným prúdom.
                </div>
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                  <strong className="text-emerald-300 block mb-1">3. 100% poistné plnenie:</strong>
                  Všetky prestupy majú atest Hilti Firestop a revízna správa obsahuje protokol o požiarnom spínači. Poisťovňa plní bez námietok.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LEGISLATION & INSURANCE STANDARDS */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-red-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 mb-4 sm:mb-5">
              Právna a požiarna istota
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Súlad so slovenskými zákonmi a požiadavkami poisťovní
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Všetky komponenty a inštalačné postupy Marvol s.r.o. spĺňajú najprísnejšie slovenské elektrotechnické normy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-bold mb-4 font-mono text-sm">
                STN
              </div>
              <h3 className="text-base font-bold text-white mb-2">STN 33 2000-7-712</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Požiadavky na fotovoltické napájacie systémy. Predpisuje koordináciu stupňov prepäťových ochrán T1+T2 a bezpečné uloženie DC káblov.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold mb-4 font-mono text-sm">
                HaZZ
              </div>
              <h3 className="text-base font-bold text-white mb-2">Vyhláška MV SR č. 94/2004 Z. z.</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Technické požiadavky na protipožiarnu bezpečnosť pri výstavbe a užívaní stavieb. Stanovuje pravidlá pre káblové prestupy a hasičské vypínače.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold mb-4 font-mono text-sm">
                POISŤ
              </div>
              <h3 className="text-base font-bold text-white mb-2">Poistné podmienky bez výluk</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Naša certifikovaná montáž s revíznou správou garantuje plné poistné krytie nehnuteľnosti bez rizika krátenia poistného plnenia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-red-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 mb-4 sm:mb-5">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Všetko o požiari a bezpečnosti fotovoltiky
            </h2>
            <p className="text-slate-400 text-sm">
              Máte otázky k montáži Rapid Shutdown na existujúcu elektráreň alebo ku kolaudácii?
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-red-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-red-400 transition-transform duration-200 shrink-0 ${
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
              <span className="inline-block text-red-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-red-400/10 border border-red-400/20">
                Požiarny audit &amp; Dodatočná montáž
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Zabezpečte svoju fotovoltiku proti požiaru
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Máte novostavbu alebo chcete dovybaviť existujúcu fotovoltiku o Rapid Shutdown a požiarny spínač Total Stop? Vyplňte formulár a naši požiarni špecialisti pripravia návrh riešenia.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold shrink-0">
                    <PhoneIcon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Požiarny a revízny technik MARVOL</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-red-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold shrink-0">
                    <MailIcon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Požiarna bezpečnosť a audit</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-red-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold shrink-0">
                    <BuildingOfficeIcon className="w-5 h-5 text-red-400" />
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
                source="page_sluzby_protipoz_ochrana"
                title="Dopyt na protipožiarnu ochranu"
                subtitle="Odborný návrh Rapid Shutdown a požiarnych spínačov."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
