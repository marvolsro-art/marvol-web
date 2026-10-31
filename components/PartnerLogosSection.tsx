import React from 'react';

export interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
}

export const PARTNERS_ROW_1: PartnerLogo[] = [
  { id: 'solinteg', name: 'Solinteg', logo: '/logos/partners/solinteg.svg' },
  { id: 'goodwe', name: 'GoodWe', logo: '/logos/partners/goodwe.svg' },
  { id: 'pylontech', name: 'Pylontech', logo: '/logos/partners/pylontech.svg' },
  { id: 'sungrow', name: 'Sungrow', logo: '/logos/partners/sungrow.svg' },
  { id: 'aiko', name: 'AIKO Solar', logo: '/logos/partners/aiko.svg' },
  { id: 'ja-solar', name: 'JA Solar', logo: '/logos/partners/ja-solar.svg' },
  { id: 'jinko', name: 'Jinko Solar', logo: '/logos/partners/jinko.png' },
  { id: 'longi', name: 'LONGi Solar', logo: '/logos/partners/longi.png' },
];

export const PARTNERS_ROW_2: PartnerLogo[] = [
  { id: 'trina', name: 'Trina Solar', logo: '/logos/partners/trina-solar.svg' },
  { id: 'alumero', name: 'Alumero', logo: '/logos/partners/alumero.svg' },
  { id: 'krajiczech', name: 'Krajiczech', logo: '/logos/partners/krajiczech.png' },
  { id: 'schrack', name: 'Schrack Technik', logo: '/logos/partners/schrack.svg' },
  { id: 'baywa', name: 'BayWa r.e.', logo: '/logos/partners/baywa.svg' },
  { id: 'krannich', name: 'Krannich Solar', logo: '/logos/partners/krannich.svg' },
  { id: 'memodo', name: 'Memodo', logo: '/logos/partners/memodo.svg' },
  { id: 'hagard-hal', name: 'Hagard:Hal', logo: '/logos/partners/hagard-hal.png' },
];

export const PartnerLogosSection: React.FC = () => {
  return (
    <section id="partneri" className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
            Overení technologickí partneri &amp; dodávatelia
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            Spolupracujeme s lídrami v oblasti solárnej energie
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pre rodinné domy aj firemné fotovoltické inštalácie dodávame overené komponenty od svetových výrobcov s predĺženou zárukou až 25 rokov.
          </p>
        </div>

        {/* Dual Marquee Slider: Pure Logos */}
        <div className="space-y-4 sm:space-y-5">
          {/* Track 1: Gliding Left */}
          <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-4 sm:gap-6 items-center">
              {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((partner, idx) => (
                <div
                  key={`${partner.id}-row1-${idx}`}
                  className="w-40 sm:w-48 h-18 sm:h-20 bg-white rounded-2xl px-5 py-3.5 flex items-center justify-center shrink-0 shadow-sm hover:shadow-md transition-transform hover:scale-105 border border-slate-200/80"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 sm:max-h-12 max-w-[130px] sm:max-w-[145px] w-auto h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Gliding Right */}
          <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee-reverse gap-4 sm:gap-6 items-center">
              {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((partner, idx) => (
                <div
                  key={`${partner.id}-row2-${idx}`}
                  className="w-40 sm:w-48 h-18 sm:h-20 bg-white rounded-2xl px-5 py-3.5 flex items-center justify-center shrink-0 shadow-sm hover:shadow-md transition-transform hover:scale-105 border border-slate-200/80"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 sm:max-h-12 max-w-[130px] sm:max-w-[145px] w-auto h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
