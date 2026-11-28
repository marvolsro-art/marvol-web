import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';
import { SunIcon, BoltIcon, ShieldIcon, FileTextIcon, CheckIcon, PhoneIcon, MailIcon, BuildingOfficeIcon } from '@/components/icons';

export default function NavrhProjektu() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Služby', href: '/#sluzby' },
    { name: 'Návrh projektu & Projektovanie', href: '/sluzby/navrh-projektu' },
  ];



  const faqs = [
    {
      q: 'Prečo je 3D analýza zatienenia taká dôležitá pred montážou panelov?',
      a: 'Aj malý lokálny tieň z komína, vikiera či susedného stromu na jedinom solárnom článku môže znížiť výkon celého stringu o 30 až 50%. Pri zložitejších strechách preto ponúkame možnosť fotometrickej 3D simulácie v PV*SOL, ktorá presne nasimuluje dráhu slnka počas celých 8 760 hodín v roku. Vďaka tomu panely umiestnime iba na nezatienené plochy alebo navrhneme výkonové optimizéry, čím ochránime vašu investíciu.',
    },
    {
      q: 'Aký je rozdiel medzi projektom pre rodinný dom a komerčnú firmu?',
      a: 'Rodinné domy sa štandardne pripájajú v zjednodušenom režime ako mikrozdroj do 10,8 kW, kde postačuje schéma skutočného vyhotovenia a revízia. Firmy a lokálne zdroje nad 10,8 kW vyžadujú autorizovaný elektrotechnický projekt, posúdenie spätnej dodávky do siete, návrh externého rozpadového miesta a často aj statický posudok krovu výrobnej haly.',
    },
    {
      q: 'Musí mať projekt fotovoltiky autorizačnú pečiatku?',
      a: 'Pre pripojenie štandardného mikrozdroja do 10,8 kW distribúcia vyžaduje jednopólovú schému zapojenia a protokol o nastavení ochrán potvrdený odborníkom. Pri inštaláciách nad 10,8 kW, komerčných objektoch a stavbách vyžadujúcich stavebné povolenie je autorizovaný projektant s osvedčením SKSI zákonnou požiadavkou.',
    },
    {
      q: 'Koľko trvá vypracovanie kompletného projektu?',
      a: 'Štandardný projekt pre rodinný dom s jednopólovou schémou a možnosťou 3D fotometrickej simulácie pripravíme do 3 až 5 pracovných dní. Komplexné komerčné projekty pre priemyselné budovy a firmy trvajú obvykle 1 až 2 týždne v závislosti od dostupnosti podkladov.',
    },
    {
      q: 'Čo ak distribútor zamietne žiadosť o pripojenie z dôvodu kapacity siete?',
      a: 'V regiónoch s preťaženou distribučnou sieťou môže distribútor obmedziť dodávku do siete. V takom prípade náš projektant navrhne systém s nulovým prietokom do siete (Zero Export) alebo hybridný systém s batériovým úložiskom, ktorý distribúcia bezodkladne schváli, pretože sieť nijako nezaťažuje.',
    },
  ];

  const jsonLdSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Domov',
          item: 'https://marvol.sk',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Služby',
          item: 'https://marvol.sk/#sluzby',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Návrh projektu & Projektovanie',
          item: 'https://marvol.sk/sluzby/navrh-projektu',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://marvol.sk/sluzby/navrh-projektu#service',
      name: 'Návrh projektu fotovoltiky & inžiniering',
      serviceType: 'Elektrotechnické projektovanie a možnosť 3D analýzy zatienenia',
      description:
        'Profesionálny elektrotechnický návrh fotovoltiky, možnosť 3D analýzy zatienenia a jednopólové schémy. Kompletná projektová dokumentácia pre SSD, ZSD, VSD a stavebný úrad.',
      provider: {
        '@id': 'https://marvol.sk/#organization',
        '@type': 'LocalBusiness',
        name: COMPANY_DETAILS.legalName,
        telephone: COMPANY_DETAILS.contact.phoneClean,
        email: COMPANY_DETAILS.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY_DETAILS.seat.street,
          addressLocality: COMPANY_DETAILS.seat.city,
          postalCode: COMPANY_DETAILS.seat.zip,
          addressCountry: COMPANY_DETAILS.seat.countryCode,
        },
      },
      areaServed: {
        '@type': 'Country',
        name: 'Slovakia',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <Layout
      title="Návrh projektu fotovoltiky & inžiniering | Marvol s.r.o."
      description="Profesionálny elektrotechnický návrh fotovoltiky, možnosť 3D analýzy zatienenia a jednopólové schémy. Kompletná projektová dokumentácia pre SSD, ZSD, VSD a stavebný úrad."
      canonicalPath="/sluzby/navrh-projektu"
      schema={jsonLdSchema}
      isSubpage={true}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <ol className="flex items-center space-x-2 text-xs text-slate-400">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-600">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-amber-400 font-semibold">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 ">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <SunIcon className="w-4 h-4 text-amber-400 shrink-0" /><span>Elektrotechnické projektovanie &amp; možnosť 3D modelu</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Návrh projektu fotovoltiky <br className="hidden sm:block" />
                <span className="text-amber-400">s možnosťou 3D analýzy</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Získajte precíznu projektovú dokumentáciu, fotometrickú simuláciu oslnenia a jednopólové schémy zapojenia. Navrhujeme fotovoltické systémy bez kompromisov s <strong className="text-white">garanciou schválenia</strong> u distribučných spoločností SSD, ZSD a VSD.
              </p>

              {/* 4 Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-amber-400 font-black text-xl sm:text-2xl">98,5%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Presnosť predikcie výroby</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">8 760 h</div>
                  <div className="text-slate-400 text-xs mt-0.5">Simulácia dráhy slnka</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-emerald-400 font-black text-xl sm:text-2xl">0 €</div>
                  <div className="text-slate-400 text-xs mt-0.5">Možnosť 3D konceptu</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className="text-sky-400 font-black text-xl sm:text-2xl">100%</div>
                  <div className="text-slate-400 text-xs mt-0.5">Súlad s STN normami</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#dopyt"
                  className="inline-flex items-center justify-center min-h-[44px] min-h-[48px] px-7 py-3.5 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 text-center transition-colors cursor-pointer"
                >
                  Nezáväzný dopyt na projekt
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="inline-flex items-center justify-center min-h-[44px] min-h-[48px] px-7 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-center transition-colors cursor-pointer"
                >
                  Zavolajte projektantovi: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>

            {/* Hero Feature Card with Illustrative Photo */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700/60  bg-slate-900/90 backdrop-blur-xl">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sluzby/navrh-projektu.jpg"
                    alt="Projektovanie fotovoltiky s možnosťou 3D simulácie Marvol"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center gap-1.5 ">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Možnosť 3D modelovania</span>
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs font-semibold rounded-full ">
                    PV*SOL Premium
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="font-bold text-white text-sm">Optimalizácia &amp; možnosť 3D modelu</span>
                      <span className="text-amber-400 font-bold">Presnosť 98,5%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Kompletná projektová dokumentácia pre schválenie SSD, ZSD a VSD na prvé podanie.
                    </p>
                  </div>
                </div>

                {/* Quick Quality Matrix */}
                <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 bg-slate-900/90  text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 inline" />
                    <span>Hodinová simulácia 8 760 h</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 inline" />
                    <span>Jednopólové schémy zapojenia</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 inline" />
                    <span>Statický posudok krovu</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0 inline" />
                    <span>Garancia schválenia distribúciou</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-amber-400 text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Všetko o projektovaní fotovoltických elektrární
            </h2>
            <p className="text-slate-400 text-sm">
              Máte špecifický projekt alebo atypickú strechu? Naši inžinieri sú pripravení zodpovedať vaše otázky.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-xl text-amber-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Form Consultation Section */}
      <section id="dopyt" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Bezplatný technický návrh
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Nezáväzný dopyt na projekt fotovoltiky
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Zašlite nám adresu nehnuteľnosti alebo pôdorys strechy a naši inžinieri pripravia technický návrh s možnosťou 3D simulácie oslnenia a predbežnú kalkuláciu.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <PhoneIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Priamy kontakt na projektantov</div>
                    <a href={`tel:${COMPANY_DETAILS.contact.phoneClean}`} className="inline-flex items-center min-h-[44px] min-h-[48px] py-2 text-white font-bold hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <MailIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Projektové oddelenie</div>
                    <a href={`mailto:${COMPANY_DETAILS.contact.email}`} className="inline-flex items-center min-h-[44px] min-h-[48px] py-2 text-white font-bold hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <BuildingOfficeIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sídlo spoločnosti</div>
                    <span className="text-white font-medium">{COMPANY_DETAILS.seat.fullAddress}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Garancia inžinierskeho servisu Marvol s.r.o.:</div>
                <div>Garantujeme 100% súlad projektovej dokumentácie s technickými podmienkami prevádzkovateľov distribučných sústav SSD, ZSD a VSD.</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <LeadForm
                initialService="fotovoltika-dom"
                source="page_sluzby_navrh_projektu"
                title="Nezáväzný dopyt na projekt fotovoltiky"
                subtitle="Zašlite nám adresu nehnuteľnosti alebo pôdorys strechy a naši inžinieri pripravia technický návrh s možnosťou 3D vizualizácie a kalkuláciu."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
