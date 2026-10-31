import React from 'react';
import Link from 'next/link';
import { HomeIcon, BuildingOfficeIcon, BatteryIcon, CheckIcon } from '@/components/icons';

export const TargetAudienceSection: React.FC = () => {
  return (
    <section id="target-groups" className="py-20 bg-slate-900 text-white relative content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
            Riešenia prispôsobené na mieru
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Pre kategórie zákazníkov
          </h2>
          <p className="text-slate-400 text-base">
            Každý objekt vyžaduje špecifické technické riešenie. Spoločnosť Marvol s.r.o. dodáva certifikované energetické systémy pre všetky typy nehnuteľností.
          </p>
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Domácnosti */}
          <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:bg-slate-950 transition-colors">
            <div className="space-y-5">
              {/* Authentic 16:9 Photograph */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <img
                  src="/images/fotovoltika-domacnosti/hero.jpg"
                  alt="Fotovoltika pre rodinné domy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <HomeIcon className="w-5 h-5 text-slate-950" />
                </div>
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-amber-300 bg-slate-950/85 px-2.5 py-1 rounded-md">
                  Dotácia až 1 150 € / 4 600 €
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Domácnosti
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Plaťte menej za energie a užívajte si vyšší komfort bývania. Smart fotovoltické systémy a batérie znížia vaše mesačné účty o 70 až 90%.
                </p>
              </div>

              <ul className="space-y-3 pt-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Fotovoltika od 3 kWp do 10 kWp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Batériové úložiská & virtuálna batéria</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Nabíjacie stanice Wallbox pre elektromobily</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-emerald-400">Dotácia Zelená domácnostiam (SIEA)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/fotovoltika-pre-domacnosti"
                className="block w-full py-3.5 min-h-[44px] min-h-[48px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
              >
                Preskúmať riešenia pre rodinné domy →
              </Link>
              <a
                href="#kalkulacka"
                className="block text-center text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors py-1.5"
              >
                Spočítať úsporu v kalkulačke
              </a>
            </div>
          </div>

          {/* Card 2: Firmy */}
          <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:bg-slate-950 transition-colors">
            <div className="space-y-5">
              {/* Authentic 16:9 Photograph */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <img
                  src="/images/fotovoltika-firmy/hero.jpg"
                  alt="Fotovoltika pre firmy a priemysel"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
                  <BuildingOfficeIcon className="w-5 h-5 text-slate-950" />
                </div>
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-sky-300 bg-slate-950/85 px-2.5 py-1 rounded-md">
                  Zelená podnikom & PVSOL
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors">
                  Firmy & Priemysel
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Optimalizujte prevádzkové náklady výrobných hál, logistických centier a administratívnych budov. Chráňte podnikanie pred výkyvmi cien energií.
                </p>
              </div>

              <ul className="space-y-3 pt-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Lokálne fotovoltické zdroje od 10 kWp do 500+ kWp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Priemyselné batériové úložiská (BESS)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Elektroinštalácie a rozvádzače pre priemysel</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-emerald-400">Program Zelená podnikom pre firmy</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/fotovoltika-pre-firmy"
                className="block w-full py-3.5 min-h-[44px] min-h-[48px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors"
              >
                Preskúmať riešenia pre firmy →
              </Link>
              <a
                href="#kontakt"
                className="block text-center text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors py-1.5"
              >
                Požiadať o energetický audit
              </a>
            </div>
          </div>

          {/* Card 3: Bytové domy & BESS */}
          <div className="bg-slate-950/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:bg-slate-950 transition-colors">
            <div className="space-y-5">
              {/* Authentic 16:9 Photograph */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                <img
                  src="/images/bateriove-uloziska/hero.jpg"
                  alt="Batériové systémy BESS a bytové domy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  <BatteryIcon className="w-5 h-5 text-slate-950" />
                </div>
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-emerald-300 bg-slate-950/85 px-2.5 py-1 rounded-md">
                  LiFePO4 & UPS Záloha
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  Bytové domy & Samosprávy
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Efektívne energetické systémy pre spoločenstvá vlastníkov, škôlky, úrady a kultúrne domy. Lokálna sebestačnosť a zníženie verejných výdavkov.
                </p>
              </div>

              <ul className="space-y-3 pt-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Veľkokapacitné batériové systémy BESS</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Energetická sebestačnosť verejných objektov</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zdieľanie vyrobenej energie v bytových domoch</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-emerald-400">Verejné obstarávanie & Inžiniering</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/bateriove-uloziska-bess"
                className="block w-full py-3.5 min-h-[44px] min-h-[48px] flex items-center justify-center text-center font-bold text-sm rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Preskúmať batériové úložiská BESS →
              </Link>
              <a
                href="#kontakt"
                className="block text-center text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors py-1.5"
              >
                Konzultácia pre samosprávu / dom
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
