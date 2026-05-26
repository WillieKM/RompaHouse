'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const slides = [
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png',
    alt: 'Warm sunlit senior living common room',
    fit: 'cover' as const,
  },
  {
    src: '/rompa-entrance.jpeg',
    alt: 'Rompa House entrance',
    fit: 'cover' as const,
  },
  {
    src: 'https://img.rocket.new/generatedImages/rocket_gen_img_13eb12a0b-1772198540397.png',
    alt: 'Resident and caregiver moment',
    fit: 'cover' as const,
  },
  {
    src: '/assets/images/app_logo.jpg',
    alt: 'Rompa House Assisted Living logo',
    fit: 'contain' as const,
    bg: 'bg-white',
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
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 250);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => {
      clearTimeout(timer);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden bg-dark-bg"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`carousel-slide ${slide.bg ?? ''} ${
              idx === currentSlide ? 'active' : ''
            }`}
          >
            <AppImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`${slide.fit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-[9000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                idx === currentSlide
                  ? 'scale-105'
                  : 'scale-100'
              }`}
            />
          </div>
        ))}

        {/* Luxury overlays */}
        <div className="absolute inset-0 z-10 bg-black/45" />

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/78 via-black/45 to-black/10" />

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_70%_35%,transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl pt-36 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20">
            {/* Eyebrow */}
            <div
              className={`mb-5 transition-all duration-700 ${
                titleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] shadow-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />

                Licensed Assisted Living · Spokane, WA
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`max-w-5xl font-bold text-white leading-[0.9] tracking-[-0.06em] mb-6 sm:mb-8 transition-all duration-700 ${
                titleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontSize:
                  'clamp(3rem, 9vw, 7rem)',
              }}
            >
              Personalized Adult
              <br />
              Care &amp; Memory Support,
              <br />

              <span className="text-accent">
                in a Place That Feels
              </span>

              <br />
              Like Home.
            </h1>

            {/* Subtext */}
            <p
              className={`max-w-2xl text-white/88 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 transition-all duration-700 ${
                titleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              A warm, intimate assisted living residence where every resident is personally known, deeply respected, and compassionately cared for every day.
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 sm:mb-16 transition-all duration-700 ${
                titleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[52px] px-8 sm:px-9 py-4 rounded-full bg-white text-primary font-bold uppercase tracking-[0.18em] text-sm shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                Schedule a Tour
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center min-h-[52px] px-8 sm:px-9 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-[0.18em] text-sm hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-10 lg:gap-16 transition-all duration-700 ${
                titleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="relative pl-4 sm:pl-5"
                >
                  <div className="absolute left-0 top-1 h-10 sm:h-12 w-px bg-white/20" />

                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/65 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-5 sm:bottom-7 right-5 sm:right-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-500 ${
              idx === currentSlide
                ? 'w-9 h-1.5 bg-white'
                : 'w-3 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
