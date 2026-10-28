import React, { useState } from 'react';
import Link from 'next/link';
import {
  SunIcon,
  BatteryIcon,
  HeatPumpIcon,
  BoltIcon,
  CarIcon,
  CheckIcon,
  HomeIcon,
  BuildingOfficeIcon,
  AlertCircleIcon,
} from '@/components/icons';

export interface CalculatorSectionProps {
  className?: string;
  defaultPropertyType?: 'home' | 'business';
  defaultMonthlyBill?: number;
}

const PHONE_REGEX = /^[+0-9\s-]{9,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  className = '',
  defaultPropertyType = 'home',
  defaultMonthlyBill = 140,
}) => {
  const [propertyType, setPropertyType] = useState<'home' | 'business'>(defaultPropertyType);
  const [monthlyBill, setMonthlyBill] = useState<number>(defaultMonthlyBill);
  const [hasBattery, setHasBattery] = useState<boolean>(true);
  const [hasHeatPump, setHasHeatPump] = useState<boolean>(false);
  const [hasEV, setHasEV] = useState<boolean>(false);

  // Quick inquiry form state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [bUrl, setBUrl] = useState<string>(''); // Honeypot spam trap
  const [gdprConsent, setGdprConsent] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 1. Capacity formula: clamp(round(M/16 + 1.5*EV + 2.0*HP, 1), 3.0, 25.0) for domestic; up to 250 kWp for commercial
  const annualBill = monthlyBill * 12;
  const baseKwp = monthlyBill / 16;
  const evKwp = hasEV ? 1.5 : 0;
  const hpKwp = hasHeatPump ? 2.0 : 0;
  const maxKwp = propertyType === 'home' ? 25 : 250;
  const recommendedKwp = Math.min(
    Math.max(Math.round((baseKwp + (propertyType === 'home' ? evKwp + hpKwp : 0)) * 10) / 10, 3),
    maxKwp
  );

  // 2. Physical production ceiling (1050 kWh/kWp * 0.22 €/kWh)
  const annualKwhProduction = recommendedKwp * 1050;
  const maxAnnualSavingsValue = annualKwhProduction * 0.22;

  // 3. Self-consumption rates: 0.82 (battery + HP), 0.78 (battery), 0.60 (HP), 0.55 (basic)
  const selfConsumptionRate = hasHeatPump
    ? (hasBattery ? 0.82 : 0.60)
    : (hasBattery ? 0.78 : 0.55);

  const rawSavings = Math.round(annualBill * selfConsumptionRate);
  const estimatedSavings = Math.min(rawSavings, Math.round(maxAnnualSavingsValue));

  // 4. State subsidies: SIEA PV (575 €/kW, max 2 kW = 1 150 € cap) + Heat Pump (up to 4 600 €) = 5 750 € max combined
  const pvSubsidy = propertyType === 'home'
    ? Math.min(Math.round(Math.min(recommendedKwp, 2) * 575), 1150)
    : 0;
  const hpSubsidy = (propertyType === 'home' && hasHeatPump) ? 4600 : 0;
  const estimatedSubsidy = pvSubsidy + hpSubsidy;

  // 5. Pricing and payback period
  const estimatedSystemPrice = Math.round(
    recommendedKwp * 1050 +
    (hasBattery ? 3200 : 0) +
    (hasEV ? 950 : 0) +
    (hasHeatPump ? 7800 : 0)
  );
  const netPrice = Math.max(estimatedSystemPrice - estimatedSubsidy, 2200);
  const paybackYears = estimatedSavings > 0 ? (netPrice / estimatedSavings).toFixed(1) : '4.5';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setErrorMsg('Prosím, zadajte vaše platné meno a priezvisko (aspoň 2 znaky).');
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
          city: city.trim() || undefined,
          propertyType,
          monthlyBill,
          hasBattery,
          hasHeatPump,
          hasEV,
          recommendedKwp,
          estimatedSavings,
          netPrice,
          subsidy: estimatedSubsidy,
          b_url: bUrl,
          source: 'calculator_section',
          service: propertyType === 'home' ? 'fotovoltika-dom' : 'fotovoltika-firma',
          message: `Kalkulačka úspor Marvol: Typ: ${propertyType === 'home' ? 'Rodinný dom' : 'Firma'}, Mesačná platba: ${monthlyBill} €/mes, Výkon: ${recommendedKwp} kWp, Odhadovaná úspora: ${estimatedSavings} €/rok, Batéria: ${hasBattery ? 'Áno' : 'Nie'}, Tepelné čerpadlo: ${hasHeatPump ? 'Áno' : 'Nie'}, EV Wallbox: ${hasEV ? 'Áno' : 'Nie'}, Dotácia: ${estimatedSubsidy} €.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setSubmittedLeadId(data.leadId || `LEAD-${Date.now()}`);
      } else {
        setErrorMsg(data.message || 'Chyba pri spracovaní dopytu. Skontrolujte prosím údaje a skúste znova.');
      }
    } catch {
      setErrorMsg('Nastala chyba spojenia so serverom. Skúste to prosím znova.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="kalkulacka" className={`py-20 sm:py-28 bg-slate-950 text-slate-100 relative scroll-mt-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold">
            <BoltIcon className="w-4 h-4 text-amber-400" />
            <span>Interaktívna kalkulácia úspor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nakonfigurujte si solárnu elektráreň a dotáciu na mieru
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Zistite, koľko môžete ušetriť s fotovoltikou Marvol s.r.o. a akú štátnu dotáciu SIEA môžete získať (až do 1 150 € na fotovoltiku, do 4 600 € na tepelné čerpadlo, kombinovane do 5 750 €).
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-7">
            
            {/* 1. Property Type Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                <span>1. Typ nehnuteľnosti</span>
                <span className="text-xs text-slate-500 font-normal">Zvoľte kategóriu</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyType('home')}
                  className={`min-h-[48px] py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-colors cursor-pointer active:scale-[0.98] ${
                    propertyType === 'home'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <HomeIcon className={`w-4 h-4 ${propertyType === 'home' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>Rodinný dom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType('business')}
                  className={`min-h-[48px] py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 border transition-colors cursor-pointer active:scale-[0.98] ${
                    propertyType === 'business'
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-black'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <BuildingOfficeIcon className={`w-4 h-4 ${propertyType === 'business' ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>Firma / Objekt</span>
                </button>
              </div>
            </div>

            {/* 2. Monthly Electricity Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="calc-monthly-bill" className="text-sm font-medium text-slate-300 block">
                    2. Mesačná platba za elektrinu
                  </label>
                  <span className="text-xs text-slate-500">Približná suma na mesačnej faktúre</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  {monthlyBill} € <span className="text-xs font-normal text-slate-400">/ mes.</span>
                </div>
              </div>

              <input
                id="calc-monthly-bill"
                type="range"
                min="50"
                max={propertyType === 'home' ? 800 : 3000}
                step={propertyType === 'home' ? 10 : 50}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-12 py-3 bg-transparent rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>50 €</span>
                <span>250 €</span>
                <span>{propertyType === 'home' ? '500 €' : '1 500 €'}</span>
                <span>{propertyType === 'home' ? '800 €' : '3 000 €+'}</span>
              </div>
            </div>

            {/* 3. Technology Toggles: BESS Battery, Heat Pump, EV Wallbox */}
            <div className="space-y-3 pt-1">
              <label className="text-sm font-medium text-slate-300 block">
                3. Technológie &amp; akumulácia
              </label>

              {/* BESS Battery Toggle */}
              <button
                type="button"
                onClick={() => setHasBattery(!hasBattery)}
                className={`w-full min-h-[56px] p-4 rounded-2xl border text-left transition-colors duration-200 flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                  hasBattery
                    ? 'border-amber-400/40 bg-amber-400/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hasBattery ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-900 text-slate-500'}`}>
                    <BatteryIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>Batériové úložisko LiFePO4 (BESS)</span>
                      {hasBattery && <CheckIcon className="w-3.5 h-3.5 text-amber-400" />}
                    </p>
                    <p className="text-xs text-slate-400">Uloženie prebytkov na noc a záloha UPS pri výpadku</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${hasBattery ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold' : 'border-slate-700 bg-slate-900'}`}>
                  {hasBattery && <CheckIcon className="w-3.5 h-3.5 text-slate-950" />}
                </div>
              </button>

              {/* Heat Pump Toggle */}
              <button
                type="button"
                onClick={() => setHasHeatPump(!hasHeatPump)}
                className={`w-full min-h-[56px] p-4 rounded-2xl border text-left transition-colors duration-200 flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                  hasHeatPump
                    ? 'border-emerald-400/40 bg-emerald-400/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hasHeatPump ? 'bg-emerald-400/20 text-emerald-400' : 'bg-slate-900 text-slate-500'}`}>
                    <HeatPumpIcon className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>Tepelné čerpadlo Vzduch-Voda (+2.0 kWp)</span>
                      {hasHeatPump && <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />}
                    </p>
                    <p className="text-xs text-slate-400">Ekologické vykurovanie s dotáciou SIEA až do 4 600 €</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${hasHeatPump ? 'bg-emerald-400 border-emerald-400 text-slate-950 font-bold' : 'border-slate-700 bg-slate-900'}`}>
                  {hasHeatPump && <CheckIcon className="w-3.5 h-3.5 text-slate-950" />}
                </div>
              </button>

              {/* EV Wallbox Toggle */}
              <button
                type="button"
                onClick={() => setHasEV(!hasEV)}
                className={`w-full min-h-[56px] p-4 rounded-2xl border text-left transition-colors duration-200 flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                  hasEV
                    ? 'border-sky-400/40 bg-sky-400/10'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${hasEV ? 'bg-sky-400/20 text-sky-400' : 'bg-slate-900 text-slate-500'}`}>
                    <CarIcon className="w-5 h-5 text-sky-400 shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>Wallbox nabíjanie elektromobilu (+1.5 kWp)</span>
                      {hasEV && <CheckIcon className="w-3.5 h-3.5 text-sky-400" />}
                    </p>
                    <p className="text-xs text-slate-400">Inteligentné nabíjanie zo slnečných prebytkov</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${hasEV ? 'bg-sky-400 border-sky-400 text-slate-950 font-bold' : 'border-slate-700 bg-slate-900'}`}>
                  {hasEV && <CheckIcon className="w-3.5 h-3.5 text-slate-950" />}
                </div>
              </button>

            </div>

          </div>

          {/* Results & Lead Form Column with Ambient Backlight ("Podsvietenie") */}
          <div className="lg:col-span-6 relative group">
            {/* Ambient Backlight Glow ("Podsvietenie okna") */}
            <div
              className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-emerald-500/25 rounded-3xl blur-xl opacity-35 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-7 shadow-md">
            
            {/* Calculation Summary KPIs */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <SunIcon className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Odhadovaný výkon &amp; návratnosť investície</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* 1. Recommended Power */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <p className="text-xs text-slate-400 font-medium">Odporúčaný výkon</p>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">{recommendedKwp} kWp</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">cca {Math.round(recommendedKwp * 2.2)} panelov</p>
                </div>

                {/* 2. Annual Savings (Illuminated Emerald Window) */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-950 to-slate-950 shadow-sm">
                  <p className="text-xs text-slate-400 font-medium">Ročná úspora</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{estimatedSavings} € / rok</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">úspora až {Math.round(selfConsumptionRate * 100)} %</p>
                </div>

                {/* 3. State Subsidy (Illuminated Amber Window) */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 shadow-sm">
                  <p className="text-xs text-slate-400 font-medium">Štátna dotácia SIEA</p>
                  <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                    {estimatedSubsidy > 0 ? `${estimatedSubsidy} €` : (propertyType === 'home' ? '0 €' : 'Zelená podnikom')}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {propertyType === 'home'
                      ? (hasHeatPump ? 'FV 1 150 € + TČ 4 600 €' : '575 €/kW (max 1 150 €)')
                      : 'B2B podpora do 50 %'}
                  </p>
                </div>

                {/* 4. Payback Period (Illuminated Sky Window) */}
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-slate-950 to-slate-950 shadow-sm">
                  <p className="text-xs text-slate-400 font-medium">Odhadovaná návratnosť</p>
                  <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">{paybackYears} roka</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">životnosť 30+ rokov</p>
                </div>

                {/* 5. Net Price After Subsidy (Illuminated Highlight Window) */}
                <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent p-4 rounded-2xl border border-amber-500/40 col-span-2 sm:col-span-2 shadow-sm">
                  <p className="text-xs font-semibold text-amber-400">Odhadovaná investícia po štátnej dotácii</p>
                  <p className="text-2xl font-black text-white mt-0.5">od {netPrice.toLocaleString('sk-SK')} €</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Vrátane montáže na kľúč, meniča, revízie a vybavenia dotácie SIEA</p>
                </div>
              </div>
            </div>

            {/* Dynamic Visual Setup Strip with Authentic Image Thumbnails */}
            <div className="pt-2">
              <div className="text-sm font-medium text-slate-300 mb-3 flex items-center justify-between">
                <span>Konfigurácia obsahuje</span>
                <span className="text-amber-400 font-semibold text-xs">
                  {hasBattery ? 'Hybridná zostava s batériou' : 'On-Grid fotovoltická zostava'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* 1. Solar Panels */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <img
                      src={propertyType === 'home' ? '/images/fotovoltika-domacnosti/hero.jpg' : '/images/fotovoltika-firmy/hero.jpg'}
                      alt="Solárne panely"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">Tier 1 Panely</div>
                    <div className="text-[10px] text-slate-400 truncate">{recommendedKwp} kWp N-Type</div>
                  </div>
                </div>

                {/* 2. Inverter */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <img
                      src={propertyType === 'home' ? '/images/fotovoltika-domacnosti/hybrid-system.jpg' : '/images/fotovoltika-firmy/industrial-inverter.jpg'}
                      alt="Striedač"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">3F Hybridný menič</div>
                    <div className="text-[10px] text-slate-400 truncate">EPS záskok &lt; 10 ms</div>
                  </div>
                </div>

                {/* 3. LiFePO4 Battery */}
                {hasBattery ? (
                  <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-400/20">
                      <img
                        src="/images/bateriove-uloziska/hero.jpg"
                        alt="Batéria"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-amber-300 truncate">LiFePO4 Batéria</div>
                      <div className="text-[10px] text-slate-400 truncate">6 000+ cyklov</div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 flex items-center gap-2.5 opacity-60">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      <BatteryIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-400 truncate">Bez batérie</div>
                      <div className="text-[10px] text-slate-500 truncate">Možnosť doplniť</div>
                    </div>
                  </div>
                )}

                {/* 4. Heat Pump (if active) */}
                {hasHeatPump && (
                  <div className="p-2.5 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-emerald-400/20">
                      <img
                        src="/images/tepelne-cerpadla/hero.jpg"
                        alt="Tepelné čerpadlo"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-emerald-300 truncate">Tepelné čerpadlo</div>
                      <div className="text-[10px] text-slate-400 truncate">Dotácia do 4 600 €</div>
                    </div>
                  </div>
                )}

                {/* 5. EV Wallbox (if active) */}
                {hasEV && (
                  <div className="p-2.5 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-sky-400/20">
                      <img
                        src="/images/sluzby/montaz-instalacia.jpg"
                        alt="Wallbox"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-sky-300 truncate">Smart EV Wallbox</div>
                      <div className="text-[10px] text-slate-400 truncate">11/22 kW nabíjanie</div>
                    </div>
                  </div>
                )}

                {/* 6. Official Revision */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <img
                      src="/images/sluzby/revizie-dotacie.jpg"
                      alt="Revízia"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">Revízia OPOS</div>
                    <div className="text-[10px] text-slate-400 truncate">§ 24 a distribúcia</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="pt-6">
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-bold mx-auto">
                    <CheckIcon className="w-6 h-6 text-slate-950" strokeWidth={2.5} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Ďakujeme! Váš dopyt bol úspešne odoslaný.</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Váš dopyt evidujeme pod kódom{' '}
                    <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">{submittedLeadId}</span>. Náš technik vás bude kontaktovať do 24 hodín s presnou cenovou ponukou a dohodnutím bezplatnej obhliadky.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-base font-bold text-white">
                    Získať nezáväznú ponuku &amp; obhliadku ZDARMA
                  </h4>

                  {errorMsg && (
                    <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircleIcon className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                    <label htmlFor="calc_b_url">Leave blank</label>
                    <input
                      id="calc_b_url"
                      type="text"
                      name="b_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={bUrl}
                      onChange={(e) => setBUrl(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="calc-name" className="block text-xs font-semibold text-slate-400 mb-1">
                        Meno a Priezvisko <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="calc-name"
                        type="text"
                        required
                        placeholder="Ján Novák"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-phone" className="block text-xs font-semibold text-slate-400 mb-1">
                        Telefónne číslo <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="calc-phone"
                        type="tel"
                        required
                        placeholder="+421 900 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="calc-email" className="block text-xs font-semibold text-slate-400 mb-1">E-mailová adresa</label>
                      <input
                        id="calc-email"
                        type="email"
                        placeholder="jan.novak@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="calc-city" className="block text-xs font-semibold text-slate-400 mb-1">Mesto / Obec realizácie</label>
                      <input
                        id="calc-city"
                        type="text"
                        placeholder="napr. Martin, Žilina, Vrútky..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
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
                      className="w-4 h-4 mt-0.5 accent-amber-400 rounded cursor-pointer shrink-0"
                    />
                    <label htmlFor="gdpr-calc" className="text-xs text-slate-400 leading-tight cursor-pointer select-none">
                      Súhlasím so spracovaním osobných údajov spoločnosťou Marvol s.r.o. podľa{' '}
                      <Link href="/ochrana-osobnych-udajov" target="_blank" className="text-amber-400 underline hover:text-amber-300">
                        Zásad GDPR
                      </Link>{' '}
                      pre účely vypracovania bezplatnej cenovej ponuky. <span className="text-amber-400">*</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full min-h-[48px] py-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Odosielam dopyt...</span>
                    ) : (
                      <>
                        <span>Odoslať dopyt na obhliadku ZDARMA</span>
                        <CheckIcon className="w-4 h-4 text-slate-950" strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
