import React from 'react';
import Link from 'next/link';
import { HomeIcon, BuildingOfficeIcon, BatteryIcon, CheckIcon } from '@/components/icons';

export const TargetAudienceSection: React.FC = () => {
  return (
    <section id="target-groups" className="py-20 sm:py-24 bg-slate-900 text-white relative content-auto scroll-mt-36 sm:scroll-mt-40 md:scroll-mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header (Left-aligned, zero pill badge) */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Energetické segmenty
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Riešenia navrhnuté pre váš typ nehnuteľnosti
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Každá stavba si vyžaduje špecifické technické riešenie. Spoločnosť Marvol s.r.o. dodáva certifikované energetické systémy s garanciou kompatibility, bezpečnosti a návratnosti.
          </p>
        </div>

        {/* Segment 1: Rodinné domy (Dominant Architectural Showcase) */}
        <div className="bg-slate-950 rounded-3xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Visual Left */}
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src="/images/fotovoltika-domacnosti/hero.jpg"
                alt="Fotovoltika pre rodinné domy od Marvol"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
                width={800}
                height={500}
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/90 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                Štátna dotácia SIEA do 1 150 €
              </div>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Fotovoltika pre rodinné domy
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                  Znížte mesačné účty za elektrinu o 70 až 80 %. Navrhneme zostavu presne podľa energetického profilu vašej domácnosti s možnosťou LiFePO4 batériového úložiska a smart ohrevu vody.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200 pt-1">
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Výkon od 3 kWp do 10 kWp</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Hybridný menič s EPS záskokom</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span>LiFePO4 batérie 6 000+ cyklov</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-semibold text-emerald-400">Vybavenie SIEA bez poplatku</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/fotovoltika-pre-domacnosti"
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center text-sm min-h-[48px] tap-target-48"
                >
                  Riešenia pre rodinné domy →
                </Link>
                <a
                  href="#kalkulacka"
                  className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 transition-colors text-center text-sm min-h-[48px] tap-target-48"
                >
                  Kalkulácia úspory
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Dual Secondary Plane: Firmy & Komerčné objekty + Bytové domy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Plane 2: Firmy & Priemysel */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="/images/fotovoltika-firmy/hero.jpg"
                  alt="Fotovoltika pre firmy a priemysel"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/90 text-sky-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                  Program Zelená podnikom &amp; PVSOL
                </div>
              </div>

              <h3 className="text-2xl font-black text-white">
                Firmy &amp; Priemyselné haly
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Lokálne fotovoltické zdroje od 10 kWp do 500+ kWp s priemyselným úložiskom BESS. Ochrana pred výkyvmi cien na burze a zníženie rezervovanej kapacity (peak-shaving).
              </p>

              <ul className="space-y-2.5 text-sm text-slate-200 pt-1">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>PVSOL energetická a finančná simulácia</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Veľkokapacitné batériové úložiská BESS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span>Projekt, distribúcia a priemyselné rozvádzače</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/fotovoltika-pre-firmy"
                className="block w-full py-3.5 text-center font-bold text-sm rounded-xl bg-sky-500 text-slate-950 hover:bg-sky-400 transition-colors min-h-[48px] tap-target-48"
              >
                Preskúmať riešenia pre firmy →
              </Link>
            </div>
          </div>

          {/* Plane 3: Bytové domy & Samosprávy */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="/images/bateriove-uloziska/hero.jpg"
                  alt="Batériové systémy BESS a bytové domy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/90 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                  LiFePO4 systémy &amp; UPS záloha
                </div>
              </div>

              <h3 className="text-2xl font-black text-white">
                Bytové domy, Samosprávy &amp; BESS
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Energetická sebestačnosť pre spoločenstvá vlastníkov, škôlky, úrady a kultúrne domy. Zdieľanie vyrobenej energie v bytovom dome a zníženie nákladov spoločných priestorov.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-200 pt-1">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Batériové úložiská BESS od 20 kWh do 1 MWh</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zdieľanie elektriny v rámci bytového domu</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Kompletná projektová a legislatívna podpora</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/bateriove-uloziska-bess"
                className="block w-full py-3.5 text-center font-bold text-sm rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors min-h-[48px] tap-target-48"
              >
                Preskúmať batériové úložiská BESS →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
