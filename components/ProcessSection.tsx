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
      title: 'Bezplatná konzultácia & obhliadka',
      description: 'Náš technik navštívi vašu nehnuteľnosť, posúdi stav strechy, elektroinštalácie a navrhne optimálne technické riešenie.',
      timeframe: 'Do 48 hodín',
      image: '/images/sluzby/poradenstvo.jpg',
      subpage: '/sluzby/konzultacie-poradenstvo',
      icon: PhoneIcon,
    },
    {
      step: 2,
      title: '3D Návrh & Energetický audit',
      description: 'Pripravíme presnú 3D simuláciu osvitu a tienenia v PVSOL, garantovaný výkon a podrobný harmonogram návratnosti.',
      timeframe: 'Do 3 dní',
      image: '/images/sluzby/navrh-projektu.jpg',
      subpage: '/sluzby/navrh-projektu',
      icon: FileTextIcon,
    },
    {
      step: 3,
      title: 'Certifikovaná montáž na kľúč',
      description: 'Kvalifikovaní montéri osadia panely, striedač aj batériu s dôrazom na 100% hydroizoláciu a estetiku strechy.',
      timeframe: '1 až 2 dni',
      image: '/images/sluzby/montaz-instalacia.jpg',
      subpage: '/sluzby/instalacia-montaz',
      icon: WrenchIcon,
    },
    {
      step: 4,
      title: 'Protipožiarna ochrana & Bezpečnosť',
      description: 'Inštalujeme DC hasičské odpínače Rapid Shutdown a prepäťové ochrany podľa STN pre maximálnu ochranu majetku.',
      timeframe: 'Štandard montáže',
      image: '/images/sluzby/protipoziarna-ochrana.jpg',
      subpage: '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
      icon: ShieldIcon,
    },
    {
      step: 5,
      title: 'Odborná revízia & Dotácia SIEA',
      description: 'Revízny technik § 24 vyhotoví revíznu správu OPOS, zaevidujeme systém u prevádzkovateľa siete a vybavíme štátnu dotáciu.',
      timeframe: 'Hotovo na kľúč',
      image: '/images/sluzby/revizie-dotacie.jpg',
      subpage: '/sluzby/revizie-dotacie',
      icon: CheckIcon,
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-sm font-semibold text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4 sm:mb-5">
            Jednoduchý a prehľadný postup
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Ako prebieha realizácia fotovoltiky?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            S Marvol s.r.o. nemáte žiadne starosti. Celý proces od návrhu po dotácie vyriešime za vás.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-slate-950/80 p-5 rounded-2xl flex flex-col justify-between space-y-5 relative group hover:bg-slate-950 transition-colors"
              >
                <div className="space-y-4">
                  {/* Authentic 16:9 Photography */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={360}
                      height={202}
                    />
                    <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {step.step}
                    </div>
                    <div className="absolute top-2.5 right-2.5 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-950/85 text-amber-300">
                      {step.timeframe}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
                      <StepIcon className="w-4 h-4 text-amber-400" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={step.subpage}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 min-h-[44px]"
                  >
                    Podrobnosti kroku →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
