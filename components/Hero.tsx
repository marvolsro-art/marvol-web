import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="fotovoltika" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero-pattern overflow-hidden text-white border-b border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Tagline / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs sm:text-sm font-semibold shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Špecialisti na fotovoltiku na kľúč & energetické riešenia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Energetická sebestačnosť pre váš <span className="text-gradient-amber">domov, firmu aj obec</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Spoločnosť <strong className="text-white font-semibold">Marvol s.r.o.</strong> vám navrhne a kompletne zrealizuje fotovoltický systém s garanciou výnosnosti. Znížte náklady na elektrinu až o 80% s využitím štátnych dotácií.
            </p>

            {/* Guarantees Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl text-xs font-medium text-slate-300">
                <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vybavenie dotácie zadarmo</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl text-xs font-medium text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Montáž do 14 dní</span>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl text-xs font-medium text-slate-300 col-span-2 sm:col-span-1">
                <svg className="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>Záruka 25 rokov</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#kalkulacka"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_auto] hover:bg-[position:100%_0] transition-all duration-300 shadow-xl shadow-amber-500/20 text-center flex items-center justify-center gap-2 group"
              >
                <span>Kalkulačka úspory & Návrh</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#sluzby"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Preskúmať služby</span>
              </a>
            </div>

            {/* Social Proof / Stats */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">350+</p>
                <p className="text-xs text-slate-400 mt-1">Úspešných inštalácií</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">až 85%</p>
                <p className="text-xs text-slate-400 mt-1">Úspora na elektrine</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
                <p className="text-xs text-slate-400 mt-1">Úspešnosť dotácií</p>
              </div>
            </div>

          </div>

          {/* Hero Visual Card / Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-sky-500 rounded-2xl blur-lg opacity-30"></div>
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                      ⚡
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

                {/* Metrics Breakdown */}
                <div className="space-y-4">
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Pôvodné ročné náklady:</span>
                    <span className="text-slate-300 font-bold text-sm line-through">2 400 € / rok</span>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Nové náklady s fotovoltikou:</span>
                    <span className="text-emerald-400 font-extrabold text-sm">480 € / rok</span>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-xl border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Čistá ročná úspora</p>
                      <p className="text-2xl font-black text-amber-400 mt-0.5">1 920 €</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Návratnosť investície</p>
                      <p className="text-sm font-bold text-white">cca 3.5 - 4.5 roka</p>
                    </div>
                  </div>
                </div>

                {/* Subsidies notice in card */}
                <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/50 flex items-center gap-3 text-xs text-slate-300">
                  <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>S dotáciou <strong>Zelená domácnostiam</strong> ušetríte na fotovoltike až <strong>1 150 €</strong> (tepelné čerpadlá až <strong>4 600 €</strong>, Solidarita <strong>90 %</strong>).</span>
                </div>

                <a
                  href="#kalkulacka"
                  className="block w-full py-3.5 text-center font-bold text-sm rounded-xl text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg"
                >
                  Vypočítať presnú úsporu pre môj dom
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
