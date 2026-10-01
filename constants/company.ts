/**
 * Centralized Statutory Corporate Constants for Marvol s. r. o.
 * Compliant with § 3a Obchodného zákonníka & § 4 zákona o DPH.
 * Single source of truth across header, footer, contact page, and JSON-LD schema.
 */

export const COMPANY_DETAILS = {
  legalName: 'Marvol s. r. o.',
  shortName: 'Marvol',
  seat: {
    street: 'Chotárna 3394/6',
    city: 'Vrútky',
    zip: '038 61',
    country: 'Slovenská republika',
    countryCode: 'SK',
    fullAddress: 'Chotárna 3394/6, 038 61 Vrútky, Slovenská republika',
  },
  registry: {
    court: 'Mestský súd Žilina (pôvodne Okresný súd Žilina)',
    section: 'Sro',
    insertNumber: '74765/L',
    legalNotice: 'Zapísaná v Obchodnom registri Okresného súdu Žilina, oddiel: Sro, vložka č. 74765/L',
  },
  tax: {
    ico: '53 060 091',
    icoRaw: '53060091',
    dic: '2121255961',
    icDph: 'SK2121255961',
    vatPayer: true,
  },
  contact: {
    phone: '+421 948 123 456',
    phoneClean: '+421948123456',
    email: 'info@marvol.sk',
    whatsappUrl: 'https://wa.me/421948123456?text=Dobry%20den,%20mam%20zaujem%20o%20fotovoltiku%20od%20Marvol%20s.r.o.',
    businessHours: {
      workdays: 'Pondelok – Piatok: 08:00 – 18:00',
      weekend: 'Víkend: dopyty spracované do 24 hodín',
      shortDisplay: 'Po - Pia: 8:00 - 18:00',
    },
  },
  subsidies: {
    zelenaDomacnostiam: true,
    zelenaPodnikom: true,
    maxHomeSubsidy: '4 025 €',
    maxHeatPumpSubsidy: '3 800 €',
    providerName: 'SIEA (Slovenská inovačná a energetická agentúra)',
  },
  map: {
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Chot%C3%A1rna+3394%2F6,+038+61+Vr%C3%BAtky,+Slovakia&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsDirectLink: 'https://maps.google.com/?q=Chot%C3%A1rna+3394%2F6,+038+61+Vr%C3%BAtky',
  },
} as const;

export type CompanyDetails = typeof COMPANY_DETAILS;
