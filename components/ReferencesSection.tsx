import React, { useState } from 'react';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BuildingColumnsIcon,
} from '@/components/icons';

interface ReferenceProject {
  type: 'domacnost' | 'firma' | 'samosprava';
  category: string;
  image: string;
}

export const ReferencesSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: ReferenceProject[] = [
    {
      type: 'domacnost',
      category: 'Rodinný dom',
      image: '/images/fotovoltika-domacnosti/hero.jpg',
    },
    {
      type: 'firma',
      category: 'Priemysel',
      image: '/images/fotovoltika-firmy/hero.jpg',
    },
    {
      type: 'domacnost',
      category: 'Rodinný dom',
      image: '/images/fotovoltika-domacnosti/hybrid-system.jpg',
    },
    {
      type: 'firma',
      category: 'Priemysel',
      image: '/images/bateriove-uloziska/hero.jpg',
    },
    {
      type: 'domacnost',
      category: 'Rodinný dom',
      image: '/images/fotovoltika-domacnosti/hybrid-system.jpg',
    },
    {
      type: 'samosprava',
      category: 'Samospráva',
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
              className="bg-slate-950/80 border border-slate-800/60 rounded-2xl p-4 flex flex-col space-y-3 hover:border-slate-700 transition-colors group"
            >
              {/* Authentic 16:9 Photography */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.category}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
