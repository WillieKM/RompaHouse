'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const services = [
  {
    id: 'assisted-living',
    title: 'Assisted Living',
    desc: 'Personalized daily support with bathing, dressing, meals, mobility, and routines in a relaxed, home-like environment where residents feel comfortable and respected.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_128eb3087-1772198538478.png',
    imageAlt: 'Warm caregiver assisting elderly woman in a bright private suite with morning sunlight',
  },
  {
    id: 'resident-care',
    title: 'Resident Care',
    desc: 'Every resident receives a personalized care plan developed and overseen by our Registered Nurse.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png',
    imageAlt: 'Registered nurse reviewing individualized care plan with elderly resident in a comfortable room',
  },
  {
    id: 'medication-management',
    title: 'Medication Management',
    desc: 'Safe, accurate medication administration and monitoring every day by our RN-led team.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fc225ff9-1772146890919.png',
    imageAlt: 'Caregiver carefully preparing and administering medications for senior residents',
  },
  {
    id: '24-7-services',
    title: '24/7 Special Services',
    desc: 'Around-the-clock care, emergency response, and on-site RN oversight — always available.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png',
    imageAlt: 'Attentive caregiver providing nighttime assistance to a senior resident in a warm well-lit room',
  },
  {
    id: 'memory-support',
    title: 'Memory Support',
    desc: 'Specialized, compassionate care for adults living with Alzheimer’s, dementia, or other memory-related conditions.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png',
    imageAlt: 'Caregiver gently holding hands with an elderly resident in a bright softly lit memory care room',
  },
  {
    id: 'daily-living',
    title: 'Dignified Daily Living',
    desc: 'We support residents with daily routines — bathing, dressing, meals, and mobility — with patience, respect, and compassion at every step. A true home, not a clinical facility.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_11b6245c1-1774555378321.png',
    imageAlt: 'Senior residents enjoying a warm social gathering in a bright cheerful common room at Rompa House',
  },
];

export default function ServicesBentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
        }),
      { threshold: 0.08 }
    );

    el.querySelectorAll('.reveal-hidden').forEach((child) => obs.observe(child));

    return () => obs.disconnect();
  }, []);

  return (
    <div ref={gridRef} id="services-grid" className="mb-20">
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">
        Our Services
      </p>

      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10">
        Compassionate care under one roof.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-hidden">
        {/* Large Card */}
        <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl bg-muted min-h-[400px] flex flex-col justify-end shadow-lg">
          <AppImage
            src={services[0].image}
            alt={services[0].imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

          <div className="relative z-10 p-6 text-white drop-shadow-md">
            <span className="inline-block mb-2 px-3 py-1 bg-white/20 border border-white/25 rounded-full text-xs font-bold uppercase tracking-wider text-white">
              Specialized
            </span>
            <h3 className="text-2xl font-bold mb-2">
              {services[0].title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {services[0].desc}
            </p>
          </div>
        </div>

        {/* Small Cards */}
        {services.slice(1, 5).map((service) => (
          <div
            key={service.id}
            className="col-span-1 group relative overflow-hidden rounded-2xl bg-muted min-h-[190px] flex flex-col justify-end shadow-md"
          >
            <AppImage
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="25vw"
              className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            <div className="relative z-10 p-4 text-white drop-shadow-md">
              <h3 className="text-sm font-bold mb-1">
                {service.title}
              </h3>
              <p className="text-xs text-white/90 leading-relaxed line-clamp-2">
                {service.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Wide Card */}
        <div className="col-span-2 md:col-span-4 group relative overflow-hidden rounded-2xl bg-muted min-h-[220px] flex items-end shadow-lg">
          <AppImage
            src={services[5].image}
            alt={services[5].imageAlt}
            fill
            sizes="100vw"
            className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

          <div className="relative z-10 p-6 md:p-8 text-white max-w-lg drop-shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {services[5].title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              {services[5].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
