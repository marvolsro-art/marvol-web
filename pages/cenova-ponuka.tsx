import React, { useState, useEffect, useId } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  SALES_REPS,
  PV_PANELS,
  INVERTERS,
  BATTERIES,
  ROOF_STRUCTURES,
  POPULAR_MUNICIPALITIES,
  QuoteInputs,
  calculateQuote
} from "../lib/pricing-data";

export default function CenovaPonukaPage() {
  const [activeTab, setActiveTab] = useState<"config" | "preview" | "checklist">("config");

  // Form IDs for accessibility
  const repId = useId();
  const qNumId = useId();
  const qDateId = useId();
  const clientNameId = useId();
  const clientPhoneId = useId();
  const clientEmailId = useId();
  const clientCityId = useId();
  const clientAddrId = useId();
  const clientEicId = useId();
  const pCountId = useId();
  const panelTypeId = useId();
  const roofStructId = useId();
  const roofPitchId = useId();
  const roofOrientId = useId();
  const invBrandId = useId();
  const invModelId = useId();
  const batModelId = useId();
  const backupId = useId();
  const optCountId = useId();
  const lpId = useId();
  const distKmId = useId();
  const acLenId = useId();
  const dcLenId = useId();
  const annualKwhId = useId();
  const marginId = useId();

  // Inverter brand filter for sales rep convenience
  const [selectedInverterBrand, setSelectedInverterBrand] = useState<string>("Solinteg");

  // Vstupy ponuky
  const [inputs, setInputs] = useState<QuoteInputs>({
    quoteNumber: "MV-2026-1028",
    date: new Date().toISOString().split("T")[0],
    validDays: 14,
    salesRepId: SALES_REPS[0].id,

    // Klient
    clientName: "Jožko Mrkvička",
    clientAddress: "Michelova 6",
    clientCity: "Rosina",
    clientDistrict: "Žilina",
    clientPhone: "+421 903 123 456",
    clientEmail: "mrkvicka@gmail.com",
    clientEic: "24ZSS1234567890X",

    // Technológia
    panelId: PV_PANELS[0].id,
    panelCount: 16,
    inverterId: "solinteg-10k",
    batteryId: "bat-none",
    roofId: "rovna-vz",
    roofPitchDeg: 30,
    roofOrientation: "V-Z",

    // Bezpečnosť & Doplnky
    hasTigoStop: true,
    optimizerCount: 0,
    rapidShutdownCount: 0,
    backupType: "none",
    hasHus: true,
    lightningProtection: "none",
    hasWallbox: false,
    wallboxBrand: "Solinteg",
    hasDryContactBoiler: false,

    // Vedenia
    distanceKm: 15,
    acCableMeters: 5,
    dcCableMeters: 30,

    // Dotácia
    applySubsidy: true,
    isOrkoRegion: true, // Rosina je ORKO
    subsidyTier: "standard",
    annualConsumptionKwh: 7500,
    customSubsidyAmount: undefined,

    // Obchodné parametre
    marginMultiplier: 1.5,
    vatRate: 0.23,
    salesRepCommissionPct: 10,

    // Ručné nastavenie cien a prác (voliteľné)
    priceInputMode: "selling",
    customPanelPrice: undefined,
    customRoofPrice: undefined,
    customInverterPrice: undefined,
    customBatteryPrice: undefined,
    customMountingLabor: undefined,
    customElectricalLabor: undefined,
    customInspectionAdminPrice: undefined,
    customTransportRate: undefined,
    customItemName: "",
    customItemPrice: undefined,
    customItemQty: 1,
    customItemUnit: "kpl"
  });

  // Automatické nastavenie ORKO podľa mesta
  const handleCityChange = (cityName: string) => {
    const found = POPULAR_MUNICIPALITIES.find(
      m => m.name.toLowerCase() === cityName.toLowerCase().trim()
    );
    if (found) {
      setInputs(prev => ({
        ...prev,
        clientCity: found.name,
        clientDistrict: found.district,
        isOrkoRegion: found.isOrko
      }));
    } else {
      setInputs(prev => ({ ...prev, clientCity: cityName }));
    }
  };

  const selectedRep = SALES_REPS.find(r => r.id === inputs.salesRepId) || SALES_REPS[0];
  const calculation = calculateQuote(inputs);

  // Stav manuálne upravených položiek v náhľade (null = predvolené podľa konfigurácie)
  const [itemsOverride, setItemsOverride] = useState<{
    id: string;
    title: string;
    category: string;
    quantity: number;
    unit: string;
    unitPriceEur: number;
  }[] | null>(null);

  // Aktuálne položky zobrazené v náhľade
  const previewItems = itemsOverride || calculation.itemsBreakdown.map((it, idx) => ({
    id: `cat-${idx}`,
    title: it.title,
    category: it.category,
    quantity: it.quantity,
    unit: it.unit,
    unitPriceEur: it.unitPriceEur
  }));

  const handleUpdateItem = (id: string, field: "title" | "quantity" | "unit" | "unitPriceEur", val: any) => {
    const updated = previewItems.map(it => {
      if (it.id === id) {
        return { ...it, [field]: val };
      }
      return it;
    });
    setItemsOverride(updated);
  };

  const handleAddItem = () => {
    const newItem = {
      id: `custom-${Date.now()}`,
      title: "Vlastná doplnková položka / materiál",
      category: "Doplnkové práce",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: 0
    };
    setItemsOverride([...previewItems, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    const updated = previewItems.filter(it => it.id !== id);
    setItemsOverride(updated);
  };

  const handleResetItems = () => {
    setItemsOverride(null);
  };

  // Prepočty cien podľa skutočných položiek v náhľade
  const effectiveSellingWithoutVat = Number(
    previewItems.reduce((acc, it) => acc + (it.quantity * it.unitPriceEur), 0).toFixed(2)
  );
  const effectiveVatAmount = Number((effectiveSellingWithoutVat * inputs.vatRate).toFixed(2));
  const effectiveSellingWithVat = Number((effectiveSellingWithoutVat + effectiveVatAmount).toFixed(2));
  const effectiveSubsidy = inputs.applySubsidy ? calculation.subsidyAmount : 0;
  const effectiveFinalPrice = Number(Math.max(0, effectiveSellingWithVat - effectiveSubsidy).toFixed(2));
  const effectivePricePerWp = calculation.installedPowerKwp > 0
    ? Number((effectiveFinalPrice / (calculation.installedPowerKwp * 1000)).toFixed(2))
    : 0;
  const annualSavingsEur = calculation.expectedAnnualProductionMwh * 1000 * 0.18;
  const effectivePaybackYears = annualSavingsEur > 0
    ? Number((effectiveFinalPrice / annualSavingsEur).toFixed(1))
    : calculation.estimatedPaybackYears;

  // Filtrované meniče podľa značky
  const filteredInverters = INVERTERS.filter(i =>
    selectedInverterBrand === "Všetky" ? true : i.brand === selectedInverterBrand
  );

  const pdfFileName = `Cenová kalkulácia - ${inputs.clientName?.trim() || "Zákazník"} - ${inputs.quoteNumber?.trim() || "Ponuka"}`.replace(/[\/\\?%*:|"<>]/g, "-");

  useEffect(() => {
    const handleBeforePrint = () => {
      document.title = pdfFileName;
      if (activeTab === "config") {
        setActiveTab("preview");
      }
    };
    window.addEventListener("beforeprint", handleBeforePrint);
    return () => window.removeEventListener("beforeprint", handleBeforePrint);
  }, [activeTab, pdfFileName]);

  const handlePrint = () => {
    document.title = pdfFileName;
    window.print();
  };

  return (
    <>
      <Head>
        <title>{pdfFileName}</title>
        <meta name="description" content="Originálny generátor a cenová ponuka fotovoltického systému MARVOL s.r.o." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {/* HORNÁ LIŠTA (Skrytá pri tlači) */}
        <header className="print:hidden sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <img
                  src="/logos/marvol-logo.jpg"
                  alt="MARVOL s.r.o."
                  className="h-8 w-auto object-contain bg-white px-2 py-1 rounded-lg shadow-sm"
                />
                <div>
                  <span className="font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">MARVOL</span>
                  <span className="text-xs text-slate-400 block -mt-1 font-mono">Generátor cenových ponúk</span>
                </div>
              </Link>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Interný nástroj obchodníka
              </span>
            </div>

            {/* PREPÍNAČ TABOV */}
            <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("config")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "config"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                ⚙️ Konfigurátor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "preview"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                📄 Náhľad ponuky (A4)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("checklist")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "checklist"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                📋 Montážny list
              </button>
            </div>

            {/* AKČNÉ TLAČIDLÁ (Iba v náhľade A4 alebo montážnom liste) */}
            {activeTab !== "config" && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Tlačiť / Stiahnuť PDF</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ============================================================== */}
        {/* 1. KONFIGURÁTOR PRE OBCHODNÍKA (Skrytý pri tlači)              */}
        {/* ============================================================== */}
        {activeTab === "config" && (
          <main className="print:hidden max-w-7xl mx-auto px-4 py-8">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Tvorba novej cenovej ponuky MARVOL
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Vyberte obchodníka, zadajte údaje klienta a naklikajte potrebný hardvér. Systém automaticky prepočíta dotáciu SIEA, maržu aj DPH.
                </p>
              </div>

              {/* RÝCHLE ŠTATISTIKY PRE OBCHODNÍKA */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Predajná cena s DPH</div>
                  <div className="text-xl font-extrabold text-slate-900">{effectiveSellingWithVat.toLocaleString("sk-SK")} €</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="text-right">
                  <div className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">Po dotácii SIEA</div>
                  <div className="text-xl font-extrabold text-emerald-600">{effectiveFinalPrice.toLocaleString("sk-SK")} €</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* ĽAVÝ STĹPEC FORMULÁRA */}
              <div className="lg:col-span-8 space-y-8">
                {/* BLOK 1: ZÁKLADNÉ ÚDAJE A KLIENT */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                    Obchodný zástupca a identifikačné údaje
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor={repId} className="block text-xs font-semibold text-slate-600 mb-1">Obchodník MARVOL</label>
                      <select
                        id={repId}
                        value={inputs.salesRepId}
                        onChange={e => setInputs({ ...inputs, salesRepId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {SALES_REPS.map(r => (
                          <option key={r.id} value={r.id}>{r.name} ({r.phone})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={qNumId} className="block text-xs font-semibold text-slate-600 mb-1">Číslo ponuky</label>
                      <input
                        id={qNumId}
                        type="text"
                        value={inputs.quoteNumber}
                        onChange={e => setInputs({ ...inputs, quoteNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor={qDateId} className="block text-xs font-semibold text-slate-600 mb-1">Dátum vystavenia</label>
                      <input
                        id={qDateId}
                        type="date"
                        value={inputs.date}
                        onChange={e => setInputs({ ...inputs, date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label htmlFor={clientNameId} className="block text-xs font-semibold text-slate-600 mb-1">Meno a priezvisko klienta</label>
                      <input
                        id={clientNameId}
                        type="text"
                        value={inputs.clientName}
                        onChange={e => setInputs({ ...inputs, clientName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={clientPhoneId} className="block text-xs font-semibold text-slate-600 mb-1">Telefón klienta</label>
                      <input
                        id={clientPhoneId}
                        type="text"
                        value={inputs.clientPhone}
                        onChange={e => setInputs({ ...inputs, clientPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={clientEmailId} className="block text-xs font-semibold text-slate-600 mb-1">E-mail klienta</label>
                      <input
                        id={clientEmailId}
                        type="email"
                        value={inputs.clientEmail}
                        onChange={e => setInputs({ ...inputs, clientEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label htmlFor={clientCityId} className="block text-xs font-semibold text-slate-600 mb-1">
                        Obec / Mesto <span className="text-emerald-600 font-normal">(auto-ORKO)</span>
                      </label>
                      <input
                        id={clientCityId}
                        type="text"
                        value={inputs.clientCity}
                        onChange={e => handleCityChange(e.target.value)}
                        placeholder="Napr. Rosina, Žilina, Martin..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label htmlFor={clientAddrId} className="block text-xs font-semibold text-slate-600 mb-1">Ulica a číslo domu</label>
                      <input
                        id={clientAddrId}
                        type="text"
                        value={inputs.clientAddress}
                        onChange={e => setInputs({ ...inputs, clientAddress: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={clientEicId} className="block text-xs font-semibold text-slate-600 mb-1">EIC kód odberného miesta</label>
                      <input
                        id={clientEicId}
                        type="text"
                        value={inputs.clientEic}
                        onChange={e => setInputs({ ...inputs, clientEic: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* BLOK 2: FOTOVOLTIKA & PANELY */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                      Fotovoltické panely & Konštrukcia
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                      Celkový výkon: {calculation.installedPowerKwp} kWp
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={pCountId} className="block text-xs font-semibold text-slate-600 mb-1">
                        Počet panelov ({inputs.panelCount} ks = {calculation.installedPowerKwp} kWp)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          id={pCountId}
                          type="range"
                          min="4"
                          max="40"
                          step="1"
                          value={inputs.panelCount}
                          onChange={e => setInputs({ ...inputs, panelCount: parseInt(e.target.value, 10) })}
                          aria-label="Počet panelov posuvník"
                          className="flex-1 accent-emerald-600 cursor-pointer"
                        />
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={inputs.panelCount}
                          onChange={e => setInputs({ ...inputs, panelCount: parseInt(e.target.value, 10) || 1 })}
                          aria-label="Počet panelov číslo"
                          className="w-16 px-2 py-1 text-center font-bold bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={panelTypeId} className="block text-xs font-semibold text-slate-600 mb-1">Typ a model panelu</label>
                      <select
                        id={panelTypeId}
                        value={inputs.panelId}
                        onChange={e => setInputs({ ...inputs, panelId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {PV_PANELS.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Vlastná cena/panel (€ bez DPH):</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Katalógová"
                          value={inputs.customPanelPrice ?? ""}
                          onChange={e => setInputs({ ...inputs, customPanelPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-28 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label htmlFor={roofStructId} className="block text-xs font-semibold text-slate-600 mb-1">Konštrukčný systém</label>
                      <select
                        id={roofStructId}
                        value={inputs.roofId}
                        onChange={e => setInputs({ ...inputs, roofId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                      >
                        {ROOF_STRUCTURES.map(r => (
                          <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Vlastná cena/panel (€):</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Katalógová"
                          value={inputs.customRoofPrice ?? ""}
                          onChange={e => setInputs({ ...inputs, customRoofPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={roofPitchId} className="block text-xs font-semibold text-slate-600 mb-1">Sklon strechy (°)</label>
                      <input
                        id={roofPitchId}
                        type="number"
                        min="0"
                        max="90"
                        value={inputs.roofPitchDeg}
                        onChange={e => setInputs({ ...inputs, roofPitchDeg: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor={roofOrientId} className="block text-xs font-semibold text-slate-600 mb-1">Orientácia panelov</label>
                      <select
                        id={roofOrientId}
                        value={inputs.roofOrientation}
                        onChange={e => setInputs({ ...inputs, roofOrientation: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Juh">Juh</option>
                        <option value="V-Z">Východ - Západ</option>
                        <option value="J-V">Juhovýchod</option>
                        <option value="J-Z">Juhozápad</option>
                        <option value="Východ">Východ</option>
                        <option value="Západ">Západ</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* BLOK 3: MENIČ A BATÉRIA */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
                      Menič napätia & Batériové úložisko
                    </span>
                  </h2>

                  {/* Filter značky meniča */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-slate-500 font-semibold whitespace-nowrap">Filter značky:</span>
                    {["Solinteg", "GoodWe", "SolaX", "Huawei", "Deye", "Všetky"].map(brand => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedInverterBrand(brand)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                          selectedInverterBrand === brand
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={invModelId} className="block text-xs font-semibold text-slate-600 mb-1">Model striedača / meniča</label>
                      <select
                        id={invModelId}
                        value={inputs.inverterId}
                        onChange={e => setInputs({ ...inputs, inverterId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      >
                        {filteredInverters.map(i => (
                          <option key={i.id} value={i.id}>{i.name}</option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Vlastná cena meniča (€ bez DPH):</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Katalógová"
                          value={inputs.customInverterPrice ?? ""}
                          onChange={e => setInputs({ ...inputs, customInverterPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-28 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={batModelId} className="block text-xs font-semibold text-slate-600 mb-1">Batériové úložisko</label>
                      <select
                        id={batModelId}
                        value={inputs.batteryId}
                        onChange={e => setInputs({ ...inputs, batteryId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      >
                        {BATTERIES.map(b => (
                          <option key={b.id} value={b.id}>
                            {b.name} {b.capacityKwh ? `(${b.capacityKwh} kWh)` : ""}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[11px] font-medium text-slate-500 whitespace-nowrap">Vlastná cena batérie (€ bez DPH):</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Katalógová"
                          value={inputs.customBatteryPrice ?? ""}
                          onChange={e => setInputs({ ...inputs, customBatteryPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-28 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label htmlFor={backupId} className="block text-xs font-semibold text-slate-600 mb-1">EPS Záložný režim pri výpadku siete (Back-up)</label>
                    <select
                      id={backupId}
                      value={inputs.backupType}
                      onChange={e => setInputs({ ...inputs, backupType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="none">Systém bez zálohy (On-Grid odpája pri výpadku siete)</option>
                      <option value="socket">Núdzová záložná zásuvka pri meniči (+120 € bez DPH)</option>
                      <option value="distribution_board">Plný automatický EPS Back-Up pre 5-10 okruhov domu (+300 € bez DPH)</option>
                    </select>
                  </div>
                </div>

                {/* BLOK 4: BEZPEČNOSŤ, PRÁCE A DOPLNKY */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
                      Bezpečnostné prvky & Elektroinštalácia
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        checked={inputs.hasTigoStop}
                        onChange={e => setInputs({ ...inputs, hasTigoStop: e.target.checked })}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">TIGO KIT & STOP tlačidlo pre hasičov</span>
                        <span className="text-xs text-slate-500">Bezpečné beznapäťové odpojenie panelov na streche pri požiari</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        checked={inputs.hasHus}
                        onChange={e => setInputs({ ...inputs, hasHus: e.target.checked })}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Hlavná uzemňovacia sústava (HUS)</span>
                        <span className="text-xs text-slate-500">Ekvipotenciálne pospájanie kovových nosičov a rozvádzačov</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <input
                        type="checkbox"
                        checked={inputs.hasDryContactBoiler}
                        onChange={e => setInputs({ ...inputs, hasDryContactBoiler: e.target.checked })}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Zopínanie bojlera z pretokov (Dry Contact)</span>
                        <span className="text-xs text-slate-500">Ohrev teplej úžitkovej vody zadarmo len z prebytkov soláru</span>
                      </div>
                    </label>

                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <label htmlFor={optCountId} className="block text-xs font-semibold text-slate-600 mb-1">Počet optimizérov panelov (ks)</label>
                      <input
                        id={optCountId}
                        type="number"
                        min="0"
                        max={inputs.panelCount}
                        value={inputs.optimizerCount}
                        onChange={e => setInputs({ ...inputs, optimizerCount: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                    <div>
                      <label htmlFor={lpId} className="block text-xs font-semibold text-slate-600 mb-1">Bleskozvodová ochrana</label>
                      <select
                        id={lpId}
                        value={inputs.lightningProtection}
                        onChange={e => setInputs({ ...inputs, lightningProtection: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      >
                        <option value="none">Bez zásahu do bleskozvodu</option>
                        <option value="modification">Úprava a revízia bleskozvodu (+750 €)</option>
                        <option value="new_installation">Kompletné nové vybudovanie (+2 250 €)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={distKmId} className="block text-xs font-semibold text-slate-600 mb-1">Vzdialenosť (km)</label>
                      <input
                        id={distKmId}
                        type="number"
                        min="0"
                        value={inputs.distanceKm}
                        onChange={e => setInputs({ ...inputs, distanceKm: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={acLenId} className="block text-xs font-semibold text-slate-600 mb-1">AC trasa (m)</label>
                      <input
                        id={acLenId}
                        type="number"
                        min="1"
                        value={inputs.acCableMeters}
                        onChange={e => setInputs({ ...inputs, acCableMeters: parseInt(e.target.value, 10) || 5 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor={dcLenId} className="block text-xs font-semibold text-slate-600 mb-1">DC trasa (m)</label>
                      <input
                        id={dcLenId}
                        type="number"
                        min="1"
                        value={inputs.dcCableMeters}
                        onChange={e => setInputs({ ...inputs, dcCableMeters: parseInt(e.target.value, 10) || 30 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* BLOK 5: PRÁCE, MONTÁŽ & VLASTNÉ DOPLNKOVÉ POLOŽKY */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">5</span>
                      Práce, montáž & Ručné zadanie cien
                    </h2>
                    {/* Prepínač režimu cien */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setInputs({ ...inputs, priceInputMode: "selling" })}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          inputs.priceInputMode !== "cost"
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Priama predajná cena
                      </button>
                      <button
                        type="button"
                        onClick={() => setInputs({ ...inputs, priceInputMode: "cost" })}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          inputs.priceInputMode === "cost"
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Nákupná cena + marža ({inputs.marginMultiplier}x)
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Ak potrebujete upraviť cenu montáže, elektroinštalácie, revízie alebo dopravy, zadajte sumu nižšie. Prázdne pole = automatický výpočet podľa cenníka.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Montáž na streche (€ bez DPH)</label>
                      <input
                        type="number"
                        step="1"
                        placeholder="Automaticky"
                        value={inputs.customMountingLabor ?? ""}
                        onChange={e => setInputs({ ...inputs, customMountingLabor: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Elektroinštalácia & oživenie (€)</label>
                      <input
                        type="number"
                        step="1"
                        placeholder="Cenník (~495 €)"
                        value={inputs.customElectricalLabor ?? ""}
                        onChange={e => setInputs({ ...inputs, customElectricalLabor: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Revízia a administratíva (€)</label>
                      <input
                        type="number"
                        step="1"
                        placeholder="Cenník (~375 €)"
                        value={inputs.customInspectionAdminPrice ?? ""}
                        onChange={e => setInputs({ ...inputs, customInspectionAdminPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Sadzba dopravy (€/km)</label>
                      <input
                        type="number"
                        step="0.05"
                        placeholder="0.50 €/km"
                        value={inputs.customTransportRate ?? ""}
                        onChange={e => setInputs({ ...inputs, customTransportRate: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* Doplnková položka (materiál / atypická práca) */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Vlastná doplnková položka (extra materiál / práca)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Názov položky</label>
                        <input
                          type="text"
                          placeholder="Napr. Výkopové práce pre káblovú trasu 20m, strieška, atď."
                          value={inputs.customItemName ?? ""}
                          onChange={e => setInputs({ ...inputs, customItemName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cena / MJ (€ bez DPH)</label>
                        <input
                          type="number"
                          step="0.5"
                          placeholder="0.00"
                          value={inputs.customItemPrice ?? ""}
                          onChange={e => setInputs({ ...inputs, customItemPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Množstvo</label>
                        <input
                          type="number"
                          step="1"
                          min="1"
                          value={inputs.customItemQty ?? 1}
                          onChange={e => setInputs({ ...inputs, customItemQty: parseInt(e.target.value, 10) || 1 })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-center"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">Merná jednotka</label>
                        <select
                          value={inputs.customItemUnit ?? "kpl"}
                          onChange={e => setInputs({ ...inputs, customItemUnit: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        >
                          <option value="kpl">kpl</option>
                          <option value="ks">ks</option>
                          <option value="m">m</option>
                          <option value="hod">hod</option>
                          <option value="bm">bm</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOK 6: DOTÁCIA SIEA */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">6</span>
                      Štátna dotácia Zelená domácnostiam
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      Výška dotácie: {calculation.subsidyAmount.toLocaleString("sk-SK")} €
                    </span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.applySubsidy}
                        onChange={e => setInputs({ ...inputs, applySubsidy: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Uplatniť štátnu dotáciu</span>
                        <span className="text-xs text-slate-500">Zelená domácnostiam SIEA</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inputs.isOrkoRegion}
                        onChange={e => setInputs({ ...inputs, isOrkoRegion: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">Oblasť ORKO (+15%)</span>
                        <span className="text-xs text-slate-500">Sadzba 575 €/kW (namiesto 500 €)</span>
                      </div>
                    </label>

                    <div>
                      <label htmlFor={annualKwhId} className="block text-xs font-semibold text-slate-600 mb-1">Ročná spotreba EE (kWh)</label>
                      <input
                        id={annualKwhId}
                        type="number"
                        min="500"
                        value={inputs.annualConsumptionKwh}
                        onChange={e => setInputs({ ...inputs, annualConsumptionKwh: parseInt(e.target.value, 10) || 5000 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  {/* Vlastná manuálna výška dotácie */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <label htmlFor="custom-subsidy-input" className="text-xs font-bold text-slate-700 whitespace-nowrap">
                        Manuálne zadaná výška dotácie (€):
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          id="custom-subsidy-input"
                          type="number"
                          step="50"
                          min="0"
                          placeholder="Automatický výpočet"
                          value={inputs.customSubsidyAmount ?? ""}
                          onChange={e => setInputs({
                            ...inputs,
                            customSubsidyAmount: e.target.value === "" ? undefined : parseFloat(e.target.value) || 0
                          })}
                          className="w-44 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono font-bold text-amber-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        {inputs.customSubsidyAmount !== undefined && (
                          <button
                            type="button"
                            onClick={() => setInputs({ ...inputs, customSubsidyAmount: undefined })}
                            className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                            title="Vrátiť na automatický výpočet dotácie"
                          >
                            ↺ Auto
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      * Prázdne = auto výpočet (500 / 575 €/kW). Zadaním sumy sa prepíše výsledná dotácia.
                    </span>
                  </div>
                </div>
              </div>

              {/* PRAVÝ BOČNÝ PANEL S FINANČNÝM PREHĽADOM */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-24 space-y-6 border border-slate-800">
                  <div className="border-b border-slate-800 pb-4">
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-mono">Finančná rekapitulácia</span>
                    <h3 className="text-xl font-extrabold text-white mt-1">Súhrn kalkulácie</h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Inštalovaný výkon:</span>
                      <span className="font-bold text-white font-mono">{calculation.installedPowerKwp} kWp</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Ročná produkcia:</span>
                      <span className="font-bold text-white font-mono">{calculation.expectedAnnualProductionMwh} MWh</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Cena diela bez DPH:</span>
                      <span className="font-bold text-white font-mono">{effectiveSellingWithoutVat.toLocaleString("sk-SK")} €</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>DPH (23 %):</span>
                      <span className="font-bold text-white font-mono">{effectiveVatAmount.toLocaleString("sk-SK")} €</span>
                    </div>
                    <div className="flex justify-between text-slate-200 pt-2 border-t border-slate-800 font-semibold">
                      <span>Cena spolu s DPH:</span>
                      <span className="font-bold text-white font-mono text-base">{effectiveSellingWithVat.toLocaleString("sk-SK")} €</span>
                    </div>

                    {inputs.applySubsidy && (
                      <div className="flex justify-between text-amber-400 font-semibold">
                        <span>Štátna dotácia SIEA:</span>
                        <span className="font-bold font-mono">- {effectiveSubsidy.toLocaleString("sk-SK")} €</span>
                      </div>
                    )}
                  </div>

                  {/* KONEČNÁ SUMA PRE KLIENTA */}
                  <div className="bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-1">
                    <span className="text-xs text-emerald-300 font-medium">Finálna investícia pre klienta:</span>
                    <div className="text-3xl font-black text-emerald-400 tracking-tight font-mono">
                      {effectiveFinalPrice.toLocaleString("sk-SK")} €
                    </div>
                    <span className="text-[11px] text-emerald-400/80 block">
                      s DPH po odpočítaní možnej dotácie ({effectivePricePerWp} €/Wp)
                    </span>
                  </div>

                  {/* INTERNÉ METRIKY PRE OBCHODNÍKA (nezobrazujú sa na PDF!) */}
                  <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60 text-xs space-y-2">
                    <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Interné marže (Len pre obchoďáka)</div>
                    <div className="flex justify-between text-slate-300">
                      <span>Náklady diela:</span>
                      <span className="font-mono text-slate-200">{calculation.totalCostWithoutVat.toLocaleString("sk-SK")} €</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Provízia obchodníka (10%):</span>
                      <span className="font-mono text-emerald-400 font-bold">{calculation.salesRepCommissionEur.toLocaleString("sk-SK")} €</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Čistá marža firmy:</span>
                      <span className="font-mono text-amber-400 font-bold">{calculation.companyMarginEur.toLocaleString("sk-SK")} €</span>
                    </div>
                    <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between">
                      <label htmlFor={marginId} className="text-slate-400 text-[11px]">Koeficient:</label>
                      <input
                        id={marginId}
                        type="number"
                        min="1.1"
                        max="2.5"
                        step="0.05"
                        value={inputs.marginMultiplier}
                        onChange={e => setInputs({ ...inputs, marginMultiplier: parseFloat(e.target.value) || 1.5 })}
                        className="w-16 px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-right font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* PRECHOD DO NÁHĽADU A4 */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all text-center flex items-center justify-center gap-2 group"
                    >
                      <span>Zobraziť A4 ponuku pre zákazníka</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* ============================================================== */}
        {/* 2. NÁHĽAD PRE ZÁKAZNÍKA (Oficiálny A4 formát pripravený na tlač) */}
        {/* ============================================================== */}
        <div className={`${activeTab === "preview" ? "block" : "hidden print:block"} max-w-[210mm] mx-auto my-6 print:my-0 print:max-w-none`}>
            {/* INFORMAČNÁ LIŠTA (iba na obrazovke) */}
            <div className="print:hidden bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-center justify-between text-sm text-emerald-900 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                <span>
                  <strong>Náhľad oficiálnej cenovej ponuky MARVOL</strong> (Optimalizované na formát A4, šetrné k toneru).
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("config")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 font-medium text-xs hover:bg-emerald-50"
                >
                  ← Upraviť vstupy
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-sm"
                >
                  Tlačiť / Exportovať do PDF
                </button>
              </div>
            </div>

            {/* SAMOTNÝ A4 DOKUMENT (TLAČÍ SA NA PAPIER / PDF) */}
            <div className="bg-white p-8 sm:p-12 print:p-8 rounded-2xl shadow-xl print:shadow-none border border-slate-200 print:border-none print:m-0 text-slate-900 text-xs leading-relaxed">
              {/* 1. HLAVIČKA DOKUMENTU */}
              <div className="flex items-start justify-between border-b-2 border-emerald-600 pb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/logos/marvol-logo.jpg"
                      alt="MARVOL s.r.o."
                      className="h-12 w-auto object-contain"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 tracking-tight block">
                        MARVOL s.r.o.
                      </span>
                      <p className="text-[10px] text-emerald-800 font-semibold leading-tight">
                        Fotovoltika & Energetické riešenia na kľúč
                      </p>
                    </div>
                  </div>
                  <p className="text-[9px] text-slate-400 mt-2 font-mono">
                    IČO: 53 060 091 | DIČ: 2121255961 | Chotárna 3394/6, 038 61 Vrútky
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-800 block">
                    Cenová ponuka
                  </span>
                  <div className="text-base font-black text-slate-900 font-mono mt-0.5">
                    {inputs.quoteNumber}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Dátum vystavenia: <span className="font-semibold text-slate-700">{inputs.date}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Platnosť ponuky: <span className="font-semibold text-slate-700">{inputs.validDays} dní</span>
                  </div>
                </div>
              </div>

              {/* 2. DVE VIZITKY: KLIENT & OBCHODNÝ ZÁSTUPCA */}
              <div className="grid grid-cols-2 gap-6 my-5 pt-1">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                    Odberateľ / Zákazník:
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{inputs.clientName}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">{inputs.clientAddress}, {inputs.clientCity}</div>
                  <div className="text-slate-500 text-[10px] mt-1 flex flex-col gap-0.5">
                    <span>Tel: <strong className="text-slate-700">{inputs.clientPhone}</strong></span>
                    {inputs.clientEmail && <span>E-mail: {inputs.clientEmail}</span>}
                    {inputs.clientEic && <span>EIC: <strong className="font-mono text-slate-700">{inputs.clientEic}</strong></span>}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 block mb-1">
                    Váš obchodno-technický špecialista:
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{selectedRep.name}</div>
                  <div className="text-emerald-700 font-medium text-[10px]">{selectedRep.title}</div>
                  <div className="text-slate-500 text-[10px] mt-1 flex flex-col gap-0.5">
                    <span>Mobil: <strong className="text-slate-700">{selectedRep.phone}</strong></span>
                    <span>E-mail: <strong className="text-slate-700">{selectedRep.email}</strong></span>
                    <span>Garancia inštalácie: <strong className="text-emerald-700">do 30 dní od zmluvy</strong></span>
                  </div>
                </div>
              </div>

              {/* 3. TECHNOLOGICKÝ DASHBOARD (4 PREHĽADNÉ KARTY) */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-2.5 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 block">Inštalovaný výkon DC</span>
                  <div className="text-lg font-black text-emerald-950 font-mono mt-0.5">{calculation.installedPowerKwp} kWp</div>
                  <span className="text-[9px] text-emerald-700">{inputs.panelCount}x panel 455 Wp</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Ročná výroba energie</span>
                  <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{calculation.expectedAnnualProductionMwh} MWh</div>
                  <span className="text-[9px] text-slate-500">odhad čistého zisku</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">Technológia invertora</span>
                  <div className="text-xs font-black text-slate-900 truncate mt-1">
                    {INVERTERS.find(i => i.id === inputs.inverterId)?.brand || "Solinteg"} 3-Fázy
                  </div>
                  <span className="text-[9px] text-slate-500">Hybridný striedač</span>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-2.5 text-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 block">Návratnosť investície</span>
                  <div className="text-lg font-black text-amber-900 font-mono mt-0.5">{effectivePaybackYears} roka</div>
                  <span className="text-[9px] text-amber-700">so štátnou dotáciou</span>
                </div>
              </div>

              {/* 4. ROZPIS POLOŽIEK DIELA NA KĽÚČ (Plne editovateľný v náhľade) */}
              <div className="mb-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span>Položková špecifikácia fotovoltického systému na kľúč</span>
                    <span className="text-[9px] font-normal text-slate-500 font-sans normal-case hidden sm:inline">
                      (Kompletná dodávka, inštalácia, revízia a zapojenie)
                    </span>
                  </h4>
                  <div className="print:hidden flex items-center gap-2">
                    {itemsOverride && (
                      <span className="text-[9px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                        Ručne upravené položky
                      </span>
                    )}
                  </div>
                </div>

                <table className="w-full text-left border-collapse text-[10px]">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-600 bg-slate-50">
                      <th className="py-1.5 px-2 font-bold w-6">P.č.</th>
                      <th className="py-1.5 px-2 font-bold">Názov materiálu a poskytovaných prác</th>
                      <th className="py-1.5 px-2 font-bold text-center w-14">Množ.</th>
                      <th className="py-1.5 px-2 font-bold text-center w-10">MJ</th>
                      <th className="py-1.5 px-2 font-bold text-right w-24">Cena / MJ</th>
                      <th className="py-1.5 px-2 font-bold text-right w-24">Spolu bez DPH</th>
                      <th className="py-1.5 px-1 w-6 print:hidden"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previewItems.map((item, idx) => (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="py-1 px-2 text-slate-400 font-mono text-[9px]">{idx + 1}</td>
                        <td className="py-1 px-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={e => handleUpdateItem(item.id, "title", e.target.value)}
                            title="Kliknite pre úpravu textu položky"
                            className="w-full font-bold text-slate-900 text-[10px] leading-tight bg-transparent border border-transparent hover:border-slate-300 focus:border-emerald-500 focus:bg-white rounded px-1 py-0.5 outline-none print:border-none print:p-0 print:m-0 print:bg-transparent"
                          />
                          <div className="text-[9px] text-slate-500 font-medium px-1">
                            Modul: <span className="text-emerald-700 font-semibold">{item.category}</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-center">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={item.quantity}
                            onChange={e => handleUpdateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                            title="Kliknite pre úpravu množstva"
                            className="w-12 text-center font-bold text-slate-800 text-[10px] bg-transparent border border-transparent hover:border-slate-300 focus:border-emerald-500 focus:bg-white rounded px-1 py-0.5 outline-none font-mono print:border-none print:p-0 print:m-0 print:bg-transparent"
                          />
                        </td>
                        <td className="py-1 px-2 text-center text-slate-500">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={e => handleUpdateItem(item.id, "unit", e.target.value)}
                            className="w-8 text-center text-slate-500 text-[10px] bg-transparent border border-transparent hover:border-slate-300 focus:border-emerald-500 focus:bg-white rounded px-1 py-0.5 outline-none print:border-none print:p-0 print:m-0 print:bg-transparent"
                          />
                        </td>
                        <td className="py-1 px-2 text-right">
                          <div className="flex items-center justify-end">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPriceEur}
                              onChange={e => handleUpdateItem(item.id, "unitPriceEur", parseFloat(e.target.value) || 0)}
                              title="Kliknite pre úpravu ceny za MJ"
                              className="w-20 text-right font-mono text-slate-700 text-[10px] bg-transparent border border-transparent hover:border-slate-300 focus:border-emerald-500 focus:bg-white rounded px-1 py-0.5 outline-none print:border-none print:p-0 print:m-0 print:bg-transparent"
                            />
                            <span className="font-mono text-slate-500 text-[9px] ml-0.5">€</span>
                          </div>
                        </td>
                        <td className="py-1 px-2 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                          {(item.quantity * item.unitPriceEur).toFixed(2)} €
                        </td>
                        <td className="py-1 px-1 text-center print:hidden">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="w-5 h-5 flex items-center justify-center rounded text-slate-300 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
                            title="Odstrániť túto položku z ponuky"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Tlačidlá pridania / obnovy položiek (skryté pri tlači) */}
                <div className="print:hidden mt-2.5 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-colors shadow-sm"
                  >
                    <span className="text-sm font-black">+</span>
                    <span>Pridať vlastnú položku / prácu</span>
                  </button>
                  {itemsOverride && (
                    <button
                      type="button"
                      onClick={handleResetItems}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 font-medium transition-colors"
                      title="Vrátiť položky a ceny do predvoleného stavu podľa konfigurátora"
                    >
                      <span>↺</span>
                      <span>Obnoviť pôvodné hodnoty</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 5. FINANČNÝ SÚČET & ŠTÁTNA DOTÁCIA (HERO BLOK) */}
              <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 mb-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex justify-between text-slate-600">
                      <span>Celková cena diela bez DPH:</span>
                      <span className="font-bold font-mono text-slate-900">{effectiveSellingWithoutVat.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Zákonná DPH (23 %):</span>
                      <span className="font-bold font-mono text-slate-900">{effectiveVatAmount.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-extrabold text-[11px] pt-1 border-t border-slate-200">
                      <span>Celková cena diela s DPH:</span>
                      <span className="font-mono text-slate-950">{effectiveSellingWithVat.toFixed(2)} €</span>
                    </div>

                    {inputs.applySubsidy && (
                      <div className="flex justify-between items-center text-amber-800 font-bold pt-1">
                        <span>
                          Štátna podpora SIEA ({inputs.customSubsidyAmount !== undefined ? "Manuálne zadaná" : inputs.isOrkoRegion ? "Oblasť ORKO 575 €/kW" : "Základ 500 €/kW"}):
                        </span>
                        <div className="flex items-center">
                          <span className="font-mono text-[10px] mr-0.5">-</span>
                          <input
                            type="number"
                            min="0"
                            step="50"
                            value={inputs.customSubsidyAmount !== undefined ? inputs.customSubsidyAmount : effectiveSubsidy}
                            onChange={e => setInputs({
                              ...inputs,
                              customSubsidyAmount: e.target.value === "" ? undefined : parseFloat(e.target.value) || 0
                            })}
                            title="Kliknite pre manuálnu úpravu výšky dotácie"
                            className="w-20 text-right font-mono font-bold text-amber-800 text-[10px] bg-transparent border border-transparent hover:border-amber-300 focus:border-amber-500 focus:bg-white rounded px-1 py-0.5 outline-none print:border-none print:p-0 print:m-0 print:bg-transparent"
                          />
                          <span className="font-mono text-amber-800 text-[9px] ml-0.5">€</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* KONEČNÁ CENA PO DOTÁCII */}
                  <div className="bg-emerald-50 border-2 border-emerald-600 rounded-xl p-3 flex flex-col justify-center items-center text-center">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-900">
                      Konečná investícia pre klienta:
                    </span>
                    <div className="text-2xl font-black text-emerald-800 font-mono tracking-tight my-0.5">
                      {effectiveFinalPrice.toFixed(2)} €
                    </div>
                    <span className="text-[9px] text-emerald-700 font-medium">
                      Cena s DPH po odpočítaní štátnej dotácie ({effectivePricePerWp} € / Wp)
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. GARANCIE DÔVERYHODNOSTI MARVOL */}
              <div className="grid grid-cols-4 gap-2 mb-5 text-center">
                <div className="p-2 border border-slate-200 rounded-lg bg-white">
                  <div className="text-[11px] font-black text-emerald-800">25 ROKOV</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-tight font-bold">Záruka výkonu panelov</div>
                </div>
                <div className="p-2 border border-slate-200 rounded-lg bg-white">
                  <div className="text-[11px] font-black text-emerald-800">10 ROKOV</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-tight font-bold">Záruka na menič / batériu</div>
                </div>
                <div className="p-2 border border-slate-200 rounded-lg bg-white">
                  <div className="text-[11px] font-black text-emerald-800">DO 30 DNÍ</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-tight font-bold">Garantovaný termín montáže</div>
                </div>
                <div className="p-2 border border-slate-200 rounded-lg bg-white">
                  <div className="text-[11px] font-black text-emerald-800">100% SIEA</div>
                  <div className="text-[8px] text-slate-500 uppercase tracking-tight font-bold">Plná garancia dotácie</div>
                </div>
              </div>

              {/* 7. PODPISOVÁ ČASŤ & OBJEDNÁVKA */}
              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 mt-2">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Za zhotoviteľa MARVOL s.r.o.:
                  </span>
                  <div className="h-12 border-b border-dashed border-slate-300 flex items-end pb-1 text-slate-700 font-serif italic text-xs">
                    {selectedRep.name}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1">Dátum a pečiatka zhotoviteľa</div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                    Akceptácia a podpis zákazníka (Objednávka):
                  </span>
                  <div className="h-12 border-b border-dashed border-slate-300 flex items-end pb-1 text-slate-700 font-serif italic text-xs">
                    {inputs.clientName}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1">Svojím podpisom potvrdzujem záväznú objednávku</div>
                </div>
              </div>

              {/* 8. PÄTIČKA DOKUMENTU */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-center text-[8px] text-slate-400 leading-tight">
                MARVOL s.r.o. | Chotárna 3394/6, 038 61 Vrútky | IČO: 53 060 091 | DIČ: 2121255961 | IČ DPH: SK2121255961
                <br />
                Spoločnosť zapísaná v Obchodnom registri Okresného súdu Žilina | info@marvol.sk | www.marvol.sk
              </div>
            </div>
          </div>

        {/* ============================================================== */}
        {/* 3. MONTÁŽNA ŽIADANKA PRE TECHNIKOV (Sklad & Montážna čata)      */}
        {/* ============================================================== */}
        {activeTab === "checklist" && (
          <div className="max-w-4xl mx-auto my-8 px-4 print:max-w-none print:m-0 print:p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-slate-900">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
                <div>
                  <div className="text-xl font-black text-slate-900">MONTÁŽNA ŽIADANKA A SKLADOVÝ LIST</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">MARVOL s.r.o. — Príprava materiálu na zákazku {inputs.quoteNumber}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    Výkon: {calculation.installedPowerKwp} kWp
                  </span>
                </div>
              </div>

              {/* ÚDAJE ZÁKAZKY */}
              <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl mb-6 text-xs border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Zákazník & Adresa</span>
                  <strong className="text-slate-900 text-sm block mt-0.5">{inputs.clientName}</strong>
                  <span className="text-slate-600">{inputs.clientAddress}, {inputs.clientCity}</span>
                  <span className="block text-slate-500 mt-1">Tel: {inputs.clientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Strecha & Parametre</span>
                  <strong className="text-slate-900 block mt-0.5">{ROOF_STRUCTURES.find(r => r.id === inputs.roofId)?.name}</strong>
                  <span className="text-slate-600">Sklon: {inputs.roofPitchDeg}° | Orientácia: {inputs.roofOrientation}</span>
                  <span className="block text-slate-500 mt-1">Vzdialenosť: {inputs.distanceKm} km</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Zodpovedný obchodník</span>
                  <strong className="text-slate-900 block mt-0.5">{selectedRep.name}</strong>
                  <span className="text-slate-600">{selectedRep.phone}</span>
                  <span className="block text-slate-500 mt-1">Dátum: {inputs.date}</span>
                </div>
              </div>

              {/* KONTROLNÝ ZOZNAM MATERIÁLU DO DODÁVKY */}
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>Zoznam komponentov a montážneho materiálu</span>
                <span className="text-xs font-normal text-slate-500 normal-case">Skontroloval montážnik [   ]</span>
              </h4>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                    <th className="py-2 px-3 font-bold w-10">Stav</th>
                    <th className="py-2 px-3 font-bold">Materiál / Komponent</th>
                    <th className="py-2 px-3 font-bold text-center w-20">Množstvo</th>
                    <th className="py-2 px-3 font-bold text-center w-16">MJ</th>
                    <th className="py-2 px-3 font-bold">Poznámka / Špecifikácia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ...calculation.installationChecklist,
                    ...previewItems.filter(it => it.id.startsWith("custom-")).map(it => ({
                      material: it.title,
                      qty: it.quantity,
                      unit: it.unit,
                      note: "Manuálne pridaná položka"
                    }))
                  ].map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="py-2 px-3 text-center">
                        <div className="w-4 h-4 border-2 border-slate-300 rounded mx-auto" />
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-900">{item.material}</td>
                      <td className="py-2 px-3 text-center font-bold font-mono text-emerald-800">{item.qty}</td>
                      <td className="py-2 px-3 text-center text-slate-600">{item.unit}</td>
                      <td className="py-2 px-3 text-slate-500 text-[11px]">{item.note || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Materiál zo skladu vydal:</span>
                  <div className="h-10 border-b border-dashed border-slate-300 mt-1" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Materiál prevzal vedúci montáže:</span>
                  <div className="h-10 border-b border-dashed border-slate-300 mt-1" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ŠPECIÁLNY PRINT STYLING PRE DOKONALÉ A4 */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          body {
            background-color: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, nav, .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:p-8 {
            padding: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:m-0 {
            margin: 0 !important;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
        }
      `}</style>
    </>
  );
}
