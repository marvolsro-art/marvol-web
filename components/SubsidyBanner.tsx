import React from 'react';
import { ShieldIcon, CheckIcon } from '@/components/icons';

export const SubsidyBanner: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-12 sm:py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* Main Copy & Regulatory Badges */}
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs sm:text-sm font-semibold">
              <ShieldIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Aktuálne dotácie SIEA: FV do 1 150 € • Tepelné čerpadlá do 4 600 € • Zelená domácnostiam do 4 025 € • Solidarita až 90 %</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Vybavíme za vás štátne dotácie Zelená domácnostiam aj Zelená podnikom
            </h2>

            <p className="text-slate-300 font-normal text-sm sm:text-base max-w-3xl leading-relaxed">
              Nemusíte sa obávať administratívy ani zmien v pravidlách SIEA. Zabezpečíme registráciu poukážky, kompletnú technickú dokumentáciu a garantované odpočítanie príspevku priamo z faktúry bez zbytočného čakania.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100 % vybavenie v SIEA bez poplatku</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Odpočet dotácie priamo z faktúry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Platí pre fotovoltiku, batérie aj TČ</span>
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-7 py-3.5 rounded-xl transition-colors text-sm min-h-[48px] tap-target-48"
            >
              <span>Vybaviť dotáciu s Marvol s.r.o.</span>
              <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
