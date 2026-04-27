'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const slides = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png",
  alt: 'Warm sunlit senior living common room with soft armchairs, large windows, cream walls and warm wood floors'
},
{
  src: "https://images.unsplash.com/photo-1586662129457-406695a68f86",
  alt: 'Bright garden courtyard of an assisted living facility with lush green plants, stone pathways and afternoon light'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_13eb12a0b-1772198540397.png",
  alt: 'Senior resident and caregiver sharing a warm conversation in a cozy private suite with soft lighting'
}];


const stats = [
{ value: '16', label: 'Max Residents' },
{ value: '24/7', label: 'Dedicated Care' },
{ value: 'RN-Led', label: 'Clinical Oversight' }];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
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
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) =>
        <div
          key={idx}
          className={`carousel-slide ${idx === currentSlide ? 'active' : ''}`}>

            <AppImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover" />

          </div>
        )}
        {/* Dark gradient scrim — strong enough for white text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 z-10" />
        {/* Warm blue tint overlay */}
        <div className="absolute inset-0 bg-dark-bg/20 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24 pt-36">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className={`mb-6 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-white text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Licensed Assisted Living · Spokane, WA
            </span>
          </div>

          {/* Headline — masked text reveal */}
          <h1
            className={`text-hero text-white mb-6 ${titleVisible ? 'text-reveal-active' : ''}`}>

            <span className="text-reveal-wrapper">
              <span className="text-reveal-content" style={{ transitionDelay: '0.2s' }}>Personalized Adult Care</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content" style={{ transitionDelay: '0.35s' }}>&amp; Memory Support,</span>
            </span>
            <br />
            <span className="text-reveal-wrapper">
              <span className="text-reveal-content text-accent" style={{ transitionDelay: '0.5s' }}>in a Place That Feels Like Home.</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.65s' }}>

            Rompa House is a licensed assisted living facility in Spokane, WA, providing compassionate, dignified care in a warm and comfortable home-like setting — where every resident is known, respected, and truly cared for.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.8s' }}>

            <Link
              href="/contact"
              className="px-7 py-3.5 bg-white text-primary text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 min-h-[44px] flex items-center">

              Schedule a Tour
            </Link>
            <Link
              href="/services"
              className="px-7 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/25 transition-all duration-300 min-h-[44px] flex items-center">

              Explore Services
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className={`flex flex-wrap gap-8 md:gap-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '1s' }}>

            {stats.map((stat, idx) =>
            <div key={idx} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mt-1">{stat.label}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20 flex gap-2">
        {slides.map((_, idx) =>
        <button
          key={idx}
          onClick={() => setCurrentSlide(idx)}
          aria-label={`Go to slide ${idx + 1}`}
          className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/40'}`} />

        )}
      </div>
    </section>);

}