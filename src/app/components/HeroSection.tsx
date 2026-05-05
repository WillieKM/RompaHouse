'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const slides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png",
  alt: 'Warm sunlit senior living common room'
},
{
 src: "/rompa-entarnce.jpeg",
  alt: 'Bright garden courtyard'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_13eb12a0b-1772198540397.png",
  alt: 'Resident and caregiver moment'
}];


const stats = [
{ value: '16', label: 'Max Residents' },
{ value: '24/7', label: 'Dedicated Care' },
{ value: 'RN-Led', label: 'Clinical Oversight' }];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 300);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      clearTimeout(t);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden" id="hero">
      
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
              className="object-cover brightness-110 contrast-105"
            />
          </div>
        ))}

        {/* Balanced premium overlays (FIXED) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24 pt-36">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <div className={`mb-6 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-white text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Licensed Assisted Living · Spokane, WA
            </span>
          </div>

          {/* Headline */}
          <h1 className={`text-hero text-white mb-6 ${titleVisible ? 'text-reveal-active' : ''}`}>
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content">Personalized Adult Care</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content">&amp; Memory Support,</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content text-accent">in a Place That Feels Like Home.</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Rompa House provides compassionate, dignified assisted living in a warm, home-like setting where every resident is known and cared for.
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              href="/contact"
              className="px-7 py-3.5 bg-white text-primary text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Schedule a Tour
            </Link>

            <Link
              href="/services"
              className="px-7 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/25 transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>

          {/* Stats */}
          <div className={`flex flex-wrap gap-8 md:gap-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {stats.map((stat, idx) => (
              <div key={idx}>
                <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                <span className="block text-xs uppercase tracking-widest text-white/60 mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
