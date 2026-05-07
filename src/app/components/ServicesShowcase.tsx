'use client';

import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

const services = [
  {
    id: 'assisted-living',
    title: 'Assisted Living',
    location: 'All Residences',
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_128eb3087-1772198538478.png',
    imageAlt:
      'Warm caregiver assisting elderly woman getting dressed in a bright private suite with morning sunlight',
    desc:
      'Personalized daily support for adults — help with bathing, dressing, meals, mobility, and routines in a relaxed, home-like environment where residents feel comfortable and respected.',
    tags: ['Personal Care', 'Mobility Support', 'Daily Routines'],
  },

  {
    id: 'resident-care',
    title: 'Resident Care',
    location: 'RN Overseen',
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png',
    imageAlt:
      'Registered nurse reviewing care plan with elderly resident in a bright comfortable room',
    desc:
      'Every resident receives a personalized care plan thoughtfully developed and regularly reviewed to ensure individualized attention and comfort.',
    tags: ['Personalized Plans', 'RN Oversight', 'Regular Reviews'],
  },

  {
    id: 'medication-management',
    title: 'Medication Management',
    location: 'Daily Administration',
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1fc225ff9-1772146890919.png',
    imageAlt:
      'Caregiver carefully preparing medications for a senior resident with attention to detail',
    desc:
      'Safe, accurate medication administration and monitoring every day — giving families confidence and peace of mind.',
    tags: ['Safe Administration', 'Monitoring', 'Professional Support'],
  },

  {
    id: '24-7-services',
    title: '24/7 Support',
    location: 'Around the Clock',
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png',
    imageAlt:
      'Caregiver attentively assisting a senior resident in a warm well-lit room at night',
    desc:
      'Our team remains available day and night to provide attentive care, reassurance, and immediate response whenever needed.',
    tags: ['24/7 Availability', 'Emergency Support', 'Compassionate Care'],
  },

  {
    id: 'memory-support',
    title: 'Memory Support',
    location: 'Specialized Care',
    image:
      'https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png',
    imageAlt:
      'Caregiver gently holding hands with an elderly resident in a softly lit memory care room',
    desc:
      'Specialized, compassionate support for adults living with Alzheimer’s, dementia, or other memory-related conditions.',
    tags: ['Alzheimer’s Care', 'Dementia Support', 'Structured Routines'],
  },
];

export default function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);

  const switchService = (idx: number) => {
    if (idx === activeIdx) return;

    setImageOpacity(0);

    setTimeout(() => {
      setActiveIdx(idx);
      setImageOpacity(1);
    }, 250);
  };

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll('.reveal-hidden').forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, []);

  const active = services[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 reveal-hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent mb-4">
            What We Offer
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-[3.8rem] font-bold tracking-tight text-foreground leading-[1] max-w-3xl">
            Care thoughtfully tailored to every resident.
          </h2>
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
          From assisted living to specialized memory support, every service is
          delivered with compassion, dignity, and personalized attention.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Nav */}
        <div className="lg:col-span-4 reveal-hidden">
          <div className="flex flex-col gap-2">
            {services.map((svc, idx) => (
              <button
                key={svc.id}
                onClick={() => switchService(idx)}
                className={`group relative text-left rounded-2xl px-5 py-5 transition-all duration-300 border overflow-hidden ${
                  idx === activeIdx
                    ? 'bg-secondary border-border shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-muted/50 hover:border-border'
                }`}
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1 rounded-full transition-all duration-300 ${
                    idx === activeIdx
                      ? 'bg-primary'
                      : 'bg-transparent'
                  }`}
                />

                <div className="relative z-10">
                  <h4
                    className={`text-base md:text-lg font-semibold transition-colors ${
                      idx === activeIdx
                        ? 'text-primary'
                        : 'text-foreground'
                    }`}
                  >
                    {svc.title}
                  </h4>

                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                    {svc.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div
          className="lg:col-span-8 reveal-hidden"
          style={{ transitionDelay: '0.15s' }}
        >
          {/* Image */}
          <div
            className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted mb-8 shadow-[0_24px_80px_rgba(26,43,60,0.14)]"
            style={{
              opacity: imageOpacity,
              transition: 'opacity 0.3s ease',
            }}
          >
            <AppImage
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="luxury-image object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
          </div>

          {/* Text */}
          <div
            style={{
              opacity: imageOpacity,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {active.title}
              </h3>

              <a
                href={`/services#${active.id}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary hover:text-accent transition-colors"
              >
                Learn More
                <span>→</span>
              </a>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-7">
              {active.desc}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
