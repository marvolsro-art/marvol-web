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
  const pillars = [
    {
      metric: '25 rokov',
      title: 'Lineárna garancia výkonu a Tier-1 komponenty',
      description: 'Inštalujeme výhradne špičkové N-Type TOPCon solárne panely a overené hybridné striedače (Solinteg, GoodWe, Sungrow) s garantovanou degradáciou pod 0,4 % ročne.',
      tag: 'Tier-1 komponenty s predĺženou zárukou',
    },
    {
      metric: '100 %',
      title: 'Úspešnosť vybavenia štátnych dotácií SIEA',
      description: 'Ako oficiálny registrovaný zhotoviteľ garantujeme správnosť žiadosti v programoch Zelená domácnostiam a Zelená podnikom. Kompletná administrácia je pre vás zadarmo.',
      tag: 'Dotácia do 1 150 € / 4 600 €',
    },
    {
      metric: '§ 24',
      title: 'Vlastní certifikovaní montážnici a revízni technici',
      description: 'Nepoužívame anonymné subdodávateľské firmy. Naši technici majú osvedčenia MH SR a revízne oprávnenia podľa vyhlášky 508/2009 Z.z. pre bezpečné odovzdanie do siete.',
      tag: 'Oficiálna revízna správa OPOS v cene',
    },
    {
      metric: '24/7',
      title: 'Diaľkový cloudový dohľad a promptný servis',
      description: 'Každú elektráreň pripájame na centrálny monitoring. V prípade akejkoľvek anomálie v sieti alebo na striedači dostáva náš dispečing okamžité hlásenie pre rýchly servis.',
      tag: 'Garancia servisného zásahu do 48 hodín',
    },
  ];

  return (
    <section id="preco-my" className="py-20 sm:py-24 bg-slate-950 text-white relative scroll-mt-36 sm:scroll-mt-40 md:scroll-mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header (Editorial anchor, zero pill badge) */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Marvol · robíme svet zelenším
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Technické garancie a dôvody pre spoluprácu
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Každú inštaláciu staviame na overiteľných technických faktoch, vlastných certifikovaných montážnikoch a priamej legislatívnej zodpovednosti bez skrytých poplatkov.
          </p>
        </div>

        {/* 4-Pillar Engineering Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-900 p-8 rounded-3xl flex flex-col justify-between space-y-6 transition-colors hover:bg-slate-900/90"
            >
              <div className="space-y-4">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">
                  {pillar.metric}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-xs font-semibold text-emerald-400">
                  {pillar.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statutory Trust Strip */}
        <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Hľadáte energetické riešenie s reálnou návratnosťou?
            </h4>
            <p className="text-slate-400 text-sm">
              Pripravíme pre vás nezáväzný 3D model oslnenia a presný rozpočet bez akýchkoľvek záväzkov.
            </p>
          </div>
          <a
            href="#kontakt"
            className="shrink-0 px-8 py-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-sm min-h-[48px] tap-target-48"
          >
            Požiadať o nezáväzný návrh
          </a>
        </div>

      </div>
    </section>
  );
};
