import React, { useState } from 'react';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BuildingColumnsIcon,
  BoltIcon,
  CheckIcon,
} from '@/components/icons';

interface ReferenceProject {
  location: string;
  region: string;
  type: 'domacnost' | 'firma' | 'samosprava';
  specs: string;
  description: string;
  badge: string;
  image: string;
}

export const ReferencesSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: ReferenceProject[] = [
    {
      location: 'Žilina - Višňové',
      region: 'Žilinský kraj',
      type: 'domacnost',
      specs: '6,4 kWp + 10 kW Menič + 10 kWh Batéria',
      description: 'Inštalácia 6,4 kWp fotovoltického systému s batériou a 10 kW asymetrickým meničom. Menič zvládne dodať na jednu fázu až 3,3 kW pre maximálnu úsporu bez odberu zo siete.',
      badge: 'Rodinný dom',
      image: '/images/fotovoltika-domacnosti/hero.jpg',
    },
    {
      location: 'Martin - EUROTOOLS s.r.o.',
      region: 'Martinský okres',
      type: 'firma',
      specs: '50 kWp Fotovoltika + Elektroinštalácia',
      description: 'Pre priemyselný objekt spoločnosti EUROTOOLS s.r.o. v Martine sme zrealizovali kompletnú elektroinštaláciu, výrobu rozvádzačov a solárnu elektráreň.',
      badge: 'Priemyselná hala',
      image: '/images/fotovoltika-firmy/hero.jpg',
    },
    {
      location: 'Senec - Rodinný dom',
      region: 'Bratislavský kraj',
      type: 'domacnost',
      specs: '10 kWp + 22 Panelov (Juh)',
      description: 'Pre rodinný dom sme zrealizovali fotovoltickú elektráreň s výkonom 10 kW s orientáciou na juh a prípravou na batériové úložisko v technickej miestnosti.',
      badge: 'Hybridný systém',
      image: '/images/fotovoltika-domacnosti/hybrid-system.jpg',
    },
    {
      location: 'Ľubochňa - Unilabs s.r.o.',
      region: 'Ružomberok',
      type: 'firma',
      specs: 'Batériové úložisko BESS 2×60 kWh',
      description: 'Inštalácia masívneho batériového úložiska BESS, ktoré nahradilo hlučný dieselový agregát ako záložný zdroj. Ekologické a tiché riešenie s nízkymi prevádzkovými nákladmi.',
      badge: 'Priemyselná batéria BESS',
      image: '/images/bateriove-uloziska/hero.jpg',
    },
    {
      location: 'Košice - Rodinný dom + EV',
      region: 'Košický kraj',
      type: 'domacnost',
      specs: '10 kWp + Wallbox + Batéria 10 kWh',
      description: 'Fotovoltika s orientáciou JV/JZ s integrovaným inteligentným wallboxom pre nabíjanie elektromobilu priamo z nadbytočnej slnečnej energie.',
      badge: 'Dom + EV Wallbox',
      image: '/images/tepelne-cerpadla/hero.jpg',
    },
    {
      location: 'Obec Malinová',
      region: 'Prievidza',
      type: 'samosprava',
      specs: 'Fotovoltika 30 kWp pre obecnú budovu',
      description: 'Kompletná realizácia solárnej elektrárne pre obecnú budovu vrátane projektovej dokumentácie, elektroinštalácie, rozvádzača a zapojenia do siete.',
      badge: 'Samospráva',
      image: '/images/fotovoltika-firmy/industrial-inverter.jpg',
    },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="referencie" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
            Realizácie po celom Slovensku
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Ukážky našich projektov
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Prezrite si výber z viac ako 350 úspešných inštalácií pre rodinné domy, firmy a obce.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[48px] flex items-center justify-center cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:text-white'
              }`}
            >
              Všetky realizácie
            </button>
            <button
              onClick={() => setFilter('domacnost')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[48px] flex items-center gap-2 justify-center cursor-pointer ${
                filter === 'domacnost'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:text-white'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Rodinné domy</span>
            </button>
            <button
              onClick={() => setFilter('firma')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[48px] flex items-center gap-2 justify-center cursor-pointer ${
                filter === 'firma'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:text-white'
              }`}
            >
              <BuildingOfficeIcon className="w-4 h-4" />
              <span>Firmy & Priemysel</span>
            </button>
            <button
              onClick={() => setFilter('samosprava')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[48px] flex items-center gap-2 justify-center cursor-pointer ${
                filter === 'samosprava'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-300 hover:text-white'
              }`}
            >
              <BuildingColumnsIcon className="w-4 h-4" />
              <span>Samosprávy</span>
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:bg-slate-950 transition-colors group"
            >
              <div className="space-y-3">
                {/* Authentic 16:9 Photography */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.location}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/85 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {project.badge}
                  </div>
                  <div className="absolute top-2.5 right-2.5 text-xs text-slate-300 bg-slate-950/85 px-2.5 py-1 rounded-md">
                    {project.region}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.location}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 p-2.5 rounded-xl">
                  <BoltIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{project.specs}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Garancia funkčnosti</span>
                </span>
                <a
                  href="#kalkulacka"
                  className="font-semibold text-amber-400 hover:text-amber-300 transition-colors min-h-[44px] flex items-center"
                >
                  Mám záujem →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
