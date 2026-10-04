import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function RevizieDotacie() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Revízie, servis & Dotácie SIEA', href: '/sluzby/revizie-dotacie' },
  ];

  const parameterCards = [
    {
      id: 'vychodiskove-revizie-opos',
      title: 'Východiskové revízie fotovoltiky a batérií (OPOS)',
      badge: 'Vyhláška MPSVR č. 508/2009 Z. z.',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Oficiálna revízna správa s guľatou pečiatkou revízneho technika podľa § 24. Zákonný doklad nevyhnutný pre pripojenie do distribučnej siete a výmenu elektromera.',
      features: [
        'Oficiálna revízna správa vypracovaná certifikovaným revíznym technikom s pečiatkou § 24',
        'Zákonná podmienka pre uzavretie zmluvy s distribučnou spoločnosťou a výmenu elektromera',
        'Meranie izolačných odporov DC káblov a stringov pri skúšobnom napätí 1 000 V DC',
        'Overenie impedancie poruchovej slučky (Zs) a dotykového napätia na striedači',
        'Testovanie vypínacích časov a prúdov prúdových chráničov (RCD typ B na ochranu pred DC zložkou)',
      ],
    },
    {
      id: 'periodicke-prehliadky-termovizia',
      title: 'Periodické prehliadky a termovízna diagnostika',
      badge: 'Termokamera Fluke / STN EN 62446',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Pravidelný servis a termovízna kontrola zabraňujúca zlyhaniu panelov i rozvádzačov. Nevyhnutné pre trvalú platnosť poistných zmlúv a záruk.',
      features: [
        'Pravidelná odborná kontrola fotovoltických elektrární, rozvádzačov a batérií pre firmy aj domy',
        'Termovízna kontrola panelov zameraná na vyhľadávanie poškodených článkov a prehriatych hot-spotov',
        'Kontrola oteplenia spojov, svoriek a istiacich prvkov v DC/AC rozvádzačoch pod plnou záťažou',
        'Preverenie stavu a opotrebenia kaziet prepäťových ochrán (SPD) pred a po búrkovej sezóne',
        'Vystavenie periodickej revíznej správy vyžadovanej poisťovňami pre bezproblémové krytie škôd',
      ],
    },
    {
      id: 'dotacie-zelena-domacnostiam',
      title: 'Vybavenie dotácie Zelená domácnostiam (FV do 1 150 €, TČ do 4 600 €)',
      badge: 'SIEA Zelená domácnostiam',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Kompletný servis štátnych dotácií SIEA. Sme registrovaným zhotoviteľom SIEA, vďaka čomu zabezpečíme priamu online rezerváciu prostriedkov a uplatnenie dotácie priamo na realizačnej faktúre.',
      features: [
        'Kompletná kontrola oprávnenosti žiadateľa a listu vlastníctva nehnuteľnosti',
        'Zaregistrovanie žiadosti v elektronickom systéme SIEA a online rezervácia finančných prostriedkov',
        'Inštalácia výhradne certifikovaných zariadení evidovaných v zozname oprávnených zariadení',
        'Odpočítanie plnej sumy dotácie priamo z konečnej faktúry (klient nečaká na preplatenie štátom)',
        'Asistencia pri programe Zelená solidarita pre nízkopríjmové domácnosti (financovanie až do 90%)',
      ],
    },
    {
      id: 'dotacie-zelena-podnikom',
      title: 'Dotácie Zelená podnikom pre firmy a prevádzky',
      badge: 'Dotácie pre podniky',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description:
        'Financovanie zelených investícií pre podniky a prevádzky. Pomôžeme vám získať nenávratný finančný príspevok na zníženie energetickej náročnosti výroby.',
      features: [
        'Príprava podkladov a energetických posudkov pre malé a stredné podniky (MSP)',
        'Zabezpečenie povinného energetického auditu pre získanie nenávratného finančného príspevku',
        'Posúdenie súladu s kritériami dekarbonizácie a zásadou "Výrazne nenarušiť" (DNSH)',
        'Manažment žiadosti a komunikácia s riadiacimi orgánmi, audítormi a ministerstvami',
        'Asistencia pri monitorovaní a vykazovaní garantovaných úspor počas doby udržateľnosti projektu',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Fyzická obhliadka & merania revíznym technikom',
      description:
        'Revízny technik dorazí na miesto a špičkovým kalibrovaným prístrojom Metrel/Megger premeria impedanciu slučiek, izolačný stav a vybavenie chráničov.',
    },
    {
      step: '02',
      title: 'Spracovanie revíznej správy OPOS',
      description:
        'Vyhodnotíme namerané hodnoty, zapíšeme parametre do úradného tlačiva a správu autorizujeme podpisom a pečiatkou revízneho technika podľa § 24.',
    },
    {
      step: '03',
      title: 'Nahratie podkladov do portálu SIEA',
      description:
        'Pre potreby dotácie nahráme revíznu správu, fotodokumentáciu výrobného štítku a faktúry priamo do dotačného systému SIEA.',
    },
    {
      step: '04',
      title: 'Odovzdanie správy & odpočet dotácie',
      description:
        'Dostanete originál revíznej správy pre distribútora (SSD/ZSD/VSD) i poisťovňu, pričom dotáciu vám odpočítame priamo z faktúry.',
    },
  ];

  const faqs = [
    {
      q: 'Prečo je východisková revízna správa potrebná pre distribúciu?',
      a: 'Distribučné spoločnosti (Stredoslovenská distribučná SSD, Západoslovenská distribučná ZSD a Východoslovenská distribučná VSD) nepovolia trvalé pripojenie fotovoltiky do siete ani nevymenia elektromer za 4-kvadrantný bez platnej východiskovej revíznej správy OPOS. Táto správa je zákonnou garanciou, že fotovoltická elektráreň neohrozí stabilitu distribučnej sústavy ani bezpečnosť technikov pracujúcich na vedení.',
    },
    {
      q: 'Ako prebieha odpočítanie dotácie z faktúry?',
      a: 'Ako oprávnený zhotoviteľ registrovaný v systéme SIEA odpočíta Marvol s.r.o. schválenú hodnotu štátnej dotácie (napr. 1 150 € pri fotovoltike alebo až 4 600 € pri tepelnom čerpadle) priamo z vašej realizačnej faktúry. Vy ako zákazník uhradíte iba doplatok (rozdiel celkovej ceny a dotácie) a administratívne vysporiadanie s agentúrou SIEA vyrieši naša spoločnosť.',
    },
    {
      q: 'Ako často sa musia vykonávať periodické revízie fotovoltiky?',
      a: 'Pre rodinné domy sa odporúča vykonať periodickú kontrolu a revíziu elektroinštalácie a fotovoltiky každé 3 až 4 roky (alebo podľa požiadavky konkrétnej poisťovne v poistnej zmluve). Pre podniky, firmy a výrobné areály sú lehoty striktne stanovené vyhláškou MPSVR SR č. 508/2009 Z. z. podľa vonkajších vplyvov prostredia (obvykle každé 2 až 3 roky).',
    },
    {
      q: 'Čo ak revízny technik zistí na inštalácii nedostatky?',
      a: 'Na rozdiel od bežných externých revíznych technikov disponuje Marvol s.r.o. vlastným montážnym a servisným tímom elektrikárov. Všetky zistené závady (napr. uvoľnené svorky, nedostatočné pospájanie, opotrebovaná prepäťová ochrana) dokážeme bezodkladne priamo na mieste odstrániť a vydať bezchybnú revíznu správu.',
    },
    {
      q: 'Koľko stojí revízia fotovoltickej elektrárne?',
      a: 'Pri inštaláciách na kľúč realizovaných spoločnosťou Marvol s.r.o. je kompletná východisková revízna správa OPOS už zahrnutá v cene diela bez akýchkoľvek skrytých doplatkov. V prípade samostatnej revízie externej elektrárne alebo periodickej prehliadky pripravíme cenovú ponuku podľa inštalovaného výkonu a počtu rozvádzačov.',
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
          name: 'Revízie, servis & Dotácie SIEA',
          item: 'https://marvol.sk/sluzby/revizie-dotacie',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/sluzby/revizie-dotacie#service',
      name: 'Úradné revízie fotovoltiky (OPOS) & Dotácie SIEA',
      serviceType: 'Revízie elektrických zariadení OPOS a dotačný servis',
      description:
        'Odborné prehliadky a skúšky (OPOS) certifikovaným revíznym technikom (§ 24) a vybavenie štátnych dotácií SIEA Zelená domácnostiam (FV do 1 150 €, TČ do 4 600 €) a Zelená podnikom. Rýchlo a spoľahlivo.',
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
      title="Úradné revízie fotovoltiky (OPOS) & Dotácie SIEA | Marvol s.r.o."
      description="Odborné prehliadky a skúšky (OPOS) certifikovaným revíznym technikom (§ 24) a vybavenie štátnych dotácií SIEA Zelená domácnostiam (FV do 1 150 €, TČ do 4 600 €) a Zelená podnikom. Rýchlo a spoľahlivo."
      canonicalPath="/sluzby/revizie-dotacie"
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span>📋 Revízny technik § 24 & Dotácie SIEA do {COMPANY_DETAILS.subsidies.maxHomeSubsidy}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Úradné revízie fotovoltiky (OPOS) <br className="hidden sm:block" />
                <span className="text-purple-400">a kompletný dotačný servis SIEA</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Vystavujeme platné úradné revízne správy pre distribučné spoločnosti (SSD, ZSD, VSD) a stavebné úrady. Zároveň zabezpečujeme <strong className="text-white">100% vybavenie a preplatenie štátnych dotácií</strong> z programov Zelená domácnostiam a Zelená podnikom.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-purple-400 font-black text-xl sm:text-2xl">§ 24</div>
                  <div className="text-slate-400 text-xs mt-0.5">Revízny technik el. zar.</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">3 – 5 dní</div>
                  <div className="text-slate-400 text-xs mt-0.5">Lehota vystavenia správy</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">Dotácie SIEA</div>
                  <div className="text-slate-400 text-xs mt-0.5">Odpočet priamo z faktúry</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Schválenie distribúciou</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 hover:opacity-95 shadow-xl shadow-purple-500/20 text-center transition-all cursor-pointer"
                >
                  Objednať revíziu alebo dotáciu
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Kontaktovať revízora: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-purple-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/revizie-dotacie.jpg"
                    alt="Ilustračná fotka odbornej revízie OPOS a merania fotovoltiky Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-purple-500/40 text-purple-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span>Ilustračné foto revízie OPOS</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    § 24 MPSVR SR
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Kalibrované meranie &amp; vybavenie dotácie</span>
                      <span className="text-purple-400 font-bold">100% Platnosť</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Úradné revízne správy pre distribúciu (SSD/ZSD/VSD), poisťovne a preplatenie dotácie SIEA.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Meranie izolačných stavov a slučky</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Dotácia odpočítaná priamo z ceny</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Termovízia hot-spotov FLIR</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>Okamžité odstránenie závad</span>
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
            <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20">
              Revízne a dotačné služby
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Revízie OPOS, diagnostika a dotácie
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Poskytujeme komplexné odborné prehliadky a skúšky (OPOS) pre fotovoltické zdroje aj kompletný servis štátnych príspevkov.
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
                      Rozsah revíznych a dotačných prác:
                    </div>
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="text-purple-400 font-bold shrink-0">✓</span>
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
                    Objednať túto službu
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
            <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20">
              Proces vybavenia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha revízia a schválenie dotácie
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rýchly postup merania a bezchybné podanie dokumentov na úrady i distribučné spoločnosti.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative">
                <div className="text-4xl font-black text-purple-400/30 mb-2">{step.step}</div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-purple-400 font-bold text-base sm:text-lg">
                Východisková revízna správa v cene inštalácií na kľúč
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Pri dodávke fotovoltiky od Marvol s.r.o. máte kompletné merania a úradnú revíznu správu potrebnú pre distribúciu automaticky v cene.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Objednať revízneho technika
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o revíziách fotovoltiky a dotáciách SIEA
            </h2>
            <p className="text-slate-400 text-sm">
              Máte otázky ku kolaudácii, dotačným podmienkam SIEA alebo periodickým lehotám? Radi vám poradíme.
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-purple-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-purple-400 transition-transform duration-200 shrink-0 ${
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
              <span className="text-purple-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20">
                Objednávka revízie & dotácie
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Objednajte si úradnú revíziu alebo dotáciu SIEA
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Vyplňte formulár a náš revízny technik vás bude kontaktovať s termínom merania alebo bezplatným preverením dotačného nároku.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na revízneho technika § 24</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-purple-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mail pre revízie a dotačnú agendu</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-purple-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sídlo spoločnosti</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Zákonná garancia revíznych správ:</div>
                <div>Revízne správy vyhotovujeme v plnom súlade s vyhláškou MPSVR SR č. 508/2009 Z. z. a normami STN EN 62446 a STN 33 2000-7-712.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="elektro"
                source="page_sluzby_revizie_dotacie"
                title="Objednajte si úradnú revíziu alebo dotáciu SIEA"
                subtitle="Vyplňte formulár a náš revízny technik vás bude kontaktovať s termínom merania alebo preverením dotačného nároku."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
