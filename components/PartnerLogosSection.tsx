import React, { useState } from 'react';
import Link from 'next/link';

export interface Partner {
  id: string;
  name: string;
  category: 'inverters-batteries' | 'panels' | 'mounting-electrical' | 'distributors';
  categoryLabel: string;
  logo: string;
  badge: string;
  description: string;
  highlight: string;
  warranty: string;
}

export const PARTNERS: Partner[] = [
  // Meniče & Batérie
  {
    id: 'solinteg',
    name: 'Solinteg',
    category: 'inverters-batteries',
    categoryLabel: 'Meniče & Batérie',
    logo: '/logos/partners/solinteg.svg',
    badge: 'Hybridné meniče',
    description: 'Inteligentné trojfázové hybridné striedače s pokročilým asymetrickým manažmentom energie.',
    highlight: 'Plná asymetria a bleskový UPS záložný režim (< 10 ms)',
    warranty: 'Záruka až 10 rokov',
  },
  {
    id: 'goodwe',
    name: 'GoodWe',
    category: 'inverters-batteries',
    categoryLabel: 'Meniče & Batérie',
    logo: '/logos/partners/goodwe.svg',
    badge: 'Striedače & Hybridy',
    description: 'Globálny technologický líder v rezidenčných aj komerčných meničoch s mimoriadnou účinnosťou.',
    highlight: 'Špičková účinnosť 98,4 % & tichá prevádzka bez ventilátorov',
    warranty: '10 rokov záruka výrobcu',
  },
  {
    id: 'pylontech',
    name: 'Pylontech',
    category: 'inverters-batteries',
    categoryLabel: 'Meniče & Batérie',
    logo: '/logos/partners/pylontech.svg',
    badge: 'LFP batériové systémy',
    description: 'Svetový priekopník v modulárnych batériových úložiskách na báze bezpečnej chémie LiFePO4.',
    highlight: 'Bezpečná LFP chémia s životnosťou cez 6 000 cyklov (95 % DoD)',
    warranty: '10 rokov garancia kapacity',
  },
  {
    id: 'sungrow',
    name: 'Sungrow',
    category: 'inverters-batteries',
    categoryLabel: 'Meniče & Batérie',
    logo: '/logos/partners/sungrow.svg',
    badge: 'Meniče & BESS úložiská',
    description: 'Jeden z najväčších svetových výrobcov solárnych meničov s viac ako 25-ročnou tradíciou vývoja.',
    highlight: 'Integrovaná ochrana AFCI proti oblúku & vysokonapäťové batérie',
    warranty: '10 rokov záruka',
  },

  // Solárne panely
  {
    id: 'aiko',
    name: 'AIKO Solar',
    category: 'panels',
    categoryLabel: 'Solárne panely',
    logo: '/logos/partners/aiko.svg',
    badge: 'Ultra-účinné ABC panely',
    description: 'Prelomová technológia All-Back-Contact (ABC) s rekordnou účinnosťou modulov cez 24 %.',
    highlight: 'Celoplošný čierny dizajn bez predných zberníc & maximálny výnos',
    warranty: '30 rokov lineárna garancia výkonu',
  },
  {
    id: 'ja-solar',
    name: 'JA Solar',
    category: 'panels',
    categoryLabel: 'Solárne panely',
    logo: '/logos/partners/ja-solar.svg',
    badge: 'Tier 1 solárne panely',
    description: 'Globálny Tier 1 výrobca fotovoltických panelov overený rokmi bezporuchovej prevádzky.',
    highlight: 'DeepBlue 4.0 Pro články s nízkou mierou degradácie',
    warranty: '25 rokov záruka na výkon',
  },
  {
    id: 'jinko',
    name: 'Jinko Solar',
    category: 'panels',
    categoryLabel: 'Solárne panely',
    logo: '/logos/partners/jinko.png',
    badge: 'Tiger Neo N-Type',
    description: 'Najpredávanejšia značka fotovoltických modulov na svete s patentovanou technológiou TOPCon.',
    highlight: 'TOPCon články s výbornou citlivosťou na ranné a difúzne svetlo',
    warranty: '30 rokov výkonová záruka',
  },
  {
    id: 'longi',
    name: 'LONGi Solar',
    category: 'panels',
    categoryLabel: 'Solárne panely',
    logo: '/logos/partners/longi.png',
    badge: 'Hi-MO fotovoltika',
    description: 'Svetový líder vo výrobe monokryštalického kremíka a vysokoúčinných fotovoltických modulov.',
    highlight: 'HPBC technológia odolná voči vysokým teplotám a mikroprasklinám',
    warranty: '25-30 rokov záruka',
  },
  {
    id: 'trina',
    name: 'Trina Solar',
    category: 'panels',
    categoryLabel: 'Solárne panely',
    logo: '/logos/partners/trina-solar.svg',
    badge: 'Vertex N-Type TOPCon',
    description: 'Priekopník veľkoformátových 210mm kremíkových doštičiek s extrémnym energetickým výnosom.',
    highlight: 'Zosilnený rám a vysoká odolnosť voči zaťaženiu snehom (6 000 Pa)',
    warranty: '25-30 rokov záruka',
  },

  // Konštrukcie & Elektroinštalácia
  {
    id: 'alumero',
    name: 'Alumero',
    category: 'mounting-electrical',
    categoryLabel: 'Konštrukcie & Elektro',
    logo: '/logos/partners/alumero.svg',
    badge: 'Hliníkové nosné systémy',
    description: 'Rakúsky certifikovaný výrobca prémiových hliníkových a nerezových konštrukcií pre strechy.',
    highlight: 'Statické posúdenie podľa Eurokódov a garancia tesnosti strešného plášťa',
    warranty: '15 rokov záruka na konštrukciu',
  },
  {
    id: 'krajiczech',
    name: 'Krajiczech',
    category: 'mounting-electrical',
    categoryLabel: 'Konštrukcie & Elektro',
    logo: '/logos/partners/krajiczech.png',
    badge: 'Montážne systémy',
    description: 'Renomovaný stredoeurópsky špecialista na montážne úchyty, háky a nosníky fotovoltiky.',
    highlight: 'Masívna nerezová oceľ A2 a certifikované profily pre všetky typy krytín',
    warranty: '15 rokov záruka materiálu',
  },
  {
    id: 'schrack',
    name: 'Schrack Technik',
    category: 'mounting-electrical',
    categoryLabel: 'Konštrukcie & Elektro',
    logo: '/logos/partners/schrack.svg',
    badge: 'Istenie & Prepäťová ochrana',
    description: 'Rakúsky etalón bezpečnosti v elektroinštaláciách: DC/AC rozvádzače, SPD zvodiče a ističe.',
    highlight: 'Nehorľavé komponenty s prísnou certifikáciou podľa STN EN noriem',
    warranty: 'Priemyselná bezpečnosť',
  },

  // Distribútori & Veľkoobchod
  {
    id: 'baywa',
    name: 'BayWa r.e.',
    category: 'distributors',
    categoryLabel: 'Distribútori',
    logo: '/logos/partners/baywa.svg',
    badge: 'Globálna distribúcia',
    description: 'Jeden z najvýznamnejších svetových distribútorov obnoviteľných zdrojov energie.',
    highlight: 'Priamy dodávateľský kanál, prísna vstupná kontrola kvality materiálu',
    warranty: 'Oficiálny partner',
  },
  {
    id: 'krannich',
    name: 'Krannich Solar',
    category: 'distributors',
    categoryLabel: 'Distribútori',
    logo: '/logos/partners/krannich.svg',
    badge: 'Solárny veľkoobchod',
    description: 'Medzinárodný veľkoobchodný dodávateľ solárnych komponentov s pôsobnosťou od roku 1995.',
    highlight: 'Garantovaná dostupnosť komponentov a priama technická podpora výrobcu',
    warranty: 'Autorizovaný partner',
  },
  {
    id: 'memodo',
    name: 'Memodo',
    category: 'distributors',
    categoryLabel: 'Distribútori',
    logo: '/logos/partners/memodo.svg',
    badge: 'BESS & Clean Energy',
    description: 'Popredný európsky expert na veľkokapacitné batériové systémy a energetické inovácie.',
    highlight: 'Špecializácia na batériové úložiská pre rezidenčné aj firemné projekty',
    warranty: 'Oficiálny distribútor',
  },
  {
    id: 'hagard-hal',
    name: 'Hagard:Hal',
    category: 'distributors',
    categoryLabel: 'Distribútori',
    logo: '/logos/partners/hagard-hal.png',
    badge: 'Slovenský veľkoobchod',
    description: 'Najväčšia slovenská sieť elektrotechnických veľkoobchodov s 30+ regionálnymi pobočkami.',
    highlight: 'Okamžitá logistika káblov, rozvádzačov a spojovacieho materiálu po celom SR',
    warranty: 'Slovenská sieť pobočiek',
  },
];

