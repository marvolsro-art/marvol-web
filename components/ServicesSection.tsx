import React, { useState } from 'react';

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
  badge?: string;
}

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fotovoltika');

  const services: ServiceItem[] = [
    {
      id: 'fotovoltika',
      icon: '☀️',
      title: 'Fotovoltické systémy na kľúč',
      subtitle: 'Kompletná výroba vlastnej čistej elektriny zo slnka',
      description: 'Zabezpečujeme kompletný proces od bezplatnej obhliadky a výpočtu návratnosti, cez projektovú dokumentáciu, inžiniering až po samotnú montáž a oživenie systému.',
      features: [
        'Hybridné systémy s batériovým úložiskom',
        'On-Grid systémy pripojené do distribučnej siete',
        'Off-Grid (ostrovné) systémy bez prístupu k sieti',
        'Prémiové monokryštalické panely (JA Solar, Canadian Solar)',
        'Špičkové hybridné striedače (Deye, Huawei, Solax)',
        'Kompletná administratíva a distribúcia (SEIA, SSD, ZSD, VSD)'
      ],
      color: 'amber',
      badge: 'Najobľúbenejšie'
    },
    {
      id: 'baterie',
      icon: '🔋',
      title: 'Batériové úložiská & Wallbox',
      subtitle: 'Maximálna sebestačnosť a nabíjanie vozidla zo slnka',
      description: 'Ukladajte vyrobené prebytky energie na večer a noc. Batériové úložiská BESS v kombinácii s inteligentnými wallboxmi umožňujú nabíjať váš elektromobil čistou energiou bez čerpania z drahej siete.',
      features: [
        'LiFePO4 batériové moduly s dlhou životnosťou (6000+ cyklov)',
        'Kapacita škálovateľná od 5 kWh do 120+ kWh',
        'Záložný zdroj (UPS / Emergency Power) pri výpadku siete',
        'Inteligentné nabíjanie elektromobilu priamo zo solárnych prebytkov',
        'Mobilná aplikácia na monitoring tokov energie v reálnom čase'
      ],
      color: 'sky'
    },
    {
      id: 'cerpadla',
      icon: '♨️',
      title: 'Tepelné čerpadlá',
      subtitle: 'Ekologické a úsporné vykurovanie a ohrev vody',
      description: 'Prepojenie fotovoltiky s tepelným čerpadlom typu Vzduch-Voda predstavuje ideálnu kombináciu pre nulové účty za kúrenie, chladenie a teplú úžitkovú vodu.',
      features: [
        'Vysoká účinnosť COP až 5.0 (A+++)',
        'Vykurovanie, chladenie aj ohrev teplej vody',
        'Prispôsobené pre novostavby aj rekonštrukcie',
        'Tichá prevádzka vonkajších jednotiek',
        'Plná integrácia s fotovoltickým striedačom'
      ],
      color: 'emerald'
    },
    {
      id: 'elektro',
      icon: '⚡',
      title: 'Elektroinštalácie & Revízie',
      subtitle: 'Kompletné elektromontážne práce a revízne správy',
      description: 'Vykonávame silnoprúdové a slaboprúdové elektroinštalácie, výrobu rozvádzačov na mieru, bleskozvody a odborné revízie pre rodinné domy aj priemyselné objekty.',
      features: [
        'Kompletné elektroinštalácie novostavieb a rekonštrukcie',
        'Výroba a zapojenie rozvádzačov fotovoltiky a merania',
        'Montáž bleskozvodov a prepäťovej ochrany',
        'Odborné revízne správy (EZ) potrebné pre kolaudáciu a poistenie',
        'Záručný a pozáručný servis elektroinštalácií'
      ],
      color: 'purple'
    }
  ];

  const currentService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section id="sluzby" className="py-24 bg-slate-950 text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Komplexné portfólio
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Naše fotovoltické a energetické služby
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Postaráme sa o celú realizáciu od návrhu až po revíziu a dlhodobý monitoring.
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px] transition-all duration-200 border cursor-pointer ${
                activeTab === service.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{service.icon}</span>
              <span>{service.title}</span>
            </button>
          ))}
        </div>

        {/* Active Service Showcase Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentService.icon}</span>
                <div>
                  {currentService.badge && (
                    <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-1 inline-block">
                      {currentService.badge}
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {currentService.title}
                  </h3>
                </div>
              </div>

              <p className="text-amber-400 font-semibold text-lg">
                {currentService.subtitle}
              </p>

              <p className="text-slate-300 text-base leading-relaxed">
                {currentService.description}
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Hlavné vlastnosti & Výhody:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200">
                      <svg className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="#kalkulacka"
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center text-sm shadow-lg shadow-amber-500/10 min-h-[44px] flex items-center justify-center cursor-pointer"
                >
                  Mám záujem o {currentService.title}
                </a>
                <a
                  href="#kontakt"
                  className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors text-center text-sm border border-slate-700 min-h-[44px] flex items-center justify-center cursor-pointer"
                >
                  Konzultácia s technikom
                </a>
              </div>
            </div>

            {/* Right Graphic Panel */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Garantované štandardy Marvol s.r.o.
              </h4>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-b border-slate-800 pb-3">
                  <p className="font-bold text-white">Komponenty Tier 1</p>
                  <p className="text-slate-400 mt-0.5">Používame len odskúšané panely a meniče s vysokou účinnosťou.</p>
                </div>

                <div className="border-b border-slate-800 pb-3">
                  <p className="font-bold text-white">Inžiniering & Distribúcia</p>
                  <p className="text-slate-400 mt-0.5">Všetky žiadosti na SSD, ZSD a VSD vybavíme za vás bez poplatku.</p>
                </div>

                <div className="border-b border-slate-800 pb-3">
                  <p className="font-bold text-white">Revízna správa & Zaškolenie</p>
                  <p className="text-slate-400 mt-0.5">Po inštalácii vykonáme odbornú revíziu a naučíme vás ovládať aplikáciu.</p>
                </div>

                <div>
                  <p className="font-bold text-emerald-400">Monitoring 24/7</p>
                  <p className="text-slate-400 mt-0.5">Váš systém nepretržite monitorujeme pre maximálnu bezporuchovosť.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
