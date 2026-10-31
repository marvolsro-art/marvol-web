import React from 'react';
import {
  CurrencyEuroIcon,
  FileTextIcon,
  WrenchIcon,
  HandshakeIcon,
  BoltIcon,
  ShieldIcon,
} from '@/components/icons';

interface WhyUsItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag: string;
}

export const WhyUsSection: React.FC = () => {
  const features: WhyUsItem[] = [
    {
      icon: CurrencyEuroIcon,
      title: 'Pomôžeme vám s financovaním',
      description: 'Nájdeme optimálne riešenie financovania pre váš projekt. Zabezpečíme výhodný zelený úver s nízkym úrokom alebo rozdelenie na pravidelné splátky.',
      tag: 'Splátky a zelené úvery',
    },
    {
      icon: FileTextIcon,
      title: 'Vybavíme za vás dotácie',
      description: 'Zabezpečíme, aby proces získania dotácie z programov Zelená domácnostiam a Zelená podnikom prebehol bez komplikácií a v čo najkratšom čase.',
      tag: 'Dotácia až 4 025 € (SIEA)',
    },
    {
      icon: WrenchIcon,
      title: 'Komplexné riešenie na kľúč',
      description: 'Navrhneme riešenie s maximálnou efektívnosťou pre váš rodinný dom či firmu. Postaráme sa o kompletnú projektovú dokumentáciu a odbornú montáž.',
      tag: 'Od návrhu po revíziu',
    },
    {
      icon: HandshakeIcon,
      title: 'Profesionálna komunikácia',
      description: 'Od prvej kalkulácie až po odovzdanie diela komunikujeme rýchlo, transparentne a profesionálne. Dodáme vám dobrú energiu bez skrytých poplatkov.',
      tag: 'Osobný prístup a férovosť',
    },
    {
      icon: BoltIcon,
      title: 'Prémiové komponenty Tier 1',
      description: 'Používame vysokoúčinné solárne panely (JA Solar, Canadian Solar) a inteligentné asymetrické striedače Deye a Huawei s dlhoročnou zárukou.',
      tag: 'Záruka až 25 rokov',
    },
    {
      icon: ShieldIcon,
      title: 'Neustály monitoring & Záruka',
      description: 'Váš fotovoltický systém spravujeme aj po inštalácii. Poskytujeme plný záručný aj pozáručný servis a vzdialenú diagnostiku 24/7.',
      tag: 'Vzdialený dohľad 24/7',
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
            Dôvody pre spoluprácu
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Prečo si vybrať práve Marvol s.r.o.?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Sme spoľahlivým partnerom pre vaše energetické riešenia na celom Slovensku.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const FeatureIcon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 p-8 rounded-2xl space-y-4 hover:bg-slate-900 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <FeatureIcon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4">
                  <span className="text-xs font-semibold text-amber-400">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
