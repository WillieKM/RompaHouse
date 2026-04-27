import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden" id="services-hero">
      <AppImage
        src="https://images.unsplash.com/photo-1586662129457-406695a68f86"
        alt="Lush garden courtyard of senior living facility with stone paths, green plants and warm afternoon sunlight"
        fill
        priority
        sizes="100vw"
        className="object-cover" />

      {/* Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/40 to-dark-bg/10" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 pt-40">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">What We Provide</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6 max-w-3xl">
          Personalized Care Services, Designed Around Each Resident.
        </h1>
        <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
          At Rompa House, every service is delivered with dignity, patience, and compassion — in a warm, home-like setting where residents feel truly at home.
        </p>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Services</span>
        </nav>
      </div>
    </section>);

}