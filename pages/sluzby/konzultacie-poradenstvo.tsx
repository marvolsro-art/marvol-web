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
  CurrencyEuroIcon,
  HandshakeIcon,
  AlertCircleIcon
} from '@/components/icons';

export default function KonzultaciePoradenstvo() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeProfile, setActiveProfile] = useState<'dom_tc' | 'dom_bez_tc' | 'firma'>('dom_tc');

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Konzultácie a energetické poradenstvo', href: '/sluzby/konzultacie-poradenstvo' },
  ];

  const profileData = {
    dom_tc: {
      title: 'Rodinný dom s tepelným čerpadlom & klimatizáciou',
      annualKwh: '7 500 - 12 000 kWh / rok',
      recommendedSystem: '8 až 10 kWp + 10 až 14 kWh LiFePO4 batéria',
      selfConsumption: '75 - 85 %',
      annualSaving: '1 400 - 2 100 € / rok',
      payback: '5.2 roka (s dotáciou SIEA)',
      flow: [
        { label: 'Priama spotreba počas dňa (TČ, spotrebiče)', pct: '45 %', color: 'bg-amber-400' },
        { label: 'Ukladanie do domácej batérie na noc', pct: '35 %', color: 'bg-emerald-400' },
        { label: 'Ohrev TÚV z fotovoltických prebytkov', pct: '15 %', color: 'bg-sky-400' },
        { label: 'Prebytok dodaný do distribučnej siete', pct: '5 %', color: 'bg-slate-500' },
      ],
      insight: 'Tepelné čerpadlo v kombinácii so solárnym meničom (funkcia SG Ready) dokáže prehrievať zásobník vody na vyššiu teplotu počas slnečných hodín úplne zadarmo.'
    },
    dom_bez_tc: {
      title: 'Štandardný rodinný dom (plyn / tuhé palivo)',
      annualKwh: '3 500 - 5 500 kWh / rok',
      recommendedSystem: '4.5 až 6.5 kWp + 7 kWh LiFePO4 batéria',
      selfConsumption: '70 - 80 %',
      annualSaving: '750 - 1 100 € / rok',
      payback: '5.8 roka (s dotáciou SIEA)',
      flow: [
        { label: 'Priama spotreba domových spotrebičov', pct: '40 %', color: 'bg-amber-400' },
        { label: 'Ukladanie do batérie pre večerný špičkový odber', pct: '35 %', color: 'bg-emerald-400' },
        { label: 'Smart zopínanie bojlera (Dry Contact)', pct: '15 %', color: 'bg-sky-400' },
        { label: 'Dodávka do siete / virtuálna batéria', pct: '10 %', color: 'bg-slate-500' },
      ],
      insight: 'Pre dom bez tepelného čerpadla je kľúčová kompaktná batéria (7-10 kWh), ktorá pokryje rannú a večernú špičku, kedy rodina trávi čas doma.'
    },
    firma: {
      title: 'Firma, sklad, výrobná prevádzka alebo kancelárie',
      annualKwh: '25 000 - 150 000+ kWh / rok',
      recommendedSystem: '20 až 100+ kWp (Lokálny zdroj / Zero Export)',
      selfConsumption: '85 - 95 %',
      annualSaving: '4 500 - 25 000+ € / rok',
      payback: '3.5 až 4.8 roka (bez dotácie)',
      flow: [
        { label: 'Priama spotreba výrobných strojov a chladenia', pct: '70 %', color: 'bg-amber-400' },
        { label: 'BESS priemyselné úložisko (vykrývanie maxím)', pct: '18 %', color: 'bg-emerald-400' },
        { label: 'Nabíjanie firemnej flotily elektromobilov', pct: '10 %', color: 'bg-sky-400' },
        { label: 'Dodávka do distribučnej siete', pct: '2 %', color: 'bg-slate-500' },
      ],
      insight: 'Firmy majú najrýchlejšiu návratnosť na trhu, pretože najväčšiu spotrebu majú cez deň počas pracovnej doby (pondelok-piatok), kedy slnko svieti najintenzívnejšie.'
    }
  };

  const current = profileData[activeProfile];

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
      q: 'Ako funguje štátna dotácia Zelená domácnostiam a Zelená podnikom?',
      a: 'Ako registrovaný zhotoviteľ SIEA prevezmeme celú administratívu. Preveríme nárok na liste vlastníctva, zaregistrujeme poukážku v portáli SIEA a sumu dotácie (až do výšky 4 025 € podľa programu) vám odpočítame priamo z realizačnej faktúry. Na peniaze od štátu teda nečakáte.',
    },
    {
      q: 'Má zmysel fotovoltika pri nízkej ročnej spotrebe (napr. do 2 500 kWh)?',
      a: 'Pri nízkej spotrebe je dôležité systém nepredimenzovať. Namiesto veľkej 10 kWp elektrárne vám navrhneme menší optimalizovaný systém (3 až 4 kWp) s priamym ohrevom vody, ktorý má nízke vstupné náklady a vďaka dotácii SIEA rýchlu návratnosť.',
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
      name: 'Energetické poradenstvo a analýza návratnosti fotovoltiky',
      serviceType: 'Energetický audit, optimalizácia taríf a dotácie SIEA',
      description:
        'Odborné energetické poradenstvo pre domácnosti a firmy. Nezávislá analýza faktúr, presný výpočet ROI, dotácie Zelená domácnostiam a porovnanie batérií.',
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
      title="Energetické poradenstvo & Konzultácie fotovoltiky | Marvol s.r.o."
      description="Nezávislý energetický audit, analýza faktúr a presný výpočet návratnosti ROI. Porovnanie fyzickej vs. virtuálnej batérie a dotácie SIEA bez marketingových sľubov."
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

      {/* HERO SECTION: Financial Economics & Advisory Studio */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide">
                <CurrencyEuroIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Nezávislý energetický inžiniering</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Energetické poradenstvo <br className="hidden sm:block" />
                <span className="text-emerald-400">&amp; reálna matematika úspor</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Zbavíme vás marketingových mýtov a ukážeme presné čísla. Analyzujeme vaše vyúčtovacie faktúry, odhalíme skryté poplatky distribúcie a navrhneme systém, ktorý vám prinesie <strong className="text-white">najvyššiu finančnú návratnosť</strong> bez zbytočného preplácania.
              </p>

              {/* Advisory Metrics HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">0 €</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Vstupná analýza faktúr</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-mono font-black text-xl sm:text-2xl">60 - 85 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Úspora na elektrine</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-mono font-black text-xl sm:text-2xl">4 - 6 rokov</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Reálna návratnosť ROI</div>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-mono font-black text-xl sm:text-2xl">100 %</div>
                  <div className="text-slate-400 text-xs mt-0.5 font-medium">Administrácia SIEA</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-3">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 rounded-xl font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20"
                >
                  Požiadať o bezplatný audit
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Konzultovať s energetikom
                </a>
              </div>
            </div>

            {/* Right: Real Photography & Advisory Badge */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/poradenstvo.jpg"
                    alt="Energetické poradenstvo a kalkulácia návratnosti Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Nezávislý energetický posudok</span>
                  </div>

                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500 text-slate-950 font-black text-xs rounded-full">
                    Garantované SIEA
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Optimalizácia energetického profilu</span>
                      <span className="text-emerald-400 font-bold font-mono">100% transparentnosť</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Porovnanie spotových cien, virtuálnej batérie verzus fyzického úložiska BESS a plný dotačný manažment.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 grid grid-cols-2 gap-3 text-xs border-t border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Analýza 15-minútových maxím</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Prepočet degradácie panelov</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Strategické nastavenie taríf</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dotácie SIEA bez byrokracie</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE ENERGY PROFILE ALLOCATOR */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-emerald-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4 sm:mb-5">
              Modelovanie tokov energie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Kam smeruje vyrobená solárna energia?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Pozrite sa, ako vyzerá reálna bilancia spotreby a výroby pre váš typ nehnuteľnosti pri správnom inžinierskom návrhu.
            </p>
          </div>

          {/* Profile Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            <button
              onClick={() => setActiveProfile('dom_tc')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeProfile === 'dom_tc'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Dom s tepelným čerpadlom
            </button>
            <button
              onClick={() => setActiveProfile('dom_bez_tc')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeProfile === 'dom_bez_tc'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Dom bez tepelného čerpadla
            </button>
            <button
              onClick={() => setActiveProfile('firma')}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeProfile === 'firma'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              Firma &amp; Výrobná prevádzka
            </button>
          </div>

          {/* Active Profile Energy Breakdown Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white">{current.title}</h3>
                  <div className="text-xs text-slate-400 mt-1 font-mono">Typická spotreba: {current.annualKwh}</div>
                </div>

                {/* Flow Bar Segments */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Rozdelenie vyrobenej energie v priebehu dňa:
                  </div>
                  
                  {/* Visual Multi-segment bar */}
                  <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                    {current.flow.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ width: item.pct }}
                        className={`${item.color} h-full transition-all duration-500`}
                        title={`${item.label}: ${item.pct}`}
                      />
                    ))}
                  </div>

                  {/* Flow legend */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {current.flow.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                        <span className="font-bold font-mono text-white">{item.pct}</span>
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Insight Box */}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 leading-relaxed flex items-start gap-3">
                  <BoltIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Inžiniersky tip Marvol:</strong>
                    {current.insight}
                  </div>
                </div>
              </div>

              {/* Economic Summary Sidebar */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Ekonomický profil zostavy
                </div>

                <div className="space-y-3 divide-y divide-slate-800 text-xs sm:text-sm">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Odporúčaný výkon:</span>
                    <strong className="text-white font-mono text-right">{current.recommendedSystem}</strong>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Vlastné využitie energie:</span>
                    <strong className="text-emerald-400 font-mono text-right">{current.selfConsumption}</strong>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Odhadovaná ročná úspora:</span>
                    <strong className="text-white font-mono text-right">{current.annualSaving}</strong>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Predpokladaná návratnosť:</span>
                    <strong className="text-amber-400 font-mono text-right">{current.payback}</strong>
                  </div>
                </div>

                <a
                  href="#dopyt"
                  className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/20 cursor-pointer"
                >
                  Prepočítať moju nehnuteľnosť
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEEP-DIVE COMPARISON: BATTERY VS VIRTUAL VS SPOT */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-emerald-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4 sm:mb-5">
              Nezávislé porovnanie
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Fyzická batéria vs. Virtuálna batéria vs. Spotový trh
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Pozrite sa na reálne čísla bez marketingových fráz dodávateľov energií.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1: Fyzická batéria BESS */}
            <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 relative flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  NAJVYŠŠIA SEBESTAČNOSŤ
                </span>
                <h3 className="text-xl font-black text-white mt-2 mb-2">Fyzické LiFePO4 úložisko</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Energia zostáva vo vašom dome. Nabíjate cez deň zadarmo a čerpáte večer bez platenia distribúcie.
                </p>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckIcon className="w-4 h-4 shrink-0" />
                    <span>0 € poplatky pri spätnom odbere</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckIcon className="w-4 h-4 shrink-0" />
                    <span>Plnohodnotný Back-Up (funguje pri výpadku siete)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckIcon className="w-4 h-4 shrink-0" />
                    <span>Životnosť 6 000+ cyklov (cca 15-20 rokov)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-white font-bold block mb-1">Verdikt Marvol:</span>
                Najlepšia voľba pre rodinné domy s ročnou spotrebou nad 4 000 kWh a pre každého, kto vyžaduje energetickú nezávislosť.
              </div>
            </div>

            {/* 2: Virtuálna batéria */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SKRYTÉ DISTRIBUČNÉ POPLATKY
                </span>
                <h3 className="text-xl font-black text-white mt-2 mb-2">Virtuálna batéria</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Služba od dodávateľov elektriny (ZSE, SSE, VSE, SPP). Ukladá virtuálnu silovú elektrinu do siete.
                </p>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircleIcon className="w-4 h-4 shrink-0" />
                    <span>Platíte plnú distribúciu a TPS pri odbere (~55 % ceny)</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircleIcon className="w-4 h-4 shrink-0" />
                    <span>NEFUNGUJE pri výpadku siete (ste bez prúdu)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <span>Mesačný poplatok za vedenie služby (2 - 5 €/mesiac)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-white font-bold block mb-1">Verdikt Marvol:</span>
                Vhodné ako dočasné nízkonákladové riešenie, avšak dlhodobá úspora je o polovicu nižšia ako pri fyzickej batérii.
              </div>
            </div>

            {/* 3: Spotové obchodovanie */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  DYNAMICKÉ CENY OKTE
                </span>
                <h3 className="text-xl font-black text-white mt-2 mb-2">Spotový trh &amp; Flexibilita</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Hodinové zúčtovanie cien na spotovom trhu. Možnosť nabíjať batériu v noci za záporné ceny a predávať v špičke.
                </p>

                <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold">
                    <CheckIcon className="w-4 h-4 shrink-0" />
                    <span>Vysoký zisk pri inteligentnom riadení EMS</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <span>Vyžaduje Smart meter a riadenie striedača</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>Cenová volatilita v letných mesiacoch</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-white font-bold block mb-1">Verdikt Marvol:</span>
                Vynikajúca stratégia pre technologicky zdatné domácnosti a firmy s veľkou batériou riadenou automatizáciou.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: 4-STEP AUDIT ROADMAP */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-emerald-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4 sm:mb-5">
              Proces auditu
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ako prebieha bezplatná konzultácia
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Rýchly postup, vďaka ktorému získate jasnú predstavu o návratnosti a technológii bez akéhokoľvek nátlaku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="inline-block text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mb-3">
                KROK 1
              </span>
              <h3 className="text-base font-bold text-white mb-2">Zaslanie vyúčtovania</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Pošlite nám ročnú faktúru alebo informáciu o mesačných zálohách. Preveríme vašu sadzbu (DD1, DD2, DD5) a charakter odberu.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="inline-block text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-3">
                KROK 2
              </span>
              <h3 className="text-base font-bold text-white mb-2">Simulácia a výpočet ROI</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Vypočítame ročnú výrobu podľa GPS lokality, navrhneme optimálnu kapacitu batérie a vypracujeme finančný model návratnosti.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="inline-block text-xs font-mono font-bold text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded-full border border-sky-400/20 mb-3">
                KROK 3
              </span>
              <h3 className="text-base font-bold text-white mb-2">Preverenie dotácie SIEA</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Skontrolujeme list vlastníctva a zabezpečíme maximálny možný štátny príspevok v programe Zelená domácnostiam alebo Zelená podnikom.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
              <span className="inline-block text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 mb-3">
                KROK 4
              </span>
              <h3 className="text-base font-bold text-white mb-2">Osobná konzultácia</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Prezentácia návrhu osobne u vás alebo online. Odpovieme na všetky technické otázky a pripravíme fixnú cenovú ponuku.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 bg-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-emerald-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-4 sm:mb-5">
              Otázky a odpovede
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Všetko o návratnosti a konzultáciách
            </h2>
            <p className="text-slate-400 text-sm">
              Máte špecifickú otázku k vašim faktúram alebo možnostiam dotácie?
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
              <span className="inline-block text-emerald-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                100% Bezplatný audit spotreby
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nezáväzná energetická konzultácia
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Vyplňte formulár a naši energetickí poradcovia pripravia prepočet ročných úspor a návratnosti pre vašu nehnuteľnosť.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <PhoneIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na energetického poradcu</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="text-white font-bold hover:text-emerald-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <MailIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Zasielanie faktúr a podkladov</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="text-white font-bold hover:text-emerald-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                    <BuildingOfficeIcon className="w-5 h-5 text-emerald-400" />
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
                source="page_sluzby_poradenstvo"
                title="Dopyt na energetické poradenstvo"
                subtitle="Zadajte svoje kontaktné údaje pre nezáväzný prepočet návratnosti."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
