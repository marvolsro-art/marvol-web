import React, { useState } from 'react';
import Link from 'next/link';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [gdprConsent, setGdprConsent] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'fotovoltika-dom',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      setErrorMsg('Pre odoslanie dopytu musíte súhlasiť so spracovaním osobných údajov.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          source: 'contact_section'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Chyba pri spracovaní dopytu.');
      }
    } catch (err) {
      setErrorMsg('Nastala chyba spojenia so serverom. Skúste to prosím znova.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-24 bg-hero-pattern text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Kontaktujte Nás
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Bezplatná konzultácia & Obhliadka
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Ozvite sa nám ešte dnes. Pripravíme vám nezáväzný návrh fotovoltického systému na mieru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-8 shadow-2xl">
            
            <div className="space-y-3 border-b border-slate-800 pb-6">
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">Oficiálne údaje spoločnosti</span>
              <h3 className="text-2xl font-black text-white">Marvol s. r. o.</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Váš špecializovaný partner pre fotovoltické elektrárne, batériové úložiská, tepelné čerpadlá a elektroinštalácie na kľúč po celom Slovensku.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Infolinka & Obchod</p>
                  <a href="tel:+421948123456" className="text-lg font-black text-white hover:text-amber-400 transition-colors">
                    +421 948 123 456
                  </a>
                  <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Po - Pia: 8:00 - 18:00</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-xl shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">E-mailová adresa</p>
                  <a href="mailto:info@marvol.sk" className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                    info@marvol.sk
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Odpovedáme do 24 hodín</p>
                </div>
              </div>

              {/* Company Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sídlo & Registrácia</p>
                  <p className="text-sm font-bold text-white">Chotárna 3394/6, 038 61 Vrútky</p>
                  <p className="text-xs text-slate-400 mt-0.5">IČO: 53 060 091 | DIČ: 2121255961</p>
                  <p className="text-[11px] text-slate-500">OR OS Žilina, odd. Sro, vl. č. 74765/L</p>
                </div>
              </div>
            </div>

            {/* State subsidies badge */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-bold text-emerald-400">Oprávnený zhotoviteľ dotácií</p>
                <p className="text-[11px] text-slate-400">Zelená domácnostiam & Zelená podnikom</p>
              </div>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-black text-2xl mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Správa bola úspešne odoslaná!</h3>
                <p className="text-slate-300 text-sm">
                  Ďakujeme za záujem o služby spoločnosti <strong>Marvol s.r.o.</strong> Náš obchodno-technický poradca vás bude kontaktovať v najkratšom možnom čase.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black text-white mb-2">
                  Nezáväzný dopyt & konzultácia
                </h3>

                {errorMsg && (
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-300">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Meno a Priezvisko *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ján Novák"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Telefónne číslo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+421 900 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      E-mailová adresa *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jan.novak@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Požadovaná služba
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="fotovoltika-dom">Fotovoltika pre rodinný dom</option>
                      <option value="fotovoltika-firma">Fotovoltika pre firmu / objekt</option>
                      <option value="baterie">Batériové úložisko & Wallbox</option>
                      <option value="cerpadlo">Tepelné čerpadlo</option>
                      <option value="elektro">Elektroinštalácie & Revízie</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Poznámka / Detaily nehnuteľnosti
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Uveďte typ strechy, odhadovanú spotrebu alebo lokalitu..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="gdpr-contact"
                    required
                    checked={gdprConsent}
                    onChange={(e) => setGdprConsent(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-amber-400 rounded cursor-pointer"
                  />
                  <label htmlFor="gdpr-contact" className="text-[11px] text-slate-400 leading-tight cursor-pointer">
                    Súhlasím so spracovaním osobných údajov spoločnosťou Marvol s.r.o. podľa{' '}
                    <Link href="/ochrana-osobnych-udajov" target="_blank" className="text-amber-400 underline">
                      Zásad GDPR
                    </Link>{' '}
                    pre účely vypracovania cenovej ponuky.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 transition-all text-base shadow-xl shadow-amber-500/25 disabled:opacity-50"
                >
                  {submitting ? 'Odosielam dopyt...' : 'Odoslať dopyt na obhliadku zdarma'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
