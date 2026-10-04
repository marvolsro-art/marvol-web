import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function ElektroinstalacieRevizie() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Elektroinštalácie & Revízie', href: '/elektroinstalacie-revizie' },
  ];

  const serviceCategories = [
    {
      id: 'silnoprud',
      title: 'Silnoprúdové elektroinštalácie',
      badge: 'Domy & Priemysel',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description: 'Komplexné silnoprúdové rozvody pre novostavby rodinných domov, rekonštrukcie bytov, polyfunkčné objekty, výrobné haly a priemyselné areály.',
      features: [
        'Káblové trasy, rozvody zásuviek, svetelných okruhov a spotrebičov',
        'Napájanie technológií, vzduchotechniky, HVAC a tepelných čerpadiel',
        'Priemyselné rozvody v káblových žľaboch a podlahových kanáloch',
        'Prípojky nízkeho napätia (NN) od uličnej skrine po elektromerový rozvádzač',
        'Prepojovanie záložných generátorov a automatických prepínačov sietí (ATS)',
        '100% súlad s STN 33 2000 a požiarnymi predpismi',
      ],
    },
    {
      id: 'rozvadzace',
      title: 'Výroba a montáž rozvádzačov',
      badge: 'Certifikovaná výroba',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description: 'Návrh, kusová certifikovaná výroba a zapojenie domových, priemyselných a špecializovaných fotovoltických DC/AC rozvádzačov na mieru.',
      features: [
        'Kusové overenie, typové skúšky a vystavenie vyhlásenia o zhode (CE)',
        'Výroba fotovoltických DC stringových a AC prepäťových rozvádzačov',
        'Priemyselné podlahové i nástenné rozvádzačové skrine s krytím až IP66',
        'Osadenie prémiových prístrojov (Eaton, Schneider Electric, Noark, OEZ)',
        'Prehľadné laserové označenie svoriek, vodičov a schéma skutočného vyhotovenia',
        'Kompenzácia účinníka a ochrana proti preťaženiu',
      ],
    },
    {
      id: 'bleskozvody',
      title: 'Bleskozvody a uzemňovacie sústavy',
      badge: 'STN EN 62305',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description: 'Ochrana objektov pred priamym úderom blesku a prepätím. Realizácia klasických i aktívnych bleskozvodov s precíznym meraním zemného odporu.',
      features: [
        'Návrh vonkajšieho systému ochrany pred bleskom (LPS triedy I až IV)',
        'Montáž zachytávacej sústavy, zvodov, skúšobných svoriek a uzemnenia',
        'Uzemňovacie sústavy základovým zemničom alebo obvodovým pásom FeZn',
        'Vnútorná ochrana proti prepätiu – SPD stupne T1, T2 a T3',
        'Presné meranie zemného odporu kalibrovaným prístrojom (do 10 Ω)',
        'Nevyhnutný doklad ku kolaudácii a poisteniu nehnuteľnosti',
      ],
    },
    {
      id: 'opos-revizie',
      title: 'Odborné prehliadky a skúšky (OPOS)',
      badge: 'Vyhláška 508/2009 Z. z.',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description: 'Oficiálne úradné revízne správy od certifikovaných revíznych technikov (§ 24) pre stavebné úrady, distribúciu (SSD/ZSD/VSD), poisťovne a inšpektorát práce.',
      features: [
        'Východiskové revízie potrebné ku kolaudácii rodinných domov a hál',
        'Periodické pravidelné revízie elektrických zariadení a bleskozvodov',
        'Špecializované revízie fotovoltických elektrární a batériových úložísk',
        'Meranie impedancie poruchovej slučky, izolačných odporov a prúdových chráničov',
        'Kontrola termokamerou (termovízia spojov a oteplenia v rozvádzačoch)',
        'Odstránenie zistených závad a promptné vystavenie platnej revíznej správy',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Čo je to revízna správa (OPOS) a prečo je zo zákona povinná?',
      a: 'Revízna správa (Odborná prehliadka a odborná skúška - OPOS) je oficiálny technický a právny dokument vypracovaný certifikovaným revíznym technikom podľa vyhlášky MPSVR SR č. 508/2009 Z. z. Dokladuje, že elektrická inštalácia alebo bleskozvod je bezpečný pre život a majetok a spĺňa všetky normy STN. Je zákonnou podmienkou ku kolaudácii každej stavby, pripojenia do distribučnej siete aj pre plnenie poistnej udalosti v poisťovni.',
    },
    {
      q: 'Aké revízne správy potrebujem ku kolaudácii novostavby rodinného domu?',
      a: 'Ku kolaudácii rodinného domu sú štandardne potrebné 3 východiskové revízne správy: 1. Východisková revízna správa elektrickej prípojky (od uličného stĺpa / rozvodu po elektromer), 2. Východisková revízna správa vnútornej elektroinštalácie domu vrátane rozvádzača, 3. Východisková revízna správa bleskozvodu a uzemnenia. Pokiaľ máte na dome fotovoltiku alebo tepelné čerpadlo, je potrebná aj revízia tohto vyhradeného technického zariadenia. Všetky tieto správy pre vás vystaví tím Marvol s.r.o.',
    },
    {
      q: 'Ako často sa musia vykonávať pravidelné (periodické) revízie elektroinštalácií a bleskozvodov?',
      a: 'Pre rodinné domy je odporúčaná lehota revízie elektroinštalácie a bleskozvodu každých 4 až 5 rokov (alebo pri zmene majiteľa / rekonštrukcii). Pre podniky, firmy, školy a verejné budovy sú lehoty striktne dané vyhláškou 508/2009 Z. z. podľa vonkajších vplyvov: bežné priestory každých 5 rokov, vlhké a mokré priestory každé 3 roky, prašné priestory s nebezpečenstvom požiaru každé 2 roky a priestory s nebezpečenstvom výbuchu každý 1 rok. Bleskozvody sa štandardne revidujú každé 2 až 4 roky.',
    },
    {
      q: 'Je revízna správa potrebná aj pri inštalácii fotovoltiky a batériového úložiska?',
      a: 'Áno, jednoznačne. Distribučné spoločnosti (SSD, ZSD, VSD) nepovolia trvalú prevádzku ani nevymenia elektromer za 4-kvadrantný bez predloženia platnej východiskovej revíznej správy fotovoltickej elektrárne. Revízia overuje správne dimenzovanie DC káblov, funkčnosť prepäťových ochrán, správne uzemnenie nosných konštrukcií a impedanciu slučky striedača.',
    },
    {
      q: 'Ako dlho trvá vykonanie revízie a vystavenie revíznej správy?',
      a: 'Fyzické meranie na mieste rodinného domu trvá zvyčajne 2 až 4 hodiny v závislosti od počtu okruhov a rozlohy. Vyhodnotenie nameraných hodnôt, spracovanie technickej dokumentácie a vystavenie úradnej revíznej správy s pečiatkou revízneho technika odovzdávame zákazníkovi štandardne do 3 až 5 pracovných dní, v expresnom režime aj do 24–48 hodín.',
    },
    {
      q: 'Vykonávate aj opravy a odstránenie zistených chýb po neúspešnej revízii?',
      a: 'Áno. Na rozdiel od nezávislých revízakov, ktorí vám iba odovzdajú zoznam nedostatkov, naša spoločnosť Marvol s.r.o. disponuje tímom elektroinštalatérov. Všetky zistené závady (nesprávne istenie, chýbajúce pospájanie, vysoký zemný odpor bleskozvodu) dokážeme na mieste alebo obratom odborne odstrániť a vydať kladnú revíznu správu.',
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
          name: 'Elektroinštalácie & Revízie',
          item: 'https://marvol.sk/elektroinstalacie-revizie',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/elektroinstalacie-revizie#service',
      name: 'Elektroinštalácie a certifikované revízie OPOS',
      serviceType: 'Elektromontážne práce a revízne správy',
      description:
        'Silnoprúdové a slaboprúdové rozvody, bleskozvody, výroba certifikovaných rozvádzačov a vydanie odbornej revíznej správy (OPOS) podľa vyhlášky č. 508/2009 Z. z.',
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
      title="Elektroinštalácie, bleskozvody a revízie | Marvol s.r.o."
      description="Profesionálne elektroinštalácie, výroba rozvádzačov, montáž bleskozvodov a certifikované revízne správy (EZ) pre domy aj firmy. Rýchlo a v súlade s normami."
      canonicalPath="/elektroinstalacie-revizie"
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
              {/* Decree Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>Vyhláška MPSVR SR č. 508/2009 Z. z. & STN normy</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Elektroinštalácie, bleskozvody <br className="hidden sm:block" />
                <span className="text-amber-400">& úradné revízie OPOS</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Zabezpečujeme profesionálne silnoprúdové a slaboprúdové elektromontážne práce, kusovú výrobu certifikovaných rozvádzačov s atestom a vydanie <strong className="text-white">východiskových aj periodických revíznych správ</strong> platných pre kolaudáciu, poisťovne a distribučné spoločnosti.
              </p>

              {/* Quick Spec Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-purple-400 font-black text-xl sm:text-2xl">§ 24</div>
                  <div className="text-slate-400 text-xs mt-0.5">Revízny technik el. zar.</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">CE & Atest</div>
                  <div className="text-slate-400 text-xs mt-0.5">Výroba rozvádzačov na kľúč</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">100% Platnosť</div>
                  <div className="text-slate-400 text-xs mt-0.5">Pre kolaudáciu a úrady</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#sluzby-elektro"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 shadow-xl shadow-amber-500/20 text-center transition-all cursor-pointer"
                >
                  Prehľad elektro služieb
                </a>
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Objednať revíziu / inštaláciu
                </a>
              </div>
            </div>

            {/* Visual Value Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-purple-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/elektroinstalacie/hero.jpg"
                    alt="Ilustračná fotka odbornej elektroinštalácie a zapojenia rozvádzača Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-purple-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>Ilustračné foto zapojenia rozvádzača</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    § 24 OPOS
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Certifikované rozvádzače &amp; revízie</span>
                      <span className="text-purple-400 font-bold">100% Kolaudácia</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Precízne zapojenie podľa STN noriem, kalibrované merania a okamžité odstránenie závad.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Východiskové aj periodické správy</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Meranie bleskozvodov a zemnenia</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Termovízna kontrola spojov FLIR</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Platnosť pre SSD, ZSD aj VSD</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Service Offerings Grid */}
      <section id="sluzby-elektro" className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Komplexné portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Elektromontážne práce a revízne služby
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Riešime projekty od rodinných domov a bytov až po priemyselné areály, trafostanice a fotovoltické elektrárne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((service) => (
              <div
                key={service.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 mb-8 border-t border-slate-800 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Rozsah činností:
                    </div>
                    {service.features.map((feat, idx) => (
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
                    Dopytovať túto službu
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legislation & Standards Section */}
      <section className="py-20 bg-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20">
              Právne garancie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Legislatíva & Bezpečnostné normy STN
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Elektrina neodpúšťa chyby. Každý spoj, istič aj bleskozvod musí spĺňať striktné slovenské a európske technické normy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400 text-2xl font-black">
                📜
              </div>
              <h3 className="text-xl font-bold text-white">Vyhláška č. 508/2009 Z. z.</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Základný predpis na zaistenie bezpečnosti a ochrany zdravia pri práci a bezpečnosti technických zariadení elektrických. Garantuje platnosť správ pre inšpektoráty a kolaudáciu.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 text-2xl font-black">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white">Súbor noriem STN 33 2000</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Striktné pravidlá pre navrhovanie, kladenie káblov, dimenzovanie ističov, prúdových chráničov a ochranu pred úrazom elektrickým prúdom v obytných i priemyselných budovách.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-2xl font-black">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-white">Norma STN EN 62305</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Riziková analýza a pravidlá ochrany pred bleskom (LPS). Zahŕňa zónový koncept bleskovej ochrany (LPZ), koordináciu zvodičov prepätia a ochranu fotovoltických stringov.
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
              Všetko o elektroinštaláciách a revíznych správach
            </h2>
            <p className="text-slate-400 text-sm">
              Máte špecifické požiadavky na termín revízie alebo rozvádzač na mieru? Ozvite sa nám.
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
              <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                Objednávka elektro prác & revízií
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Objednajte si certifikovaného revízneho technika alebo elektromontáž
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Potrebujete revíznu správu ku kolaudácii, periodickú prehliadku firmy, montáž bleskozvodu alebo rozvádzač na mieru? Pripravíme vám nezáväznú cenovú ponuku s garanciou rýchleho termínu.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na technika</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mail pre projektovú dokumentáciu</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-amber-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    📋
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Odborná spôsobilosť</div>
                    <span className="text-white font-medium">Osvedčenie § 24 podľa vyhlášky č. 508/2009 Z. z.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="elektro"
                source="page_elektro_revizie"
                title="Dopyt na elektroinštalácie & revízie"
                subtitle="Zadajte podrobnosti (napr. typ objektu, kolaudácia, počet okruhov) a do 24 hodín vám pošleme termín a kalkuláciu."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
