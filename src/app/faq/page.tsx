import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqHero from '@/app/faq/components/FaqHero';
import FaqSection from '@/app/components/FaqSection';

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <FaqHero />
      <FaqSection />
      <Footer />
    </main>
  );
}
