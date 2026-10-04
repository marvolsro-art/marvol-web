import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

// =============================================================================
// TYPES & DATA STRUCTURES
// =============================================================================

export type ProductCategory =
  | 'panels'
  | 'inverters'
  | 'storage'
  | 'wallbox'
  | 'mounting'
  | 'sets';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductMock {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  model: string;
  powerKw?: number;
  capacityKwh?: number;
  phase?: '1-phase' | '3-phase';
  priceExVat: number;
  inStock: boolean;
  stockQty: number;
  badge?: string;
  badgeColor?: 'amber' | 'emerald' | 'sky' | 'purple';
  warranty: string;
  specs: ProductSpec[];
  description: string;
}

export interface FilterState {
  category: string;
  brand: string;
  phase: string;
  powerRange: string;
  searchQuery: string;
}

// =============================================================================
// MOCK PRODUCT CATALOG
// =============================================================================

export const ESHOP_PRODUCTS: ProductMock[] = [
  // 1. Solárne panely
  {
    id: 'panel-canadian-450',
    name: 'Canadian Solar HiKu7 N-Type TOPCon 450 Wp Bifacial',
    category: 'panels',
    brand: 'Canadian Solar',
    model: 'CS7L-450MS-BF',
    powerKw: 0.45,
    priceExVat: 109.0,
    inStock: true,
    stockQty: 142,
    badge: 'Tier 1 Top Seller',
    badgeColor: 'amber',
    warranty: '30 rokov lineárna garancia',
    specs: [
      { label: 'Účinnosť', value: '22.5 %' },
      { label: 'Technológia', value: 'Bifacial N-Type TOPCon' },
      { label: 'Rám', value: 'Čierny eloxovaný hliník 30mm' },
      { label: 'Zaťaženie', value: 'Sneh 5400 Pa / Vietor 2400 Pa' },
    ],
    description:
      'Špičkový bifaciálny fotovoltický panel s TOPCon článkami a zadným sklom pre dodatočný energetický zisk až +25% odrazom z podkladu.',
  },
  {
    id: 'panel-jinko-580',
    name: 'Jinko Solar Tiger Neo 580 Wp Bifacial N-Type',
    category: 'panels',
    brand: 'Jinko',
    model: 'JKM580N-72HL4-BDV',
    powerKw: 0.58,
    priceExVat: 145.0,
    inStock: true,
    stockQty: 88,
    badge: 'Priemyselný výkon',
    badgeColor: 'sky',
    warranty: '30 rokov lineárna garancia',
    specs: [
      { label: 'Účinnosť', value: '22.45 %' },
      { label: 'Technológia', value: 'SMBB Dual-Glass N-Type' },
      { label: 'Rozmery', value: '2278 × 1134 × 30 mm' },
      { label: 'Degradácia', value: '1. rok <1%, potom max 0.4%/rok' },
    ],
    description:
      'Vysokovýkonný priemyselný fotovoltický panel Tiger Neo s 16-zbernicovou architektúrou pre komerčné strešné a pozemné inštalácie.',
  },

  // 2. Striedače & Invertory
  {
    id: 'inverter-huawei-10ktl',
    name: 'Huawei SUN2000-10KTL-M1 (10 kW, 3-fázy, Hybrid)',
    category: 'inverters',
    brand: 'Huawei',
    model: 'SUN2000-10KTL-M1',
    powerKw: 10,
    phase: '3-phase',
    priceExVat: 1790.0,
    inStock: true,
    stockQty: 24,
    badge: 'AI AFCI Ochrana',
    badgeColor: 'emerald',
    warranty: '10 rokov záruka výrobcu',
    specs: [
      { label: 'Menovitý výkon', value: '10 000 W (3-fázový)' },
      { label: 'Max. účinnosť', value: '98.6 % (Euro 98.1 %)' },
      { label: 'Ochrana oblúka', value: 'AI Arc Fault Protection (AFCI)' },
      { label: 'Batériové rozhranie', value: 'Integrované pre LUNA2000' },
    ],
    description:
      'Inteligentný trojfázový hybridný menič najnovšej generácie s umelou inteligenciou pre detekciu oblúka a okamžitú pripravenosť na batérie.',
  },
  {
    id: 'inverter-solax-x3-10',
    name: 'SolaX X3-Hybrid G4 10.0-D (10 kW, 3-fázy, EPS záloha)',
    category: 'inverters',
    brand: 'SolaX',
    model: 'X3-Hybrid-10.0-D G4',
    powerKw: 10,
    phase: '3-phase',
    priceExVat: 1680.0,
    inStock: true,
    stockQty: 18,
    badge: 'EPS UPS Backup <10ms',
    badgeColor: 'amber',
    warranty: '10 rokov záruka výrobcu',
    specs: [
      { label: 'Menovitý výkon', value: '10 000 W (3-fázový)' },
      { label: 'Asymetrický výstup', value: 'Až do 150% preťaženia na fázu' },
      { label: 'Čas prepnutia', value: '< 10 ms (okamžitý UPS záskok)' },
      { label: 'Krytie', value: 'IP65 vonkajšie' },
    ],
    description:
      'Mimoriadne obľúbený hybridný striedač 4. generácie s plnohodnotným asymetrickým zálohovaním celej domácnosti pri výpadku distribučnej siete.',
  },
  {
    id: 'inverter-fronius-symo-10',
    name: 'Fronius Symo GEN24 10.0 Plus (10 kW, 3-fázy)',
    category: 'inverters',
    brand: 'Fronius',
    model: 'Symo GEN24 10.0 Plus',
    powerKw: 10,
    phase: '3-phase',
    priceExVat: 2250.0,
    inStock: true,
    stockQty: 12,
    badge: 'Made in Austria',
    badgeColor: 'purple',
    warranty: '5 + 5 rokov záruka',
    specs: [
      { label: 'Menovitý výkon', value: '10 000 W (3-fázový)' },
      { label: 'Multi Flow Tech', value: 'Paralelný obojsmerný tok energie' },
      { label: 'PV Point', value: 'Núdzová 3 kW zásuvka bez batérie' },
      { label: 'Chladenie', value: 'Aktívny ventilátor s dlhou životnosťou' },
    ],
    description:
      'Prémiový rakúsky hybridný menič s unikátnou funkciou núdzového napájania PV Point aj bez pripojeného batériového úložiska.',
  },
  {
    id: 'inverter-huawei-5ktl-l1',
    name: 'Huawei SUN2000-5KTL-L1 (5 kW, 1-fáza, Hybrid)',
    category: 'inverters',
    brand: 'Huawei',
    model: 'SUN2000-5KTL-L1',
    powerKw: 5,
    phase: '1-phase',
    priceExVat: 1080.0,
    inStock: true,
    stockQty: 15,
    badge: '1-fázový Kompakt',
    badgeColor: 'sky',
    warranty: '10 rokov záruka výrobcu',
    specs: [
      { label: 'Menovitý výkon', value: '5 000 W (1-fázový)' },
      { label: 'MPPT vstupy', value: '2 nezávislé trackery' },
      { label: 'Hlučnosť', value: 'Pasívne chladenie (< 29 dB)' },
      { label: 'Hmotnosť', value: 'Iba 12.0 kg' },
    ],
    description:
      'Jednofázový hybridný menič ideálny pre menšie rodinné domy, chaty a inštalácie s obmedzenou 1-fázovou prípojkou.',
  },

  // 3. Batériové úložiská
  {
    id: 'storage-huawei-luna-10',
    name: 'Huawei LUNA2000-10-S0 (10 kWh LiFePO4 HV)',
    category: 'storage',
    brand: 'Huawei',
    model: 'LUNA2000-10-S0',
    capacityKwh: 10,
    priceExVat: 3890.0,
    inStock: true,
    stockQty: 16,
    badge: '100% Hĺbka DoD',
    badgeColor: 'emerald',
    warranty: '10 rokov záruka výrobcu',
    specs: [
      { label: 'Využiteľná kapacita', value: '10 kWh (2× 5 kWh moduly)' },
      { label: 'Chémia článkov', value: 'LiFePO4 (lítium-železo-fosfát)' },
      { label: 'Optimalizátor', value: 'Nezávislý pack optimizer v module' },
      { label: 'Požiarna ochrana', value: 'Integrované hasiace mikrovrecká' },
    ],
    description:
      'Modulárne vysokonapäťové úložisko Huawei s 100% využiteľnou kapacitou a vstavaným optimalizátorom energie pre každý batériový modul.',
  },
  {
    id: 'storage-dyness-t10',
    name: 'Dyness Tower T10 (10.66 kWh LiFePO4 HV)',
    category: 'storage',
    brand: 'Dyness',
    model: 'Tower T10 HV',
    capacityKwh: 10.66,
    priceExVat: 3190.0,
    inStock: true,
    stockQty: 20,
    badge: '6000+ Cyklov',
    badgeColor: 'amber',
    warranty: '10 rokov (6 000 cyklov)',
    specs: [
      { label: 'Využiteľná kapacita', value: '10.66 kWh' },
      { label: 'Menovité napätie', value: '288 V (vysokonapäťová HV)' },
      { label: 'Kompatibilita', value: 'SolaX, GoodWe, Sungrow' },
      { label: 'Krytie', value: 'IP54 pre interiér aj garáž' },
    ],
    description:
      'Stohovateľné batériové úložisko LiFePO4 typu Tower s mimoriadne priaznivým pomerom ceny a kapacity, kompatibilné s poprednými hybridnými invertormi.',
  },

  // 4. EV Charger Wallboxy
  {
    id: 'wallbox-marvol-22',
    name: 'Marvol Smart Wallbox 22 kW RFID / Wi-Fi / DLB',
    category: 'wallbox',
    brand: 'Huawei',
    model: 'Marvol EV-22-DLB',
    powerKw: 22,
    phase: '3-phase',
    priceExVat: 690.0,
    inStock: true,
    stockQty: 35,
    badge: 'Dynamické riadenie DLB',
    badgeColor: 'emerald',
    warranty: '3 roky záruka',
    specs: [
      { label: 'Nabíjací výkon', value: 'Nastaviteľný 1.4 kW až 22 kW' },
      { label: 'Konektor', value: 'Type 2 kábel 5 m súčasťou balenia' },
      { label: 'Konektivita', value: 'Wi-Fi, Bluetooth, RFID autorizácia' },
      { label: 'Solárny režim', value: 'Nabíjanie iba z čistých FV prebytkov' },
    ],
    description:
      'Inteligentná trojfázová domáca i firemná nabíjacia stanica pre elektromobily s dynamickým meraním celkovej záťaže objektu a ochranou hlavného ističa.',
  },

  // 5. Hliníkové konštrukcie & Kabeláž
  {
    id: 'mounting-10-panels',
    name: 'Kompletná konštrukcia pre 10 panelov (škridla / falc / plech)',
    category: 'mounting',
    brand: 'Canadian Solar',
    model: 'Marvol Roof Mounting Kit 10P',
    priceExVat: 380.0,
    inStock: true,
    stockQty: 40,
    badge: 'Eloxovaný AL6005-T5',
    badgeColor: 'sky',
    warranty: '15 rokov garancia na koróziu',
    specs: [
      { label: 'Materiál', value: 'Eloxovaný hliník AL6005-T5, nerez A2' },
      { label: 'Komponenty', value: 'Profily 40x40, nerezové háky, úchytky' },
      { label: 'Norma', value: 'Eurokód 1 (zaťaženie vetrom do 160 km/h)' },
      { label: 'Farba', value: 'Strieborná alebo celočierna anodizácia' },
    ],
    description:
      'Certifikovaný montážny set s eloxovanými hliníkovými profilmi a masívnymi nerezovými strešnými hákmi pre bezpečné uchytenie 10 FV panelov.',
  },
  {
    id: 'cabling-mc4-drum',
    name: 'Solárny UV kábel 6mm² (bubon 100m) + konektory MC4 Stäubli',
    category: 'mounting',
    brand: 'Canadian Solar',
    model: 'Solar-Cable-6mm-MC4',
    priceExVat: 120.0,
    inStock: true,
    stockQty: 60,
    badge: 'Originál MC4 Stäubli',
    badgeColor: 'purple',
    warranty: '25 rokov životnosť v exteriéri',
    specs: [
      { label: 'Prierez vodiča', value: '6 mm² pocínované medené lanko' },
      { label: 'Dĺžka', value: '100 m bubon (čierny / červený)' },
      { label: 'Konektory', value: '4 páry originálnych Stäubli MC4 EVO2' },
      { label: 'Certifikácia', value: 'TÜV EN 50618 (H1Z2Z2-K)' },
    ],
    description:
      'Vysokokvalitný bezhalogénový fotovoltický kábel s dvojitou izoláciou, UV stabilizáciou a originálnymi švajčiarskymi konektormi Stäubli.',
  },

  // 6. Hotové FV sety
  {
    id: 'set-ongrid-5kwp',
    name: 'Kompletný On-Grid set 5 kWp (Canadian Solar TOPCon + Huawei)',
    category: 'sets',
    brand: 'Huawei',
    model: 'Set On-Grid 5 kWp',
    powerKw: 5,
    phase: '3-phase',
    priceExVat: 3490.0,
    inStock: true,
    stockQty: 8,
    badge: 'Dotácia SIEA do 1 500 €',
    badgeColor: 'amber',
    warranty: '30 rokov panely, 10 rokov menič',
    specs: [
      { label: 'Panely v zostave', value: '11× Canadian Solar 450 Wp TOPCon' },
      { label: 'Striedač', value: 'Huawei SUN2000-5KTL-M1 (3-fázový)' },
      { label: 'Príslušenstvo', value: 'Kompletná konštrukcia, DC/AC rozvádzač' },
      { label: 'Ročná výroba', value: 'cca 5 500 – 6 000 kWh / rok' },
    ],
    description:
      'Kompletný 3-fázový on-grid set pre rodinné domy s overenou kompatibilitou, pripravený na montáž a pripojenie do distribučnej siete.',
  },
  {
    id: 'set-hybrid-10kwp',
    name: 'Kompletný Hybridný set 10 kWp + 10 kWh batéria (SolaX + LiFePO4)',
    category: 'sets',
    brand: 'SolaX',
    model: 'Set Hybrid 10 kWp + 10 kWh',
    powerKw: 10,
    capacityKwh: 10,
    phase: '3-phase',
    priceExVat: 7990.0,
    inStock: true,
    stockQty: 6,
    badge: 'Dotácia SIEA do 1 150 €',
    badgeColor: 'emerald',
    warranty: '30 rokov panely, 10 rokov menič & batéria',
    specs: [
      { label: 'Panely v zostave', value: '22× Canadian Solar 450 Wp N-Type' },
      { label: 'Striedač', value: 'SolaX X3-Hybrid G4 10.0-D 3-fázový' },
      { label: 'Batériové úložisko', value: '10 kWh LiFePO4 HV s BMS modulom' },
      { label: 'UPS funkcia', value: 'Automatický záskok EPS do 10 ms' },
    ],
    description:
      'Nekompromisný hybridný systém pre maximálnu energetickú sebestačnosť rodinného domu alebo firmy s plnohodnotným núdzovým napájaním.',
  },
];

