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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans antialiased relative overflow-hidden pb-16 sm:pb-0">
        
        {/* Subtle Ambient Solar Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-emerald-500/5 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 -right-48 w-[600px] h-[600px] bg-amber-500/10 blur-3xl pointer-events-none -z-10" />

        {/* Top Header Bar (Optimized single-row for mobile & desktop) */}
        <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/logos/logo-marvol.svg"
                alt="Marvol s.r.o. Logo"
                className="h-8 sm:h-11 w-auto max-w-[135px] sm:max-w-[170px] object-contain"
                width={170}
                height={44}
              />
            </div>

            {/* Header Right: Instant Phone Button on Mobile, Green Pill on Desktop */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-400/20 active:scale-95 transition-transform"
                title="Zavolať na infolinku"
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                <span>{COMPANY_DETAILS.contact.phoneNational}</span>
              </a>

              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Marvol · robíme svet zelenším</span>
              </div>
            </div>
          </div>
        </header>

        {/* FULL-WIDTH ZOOMED ROOF HERO WITH SMOOTH DOWNWARD FADING TRANSITION */}
        <section className="relative w-full overflow-hidden min-h-[520px] sm:min-h-[680px] lg:min-h-[800px] flex items-center justify-center">
          {/* Zoomed Macro Photovoltaic Roof Background Image */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img
              src="/images/roof/solar-roof-macro.jpg"
              alt="Detail modernej fotovoltickej elektrárne na streche od Marvol s.r.o."
              className="w-full h-full object-cover object-[center_35%] scale-105 pointer-events-none select-none motion-safe:transition-transform motion-safe:duration-1000"
            />

            {/* Dark contrast base overlay for high text legibility */}
            <div className="absolute inset-0 bg-slate-950/65 backdrop-brightness-[0.82] pointer-events-none" />

            {/* Radial vignette spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.3)_0%,rgba(2,6,23,0.88)_100%)] pointer-events-none" />

            {/* Top gradient fade under header */}
            <div className="absolute inset-x-0 top-0 h-24 sm:h-44 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent pointer-events-none z-10" />

            {/* Bottom fading transition ("miznúci prechod pri scrolle nižšie") */}
            <div className="absolute inset-x-0 bottom-0 h-44 sm:h-80 lg:h-96 bg-gradient-to-b from-transparent via-slate-950/75 to-slate-950 pointer-events-none z-10" />
          </div>

          {/* Foreground Hero Content */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:py-24 md:py-28 text-center flex flex-col items-center justify-center">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-slate-950/85 border border-amber-400/40 text-amber-400 text-[11px] sm:text-sm font-bold tracking-wide mb-4 sm:mb-6 backdrop-blur-md shadow-xl shadow-black/50 max-w-full">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-amber-400"></span>
              </span>
              <span className="truncate sm:whitespace-normal">Servisný režim • Spustenie nového webu čoskoro</span>
            </div>

            {/* Main Title & Value Proposition */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5 drop-shadow-2xl max-w-4xl">
              Na stránke sa usilovne pracuje
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 mt-1.5 sm:mt-3">
                Fotovoltika &amp; montáže v plnom chode
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-sm sm:text-base lg:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow">
              Pripravujeme modernizovaný online systém s interaktívnou kalkulačkou úspor. Všetky technické obhliadky striech, montáže elektrární na kľúč a vybavenie štátnych dotácií SIEA fungujú po celom Slovensku bez obmedzení.
            </p>

            {/* Quick Contact CTAs in Hero */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xs sm:max-w-none mb-8 sm:mb-10">
              <a
                href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-sm hover:from-amber-400 hover:to-amber-300 transition-all duration-200 shadow-xl shadow-amber-500/25 active:scale-[0.98] cursor-pointer"
              >
                <PhoneIcon className="w-4 h-4 shrink-0" />
                <span>Zavolať: {COMPANY_DETAILS.contact.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_DETAILS.contact.email}?subject=Dopyt%20na%20fotovoltiku%20-%20Marvol%20s.r.o.`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 hover:border-amber-400/50 transition-all duration-200 backdrop-blur-md shadow-xl active:scale-[0.98] cursor-pointer"
              >
                <MailIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_DETAILS.contact.email}</span>
              </a>
            </div>

            {/* Downward Scroll Cue */}
            <a
              href="#sluzby"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors cursor-pointer group py-1"
            >
              <span>Zistiť viac o službách a technológiách</span>
              <svg className="w-4 h-4 text-amber-400 animate-bounce group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

          </div>
        </section>

        {/* Main Content Area (Seamlessly emerging from the dark dissolve gradient) */}
        <main id="sluzby" className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
          
          {/* Continuous Operations Banner */}
          <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 text-left flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 shadow-xl shadow-black/40">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
              <AlertCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
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

          {/* Solar Key Metrics Strip (Clean symmetrical 2-col on mobile, 4-col on desktop) */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-10 sm:mb-12">
            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 sm:p-5 text-left shadow-lg shadow-black/20 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] sm:text-xs font-bold mb-1">
                <SunIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Úspora energií</span>
              </div>
              <p className="text-lg sm:text-2xl font-black text-white">až do 80 %</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Na účtoch za elektrinu</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 sm:p-5 text-left shadow-lg shadow-black/20 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] sm:text-xs font-bold mb-1">
                <ShieldIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Dotácia SIEA</span>
              </div>
              <p className="text-lg sm:text-2xl font-black text-white">do 1 150 €</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Zelená domácnostiam</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 sm:p-5 text-left shadow-lg shadow-black/20 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-sky-400 text-[11px] sm:text-xs font-bold mb-1">
                <BoltIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Garancia</span>
              </div>
              <p className="text-lg sm:text-2xl font-black text-white">25 rokov</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Lineárna záruka panelov</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 sm:p-5 text-left shadow-lg shadow-black/20 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 text-[11px] sm:text-xs font-bold mb-1">
                <WrenchIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Revízie OPOS</span>
              </div>
              <p className="text-lg sm:text-2xl font-black text-white">§ 24 technici</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Vlastný personál</p>
            </div>
          </div>

          {/* THEMATIC SOLAR SERVICE CARDS WITH AUTHENTIC PHOTOGRAPHY */}
          <div className="w-full max-w-4xl mb-10 sm:mb-12">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                Solárne portfólio
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Naše špecializované riešenia
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Každú fotovoltickú elektráreň navrhujeme na mieru pre maximálnu sebestačnosť, energetickú nezávislosť a najrýchlejšiu návratnosť investície.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              {SOLAR_SERVICES.map((srv) => (
                <div
                  key={srv.title}
                  className="rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Header */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5">
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
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors mb-1.5">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-3 sm:pt-4">
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
          <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-10 sm:mb-12 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                Jednoduchý proces
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Ako prebieha inštalácia fotovoltiky
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Celý proces od prvého kontaktu až po pripojenie do distribučnej siete zabezpečujeme bez vašich starostí.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
              {PROCESS_STEPS.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.step}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between hover:border-amber-400/40 transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                        <span className="text-lg sm:text-xl font-black text-amber-400 tracking-tight">
                          {step.step}
                        </span>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">
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

          {/* TECHNOLOGICAL PARTNERS STRIP (Continuous Marquee Slider optimized for mobile & desktop) */}
          <div className="w-full max-w-5xl bg-slate-900/40 border border-slate-800/70 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-10 sm:mb-12 overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
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
            <div className="space-y-3 sm:space-y-5">
              {/* Track 1: Gliding Left */}
              <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="flex w-max animate-marquee gap-3 sm:gap-6 items-center">
                  {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((partner, idx) => (
                    <div
                      key={`${partner.id}-row1-${idx}`}
                      className="w-32 sm:w-48 h-14 sm:h-20 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3.5 flex items-center justify-center shrink-0 border border-slate-200 transition-transform active:scale-95"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-7 sm:max-h-12 max-w-[95px] sm:max-w-[145px] w-auto h-auto object-contain"
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
              <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="flex w-max animate-marquee-reverse gap-3 sm:gap-6 items-center">
                  {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((partner, idx) => (
                    <div
                      key={`${partner.id}-row2-${idx}`}
                      className="w-32 sm:w-48 h-14 sm:h-20 bg-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-3.5 flex items-center justify-center shrink-0 border border-slate-200 transition-transform active:scale-95"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-7 sm:max-h-12 max-w-[95px] sm:max-w-[145px] w-auto h-auto object-contain"
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

          {/* DIRECT CONTACT ACTION HUB */}
          <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-12 sm:mb-16 shadow-2xl shadow-black/50">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                Priame kontakty
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                Sme vám plne k dispozícii
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Pre bezplatnú cenovú ponuku, obhliadku strechy alebo otázky k fotovoltike a dotáciám nás neváhajte kontaktovať priamo:
              </p>
            </div>

            {/* Prominent CTA Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
              
              {/* Phone CTA */}
              <a
                href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-amber-400/60 transition-all duration-200 text-left flex flex-col justify-between active:scale-[0.98] sm:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
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
                  <span className="block text-[11px] text-slate-500 mt-1.5 sm:mt-2">
                    {COMPANY_DETAILS.contact.businessHours.workdays}
                  </span>
                </div>
              </a>

              {/* Email CTA */}
              <a
                href={`mailto:${COMPANY_DETAILS.contact.email}?subject=Dopyt%20na%20fotovoltiku%20-%20Marvol%20s.r.o.`}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-sky-400/60 transition-all duration-200 text-left flex flex-col justify-between active:scale-[0.98] sm:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <MailIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider bg-sky-400/10 px-2.5 py-1 rounded-full">
                    Napísať
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 font-semibold mb-1">
                    E-mailové dopyty &amp; Ponuky
                  </span>
                  <span className="text-base sm:text-xl font-black text-white group-hover:text-sky-400 transition-colors tracking-tight break-all sm:break-normal">
                    {COMPANY_DETAILS.contact.email}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1.5 sm:mt-2">
                    Dopyty spracovávame obratom do 24 hodín
                  </span>
                </div>
              </a>

            </div>

            {/* Quick Meta Row (Address & Operating Scope) */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-400 text-left">
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

        {/* Sticky Mobile Contact Quick-Bar (Fixed at bottom for instant 1-tap conversion on phone) */}
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-3 py-2.5 flex items-center gap-2 shadow-2xl shadow-black">
          <a
            href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs active:scale-[0.98] transition-transform shadow-md shadow-amber-400/20"
          >
            <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Zavolať ({COMPANY_DETAILS.contact.phoneNational})</span>
          </a>
          <a
            href={`mailto:${COMPANY_DETAILS.contact.email}?subject=Dopyt%20na%20fotovoltiku%20-%20Marvol%20s.r.o.`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs active:scale-[0.98] transition-transform"
          >
            <MailIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Napísať e-mail</span>
          </a>
        </div>

      </div>
    </>
  );
}
