import React from 'react';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      icon: '💰',
      title: 'Pomôžeme vám s financovaním',
      description: 'Nájdeme optimálne riešenie financovania pre váš projekt. Zabezpečíme výhodný zelený úver s nízkym úrokom alebo rozdelenie na pravidelné splátky.'
    },
    {
      icon: '📝',
      title: 'Vybavíme za vás dotácie',
      description: 'Zabezpečíme, aby proces získania dotácie z programov Zelená domácnostiam a Zelená podnikom prebehol bez komplikácií a v čo najkratšom čase.'
    },
    {
      icon: '🛠️',
      title: 'Komplexné riešenie na kľúč',
      description: 'Navrhneme riešenie s maximálnou efektívnosťou pre váš rodinný dom či firmu. Postaráme sa o kompletnú projektovú dokumentáciu a odbornú montáž.'
    },
    {
      icon: '🤝',
      title: 'Profesionálna komunikácia',
      description: 'Od prvej kalkulácie až po odovzdanie diela komunikujeme rýchlo, transparentne a profesionálne. Dodáme vám dobrú energiu bez skrytých poplatkov.'
    },
    {
      icon: '⚡',
      title: 'Prémiové komponenty Tier 1',
      description: 'Používame vysokoúčinné solárne panely (JA Solar, Canadian Solar) a inteligentné asymetrické striedače Deye / Huawei s dlhoročnou zárukou.'
    },
    {
      icon: '🛡️',
      title: 'Neustály monitoring & Záruka',
      description: 'Váš fotovoltický systém spravujeme aj po inštalácii. Poskytujeme plný záručný aj pozáručný servis a vzdialenú diagnostiku 24/7.'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Dôvody pre spoluprácu
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Prečo si vybrať práve Marvol s.r.o.?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sme spoľahlivým partnerom pre vaše energetické riešenia na celom Slovensku.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-amber-400/50 p-8 rounded-2xl space-y-4 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
