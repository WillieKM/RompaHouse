import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ServicesShowcase from '@/app/components/ServicesShowcase';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import BlogSection from '@/app/components/BlogSection';
import FaqSection from '@/app/components/FaqSection';
import CtaBanner from '@/app/components/CtaBanner';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      import WelcomeSection from '@/app/components/WelcomeSection';
      <ServicesShowcase />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
