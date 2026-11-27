import React, { useState } from 'react';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BuildingColumnsIcon,
  BoltIcon,
} from '@/components/icons';

interface ReferenceProject {
  location: string;
  region: string;
  type: 'domacnost' | 'firma' | 'samosprava';
  specs: string;
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
      badge: 'Rodinný dom',
      image: '/images/fotovoltika-domacnosti/hero.jpg',
    },
    {
      location: 'Martin - EUROTOOLS s.r.o.',
      region: 'Martinský okres',
      type: 'firma',
      specs: '50 kWp + 50 kW Menič',
      badge: 'Priemyselná hala',
      image: '/images/fotovoltika-firmy/hero.jpg',
    },
    {
      location: 'Senec - Rodinný dom',
      region: 'Bratislavský kraj',
      type: 'domacnost',
      specs: '10 kWp + 10 kW Menič',
      badge: 'Hybridný systém',
      image: '/images/fotovoltika-domacnosti/hybrid-system.jpg',
    },
    {
      location: 'Ľubochňa - Unilabs s.r.o.',
      region: 'Ružomberok',
      type: 'firma',
      specs: '60 kW Menič + 120 kWh BESS Batéria',
      badge: 'Priemyselná batéria BESS',
      image: '/images/bateriove-uloziska/hero.jpg',
    },
    {
      location: 'Košice - Rodinný dom + EV',
      region: 'Košický kraj',
      type: 'domacnost',
      specs: '10 kWp + 10 kW Menič + 10 kWh Batéria',
      badge: 'Dom + EV Wallbox',
      image: '/images/fotovoltika-domacnosti/hybrid-system.jpg',
    },
    {
      location: 'Obec Malinová',
      region: 'Prievidza',
      type: 'samosprava',
      specs: '30 kWp + 30 kW Menič',
      badge: 'Samospráva',
      image: '/images/fotovoltika-firmy/industrial-inverter.jpg',
    },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="referencie" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10">
            Realizácie po celom Slovensku
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ukážky našich projektov
          </h2>

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
              className="bg-slate-950/80 rounded-2xl p-5 flex flex-col space-y-4 hover:bg-slate-950 transition-colors group"
            >
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

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.location}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 p-2.5 rounded-xl">
                  <BoltIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{project.specs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
