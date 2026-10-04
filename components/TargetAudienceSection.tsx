import React from 'react';

export const TargetAudienceSection: React.FC = () => {
  return (
    <section id="target-groups" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Riešenia prispôsobené na mieru
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Pre kategórie zákazníkov
          </h2>
          <p className="text-slate-400 text-base">
            Každý objekt vyžaduje špecifické technické riešenie. Spoločnosť Marvol s.r.o. dodáva energetické systémy pre všetky typy nehnuteľností.
          </p>
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Domácnosti */}
          <div className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-xl hover:-translate-y-1">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                🏡
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Domácnosti
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Plaťte menej za energie a užívajte si vyšší komfort bývania. Smart fotovoltické systémy a batérie znížia vaše mesačné účty o 70 až 90%.
                </p>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fotovoltika od 3 kWp do 10 kWp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Batériové úložiská & virtuálna batéria</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Nabíjacie stanice Wallbox pre elektromobily</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-emerald-400">Dotácia Zelená domácnostiam (FV do 1 150 €, TČ do 4 600 €)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#kalkulacka"
                className="block w-full py-3 min-h-[44px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white transition-all border border-slate-700 hover:border-amber-400"
              >
                Mám záujem pre rodinný dom
              </a>
            </div>
          </div>

          {/* Card 2: Firmy */}
          <div className="bg-slate-950/70 border border-slate-800 hover:border-sky-500/50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-xl hover:-translate-y-1">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                🏢
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors">
                  Firmy & Priemysel
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Optimalizujte prevádzkové náklady výrobných hál, logistických centier a administratívnych budov. Chráňte podnikanie pred výkyvmi cien energií.
                </p>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lokálne fotovoltické zdroje od 10 kWp do 500+ kWp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priemyselné batériové úložiská (BESS)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Elektroinštalácie a rozvádzače pre priemysel</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-emerald-400">Program Zelená podnikom pre firmy</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#kontakt"
                className="block w-full py-3 min-h-[44px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-white transition-all border border-slate-700 hover:border-sky-500"
              >
                Kalkulácia pre firemné objekty
              </a>
            </div>
          </div>

          {/* Card 3: Samosprávy */}
          <div className="bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-xl hover:-translate-y-1">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                🏛️
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  Samosprávy & Obce
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Efektívnejšie hospodárenie s verejnými financiami. Fotovoltika pre škôlky, úrady a kultúrne domy.
                </p>
              </div>

              <ul className="space-y-3 pt-2 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Solárne panely pre obecné a mestské budovy</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Energetická sebestačnosť verejných objektov</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Elektroinštalačné práce a revízie</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-emerald-400">Verejné obstarávanie & Inžiniering</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#kontakt"
                className="block w-full py-3 min-h-[44px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-slate-800 hover:bg-emerald-400 hover:text-slate-950 text-white transition-all border border-slate-700 hover:border-emerald-400"
              >
                Riešenie pre obce a mestá
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
