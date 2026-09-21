import React, { useState } from 'react';

interface ReferenceProject {
  location: string;
  region: string;
  type: string;
  specs: string;
  description: string;
  badge: string;
}

export const ReferencesSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: ReferenceProject[] = [
    {
      location: 'Žilina - Višňové',
      region: 'Žilina',
      type: 'domacnost',
      specs: '6,4 kWp + 10 kW Menič + 10 kWh Batéria',
      description: 'Inštalácia 6,4 kWp fotovoltického systému s batériou a 10 kW asymetrickým meničom. Menič zvládne dodať na jednu fázu až 3,3 kW pre maximálnu úsporu bez odberu zo siete.',
      badge: 'Rodinný dom'
    },
    {
      location: 'Martin - EUROTOOLS s.r.o.',
      region: 'Martin',
      type: 'firma',
      specs: '50 kWp Fotovoltika + Elektroinštalácia',
      description: 'Pre priemyselný objekt spoločnosti EUROTOOLS s.r.o. v Martine sme zrealizovali kompletnú elektroinštaláciu, výrobu rozvádzačov a solárnu elektráreň.',
      badge: 'Priemyselný objekt'
    },
    {
      location: 'Tuchyňa - Ilava',
      region: 'Ilava',
      type: 'domacnost',
      specs: '10 kWp + 22 Panelov (Juh)',
      description: 'Pre rodinný dom v obci Tuchyňa pri Ilave sme zrealizovali fotovoltickú elektráreň s výkonom 10 kW s orientáciou na juh a prípravou na batériové úložisko.',
      badge: 'Rodinný dom'
    },
    {
      location: 'Ľubochňa - Unilabs s.r.o.',
      region: 'Ružomberok',
      type: 'firma',
      specs: 'Batériové úložisko BESS 2x60 kWh',
      description: 'Inštalácia masívneho batériového úložiska BESS, ktoré nahradilo hlučný dieselový agregát ako záložný zdroj. Ekologické a tiché riešenie s nízkymi prevádzkovými nákladmi.',
      badge: 'Priemyselná batéria BESS'
    },
    {
      location: 'Košice',
      region: 'Košice',
      type: 'domacnost',
      specs: '10 kWp + Wallbox + Batériové úložisko 10 kWh',
      description: 'Fotovoltika s orientáciou JV/JZ s integrovaným inteligentným wallboxom pre nabíjanie elektromobilu priamo z nadbytočnej slnečnej energie.',
      badge: 'Rodinný dom + EV'
    },
    {
      location: 'Obec Malinová',
      region: 'Prievidza',
      type: 'samosprava',
      specs: 'Fotovoltika 30 kWp pre obecnú budovu',
      description: 'Kompletná realizácia solárnej elektrárne pre obecnú budovu vrátane projektovej dokumentácie, elektroinštalácie, rozvádzača a zapojenia do siete.',
      badge: 'Samospráva'
    }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.type === filter);

  return (
    <section id="referencie" className="py-24 bg-slate-900 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Realizácie po celom Slovensku
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ukážky našich projektov
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Prezrite si výber z viac ako 350 úspešných inštalácií pre rodinné domy, firmy a obce.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter === 'all'
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Všetky realizácie
            </button>
            <button
              onClick={() => setFilter('domacnost')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter === 'domacnost'
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              🏡 Rodinné domy
            </button>
            <button
              onClick={() => setFilter('firma')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter === 'firma'
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              🏢 Firmy & Priemysel
            </button>
            <button
              onClick={() => setFilter('samosprava')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                filter === 'samosprava'
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              🏛️ Samosprávy
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-slate-800 text-amber-400 text-[11px] font-extrabold px-3 py-1 rounded-full border border-slate-700">
                    {project.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{project.region}</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {project.location}
                </h3>

                <p className="text-xs font-extrabold text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  ⚡ {project.specs}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Realizované s garanciou</span>
                <span className="text-emerald-400 font-bold">100% Funkčné</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
