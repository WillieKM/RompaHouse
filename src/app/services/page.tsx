import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from '@/app/services/components/ServicesHero';
import ServicesBentoGrid from '@/app/services/components/ServicesBentoGrid';
import AmenitiesSection from '@/app/services/components/AmenitiesSection';
import StaffSection from '@/app/services/components/StaffSection';
import PhotoGallery from '@/app/services/components/PhotoGallery';
import ServicesCtaSidebar from '@/app/services/components/ServicesCtaSidebar';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <ServicesHero />
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 py-20">
            {/* Main content */}
            <div className="lg:col-span-8">
              <ServicesBentoGrid />
              <AmenitiesSection />
              <StaffSection />
              <PhotoGallery />
            </div>
            {/* Sticky sidebar */}
            <div className="hidden lg:block lg:col-span-4">
              <ServicesCtaSidebar />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}