// =============================================================================
// CATEGORIES METADATA
// =============================================================================

export interface CategoryInfo {
  id: ProductCategory;
  title: string;
  subtitle: string;
  icon: string;
  highlight: string;
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  {
    id: 'panels',
    title: 'Solárne panely',
    subtitle: 'TOPCon, Bifacial N-Type s vysokou účinnosťou až 22.5%',
    icon: '☀️',
    highlight: 'Od 109 € bez DPH',
  },
  {
    id: 'inverters',
    title: 'Striedače & Invertory',
    subtitle: 'Huawei, SolaX, Fronius – 1-fázové aj 3-fázové hybridné meniče',
    icon: '⚡',
    highlight: 'Skladom 10 kW modely',
  },
  {
    id: 'storage',
    title: 'Batériové úložiská',
    subtitle: 'Vysokonapäťové LiFePO4 úložiská Dyness a Huawei LUNA2000',
    icon: '🔋',
    highlight: '6 000+ cyklov, 100% DoD',
  },
  {
    id: 'wallbox',
    title: 'EV Charger Wallboxy',
    subtitle: 'Inteligentné 11 kW / 22 kW nabíjačky s dynamickým riadením záťaže',
    icon: '🔌',
    highlight: 'Čisté nabíjanie z prebytkov',
  },
  {
    id: 'mounting',
    title: 'Hliníkové konštrukcie & Kabeláž',
    subtitle: 'AL profily, nerezové háky, UV solárne káble a MC4 Stäubli',
    icon: '🛠️',
    highlight: 'Originál Stäubli & AL6005-T5',
  },
  {
    id: 'sets',
    title: 'Hotové FV sety',
    subtitle: 'Kompletné On-grid a hybridné zostavy s batériou pripravené na kľúč',
    icon: '📦',
    highlight: 'Dotácia SIEA do 1 150 €',
  },
];

