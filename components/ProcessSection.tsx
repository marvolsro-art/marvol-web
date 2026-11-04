import React from 'react';
import Link from 'next/link';
import {
  PhoneIcon,
  FileTextIcon,
  WrenchIcon,
  ShieldIcon,
  CheckIcon,
} from '@/components/icons';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  timeframe: string;
  image: string;
  subpage: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ProcessSection: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      step: 1,
      title: 'Bezplatná obhliadka',
      description: 'Posúdenie nosnosti strechy, orientácie a stavu elektroinštalácie na mieste.',
      timeframe: 'Do 48 hodín',
      image: '/images/sluzby/poradenstvo.jpg',
      subpage: '/sluzby/konzultacie-poradenstvo',
      icon: PhoneIcon,
    },
    {
      step: 2,
      title: '3D Návrh v PVSOL',
      description: 'Presná simulácia oslnenia, model výroby a výpočet návratnosti investície.',
      timeframe: 'Do 3 dní',
      image: '/images/sluzby/navrh-projektu.jpg',
      subpage: '/sluzby/navrh-projektu',
      icon: FileTextIcon,
    },
    {
      step: 3,
      title: 'Montáž na kľúč',
      description: 'Certifikovaná inštalácia panelov, nosných konštrukcií, striedača a úložiska.',
      timeframe: '1 až 2 dni',
      image: '/images/sluzby/montaz-instalacia.jpg',
      subpage: '/sluzby/instalacia-montaz',
      icon: WrenchIcon,
    },
    {
      step: 4,
      title: 'Bezpečnosť & DC ochrana',
      description: 'Inštalácia DC odpínačov Rapid Shutdown a prepäťovej ochrany podľa STN.',
      timeframe: 'Súčasť montáže',
      image: '/images/sluzby/protipoziarna-ochrana.jpg',
      subpage: '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
      icon: ShieldIcon,
    },
    {
      step: 5,
      title: 'Revízia OPOS & SIEA',
      description: 'Revízna správa § 24, odovzdanie do siete distribúcie a vyplatenie dotácie.',
      timeframe: 'Finálne spustenie',
      image: '/images/sluzby/revizie-dotacie.jpg',
      subpage: '/sluzby/revizie-dotacie',
      icon: CheckIcon,
    },
  ];

  return (
    <section id="proces" className="py-20 sm:py-24 bg-slate-900 text-white relative content-auto scroll-mt-36 sm:scroll-mt-40 md:scroll-mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header (Left-aligned, zero pill badge) */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Harmonogram montáže
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Priebeh realizácie fotovoltiky od návrhu po revíziu
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            S Marvol s.r.o. nemáte žiadne administratívne starosti. Celý proces od prvého kontaktu až po pripojenie do distribučnej siete zariadime na kľúč.
          </p>
        </div>

        {/* Chronological Step Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div
              key={step.step}
              className="bg-slate-950 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-colors hover:bg-slate-950/90"
            >
              <div className="space-y-3.5">
                {/* Authentic Photography with Timeframe Badge */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={360}
                    height={202}
                  />
                  <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="absolute top-2.5 right-2.5 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-950/90 text-amber-300">
                    {step.timeframe}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <Link
                  href={step.subpage}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 min-h-[44px]"
                >
                  Podrobnosti kroku →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
