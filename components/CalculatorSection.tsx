import React, { useState } from 'react';
import Link from 'next/link';

export const CalculatorSection: React.FC = () => {
  const [propertyType, setPropertyType] = useState<'home' | 'business'>('home');
  const [monthlyBill, setMonthlyBill] = useState<number>(140);
  const [hasBattery, setHasBattery] = useState<boolean>(true);
  const [hasEV, setHasEV] = useState<boolean>(false);
  const [gdprConsent, setGdprConsent] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form inputs for inquiry
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');

  // Calculations with EV & Business support
  const annualBill = monthlyBill * 12;
  const baseKwp = monthlyBill / 16;
  const evKwp = hasEV ? 1.5 : 0;
  const recommendedKwp = Math.min(Math.max(Math.round((baseKwp + evKwp) * 10) / 10, 3), 250);
  
  // Bound savings physically by PV output
  const annualKwhProduction = recommendedKwp * 1050;
  const maxAnnualSavingsValue = annualKwhProduction * 0.22;
  const rawSavings = Math.round(annualBill * (hasBattery ? 0.78 : 0.55));
  const estimatedSavings = Math.min(rawSavings, Math.round(maxAnnualSavingsValue));
  
  // SIEA / Zelená domácnostiam voucher rules
  const estimatedSubsidy = propertyType === 'home' 
    ? Math.min(recommendedKwp * 500 + (hasBattery ? 1500 : 0), 4025) 
    : 0;

  const estimatedSystemPrice = Math.round(recommendedKwp * 1050 + (hasBattery ? 3200 : 0) + (hasEV ? 950 : 0));
  const netPrice = Math.max(estimatedSystemPrice - estimatedSubsidy, 2200);
  const paybackYears = estimatedSavings > 0 ? (netPrice / estimatedSavings).toFixed(1) : '4.5';

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
          name,
          phone,
          email,
          city,
          propertyType,
          monthlyBill,
          hasBattery,
          hasEV,
          recommendedKwp,
          estimatedSavings,
          netPrice,
          source: 'calculator_section'
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
    <section id="kalkulacka" className="py-24 bg-hero-pattern text-white relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
            Interaktívny Výpočet
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Kalkulačka úspory & Návrh zdarma
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Zistite, koľko môžete ušetriť s fotovoltickým systémom od Marvol s.r.o. a akú dotáciu môžete získať.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Property Type Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Typ objektu
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType('home')}
                  className={`py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                    propertyType === 'home'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>🏡 Rodinný dom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('business')}
                  className={`py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                    propertyType === 'business'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>🏢 Firma / Objekt</span>
                </button>
              </div>
            </div>

            {/* Monthly Electricity Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Mesačná platba za elektrinu (€)
                </label>
                <span className="text-2xl font-black text-amber-400">{monthlyBill} € / mesiac</span>
              </div>
              <input
                type="range"
                min="50"
                max={propertyType === 'home' ? 800 : 3000}
                step={propertyType === 'home' ? 10 : 50}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-800"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>50 €</span>
                <span>250 €</span>
                <span>{propertyType === 'home' ? '500 €' : '1 500 €'}</span>
                <span>{propertyType === 'home' ? '800 €+' : '3 000 €+'}</span>
              </div>
            </div>

            {/* Battery & EV Toggles */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Príslušenstvo & Rozšírenia
              </label>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔋</span>
                    <div>
                      <p className="font-bold text-white text-sm">Batériové úložisko (BESS)</p>
                      <p className="text-xs text-slate-400">Pre uchovanie prebytkov na večer a noc</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasBattery}
                    onChange={(e) => setHasBattery(e.target.checked)}
                    className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚗</span>
                    <div>
                      <p className="font-bold text-white text-sm">Wallbox nabíjanie elektromobilu (+1.5 kWp)</p>
                      <p className="text-xs text-slate-400">Inteligentné nabíjanie zo slnečných prebytkov</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasEV}
                    onChange={(e) => setHasEV(e.target.checked)}
                    className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Results & Lead Form Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Calculation Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>📊 Odhadovaný výkon & Návratnosť</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-medium">Odporúčaný výkon</p>
                  <p className="text-xl font-black text-white mt-1">{recommendedKwp} kWp</p>
                  <p className="text-[10px] text-slate-500 mt-1">cca {Math.round(recommendedKwp * 2.2)} panelov</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-medium">Ročná úspora</p>
                  <p className="text-xl font-black text-emerald-400 mt-1">{estimatedSavings} € / rok</p>
                  <p className="text-[10px] text-slate-500 mt-1">úspora až {hasBattery ? '78%' : '55%'}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-medium">Štátna dotácia</p>
                  <p className="text-xl font-black text-amber-400 mt-1">
                    {estimatedSubsidy > 0 ? `${estimatedSubsidy} €` : 'Zelená podnikom'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">{propertyType === 'home' ? 'Zelená domácnostiam' : 'B2B Schéma'}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[11px] text-slate-400 font-medium">Odhadovaná návratnosť</p>
                  <p className="text-xl font-black text-sky-400 mt-1">{paybackYears} roka</p>
                  <p className="text-[10px] text-slate-500 mt-1">pri súčasných cenách</p>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 rounded-2xl border border-amber-500/30 col-span-2 sm:col-span-2">
                  <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Odhadovaná investícia po dotácii</p>
                  <p className="text-2xl font-black text-white mt-0.5">od {netPrice.toLocaleString('sk-SK')} €</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Vrátane montáže, meniča a revízie</p>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="border-t border-slate-800 pt-6">
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-bold text-xl mx-auto">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Ďakujeme! Váš dopyt bol úspešne odoslaný.</h4>
                  <p className="text-sm text-slate-300">
                    Náš obchodno-technický poradca z Marvol s.r.o. vás bude kontaktovať do 24 hodín s presnou ponukou a termínom obhliadky zdarma.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Získať nezáväznú ponuku & obhliadku ZDARMA
                  </h4>

                  {errorMsg && (
                    <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-300">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Meno a Priezvisko *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ján Novák"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Telefónne číslo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+421 900 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">E-mailová adresa</label>
                      <input
                        type="email"
                        placeholder="jan.novak@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Mesto / Obec realizácie</label>
                      <input
                        type="text"
                        placeholder="napr. Žilina, Martin, Vrútky..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="gdpr-calc"
                      required
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="w-4 h-4 mt-0.5 accent-amber-400 rounded cursor-pointer"
                    />
                    <label htmlFor="gdpr-calc" className="text-[11px] text-slate-400 leading-tight cursor-pointer">
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
                    className="w-full py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:opacity-95 transition-all text-sm shadow-xl shadow-amber-500/20 disabled:opacity-50"
                  >
                    {submitting ? 'Odosielam dopyt...' : 'Odoslať dopyt na obhliadku ZDARMA'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
