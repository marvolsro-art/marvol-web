import React from 'react';

export const SubsidyBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-slate-950 py-10 sm:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="text-left">
            <div className="inline-block bg-slate-950 text-amber-400 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 sm:mb-4">
              Aktuálne dotácie SIEA: FV do 1 150 € • Tepelné čerpadlá do 4 600 € • Solidarita až 90 %
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 leading-tight mb-3">
              Vybavíme za vás dotácie z projektov Zelená domácnostiam &amp; Zelená podnikom
            </h2>
            <p className="text-slate-950 font-medium text-sm sm:text-base max-w-3xl leading-relaxed">
              Nemusíte sa obávať novej administratívy ani zmien v systéme SIEA. Zabezpečíme online rezerváciu prostriedkov, kompletnú technickú dokumentáciu a vyplatenie príspevku priamo vám.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm min-h-[48px] tap-target-48 group"
            >
              <span>Vybaviť dotáciu s Marvol s.r.o.</span>
              <svg className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
