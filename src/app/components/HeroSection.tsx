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
  { value: '16', label: 'Max Residents' },
  { value: '24/7', label: 'Dedicated Care' },
  { value: 'RN-Led', label: 'Clinical Oversight' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 250);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      clearTimeout(t);
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
              className={`object-cover brightness-105 contrast-105 transition-transform duration-[6500ms] ease-out ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Luxury contrast system */}
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
            className={`max-w-5xl text-[clamp(3.25rem,6.2vw,6.9rem)] leading-[0.9] tracking-[-0.055em] font-bold text-white mb-7 drop-shadow-[0_8px_28px_rgba(0,0,0,0.72)] ${
              titleVisible ? 'text-reveal-active' : ''
            }`}
          >
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content">Personalized Adult Care</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content">&amp; Memory Support,</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content text-white/95">
                in a Place That Feels Like Home.
              </span>
            </span>
          </h1>

          <p
            className={`text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 drop-shadow-md transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Compassionate, dignified assisted living in a warm, home-like setting
            where every resident is known, respected, and cared for.
          </p>

          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-white text-primary text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl hover:-translate-y-0.5 min-h-[44px] flex items-center"
            >
              Schedule a Tour
            </Link>

            <Link
              href="/services"
              className="px-7 py-3.5 bg-white/10 border border-white/35 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl hover:-translate-y-0.5 min-h-[44px] flex items-center"
            >
              Explore Services
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

      {/* Slide indicators */}
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
