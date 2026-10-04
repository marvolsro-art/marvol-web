import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { COMPANY_DETAILS } from '@/constants/company';

type SegmentType = 'home' | 'business' | 'storage';

export default function MinimalistTestPage() {
  // Navigation state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Hero Segment Spotlight
  const [activeSegment, setActiveSegment] = useState<SegmentType>('home');

  // Minimalist Calculator State
  const [monthlyBill, setMonthlyBill] = useState(120);
  const [withBattery, setWithBattery] = useState(true);
  const [withHeatPump, setWithHeatPump] = useState(false);
  const [withWallbox, setWithWallbox] = useState(false);

  // Lead Form State
  const [leadCategory, setLeadCategory] = useState<'dom' | 'firma' | 'bateria' | 'cerpadlo'>('dom');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Dynamic calculations
  const recommendedKwp = Math.min(
    Math.max(Math.round((monthlyBill / 18 + (withWallbox ? 1.5 : 0)) * 10) / 10, 3),
    25
  );
  const estimatedSavings = Math.round(monthlyBill * 12 * (withBattery ? 0.76 : 0.52));
  const estimatedSubsidy = withHeatPump
    ? 4600
    : Math.min(Math.round(Math.min(recommendedKwp, 2) * 575), 1150);
  const payback = (
    Math.max(recommendedKwp * 980 + (withBattery ? 3000 : 0) - estimatedSubsidy, 1800) /
    estimatedSavings
  ).toFixed(1);

  // Form submit handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdpr) {
      setFormError('Pre pokračovanie potvrďte súhlas so spracovaním údajov.');
      return;
    }
    setFormError('');
    setFormSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          city,
          message: `Dopyt z minimalistickej stránky (/test-2) - Kategória: ${leadCategory}. Odporúčaný výkon: ${recommendedKwp} kWp, Batéria: ${withBattery ? 'Áno' : 'Nie'}, TČ: ${withHeatPump ? 'Áno' : 'Nie'}. Poznámka: ${note}`,
          propertyType: leadCategory === 'firma' ? 'business' : 'home',
          monthlyBill,
          hasBattery: withBattery,
          hasEV: withWallbox,
          source: 'test-2_minimalist',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSubmitted(true);
      } else {
        setFormError(data.message || 'Nepodarilo sa odoslať dopyt. Skúste to znova.');
      }
    } catch {
      setFormError('Chyba spojenia. Skontrolujte pripojenie na internet.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const segmentData = {
    home: {
      tag: 'Pre rodinné domy',
      title: 'Solárna nezávislosť bez starostí',
      desc: 'Znížte ročné účty za elektrinu až o 80%. Kompletné riešenie od 3D projektu cez štátnu dotáciu SIEA až po revíziu.',
      metric1: 'do 1 150 €',
      label1: 'Dotácia SIEA (575 €/kW)',
      metric2: '3 – 5 rokov',
      label2: 'Reálna návratnosť',
      img: '/images/fotovoltika-pre-domacnosti/hero.jpg',
      features: ['Tier 1 panely N-Type TOPCon', 'Asymetrický 3-fázový menič', '100% online rezervácia dotácie'],
    },
    business: {
      tag: 'Pre firmy & priemysel',
      title: 'Fixácia cien energie pre váš biznis',
      desc: 'Ochrana pred výkyvmi na burze, Lokálny zdroj bez distribučných poplatkov a podpora Zelená podnikom do 50%.',
      metric1: 'do 50 %',
      label1: 'Podpora Zelená podnikom',
      metric2: 'Bez TPS/TSS',
      label2: 'Inštitút Lokálneho zdroja',
      img: '/images/fotovoltika-pre-firmy/hero.jpg',
      features: ['Komerčné strešné & pozemné FVE', 'Priemyselné úložiská BESS', 'Optimalizácia 1/4h maxím'],
    },
    storage: {
      tag: 'Batérie & Nabíjanie EV',
      title: 'Energia aj pri výpadku verejnej siete',
      desc: 'Uložte si prebytky zo slnka na večernú spotrebu a nabíjajte svoj elektromobil čistou energiou z vlastnej strechy.',
      metric1: '6 000+ cyklov',
      label1: 'Životnosť LiFePO4 batérie',
      metric2: '< 10 ms',
      label2: 'Automatický záskok UPS',
      img: '/images/bateriove-uloziska-bess/hero.jpg',
      features: ['Mikrosekundové prepnutie na batériu', 'Smart riadenie spotových cien', 'Dynamický Wallbox 11/22 kW'],
    },
  };

  const currentSegment = segmentData[activeSegment];

  const faqs = [
    {
      q: 'Aká je aktuálna výška štátnej dotácie SIEA?',
      a: 'Pre fotovoltiku je sadzba 575 € na 1 kW inštalovaného výkonu (max. 2 kW, celkovo do 1 150 €). Pri tepelných čerpadlách je dotácia až 4 600 €. Nízkopríjmové domácnosti v programe Zelená solidarita môžu získať podporu až do 90 % oprávnených nákladov. Všetko zabezpečujeme elektronickou rezerváciou za vás.',
    },
    {
      q: 'Ako dlho trvá kompletná realizácia na kľúč?',
      a: 'Samotná montáž na streche a v rozvádzači trvá certifikovanému tímu 1 až 2 pracovné dni. Celý proces vrátane distribučného schválenia (SSD, ZSD, VSD), dotácie a revízie OPOS trvá zvyčajne 3 až 5 týždňov.',
    },
    {
      q: 'Čo je súčasťou bezplatnej osobnej obhliadky?',
      a: 'Náš technik zameria orientáciu a sklon strechy, posúdi tienenie okolitými prekážkami, skontroluje hlavný domový rozvádzač a vypracuje 3D model s presným výpočtom ročných úspor a návratnosti.',
    },
    {
      q: 'Je potrebné pri výpadku prúdu manuálne prepínať na batériu?',
      a: 'Nie. Naše hybridné systémy disponujú mikrosekundovým EPS/UPS záskokom. Pri prerušení dodávky z verejnej siete dom automaticky a nepretržite beží z batériového úložiska bez reštartovania spotrebičov.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden antialiased">
      <Head>
        <title>Marvol s.r.o. | Moderná fotovoltika & Energetická sebestačnosť</title>
        <meta
          name="description"
          content="Moderný minimalistický pohľad na fotovoltiku, batériové úložiská a tepelné čerpadlá pre rodinné domy a firmy na Slovensku. Dotácie SIEA a inžiniering na kľúč."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[500px] bg-gradient-to-b from-amber-500/15 via-sky-500/10 to-transparent blur-[90px] sm:blur-[120px] rounded-full animate-pulse-subtle" />
        <div className="absolute top-[40%] -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/10 blur-[100px] sm:blur-[130px] rounded-full" />
        <div className="absolute top-[70%] -right-32 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-sky-500/10 blur-[110px] sm:blur-[140px] rounded-full" />
      </div>

      {/* TOP SLIM ANNOUNCEMENT BAR (Mobile Responsive) */}
      <div className="relative z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-md text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span className="sm:hidden font-medium text-slate-200">
            Dotácia SIEA: FV 1 150 € • TČ 4 600 €
          </span>
          <span className="hidden sm:inline font-medium text-slate-200">
            Nová schéma SIEA: Dotácia 575 € / kW pre fotovoltiku (max. 1 150 €) a do 4 600 € pre tepelné čerpadlá
          </span>
          <a
            href="#konfigurator"
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 shrink-0 ml-1"
          >
            Kalkulácia &rarr;
          </a>
        </div>
      </div>

      {/* MINIMALIST TRANSLUCENT NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="h-8 sm:h-10 w-auto flex items-center">
              <img
                src="/Logo (1920 x 800 px).svg"
                alt="Marvol s.r.o. logo"
                className="h-7 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400">
              Minimal
            </span>
          </Link>

          {/* Desktop Clean Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#riesenia" className="hover:text-white transition-colors">
              Riešenia
            </a>
            <a href="#konfigurator" className="hover:text-white transition-colors">
              Inteligentný prepočet
            </a>
            <a href="#preco-marvol" className="hover:text-white transition-colors">
              Prečo Marvol
            </a>
            <a href="#proces" className="hover:text-white transition-colors">
              Proces
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <Link href="/eshop" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>E-shop</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold">B2B</span>
            </Link>
          </nav>

          {/* CTA & Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+421948123456"
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>0948 123 456</span>
            </a>
            <a
              href="#kontakt"
              className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-white text-slate-950 hover:bg-amber-400 transition-all shadow-md hover:shadow-amber-400/20"
            >
              Nezáväzná ponuka
            </a>
          </div>

          {/* Mobile hamburger button (min 44px tap target) */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 active:scale-95 transition-transform"
            aria-label="Otvoriť menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Fullscreen Drawer with Smooth Backdrop */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#07090e]/98 backdrop-blur-2xl px-6 py-6 space-y-4 overflow-y-auto pb-28 border-t border-white/10">
            <a
              href="#riesenia"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center text-lg font-semibold text-slate-100 border-b border-white/5 active:text-amber-400"
            >
              Riešenia fotovoltiky & BESS
            </a>
            <a
              href="#konfigurator"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center text-lg font-semibold text-slate-100 border-b border-white/5 active:text-amber-400"
            >
              Inteligentný prepočet úspor
            </a>
            <a
              href="#preco-marvol"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center text-lg font-semibold text-slate-100 border-b border-white/5 active:text-amber-400"
            >
              Prečo Marvol s.r.o.
            </a>
            <a
              href="#proces"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center text-lg font-semibold text-slate-100 border-b border-white/5 active:text-amber-400"
            >
              Ako postupujeme (4 kroky)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center text-lg font-semibold text-slate-100 border-b border-white/5 active:text-amber-400"
            >
              Časté otázky (FAQ)
            </a>
            <Link
              href="/eshop"
              onClick={() => setMobileNavOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-lg font-semibold text-amber-400 border-b border-white/5"
            >
              <span>E-shop solárnych komponentov</span>
              <span className="text-xs bg-amber-400/20 px-2 py-0.5 rounded-full text-amber-300">B2B</span>
            </Link>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="#kontakt"
                onClick={() => setMobileNavOpen(false)}
                className="w-full py-4 text-center rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20"
              >
                Požiadať o bezplatnú obhliadku
              </a>
              <a
                href="tel:+421948123456"
                className="w-full py-3 text-center text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2"
              >
                <span>📞</span>
                <span>Zavolať: 0948 123 456</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION (Mobile Optimized Padding & Typography) */}
      <section className="relative z-10 pt-10 pb-16 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Hero Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] sm:text-xs tracking-wider uppercase font-semibold backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Oprávnený zhotoviteľ SIEA &bull; Certifikácie STN</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.08] break-words">
              Čistá energia.{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent block sm:inline">
                Maximálna sebestačnosť.
              </span>
            </h1>

            <p className="text-sm sm:text-xl text-slate-300/90 leading-relaxed font-normal px-2">
              Navrhujeme a inštalujeme prémiové fotovoltické elektrárne, bezpečné batériové úložiská LiFePO4 a tepelné čerpadlá. Všetko na kľúč so zárukou až 30 rokov.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
              <a
                href="#konfigurator"
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm tracking-wide hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center"
              >
                Vypočítať návratnosť systému &rarr;
              </a>
              <a
                href="#kontakt"
                className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-white font-medium text-sm transition-all hover:border-white/20 active:scale-[0.98] flex items-center justify-center"
              >
                Dohodnúť obhliadku zdarma
              </a>
            </div>
          </div>

          {/* Interactive Floating Segment Switcher (Mobile Touch-Optimized) */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-full max-w-lg grid grid-cols-3 gap-1 p-1 rounded-2xl sm:rounded-full bg-slate-900/90 border border-white/10 backdrop-blur-xl">
                {(
                  [
                    { id: 'home', label: 'Domy', fullLabel: 'Rodinné domy', icon: '🏠' },
                    { id: 'business', label: 'Firmy', fullLabel: 'Firmy & Priemysel', icon: '🏢' },
                    { id: 'storage', label: 'Batérie', fullLabel: 'Batérie & UPS', icon: '⚡' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSegment(tab.id)}
                    className={`min-h-[44px] py-2 sm:py-2.5 px-1.5 sm:px-5 rounded-xl sm:rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 text-center ${
                      activeSegment === tab.id
                        ? 'bg-white text-slate-950 shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-base sm:text-sm">{tab.icon}</span>
                    <span className="sm:hidden leading-none">{tab.label}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spotlight Card */}
            <div className="glass-minimal rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative transition-all duration-500 hover:border-amber-400/30">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Visual Image Side */}
                <div className="lg:col-span-6 relative min-h-[200px] sm:min-h-[280px] lg:min-h-[380px] overflow-hidden">
                  <img
                    src={currentSegment.img}
                    alt={currentSegment.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#07090e]" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase bg-slate-950/80 border border-white/10 text-amber-400 backdrop-blur-md">
                      {currentSegment.tag}
                    </span>
                  </div>
                </div>

                {/* Details Content Side */}
                <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                      {currentSegment.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {currentSegment.desc}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2 pt-1">
                      {currentSegment.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                            ✓
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 2 Key Stats and CTA */}
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-lg sm:text-2xl font-black text-amber-400">
                        {currentSegment.metric1}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                        {currentSegment.label1}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-lg sm:text-2xl font-black text-white">
                        {currentSegment.metric2}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                        {currentSegment.label2}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* METRIC STRIP (Airy, Monoline, Mobile Touch-Optimized) */}
      <section className="relative z-10 border-y border-white/5 bg-slate-950/50 py-8 sm:py-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="space-y-1 p-2">
              <div className="text-2xl sm:text-4xl font-black text-white">575 € / kW</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Oficiálna sadzba SIEA (TČ do 4 600 €)</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-2xl sm:text-4xl font-black text-amber-400">Až 80 %</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Zníženie výdavkov za elektrinu</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-2xl sm:text-4xl font-black text-white">30 rokov</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Lineárna garancia výkonu panelov</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-2xl sm:text-4xl font-black text-emerald-400">0 €</div>
              <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Osobná obhliadka po celom SK</div>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST SMART CONFIGURATOR (Mobile Touch-Optimized) */}
      <section id="konfigurator" className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Interaktívna kalkulácia
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
              Nakonfigurujte si úsporu na mieru
            </h2>
            <p className="text-xs sm:text-base text-slate-400 px-2">
              Zvoľte vašu mesačnú spotrebu a doplnkové technológie. Náš algoritmus vypočíta optimálnu veľkosť systému a výšku štátnej dotácie.
            </p>
          </div>

          <div className="glass-minimal rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 border border-white/10 shadow-2xl space-y-8 sm:space-y-10">
            
            {/* 1. Monthly Bill Range Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="bill-slider" className="text-xs sm:text-sm font-semibold text-slate-300 block">
                    Mesačná platba za elektrinu
                  </label>
                  <span className="text-[11px] text-slate-500">Približná suma na vašej faktúre</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  {monthlyBill} € <span className="text-xs font-normal text-slate-400">/ mes.</span>
                </div>
              </div>

              <input
                id="bill-slider"
                type="range"
                min="40"
                max="500"
                step="10"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-white/10"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>40 €</span>
                <span>150 €</span>
                <span>300 €</span>
                <span>500 €+</span>
              </div>
            </div>

            {/* 2. Three sleek technology switches */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                onClick={() => setWithBattery(!withBattery)}
                className={`min-h-[56px] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer active:scale-[0.98] ${
                  withBattery
                    ? 'border-amber-400/40 bg-amber-400/10 shadow-sm'
                    : 'border-white/5 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-2xl shrink-0">🔋</div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>LiFePO4 Batéria</span>
                    {withBattery && <span className="text-amber-400 text-xs font-bold">✓</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Uchovanie prebytkov na noc a záloha UPS</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWithHeatPump(!withHeatPump)}
                className={`min-h-[56px] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer active:scale-[0.98] ${
                  withHeatPump
                    ? 'border-emerald-400/40 bg-emerald-400/10 shadow-sm'
                    : 'border-white/5 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-2xl shrink-0">🌡️</div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Tepelné čerpadlo</span>
                    {withHeatPump && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Vykurovanie & chladenie (dotácia do 4 600 €)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setWithWallbox(!withWallbox)}
                className={`min-h-[56px] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex items-start gap-3.5 cursor-pointer active:scale-[0.98] ${
                  withWallbox
                    ? 'border-sky-400/40 bg-sky-400/10 shadow-sm'
                    : 'border-white/5 bg-slate-900/50 hover:border-white/20'
                }`}
              >
                <div className="text-2xl shrink-0">⚡</div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>EV Wallbox</span>
                    {withWallbox && <span className="text-sky-400 text-xs font-bold">✓</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Inteligentné nabíjanie zo slnečných prebytkov</div>
                </div>
              </button>
            </div>

            {/* 3. Result Panel with Large Crisp Numbers */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Odporúčaný výkon FVE</span>
                <div className="text-xl sm:text-3xl font-black text-white mt-1">
                  {recommendedKwp} kWp
                </div>
                <span className="text-[10px] text-slate-500">cca {Math.round(recommendedKwp * 2.2)} panelov</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Odhadovaná ročná úspora</span>
                <div className="text-xl sm:text-3xl font-black text-emerald-400 mt-1">
                  {estimatedSavings} €
                </div>
                <span className="text-[10px] text-slate-500">každý rok v peňaženke</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Štátna dotácia SIEA</span>
                <div className="text-xl sm:text-3xl font-black text-amber-400 mt-1">
                  {estimatedSubsidy} €
                </div>
                <span className="text-[10px] text-slate-500">odpočet z faktúry</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Návratnosť investície</span>
                <div className="text-xl sm:text-3xl font-black text-sky-400 mt-1">
                  ~ {payback} r.
                </div>
                <span className="text-[10px] text-slate-500">životnosť 30+ rokov</span>
              </div>
            </div>

            {/* Direct inquiry trigger button */}
            <div className="text-center pt-2">
              <a
                href="#kontakt"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-xl hover:shadow-amber-400/20 active:scale-[0.98]"
              >
                <span>Požiadať o bezplatnú obhliadku pre túto konfiguráciu</span>
                <span>&rarr;</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* THE 4 PILLARS (Minimalist Bento Grid) */}
      <section id="riesenia" className="relative z-10 py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Naše piliere
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
              Špičkové technológie bez kompromisov
            </h2>
            <p className="text-xs sm:text-base text-slate-400">
              Pracujeme výhradne s certifikovanými európskymi komponentmi a inštalujeme systémy navrhnuté na desaťročia bezporuchovej prevádzky.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Card 1: Fotovoltika */}
            <div className="glass-minimal glass-minimal-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl">
                  ☀️
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">N-Type TOPCon Fotovoltika</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Najnovšia generácia monokryštalických panelov s účinnosťou až 22,5%. Vysoký zisk aj pri difúznom zimnom svetle a záruka na výkon 30 rokov.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Dotácia SIEA: 575 €/kW</span>
                <Link href="/fotovoltika-pre-domacnosti" className="text-amber-400 font-semibold hover:underline">
                  Podrobnosti &rarr;
                </Link>
              </div>
            </div>

            {/* Card 2: BESS & Batérie */}
            <div className="glass-minimal glass-minimal-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                  🔋
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">LiFePO4 Batériové úložiská</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Modulárne vysokonapäťové úložiská s 6 000+ nabíjacími cyklami. Bezpečná nehorľavá chémia a automatický mikrosekundový záskok pri výpadku siete.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Záloha celého domu</span>
                <Link href="/bateriove-uloziska-bess" className="text-purple-400 font-semibold hover:underline">
                  Podrobnosti &rarr;
                </Link>
              </div>
            </div>

            {/* Card 3: Tepelné čerpadlá */}
            <div className="glass-minimal glass-minimal-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-2xl">
                  🌡️
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Tepelné čerpadlá Vzduch-Voda</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Ekologické vykurovanie a letné chladenie s energetickou triedou A+++. Inteligentná synergia SG Ready využíva solárne prebytky na ohrev vody.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Dotácia až 4 600 €</span>
                <Link href="/tepelne-cerpadla" className="text-emerald-400 font-semibold hover:underline">
                  Podrobnosti &rarr;
                </Link>
              </div>
            </div>

            {/* Card 4: Protipožiarna ochrana & Bezpečnosť */}
            <div className="glass-minimal glass-minimal-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 md:col-span-2 lg:col-span-2">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-2xl">
                  🛡️
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Bezpečné napätie & Protipožiarna ochrana STN</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Každú inštaláciu vybavujeme bezpečnostnými systémami Rapid Shutdown (zníženie napätia na bezpečnú hodnotu pod 120V pri zásahu hasičov), AFDD oblúkovou ochranou a prepäťovými poistkami SPD typu 1+2.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Revízie OPOS § 24 v cene</span>
                <Link href="/sluzby/protipoziarna-ochrana-bezpecne-napatie" className="text-sky-400 font-semibold hover:underline">
                  Bezpečnostné štandardy STN &rarr;
                </Link>
              </div>
            </div>

            {/* Card 5: E-shop & Komponenty */}
            <div className="glass-minimal glass-minimal-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-2xl">
                  📦
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">E-Shop solárnych komponentov</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Veľkoobchodný a maloobchodný predaj overených komponentov Huawei, SolaX, Canadian Solar. Sklad vo Vrútkach.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Skladom na Slovensku</span>
                <Link href="/eshop" className="text-amber-400 font-semibold hover:underline">
                  Prejsť do e-shopu &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PROCESS TIMELINE (Minimalist 4 steps) */}
      <section id="proces" className="relative z-10 py-16 sm:py-24 bg-slate-950/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Jednoduchý postup
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
              4 kroky k vlastnej elektrine
            </h2>
            <p className="text-xs sm:text-base text-slate-400">
              Celý proces riadime od A po Z. Vy sa nemusíte zaoberať úradmi ani distribúciou.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: '01',
                title: '3D Návrh & Obhliadka',
                desc: 'Zameriame strechu, vytvoríme digitálny 3D model tienenia a prepočítame reálnu ročnú návratnosť.',
              },
              {
                step: '02',
                title: 'Rezervácia dotácie SIEA',
                desc: 'Zaregistrujeme vašu žiadosť v portáli SIEA a garantujeme priame odpočítanie príspevku z faktúry.',
              },
              {
                step: '03',
                title: 'Certifikovaná montáž',
                desc: 'Naši interní montážnici osadia panely, menič a batériu za 1 až 2 dni bez zásahu do funkčnosti domu.',
              },
              {
                step: '04',
                title: 'Revízia OPOS & Sieť',
                desc: 'Vydáme úradnú revíznu správu § 24 a zabezpečíme pripojenie u distribučnej spoločnosti (SSD/ZSD/VSD).',
              },
            ].map((s) => (
              <div key={s.step} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                <div className="text-2xl sm:text-3xl font-black text-amber-400/40">{s.step}</div>
                <h4 className="text-sm sm:text-base font-bold text-white">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MINIMALIST CONTACT INQUIRY SECTION (Touch & iOS Zoom Protected) */}
      <section id="kontakt" className="relative z-10 py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 sm:mb-12 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Nezáväzný dopyt
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
              Začnite s bezplatnou obhliadkou
            </h2>
            <p className="text-xs sm:text-base text-slate-400">
              Odpovieme vám do 24 hodín s orientačným technickým návrhom a kalkuláciou úspor.
            </p>
          </div>

          <div className="glass-minimal rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-10 sm:py-12 text-center space-y-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl sm:text-3xl mx-auto font-bold">
                  ✓
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Ďakujeme za váš dopyt!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Náš technický poradca z Marvol s.r.o. vás bude kontaktovať najneskôr do 24 hodín s návrhom riešenia.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-5 sm:space-y-6">
                
                {formError && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                    {formError}
                  </div>
                )}

                {/* Category Pills */}
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">
                    O aké riešenie máte záujem?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'dom', label: 'Rodinný dom' },
                      { id: 'firma', label: 'Firma / B2B' },
                      { id: 'bateria', label: 'Batériové úložisko' },
                      { id: 'cerpadlo', label: 'Tepelné čerpadlo' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setLeadCategory(cat.id as any)}
                        className={`min-h-[44px] py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center flex items-center justify-center ${
                          leadCategory === cat.id
                            ? 'border-amber-400 bg-amber-400/15 text-white shadow-sm'
                            : 'border-white/5 bg-slate-900/60 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs Grid (Minimum 16px text-base to prevent iOS Safari auto-zoom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">
                      Meno a priezvisko *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ján Novák"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-base focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">
                      Telefónne číslo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+421 9XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-base focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">
                      Mesto / Obec inštalácie
                    </label>
                    <input
                      type="text"
                      placeholder="napr. Martin, Žilina, Bratislava..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-base focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-medium block mb-1">
                      Poznámka alebo otázka (nepovinné)
                    </label>
                    <input
                      type="text"
                      placeholder="napr. šikmá škridlová strecha, ročná spotreba..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-base focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* GDPR checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1 min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={gdpr}
                    onChange={(e) => setGdpr(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded accent-amber-400 cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] text-slate-400 leading-tight">
                    Súhlasím so spracovaním osobných údajov pre účely vypracovania cenovej ponuky spoločnosťou Marvol s.r.o. podľa GDPR.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full min-h-[50px] py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 cursor-pointer active:scale-[0.99]"
                >
                  {formSubmitting ? 'Odosielam dopyt...' : 'Odoslať nezáväzný dopyt & získať prepočet'}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] text-slate-500 pt-1 text-center">
                  <span>✓ 100% bezplatná obhliadka</span>
                  <span>✓ Dotácia do 1 150 € / 4 600 €</span>
                  <span>✓ Odpoveď do 24h</span>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* MINIMALIST FAQ */}
      <section id="faq" className="relative z-10 py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 sm:mb-12 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Odpovede na otázky
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Často kladené otázky
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full min-h-[52px] p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 text-xl leading-none shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* MINIMALIST CLEAN FOOTER (Extra Bottom Padding for Mobile Sticky Bar) */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/90 py-10 sm:py-12 pb-24 sm:pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <img
              src="/Logo (1920 x 800 px).svg"
              alt="Marvol logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span>&copy; {new Date().getFullYear()} Marvol s.r.o. Všetky práva vyhradené.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-400">
            <span>Sídlo: Vrútky</span>
            <span>IČO: 53 060 091</span>
            <a href="tel:+421948123456" className="text-amber-400 hover:underline">
              0948 123 456
            </a>
            <a href="mailto:info@marvol.sk" className="hover:text-white transition-colors">
              info@marvol.sk
            </a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE QUICK BAR (Thumb-friendly conversion bar) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-2.5 sm:hidden flex items-center gap-2 shadow-2xl">
        <a
          href="tel:+421948123456"
          className="flex-1 min-h-[46px] px-3 rounded-xl bg-slate-900 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:bg-slate-800"
        >
          <span>📞</span>
          <span>0948 123 456</span>
        </a>
        <a
          href="#konfigurator"
          className="flex-[1.5] min-h-[46px] px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/25 active:scale-98"
        >
          <span>⚡</span>
          <span>Prepočítať úsporu</span>
        </a>
      </div>

    </div>
  );
}