type CategoryFilter = 'all' | 'inverters-batteries' | 'panels' | 'mounting-electrical' | 'distributors';

export const PartnerLogosSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredPartners = activeFilter === 'all'
    ? PARTNERS
    : PARTNERS.filter((p) => p.category === activeFilter);

  return (
    <section id="partneri" className="py-16 sm:py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with compliant badge spacing */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
            Overení technologickí partneri &amp; dodávatelia
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            Spolupracujeme s poprednými svetovými výrobcami
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pre rodinné domy, priemyselné haly aj komerčné objekty montujeme výhradne certifikované komponenty od preverených svetových lídrov s predĺženou zárukou až 25 rokov.
          </p>
        </div>

        {/* Continuous Horizontal Ticker / Marquee */}
        <div className="relative w-full overflow-hidden mb-12 sm:mb-14 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4 sm:gap-6 items-center">
            {/* Duplicated list for infinite seamless loop */}
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div
                key={`${partner.id}-marquee-${idx}`}
                className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 rounded-2xl px-4 py-2.5 shrink-0 transition-colors group shadow-sm"
              >
                <div className="h-9 w-24 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-6 max-w-[85px] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="text-left pr-1">
                  <span className="block text-xs font-bold text-white tracking-tight">
                    {partner.name}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    {partner.categoryLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] tap-target-48 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Všetci partneri ({PARTNERS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('inverters-batteries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] tap-target-48 cursor-pointer ${
              activeFilter === 'inverters-batteries'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Meniče &amp; Batérie (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('panels')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] tap-target-48 cursor-pointer ${
              activeFilter === 'panels'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Solárne panely (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('mounting-electrical')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] tap-target-48 cursor-pointer ${
              activeFilter === 'mounting-electrical'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Konštrukcie &amp; Elektro (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('distributors')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[44px] tap-target-48 cursor-pointer ${
              activeFilter === 'distributors'
                ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            Veľkoobchodní distribútori (4)
          </button>
        </div>

        {/* Partners Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group"
            >
              <div>
                {/* Logo pill */}
                <div className="h-16 w-full bg-white rounded-xl p-3 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 max-w-[150px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Header line */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-black text-white tracking-tight">
                    {partner.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                    {partner.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {partner.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] text-slate-300 flex items-start gap-1.5 font-medium">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{partner.highlight}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-1">
                  <span className="text-slate-500">Záruka:</span>
                  <span className="text-amber-400 font-bold">{partner.warranty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="mt-12 sm:mt-16 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 font-black text-lg">
                ★
              </div>
              <div>
                <strong className="block text-white text-sm font-bold mb-1">
                  100% Pôvod &amp; Oficiálna záruka
                </strong>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Všetok tovar odoberáme výhradne z oficiálnej slovenskej a európskej distribúcie s plnou podporou a certifikáciou výrobcov.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 font-black text-lg">
                ✓
              </div>
              <div>
                <strong className="block text-white text-sm font-bold mb-1">
                  Schválené pre SSD, ZSD aj VSD
                </strong>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Invertory a bezpečnostné prvky spĺňajú najprísnejšie technické podmienky pripojenia do slovenskej distribučnej sústavy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 font-black text-lg">
                ⚡
              </div>
              <div>
                <strong className="block text-white text-sm font-bold mb-1">
                  Skladová dostupnosť &amp; Servis
                </strong>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vďaka partnerstvám s distribútormi garantujeme rýchle dodacie lehoty a garantovaný záručný aj pozáručný servis.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
