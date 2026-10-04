import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function KonzultaciePoradenstvo() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Konzultácie a energetické poradenstvo', href: '/sluzby/konzultacie-poradenstvo' },
  ];

  const parameterCards = [
    {
      id: 'energeticky-audit',
      title: 'Energetický audit a profilácia spotreby',
      badge: '15-min diagramy IMS',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      description:
        'Podrobný rozbor vašich účtov za elektrinu a diagramov spotreby. Identifikujeme skryté straty a presne dimenzujeme systém bez zbytočného preplácania.',
      features: [
        'Detailná analýza odberového diagramu alebo ročných vyúčtovacích faktúr',
        'Identifikácia bázového zaťaženia domu či firmy (stály odber počas noci a víkendov)',
        'Analýza výkonových špičiek a odporúčanie na zníženie rezervovanej kapacity (MRK)',
        'Odhalenie neefektívnych spotrebičov a tepelných či energetických únikov',
        'Návrh vyváženého systému bez zbytočného a drahého predimenzovania',
      ],
    },
    {
      id: 'financny-model-roi',
      title: 'Finančný model a kalkulácia návratnosti ROI',
      badge: 'Reálna matematika úspor',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-500/10',
      description:
        'Matematicky podložená kalkulácia úspor očistená od marketingových sľubov. Počítame s reálnym vývojom cien silovej elektriny, distribúcie i degradáciou panelov.',
      features: [
        'Transparentný prepočet ročnej finančnej úspory v eurách s uvážením rastu cien energií',
        'Výpočet doby návratnosti (Payback Period) a čistej súčasnej hodnoty projektu (NPV)',
        'Porovnanie ekonomiky čisto fotovoltického systému vs. hybridného systému s batériou',
        'Započítanie ročnej degradácie fotovoltických panelov (iba 0,4% ročne pri N-Type TOPCon)',
        'Výpočet mernej ceny vyrobenej elektriny (LCOE) počas garantovanej 30-ročnej životnosti',
      ],
    },
    {
      id: 'dotacny-manazment-siea',
      title: 'Kompletný dotačný manažment SIEA na kľúč',
      badge: 'Dotácia do 4 025 €',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      description:
        'Oficiálny zhotoviteľ v programe Zelená domácnostiam a Zelená podnikom. Získajte maximálny štátny príspevok odpočítaný priamo z faktúry bez zbytočnej byrokracie.',
      features: [
        'Bezplatné preverenie splnenia dotačných podmienok na liste vlastníctva nehnuteľnosti',
        'Výber optimálneho programu (Zelená domácnostiam, Zelená solidarita až 90%, Zelená podnikom)',
        'Kompletná registrácia a garancia rezervácie dotačnej poukážky v portáli SIEA',
        'Odpočítanie dotácie priamo z realizačnej faktúry (nečakáte mesiace na peniaze od štátu)',
        '100% garancia správnosti dotačných podkladov a dokumentácie bez rizika prepadnutia',
      ],
    },
    {
      id: 'tarify-virtualna-bateria',
      title: 'Optimalizácia taríf, virtuálna batéria a spotové ceny',
      badge: 'Smart Management',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      description:
        'Strategické nastavenie zmlúv s dodávateľmi energií. Posúdime rentabilitu virtuálnej batérie verzus fyzického úložiska a možnosti obchodovania na spotovom trhu.',
      features: [
        'Nezávislé porovnanie ponúk dodávateľov na slovenskom trhu (ZSE, SSE, VSE, SPP, Magna Energia)',
        'Posúdenie výhodnosti virtuálnej batérie verzus fyzického LiFePO4 batériového úložiska',
        'Nastavenie stratégií dynamického nákupu a predaja elektriny na spotovom trhu OKTE',
        'Prepojenie fotovoltiky s tepelným čerpadlom (SG Ready) a inteligentným ohrevom TÚV',
        'Inteligentné riadenie nabíjania elektromobilu z vlastných fotovoltických prebytkov',
      ],
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Zaslanie faktúr & úvodný rozhovor',
      description:
        'Zašlite nám vyúčtovaciu faktúru. Počas krátkeho rozhovoru zistíme vaše očakávania, energetické ciele a plánované spotrebiče v domácnosti či firme.',
    },
    {
      step: '02',
      title: 'Spracovanie energetického prepočtu',
      description:
        'Naši inžinieri namodelujú hodinový profil výroby a spotreby, vypočítajú mieru sebestačnosti a presnú ekonomickú návratnosť v horizonte 15 až 30 rokov.',
    },
    {
      step: '03',
      title: 'Osobná alebo online konzultácia',
      description:
        'Detailne vám odprezentujeme výsledky, vysvetlíme rozdiely medzi technológiami, porovnáme batériové systémy a preveríme nárok na dotáciu SIEA.',
    },
    {
      step: '04',
      title: 'Finálna ponuka s fixnou cenou',
      description:
        'Získate transparentnú cenovú ponuku s garantovanou fixnou cenou, súpisom certifikovaných komponentov a garantovaným termínom realizácie.',
    },
  ];

  const faqs = [
    {
      q: 'Je vstupná konzultácia a vypracovanie kalkulácie skutočne nezáväzné?',
      a: 'Áno, vstupná analýza vašej spotreby, kalkulácia úspor, overenie dotačného nároku aj vypracovanie technicko-ekonomického návrhu sú v Marvol s.r.o. 100% bezplatné a úplne nezáväzné. Rozhodnutie o realizácii je plne na vás.',
    },
    {
      q: 'Aké podklady potrebujem pripraviť na konzultáciu?',
      a: 'Na prvotnú konzultáciu vám postačí posledná ročná vyúčtovacia faktúra za elektrickú energiu (prípadne mesačné zálohové platby), adresa nehnuteľnosti a informácia o spôsobe vykurovania (tepelné čerpadlo, plyn, elektrické podlahové kúrenie) a ohrevu teplej vody.',
    },
    {
      q: 'Oplatí sa mi viac fyzická batéria alebo virtuálna batéria?',
      a: 'Virtuálna batéria vyzerá lákavo z dôvodu nízkej počiatočnej investície, avšak pri spätnom odbere zaplatíte distribučné poplatky a poplatky za systémové služby (cca 50 až 60% ceny elektriny) a navyše nefunguje pri výpadku prúdu. Fyzická LiFePO4 batéria uchováva 100% energie úplne zadarmo a funguje ako plnohodnotné UPS zálohovanie pri výpadku distribučnej siete.',
    },
    {
      q: 'Aké podmienky musím splniť pre získanie dotácie Zelená domácnostiam?',
      a: 'Nehnuteľnosť musí byť na liste vlastníctva evidovaná ako rodinný dom a nesmie byť vo vlastníctve právnickej osoby ani využívaná na komerčné účely v prevažujúcej miere. Celý proces preverenia splnenia podmienok aj samotnú administratívu vybavíme kompletne za vás.',
    },
    {
      q: 'Poskytujete konzultácie aj pre bytové domy a firmy?',
      a: 'Áno, špecializujeme sa na komerčné energetické audity, fotovoltiku pre výrobné podniky, logistické haly, bytové domy i čerpanie dotačného programu Zelená podnikom. Pripravíme analýzu 15-minútových odberových diagramov a posúdenie rezervovanej kapacity.',
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
          name: 'Konzultácie a energetické poradenstvo',
          item: 'https://marvol.sk/sluzby/konzultacie-poradenstvo',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/sluzby/konzultacie-poradenstvo#service',
      name: 'Energetické poradenstvo & Konzultácie fotovoltiky',
      serviceType: 'Energetické audity, analýza spotreby a dotácie SIEA',
      description:
        'Nezávislé energetické konzultácie, analýza spotreby, audit návratnosti ROI a dotačné poradenstvo SIEA. Maximalizujte úspory a minimalizujte náklady s Marvol s.r.o.',
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
      title="Energetické poradenstvo & Konzultácie fotovoltiky | Marvol s.r.o."
      description="Nezávislé energetické konzultácie, analýza spotreby, audit návratnosti ROI a dotačné poradenstvo SIEA. Maximalizujte úspory a minimalizujte náklady s Marvol s.r.o."
      canonicalPath="/sluzby/konzultacie-poradenstvo"
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
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>💡 Dátami podložená návratnosť investície</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Energetické poradenstvo, <br className="hidden sm:block" />
                <span className="text-emerald-400">analýza spotreby a dotácie SIEA</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Neplaťte za elektrinu viac, ako musíte. Posúdime váš profil spotreby, navrhneme optimálny výkon fotovoltiky, vypočítame reálnu návratnosť a <strong className="text-white">zabezpečíme štátnu dotáciu Zelená domácnostiam až do 4 025 €</strong> bez zbytočnej byrokracie.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">Až 80%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Zníženie ročných výdavkov</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">4 – 6 r.</div>
                  <div className="text-slate-400 text-xs mt-0.5">Reálna návratnosť ROI</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">do 4 025 €</div>
                  <div className="text-slate-400 text-xs mt-0.5">Príspevok zo SIEA</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-purple-400 font-black text-xl sm:text-2xl">0 €</div>
                  <div className="text-slate-400 text-xs mt-0.5">Vstupná analýza a kalkulácia</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 hover:opacity-95 shadow-xl shadow-emerald-500/20 text-center transition-all cursor-pointer"
                >
                  Dohodnúť bezplatnú konzultáciu
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-all cursor-pointer"
                >
                  Zavolajte poradcovi: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-emerald-500/10 bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/poradenstvo.jpg"
                    alt="Ilustračná fotka osobného energetického poradenstva a ROI analýzy Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Ilustračné foto konzultácie</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg">
                    Bezplatný Audit
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Osobná analýza návratnosti &amp; úspor</span>
                      <span className="text-emerald-400 font-bold">100% Nezávislé</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Vypracovanie modelového rozpočtu, výpočet úspory na 25 rokov a overenie nároku na dotáciu.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90 border-t border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Kalkulácia bez skrytých poplatkov</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Odpočet dotácie priamo z faktúry</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>SG Ready synergia s čerpadlami</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Riešenia pre rodinné domy aj firmy</span>
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
              Analytické portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Služby energetického poradenstva
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Od optimalizácie faktúr pre domácnosť až po komplexné audity a dotačný manažment pre podnikateľov.
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
                      Rozsah analytických činností:
                    </div>
                    {card.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
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
                    Konzultovať túto oblasť
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
            <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Priebeh spolupráce
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ako prebieha energetické poradenstvo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rýchla a vecná cesta k zníženiu nákladov na energiu bez zbytočného zdržiavania.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative">
                <div className="text-4xl font-black text-emerald-400/30 mb-2">{step.step}</div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-emerald-400 font-bold text-base sm:text-lg">
                100% garancia odpočítania dotácie priamo z faktúry
              </div>
              <div className="text-slate-300 text-xs sm:text-sm">
                Ako oprávnený zhotoviteľ SIEA garantujeme uplatnenie dotácie Zelená domácnostiam až do 4 025 € bez rizika prepadnutia poukážky.
              </div>
            </div>
            <a
              href="#dopyt"
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Overiť dotáciu na váš dom
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o návratnosti, auditoch a dotáciách
            </h2>
            <p className="text-slate-400 text-sm">
              Máte otázky ohľadom virtuálnej batérie alebo štátnych príspevkov? Radi vám všetko objasníme.
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-emerald-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-emerald-400 transition-transform duration-200 shrink-0 ${
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
              <span className="text-emerald-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                Bezplatná konzultácia
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Dohodnite si bezplatnú energetickú konzultáciu
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Získajte nezávislé posúdenie vašej spotreby, kalkuláciu úspor a preverenie dotácie od našich špecialistov. Stačí vyplniť krátky formulár.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na energetického poradcu</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-emerald-400">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">E-mail pre zasielanie vyúčtovacích faktúr</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-emerald-400">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    🏢
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sídlo spoločnosti</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Záväzok energetickej nezávislosti:</div>
                <div>Naše výpočty vychádzajú z reálnych klimatických údajov SHMÚ a presných technických parametrov komponentov. Žiadne skreslené dáta.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="vseobecny-kontakt"
                source="page_sluzby_konzultacie_poradenstvo"
                title="Dohodnite si bezplatnú energetickú konzultáciu"
                subtitle="Získajte nezávislé posúdenie vašej spotreby, kalkuláciu úspor a preverenie dotácie od našich špecialistov."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
