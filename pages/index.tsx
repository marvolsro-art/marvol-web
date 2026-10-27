import React from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { SubsidyBanner } from '@/components/SubsidyBanner';
import { TargetAudienceSection } from '@/components/TargetAudienceSection';
import { ServicesSection } from '@/components/ServicesSection';
import { CalculatorSection } from '@/components/CalculatorSection';
import { ProcessSection } from '@/components/ProcessSection';
import { WhyUsSection } from '@/components/WhyUsSection';
import { ReferencesSection } from '@/components/ReferencesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';

const homepageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://marvol.sk/#website',
    url: 'https://marvol.sk',
    name: 'Marvol s.r.o.',
    description: 'Fotovoltické riešenia na kľúč, batériové úložiská BESS a tepelné čerpadlá pre rodinné domy aj firmy.',
    publisher: {
      '@id': 'https://marvol.sk/#organization',
    },
    inLanguage: 'sk-SK',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ako dlho trvá návratnosť investície do fotovoltiky?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Návratnosť rodinného fotovoltického systému sa pri súčasných cenách elektrickej energie a s využitím štátnej dotácie pohybuje obvykle od 3,5 do 6 rokov. Pri životnosti panelov 25-30 rokov vám tak systém prináša desiatky rokov bezplatnej energie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Akú výšku dotácie môžem získať pre svoj rodinný dom?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Z programu Zelená domácnostiam môžete na fotovoltiku získať štátny príspevok v sadzbe 575 € na 1 kW (podporovaný výkon do 2 kW, teda maximálne 1 150 €). Pri tepelných čerpadlách je dotácia až 4 600 € (460 €/kW). Nízkopríjmové domácnosti v programe Zelená solidarita môžu získať podporu až do 90 % oprávnených nákladov. Spoločnosť Marvol s.r.o. ako registrovaný zhotoviteľ SIEA zabezpečí kompletnú online rezerváciu prostriedkov aj administráciu bezplatne za vás.',
        },
      },
      {
        '@type': 'Question',
        name: 'Čo sa stane s vyrobenou elektrinou, ktorú momentálne nespotrebujem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pokiaľ máte hybridný systém s batériou, prebytky energie sa uložia do vašej batérie na večer. V prípade využitia služby Virtuálna batéria (dodávateľ elektriny) posielate prebytky do siete a neskôr si ich čerpáte späť za zvýhodnené poplatky.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funguje fotovoltický systém aj v zime a počas zamračených dní?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Áno. Solárne fotovoltické panely vyrábajú elektrinu z denného svetla (difúzneho žiarenia), nie iba zo priameho slnečného svitu. Hoci je zimný výkon nižší ako v lete, systém naďalej aktívne znižuje vaše účty za elektrinu.',
        },
      },
      {
        '@type': 'Question',
        name: 'Aký je rozdiel medzi On-Grid, Hybridným a Off-Grid systémom?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'On-Grid systém vyrába elektrinu len vtedy, keď funguje verejná sieť. Hybridný systém má vlastné batériové úložisko a funguje aj ako záložný zdroj pri výpadku siete. Off-Grid je plne ostrovný systém pre objekty bez prípojky elektriny.',
        },
      },
      {
        '@type': 'Question',
        name: 'Vybaví Marvol s.r.o. zapojenie u distribučnej spoločnosti (SSD, ZSD, VSD)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Áno, kompletne! Pripravíme žiadosť o pripojenie do distribučnej sústavy, projektovú dokumentáciu, odbornú revíznu správu aj finálne odovzdanie pre distribučnú spoločnosť.',
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <Layout
      title="Fotovoltika na kľúč, BESS & Tepelné čerpadlá | Marvol s.r.o."
      description="Fotovoltika na kľúč pre rodinné domy a firmy. Vybavíme štátne dotácie SIEA Zelená domácnostiam do 1 150 € (tepelné čerpadlá do 4 600 €). Záruka 25 rokov a servis."
      canonicalPath="/"
      schema={homepageSchema}
      isSubpage={false}
    >
      <Hero />
      <SubsidyBanner />
      <TargetAudienceSection />
      <ServicesSection />
      <CalculatorSection />
      <ProcessSection />
      <WhyUsSection />
      <ReferencesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </Layout>
  );
}
