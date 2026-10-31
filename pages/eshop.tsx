import React, { useState } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { COMPANY_DETAILS } from '@/constants/company';
import {
  SunIcon,
  BoltIcon,
  BatteryIcon,
  CarIcon,
  WrenchIcon,
  ShieldIcon,
  CheckIcon,
  CurrencyEuroIcon,
  BuildingOfficeIcon,
} from '@/components/icons';

// =============================================================================
// BRAND & CATEGORY DEFINITIONS
// =============================================================================

export interface BrandInfo {
  name: string;
  logo: string;
  badge: string;
  description: string;
  highlight: string;
}

export interface TechnologyCategory {
  id: string;
  name: string;
  shortDesc: string;
  badge: string;
  icon: 'bolt' | 'battery' | 'sun' | 'wrench' | 'car';
  brands: BrandInfo[];
  note: string;
}

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    id: 'menice',
    name: 'Meniče & Striedače napätia',
    shortDesc: 'Hybridné aj sieťové invertory pre rodinné domy, firmy a priemyselné inštalácie.',
    badge: 'Vysoká účinnosť 98 %+',
    icon: 'bolt',
    note: 'Plná 3-fázová asymetria, núdzový záložný režim (UPS < 10 ms) a schválenie pre SSD, ZSD a VSD.',
    brands: [
      {
        name: 'GoodWe',
        logo: '/logos/partners/goodwe.svg',
        badge: 'Hybridný etalón',
        description: 'Trojfázové hybridné meniče radu ET s pasívnym chladením a mimoriadnou spoľahlivosťou.',
        highlight: '98,4 % účinnosť • 10 rokov záruka • Tichá prevádzka',
      },
      {
        name: 'Solinteg',
        logo: '/logos/partners/solinteg.svg',
        badge: 'Inteligentná asymetria',
        description: 'Moderné invertory s bleskovou asymetriou a vysokým preťažením na záložnej vetve.',
        highlight: 'Preťaženie až 110 % • Rýchly backup < 10 ms • Moderná aplikácia',
      },
      {
        name: 'Sungrow',
        logo: '/logos/partners/sungrow.svg',
        badge: 'Globálny líder',
        description: 'Komerčné aj rezidenčné invertory s integrovanou ochranou AFCI proti elektrickému oblúku.',
        highlight: 'Vysoké napätie MPPT • Vstavané prepäťové ochrany • 10 rokov záruka',
      },
    ],
  },
  {
    id: 'baterie',
    name: 'Batériové úložiská (BESS & LFP)',
    shortDesc: 'Bezpečné modulárne lítiovo-železo-fosfátové úložiská energie.',
    badge: 'LiFePO4 bezpečnosť',
    icon: 'battery',
    note: 'Vysoko dopytované zariadenia s dynamickou dostupnosťou. Preverujeme aktuálne skladové alokácie.',
    brands: [
      {
        name: 'Pylontech',
        logo: '/logos/partners/pylontech.svg',
        badge: 'Svetový priekopník',
        description: 'Vysokonapäťové modulárne veže Force H1/H2 a nízkonapäťové rackové moduly US5000.',
        highlight: '6 000+ cyklov (95 % DoD) • Modulárne škálovanie • 10 rokov garancia',
      },
      {
        name: 'GoodWe Lynx',
        logo: '/logos/partners/goodwe.svg',
        badge: 'Plug & Play systém',
        description: 'Vysokonapäťové batérie LX F s natívnou optimalizáciou pre striedače GoodWe.',
        highlight: 'Automatické rozpoznanie modulov • IP55 exteriérové krytie • 10 rokov záruka',
      },
      {
        name: 'Solinteg Battery',
        logo: '/logos/partners/solinteg.svg',
        badge: 'Kompaktný design',
        description: 'LFP batériové zostavy pre domáce hybridné fotovoltické elektrárne.',
        highlight: 'Vysoká požiarna bezpečnosť • BMS s balancovaním článkov',
      },
    ],
  },
  {
    id: 'panely',
    name: 'Fotovoltické panely (Tier 1)',
    shortDesc: 'Monokryštalické, celočierne, bifaciálne a TOPCon / ABC panely s vysokým výnosom.',
    badge: 'Lineárna garancia 25-30 rokov',
    icon: 'sun',
    note: 'Dodávame kusový odber aj ucelené palety (36 ks) za výhodné veľkoobchodné ceny.',
    brands: [
      {
        name: 'AIKO Solar',
        logo: '/logos/partners/aiko.svg',
        badge: 'ABC technológia > 24 %',
        description: 'Revolučné All-Back-Contact články bez rušivých predných zberníc s rekordnou účinnosťou.',
        highlight: 'Účinnosť cez 24 % • Nízka teplotná strata • 30 rokov záruka',
      },
      {
        name: 'Jinko Solar',
        logo: '/logos/partners/jinko.png',
        badge: 'Tiger Neo N-Type',
        description: 'Najpredávanejšia značka FV panelov na svete s výborným výnosom pri difúznom svetle.',
        highlight: 'TOPCon technológia • Minimálna degradácia • 30 rokov výkonu',
      },
      {
        name: 'JA Solar',
        logo: '/logos/partners/ja-solar.svg',
        badge: 'DeepBlue 4.0 Pro',
        description: 'Dlhodobo overené Tier 1 panely s výborným pomerom ceny a generovaného výkonu.',
        highlight: 'Vysoká mechanická odolnosť • 25 rokov záruka na výkon',
      },
      {
        name: 'LONGi Solar',
        logo: '/logos/partners/longi.png',
        badge: 'Hi-MO fotovoltika',
        description: 'Svetový gigant vo výrobe monokryštalického kremíka a prémiových fotovoltických článkov.',
        highlight: 'Vysoká absorpcia žiarenia • Odolnosť voči mikroprasklinám',
      },
      {
        name: 'Trina Solar',
        logo: '/logos/partners/trina-solar.svg',
        badge: 'Vertex 210mm',
        description: 'Robustné panely s extrémnou pevnosťou rámu pre strechy rodinných domov aj haly.',
        highlight: 'Odolnosť voči snehu 6 000 Pa • N-Type TOPCon články',
      },
    ],
  },
  {
    id: 'konstrukcie',
    name: 'Konštrukčné nosné systémy & Elektro',
    shortDesc: 'Certifikované hliníkové a nerezové konštrukcie pre všetky typy strešných krytín a elektro istenie.',
    badge: 'Eurokód certifikácia',
    icon: 'wrench',
    note: 'Kompletné sety na mieru: škridla, trapéz, sendvičový panel, falcovaný plech aj rovné ploché strechy.',
    brands: [
      {
        name: 'Alumero',
        logo: '/logos/partners/alumero.svg',
        badge: 'Rakúska kvalita',
        description: 'Staticky posúdené hliníkové profily a nerezové komponenty pre bezpečné kotvenie.',
        highlight: 'Odolnosť voči náporovému vetru a snehu • 15 rokov záruka',
      },
      {
        name: 'Krajiczech',
        logo: '/logos/partners/krajiczech.png',
        badge: 'Strešné systémy',
        description: 'Masívne strešné háky z nerezovej ocele A2, kombiskrutky a eloxované príchytky panelov.',
        highlight: '100% nerezová oceľ A2 • Univerzálna kompatibilita krytín',
      },
      {
        name: 'Schrack Technik',
        logo: '/logos/partners/schrack.svg',
        badge: 'Istenie & Bezpečnosť',
        description: 'Profesionálne DC a AC rozvádzače, poistkové odpájače, prepäťové ochrany SPD a ističe.',
        highlight: 'Certifikované nehorľavé komponenty podľa STN EN noriem',
      },
    ],
  },
];

