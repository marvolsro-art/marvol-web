import React, { useState } from 'react';
import Head from 'next/head';
import { COMPANY_DETAILS } from '@/constants/company';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  CheckIcon,
  ShieldIcon,
  SunIcon,
  BoltIcon,
  AlertCircleIcon,
  ClockIcon,
} from '@/components/icons';

const PHONE_REGEX = /^[+0-9\s-]{9,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MaintenancePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'dom' | 'firma' | 'bateria' | 'cerpadlo'>('dom');
  const [message, setMessage] = useState('');
  const [bUrl, setBUrl] = useState(''); // honeypot
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setErrorMsg('Prosím, zadajte vaše meno a priezvisko (aspoň 2 znaky).');
      return;
    }

    const trimmedPhone = phone.trim();
    if (!PHONE_REGEX.test(trimmedPhone)) {
      setErrorMsg('Prosím, zadajte platné telefónne číslo (napr. +421 900 000 000).');
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMsg('Prosím, zadajte platnú e-mailovú adresu.');
      return;
    }

    if (!gdprConsent) {
      setErrorMsg('Pre odoslanie dopytu musíte potvrdiť súhlas so spracovaním osobných údajov.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          email: trimmedEmail || undefined,
          service: `servisny-rezim-${interest}`,
          message: message.trim() || `Dopyt zo servisnej stránky (záujem: ${interest}).`,
          source: 'maintenance_page',
          b_url: bUrl,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Chyba pri odosielaní. Skontrolujte prosím údaje a skúste znova.');
      }
    } catch {
      setErrorMsg('Nastala chyba spojenia so serverom. Skúste to prosím znova.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Prebieha údržba | Marvol s.r.o. - Fotovoltické riešenia na kľúč</title>
        <meta
          name="description"
          content="Na stránke Marvol s.r.o. prebieha plánovaná technická údržba. Pripravujeme pre vás modernizovaný web pre fotovoltiku, batériové úložiská BESS a tepelné čerpadlá. Sme vám plne k dispozícii na +421 948 123 456 alebo info@marvol.sk."
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
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Marvol · robíme svet zelenším</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center justify-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs sm:text-sm font-bold tracking-wide mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>Servisný režim • Spustenie už čoskoro</span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center max-w-3xl space-y-4 mb-10">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Na stránke sa usilovne pracuje
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Aktuálne prebieha technická modernizácia našich systémov a online kalkulácií. Pripravujeme pre vás nový, rýchlejší web pre komplexné solárne riešenia.
            </p>
          </div>

          {/* Operations Notice Box */}
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-400">
              <AlertCircleIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-white">
                Všetky naše služby, montáže a technické obhliadky fungujú bez obmedzení
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Náš tím inžinierov a certifikovaných montážnikov realizuje inštalácie fotovoltiky a vybavuje štátne dotácie SIEA po celom Slovensku v štandardnom režime.
              </p>
            </div>
          </div>

          {/* 3 Trust Strip Pillars */}
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                <SunIcon className="w-4 h-4" />
                <span>Dotácia SIEA</span>
              </div>
              <p className="text-base font-black text-white">do 1 150 € / 4 600 €</p>
              <p className="text-xs text-slate-400 mt-0.5">Zelená domácnostiam &amp; podnikom</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <ShieldIcon className="w-4 h-4" />
                <span>Garancia a bezpečnosť</span>
              </div>
              <p className="text-base font-black text-white">25 rokov záruka</p>
              <p className="text-xs text-slate-400 mt-0.5">Vlastní revízni technici § 24</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-left">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-1">
                <BoltIcon className="w-4 h-4" />
                <span>Obhliadka zdarma</span>
              </div>
              <p className="text-base font-black text-white">Celé Slovensko</p>
              <p className="text-xs text-slate-400 mt-0.5">Bezplatný návrh a kalkulácia</p>
            </div>
          </div>

          {/* Quick Contact & Lead Form Grid */}
          <div className="w-full max-w-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
            
            {/* Direct Contact Cards (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Priamy kontakt
                </span>
                <h3 className="text-xl font-black text-white">
                  Sme vám plne k dispozícii
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ozvite sa nám telefonicky alebo e-mailom a pripravíme vám nezáväzný technický návrh.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                    <PhoneIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-semibold">Infolinka &amp; Obchod</span>
                    <span className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_DETAILS.contact.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-semibold">E-mailové dopyty</span>
                    <span className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition-colors">
                      {COMPANY_DETAILS.contact.email}
                    </span>
                  </div>
                </a>

                {/* Office hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/60">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    <ClockIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-semibold">Dostupnosť</span>
                    <span className="text-xs font-bold text-slate-300">
                      {COMPANY_DETAILS.contact.businessHours.shortDisplay}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                Sídlo: {COMPANY_DETAILS.seat.street}, {COMPANY_DETAILS.seat.city}
              </div>
            </div>

            {/* Callback / Quick Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-white">Ďakujeme za váš dopyt!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
                    Vaša správa bola úspešne doručená nášmu tímu. Budeme vás kontaktovať najneskôr do 24 hodín s bezplatnou cenovou ponukou.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="text-xs text-amber-400 font-bold hover:underline pt-2 cursor-pointer"
                  >
                    Odoslať ďalšiu správu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">Zanechajte nám správu</h3>
                    <p className="text-xs text-slate-400">
                      Zadajte svoj kontakt a pripravíme vám nezáväznú kalkuláciu na mieru.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircleIcon className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot anti-spam trap */}
                  <input
                    type="text"
                    name="b_url"
                    value={bUrl}
                    onChange={(e) => setBUrl(e.target.value)}
                    style={{ display: 'none', position: 'absolute', opacity: 0 }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Category Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Mám záujem o:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setInterest('dom')}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          interest === 'dom'
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Rodinný dom
                      </button>
                      <button
                        type="button"
                        onClick={() => setInterest('firma')}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          interest === 'firma'
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Firma / Priemysel
                      </button>
                      <button
                        type="button"
                        onClick={() => setInterest('bateria')}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          interest === 'bateria'
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Batériové úložisko BESS
                      </button>
                      <button
                        type="button"
                        onClick={() => setInterest('cerpadlo')}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          interest === 'cerpadlo'
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        Tepelné čerpadlo
                      </button>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="m-name" className="text-xs font-semibold text-slate-300">
                      Meno a priezvisko *
                    </label>
                    <input
                      id="m-name"
                      type="text"
                      required
                      placeholder="napr. Peter Novák"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Phone & Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="m-phone" className="text-xs font-semibold text-slate-300">
                        Telefónne číslo *
                      </label>
                      <input
                        id="m-phone"
                        type="tel"
                        required
                        placeholder="+421 900 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="m-email" className="text-xs font-semibold text-slate-300">
                        E-mail <span className="text-slate-500 font-normal">(voliteľné)</span>
                      </label>
                      <input
                        id="m-email"
                        type="email"
                        placeholder="vas@email.sk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1">
                    <label htmlFor="m-message" className="text-xs font-semibold text-slate-300">
                      Poznámka / Lokalita inštalácie <span className="text-slate-500 font-normal">(voliteľné)</span>
                    </label>
                    <textarea
                      id="m-message"
                      rows={2}
                      placeholder="napr. Rodinný dom v Žiline, ročná spotreba cca 4 000 kWh..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  {/* GDPR Consent */}
                  <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-amber-400 shrink-0"
                    />
                    <span>
                      Súhlasím so spracovaním osobných údajov spoločnosťou Marvol s.r.o. za účelom kontaktovania a vypracovania cenovej ponuky.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full min-h-[46px] py-3 px-6 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? (
                      <span>Odosielam...</span>
                    ) : (
                      <>
                        <span>Odoslať nezáväzný dopyt</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-white text-sm">Marvol s. r. o.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Chotárna 3394/6, 038 61 Vrútky • IČO: 53 060 091 • DIČ: 2121255961 • IČ DPH: SK2121255961
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Zapísaná v Obchodnom registri Okresného súdu Žilina, oddiel: Sro, vložka č. 74765/L
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
