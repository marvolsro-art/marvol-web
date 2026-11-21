import React from 'react';

export const SubsidyBanner: React.FC = () => {
  return (
    <section id="dotacie" className="bg-amber-400 text-slate-950 py-12 sm:py-16 relative overflow-hidden scroll-mt-36 sm:scroll-mt-40 md:scroll-mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="text-left max-w-3xl space-y-3">
            <p className="text-sm font-bold text-slate-950">
              Oficiálny registrovaný zhotoviteľ SIEA pre rok 2026
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight">
              Vybavíme za vás štátne dotácie do výšky 4 600 €
            </h2>
            <p className="text-slate-950/90 font-medium text-base leading-relaxed">
              Zabezpečíme online registráciu poukážky, kompletnú technickú a revíznu dokumentáciu aj priame vyplatenie príspevku. Celý proces prebehne bez administratívnych poplatkov a zbytočných prieťahov.
            </p>

            {/* Factual 3-Figure Strip with clean tone-step surfaces */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-slate-950/10 p-4 rounded-xl">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">do 1 150 €</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">Fotovoltika pre domy</span>
              </div>
              <div className="bg-slate-950/10 p-4 rounded-xl">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">do 4 600 €</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">Tepelné čerpadlá</span>
              </div>
              <div className="bg-slate-950/10 p-4 rounded-xl">
                <span className="block text-2xl font-black text-slate-950 tracking-tight">0 € poplatok</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">Administrácia SIEA</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto self-start lg:self-center">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-8 py-4 rounded-xl transition-colors text-sm min-h-[48px] tap-target-48 group"
            >
              <span>Vybaviť dotáciu s Marvol</span>
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
