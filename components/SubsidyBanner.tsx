import React from 'react';

export const SubsidyBanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-slate-950 py-10 relative overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-block bg-slate-950 text-amber-400 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-1">
              Aktuálne dotácie SIEA: FV do 1 150 € • Tepelné čerpadlá do 4 600 € • Solidarita až 90 %
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Vybavíme za vás dotácie z projektov Zelená domácnostiam & Zelená podnikom
            </h2>
            <p className="text-slate-900 font-medium text-sm sm:text-base max-w-3xl">
              Nemusíte sa obávať novej administratívy ani zmien v systéme SIEA. Zabezpečíme online rezerváciu prostriedkov, kompletnú technickú dokumentáciu a vyplatenie príspevku priamo vám.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95 text-sm min-h-[44px]"
            >
              <span>Vybaviť dotáciu s Marvol s.r.o.</span>
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