// =============================================================================
// HELPER FORMATTING FUNCTIONS
// =============================================================================

export function calculatePriceWithVat(priceExVat: number): number {
  return Math.round(priceExVat * 1.2 * 100) / 100;
}

export function formatEuro(amount: number): string {
  return amount.toLocaleString('sk-SK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
}

// =============================================================================
// MAIN ESHOP COMPONENT
// =============================================================================

export default function EshopPage() {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    brand: 'all',
    phase: 'all',
    powerRange: 'all',
    searchQuery: '',
  });

  // Selected product for turnkey installation modal / lead form scroll
  const [selectedTurnkeyProduct, setSelectedTurnkeyProduct] = useState<ProductMock | null>(null);

  // Component purchase modal state (Option A: "Kúpiť samostatný materiál")
  const [materialModalProduct, setMaterialModalProduct] = useState<ProductMock | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalCustomerType, setModalCustomerType] = useState<'b2c' | 'b2b'>('b2c');
  const [modalDelivery, setModalDelivery] = useState<'pallet' | 'pickup'>('pallet');
  const [modalFormData, setModalFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    companyName: '',
    ico: '',
    dic: '',
    note: '',
    gdprConsent: false,
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccessLeadId, setModalSuccessLeadId] = useState<string | null>(null);

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Handle escape key to dismiss modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && materialModalProduct) {
        closeMaterialModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [materialModalProduct]);

  // Modal handlers
  const openMaterialModal = (product: ProductMock) => {
    setMaterialModalProduct(product);
    setModalQuantity(1);
    setModalError(null);
    setModalSuccessLeadId(null);
  };

  const closeMaterialModal = () => {
    setMaterialModalProduct(null);
    setModalError(null);
    setModalSuccessLeadId(null);
  };

  // Turnkey purchase handler (Option B: "Kúpiť s kompletnou montážou na kľúč + dotácia")
  const handleTurnkeyClick = (product: ProductMock) => {
    setSelectedTurnkeyProduct(product);
    // Smoothly scroll down to the LeadForm consultation section
    const target = document.getElementById('dopyt-montaz');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products reactively
  const filteredProducts = useMemo(() => {
    return ESHOP_PRODUCTS.filter((product) => {
      // 1. Category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      // 2. Brand
      if (filters.brand !== 'all' && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }
      // 3. Phase
      if (filters.phase !== 'all') {
        if (!product.phase || product.phase !== filters.phase) {
          return false;
        }
      }
      // 4. Power / Capacity Range
      if (filters.powerRange !== 'all') {
        if (product.powerKw === undefined && product.capacityKwh === undefined) {
          return false;
        }
        const powerOrCap = product.powerKw ?? product.capacityKwh ?? 0;
        if (filters.powerRange === 'under-5' && powerOrCap >= 5) {
          return false;
        }
        if (filters.powerRange === '5-10' && (powerOrCap < 5 || powerOrCap > 10)) {
          return false;
        }
        if (filters.powerRange === 'over-10' && powerOrCap <= 10) {
          return false;
        }
        if (filters.powerRange === 'over-50' && powerOrCap <= 50) {
          // Handled gracefully without error (returns 0 products if none exist >50 kW)
          return false;
        }
      }
      // 5. Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesModel = product.model.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      phase: 'all',
      powerRange: 'all',
      searchQuery: '',
    });
  };

  // Submit component purchase modal lead
  const handleMaterialModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialModalProduct) return;
    setModalError(null);

    const name = modalFormData.name.trim();
    const phone = modalFormData.phone.trim();
    if (name.length < 2) {
      setModalError('Prosím, zadajte vaše platné meno alebo názov firmy.');
      return;
    }
    if (phone.length < 9) {
      setModalError('Prosím, zadajte platné telefónne číslo (aspoň 9 číslic).');
      return;
    }
    if (!modalFormData.gdprConsent) {
      setModalError('Pre odoslanie dopytu musíte potvrdiť súhlas so spracovaním údajov.');
      return;
    }
    if (modalCustomerType === 'b2b') {
      if (modalFormData.companyName.trim().length < 2 || modalFormData.ico.trim().length < 6) {
        setModalError('Vyplňte prosím platný názov spoločnosti a IČO.');
        return;
      }
    }

    setModalSubmitting(true);
    try {
      const priceWithVat = calculatePriceWithVat(materialModalProduct.priceExVat);
      const totalExVat = materialModalProduct.priceExVat * modalQuantity;
      const totalWithVat = priceWithVat * modalQuantity;
      const deliveryText =
        modalDelivery === 'pallet'
          ? 'Paletová doprava hydraulickým čelom (SR 24-48h)'
          : 'Osobný odber v sklade Vrútky (zdarma)';

      const message = [
        `DOPYT NA SAMOSTATNÝ MATERIÁL (E-SHOP):`,
        `Produkt: ${materialModalProduct.name} (${materialModalProduct.model})`,
        `Počet kusov: ${modalQuantity} ks`,
        `Cena za kus: ${formatEuro(materialModalProduct.priceExVat)} bez DPH (${formatEuro(priceWithVat)} s DPH)`,
        `Celková kalkulácia: ${formatEuro(totalExVat)} bez DPH / ${formatEuro(totalWithVat)} s DPH (20%)`,
        `Spôsob doručenia: ${deliveryText}`,
        `Typ zákazníka: ${modalCustomerType === 'b2b' ? 'B2B Firemný nákup / Montážnik' : 'B2C Maloobchodný klient'}`,
        modalCustomerType === 'b2b'
          ? `Firemné údaje: ${modalFormData.companyName || 'N/A'}, IČO: ${modalFormData.ico || 'N/A'}, DIČ: ${modalFormData.dic || 'N/A'}`
          : '',
        modalFormData.note ? `Poznámka zákazníka: ${modalFormData.note}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: modalFormData.email.trim() || undefined,
          city: modalFormData.city.trim() || undefined,
          service: 'vseobecny-kontakt',
          source: 'eshop_material_modal',
          message,
        }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Nastala chyba pri odosielaní dopytu.');
      }

      setModalSuccessLeadId(resData.leadId || 'ESHOP-' + Date.now().toString().slice(-6));
    } catch (err) {
      setModalError(
        err instanceof Error ? err.message : 'Nepodarilo sa odoslať dopyt. Skúste znova.'
      );
    } finally {
      setModalSubmitting(false);
    }
  };

  // ===========================================================================
  // SCHEMA.ORG STRUCTURED DATA
  // ===========================================================================

  const storeAndCatalogSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Domov',
          item: 'https://marvol.sk',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'E-shop solárnych komponentov',
          item: 'https://marvol.sk/eshop',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'LocalBusiness'],
      '@id': 'https://marvol.sk/eshop#store',
      name: 'Marvol E-Shop — Solárne komponenty & FV sety',
      url: 'https://marvol.sk/eshop',
      description:
        'Veľkoobchodný a maloobchodný predaj fotovoltických panelov TOPCon, striedačov napätia Huawei a SolaX, LiFePO4 batérií a montážnych konštrukcií s možnosťou realizácie na kľúč.',
      telephone: COMPANY_DETAILS.contact.phoneClean,
      email: COMPANY_DETAILS.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_DETAILS.seat.street,
        addressLocality: COMPANY_DETAILS.seat.city,
        postalCode: COMPANY_DETAILS.seat.zip,
        addressCountry: COMPANY_DETAILS.seat.countryCode,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Katalóg fotovoltických komponentov Marvol',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Solárne panely',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: 'Canadian Solar HiKu7 TOPCon 450 Wp',
                  brand: 'Canadian Solar',
                  category: 'Solar Panels',
                },
                price: '130.80',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Marvol s.r.o.',
                },
              },
            ],
          },
          {
            '@type': 'OfferCatalog',
            name: 'Hybridné striedače',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: 'Huawei SUN2000-10KTL-M1',
                  brand: 'Huawei',
                  category: 'Inverters',
                },
                price: '2148.00',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Marvol s.r.o.',
                },
              },
            ],
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Môžem si komponenty kúpiť samostatne bez montáže?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Áno, náš e-shop slúži pre maloobchodných zákazníkov aj veľkoobchodných montážnych partnerov. Komponenty dodávame s originálnou zárukou a kompletnou technickou dokumentáciou.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ako funguje možnosť nákupu s montážou na kľúč a dotáciou?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pri každom produkte môžete zvoliť Kúpiť s kompletnou montážou na kľúč. Náš tím pripraví projektovú dokumentáciu, namontuje systém, vykoná revíziu OPOS a zabezpečí online rezerváciu štátnej dotácie Zelená domácnostiam (FV do 1 150 €, TČ do 4 600 €, Solidarita až do 90 %).',
          },
        },
      ],
    },
  ];

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'E-shop solárnych komponentov', href: '/eshop' },
  ];

  const faqs = [
    {
      q: 'Môžem si komponenty kúpiť samostatne bez montáže?',
      a: 'Áno. Náš e-shop funguje ako veľkoobchod aj maloobchod. Pokiaľ ste certifikovaný elektroinštalatér, montážna firma alebo skúsený majiteľ domu, môžete si objednať jednotlivé panely, striedače, batérie či montážne konštrukcie samostatne. Zabezpečíme poistenú paletovú prepravu s hydraulickým čelom alebo bezplatný osobný odber v sklade Vrútky.',
    },
    {
      q: 'Ako funguje možnosť nákupu s montážou na kľúč a dotáciou?',
      a: 'Pokiaľ pri produkte zvolíte tlačidlo "Kúpiť s kompletnou montážou na kľúč + dotácia", náš technik vás bude kontaktovať, posúdi vašu nehnuteľnosť a vypracuje cenovú ponuku s odpočtom štátnej dotácie Zelená domácnostiam (FV 575 €/kW do 1 150 €, TČ až 4 600 €). V cene na kľúč je odborná montáž certifikovanými technikmi Marvol s.r.o., revízna správa OPOS, administratíva u distribučnej spoločnosti a vybavenie dotácie SIEA bez starostí.',
    },
    {
      q: 'Aká je záruka na dodávané fotovoltické komponenty?',
      a: 'Všetky produkty pochádzajú výhradne z oficiálnej európskej distribúcie s plnou garanciou originality. Fotovoltické panely Tier 1 disponujú 25 až 30-ročnou lineárnou garanciou výkonu. Hybridné striedače Huawei, SolaX a Fronius majú 10-ročnú záruku výrobcu a LiFePO4 batériové úložiská garantujú minimálne 6 000 plných nabíjacích cyklov s 10-ročnou zárukou.',
    },
    {
      q: 'Ako prebieha doručenie krehkých fotovoltických panelov a ťažkých batérií?',
      a: 'Nadrozmerné komponenty expedujeme špecializovanou paletovou dopravou s hydraulickým čelom a ručným paletovým vozíkom priamo na vašu adresu kdekoľvek na Slovensku. Každá zásielka je 100% poistená proti poškodeniu skla. Štandardná doba dodania pri tovare skladom je 24 až 48 hodín od potvrdenia objednávky.',
    },
    {
      q: 'Poskytujete veľkoobchodné ceny pre inštalačné a montážne firmy?',
      a: 'Áno. Pripravujeme dedikovaný B2B Inštalatérsky portál s overením IČO. Montážnym partnerom ponúkame veľkoobchodné zľavy, projektové naceňovanie na celé palety a technické konzultácie so schémami zapojenia.',
    },
  ];

  return (
    <Layout
      title="E-Shop Solárnych Komponentov & FV Sety | Marvol"
      description="Veľkoobchodný a maloobchodný predaj fotovoltických panelov TOPCon, meničov Huawei a SolaX, LiFePO4 batérií a montážnych setov. Sklad vo Vrútkach, možnosť montáže na kľúč s dotáciou SIEA."
      canonicalPath="/eshop"
      schema={storeAndCatalogSchema}
      isSubpage={true}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full">
        <ol className="flex items-center space-x-2 text-xs text-slate-400">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-600">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-amber-400 font-semibold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-slate-200 transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* =====================================================================
          1. HERO BANNER: Veľkoobchod & Maloobchod
      ====================================================================== */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Skladom na Slovensku (Vrútky) • Rýchla expedícia 24–48h
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Veľkoobchod & Maloobchod: Solárne komponenty a energetické technológie
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Dodávame prémiové fotovoltické panely TOPCon, inteligentné trojfázové hybridné striedače,
              bezpečné batériové úložiská LiFePO4 a montážne konštrukcie. Kúpte si samostatný materiál
              alebo využite kompletnú montáž na kľúč so štátnou dotáciou SIEA (FV do 1 150 €, Solidarita až 90 %).
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#katalog"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all text-center"
              >
                Prezrieť katalóg produktov
              </a>
              <a
                href="#roadmap"
                className="px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all text-center"
              >
                B2B portál & Roadmapa rozvoja
              </a>
            </div>
          </div>

          {/* 4 Value Proposition Badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-bold text-sm">Skladom na Slovensku (Vrútky)</h3>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Expedícia paletovou dopravou s hydraulickým čelom do 24–48h alebo osobný odber v sklade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-white font-bold text-sm">Garancia originality & Tier 1</h3>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                100% originálne komponenty Huawei, SolaX, Fronius, Canadian Solar a Dyness s plnou zárukou.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-white font-bold text-sm">Odborná technická podpora</h3>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Poradenstvo od certifikovaných elektroinžinierov pre dimenzovanie výkonu a batérií.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <div className="text-2xl mb-2">💶</div>
              <h3 className="text-white font-bold text-sm">Montáž na kľúč s dotáciou</h3>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Možnosť realizácie na kľúč certifikovanými montážnikmi s vybavením dotácie SIEA (FV do 1 150 €, TČ do 4 600 €).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. 6 CATEGORY GRID
      ====================================================================== */}
      <section className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Sortiment technológií
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
                Prehľad hlavných kategórií komponentov
              </h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              Kliknutím na kategóriu okamžite vyfiltrujete produkty v katalógu nižšie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = filters.category === cat.id;
              const count = ESHOP_PRODUCTS.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      category: prev.category === cat.id ? 'all' : cat.id,
                    }));
                    const catalogEl = document.getElementById('katalog');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-amber-400/40 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-800 text-slate-300 group-hover:bg-amber-400/20 group-hover:text-amber-400 transition-colors">
                      {count} {count === 1 ? 'produkt' : count >= 2 && count <= 4 ? 'produkty' : 'produktov'}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-amber-400/90 font-medium">{cat.highlight}</span>
                    <span className="text-slate-400 group-hover:text-white font-semibold flex items-center gap-1">
                      Filtrovať <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE PRODUCT CATALOG WITH FILTER CONTROLS
      ====================================================================== */}
      <section id="katalog" className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls Bar */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Katalóg fotovoltických komponentov
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Zobrazených{' '}
                  <span className="text-amber-400 font-bold">{filteredProducts.length}</span> z{' '}
                  <span className="text-white font-medium">{ESHOP_PRODUCTS.length}</span> dostupných produktov
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full lg:w-72">
                <div className="relative">
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                    }
                    placeholder="Hľadať produkt, značku..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors min-h-[44px]"
                  />
                  <span className="absolute left-3 top-3 text-slate-500 text-sm">🔍</span>
                  {filters.searchQuery && (
                    <button
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs min-h-[44px] min-w-[32px] flex items-center justify-center cursor-pointer"
                      aria-label="Vymazať vyhľadávanie"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Pills / Selectors */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-3">
              {/* Category selector row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
                  Kategória:
                </span>
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                  className={`text-xs px-3.5 py-2.5 rounded-lg font-medium transition-all min-h-[40px] flex items-center cursor-pointer ${
                    filters.category === 'all'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  Všetky ({ESHOP_PRODUCTS.length})
                </button>
                {CATEGORIES_LIST.map((c) => {
                  const cCount = ESHOP_PRODUCTS.filter((p) => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, category: c.id }))}
                      className={`text-xs px-3.5 py-2.5 rounded-lg font-medium transition-all min-h-[40px] flex items-center cursor-pointer ${
                        filters.category === c.id
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {c.title} ({cCount})
                    </button>
                  );
                })}
              </div>

              {/* Secondary Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/60">
                {/* Brand Filter */}
                <div>
                  <label htmlFor="filter-brand" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Značka výrobcu
                  </label>
                  <select
                    id="filter-brand"
                    value={filters.brand}
                    onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-amber-400 min-h-[44px] cursor-pointer"
                  >
                    <option value="all">Všetky značky</option>
                    <option value="Huawei">Huawei</option>
                    <option value="SolaX">SolaX</option>
                    <option value="Fronius">Fronius</option>
                    <option value="Canadian Solar">Canadian Solar</option>
                    <option value="Jinko">Jinko Solar</option>
                    <option value="Dyness">Dyness</option>
                  </select>
                </div>

                {/* Phase Filter */}
                <div>
                  <label htmlFor="filter-phase" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Fázovanie
                  </label>
                  <select
                    id="filter-phase"
                    value={filters.phase}
                    onChange={(e) => setFilters((prev) => ({ ...prev, phase: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-amber-400 min-h-[44px] cursor-pointer"
                  >
                    <option value="all">Všetky fázovania</option>
                    <option value="1-phase">1-fázové (230 V)</option>
                    <option value="3-phase">3-fázové (400 V)</option>
                  </select>
                </div>

                {/* Power / Capacity Filter */}
                <div>
                  <label htmlFor="filter-power" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Výkon / Kapacita
                  </label>
                  <select
                    id="filter-power"
                    value={filters.powerRange}
                    onChange={(e) => setFilters((prev) => ({ ...prev, powerRange: e.target.value }))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-amber-400 min-h-[44px] cursor-pointer"
                  >
                    <option value="all">Všetky výkony</option>
                    <option value="under-5">Do 5 kW / kWh</option>
                    <option value="5-10">5 – 10 kW / kWh</option>
                    <option value="over-10">Nad 10 kW / kWh</option>
                    <option value="over-50">Extrémny výkon (&gt; 50 kWp)</option>
                  </select>
                </div>

                {/* Reset Filters Button */}
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
                  >
                    <span>🔄</span> Resetovať filtre
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              PRODUCT CARDS GRID OR EMPTY STATE
          ==================================================================== */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 p-8 max-w-xl mx-auto">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-white">Žiadne produkty nevyhovujú zvoleným filtrom</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Skúste upraviť kritériá vyhľadávania, zvoliť inú značku, zrušiť obmedzenie fázovania
                alebo resetovať aktívne filtre.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-400/20"
              >
                Resetovať filtre
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const priceWithVat = calculatePriceWithVat(product.priceExVat);

                return (
                  <article
                    key={product.id}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all p-5 shadow-lg relative group overflow-hidden"
                  >
                    {/* Top Badges & Category */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                          {product.brand}
                        </span>
                        {product.badge && (
                          <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-md">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Title & Model */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5 font-mono">
                        Model: {product.model}
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      {/* Technical Specifications */}
                      <div className="mt-4 pt-3 border-t border-slate-800/70 space-y-1.5 text-xs">
                        {product.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center text-slate-300">
                            <span className="text-slate-400">{spec.label}:</span>
                            <span className="font-medium text-right text-slate-200">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stock & Warranty Status */}
                      <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Skladom ({product.stockQty} ks)
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          🛡️ {product.warranty}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Dual Checkout Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-800">
                      {/* Dual Price Display */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-amber-400">
                            {formatEuro(product.priceExVat)}
                          </span>
                          <span className="text-xs font-semibold text-slate-400 uppercase">
                            bez DPH
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">
                          {formatEuro(priceWithVat)} <span className="text-slate-400">s DPH (20%)</span>
                        </div>
                      </div>

                      {/* Dual Checkout Action Buttons (Stacked on 320px, responsive flex) */}
                      <div className="flex flex-col gap-2.5">
                        {/* Option B: Turnkey + Subsidy (CRO High-Value Primary CTA) */}
                        <button
                          type="button"
                          onClick={() => handleTurnkeyClick(product)}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-tight transition-all shadow-md shadow-amber-500/10 text-center flex items-center justify-center gap-1.5"
                        >
                          <span>🛠️</span> Kúpiť s kompletnou montážou na kľúč + dotácia
                        </button>

                        {/* Option A: Buy Component Only (B2B / DIY Modal CTA) */}
                        <button
                          type="button"
                          onClick={() => openMaterialModal(product)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-slate-500 transition-all text-center flex items-center justify-center gap-1.5"
                        >
                          <span>📦</span> Kúpiť samostatný materiál
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          4. LEAD FORM CONSULTATION & TURNKEY CONVERSION SECTION (Option B)
      ====================================================================== */}
      <section id="dopyt-montaz" className="py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Turnkey Benefits & Selected Product Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                Inštalácia na kľúč & Štátna dotácia
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Získajte fotovoltiku na kľúč so štátnou dotáciou SIEA
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nezabezpečujeme len dodanie hardvéru – preberáme 100% zodpovednosť za projektovú
                dokumentáciu, statické posúdenie, odbornú inštaláciu certifikovanými technikmi Marvol s.r.o.,
                úradnú revíziu OPOS a kompletné vybavenie dotácie SIEA Zelená domácnostiam bez byrokracie.
              </p>

              {/* Dynamic Turnkey Pre-fill Highlight Banner */}
              {selectedTurnkeyProduct ? (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <span>✓</span> Vybraný produkt pre montáž na kľúč:
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedTurnkeyProduct(null)}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Zrušiť výber
                    </button>
                  </div>

                  <div className="text-white font-bold text-base sm:text-lg">
                    {selectedTurnkeyProduct.name}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span>Model: {selectedTurnkeyProduct.model}</span>
                    <span>•</span>
                    <span>Cena komponentu: {formatEuro(calculatePriceWithVat(selectedTurnkeyProduct.priceExVat))} s DPH</span>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-300 font-semibold flex items-center gap-2">
                    <span>💶</span> Uplatniteľná dotácia SIEA zníži vašu investíciu na minimum (FV do 1 150 €, Solidarita až 90 %).
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <span>
                    Kliknutím na tlačidlo <strong>„Kúpiť s kompletnou montážou na kľúč + dotácia“</strong> pri
                    ľubovoľnom produkte v katalógu vyššie sa model automaticky priradí k vášmu dopytu.
                  </span>
                </div>
              )}

              {/* Trust checklist */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Bezplatná obhliadka:</strong> Posúdime sklon strechy, tienenie a elektrickú prípojku.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>100% garancia dotácie:</strong> Pomôžeme s online rezerváciou a schválením dotácie SIEA.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Kompletná revízia OPOS:</strong> Oficiálna revízna správa potrebná pre distribúciu i poistenie domu.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded LeadForm */}
            <div className="lg:col-span-6">
              <LeadForm
                initialService={
                  selectedTurnkeyProduct
                    ? selectedTurnkeyProduct.category === 'storage' || selectedTurnkeyProduct.category === 'wallbox'
                      ? 'baterie'
                      : 'fotovoltika-dom'
                    : 'fotovoltika-dom'
                }
                initialMessage={
                  selectedTurnkeyProduct
                    ? `Mám záujem o montáž na kľúč so štátnou dotáciou pre produkt: ${selectedTurnkeyProduct.name} (${selectedTurnkeyProduct.model})`
                    : undefined
                }
                source="eshop_turnkey_cta"
                title="Dopyt na fotovoltiku na kľúč s dotáciou"
                subtitle="Vyplňte kontaktné údaje a náš technik vám pripraví bezplatný návrh s odpočtom štátnej dotácie."
                showLocationField={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          5. INTEGRATED E-SHOP EXPANSION ROADMAP (4 PILLARS)
      ====================================================================== */}
      <section id="roadmap" className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Strategický plán rozvoja 2026 – 2027
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
              Roadmapa rozvoja e-shopu Marvol
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Budujeme najmodernejšiu solárnu platformu na Slovensku. Od transparentného katalógu
              komponentov k plnoautomatizovanému B2B inštalatérskemu portálu s priamou integráciou skladu a logistiky.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/30 transition-all backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    Pillar 1 • V príprave / Q1 2027
                  </span>
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Platobné brány & B2C Checkout
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Integrácia bezpečných instantných platobných brán pre okamžitú úhradu objednávok kartou
                  alebo bankovým prevodom bez oneskorenia.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Podporované metódy:</strong> Stripe, Shoptet Pay, Apple Pay, Google Pay, Comgate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>SEPA Instant:</strong> Automatické párovanie bankových úhrad v reálnom čase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Nákup na splátky:</strong> Možnosť financovania fotovoltiky (Quatro, Home Credit)</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
                Fáza: Implementácia API a zabezpečenia PCI-DSS
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/30 transition-all backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Pillar 2 • Architektúra schválená
                  </span>
                  <span className="text-2xl">👔</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  B2B Inštalatérsky portál
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Špecializovaný portál pre certifikovaných elektroinštalatérov a montážne firmy s registráciou
                  na IČO, veľkoobchodnými maržami a projektovým košíkom.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>IČO registrácia:</strong> Overenie živnosti a priradenie partnerského rabatu (Tier 1–3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Projektový košík:</strong> Rýchle zostavenie celých setov na jedno kliknutie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Export cenových ponúk:</strong> Generovanie PDF ponúk pre klientov inštalatéra</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
                Fáza: Vývoj autentifikácie a správcovských rabatových hladín
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/30 transition-all backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    Pillar 3 • Vo vývoji
                  </span>
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  WMS & ERP Integrácia
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Obojsmerné API prepojenie s podnikovými systémami pre synchronizáciu skladu v reálnom čase
                  a automatické priraďovanie sériových čísel meničov a batérií.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Podporované ERP:</strong> Helios Orange, Pohoda, Money S3, SuperFaktura API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Sériové čísla:</strong> Párovanie SN striedačov pre garancie a dotačné audity SIEA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Automatická fakturácia:</strong> Okamžité vystavenie a zasielanie daňových dokladov</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
                Fáza: Testovanie REST API webhookov s účtovným softvérom
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/30 transition-all backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pillar 4 • Aktívne v prevádzke
                  </span>
                  <span className="text-2xl">🚛</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Nadrozmerná FV Logistika
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Zmluvná paletová preprava fotovoltických panelov so 100% poistením krehkého skla
                  a vykladaním hydraulickým čelom priamo na stavenisku po celej SR a ČR.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Partneri prepravy:</strong> Raben, Gebrüder Weiss, Toptrans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Rýchlosť dodania:</strong> Štandard 24–48 hodín pri položkách na centrálnom sklade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Osobný odber:</strong> Bezplatné vyzdvihnutie v centrálnom sklade Vrútky</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 text-xs text-slate-500">
                Fáza: Aktívna prevádzka s denným dispečingom
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FAQS SECTION
      ====================================================================== */}
      <section className="py-16 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              Často kladené otázky
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              Všetko o nákupe solárnych komponentov
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-amber-400 text-lg shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. MODAL: KÚPIŤ SAMOSTATNÝ MATERIÁL (OPTION A)
      ====================================================================== */}
      {materialModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="material-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 my-8">
            {/* Close button */}
            <button
              type="button"
              onClick={closeMaterialModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Zavrieť okno"
            >
              ✕
            </button>

            {modalSuccessLeadId ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 text-3xl mx-auto flex items-center justify-center">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Ďakujeme za váš dopyt!</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Váš dopyt na samostatný materiál bol úspešne zaevidovaný pod číslom{' '}
                  <strong className="text-amber-400 font-mono">{modalSuccessLeadId}</strong>.
                  Náš skladový dispečing preverí dostupnosť a do 24 hodín vám zašle potvrdenie
                  s kalkuláciou prepravy.
                </p>
                <button
                  type="button"
                  onClick={closeMaterialModal}
                  className="mt-4 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm min-h-[44px]"
                >
                  Zavrieť
                </button>
              </div>
            ) : (
              <form onSubmit={handleMaterialModalSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded">
                    Dopyt na samostatný materiál
                  </span>
                  <h3 id="material-modal-title" className="text-lg font-bold text-white mt-1">
                    {materialModalProduct.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Model: {materialModalProduct.model}
                  </div>
                </div>

                {/* Price & Quantity Selector */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Jednotková cena:</div>
                    <div className="text-base font-bold text-white">
                      {formatEuro(materialModalProduct.priceExVat)} <span className="text-xs text-slate-400 font-normal">bez DPH</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {formatEuro(calculatePriceWithVat(materialModalProduct.priceExVat))} s DPH
                    </div>
                  </div>

                  {/* Quantity input */}
                  <div>
                    <label htmlFor="modal-qty" className="block text-[11px] text-slate-400 mb-1 text-right">
                      Počet kusov:
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setModalQuantity((prev) => Math.max(1, prev - 1))}
                        className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                        aria-label="Znížiť počet"
                      >
                        −
                      </button>
                      <input
                        id="modal-qty"
                        type="number"
                        min="1"
                        max={materialModalProduct.stockQty}
                        value={modalQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setModalQuantity(
                            isNaN(val) || val < 1
                              ? 1
                              : Math.min(materialModalProduct.stockQty, Math.max(1, val))
                          );
                        }}
                        className="w-14 h-10 bg-slate-900 border border-slate-700 rounded-lg text-center text-base font-bold text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setModalQuantity((prev) =>
                            Math.min(materialModalProduct.stockQty, prev + 1)
                          )
                        }
                        className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-base flex items-center justify-center cursor-pointer"
                        aria-label="Zvýšiť počet"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Calculated Price Banner */}
                <div className="px-3.5 py-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30 flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Celkom za materiál:</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-400 text-sm">
                      {formatEuro(materialModalProduct.priceExVat * modalQuantity)} bez DPH
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      ({formatEuro(calculatePriceWithVat(materialModalProduct.priceExVat) * modalQuantity)} s DPH)
                    </span>
                  </div>
                </div>

                {/* Customer Type Toggle */}
                <div>
                  <div className="text-xs font-semibold text-slate-300 mb-1.5">Typ nákupu:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setModalCustomerType('b2c')}
                      className={`py-2.5 px-3 min-h-[44px] rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        modalCustomerType === 'b2c'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      Fyzická osoba (B2C)
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalCustomerType('b2b')}
                      className={`py-2.5 px-3 min-h-[44px] rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        modalCustomerType === 'b2b'
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      Firma / Inštalatér (B2B)
                    </button>
                  </div>
                </div>

                {/* B2B Company Details */}
                {modalCustomerType === 'b2b' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                    <input
                      type="text"
                      placeholder="Obchodné meno firmy *"
                      value={modalFormData.companyName}
                      onChange={(e) =>
                        setModalFormData((prev) => ({ ...prev, companyName: e.target.value }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="IČO *"
                        value={modalFormData.ico}
                        onChange={(e) =>
                          setModalFormData((prev) => ({ ...prev, ico: e.target.value }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        placeholder="DIČ / IČ DPH"
                        value={modalFormData.dic}
                        onChange={(e) =>
                          setModalFormData((prev) => ({ ...prev, dic: e.target.value }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                {/* Delivery Option */}
                <div>
                  <div className="text-xs font-semibold text-slate-300 mb-1.5">Spôsob odberu / prepravy:</div>
                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center gap-2 p-2.5 min-h-[44px] rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer hover:border-slate-700">
                      <input
                        type="radio"
                        name="modal-delivery"
                        checked={modalDelivery === 'pallet'}
                        onChange={() => setModalDelivery('pallet')}
                        className="text-amber-400 focus:ring-amber-400 h-4 w-4"
                      />
                      <span>🚛 Paletová doprava s hydraulickým čelom (SR 24–48h)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 min-h-[44px] rounded-lg bg-slate-950/40 border border-slate-800 cursor-pointer hover:border-slate-700">
                      <input
                        type="radio"
                        name="modal-delivery"
                        checked={modalDelivery === 'pickup'}
                        onChange={() => setModalDelivery('pickup')}
                        className="text-amber-400 focus:ring-amber-400 h-4 w-4"
                      />
                      <span>🏢 Osobný odber v centrálnom sklade Vrútky (zdarma)</span>
                    </label>
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Meno a priezvisko *"
                      value={modalFormData.name}
                      onChange={(e) =>
                        setModalFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Telefónne číslo *"
                      value={modalFormData.phone}
                      onChange={(e) =>
                        setModalFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      placeholder="E-mailová adresa"
                      value={modalFormData.email}
                      onChange={(e) =>
                        setModalFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Mesto / PSČ dodania"
                      value={modalFormData.city}
                      onChange={(e) =>
                        setModalFormData((prev) => ({ ...prev, city: e.target.value }))
                      }
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[44px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Poznámka alebo dodatočné otázky k príslušenstvu..."
                    value={modalFormData.note}
                    onChange={(e) =>
                      setModalFormData((prev) => ({ ...prev, note: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 min-h-[48px] text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {/* GDPR Consent Checkbox */}
                <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={modalFormData.gdprConsent}
                    onChange={(e) =>
                      setModalFormData((prev) => ({ ...prev, gdprConsent: e.target.checked }))
                    }
                    className="mt-0.5 rounded border-slate-700 text-amber-400 focus:ring-amber-400"
                  />
                  <span>
                    Súhlasím so spracovaním osobných údajov pre účely spracovania cenovej ponuky podľa GDPR.
                  </span>
                </label>

                {modalError && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {modalError}
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={modalSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                  >
                    {modalSubmitting
                      ? 'Odosielam dopyt...'
                      : 'Odoslať nezáväzný dopyt na materiál'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
