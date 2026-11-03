import React from 'react';

export const SubsidyBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 py-12 sm:py-16"> {/* taste-skill-ignore */}
      {/* Subtle architectural solar light shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/[0.04] pointer-events-none" aria-hidden="true" /> {/* taste-skill-ignore */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-yellow-200/40 to-transparent pointer-events-none" aria-hidden="true" /> {/* taste-skill-ignore */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="text-left max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-950/80">
              Oficiálny registrovaný zhotoviteľ SIEA
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 leading-tight">
              Vybavíme za vás štátne dotácie Zelená domácnostiam a Zelená podnikom
            </h2>
            <p className="text-slate-950 font-medium text-sm sm:text-base leading-relaxed">
              Zabezpečíme online rezerváciu poukážky, kompletnú projektovú a revíznu dokumentáciu aj vyplatenie príspevku. Celý proces prebehne bez administratívnych komplikácií pre vás.
            </p>

            {/* Factual 3-Figure Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-slate-950/[0.08] border border-slate-950/10 p-3.5 rounded-xl transition-transform hover:-translate-y-0.5">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">do 1 150 €</span>
                <span className="text-xs font-bold text-slate-900">Fotovoltika pre domy</span>
              </div>
              <div className="bg-slate-950/[0.08] border border-slate-950/10 p-3.5 rounded-xl transition-transform hover:-translate-y-0.5">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">do 4 600 €</span>
                <span className="text-xs font-bold text-slate-900">Tepelné čerpadlá</span>
              </div>
              <div className="bg-slate-950/[0.08] border border-slate-950/10 p-3.5 rounded-xl transition-transform hover:-translate-y-0.5">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">0 € poplatok</span>
                <span className="text-xs font-bold text-slate-900">Administrácia SIEA</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto self-start lg:self-center">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-900 active:scale-[0.98] text-white font-extrabold px-8 py-4 rounded-xl transition-all text-sm min-h-[48px] tap-target-48 group"
            >
              <span>Vybaviť dotáciu s Marvol</span>
              <svg className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
