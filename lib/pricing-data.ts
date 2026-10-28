// MARVOL s.r.o. — Interný katalóg a kalkulačný engine pre obchodníkov
// 100% originálna cenotvorba, bez závislosti na starých konkurenčných šablónach.

export interface SalesRep {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export const SALES_REPS: SalesRep[] = [
  { id: "volna", name: "Marek Volna", title: "Konateľ spoločnosti", phone: "+421 908 403 042", email: "marek.volna@marvol.sk" }
];

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: "panel" | "inverter" | "battery" | "roof" | "wallbox";
  powerWp?: number;
  capacityKwh?: number;
  costPrice: number; // Nákup bez DPH
  phase?: 1 | 3;
  type?: string;
}

export const PV_PANELS: ProductItem[] = [
  {
    id: "panel-tier1-455",
    name: "Tier-1 Prémiový panel (Canadian Solar / AIKO / Trina / DAH) 455 Wp",
    brand: "Tier-1 (Canadian Solar / AIKO)",
    category: "panel",
    powerWp: 455,
    costPrice: 59.15,
    type: "Bifacial / TOPCon N-type"
  },
  {
    id: "panel-aiko-460",
    name: "AIKO Neostar All-Black N-Type ABC 460 Wp",
    brand: "AIKO",
    category: "panel",
    powerWp: 460,
    costPrice: 66.00,
    type: "All-Black Prémiový"
  }
];

