import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Marvol s.r.o. | Fotovoltické riešenia na kľúč, Batérie & Tepelné čerpadlá</title>
        <meta name="description" content="Marvol s.r.o. - Špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, tepelné čerpadlá a elektroinštalácie pre domácnosti, firmy a obce s vybavení dotácie." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Marvol s.r.o. | Fotovoltické riešenia na kľúč" />
        <meta property="og:description" content="Znížte náklady na energie až o 80% s fotovoltikou od Marvol s.r.o. Vybavíme za vás dotácie Zelená domácnostiam aj Zelená podnikom." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["LocalBusiness", "ElectricalContractor"],
                  "@id": "https://marvol.sk/#organization",
                  "name": "Marvol s.r.o.",
                  "url": "https://marvol.sk",
                  "logo": "https://marvol.sk/logos/logo%20marvol.svg",
                  "image": "https://marvol.sk/og.png",
                  "description": "Špecialista na fotovoltické elektrárne na kľúč, batériové úložiská BESS, tepelné čerpadlá a elektroinštalácie pre domácnosti a firmy.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Chotárna 3394/6",
                    "addressLocality": "Vrútky",
                    "postalCode": "038 61",
                    "addressCountry": "SK"
                  },
                  "telephone": "+421900000000",
                  "email": "info@marvol.sk",
                  "vatID": "SK2121255961",
                  "taxID": "2121255961",
                  "priceRange": "€€€",
                  "areaServed": "SK"
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Akú výšku dotácie môžem získať z programu Zelená domácnostiam?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Z programu Zelená domácnostiam môžete získať príspevok na fotovoltiku až do výšky 4 025 €. Výška dotácie závisí od výkonu systému."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Ako dlho trvá realizácia fotovoltickej elektrárne na kľúč?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Kompletná montáž a sprevádzkovanie systému vrátane administratívy a zapojenia trvá zvyčajne 2 až 4 týždne od podpisu zmluvy."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Aká je garancia a záruka na komponenty?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Na solárne panely poskytujeme záruku na výkon až 25 rokov, na striedače a batérie 10 rokov."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
