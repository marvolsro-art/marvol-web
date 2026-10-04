import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { COMPANY_DETAILS } from "@/constants/company";

export default function App({ Component, pageProps }: AppProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ElectricalContractor"],
        "@id": "https://marvol.sk/#organization",
        "name": "Marvol s.r.o.",
        "legalName": COMPANY_DETAILS.legalName,
        "url": "https://marvol.sk",
        "logo": "https://marvol.sk/logos/logo-marvol.svg",
        "image": "https://marvol.sk/og.png",
        "description": "Špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, tepelné čerpadlá a elektroinštalácie pre domácnosti a firmy.",
        "telephone": COMPANY_DETAILS.contact.phoneClean,
        "email": COMPANY_DETAILS.contact.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": COMPANY_DETAILS.seat.street,
          "addressLocality": COMPANY_DETAILS.seat.city,
          "postalCode": COMPANY_DETAILS.seat.zip,
          "addressCountry": COMPANY_DETAILS.seat.countryCode,
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 49.1128,
          "longitude": 18.9198,
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00",
          },
        ],
        "vatID": COMPANY_DETAILS.tax.icDph,
        "taxID": COMPANY_DETAILS.tax.dic,
        "priceRange": "€€€",
        "areaServed": [
          {
            "@type": "Country",
            "name": "Slovakia",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Akú výšku dotácie môžem získať z programu Zelená domácnostiam?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Z programu Zelená domácnostiam môžete získať príspevok na fotovoltiku v sadzbe 575 €/kW (max. 1 150 €) a na tepelné čerpadlá až do 4 600 € (v schéme Zelená solidarita až do 90 % oprávnených nákladov).",
            },
          },
          {
            "@type": "Question",
            "name": "Ako dlho trvá realizácia fotovoltickej elektrárne na kľúč?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kompletná montáž a sprevádzkovanie systému vrátane administratívy a zapojenia trvá zvyčajne 2 až 4 týždne od podpisu zmluvy.",
            },
          },
          {
            "@type": "Question",
            "name": "Aká je garancia a záruka na komponenty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Na solárne panely poskytujeme záruku na výkon až 25 rokov, na striedače a batérie 10 rokov.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title key="title">Marvol s.r.o. | Fotovoltické riešenia na kľúč, Batérie &amp; Tepelné čerpadlá</title>
        <meta key="description" name="description" content="Marvol s.r.o. - Špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, tepelné čerpadlá a elektroinštalácie pre domácnosti, firmy a obce s vybavení dotácie." />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="Marvol s.r.o." />
        <meta key="og:locale" property="og:locale" content="sk_SK" />
        <meta key="og:title" property="og:title" content="Marvol s.r.o. | Fotovoltické riešenia na kľúč" />
        <meta key="og:description" property="og:description" content="Znížte náklady na energie až o 80% s fotovoltikou od Marvol s.r.o. Vybavíme za vás dotácie Zelená domácnostiam aj Zelená podnikom." />
        <meta key="og:url" property="og:url" content="https://marvol.sk/" />
        <meta key="og:image" property="og:image" content="https://marvol.sk/og.png" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="Marvol s.r.o. | Fotovoltické riešenia na kľúč" />
        <meta key="twitter:description" name="twitter:description" content="Znížte náklady na energie až o 80% s fotovoltikou od Marvol s.r.o. Vybavíme za vás dotácie Zelená domácnostiam aj Zelená podnikom." />
        <meta key="twitter:image" name="twitter:image" content="https://marvol.sk/og.png" />
        <link key="canonical" rel="canonical" href="https://marvol.sk/" />
        <script
          key="schema-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
