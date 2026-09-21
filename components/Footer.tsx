import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo%20marvol.svg"
                alt="Marvol s.r.o."
                className="h-10 w-auto max-w-[180px] object-contain filter brightness-110 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
              />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, tepelné čerpadlá a kompletné elektroinštalácie s revíziami.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-300">Marvol s. r. o. | Chotárna 3394/6, 038 61 Vrútky</p>
              <p>IČO: 53 060 091 | DIČ: 2121255961 | IČ DPH: SK2121255961</p>
              <p>Zápis: OR OS Žilina, oddiel: Sro, vložka č. 74765/L</p>
              <p className="pt-1">© {new Date().getFullYear()} Marvol s.r.o. Všetky práva vyhradené.</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Rýchla navigácia</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#target-groups" className="hover:text-amber-400 transition-colors">Pre domácnosti</a></li>
              <li><a href="#target-groups" className="hover:text-amber-400 transition-colors">Pre firmy</a></li>
              <li><a href="#target-groups" className="hover:text-amber-400 transition-colors">Pre samosprávy</a></li>
              <li><a href="#fotovoltika" className="hover:text-amber-400 transition-colors">Fotovoltika na kľúč</a></li>
              <li><a href="#kalkulacka" className="hover:text-amber-400 transition-colors">Kalkulačka úspory</a></li>
              <li><a href="#referencie" className="hover:text-amber-400 transition-colors">Referencie realizácií</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Naše služby</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#sluzby" className="hover:text-amber-400 transition-colors">Fotovoltické systémy</a></li>
              <li><a href="#sluzby" className="hover:text-amber-400 transition-colors">Batériové úložiská BESS</a></li>
              <li><a href="#sluzby" className="hover:text-amber-400 transition-colors">Wallbox pre EV</a></li>
              <li><a href="#sluzby" className="hover:text-amber-400 transition-colors">Tepelné čerpadlá</a></li>
              <li><a href="#sluzby" className="hover:text-amber-400 transition-colors">Elektroinštalácie & Revízie</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Kontakt & Právne informácie</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-white font-bold">+421 948 123 456</li>
              <li><a href="mailto:info@marvol.sk" className="hover:text-amber-400 transition-colors">info@marvol.sk</a></li>
              <li className="pt-2">
                <Link href="/ochrana-osobnych-udajov" className="text-amber-400 hover:underline">
                  🔒 Ochrana osobných údajov (GDPR)
                </Link>
              </li>
              <li className="pt-1 text-[11px] text-emerald-400 font-semibold">
                ✓ Zelená domácnostiam
              </li>
              <li className="text-[11px] text-emerald-400 font-semibold">
                ✓ Zelená podnikom
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};
