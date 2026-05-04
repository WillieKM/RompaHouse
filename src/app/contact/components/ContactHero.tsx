import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function ContactHero() {
  return (
    <section className="relative min-h-[50vh] flex items-end overflow-hidden">
      <AppImage
        src="https://img.rocket.new/generatedImages/rocket_gen_img_13eb12a0b-1772198540397.png"
        alt="Compassionate caregiver and senior resident having a warm conversation in a cozy private suite with soft afternoon light"
        fill
        priority
        sizes="100vw"
        className="object-cover" />

      {/* Scrim */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 pt-40">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Get in Touch</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6 max-w-3xl">
          We'd love to hear from you.
        </h1>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
          <Link href="/homepage" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Contact</span>
        </nav>
      </div>
    </section>);

}
