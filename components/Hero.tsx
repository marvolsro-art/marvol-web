import React, { useState } from 'react';
import Link from 'next/link';
import {
  SunIcon,
  ShieldIcon,
  WrenchIcon,
  CurrencyEuroIcon,
  HomeIcon,
  BuildingOfficeIcon,
  BatteryIcon,
  HeatPumpIcon,
  BoltIcon,
  AlertCircleIcon,
} from '@/components/icons';

export const Hero: React.FC = () => {
  const [heroCardTab, setHeroCardTab] = useState<'model' | 'photo'>('model');
  return (
    <section id="fotovoltika" className="relative pt-40 pb-16 sm:pt-44 sm:pb-20 md:pt-44 lg:pt-48 lg:pb-24 bg-slate-950 overflow-hidden text-white scroll-mt-36 sm:scroll-mt-40 md:scroll-mt-44">
      {/* FULL-WIDTH ZOOMED ROOF PHOTO BACKGROUND WITH SMOOTH DOWNWARD DISSOLVE TRANSITION */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src="/images/roof/solar-roof-macro.jpg"
          alt="Detail fotovoltických panelov na modernej streche - Marvol s.r.o."
          className="w-full h-full object-cover object-[center_35%] scale-105 pointer-events-none select-none motion-safe:transition-transform motion-safe:duration-1000"
        />

        {/* Dark contrast base overlay for high text legibility */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-brightness-[0.8]" />

        {/* Radial vignette spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.88)_100%)]" />

        {/* Top gradient fade under sticky header */}
        <div className="absolute inset-x-0 top-0 h-36 sm:h-48 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent z-10" />

        {/* Downward fading transition into page background ("miznúci prechod pri scrolle nižšie") */}
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-72 lg:h-96 bg-gradient-to-b from-transparent via-slate-950/75 to-slate-950 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Direct Editorial Motto & Brand Anchor */}
            <p className="text-sm font-semibold tracking-wide text-emerald-400">
              Marvol · robíme svet zelenším
            </p>

            {/* Main Headline (max 2-line display hierarchy, solid ink) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Kompletné fotovoltické riešenia na kľúč pre domy aj firmy
            </h1>

            {/* Subheading (>= 16px body copy) */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Spoločnosť <strong className="text-white font-semibold">Marvol s.r.o.</strong> zabezpečuje profesionálny návrh, autorizovanú montáž a servis fotovoltických systémov, batériových úložísk BESS a tepelných čerpadiel. Znížte náklady na energie až o 80 % s využitím štátnych dotácií SIEA.
            </p>

            {/* Value Triggers (Guarantees & Compliance) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="bg-slate-900/90 p-4 rounded-xl text-left">
                <strong className="block text-white font-bold text-sm">Dotácia do 4 600 €</strong>
                <span className="text-slate-400 text-xs mt-0.5 block">Vybavenie SIEA zadarmo</span>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl text-left">
                <strong className="block text-white font-bold text-sm">Záruka 25 rokov</strong>
                <span className="text-slate-400 text-xs mt-0.5 block">Lineárna garancia výkonu</span>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-xl text-left">
                <strong className="block text-white font-bold text-sm">Vlastní montážnici</strong>
                <span className="text-slate-400 text-xs mt-0.5 block">Certifikát MH SR &amp; revízia</span>
              </div>
            </div>

            {/* Dual CTAs (>= 48px touch targets) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#kalkulacka"
                className="px-7 py-3.5 sm:py-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center flex items-center justify-center gap-2 min-h-[48px] tap-target-48 group"
              >
                <span>Nezáväzná kalkulácia úspor</span>
                <svg className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#referencie"
                className="px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors text-center flex items-center justify-center gap-2 min-h-[48px] tap-target-48"
              >
                <span>Naše realizácie</span>
              </a>
            </div>

            {/* Quick Navigation Jump to Primary Subpages */}
            <div className="pt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center lg:text-left">
                Rýchly výber kategórie:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Link
                  href="/fotovoltika-pre-domacnosti"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <HomeIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Rodinné domy</span>
                </Link>

                <Link
                  href="/fotovoltika-pre-firmy"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <BuildingOfficeIcon className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Firmy &amp; priemysel</span>
                </Link>

                <Link
                  href="/bateriove-uloziska-bess"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <BatteryIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Batériové úložiská BESS</span>
                </Link>

                <Link
                  href="/tepelne-cerpadla"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <HeatPumpIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Tepelné čerpadlá</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none w-full">
              
              {/* Main Card Shell (Crisp Solid Surface, Zero Gradient Halos) */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900">
                
                {/* Mode Selector Tabs (Modelová úspora vs. Reálna inštalácia) */}
                <div className="p-2 bg-slate-950 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('model')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer tap-target-48 min-h-[44px] ${
                      heroCardTab === 'model'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-400 hover:text-white bg-slate-900'
                    }`}
                  >
                    <BoltIcon className="w-4 h-4 shrink-0" />
                    <span>Modelová úspora</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHeroCardTab('photo')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer tap-target-48 min-h-[44px] ${
                      heroCardTab === 'photo'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-400 hover:text-white bg-slate-900'
                    }`}
                  >
                    <SunIcon className="w-4 h-4 shrink-0" />
                    <span>Reálna inštalácia</span>
                  </button>
                </div>

                {/* View 1: Interactive Model Preview Card */}
                <div className={heroCardTab === 'model' ? 'block p-6 sm:p-7 space-y-4' : 'hidden'}>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-amber-400 font-bold shrink-0">
                        <BoltIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Modelová kalkulácia</h3>
                        <p className="text-xs text-slate-400">Fotovoltika 10 kWp + Batéria 10 kWh</p>
                      </div>
                    </div>
                    <span className="bg-emerald-400/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">
                      A+ Trieda
                    </span>
                  </div>

                  {/* Inner Windows */}
                  <div className="space-y-3">
                    
                    {/* Window 1: Pôvodné ročné náklady */}
                    <div className="bg-slate-950 p-3.5 rounded-xl flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Pôvodné ročné náklady:</span>
                      <span className="text-slate-400 font-bold text-sm line-through">2 400 € / rok</span>
                    </div>

                    {/* Window 2: Nové náklady s fotovoltikou */}
                    <div className="bg-slate-950 p-3.5 rounded-xl flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Nové náklady s fotovoltikou:</span>
                      <span className="text-emerald-400 font-extrabold text-sm">480 € / rok</span>
                    </div>

                    {/* Window 3: Čistá ročná úspora */}
                    <div className="bg-slate-950 p-4 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs text-amber-400 font-bold">Čistá ročná úspora</p>
                        <p className="text-2xl font-black text-amber-400 mt-0.5">1 920 €</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Návratnosť investície</p>
                        <p className="text-sm font-bold text-white">cca 3.5 - 4.5 roka</p>
                      </div>
                    </div>

                    {/* Window 4: Dotácie notice */}
                    <div className="bg-slate-950 p-3 rounded-xl flex items-center gap-2.5 text-xs text-slate-300">
                      <AlertCircleIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>S dotáciou <strong>Zelená domácnostiam</strong> ušetríte na fotovoltike až <strong>1 150 €</strong> (tepelné čerpadlá až <strong>4 600 €</strong>).</span>
                    </div>

                  </div>

                  {/* Window 5: CTA Action Button */}
                  <a
                    href="#kalkulacka"
                    className="block w-full py-3.5 text-center font-bold text-sm rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors min-h-[48px] tap-target-48 flex items-center justify-center gap-2"
                  >
                    <span>Vypočítať presnú úsporu pre môj dom</span>
                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>

                {/* View 2: Authentic 16:9 Photography Card */}
                <div className={heroCardTab === 'photo' ? 'block' : 'hidden'}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src="/images/roof/solar-roof-macro.jpg"
                      alt="Reálna inštalácia fotovoltiky pre rodinný dom od Marvol s.r.o."
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={1376}
                      height={768}
                    />
                    <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/90 text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Reálna inštalácia Marvol</span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
                      <span>N-Type TOPCon</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/90 text-xs text-slate-300">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>Rodinný dom s LiFePO4 úložiskom</span>
                        <span className="text-emerald-400 font-bold">Úspora až 80 %</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        Kompletná fotovoltická elektráreň s vybavením dotácie Zelená domácnostiam.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-amber-400">350+</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Inštalácií</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-white">až 80 %</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Úspora nákladov</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-emerald-400">100 %</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Schválenie SIEA</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
