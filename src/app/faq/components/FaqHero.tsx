import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function FaqHero() {
  return (
    <section className="relative min-h-[45vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src="/rompa-living-area-2.jpeg"
          alt="Warm, sunlit common room at Rompa House where residents and families gather"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110 contrast-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 pt-40">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Common Questions</p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6 max-w-3xl">
          Answers, before you even ask.
        </h1>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">FAQ</span>
        </nav>
      </div>
    </section>
  );
}
