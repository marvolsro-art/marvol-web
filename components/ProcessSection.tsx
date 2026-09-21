import React from 'react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Žiadosť o cenovú kalkuláciu',
      description: 'Vyplníte náš krátky formulár alebo si spočítate úsporu v kalkulačke. Náš tím vás bezodkladne kontaktuje.',
      timeframe: 'Hneď teraz'
    },
    {
      number: '02',
      title: 'Obhliadka a konzultácia',
      description: 'Náš technik navštívi vašu nehnuteľnosť, posúdi stav strechy, elektrických rozvodov a navrhne optimálne umiestnenie.',
      timeframe: 'Do 48 hodín'
    },
    {
      number: '03',
      title: 'Projekt & Návratnosť',
      description: 'Pripravíme presnú kalkuláciu s garantovaným výkonom a podrobným výpočtom návratnosti investície.',
      timeframe: 'Bez poplatku'
    },
    {
      number: '04',
      title: 'Vybavenie dotácie & Montáž',
      description: 'Zabezpečíme schválenie štátnej dotácie. Certifikovaní montéri osadia panely, striedač a batériové úložisko.',
      timeframe: 'Do 14 dní'
    },
    {
      number: '05',
      title: 'Revízia, Distribúcia & Zaškolenie',
      description: 'Vyhotovíme revíznu správu, odovzdáme podklady distribučnej spoločnosti a naučíme vás ovládať mobilnú aplikáciu.',
      timeframe: 'Hotovo'
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Jednoduchý a prehľadný postup
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ako prebieha realizácia fotovoltiky?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            S Marvol s.r.o. nemáte žiadne starosti. Celý proces od návrhu po dotácie vyriešime za vás.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl flex flex-col justify-between space-y-6 relative group transition-all hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-slate-800 group-hover:text-amber-400/30 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {step.timeframe}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="w-full h-1 bg-slate-800 group-hover:bg-amber-400 transition-colors rounded-full"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
