import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/app/about/components/AboutHero';
import AboutStory from '@/app/about/components/AboutStory';
import AboutValues from '@/app/about/components/AboutValues';
import StaffSection from '@/app/services/components/StaffSection';
import CtaBanner from '@/app/components/CtaBanner';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutValues />

      <section className="px-6 md:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <StaffSection />
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
