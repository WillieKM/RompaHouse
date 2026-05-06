'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const slides = [
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png',
    alt: 'Warm sunlit senior living common room',
  },
  {
    src: '/rompa-entrance.jpeg',
    alt: 'Rompa House entrance',
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eb12a0b-1772198540397.png',
    alt: 'Resident and caregiver moment',
  },
];

const stats = [
  { value: '16', label: 'Private Residents' },
  { value: '24/7', label: 'Attentive Support' },
  { value: 'Licensed', label: 'Care Team' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setTitleVisible(true), 250);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-dark-bg"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <AppImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover brightness-105 contrast-105 transition-transform duration-[8000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_35%,transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-10 pb-12 md:pb-20 pt-44">
        <div className="max-w-5xl">
          <div
            className={`mb-6 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/12 border border-white/25 rounded-full text-white text-xs font-bold uppercase tracking-[0.22em] shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Licensed Assisted Living · Spokane, WA
            </span>
          </div>

     <h1
  className={`max-w-5xl text-[clamp(3.2rem,11vw,6.4rem)] leading-[0.92] tracking-[-0.06em] font-bold text-white mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.72)] transition-all duration-700 ${
    titleVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-6'
  }`}
>
  Personalized Adult Care
  <br />
  & Memory Support,
  <br />
  <span className="text-accent">
    in a Place That
  </span>
  <br />
  Feels Like Home.
</h1>
          <p
            className={`text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 drop-shadow-md transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            A warm, home-like assisted living residence where every resident is
            personally known, deeply respected, and thoughtfully cared for each day.
          </p>

          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-white text-primary text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.45)] min-h-[44px] flex items-center"
            >
              Schedule a Tour
            </Link>

            <Link
              href="/services"
              className="px-7 py-3.5 bg-white/10 border border-white/35 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl hover:-translate-y-1 min-h-[44px] flex items-center"
            >
              View Our Care
            </Link>
          </div>

          <div
            className={`flex flex-wrap gap-8 md:gap-16 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="border-l border-white/25 pl-4">
                <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                  {stat.value}
                </span>
                <span className="block text-xs uppercase tracking-widest text-white/70 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentSlide ? 'w-9 bg-white' : 'w-3 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
