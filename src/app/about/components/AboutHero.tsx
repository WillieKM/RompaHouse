import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function AboutHero() {
  return (
    <section className="relative min-h-[55vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src="/rompa-entrance.jpeg"
          alt="Welcoming entrance to Rompa House, a renovated former convent in Spokane, WA"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110 contrast-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 pt-40">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Our Home</p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6 max-w-3xl">
          A Place Built on Faith, Family, and Trust.
        </h1>

        <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
          Get to know the people, the place, and the values that make Rompa House feel like home.
        </p>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">About</span>
        </nav>
      </div>
    </section>
  );
}
