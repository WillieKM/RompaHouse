import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function AboutStory() {
  return (
    <section className="relative bg-background px-6 md:px-10 py-28">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] shadow-2xl">
            <AppImage
              src="/rompa-exterior-yard.jpeg"
              alt="Exterior and garden yard of the renovated former convent that houses Rompa House"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover brightness-105 contrast-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 bg-white/95 rounded-2xl p-6 shadow-xl max-w-md">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                A Renovated Former Convent
              </p>
              <p className="text-foreground font-semibold leading-relaxed">
                East Central Spokane, in partnership with St. Ann Catholic Parish.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Our Story</p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
            A home with deep roots in the community.
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Rompa House is housed in a beautifully renovated former convent in East Central Spokane, operated
            in partnership with St. Ann Catholic Parish. That history shapes how we care — faith, dignity, and
            warmth are woven into daily life, not added on.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            We intentionally keep our community small, serving up to 16 residents at a time, with a Registered
            Nurse involved in every care plan. No one is ever just a room number — every resident is known by
            name and cared for as family.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-dark-bg transition-all duration-300 shadow-lg"
          >
            Schedule a Tour
          </Link>
        </div>

      </div>
    </section>
  );
}
