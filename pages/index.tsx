import React from 'react';
import Head from 'next/head';
import { COMPANY_DETAILS } from '@/constants/company';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ShieldIcon,
  SunIcon,
  BoltIcon,
  AlertCircleIcon,
  CheckIcon,
  BatteryIcon,
  BuildingOfficeIcon,
  HeatPumpIcon,
  WrenchIcon,
  FileTextIcon,
} from '@/components/icons';
import { PARTNERS_ROW_1, PARTNERS_ROW_2 } from '@/components/PartnerLogosSection';

const SOLAR_SERVICES = [
  {
    title: 'Fotovoltika pre rodinné domy',
    badge: 'Primárna služba',
    badgeColor: 'amber',
    image: '/images/fotovoltika-domacnosti/hero.jpg',
    description: 'Kompletné fotovoltické elektrárne na kľúč pre rodinné domy. Znížte náklady na elektrinu až o 80 % a získajte štátnu dotáciu z programu Zelená domácnostiam.',
    highlights: [
      'Celočierne N-Type TOPCon panely s účinnosťou > 22.5 %',
      'Hybridné striedače s batériovým back-upom pri výpadku siete',
      'Kompletné vybavenie dotácie SIEA až do 1 150 € za vás',
    ],
  },
  {
    title: 'Komerčná fotovoltika pre firmy a haly',
    badge: 'B2B & Priemysel',
    badgeColor: 'sky',
    image: '/images/fotovoltika-firmy/hero.jpg',
    description: 'Priemyselné strešné a pozemné inštalácie od 30 kWp do 1 MWp. Fixujte si cenu elektriny na 25+ rokov a využite program Zelená podnikom.',
    highlights: [
      'Energetický audit, optimalizácia spotreby a 3D návrh',
      'Trafostanice, pripojenie do distribučnej siete (SSD, ZSD, VSD)',
      'Rýchla návratnosť investície od 3,5 do 5 rokov',
    ],
  },
  {
    title: 'Batériové úložiská BESS & Záloha',
    badge: 'Energetická rezerva',
    badgeColor: 'emerald',
    image: '/images/bateriove-uloziska/hero.jpg',
    description: 'Ukladajte prebytky solárnej energie na nočnú spotrebu. Inteligentný manažment tokov energie a bleskové záložné napájanie do 20 ms.',
    highlights: [
      'Bezpečné LiFePO4 batériové články s dlhou cyklickou životnosťou',
      'Ostrovná prevádzka a ochrana pred blackoutom',
      'Integrácia s inteligentným nabíjaním elektromobilov (Wallbox)',
    ],
  },
  {
    title: 'Odborná montáž & Úradné revízie',
    badge: 'Garancia kvality',
    badgeColor: 'amber',
    image: '/images/sluzby/montaz-instalacia.jpg',
    description: 'Inštalácie realizujeme výhradne vlastnými certifikovanými montážnikmi a revíznymi technikmi bez nespoľahlivých subdodávateľov.',
    highlights: [
      'Odborná spôsobilosť elektrotechnikov podľa § 24',
      'Úradné revízne správy (OPOS) podľa noriem STN EN',
      'Záručný a pozáručný servis po celom Slovensku',
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Bezplatná obhliadka & 3D návrh',
    desc: 'Zameriame vašu strechu, analyzujeme orientáciu, oslnenie a pripravíme presný technický návrh na mieru.',
    icon: SunIcon,
  },
  {
    step: '02',
    title: 'Vybavenie štátnej dotácie',
    desc: 'Ako oprávnený zhotoviteľ SIEA podáme žiadosť a zaistíme poukážku (Zelená domácnostiam & podnikom).',
    icon: FileTextIcon,
  },
  {
    step: '03',
    title: 'Certifikovaná montáž na kľúč',
    desc: 'Náš tím namontuje konštrukcie, fotovoltické panely, striedač a prepäťové ochrany zvyčajne do 1-2 dní.',
    icon: BoltIcon,
  },
  {
    step: '04',
    title: 'Úradná revízia & Pripojenie do siete',
    desc: 'Vystavíme revíznu správu § 24 a pripojíme elektráreň do distribučnej siete. Vyrábate vlastnú čistú energiu.',
    icon: ShieldIcon,
  },
];

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Prebieha údržba | Marvol s.r.o. - Špecialista na fotovoltiku na kľúč</title>
        <meta
          name="description"
          content={`Na stránke Marvol s.r.o. prebieha plánovaná technická údržba. Všetky montáže fotovoltických elektrární, batériových úložísk BESS a technické obhliadky po celom Slovensku fungujú bez obmedzení. Kontaktujte nás na ${COMPANY_DETAILS.contact.phone} alebo ${COMPANY_DETAILS.contact.email}.`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans antialiased relative overflow-hidden">
        
        {/* Subtle Ambient Solar Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-emerald-500/5 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] bg-amber-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Top Header Bar */}
        <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo-marvol.svg"
                alt="Marvol s.r.o. Logo"
                className="h-10 sm:h-11 w-auto max-w-[170px] object-contain"
                width={170}
                height={44}
              />
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Marvol · robíme svet zelenším</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Servisný režim • Spustenie nového webu už čoskoro</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="max-w-3xl space-y-4 mb-8">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Na stránke sa usilovne pracuje
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Pripravujeme pre vás modernizovaný online systém pre fotovoltické elektrárne na kľúč, batériové úložiská BESS a tepelné čerpadlá.
            </p>
          </div>

          {/* Continuous Operations Banner */}
          <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-10 text-left flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl shadow-black/40">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
              <AlertCircleIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-white">
                Všetky naše služby, montáže fotovoltiky a technické obhliadky fungujú bez obmedzení
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Náš tím inžinierov a certifikovaných montážnikov realizuje inštalácie fotovoltických elektrární, elektroinštalácie a vybavovanie štátnych dotácií SIEA po celom Slovensku v štandardnom režime.
              </p>
            </div>
          </div>

          {/* THEMATIC HERO SHOWCASE: Fotovoltika na kľúč (Large Visual Hero) */}
          <div className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-black/60 text-left">
            <div className="relative h-64 sm:h-80 md:h-[420px] w-full overflow-hidden">
              <img
                src="/images/fotovoltika-domacnosti/hero.jpg"
                alt="Fotovoltické inštalácie na rodinné domy Marvol s.r.o."
                className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Badges on image */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <SunIcon className="w-3.5 h-3.5" />
                  <span>Fotovoltika na kľúč</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/30 text-emerald-400 text-xs font-bold">
                  <ShieldIcon className="w-3.5 h-3.5" />
                  <span>Záruka na výkon 25 rokov</span>
                </span>
              </div>

              {/* Bottom caption on image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Marvol Photovoltaic Engineering
                </span>
                <p className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                  Kompletné fotovoltické systémy pre rodinné domy a firmy
                </p>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 max-w-2xl drop-shadow leading-relaxed">
                  Od technického 3D návrhu, statiky strechy a vybavenia dotácie až po montáž, úradnú revíznu správu a pripojenie do distribučnej siete.
                </p>
              </div>
            </div>

            {/* Solar Key Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/80 p-4 sm:p-5">
              <div className="p-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 text-xs font-bold mb-0.5">
                  <SunIcon className="w-3.5 h-3.5" />
                  <span>Úspora energií</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white">až do 80 %</p>
                <p className="text-[11px] text-slate-400">Na ročných účtoch za elektrinu</p>
              </div>

              <div className="p-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold mb-0.5">
                  <ShieldIcon className="w-3.5 h-3.5" />
                  <span>Dotácia SIEA</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white">do 1 150 €</p>
                <p className="text-[11px] text-slate-400">Zelená domácnostiam bez starostí</p>
              </div>

              <div className="p-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sky-400 text-xs font-bold mb-0.5">
                  <BoltIcon className="w-3.5 h-3.5" />
                  <span>Špičková garancia</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white">25 rokov</p>
                <p className="text-[11px] text-slate-400">Lineárna záruka na výkon panelov</p>
              </div>

              <div className="p-3 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 text-xs font-bold mb-0.5">
                  <WrenchIcon className="w-3.5 h-3.5" />
                  <span>Revízie OPOS</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white">§ 24 elektrotechnici</p>
                <p className="text-[11px] text-slate-400">Vlastný certifikovaný personál</p>
              </div>
            </div>
          </div>

          {/* THEMATIC SOLAR SERVICE CARDS WITH AUTHENTIC PHOTOGRAPHY */}
          <div className="w-full max-w-4xl mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Solárne portfólio
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Naše špecializované riešenia
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Každú fotovoltickú elektráreň navrhujeme na mieru pre maximálnu sebestačnosť, energetickú nezávislosť a najrýchlejšiu návratnosť investície.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {SOLAR_SERVICES.map((srv) => (
                <div
                  key={srv.title}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                        srv.badgeColor === 'amber'
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/30'
                          : srv.badgeColor === 'emerald'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                      }`}>
                        {srv.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                      {srv.highlights.map((hl) => (
                        <li key={hl} className="flex items-start gap-2">
                          <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TURNKEY SOLAR PROCESS (4 Step Visual Timeline) */}
          <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Jednoduchý proces
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Ako prebieha inštalácia fotovoltiky
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Celý proces od prvého kontaktu až po pripojenie do distribučnej siete zabezpečujeme bez vašich starostí.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {PROCESS_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-amber-400/40 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-black text-amber-400 tracking-tight">
                          {step.step}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TECHNOLOGICAL PARTNERS STRIP (Continuous Marquee Slider identical to preview) */}
          <div className="w-full max-w-5xl bg-slate-900/40 border border-slate-800/70 rounded-3xl p-6 sm:p-8 mb-12 overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Svetoví lídri v solárnej energetike
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Technológie, ktorým dôverujeme
              </h3>
              <p className="text-xs text-slate-400 mt-1.5">
                Pracujeme výhradne s certifikovanými výrobcami s oficiálnym zastúpením v EÚ a dlhoročnou zárukou až 25 rokov:
              </p>
            </div>

            {/* Dual Marquee Tracks */}
            <div className="space-y-4 sm:space-y-5">
              {/* Track 1: Gliding Left */}
              <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max animate-marquee gap-4 sm:gap-6 items-center">
                  {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((partner, idx) => (
                    <div
                      key={`${partner.id}-row1-${idx}`}
                      className="w-40 sm:w-48 h-18 sm:h-20 bg-white rounded-2xl px-5 py-3.5 flex items-center justify-center shrink-0 border border-slate-200 transition-transform hover:scale-105"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-10 sm:max-h-12 max-w-[130px] sm:max-w-[145px] w-auto h-auto object-contain"
                        loading="lazy"
                        decoding="async"
                        width={145}
                        height={48}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Track 2: Gliding Right */}
              <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max animate-marquee-reverse gap-4 sm:gap-6 items-center">
                  {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((partner, idx) => (
                    <div
                      key={`${partner.id}-row2-${idx}`}
                      className="w-40 sm:w-48 h-18 sm:h-20 bg-white rounded-2xl px-5 py-3.5 flex items-center justify-center shrink-0 border border-slate-200 transition-transform hover:scale-105"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-10 sm:max-h-12 max-w-[130px] sm:max-w-[145px] w-auto h-auto object-contain"
                        loading="lazy"
                        decoding="async"
                        width={145}
                        height={48}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DIRECT CONTACT ACTION HUB (Without Form) */}
          <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl shadow-black/50">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Priame kontakty
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sme vám plne k dispozícii
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Pre bezplatnú cenovú ponuku, obhliadku strechy alebo otázky k fotovoltike a dotáciám nás neváhajte kontaktovať priamo:
              </p>
            </div>

            {/* Prominent CTA Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* Phone CTA */}
              <a
                href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                className="group p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-amber-400/60 transition-all duration-200 text-left flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-full">
                    Zavolať
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold mb-1">
                    Infolinka &amp; Obchodné oddelenie
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white group-hover:text-amber-400 transition-colors tracking-tight">
                    {COMPANY_DETAILS.contact.phone}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-2">
                    {COMPANY_DETAILS.contact.businessHours.workdays}
                  </span>
                </div>
              </a>

              {/* Email CTA */}
              <a
                href={`mailto:${COMPANY_DETAILS.contact.email}?subject=Dopyt%20na%20fotovoltiku%20-%20Marvol%20s.r.o.`}
                className="group p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-sky-400/60 transition-all duration-200 text-left flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <MailIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider bg-sky-400/10 px-2.5 py-1 rounded-full">
                    Napísať
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold mb-1">
                    E-mailové dopyty &amp; Ponuky
                  </span>
                  <span className="text-lg sm:text-xl font-black text-white group-hover:text-sky-400 transition-colors tracking-tight">
                    {COMPANY_DETAILS.contact.email}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-2">
                    Dopyty spracovávame obratom do 24 hodín
                  </span>
                </div>
              </a>

            </div>

            {/* Quick Meta Row (Address & Operating Scope) */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Sídlo: <strong className="text-slate-200">{COMPANY_DETAILS.seat.street}, {COMPANY_DETAILS.seat.city}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Realizácie a bezplatné obhliadky po celom Slovensku</span>
              </div>
            </div>

          </div>

        </main>

        {/* Footer with full statutory legal compliance */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-white text-sm">{COMPANY_DETAILS.legalName}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {COMPANY_DETAILS.seat.street}, {COMPANY_DETAILS.seat.zip} {COMPANY_DETAILS.seat.city} • IČO: {COMPANY_DETAILS.tax.ico} • DIČ: {COMPANY_DETAILS.tax.dic} • IČ DPH: {COMPANY_DETAILS.tax.icDph}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {COMPANY_DETAILS.registry.legalNotice}
              </p>
            </div>
            <div className="text-center md:text-right text-[11px] space-y-1">
              <p>© {new Date().getFullYear()} Marvol s.r.o. Všetky práva vyhradené.</p>
              <p className="text-slate-500">Oficiálny registrovaný zhotoviteľ SIEA (Zelená domácnostiam &amp; Zelená podnikom)</p>
              <p className="pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('openCookieSettings'));
                    }
                  }}
                  className="hover:text-amber-400 transition-colors text-slate-500 hover:underline cursor-pointer"
                  aria-label="Upraviť nastavenia cookies"
                >
                  Nastavenia cookies
                </button>
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
