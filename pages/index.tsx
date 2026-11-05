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
} from '@/components/icons';

const PARTNER_LOGOS = [
  { name: 'AIKO Solar', logo: '/logos/partners/aiko.svg' },
  { name: 'GoodWe', logo: '/logos/partners/goodwe.svg' },
  { name: 'Sungrow', logo: '/logos/partners/sungrow.svg' },
  { name: 'LONGi Solar', logo: '/logos/partners/longi.png' },
  { name: 'Trina Solar', logo: '/logos/partners/trina-solar.svg' },
  { name: 'Pylontech', logo: '/logos/partners/pylontech.svg' },
  { name: 'Solinteg', logo: '/logos/partners/solinteg.svg' },
  { name: 'Schrack Technik', logo: '/logos/partners/schrack.svg' },
];

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Prebieha údržba | Marvol s.r.o. - Špecialista na fotovoltiku</title>
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-emerald-500/5 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-amber-500/5 blur-3xl pointer-events-none -z-10" />

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

          {/* THEMATIC HERO SHOWCASE: Fotovoltika na kľúč (Visual Highlight) */}
          <div className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-black/60 text-left">
            <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
              <img
                src="/images/fotovoltika-domacnosti/hero.jpg"
                alt="Fotovoltické inštalácie na rodinné domy Marvol s.r.o."
                className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Badges on image */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <SunIcon className="w-3.5 h-3.5" />
                  <span>Fotovoltika na kľúč</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/30 text-emerald-400 text-xs font-bold">
                  <ShieldIcon className="w-3.5 h-3.5" />
                  <span>Záruka na výkon 25 rokov</span>
                </span>
              </div>

              {/* Bottom caption on image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                  Kompletné fotovoltické systémy pre rodinné domy a firmy
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl drop-shadow">
                  Od technického návrhu, statiky strechy a vybavenia dotácie až po montáž, revíznu správu a pripojenie do distribučnej siete.
                </p>
              </div>
            </div>

            {/* Solar Key Metrics Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-950/60 p-4 sm:p-5">
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

          {/* THEMATIC SERVICE CARDS (Primárne Fotovoltika) */}
          <div className="w-full max-w-4xl mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Naša špecializácia
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Čo pre vás realizujeme
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Každé riešenie navrhujeme na mieru konkrétnemu objektu pre maximálny solárny zisk a najrýchlejšiu návratnosť.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              
              {/* Card 1: Fotovoltika pre rodinné domy (Highlight) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/70 border border-amber-400/40 relative group hover:border-amber-400 transition-colors shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <SunIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full">
                    Hlavná služba
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-1.5">
                  Fotovoltika pre rodinné domy
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Solárne elektrárne na kľúč pre zníženie závislosti od drahej elektriny. Zabezpečujeme dotáciu z programu Zelená domácnostiam (až 1 150 €).
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Celočierne Tier-1 N-Type TOPCon panely</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Hybridné striedače so zálohou pri výpadku</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Kompletná administratíva a pripojenie do siete</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Komerčná fotovoltika pre firmy */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-400/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                    <BuildingOfficeIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-sky-400/10 text-sky-300 border border-sky-400/20 px-2.5 py-1 rounded-full">
                    B2B &amp; Priemysel
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-1.5">
                  Komerčná fotovoltika pre firmy a haly
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Priemyselné solárne inštalácie od 30 kWp do 1 MWp. Zníženie prevádzkových nákladov podniku a podpora z programu Zelená podnikom.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Energetický audit a statické posudky striech</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Vlastné trafostanice a pripojenie k distribučnej sieti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Fixácia cien elektrickej energie na 25+ rokov</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Batériové úložiská BESS */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-400/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <BatteryIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    Energetická rezerva
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-1.5">
                  Batériové úložiská BESS &amp; Wallbox
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Ukladajte nespotrebovanú solárnu energiu pre večernú a nočnú spotrebu. Plná ochrana pred výpadkom distribučnej siete vďaka funkcii Back-up.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Bezpečné modulárne LiFePO4 batérie s dlhou životnosťou</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automatické prepnutie na záložné napájanie do 20 ms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Inteligentné solárne nabíjanie elektromobilov (EV)</span>
                  </li>
                </ul>
              </div>

              {/* Card 4: Tepelné čerpadlá a revízie */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <HeatPumpIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    Synergia &amp; Dotácie
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mb-1.5">
                  Tepelné čerpadlá a úradné revízie
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Vykurovanie poháňané priamo vašou fotovoltikou. Štátna dotácia SIEA až 4 600 € (v schéme Zelená solidarita až do 90 % nákladov).
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Invertorové tepelné čerpadlá triedy A+++ (vzduch-voda)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Úradné revízne správy (OPOS) podľa platných noriem STN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Záručný a pozáručný servis solárnych technológií</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* TECHNOLOGICAL PARTNERS STRIP */}
          <div className="w-full max-w-4xl bg-slate-900/40 border border-slate-800/70 rounded-3xl p-6 sm:p-8 mb-12">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Svetoví lídri v solárnej energetike
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-1">
                Technológie, ktorým dôverujeme
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pracujeme výhradne s certifikovanými výrobcami s oficiálnym zastúpením v EÚ a dlhoročnou zárukou:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {PARTNER_LOGOS.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white rounded-xl p-3.5 flex items-center justify-center border border-slate-200 shadow-sm hover:scale-105 transition-transform"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-7 sm:max-h-8 max-w-[110px] w-auto h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                    width={110}
                    height={32}
                  />
                </div>
              ))}
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
