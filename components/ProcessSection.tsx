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
      image: '/images/sluzby/poradenstvo.jpg',
      subpage: '/sluzby/konzultacie-poradenstvo',
      icon: PhoneIcon,
    },
    {
      step: 2,
      title: 'Technický návrh & simulácia',
      description: 'Prepočet výroby a návratnosti s možnosťou fotometrickej 3D vizualizácie v PVSOL.',
      image: '/images/sluzby/navrh-projektu.jpg',
      subpage: '/sluzby/navrh-projektu',
      icon: FileTextIcon,
    },
    {
      step: 3,
      title: 'Montáž na kľúč',
      description: 'Certifikovaná inštalácia panelov, nosných konštrukcií, striedača a úložiska.',
      image: '/images/sluzby/montaz-instalacia.jpg',
      subpage: '/sluzby/instalacia-montaz',
      icon: WrenchIcon,
    },
    {
      step: 4,
      title: 'Bezpečnosť & DC ochrana',
      description: 'Inštalácia DC odpínačov Rapid Shutdown a prepäťovej ochrany podľa STN.',
      image: '/images/sluzby/protipoziarna-ochrana.jpg',
      subpage: '/sluzby/protipoziarna-ochrana-bezpecne-napatie',
      icon: ShieldIcon,
    },
    {
      step: 5,
      title: 'Revízia OPOS & SIEA',
      description: 'Revízna správa § 24, odovzdanie do siete distribúcie a vyplatenie dotácie.',
      image: '/images/sluzby/revizie-dotacie.jpg',
      subpage: '/sluzby/revizie-dotacie',
      icon: CheckIcon,
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-sm font-semibold text-amber-400 px-3 py-1 rounded-full bg-amber-400/10">
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
                    />
                    <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {step.step}
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
