import React from 'react';
import { Header } from '@/components/Header';
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
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden w-full">
      <Header />
      <main className="overflow-x-hidden w-full">
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
      </main>
      <Footer />
    </div>
  );
}
