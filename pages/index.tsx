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

export default function Home() {
  return (
    <Layout
      title="Marvol s.r.o. | Fotovoltické riešenia na kľúč, BESS batérie & tepelné čerpadlá"
      description="Kompletné fotovoltické riešenia na kľúč pre rodinné domy aj firmy. Vybavíme štátne dotácie Zelená domácnostiam až do 4 025 € (SIEA) s 25-ročnou zárukou."
      canonicalPath="/"
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
