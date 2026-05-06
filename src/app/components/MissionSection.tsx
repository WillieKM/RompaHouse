import React from 'react';
import Link from 'next/link';

export default function MissionSection() {
  return (
    <section className="px-6 md:px-10 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="bg-dark-bg text-white rounded-3xl px-8 md:px-14 py-14 md:py-20 shadow-2xl max-w-3xl">
          <div className="flex items-center gap-4 mb-10">
            <p className="text-sm font-bold">About</p>
            <span className="w-16 h-px bg-white/80" />
          </div>

          <h2 className="text-3xl md:text-[3.3rem] font-bold leading-tight tracking-tight max-w-3xl mb-6">
            Our mission is simple: to honor every resident&apos;s dignity while delivering high-quality, compassionate care tailored to their unique needs—physically, emotionally, and mentally.
          </h2>

          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
            At Rompa House, every decision is guided by respect, dignity, and genuine compassion for each resident we serve.
          </p>

          <Link
            href="/services"
            className="inline-flex w-11 h-11 items-center justify-center border border-white text-white hover:bg-white hover:text-primary transition-colors"
            aria-label="View our services"
          >
            →
          </Link>
        </div>
      </div>
    </section>
  );
}