export const INVERTERS: ProductItem[] = [
  // SOLINTEG HYBRID
  { id: "solinteg-4k", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-4K-25", brand: "Solinteg", category: "inverter", costPrice: 831.30, phase: 3 },
  { id: "solinteg-5k", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-5K-25", brand: "Solinteg", category: "inverter", costPrice: 857.82, phase: 3 },
  { id: "solinteg-6k", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-6K-25", brand: "Solinteg", category: "inverter", costPrice: 887.40, phase: 3 },
  { id: "solinteg-8k", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-8K-25", brand: "Solinteg", category: "inverter", costPrice: 911.88, phase: 3 },
  { id: "solinteg-10k", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-10K-25", brand: "Solinteg", category: "inverter", costPrice: 926.16, phase: 3 },
  { id: "solinteg-10k-40", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-10K-40 (Zvýšený prúd)", brand: "Solinteg", category: "inverter", costPrice: 1049.58, phase: 3 },
  { id: "solinteg-12k-40", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-12K-40", brand: "Solinteg", category: "inverter", costPrice: 1090.38, phase: 3 },
  { id: "solinteg-15k-40", name: "HYBRIDNÝ MENIČ SOLINTEG MHT-15K-40", brand: "Solinteg", category: "inverter", costPrice: 1202.58, phase: 3 },

  // GOODWE HYBRID
  { id: "goodwe-6k", name: "HYBRIDNÝ MENIČ GOODWE GW6000-ET-20 G2", brand: "GoodWe", category: "inverter", costPrice: 1009.80, phase: 3 },
  { id: "goodwe-8k", name: "HYBRIDNÝ MENIČ GOODWE GW8000-ET-20 G2", brand: "GoodWe", category: "inverter", costPrice: 1034.28, phase: 3 },
  { id: "goodwe-10k", name: "HYBRIDNÝ MENIČ GOODWE GW10K-ET-20-G2 (s AFCI ochranou)", brand: "GoodWe", category: "inverter", costPrice: 1050.32, phase: 3 },
  { id: "goodwe-12k", name: "HYBRIDNÝ MENIČ GOODWE GW12K-ET-20G2", brand: "GoodWe", category: "inverter", costPrice: 1082.22, phase: 3 },
  { id: "goodwe-15k", name: "HYBRIDNÝ MENIČ GOODWE GW15K-ET-20 G2", brand: "GoodWe", category: "inverter", costPrice: 1107.72, phase: 3 },

  // SOLAX HYBRID
  { id: "solax-5k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-5.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1108.74, phase: 3 },
  { id: "solax-6k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-6.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1155.66, phase: 3 },
  { id: "solax-8k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-8.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1245.42, phase: 3 },
  { id: "solax-10k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-10.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1358.64, phase: 3 },
  { id: "solax-12k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-12.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1426.98, phase: 3 },
  { id: "solax-15k", name: "HYBRIDNÝ MENIČ SOLAX X3-HYBRID-15.0-D G4.4", brand: "SolaX", category: "inverter", costPrice: 1528.98, phase: 3 },

  // SOLAX ON-GRID (Bez batérie)
  { id: "solax-mic-6k", name: "SIEŤOVÝ ON-GRID MENIČ SOLAX X3-MIC-6K-G2", brand: "SolaX", category: "inverter", costPrice: 614.04, phase: 3 },
  { id: "solax-mic-10k", name: "SIEŤOVÝ ON-GRID MENIČ SOLAX X3-MIC-10K-G2", brand: "SolaX", category: "inverter", costPrice: 703.80, phase: 3 },
  { id: "solax-pro-10k", name: "SIEŤOVÝ ON-GRID MENIČ SOLAX X3-PRO-10K-G2", brand: "SolaX", category: "inverter", costPrice: 842.52, phase: 3 },

  // HUAWEI HYBRID
  { id: "huawei-5k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-5KTL-M1", brand: "Huawei", category: "inverter", costPrice: 652.80, phase: 3 },
  { id: "huawei-6k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-6KTL-M1", brand: "Huawei", category: "inverter", costPrice: 723.18, phase: 3 },
  { id: "huawei-8k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-8KTL-M1", brand: "Huawei", category: "inverter", costPrice: 733.38, phase: 3 },
  { id: "huawei-10k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-10KTL-M1", brand: "Huawei", category: "inverter", costPrice: 863.94, phase: 3 },
  { id: "huawei-12k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-12K-MAP0", brand: "Huawei", category: "inverter", costPrice: 1050.60, phase: 3 },
  { id: "huawei-15k", name: "HYBRIDNÝ MENIČ HUAWEI SUN2000-15K-MB0", brand: "Huawei", category: "inverter", costPrice: 1821.72, phase: 3 },

  // DEYE HYBRID
  { id: "deye-5k", name: "HYBRIDNÝ MENIČ DEYE SUN-5K-SG04LP3-EU (Nízkonapäťový)", brand: "Deye", category: "inverter", costPrice: 867.00, phase: 3 },
  { id: "deye-10k", name: "HYBRIDNÝ MENIČ DEYE SUN-10K-SG01HP3-EU (Vysokonapäťový)", brand: "Deye", category: "inverter", costPrice: 1138.32, phase: 3 },
  { id: "deye-12k", name: "HYBRIDNÝ MENIČ DEYE SUN-12K-SG01HP3-EU (Vysokonapäťový)", brand: "Deye", category: "inverter", costPrice: 1575.90, phase: 3 }
];

export const BATTERIES: ProductItem[] = [
  { id: "bat-none", name: "Systém bez batériového úložiska (On-Grid / Pripravené na batériu)", brand: "Žiadna", category: "battery", capacityKwh: 0, costPrice: 0 },

  // PYLONTECH FORCE H2 / H3
  { id: "bat-pylon-7", name: "Batériové úložisko PYLONTECH FORCE H2 7.1 kWh (BMS + 2x 3.55 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 7.1, costPrice: 1499.40 },
  { id: "bat-pylon-10", name: "Batériové úložisko PYLONTECH FORCE H2 10.65 kWh (BMS + 3x 3.55 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 10.65, costPrice: 2062.44 },
  { id: "bat-pylon-14", name: "Batériové úložisko PYLONTECH FORCE H2 14.2 kWh (BMS + 4x 3.55 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 14.2, costPrice: 2625.48 },
  { id: "bat-pylon-17", name: "Batériové úložisko PYLONTECH FORCE H2 17.75 kWh (BMS + 5x 3.55 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 17.75, costPrice: 3188.52 },
  { id: "bat-pylon-h3-10", name: "Batériové úložisko PYLONTECH FORCE H3 10.24 kWh (BMS + 2x 5.12 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 10.24, costPrice: 1927.80 },
  { id: "bat-pylon-h3-15", name: "Batériové úložisko PYLONTECH FORCE H3 15.36 kWh (BMS + 3x 5.12 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 15.36, costPrice: 2671.38 },
  { id: "bat-pylon-h3-20", name: "Batériové úložisko PYLONTECH FORCE H3 20.48 kWh (BMS + 4x 5.12 kWh)", brand: "Pylontech", category: "battery", capacityKwh: 20.48, costPrice: 3414.96 },

  // GOODWE LYNX
  { id: "bat-goodwe-5", name: "Batériové úložisko GoodWe LYNX 5.0 kWh", brand: "GoodWe", category: "battery", capacityKwh: 5.0, costPrice: 1161.78 },
  { id: "bat-goodwe-10", name: "Batériové úložisko GoodWe LYNX 10.0 kWh", brand: "GoodWe", category: "battery", capacityKwh: 10.0, costPrice: 2323.56 },
  { id: "bat-goodwe-15", name: "Batériové úložisko GoodWe LYNX 15.0 kWh", brand: "GoodWe", category: "battery", capacityKwh: 15.0, costPrice: 3485.34 },

  // SOLAX T-BAT
  { id: "bat-solax-hs25-5", name: "SolaX T-BAT HS2.5 5.0 kWh (BMS + 2x 2.5 kWh)", brand: "SolaX", category: "battery", capacityKwh: 5.0, costPrice: 1692.18 },
  { id: "bat-solax-hs25-10", name: "SolaX T-BAT HS2.5 10.0 kWh (BMS + 4x 2.5 kWh)", brand: "SolaX", category: "battery", capacityKwh: 10.0, costPrice: 2908.02 },
  { id: "bat-solax-hs36-7", name: "SolaX T-BAT HS3.6 7.2 kWh (BMS + 2x 3.6 kWh)", brand: "SolaX", category: "battery", capacityKwh: 7.2, costPrice: 2016.54 },
  { id: "bat-solax-hs36-10", name: "SolaX T-BAT HS3.6 10.8 kWh (BMS + 3x 3.6 kWh)", brand: "SolaX", category: "battery", capacityKwh: 10.8, costPrice: 2786.64 },
  { id: "bat-solax-hs36-14", name: "SolaX T-BAT HS3.6 14.4 kWh (BMS + 4x 3.6 kWh)", brand: "SolaX", category: "battery", capacityKwh: 14.4, costPrice: 3556.74 },
  { id: "bat-solax-58-11", name: "SolaX T-BAT 5.8 V2.1 11.6 kWh (Master + Slave)", brand: "SolaX", category: "battery", capacityKwh: 11.6, costPrice: 2601.00 },

  // HUAWEI LUNA2000
  { id: "bat-huawei-5", name: "Huawei LUNA2000 S1 5.0 kWh", brand: "Huawei", category: "battery", capacityKwh: 5.0, costPrice: 2035.92 },
  { id: "bat-huawei-7", name: "Huawei LUNA2000 S1 6.9 kWh", brand: "Huawei", category: "battery", capacityKwh: 6.9, costPrice: 2602.02 },
  { id: "bat-huawei-10", name: "Huawei LUNA2000 S1 10.0 kWh", brand: "Huawei", category: "battery", capacityKwh: 10.0, costPrice: 3388.44 },
  { id: "bat-huawei-15", name: "Huawei LUNA2000 S1 15.0 kWh", brand: "Huawei", category: "battery", capacityKwh: 15.0, costPrice: 4740.96 },

  // SOLINTEG BATÉRIA
  { id: "bat-solinteg-5", name: "Batériové úložisko Solinteg Integ-E 5.12 kWh + BMS", brand: "Solinteg", category: "battery", capacityKwh: 5.12, costPrice: 1049.58 }
];

export interface RoofStructure {
  id: string;
  name: string;
  costPerPanel: number; // Nákup za 1 panel
}

export const ROOF_STRUCTURES: RoofStructure[] = [
  { id: "rovna-vz", name: "Rovná strecha — Konštrukčný systém Východ-Západ (Fatrafol / štrk)", costPerPanel: 55.00 },
  { id: "rovna-juh", name: "Rovná strecha — Podporná konštrukcia JUH", costPerPanel: 68.00 },
  { id: "sikma-skridla", name: "Šikmá strecha — Škridla / Betónka (Vario nerezové háky)", costPerPanel: 31.00 },
  { id: "sikma-falc", name: "Šikmá strecha — Falcovaný plech / Trapéz", costPerPanel: 31.00 },
  { id: "sikma-sindel", name: "Šikmá strecha — Asfaltový šindeľ / Bobrovka", costPerPanel: 35.00 },
  { id: "clenita", name: "Členitá strecha — Viacero rovín / Špeciálne úchyty", costPerPanel: 60.00 },
  { id: "zemna", name: "Zemná konštrukcia — Montáž na terén / dvor", costPerPanel: 80.00 },
  { id: "fasada", name: "Fasádny montážny systém", costPerPanel: 95.00 }
];

export interface MunicipalityORKO {
  name: string;
  district: string;
  isOrko: boolean; // true = 1 (+15% zvýhodnenie)
}

// Najčastejšie regióny a mestá so statusom ORKO
export const POPULAR_MUNICIPALITIES: MunicipalityORKO[] = [
  { name: "Rosina", district: "Žilina", isOrko: true },
  { name: "Žilina", district: "Žilina", isOrko: true },
  { name: "Martin", district: "Martin", isOrko: true },
  { name: "Vrútky", district: "Martin", isOrko: true },
  { name: "Turany", district: "Martin", isOrko: true },
  { name: "Sučany", district: "Martin", isOrko: true },
  { name: "Banská Bystrica", district: "Banská Bystrica", isOrko: true },
  { name: "Brezno", district: "Brezno", isOrko: true },
  { name: "Bytča", district: "Bytča", isOrko: true },
  { name: "Čadca", district: "Čadca", isOrko: true },
  { name: "Krásno nad Kysucou", district: "Čadca", isOrko: true },
  { name: "Dolný Kubín", district: "Dolný Kubín", isOrko: true },
  { name: "Kysucké Nové Mesto", district: "Kysucké Nové Mesto", isOrko: true },
  { name: "Liptovský Mikuláš", district: "Liptovský Mikuláš", isOrko: true },
  { name: "Liptovský Hrádok", district: "Liptovský Mikuláš", isOrko: true },
  { name: "Lučenec", district: "Lučenec", isOrko: true },
  { name: "Námestovo", district: "Námestovo", isOrko: true },
  { name: "Považská Bystrica", district: "Považská Bystrica", isOrko: true },
  { name: "Prievidza", district: "Prievidza", isOrko: true },
  { name: "Púchov", district: "Púchov", isOrko: true },
  { name: "Revúca", district: "Revúca", isOrko: true },
  { name: "Rimavská Sobota", district: "Rimavská Sobota", isOrko: true },
  { name: "Rožňava", district: "Rožňava", isOrko: true },
  { name: "Ružomberok", district: "Ružomberok", isOrko: true },
  { name: "Trenčín", district: "Trenčín", isOrko: true },
  { name: "Prešov", district: "Prešov", isOrko: true },
  { name: "Košice", district: "Košice", isOrko: true },
  { name: "Zvolen", district: "Zvolen", isOrko: true },
  { name: "Zlaté Moravce", district: "Zlaté Moravce", isOrko: true },
  { name: "Bratislava", district: "Bratislava", isOrko: false },
  { name: "Trnava", district: "Trnava", isOrko: false },
  { name: "Nitra", district: "Nitra", isOrko: false },
  { name: "Poprad", district: "Poprad", isOrko: false },
  { name: "Piešťany", district: "Piešťany", isOrko: false },
  { name: "Senec", district: "Senec", isOrko: false },
  { name: "Pezinok", district: "Pezinok", isOrko: false },
  { name: "Malacky", district: "Malacky", isOrko: false },
  { name: "Dunajská Streda", district: "Dunajská Streda", isOrko: false }
];

// Konfigurácia dopytu zadaná obchodníkom
export interface QuoteInputs {
  quoteNumber: string;
  date: string;
  validDays: number;
  salesRepId: string;

  // Klient
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientDistrict: string;
  clientPhone: string;
  clientEmail: string;
  clientEic: string;

  // Technológia
  panelId: string;
  panelCount: number;
  inverterId: string;
  batteryId: string;
  roofId: string;
  roofPitchDeg: number;
  roofOrientation: string;

  // Bezpečnosť & Doplnky
  hasTigoStop: boolean;
  optimizerCount: number;
  rapidShutdownCount: number;
  backupType: "none" | "socket" | "distribution_board";
  hasHus: boolean;
  lightningProtection: "none" | "modification" | "new_installation";
  hasWallbox: boolean;
  wallboxBrand: string;
  hasDryContactBoiler: boolean; // zopínanie bojlera z pretokov

  // Vedenia a vzdialenosti
  distanceKm: number;
  acCableMeters: number;
  dcCableMeters: number;

  // Dotácia & Zvýhodnenie
  applySubsidy: boolean;
  isOrkoRegion: boolean;
  subsidyTier: "standard" | "solidarity"; // standard (500/575) vs solidarita (900)
  annualConsumptionKwh: number;

  // Obchodné parametre
  marginMultiplier: number; // Štandard 1.5
  vatRate: number; // 0.23 (23%)
  salesRepCommissionPct: number; // 10%

  // Ručné nastavenie cien a prác (voliteľné rozšírenie)
  priceInputMode?: "cost" | "selling"; // "cost" = nákupná cena s maržou, "selling" = priama predajná cena
  customPanelPrice?: number; // Cena za 1 panel bez DPH
  customRoofPrice?: number; // Cena konštrukcie na 1 panel bez DPH
  customInverterPrice?: number; // Cena meniča bez DPH
  customBatteryPrice?: number; // Cena batérie bez DPH
  customMountingLabor?: number; // Cena za montážne práce bez DPH
  customElectricalLabor?: number; // Cena za elektroinštalačné práce bez DPH
  customInspectionAdminPrice?: number; // Cena za revíziu a administratívu bez DPH
  customTransportRate?: number; // Sadzba dopravy (€/km)

  // Vlastná doplnková položka (materiál / extra práce)
  customItemName?: string;
  customItemPrice?: number;
  customItemQty?: number;
  customItemUnit?: string;
}

export interface QuoteCalculationResult {
  installedPowerKwp: number;
  expectedAnnualProductionMwh: number;
  panelActiveAreaM2: number;

  totalCostWithoutVat: number; // Náklady Marvol
  sellingPriceWithoutVat: number; // Predajná cena bez DPH
  vatAmount: number; // DPH 23%
  sellingPriceWithVat: number; // Predajná cena s DPH

  subsidyAmount: number; // Výška dotácie SIEA
  finalPriceAfterSubsidyWithVat: number; // Klient reálne zaplatí po dotácii
  pricePerWpWithSubsidy: number; // € / Wp

  estimatedPaybackYears: number;
  salesRepCommissionEur: number;
  companyMarginEur: number;

  itemsBreakdown: {
    title: string;
    category: string;
    quantity: number;
    unit: string;
    unitPriceEur: number;
    totalPriceEur: number;
  }[];

  installationChecklist: {
    material: string;
    qty: number | string;
    unit: string;
    note?: string;
  }[];
}

export function calculateQuote(inputs: QuoteInputs): QuoteCalculationResult {
  const panel = PV_PANELS.find(p => p.id === inputs.panelId) || PV_PANELS[0];
  const inverter = INVERTERS.find(i => i.id === inputs.inverterId) || INVERTERS[0];
  const battery = BATTERIES.find(b => b.id === inputs.batteryId) || BATTERIES[0];
  const roof = ROOF_STRUCTURES.find(r => r.id === inputs.roofId) || ROOF_STRUCTURES[0];

  const margin = inputs.marginMultiplier > 1 ? inputs.marginMultiplier : 1.5;
  const vat = inputs.vatRate || 0.23;

  const totalPowerWp = inputs.panelCount * (panel.powerWp || 455);
  const installedPowerKwp = Number((totalPowerWp / 1000).toFixed(2));
  const expectedAnnualProductionMwh = Number((installedPowerKwp * 1.07).toFixed(2));
  const panelActiveAreaM2 = Number((inputs.panelCount * 2.1).toFixed(1));

  // --- NÁKLADY ---
  const isSellingMode = inputs.priceInputMode === "selling";

  // Pomocný výpočet pre vlastné ceny (nákupná vs predajná cena)
  const resolvePrice = (customVal: number | undefined, defaultCost: number): { cost: number; sell: number } => {
    if (customVal !== undefined && customVal > 0) {
      if (isSellingMode) {
        return { cost: customVal / margin, sell: customVal };
      } else {
        return { cost: customVal, sell: customVal * margin };
      }
    }
    return { cost: defaultCost, sell: defaultCost * margin };
  };

  let totalCost = 0;
  const items: QuoteCalculationResult["itemsBreakdown"] = [];

  // 1. Panely
  const panelPrice = resolvePrice(inputs.customPanelPrice, panel.costPrice);
  const panelsCost = inputs.panelCount * panelPrice.cost;
  const panelsSell = inputs.panelCount * panelPrice.sell;
  totalCost += panelsCost;
  items.push({
    title: panel.name,
    category: "Fotovoltický panel",
    quantity: inputs.panelCount,
    unit: "ks",
    unitPriceEur: Number(panelPrice.sell.toFixed(2)),
    totalPriceEur: Number(panelsSell.toFixed(2))
  });

  // 2. Menič
  const invPrice = resolvePrice(inputs.customInverterPrice, inverter.costPrice);
  totalCost += invPrice.cost;
  items.push({
    title: inverter.name,
    category: "Striedač",
    quantity: 1,
    unit: "ks",
    unitPriceEur: Number(invPrice.sell.toFixed(2)),
    totalPriceEur: Number(invPrice.sell.toFixed(2))
  });

  // 3. Batériové úložisko (ak je zvolené)
  if (battery.capacityKwh && battery.capacityKwh > 0) {
    const batPrice = resolvePrice(inputs.customBatteryPrice, battery.costPrice);
    totalCost += batPrice.cost;
    items.push({
      title: battery.name,
      category: "Batéria",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number(batPrice.sell.toFixed(2)),
      totalPriceEur: Number(batPrice.sell.toFixed(2))
    });
  }

  // 4. Konštrukčný systém
  const roofPrice = resolvePrice(inputs.customRoofPrice, roof.costPerPanel);
  const roofCost = inputs.panelCount * roofPrice.cost;
  const roofSell = inputs.panelCount * roofPrice.sell;
  totalCost += roofCost;
  items.push({
    title: roof.name,
    category: "Konštrukcia",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number(roofSell.toFixed(2)),
    totalPriceEur: Number(roofSell.toFixed(2))
  });

  // 5. Spojovací a kotviaci materiál
  const fastenersCost = 40.00;
  totalCost += fastenersCost;
  items.push({
    title: "Spojovací a kotviaci materiál (A2 nerez / hliník)",
    category: "Kotviaci materiál",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number((fastenersCost * margin).toFixed(2)),
    totalPriceEur: Number((fastenersCost * margin).toFixed(2))
  });

  // 6. Bezpečnostné prvky (TIGO / STOP tlačidlo)
  if (inputs.hasTigoStop) {
    const tigoCost = 280.00;
    totalCost += tigoCost;
    items.push({
      title: "Bezpečnostný TIGO KIT a STOP tlačidlo pre hasičov",
      category: "Bezpečnostný systém",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((tigoCost * margin).toFixed(2)),
      totalPriceEur: Number((tigoCost * margin).toFixed(2))
    });
  }

  if (inputs.optimizerCount > 0) {
    const optCost = inputs.optimizerCount * 30.00;
    totalCost += optCost;
    items.push({
      title: "Výkonové optimizéry panelov s modulom Rapid Shutdown",
      category: "Optimizér",
      quantity: inputs.optimizerCount,
      unit: "ks",
      unitPriceEur: Number((30.00 * margin).toFixed(2)),
      totalPriceEur: Number((optCost * margin).toFixed(2))
    });
  }

  // 7. Rozvodnica, Smartmeter, Istenie
  const switchboardCost = 340.00; // Smartmeter DTSU666 (120) + AC/DC rozvodnica a poistky (220)
  totalCost += switchboardCost;
  items.push({
    title: "Inteligentný Smartmeter DTSU666, AC + DC rozvodnica a istenie ETI",
    category: "Rozvádzač a istenie",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number((switchboardCost * margin).toFixed(2)),
    totalPriceEur: Number((switchboardCost * margin).toFixed(2))
  });

  // 8. EPS Záloha (ak je vybratá)
  if (inputs.backupType === "socket") {
    const epsCost = 80.00;
    totalCost += epsCost;
    items.push({
      title: "Záložný okruh EPS — Núdzová zásuvka pri meniči",
      category: "Záložný systém (EPS)",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((epsCost * margin).toFixed(2)),
      totalPriceEur: Number((epsCost * margin).toFixed(2))
    });
  } else if (inputs.backupType === "distribution_board") {
    const epsCost = 200.00;
    totalCost += epsCost;
    items.push({
      title: "Plný automatický EPS BACK-UP pre vybrané okruhy domu (5-10 okruhov)",
      category: "Záložný systém (EPS)",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((epsCost * margin).toFixed(2)),
      totalPriceEur: Number((epsCost * margin).toFixed(2))
    });
  }

  // 9. HUS
  if (inputs.hasHus) {
    const husCost = 250.00;
    totalCost += husCost;
    items.push({
      title: "Hlavná uzemňovacia sústava (HUS) a pospájanie",
      category: "Uzemnenie (HUS)",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((husCost * margin).toFixed(2)),
      totalPriceEur: Number((husCost * margin).toFixed(2))
    });
  }

  // 10. Bleskozvod
  if (inputs.lightningProtection === "modification") {
    const lpCost = 500.00;
    totalCost += lpCost;
    items.push({
      title: "Úprava bleskozvodovej sústavy a revízia bleskozvodu",
      category: "Bleskozvod",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((lpCost * margin).toFixed(2)),
      totalPriceEur: Number((lpCost * margin).toFixed(2))
    });
  } else if (inputs.lightningProtection === "new_installation") {
    const lpCost = 1500.00;
    totalCost += lpCost;
    items.push({
      title: "Kompletné vybudovanie novej bleskozvodovej sústavy vrátane revízie",
      category: "Bleskozvod",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((lpCost * margin).toFixed(2)),
      totalPriceEur: Number((lpCost * margin).toFixed(2))
    });
  }

  // 11. Zopínanie bojlera (Dry contact)
  if (inputs.hasDryContactBoiler) {
    const dcCost = 54.00;
    totalCost += dcCost;
    items.push({
      title: "Inteligentné zopínanie bojlera z fotovoltických pretokov (Dry Contact)",
      category: "Riadenie pretokov",
      quantity: 1,
      unit: "kpl",
      unitPriceEur: Number((dcCost * margin).toFixed(2)),
      totalPriceEur: Number((dcCost * margin).toFixed(2))
    });
  }

  // 12. Káble AC & DC
  const acCableCost = (inputs.acCableMeters || 5) * 5.00;
  const dcCableCost = (inputs.dcCableMeters || 30) * 2.50;
  const totalCableCost = acCableCost + dcCableCost;
  totalCost += totalCableCost;
  items.push({
    title: "Elektroinštalačná kabeláž AC + DC a chráničky s UV ochranou",
    category: "Kabeláž",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number((totalCableCost * margin).toFixed(2)),
    totalPriceEur: Number((totalCableCost * margin).toFixed(2))
  });

  // 13. Montážne práce
  const autoMountCost = totalPowerWp * 0.075;
  const mountPrice = resolvePrice(inputs.customMountingLabor, autoMountCost);
  totalCost += mountPrice.cost;
  items.push({
    title: "Montážne a stavebné práce (Inštalácia konštrukcie a panelov na strechu)",
    category: "Montážne práce",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number(mountPrice.sell.toFixed(2)),
    totalPriceEur: Number(mountPrice.sell.toFixed(2))
  });

  // 14. Elektroinštalačné práce
  const elecPrice = resolvePrice(inputs.customElectricalLabor, 330.60);
  totalCost += elecPrice.cost;
  items.push({
    title: "Elektroinštalačné práce, osadenie meniča a oživenie systému",
    category: "Elektroinštalačné práce",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number(elecPrice.sell.toFixed(2)),
    totalPriceEur: Number(elecPrice.sell.toFixed(2))
  });

  // 15. Revízia a administratíva
  const adminPrice = resolvePrice(inputs.customInspectionAdminPrice, 250.00);
  totalCost += adminPrice.cost;
  items.push({
    title: "Úradná revízna správa, projektová schéma a kompletná administratíva",
    category: "Revízia a administratíva",
    quantity: 1,
    unit: "kpl",
    unitPriceEur: Number(adminPrice.sell.toFixed(2)),
    totalPriceEur: Number(adminPrice.sell.toFixed(2))
  });

  // 16. Doprava
  if (inputs.distanceKm && inputs.distanceKm > 0) {
    const rateKm = inputs.customTransportRate && inputs.customTransportRate > 0 ? inputs.customTransportRate : 0.50;
    const transUnit = resolvePrice(rateKm, 0.50);
    const transportCost = inputs.distanceKm * transUnit.cost;
    const transportSell = inputs.distanceKm * transUnit.sell;
    totalCost += transportCost;
    items.push({
      title: `Doprava materiálu a montážnej skupiny (${inputs.distanceKm} km)`,
      category: "Doprava",
      quantity: inputs.distanceKm,
      unit: "km",
      unitPriceEur: Number(transUnit.sell.toFixed(2)),
      totalPriceEur: Number(transportSell.toFixed(2))
    });
  }

  // 17. Vlastná doplnková položka (ak je zadaná)
  if (inputs.customItemName && inputs.customItemName.trim() && inputs.customItemPrice && inputs.customItemPrice > 0) {
    const customQty = inputs.customItemQty && inputs.customItemQty > 0 ? inputs.customItemQty : 1;
    const customPrice = resolvePrice(inputs.customItemPrice, inputs.customItemPrice);
    const itemCost = customQty * customPrice.cost;
    const itemSell = customQty * customPrice.sell;
    totalCost += itemCost;
    items.push({
      title: inputs.customItemName.trim(),
      category: "Doplnkové práce / materiál",
      quantity: customQty,
      unit: inputs.customItemUnit?.trim() || "kpl",
      unitPriceEur: Number(customPrice.sell.toFixed(2)),
      totalPriceEur: Number(itemSell.toFixed(2))
    });
  }

  // --- SÚČTY ---
  const sellingPriceWithoutVat = Number(items.reduce((acc, it) => acc + it.totalPriceEur, 0).toFixed(2));
  const vatAmount = Number((sellingPriceWithoutVat * vat).toFixed(2));
  const sellingPriceWithVat = Number((sellingPriceWithoutVat + vatAmount).toFixed(2));

  // --- DOTÁCIA ---
  let subsidyAmount = 0;
  if (inputs.applySubsidy) {
    if (inputs.subsidyTier === "solidarity") {
      // Zelená solidarita: 900 €/kW (max 2 kW = 1 800 €)
      subsidyAmount = Math.min(installedPowerKwp, 2) * 900;
    } else {
      // Zelená domácnostiam:
      // Základ: 500 €/kW, ak ORKO: 575 €/kW
      const ratePerKw = inputs.isOrkoRegion ? 575 : 500;
      // Podporovaný výkon štandardne max 2 kW (pri vysokej spotrebe > 3500 kWh môže byť max 3 kW)
      const maxKw = inputs.annualConsumptionKwh >= 3500 ? 3 : 2;
      const supportedKw = Math.min(installedPowerKwp, maxKw);
      subsidyAmount = supportedKw * ratePerKw;
    }
  }

  subsidyAmount = Number(subsidyAmount.toFixed(2));
  const finalPriceAfterSubsidyWithVat = Number(Math.max(0, sellingPriceWithVat - subsidyAmount).toFixed(2));
  const pricePerWpWithSubsidy = totalPowerWp > 0 ? Number((finalPriceAfterSubsidyWithVat / totalPowerWp).toFixed(2)) : 0;

  // Odhad návratnosti (ročne vyrobí ~1.07 MWh na 1 kWp, cena EE cca 0.18 €/kWh, 70% vlastná spotreba + zbytok virtuálna batéria)
  const annualSavingsEur = expectedAnnualProductionMwh * 1000 * 0.18;
  const estimatedPaybackYears = annualSavingsEur > 0 ? Number((finalPriceAfterSubsidyWithVat / annualSavingsEur).toFixed(1)) : 6.0;

  const salesRepCommissionEur = Number((sellingPriceWithoutVat * (inputs.salesRepCommissionPct / 100)).toFixed(2));
  const companyMarginEur = Number((sellingPriceWithoutVat - totalCost - salesRepCommissionEur).toFixed(2));

  // --- MONTÁŽNA ŽIADANKA (Checklist pre technikov) ---
  const checklist: QuoteCalculationResult["installationChecklist"] = [
    { material: panel.name, qty: inputs.panelCount, unit: "ks", note: "Overiť sériové čísla a nepoškodenosť skla" },
    { material: inverter.name, qty: 1, unit: "ks", note: "Vrátane montážneho závesu a Wi-Fi dongle" },
    ...(battery.capacityKwh && battery.capacityKwh > 0 ? [
      { material: battery.name, qty: 1, unit: "kpl", note: "Skontrolovať prepojovacie silové a dátové káble BMS" }
    ] : []),
    { material: `Nosné AL profily 4m pre konštrukciu (${roof.name})`, qty: Math.ceil(inputs.panelCount * 0.7), unit: "ks" },
    { material: "Spojky AL profilov + nerezové skrutky", qty: Math.ceil(inputs.panelCount * 0.6), unit: "ks" },
    { material: "Krajné príchytky (Omega KRAJ) s imbusom", qty: 8, unit: "ks" },
    { material: "Stredové príchytky (Omega STRED) s imbusom", qty: (inputs.panelCount - 1) * 2, unit: "ks" },
    { material: "Kotviace háky / úchyty podľa typu krytiny", qty: Math.ceil(inputs.panelCount * 2.5), unit: "ks" },
    { material: "Smartmeter DTSU666 trojfázový", qty: 1, unit: "ks", note: "Vrátane meracích prúdových transformátorov CT" },
    { material: "Rozvádzač AC (ističe B16/3, B25/3, PCH typ A 40A/30mA)", qty: 1, unit: "kpl" },
    { material: "Rozvádzač DC (prepäťová ochrana T1+T2 1000V, poistky)", qty: 1, unit: "kpl" },
    { material: "Solárny kábel H1Z2Z2-K 6mm² červený", qty: Math.ceil(inputs.dcCableMeters * 0.6), unit: "m" },
    { material: "Solárny kábel H1Z2Z2-K 6mm² čierny", qty: Math.ceil(inputs.dcCableMeters * 0.6), unit: "m" },
    { material: "Silový kábel CYKY-J 5x2.5 / 5x6", qty: inputs.acCableMeters + 3, unit: "m" },
    { material: "Konektory MC4 sada (samec + samica)", qty: 6, unit: "párov" },
    { material: "Uzemňovací vodič ZŽ CYA 16mm²", qty: 20, unit: "m" },
    { material: "UV stabilná chránička Ø 32mm", qty: Math.ceil(inputs.dcCableMeters * 0.7), unit: "m" },
    ...(inputs.hasTigoStop ? [
      { material: "TIGO KIT vysielač + STOP tlačidlo núdzového vypnutia", qty: 1, unit: "kpl" }
    ] : []),
    ...(inputs.customItemName && inputs.customItemName.trim() ? [
      { material: inputs.customItemName.trim(), qty: inputs.customItemQty || 1, unit: inputs.customItemUnit?.trim() || "kpl", note: "Špecifická požiadavka / extra položka" }
    ] : [])
  ];

  return {
    installedPowerKwp,
    expectedAnnualProductionMwh,
    panelActiveAreaM2,
    totalCostWithoutVat: Number(totalCost.toFixed(2)),
    sellingPriceWithoutVat,
    vatAmount,
    sellingPriceWithVat,
    subsidyAmount,
    finalPriceAfterSubsidyWithVat,
    pricePerWpWithSubsidy,
    estimatedPaybackYears,
    salesRepCommissionEur,
    companyMarginEur,
    itemsBreakdown: items,
    installationChecklist: checklist
  };
}
