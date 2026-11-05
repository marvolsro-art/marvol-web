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
  ClockIcon,
  CheckIcon,
} from '@/components/icons';

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title>Prebieha údržba | Marvol s.r.o. - Fotovoltické riešenia na kľúč</title>
        <meta
          name="description"
          content={`Na stránke Marvol s.r.o. prebieha plánovaná technická údržba. Všetky montáže fotovoltiky, revízie a technické obhliadky po celom Slovensku fungujú bez obmedzení. Sme vám k dispozícii na ${COMPANY_DETAILS.contact.phone} alebo ${COMPANY_DETAILS.contact.email}.`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
        
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
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center">
          
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
              Aktuálne prebieha technická modernizácia našich digitálnych systémov a online kalkulácií. Pripravujeme pre vás nový, rýchlejší web pre fotovoltiku, batériové úložiská BESS a tepelné čerpadlá.
            </p>
          </div>

          {/* Operations Notice Box */}
          <div className="w-full max-w-3xl bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 text-left flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xl shadow-black/40">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
              <AlertCircleIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-white">
                Všetky naše služby, montáže a technické obhliadky fungujú bez obmedzení
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Náš tím inžinierov a certifikovaných montážnikov realizuje inštalácie fotovoltických elektrární, revízie a vybavovanie štátnych dotácií SIEA po celom Slovensku v štandardnom režime.
              </p>
            </div>
          </div>

          {/* Direct Contact Action Hub (Without Form) */}
          <div className="w-full max-w-3xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl shadow-black/50">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Priame kontakty
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sme vám plne k dispozícii
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Pre bezplatnú cenovú ponuku, obhliadku strechy alebo technické poradenstvo nás neváhajte kontaktovať priamo:
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

          {/* 3 Trust Strip Pillars */}
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <SunIcon className="w-4 h-4" />
                <span>Dotácie SIEA</span>
              </div>
              <p className="text-base font-black text-white">do 1 150 € / 4 600 €</p>
              <p className="text-xs text-slate-400 mt-0.5">Zelená domácnostiam &amp; podnikom</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <ShieldIcon className="w-4 h-4" />
                <span>Garancia a bezpečnosť</span>
              </div>
              <p className="text-base font-black text-white">25 rokov záruka</p>
              <p className="text-xs text-slate-400 mt-0.5">Vlastní revízni technici § 24</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-left">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-1">
                <BoltIcon className="w-4 h-4" />
                <span>Obhliadka zdarma</span>
              </div>
              <p className="text-base font-black text-white">Celé Slovensko</p>
              <p className="text-xs text-slate-400 mt-0.5">Bezplatný návrh a kalkulácia</p>
            </div>
          </div>

          {/* Scope of Services Badges */}
          <div className="w-full max-w-3xl flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              ⚡ Fotovoltika pre rodinné domy
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🏢 Komerčné solárne riešenia pre firmy
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🔋 Batériové úložiská BESS
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🌡️ Tepelné čerpadlá
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              🛠️ Elektroinštalácie a revízie
            </span>
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
            <div className="text-center md:text-right text-[11px]">
              <p>© {new Date().getFullYear()} Marvol s.r.o. Všetky práva vyhradené.</p>
              <p className="text-slate-500 mt-0.5">Oficiálny registrovaný zhotoviteľ SIEA (Zelená domácnostiam &amp; Zelená podnikom)</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