export default function EshopPage() {
  // Quick Inquiry Form State
  const [selectedCategory, setSelectedCategory] = useState<string>('menice');
  const [selectedBrand, setSelectedBrand] = useState<string>('GoodWe');
  const [serviceMode, setServiceMode] = useState<'material' | 'turnkey'>('turnkey');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    details: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const name = formData.name.trim();
    const phone = formData.phone.trim();

    if (name.length < 2) {
      setFormError('Prosím, zadajte vaše platné meno alebo názov spoločnosti.');
      return;
    }
    if (phone.length < 9) {
      setFormError('Prosím, zadajte platné telefónne číslo pre rýchle overenie dostupnosti.');
      return;
    }
    if (!formData.gdprConsent) {
      setFormError('Pre overenie skladovej dostupnosti potvrďte súhlas so spracovaním údajov.');
      return;
    }

    setIsSubmitting(true);
    try {
      const modeText =
        serviceMode === 'turnkey'
          ? 'Kompletná dodávka s montážou na kľúč + štátna dotácia SIEA'
          : 'Samostatný nákup materiálu (bez montáže)';

      const messageContent = [
        `DOPYT NA TECHNOLÓGIE & ZARIADENIA (E-SHOP NA VYŽIADANIE):`,
        `Požadovaná kategória: ${selectedCategory}`,
        `Preferovaná značka / zariadenie: ${selectedBrand}`,
        `Typ odberu: ${modeText}`,
        formData.city ? `Mesto / Lokalita: ${formData.city.trim()}` : '',
        formData.details ? `Špecifikácia / Poznámka zákazníka: ${formData.details.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: formData.email.trim() || undefined,
          city: formData.city.trim() || undefined,
          service: 'vseobecny-kontakt',
          source: 'eshop_on_demand_inquiry',
          message: messageContent,
        }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Nastala chyba pri odosielaní dopytu.');
      }

      setFormSuccess(resData.leadId || 'ESHOP-' + Date.now().toString().slice(-6));
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        details: '',
        gdprConsent: false,
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Nepodarilo sa odoslať dopyt. Skúste znova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'E-shop & Zariadenia na vyžiadanie', href: '/eshop' },
  ];

  const storeSchema = [
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
          name: 'E-shop solárnych technológií na vyžiadanie',
          item: 'https://marvol.sk/eshop',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'LocalBusiness'],
      '@id': 'https://marvol.sk/eshop#store',
      name: 'Marvol s.r.o. - Distribúcia solárnych technológií & Zariadenia na vyžiadanie',
      url: 'https://marvol.sk/eshop',
      description:
        'Distribúcia a dodávka fotovoltických panelov AIKO, Jinko, striedačov GoodWe, Solinteg, batérií Pylontech a montážnych konštrukcií. Aktuálne nacenenie na vyžiadanie.',
      telephone: COMPANY_DETAILS.contact.phoneClean,
      email: COMPANY_DETAILS.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_DETAILS.seat.street,
        addressLocality: COMPANY_DETAILS.seat.city,
        postalCode: COMPANY_DETAILS.seat.zip,
        addressCountry: COMPANY_DETAILS.seat.countryCode,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Prečo sú ceny a ponuka solárnych zariadení na vyžiadanie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Trh s fotovoltickými komponentmi a batériovými úložiskami je vysoko nestály - skladové zásoby u distribútorov sa menia zo dňa na deň a ceny kolíšu. Namiesto fiktívneho statického e-shopu preverujeme aktuálne sklady v reálnom čase a garantujeme najlepšiu trhovú cenu.',
          },
        },
        {
          '@type': 'Question',
          name: 'Viete zohnať aj špecifické komponenty, ktoré nemáte uvedené v základnom zozname?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Áno. Vďaka priamym partnerstvám s najväčšími európskymi veľkoobchodmi (BayWa r.e., Krannich Solar, Memodo, Hagard:Hal) vieme zohnať v podstate akýkoľvek komponent, invertor či batériový modul na trhu.',
          },
        },
        {
          '@type': 'Question',
          name: 'Môžem si materiál objednať samostatne bez montáže?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Áno, dodávame samostatný materiál za veľkoobchodné ceny pre montážne firmy, živnostníkov aj skúsených domácich majstrov so zabezpečením poistenej paletovej prepravy po celom Slovensku.',
          },
        },
      ],
    },
  ];

  const faqs = [
    {
      q: 'Prečo sú ceny a ponuka solárnych zariadení na vyžiadanie?',
      a: 'Trh s fotovoltickými komponentmi, striedačmi a lítiovými batériami je vysoko dynamický. Ceny surovín a skladová dostupnosť v európskych skladoch sa menia na týždennej báze a mnohé modely bývajú prechodne vypredané. Namiesto zavádzajúcich statických cenoviek vám preveríme reálnu skladovú dostupnosť a poskytneme aktuálnu najvýhodnejšiu ponuku v reálnom čase.',
    },
    {
      q: 'Viete zohnať aj značku či model, ktorý tu nemáte priamo vypísaný?',
      a: 'Áno, v podstate hocičo. Spolupracujeme priamo s poprednými európskymi veľkoskladmi (BayWa r.e., Krannich Solar, Memodo, Hagard:Hal a ďalšími). Ak hľadáte konkrétny model Fronius, SolaX, Huawei, Victron, špeciálne panely alebo atypické úchyty, preveríme zásoby naprieč celou EÚ a zabezpečíme dodanie.',
    },
    {
      q: 'Môžem si kúpiť materiál samostatne bez vašej montáže?',
      a: 'Určite áno. Dodávame komponenty pre inštalačné firmy, certifikovaných elektrikárov aj majiteľov domov, ktorí realizujú časť montáže svojpomocne. K materiálu dodávame kompletnú technickú dokumentáciu, schémy zapojenia a záručné certifikáty.',
    },
    {
      q: 'Aký je rozdiel medzi nákupom materiálu a realizáciou na kľúč?',
      a: 'Pri montáži na kľúč získavate zníženú sadzbu DPH na celé dielo, projektovú dokumentáciu, revíznu správu OPOS a bezplatné vybavenie štátnej dotácie Zelená domácnostiam (až do 1 150 € na FV a 4 600 € na tepelné čerpadlá). Samostatný materiál je fakturovaný so štandardnou DPH a montáž si zabezpečujete sami.',
    },
    {
      q: 'Ako prebieha doprava ťažkých batérií a krehkých solárnych panelov?',
      a: 'Zásielky expedujeme poistenou paletovou dopravou s hydraulickým čelom a paletovým vozíkom až pred váš dom či firemný areál kdekoľvek na Slovensku. K dispozícii je aj osobný odber v sklade.',
    },
  ];

  return (
    <Layout
      title="Solárne Technológie & Komponenty na Vyžiadanie | Marvol s.r.o."
      description="Dodávka certifikovaných fotovoltických panelov, hybridných meničov a batériových úložísk. Ponuka na vyžiadanie s garanciou najlepšej trhovej ceny."
      canonicalPath="/eshop"
      schema={storeSchema}
      isSubpage={true}
    >
      {/* Breadcrumbs */}
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
          1. HERO BANNER: Ponuka na vyžiadanie & Reálny trh
      ====================================================================== */}
      <section className="relative py-14 sm:py-18 lg:py-20 bg-slate-950 text-white overflow-hidden border-b border-slate-800/80">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Veľkoobchodná &amp; maloobchodná distribúcia • Ponuka na vyžiadanie
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Solárne technológie a komponenty overených svetových značiek
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              Trh s fotovoltickými striedačmi, batériami a panelmi je vysoko dynamický - dostupnosť komponentov u distribútorov sa mení zo dňa na deň a produkty bývajú často vypredané. Namiesto statického e-shopu s neaktuálnymi stavmi zabezpečujeme <strong className="text-white font-semibold">overenie skladov v reálnom čase</strong> s garantovanou najlepšou cenou.
            </p>

            <div className="inline-flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs sm:text-sm text-amber-300 font-semibold mb-8">
              <span className="text-base">⚡</span>
              <span>Spolupracujeme s poprednými výrobcami a vďaka našej sieti veľkoskladov <strong>vieme zohnať v podstate akékoľvek zariadenie na trhu</strong>.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#dopyt-form"
                className="px-7 py-4 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center flex items-center justify-center gap-2 min-h-[48px] tap-target-48 shadow-lg"
              >
                <span>Nezáväzne overiť dostupnosť a cenu</span>
                <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#znacky"
                className="px-7 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-colors text-center flex items-center justify-center gap-2 min-h-[48px] tap-target-48"
              >
                <span>Prehľad značiek, ktoré montujeme</span>
              </a>
            </div>
          </div>

          {/* 4 Value Pillars */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <BuildingOfficeIcon className="w-6 h-6 text-amber-400 mb-2" />
              <h3 className="text-white font-bold text-sm">Európska sieť veľkoskladov</h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Priame dodávateľské kanály cez BayWa r.e., Krannich, Memodo a Hagard:Hal pre bleskové naskladnenie.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <ShieldIcon className="w-6 h-6 text-emerald-400 mb-2" />
              <h3 className="text-white font-bold text-sm">100% Pôvod &amp; Plné záruky</h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Iba originálny certifikovaný tovar z oficiálnej distribúcie so zárukou výrobcu až 25-30 rokov.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <BoltIcon className="w-6 h-6 text-sky-400 mb-2" />
              <h3 className="text-white font-bold text-sm">Vieme zohnať v podstate hocičo</h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Ak hľadáte špecifický striedač, batériu či atypické úchyty, preveríme kapacity po celej EÚ.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
              <CurrencyEuroIcon className="w-6 h-6 text-amber-400 mb-2" />
              <h3 className="text-white font-bold text-sm">Materiál aj montáž na kľúč</h3>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Možnosť samostatného odberu komponentov alebo kompletnej montáže s vybavením dotácie SIEA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DUAL MODE: Samostatný nákup vs. Montáž na kľúč + Dotácia
      ====================================================================== */}
      <section className="py-14 sm:py-18 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Spôsob spolupráce
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Dva flexibilné spôsoby odberu technológií
            </h2>
            <p className="text-slate-400 text-sm">
              Zvoľte si model, ktorý najlepšie vyhovuje vášmu zámeru - od dodávky samotného materiálu až po bezstarostnú realizáciu na kľúč.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Mode 1: Material only */}
            <div className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 text-sky-400 text-xs font-mono font-bold uppercase mb-4">
                  Pre montážnikov &amp; svojpomoc
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  1. Samostatný nákup komponentov
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Ste certifikovaný elektroinštalatér, montážna firma alebo skúsený majiteľ domu? Zabezpečíme pre vás dodávku originálnych komponentov za veľkoobchodné ceny s poistenou dopravou.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Veľkoobchodné ceny a kusový i paletový odber</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Poistená paletová preprava s hydraulickým čelom po celom SR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Technická dokumentácia a záručné certifikáty výrobcov</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Konzultácia kompatibility striedačov, batérií a panelov</span>
                  </li>
                </ul>
              </div>

              <a
                href="#dopyt-form"
                onClick={() => setServiceMode('material')}
                className="w-full py-3.5 rounded-xl font-bold text-center bg-slate-900 hover:bg-slate-800 text-sky-400 border border-sky-400/40 hover:border-sky-400 transition-colors block text-sm"
              >
                Dopytovať samostatný materiál
              </a>
            </div>

            {/* Mode 2: Turnkey with subsidy */}
            <div className="bg-gradient-to-b from-slate-950 to-amber-950/20 border-2 border-amber-400/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3 right-6 bg-amber-400 text-slate-950 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Najobľúbenejšie riešenie
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-mono font-bold uppercase mb-4">
                  Bezstarostná inštalácia
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  2. Dodávka s montážou na kľúč + Dotácia
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Kompletná realizácia certifikovanými technikmi Marvol s.r.o. vrátane projektovania, revíznej správy OPOS, zapojenia u distribútora a vybavenia štátnej dotácie.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Znížená sadzba DPH na celý systém vrátane práce</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Vybavenie štátnej dotácie SIEA (FV do 1 150 €, TČ do 4 600 €)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Odborná montáž s garanciou inštalácie do 30 dní</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Oficiálna revízna správa OPOS a podklady pre SSD/ZSD/VSD</span>
                  </li>
                </ul>
              </div>

              <a
                href="#dopyt-form"
                onClick={() => setServiceMode('turnkey')}
                className="w-full py-3.5 rounded-xl font-black text-center bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors block text-sm shadow-md"
              >
                Dopytovať realizáciu na kľúč s dotáciou
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. BRAND SHOWCASE BY CATEGORY (Používané a overené značky)
      ====================================================================== */}
      <section id="znacky" className="py-16 sm:py-20 lg:py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Certifikované technológie
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
              Značky zariadení, ktoré používame a overene montujeme
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Neexperimentujeme s lacnými no-name komponentmi. Spolupracujeme výlučne so svetovými lídrami, ktorí garantujú dlhodobú stabilitu, dostupnosť servisných dielov a vysokú požiarnu bezpečnosť.
            </p>
          </div>

          <div className="space-y-16">
            {TECHNOLOGY_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800/80">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400">
                        {cat.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Kategória 0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {cat.shortDesc}
                    </p>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 max-w-md">
                    <span className="text-amber-400 font-bold block mb-1">Dôležitá poznámka:</span>
                    {cat.note}
                  </div>
                </div>

                {/* Brand Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="bg-slate-950 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 group"
                    >
                      <div>
                        {/* High Contrast Logo Container */}
                        <div className="h-16 w-full bg-white rounded-xl p-3 flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="max-h-10 max-w-[140px] w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            width={140}
                            height={40}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="text-lg font-black text-white tracking-tight">
                            {brand.name}
                          </h4>
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                            {brand.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          {brand.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-900">
                        <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 mb-3">
                          <span>✓</span>
                          <span>{brand.highlight}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedBrand(brand.name);
                            const formEl = document.getElementById('dopyt-form');
                            if (formEl) {
                              formEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white border border-slate-800 transition-colors text-center cursor-pointer"
                        >
                          Dopytovať komponenty {brand.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "VIEME ZOHNAŤ V PODSTATE HOCIČO" - TRUST PROCURMENT BANNER
      ====================================================================== */}
      <section className="py-14 sm:py-18 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/90 border border-amber-400/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  Neobmedzený európsky dodávateľský reťazec
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  Hľadáte špecifické zariadenie, ktoré je všade vypredané?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Trh s fotovoltikou zažíva vlny dopytu a mnohé bežné e-shopy majú sklady prázdne. Spoločnosť <strong className="text-white font-semibold">Marvol s.r.o.</strong> má priame zmluvné partnerstvá s lídrami európskej distribúcie - <strong className="text-amber-400">BayWa r.e., Krannich Solar, Memodo, Hagard:Hal</strong> a ďalšími.
                </p>
                <p className="text-slate-300 text-sm sm:text-base font-semibold">
                  Vďaka tomu pre vás vieme zohnať v podstate akékoľvek zariadenie, invertor, batériový modul či konštrukciu, ktorú si váš projekt vyžaduje.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <a
                  href="#dopyt-form"
                  className="w-full py-4 rounded-xl font-black text-center bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-lg block text-sm"
                >
                  Zadať dopyt na konkrétne zariadenie
                </a>
                <a
                  href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                  className="w-full py-3.5 rounded-xl font-bold text-center bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors block text-xs"
                >
                  Zavolať do skladu: {COMPANY_DETAILS.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. INTERACTIVE INQUIRY FORM (Konfigurátor dopytu)
      ====================================================================== */}
      <section id="dopyt-form" className="py-16 sm:py-20 lg:py-24 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Rýchle overenie dostupnosti
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
              Pošlite nám dopyt na technológiu či zostavu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Uveďte, o aké zariadenie alebo značku máte záujem. Obratom preveríme skladové stavy a zašleme vám aktuálnu cenovú ponuku s termínom dodania.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white">Dopyt bol úspešne prijatý!</h3>
                <p className="text-slate-300 text-sm max-w-lg mx-auto">
                  Ďakujeme. Vaša požiadavka bola zaregistrovaná pod kódom <strong className="text-amber-400 font-mono">{formSuccess}</strong>. Naši technici preverujú aktuálnu dostupnosť v európskych skladoch a ozvú sa vám do 24 hodín s cenovou ponukou.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormSuccess(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Odoslať ďalší dopyt
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-6">
                {formError && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm">
                    {formError}
                  </div>
                )}

                {/* Service Mode Selector */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                    Spôsob odberu zariadení
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceMode('turnkey')}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        serviceMode === 'turnkey'
                          ? 'bg-amber-400/20 border-amber-400 text-white ring-1 ring-amber-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <strong className="block text-sm font-bold text-white mb-0.5">
                        Kompletná montáž na kľúč + Dotácia
                      </strong>
                      <span className="text-xs text-slate-400">
                        Vrátane inštalácie, revízie OPOS a dotácie SIEA až do 4 600 €
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceMode('material')}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        serviceMode === 'material'
                          ? 'bg-sky-400/20 border-sky-400 text-white ring-1 ring-sky-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <strong className="block text-sm font-bold text-white mb-0.5">
                        Iba samostatný materiál (bez montáže)
                      </strong>
                      <span className="text-xs text-slate-400">
                        Pre montážnikov a firmy za veľkoobchodné ceny
                      </span>
                    </button>
                  </div>
                </div>

                {/* Category & Brand Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      Kategória technológie
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Meniče & Striedače napätia">Meniče &amp; Striedače napätia</option>
                      <option value="Batériové úložiská (BESS & LFP)">Batériové úložiská (BESS &amp; LFP)</option>
                      <option value="Fotovoltické panely (Tier 1)">Fotovoltické panely (Tier 1)</option>
                      <option value="Konštrukčné systémy & Elektro">Konštrukčné nosné systémy &amp; Elektro</option>
                      <option value="Tepelné čerpadlá & EV Wallboxy">Tepelné čerpadlá &amp; EV Wallboxy</option>
                      <option value="Celá kompletná zostava na kľúč">Celá kompletná zostava na kľúč</option>
                      <option value="Iný špecifický komponent">Iný špecifický komponent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      Preferovaná značka / Model
                    </label>
                    <input
                      type="text"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      placeholder="Napr. GoodWe, Solinteg, Pylontech, AIKO, alebo iná..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      Meno a priezvisko / Názov firmy <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ján Novák / Elektro s.r.o."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      Telefónne číslo <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+421 900 000 000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      E-mailová adresa (pre zaslanie ponuky)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vas@email.sk"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                      Mesto / Obec doručenia
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Napr. Žilina, Martin, Bratislava..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                    Poznámka / Špecifikácia dopytovaných zariadení
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Uveďte napr. požadovaný výkon v kWp, počet kusov batériových modulov, typ strechy alebo konkrétne produktové číslo..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr"
                    required
                    checked={formData.gdprConsent}
                    onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-800 bg-slate-950 text-amber-400 focus:ring-amber-400 cursor-pointer"
                  />
                  <label htmlFor="gdpr" className="text-xs text-slate-400 leading-normal cursor-pointer">
                    Súhlasím so spracovaním osobných údajov za účelom overenia skladovej dostupnosti a vypracovania cenovej ponuky spoločnosťou Marvol s.r.o. podľa{' '}
                    <Link href="/ochrana-osobnych-udajov" className="text-amber-400 hover:underline">
                      Zásad ochrany osobných údajov
                    </Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg disabled:opacity-50 text-sm cursor-pointer"
                >
                  {isSubmitting ? 'Overujem dostupnosť...' : 'Odoslať dopyt na technológiu'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. ROADMAP: Strategický plán rozvoja B2B distribúcie
      ====================================================================== */}
      <section className="py-14 sm:py-18 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Strategický plán rozvoja
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Pripravovaný B2B Inštalatérsky portál
            </h2>
            <p className="text-slate-400 text-sm">
              Budujeme priame prepojenie s európskymi veľkoskladmi s live dostupnosťou na sekundu presne pre montážne firmy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-2">Q2 2026</span>
              <h4 className="text-lg font-bold text-white mb-2">B2B Registrácia IČO</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zvýhodnené veľkoobchodné cenníky pre certifikovaných elektroinštalatérov s možnosťou rezervácie celých paliet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-2">Q3 2026</span>
              <h4 className="text-lg font-bold text-white mb-2">Live API napojenie skladov</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Priame zobrazenie reálnych stavov centrálnych skladov BayWa r.e., Krannich a Memodo s automatickou rezerváciou.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-mono font-bold text-amber-400 block mb-2">Q4 2026</span>
              <h4 className="text-lg font-bold text-white mb-2">Projektový konfigurátor</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatický výpočet nosných konštrukcií a prepojenia DC/AC káblov s vygenerovaním materiálového kusovníka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. FAQ SECTION
      ====================================================================== */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 text-amber-400 mb-4 sm:mb-5">
              Často kladené otázky
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Všetko o dopytovaní technológií a dodávkach
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-black">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
