import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { LeadForm } from '@/components/LeadForm';
import { COMPANY_DETAILS } from '@/constants/company';

export default function KontaktPage() {
  const router = useRouter();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const breadcrumbs = [
    { name: 'Domov', href: '/' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  const faqs = [
    {
      q: 'Je technická obhliadka nehnuteľnosti a vypracovanie cenovej ponuky skutočne zadarmo?',
      a: 'Áno, 100% zadarmo a bez akýchkoľvek skrytých poplatkov či záväzkov. Náš certifikovaný technik príde priamo k vám, zameria strechu a navrhne optimálne riešenie pre vašu spotrebu po celom území Slovenska. Neúčtujeme si žiadne cestovné náklady na obhliadku ani poplatok za projektovú štúdiu.',
    },
    {
      q: 'Ako rýchlo od odoslania kontaktného formulára dostanem odpoveď a kalkuláciu?',
      a: 'Váš dopyt spracovávame prioritne najneskôr do 24 hodín (počas pracovných dní spravidla do 2 hodín). Špecialista vás bude telefonicky kontaktovať, preberie vaše energetické potreby a dohodne termín osobnej obhliadky alebo zašle orientačný technický návrh s kalkuláciou úspor.',
    },
    {
      q: 'Pomôžete nám s vybavením štátnej dotácie SIEA na kľúč?',
      a: 'Celú administratívu dotácie (až do výšky 4 025 € pre rodinné domy a Zelená podnikom pre firmy) vyriešime za vás na kľúč. Sme registrovaný oprávnený zhotoviteľ SIEA – vy len podpíšete žiadosť a dotáciu vám odpočítame priamo z faktúry za dielo.',
    },
  ];

  const jsonLdSchema = [
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
          name: 'Kontakt',
          item: 'https://marvol.sk/kontakt',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': 'https://marvol.sk/kontakt#webpage',
      url: 'https://marvol.sk/kontakt',
      name: 'Kontakt a bezplatná konzultácia | Marvol s.r.o. Vrútky',
      description:
        'Kontaktujte špecialistov na fotovoltiku Marvol s.r.o. Obhliadky po celom Slovensku zdarma. Telefón: +421 948 123 456, e-mail: info@marvol.sk. Sídlo: Vrútky.',
      mainEntity: {
        '@type': 'LocalBusiness',
        '@id': 'https://marvol.sk/#organization',
        name: COMPANY_DETAILS.legalName,
        alternateName: COMPANY_DETAILS.shortName,
        telephone: COMPANY_DETAILS.contact.phoneClean,
        email: COMPANY_DETAILS.contact.email,
        url: 'https://marvol.sk',
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY_DETAILS.seat.street,
          addressLocality: COMPANY_DETAILS.seat.city,
          postalCode: COMPANY_DETAILS.seat.zip,
          addressCountry: COMPANY_DETAILS.seat.countryCode,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 49.0967,
          longitude: 18.9242,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        areaServed: {
          '@type': 'Country',
          name: 'Slovakia',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  const queryService = (router.query.service as string) || 'vseobecny-kontakt';

  return (
    <Layout
      title="Kontakt a bezplatná konzultácia | Marvol s.r.o. Vrútky"
      description="Kontaktujte špecialistov na fotovoltiku Marvol s.r.o. Obhliadky po celom Slovensku zdarma. Telefón: +421 948 123 456, e-mail: info@marvol.sk. Sídlo: Vrútky."
      canonicalPath="/kontakt"
      schema={jsonLdSchema}
      isSubpage={true}
    >
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <ol className="flex items-center space-x-2 text-xs text-slate-400">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-600">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-amber-400 font-semibold">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Nationwide Coverage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pôsobnosť po celom Slovensku • Bezplatná osobná obhliadka</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6">
              Kontaktujte nás &amp; <span className="text-amber-400">Získajte návrh zdarma</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Máte otázky k fotovoltike, batériovému úložisku, tepelnému čerpadlu alebo štátnym dotáciám? Náš tím
              certifikovaných inžinierov a technikov je pripravený navrhnúť pre vás optimálne energetické riešenie s
              garanciou maximálnej úspory.
            </p>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-amber-400 font-bold block text-sm sm:text-base">do 24 hodín</span>
                <span className="text-slate-400 text-xs">Odpoveď a kalkulácia</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-emerald-400 font-bold block text-sm sm:text-base">0 €</span>
                <span className="text-slate-400 text-xs">Obhliadka po celej SR</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-sky-400 font-bold block text-sm sm:text-base">Až 4 025 €</span>
                <span className="text-slate-400 text-xs">Dotácia SIEA na kľúč</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                <span className="text-purple-400 font-bold block text-sm sm:text-base">100% Záruka</span>
                <span className="text-slate-400 text-xs">Oprávnený zhotoviteľ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Responsive Layout */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Column 1: Direct Channels, Statutory Info & Interactive Map (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct channels card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
                <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-sm">
                    ⚡
                  </span>
                  <span>Priame kontaktné kanály</span>
                </h2>

                <div className="space-y-4">
                  {/* Infolinka */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                      <span>Infolinka &amp; Technická podpora</span>
                      <span className="text-emerald-400 font-medium lowercase text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {COMPANY_DETAILS.contact.businessHours.shortDisplay}
                      </span>
                    </div>
                    <a
                      href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                      className="text-lg sm:text-xl font-black text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <span className="text-amber-400">📞</span>
                      <span>{COMPANY_DETAILS.contact.phone}</span>
                    </a>
                    <p className="text-xs text-slate-400 mt-1">
                      {COMPANY_DETAILS.contact.businessHours.workdays}. {COMPANY_DETAILS.contact.businessHours.weekend}.
                    </p>
                  </div>

                  {/* Email */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Elektronická pošta
                    </div>
                    <a
                      href={`mailto:${COMPANY_DETAILS.contact.email}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <span className="text-amber-400">✉️</span>
                      <span>{COMPANY_DETAILS.contact.email}</span>
                    </a>
                    <p className="text-xs text-slate-400 mt-1">
                      Pre zasielanie projektových podkladov, architektonických plánov a fakturáciu.
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Okamžitý chat &amp; Fotodokumentácia strechy
                    </div>
                    <a
                      href={COMPANY_DETAILS.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-bold text-emerald-400 hover:text-emerald-300 transition-colors text-base"
                    >
                      <span>💬</span>
                      <span>Napísať na WhatsApp</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                        Online
                      </span>
                    </a>
                    <p className="text-xs text-slate-400 mt-1">
                      Môžete nám priamo odfotiť vašu strechu alebo rozvádzač pre bleskový predbežný posudok.
                    </p>
                  </div>

                  {/* Physical Address */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Sídlo a korešpondenčná adresa
                    </div>
                    <div className="text-sm font-semibold text-white flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">📍</span>
                      <span>{COMPANY_DETAILS.seat.fullAddress}</span>
                    </div>
                    <a
                      href={COMPANY_DETAILS.map.googleMapsDirectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-400 hover:text-amber-300 underline font-medium mt-2 inline-block"
                    >
                      Otvoriť trasu v Google Maps →
                    </a>
                  </div>

                </div>
              </div>

              {/* Statutory Card (§ 3a Obchodného zákonníka & § 4 zákona o DPH) */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <span className="text-amber-400">⚖️</span>
                    <span>Zákonné identifikačné údaje</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                    § 3a Obch. zák.
                  </span>
                </div>

                <div className="text-xs space-y-2.5 text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Obchodné meno:</span>
                    <span className="font-bold text-white text-right">{COMPANY_DETAILS.legalName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Sídlo:</span>
                    <span className="text-right">{COMPANY_DETAILS.seat.street}, {COMPANY_DETAILS.seat.zip} {COMPANY_DETAILS.seat.city}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">IČO:</span>
                    <span className="font-mono font-bold text-white text-right">
                      {COMPANY_DETAILS.tax.ico || '53 060 091'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">DIČ:</span>
                    <span className="font-mono text-white text-right">
                      {COMPANY_DETAILS.tax.dic || '2121255961'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">IČ DPH:</span>
                    <span className="font-mono font-bold text-amber-400 text-right">
                      {COMPANY_DETAILS.tax.icDph || 'SK2121255961'} <span className="text-[10px] font-normal text-slate-400">(§ 4 zákona o DPH)</span>
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                    <span className="text-slate-400">Registrácia:</span>
                    <span className="text-right text-[11px] max-w-[220px]">
                      Mestský súd Žilina (pôvodne Okresný súd Žilina), oddiel: Sro, vložka č. 74765/L
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Dotačný štatút:</span>
                    <span className="text-right font-semibold text-emerald-400">
                      SIEA oprávnený zhotoviteľ
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Google Maps embed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <span>📍</span>
                    <span>Mapa sídla spoločnosti</span>
                  </span>
                  <a
                    href={COMPANY_DETAILS.map.googleMapsDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Zväčšiť mapu
                  </a>
                </div>

                <iframe
                  src="https://maps.google.com/maps?q=Chot%C3%A1rna+3394%2F6,+038+61+Vr%C3%BAtky,+Slovakia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="320"
                  className="rounded-2xl border border-slate-800 shadow-2xl"
                  loading="lazy"
                  title="Sídlo spoločnosti Marvol s.r.o."
                />
              </div>

              {/* Nationwide coverage card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 rounded-2xl p-5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="text-amber-400">🇸🇰</span>
                  <span>Celoslovenská montážna sieť</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  Naše sídlo a technologické zázemie sa nachádza vo Vrútkach, no inštalačné tímy Marvol s.r.o.
                  realizujú montáže, revízie a bezplatné obhliadky vo všetkých krajoch SR:
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300 pt-1">
                  <span className="flex items-center gap-1">✓ Žilinský kraj</span>
                  <span className="flex items-center gap-1">✓ Bratislavský kraj</span>
                  <span className="flex items-center gap-1">✓ Trenčiansky kraj</span>
                  <span className="flex items-center gap-1">✓ Trnavský kraj</span>
                  <span className="flex items-center gap-1">✓ Nitriansky kraj</span>
                  <span className="flex items-center gap-1">✓ Banskobystrický kraj</span>
                  <span className="flex items-center gap-1">✓ Prešovský kraj</span>
                  <span className="flex items-center gap-1">✓ Košický kraj</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-semibold pt-1">
                  Nezáväzná osobná obhliadka technikom je bezplatná po celom Slovensku bez príplatkov za dopravu.
                </p>
              </div>

            </div>

            {/* Column 2: LeadForm Integration (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="sticky top-28">
                <LeadForm
                  initialService={queryService}
                  source="page_kontakt"
                  showLocationField={true}
                  title="Formulár nezáväzného dopytu & obhliadky"
                  subtitle="Vyplňte kontaktné údaje a lokalitu realizácie. Technik vás bude kontaktovať do 24 hodín s bezplatnou ponukou."
                />

                {/* Trust guarantee banner below form */}
                <div className="mt-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <span className="text-amber-400">🛡️</span>
                    <span>Čo garantujeme pri každom dopyte:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <span className="text-amber-400 font-bold block mb-1">1. Bezplatná štúdia</span>
                      <p className="text-slate-400 text-[11px]">
                        Presný prepočet ročnej výroby energie a návratnosti investície.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <span className="text-emerald-400 font-bold block mb-1">2. Garancia dotácie</span>
                      <p className="text-slate-400 text-[11px]">
                        Kompletná administratíva SIEA a zmluvná garancia vybavenia poukážky.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <span className="text-sky-400 font-bold block mb-1">3. Žiadny nátlak</span>
                      <p className="text-slate-400 text-[11px]">
                        Návrh a konzultácia sú 100% nezáväzné. Rozhodnutie je plne na vás.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mini-FAQ Section with 3 High-Converting Q&As */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Časté otázky pred kontaktovaním
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              Máte otázky pred odoslaním dopytu?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Transparentné informácie o našom postupe, cenách a termínoch.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/70 transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg flex items-center gap-3">
                      <span className="text-amber-400 text-sm">0{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400 border-amber-400/40' : ''
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Call Out Banner */}
          <div className="mt-12 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">Potrebujete okamžitú odpoveď?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Zavolajte priamo nášmu vedúcemu technikovi. Radi vám nezáväzne poradíme.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${COMPANY_DETAILS.contact.phoneClean}`}
                className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>📞</span>
                <span>{COMPANY_DETAILS.contact.phone}</span>
              </a>
              <a
                href={COMPANY_DETAILS.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
