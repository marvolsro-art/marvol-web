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
    <section id="fotovoltika" className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 bg-hero-pattern overflow-hidden text-white">
      {/* Ambient Glow Effects (Anti-slop subtle illumination) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-amber-400 text-xs sm:text-sm font-semibold">
              <SunIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Certifikovaný špecialista na fotovoltiku a energetické riešenia</span>
            </div>

            {/* Main Headline (max 2-line display hierarchy) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.12]">
              Kompletné fotovoltické riešenia na kľúč <span className="text-amber-400">pre domy aj firmy</span>
            </h1>

            {/* Subheading (>= 16px body copy) */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Spoločnosť <strong className="text-white font-semibold">Marvol s.r.o.</strong> zabezpečuje profesionálny návrh, autorizovanú montáž a servis fotovoltických systémov, batériových úložísk BESS a tepelných čerpadiel. Znížte náklady na energie až o 80 % s využitím štátnych dotácií SIEA.
            </p>

            {/* Value Triggers (Guarantees & Compliance) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl text-xs font-medium text-slate-200">
                <CurrencyEuroIcon className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left">
                  <strong className="block text-white font-semibold">Dotácia do 4 600 €</strong>
                  <span className="text-slate-400 text-[11px]">Vybavenie SIEA zadarmo</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl text-xs font-medium text-slate-200">
                <ShieldIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <strong className="block text-white font-semibold">Záruka 25 rokov</strong>
                  <span className="text-slate-400 text-[11px]">Lineárna garancia výkonu</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900 p-3 rounded-xl text-xs font-medium text-slate-200">
                <WrenchIcon className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="text-left">
                  <strong className="block text-white font-semibold">Vlastní montážnici</strong>
                  <span className="text-slate-400 text-[11px]">Certifikát MH SR & revízia</span>
                </div>
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
                className="px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-colors text-center flex items-center justify-center gap-2 min-h-[48px] tap-target-48"
              >
                <span>Naše realizácie</span>
              </a>
            </div>

            {/* Quick Navigation Jump Pills to Primary Subpages */}
            <div className="pt-6 space-y-2">
              <p className="text-sm font-semibold text-slate-400 text-center lg:text-left">
                Rýchly výber riešenia:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Link
                  href="/fotovoltika-pre-domacnosti"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <HomeIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Rodinné domy</span>
                </Link>

                <Link
                  href="/fotovoltika-pre-firmy"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-sky-400/50 text-slate-300 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <BuildingOfficeIcon className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Firmy &amp; priemysel</span>
                </Link>

                <Link
                  href="/bateriove-uloziska-bess"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-400/50 text-slate-300 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <BatteryIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Batériové úložiská BESS</span>
                </Link>

                <Link
                  href="/tepelne-cerpadla"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-medium transition-colors min-h-[48px] tap-target-48"
                >
                  <HeatPumpIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Tepelné čerpadlá</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Interactive Preview with Ambient Backlight ("Podsvietenie") */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none w-full group">
              
              {/* Vibrant Ambient Backlight Glow ("Podsvietenie okna") */}
              <div
                className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-500 rounded-3xl blur-xl opacity-35 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Card Shell */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-md">
                
                {/* Mode Selector Tabs (Modelová úspora vs. Reálna inštalácia) */}
                <div className="p-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHeroCardTab('model')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer tap-target-48 min-h-[44px] ${
                      heroCardTab === 'model'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-900/60'
                    }`}
                  >
                    <BoltIcon className="w-4 h-4 shrink-0" />
                    <span>Modelová úspora</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHeroCardTab('photo')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer tap-target-48 min-h-[44px] ${
                      heroCardTab === 'photo'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white bg-slate-900/60'
                    }`}
                  >
                    <SunIcon className="w-4 h-4 shrink-0" />
                    <span>Reálna inštalácia</span>
                  </button>
                </div>

                {/* View 1: Interactive Model Preview Card (Exact illuminated window from screenshot) */}
                <div className={heroCardTab === 'model' ? 'block p-6 sm:p-7 space-y-4' : 'hidden'}>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold shrink-0">
                        <BoltIcon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Modelová úspora</h3>
                        <p className="text-xs text-slate-400">Fotovoltika 10 kWp + Batéria 10 kWh</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">
                      A+ Energetická trieda
                    </span>
                  </div>

                  {/* Inner Windows */}
                  <div className="space-y-3">
                    
                    {/* Window 1: Pôvodné ročné náklady */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Pôvodné ročné náklady:</span>
                      <span className="text-slate-400 font-bold text-sm line-through">2 400 € / rok</span>
                    </div>

                    {/* Window 2: Nové náklady s fotovoltikou */}
                    <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Nové náklady s fotovoltikou:</span>
                      <span className="text-emerald-400 font-extrabold text-sm">480 € / rok</span>
                    </div>

                    {/* Window 3: Čistá ročná úspora (Illuminated Golden Window) */}
                    <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent p-4 rounded-xl border border-amber-500/40 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Čistá ročná úspora</p>
                        <p className="text-2xl font-black text-amber-400 mt-0.5">1 920 €</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Návratnosť investície</p>
                        <p className="text-sm font-bold text-white">cca 3.5 - 4.5 roka</p>
                      </div>
                    </div>

                    {/* Window 4: Dotácie notice */}
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-300">
                      <AlertCircleIcon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>S dotáciou <strong>Zelená domácnostiam</strong> ušetríte na fotovoltike až <strong>1 150 €</strong> (tepelné čerpadlá až <strong>4 600 €</strong>, Solidarita <strong>90 %</strong>).</span>
                    </div>

                  </div>

                  {/* Window 5: CTA Action Button */}
                  <a
                    href="#kalkulacka"
                    className="block w-full py-3.5 text-center font-bold text-sm rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm min-h-[48px] tap-target-48 flex items-center justify-center gap-2"
                  >
                    <span>Vypočítať presnú úsporu pre môj dom</span>
                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                </div>

                {/* View 2: Authentic 16:9 Photography Card (Always present in DOM for SSR LCP and test integrity) */}
                <div className={heroCardTab === 'photo' ? 'block' : 'hidden'}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img
                      src="/images/fotovoltika-domacnosti/hero.jpg"
                      alt="Reálna inštalácia fotovoltiky pre rodinný dom od Marvol s.r.o."
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      width={1376}
                      height={768}
                    />
                    <div className="absolute inset-0 bg-slate-950/15 pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Reálna inštalácia Marvol</span>
                    </div>

                    <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
                      <span>N-Type TOPCon</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>Rodinný dom s LiFePO4 úložiskom</span>
                        <span className="text-emerald-400 font-bold">Úspora až 80 %</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        Kompletná fotovoltická elektráreň s vybavením dotácie Zelená domácnostiam.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 grid grid-cols-3 gap-3 text-center border-t border-slate-800">
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
