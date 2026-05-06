import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function WelcomeSection() {
  return (
    <section className="relative bg-background px-6 md:px-10 py-28 animate-fadeInUp">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">
            Welcome
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
            A warm home with care you can trust.
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Rompa House is a licensed assisted living facility in Spokane, WA,
            specializing in personalized adult care and memory support. We provide
            compassionate, dignified care in a warm and comfortable home-like setting,
            where every resident is known, respected, and truly cared for.
          </p>

          <Link
            href="/services"
            className="inline-flex items-center px-7 py-3.5 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-dark-bg transition-all duration-300 shadow-lg"
          >
            Explore Our Care
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl">
            <AppImage
              src="/rompa-living-area.jpeg"
              alt="Rompa House warm living area"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover brightness-105 contrast-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-2xl p-6 shadow-xl max-w-md">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                Licensed Assisted Living
              </p>
              <p className="text-foreground font-semibold leading-relaxed">
                Personalized support in a peaceful, family-style environment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
