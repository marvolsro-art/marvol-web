import React, { useState } from 'react';
import Link from 'next/link';
import {
  SunIcon,
  BuildingOfficeIcon,
  BatteryIcon,
  HeatPumpIcon,
  BoltIcon,
  CheckIcon,
  ShieldIcon,
} from '@/components/icons';

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  subpage: string;
  image: string;
  badge?: string;
  features: string[];
}

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fotovoltika-dom');

  const services: ServiceItem[] = [
    {
      id: 'fotovoltika-dom',
      icon: SunIcon,
      title: 'Fotovoltika pre rodinné domy',
      shortTitle: 'Fotovoltiku pre domy',
      subtitle: 'Kompletná výroba vlastnej čistej elektriny zo slnka s dotáciou SIEA',
      description: 'Zabezpečujeme kompletný proces od bezplatnej obhliadky a výpočtu návratnosti, cez projektovú dokumentáciu, inžiniering až po samotnú montáž a oživenie systému.',
      subpage: '/fotovoltika-pre-domacnosti',
      image: '/images/fotovoltika-domacnosti/hero.jpg',
      badge: 'Zelená domácnostiam',
      features: [
        'Hybridné systémy s LiFePO4 batériovým úložiskom',
        'On-Grid systémy pripojené do distribučnej siete',
        'Prémiové monokryštalické panely Tier 1 (JA Solar, Canadian Solar)',
        'Špičkové asymetrické hybridné striedače Deye a Huawei',
        'Kompletná administratíva a schválenie distribúcie (SSD, ZSD, VSD)',
        'Mobilná aplikácia na monitoring výroby a spotreby v reálnom čase',
      ],
    },
    {
      id: 'fotovoltika-firma',
      icon: BuildingOfficeIcon,
      title: 'Fotovoltika pre firmy & priemysel',
      shortTitle: 'Fotovoltiku pre firmy',
      subtitle: 'Optimalizácia energetických nákladov pre haly, areály a administratívu',
      description: 'Znižujte fixné náklady vašej prevádzky a chráňte podnikanie pred fluktuáciou trhových cien elektriny pomocou vlastného lokálneho zdroja.',
      subpage: '/fotovoltika-pre-firmy',
      image: '/images/fotovoltika-firmy/hero.jpg',
      badge: 'Zelená podnikom',
      features: [
        'Lokálne fotovoltické zdroje od 10 kWp do 500+ kWp',
        'Aktívne vyrovnávanie odberových špičiek (Peak shaving)',
        '3D PVSOL analýza oslnenia a podrobný energetický audit',
        'Priemyselné striedače s telemetriou a SCADA integráciou',
        'Možnosť financovania a vybavenie dotácie Zelená podnikom',
        'Garantovaná návratnosť investície v horizonte 3 až 5 rokov',
      ],
    },
    {
      id: 'baterie',
      icon: BatteryIcon,
      title: 'Batériové úložiská BESS & Wallbox',
      shortTitle: 'Batériové úložiská',
      subtitle: 'Maximálna sebestačnosť, UPS zálohovanie a nabíjanie vozidla zo slnka',
      description: 'Ukladajte vyrobené prebytky energie na večer a noc. Batériové úložiská BESS v kombinácii s inteligentnými wallboxmi umožňujú nabíjať elektromobil čistou energiou bez čerpania zo siete.',
      subpage: '/bateriove-uloziska-bess',
      image: '/images/bateriove-uloziska/hero.jpg',
      badge: 'LiFePO4 Technológia',
      features: [
        'Bezpečné LiFePO4 moduly s garantovanou životnosťou 6 000+ cyklov',
        'Kapacita škálovateľná od 5 kWh (domy) po 120+ kWh (priemysel)',
        'Trojfázový záložný zdroj (UPS / Emergency Power) pri výpadku siete',
        'Inteligentné riadenie nabíjania elektromobilu zo solárnych prebytkov',
        'Ochrana pred asymetriou a prepätím rozvodnej siete',
        'Mobilný prehľad tokov energie s prediktívnym plánovaním',
      ],
    },
    {
      id: 'cerpadla',
      icon: HeatPumpIcon,
      title: 'Tepelné čerpadlá Vzduch-Voda',
      shortTitle: 'Tepelné čerpadlá',
      subtitle: 'Ekologické a úsporné vykurovanie, chladenie a príprava teplej vody',
      description: 'Prepojenie fotovoltiky s tepelným čerpadlom typu Vzduch-Voda predstavuje ideálnu kombináciu pre minimalizáciu účtov za kúrenie, chladenie aj teplú úžitkovú vodu.',
      subpage: '/tepelne-cerpadla',
      image: '/images/tepelne-cerpadla/hero.jpg',
      badge: 'Dotácia až 4 600 €',
      features: [
        'Vysoká sezónna účinnosť COP až 5.0 (energetická trieda A+++)',
        'Celoročné vykurovanie, pasívne chladenie aj ohrev teplej vody',
        'Priama komunikácia so striedačom pre využitie prebytkov elektriny',
        'Mimoriadne tichá prevádzka vonkajších jednotiek v nočnom režime',
        'Vhodné pre podlahové vykurovanie novostavieb aj nízkoteplotné radiátory',
        'Kompletné vybavenie štátnej dotácie Zelená domácnostiam',
      ],
    },
    {
      id: 'elektro',
      icon: BoltIcon,
      title: 'Elektroinštalácie & Revízie OPOS',
      shortTitle: 'Elektroinštalácie',
      subtitle: 'Certifikované silnoprúdové montáže, výroba rozvádzačov a revízne správy',
      description: 'Vykonávame silnoprúdové a slaboprúdové elektroinštalácie, zákazkovú výrobu certifikovaných rozvádzačov, montáž bleskozvodov a úradné revízie pre rodinné domy aj priemyselné objekty.',
      subpage: '/elektroinstalacie-revizie',
      image: '/images/elektroinstalacie/hero.jpg',
      badge: 'Odborná spôsobilosť § 24',
      features: [
        'Kompletné elektroinštalácie novostavieb a rekonštrukcií podľa noriem STN',
        'Výroba a zapojenie certifikovaných DC/AC fotovoltických rozvádzačov',
        'Montáž certifikovanej prepäťovej ochrany a certifikovaných bleskozvodov',
        'Odborné prehliadky a skúšky (OPOS) potrebné pre kolaudáciu a poisťovňu',
        'Inštalácia DC hasičských odpínačov Rapid Shutdown pre požiarnu bezpečnosť',
        'Záručný a autorizovaný pozáručný servis elektroinštalácií',
      ],
    },
  ];

  const currentService = services.find((s) => s.id === activeTab) || services[0];
  const CurrentIcon = currentService.icon;

  return (
    <section id="sluzby" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10">
            Komplexné portfólio na kľúč
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
          {services.map((service) => {
            const TabIcon = service.icon;
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px] min-h-[48px] transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <TabIcon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                  <CurrentIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  {currentService.badge && (
                    <span className="text-xs font-semibold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-md inline-block mb-1">
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
                <h4 className="text-xs font-bold text-slate-400">
                  Hlavné vlastnosti a výhody:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-slate-950/70 p-3 rounded-xl text-xs sm:text-sm text-slate-200">
                      <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link
                  href={currentService.subpage}
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center text-sm min-h-[44px] min-h-[48px] flex items-center justify-center cursor-pointer"
                >
                  Zistiť viac o službe →
                </Link>
                <a
                  href="#kalkulacka"
                  className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors text-center text-sm min-h-[44px] min-h-[48px] flex items-center justify-center cursor-pointer"
                >
                  Nezáväzná kalkulácia
                </a>
              </div>
            </div>

            {/* Right Graphic Panel with Authentic 16:9 Photography */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 rounded-xl text-xs text-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-white">{currentService.title}</span>
                  <span className="text-emerald-400 font-bold">100% Realizácia na kľúč</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-2xl space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldIcon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Garantované štandardy Marvol s.r.o.</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong className="text-white">Tier 1 komponenty:</strong> Používame výhradne overené značky (JA Solar, Canadian Solar, Deye, Huawei).</p>
                  <p><strong className="text-white">Distribúcia & Dotácie:</strong> Žiadosti na SSD, ZSD a VSD aj SIEA vybavíme za vás bez poplatku.</p>
                  <p><strong className="text-white">Odborná revízia:</strong> Certifikovaný revízny technik vystaví platnú správu OPOS pre kolaudáciu.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specialized Inžiniering & Subpage Services Grid */}
        <div className="mt-16 pt-12 border-t border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Samostatné odborné činnosti
            </span>
            <h3 className="text-2xl font-black text-white">
              Špecializovaný elektroinžiniering &amp; servis
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Potrebujete iba projekt, audit, požiarnu ochranu alebo úradnú revíziu? Poskytujeme aj samostatné služby.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href="/sluzby/navrh-projektu"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 inline-block mb-3">
                  PV*SOL 3D
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-1.5">
                  Návrh &amp; 3D simulácia
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Fotometrické modelovanie oslnenia a jednopólové schémy SLD pre SSD/ZSD/VSD.
                </p>
              </div>
              <span className="text-xs text-amber-400 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Viac o návrhu →
              </span>
            </Link>

            <Link
              href="/sluzby/instalacia-montaz"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20 inline-block mb-3">
                  DO 30 DNÍ
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-1.5">
                  Montáž &amp; Inštalácia
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Odborná montáž na všetky typy striech bez zatekania certifikovanými elektrikármi.
                </p>
              </div>
              <span className="text-xs text-sky-400 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Viac o montáži →
              </span>
            </Link>

            <Link
              href="/sluzby/konzultacie-poradenstvo"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 inline-block mb-3">
                  0 € AUDIT
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors mb-1.5">
                  Energetický audit &amp; ROI
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Analýza vyúčtovacích faktúr, výpočet reálnej návratnosti a batériových stratégií.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Viac o audite →
              </span>
            </Link>

            <Link
              href="/sluzby/protipoziarna-ochrana-bezpecne-napatie"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-400/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20 inline-block mb-3">
                  RAPID SHUTDOWN
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors mb-1.5">
                  Požiarna ochrana &amp; HaZZ
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Beznapäťová strecha pod 30 V do 30 s pre bezpečný zásah hasičov vodou.
                </p>
              </div>
              <span className="text-xs text-red-400 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Viac o bezpečnosti →
              </span>
            </Link>

            <Link
              href="/sluzby/revizie-dotacie"
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-400/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 inline-block mb-3">
                  SIEA &amp; OPOS
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                  Revízie &amp; Dotácie SIEA
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Úradné správy § 24, termovízia Fluke a odpočet dotácie priamo z faktúry.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Viac o revíziách →
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
