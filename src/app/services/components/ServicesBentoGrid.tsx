'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';


/*
BENTO GRID AUDIT
Array has 6 cards: [Memory Care, Daily Living, Rehabilitation, Social Programs, Dining, Wellness]

4-column grid:
Row 1: [col-1: Memory Care cs-2 rs-2] [col-3: Daily Living cs-1] [col-4: Rehabilitation cs-1]
Row 2: [col-1: Memory Care cont.] [col-2: Memory Care cont.] [col-3: Social Programs cs-1] [col-4: Dining cs-1]
Row 3: [col-1: Wellness cs-4]

Placed 6/6 cards ✓
*/

const services = [
{
  id: 'assisted-living',
  title: 'Assisted Living',
  desc: 'Personalized daily support with bathing, dressing, meals, mobility, and routines in a relaxed, home-like environment where residents feel comfortable and respected.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128eb3087-1772198538478.png",
  imageAlt: 'Warm caregiver assisting elderly woman in a bright private suite with morning sunlight',
  icon: 'HomeIcon',
  span: 'col-span-2 row-span-2',
  large: true
},
{
  id: 'resident-care',
  title: 'Resident Care',
  desc: 'Every resident receives a personalized care plan developed and overseen by our Registered Nurse.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png",
  imageAlt: 'Registered nurse reviewing individualized care plan with elderly resident in a comfortable room',
  icon: 'UserIcon',
  span: 'col-span-1 row-span-1',
  large: false
},
{
  id: 'medication-management',
  title: 'Medication Management',
  desc: 'Safe, accurate medication administration and monitoring every day by our RN-led team.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc225ff9-1772146890919.png",
  imageAlt: 'Caregiver carefully preparing and administering medications for senior residents',
  icon: 'BoltIcon',
  span: 'col-span-1 row-span-1',
  large: false
},
{
  id: '24-7-services',
  title: '24/7 Special Services',
  desc: 'Around-the-clock care, emergency response, and on-site RN oversight — always available.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png",
  imageAlt: 'Attentive caregiver providing nighttime assistance to a senior resident in a warm well-lit room',
  icon: 'UsersIcon',
  span: 'col-span-1 row-span-1',
  large: false
},
{
  id: 'memory-support',
  title: 'Memory Support',
  desc: 'Specialized, compassionate care for adults living with Alzheimer\'s, dementia, or other memory-related conditions.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png",
  imageAlt: 'Caregiver gently holding hands with an elderly resident in a bright softly lit memory care room',
  icon: 'SparklesIcon',
  span: 'col-span-1 row-span-1',
  large: false
},
{
  id: 'daily-living',
  title: 'Dignified Daily Living',
  desc: 'We support residents with daily routines — bathing, dressing, meals, and mobility — with patience, respect, and compassion at every step. A true home, not a clinical facility.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b6245c1-1774555378321.png",
  imageAlt: 'Senior residents enjoying a warm social gathering in a bright cheerful common room at Rompa House',
  icon: 'SunIcon',
  span: 'col-span-4',
  large: false,
  wide: true
}];


export default function ServicesBentoGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('reveal-visible');}),
      { threshold: 0.08 }
    );
    el?.querySelectorAll('.reveal-hidden')?.forEach((child) => obs?.observe(child));
    return () => obs?.disconnect();
  }, []);

  return (
    <div ref={gridRef} id="services-grid" className="mb-20">
      <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Our Services</p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10">
        Compassionate care under one roof.
      </h2>
      {/* Bento Grid — 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-hidden">
        {/* Card 1: Memory Care — col-span-2 row-span-2 */}
        <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl bg-muted min-h-[400px] flex flex-col justify-end shadow-lg">
          <AppImage
            src={services?.[0]?.image}
            alt={services?.[0]?.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/20 to-transparent" />
          <div className="relative z-10 p-6 text-white">
            <span className="inline-block mb-2 px-3 py-1 bg-white/15 border border-white/20 rounded-full text-xs font-semibold uppercase tracking-wider">Specialized</span>
            <h3 className="text-2xl font-bold mb-2">{services?.[0]?.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{services?.[0]?.desc}</p>
          </div>
        </div>

        {/* Card 2: Daily Living — col-span-1 */}
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-muted min-h-[190px] flex flex-col justify-end shadow-md">
          <AppImage
            src={services?.[1]?.image}
            alt={services?.[1]?.imageAlt}
            fill
            sizes="25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/75 via-dark-bg/20 to-transparent" />
          <div className="relative z-10 p-4 text-white">
            <h3 className="text-sm font-bold mb-1">{services?.[1]?.title}</h3>
            <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{services?.[1]?.desc}</p>
          </div>
        </div>

        {/* Card 3: Rehabilitation — col-span-1 */}
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-muted min-h-[190px] flex flex-col justify-end shadow-md">
          <AppImage
            src={services?.[2]?.image}
            alt={services?.[2]?.imageAlt}
            fill
            sizes="25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/75 via-dark-bg/20 to-transparent" />
          <div className="relative z-10 p-4 text-white">
            <h3 className="text-sm font-bold mb-1">{services?.[2]?.title}</h3>
            <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{services?.[2]?.desc}</p>
          </div>
        </div>

        {/* Card 4: Social Programs — col-span-1 */}
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-muted min-h-[190px] flex flex-col justify-end shadow-md">
          <AppImage
            src={services?.[3]?.image}
            alt={services?.[3]?.imageAlt}
            fill
            sizes="25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/75 via-dark-bg/20 to-transparent" />
          <div className="relative z-10 p-4 text-white">
            <h3 className="text-sm font-bold mb-1">{services?.[3]?.title}</h3>
            <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{services?.[3]?.desc}</p>
          </div>
        </div>

        {/* Card 5: Dining — col-span-1 */}
        <div className="col-span-1 group relative overflow-hidden rounded-2xl bg-muted min-h-[190px] flex flex-col justify-end shadow-md">
          <AppImage
            src={services?.[4]?.image}
            alt={services?.[4]?.imageAlt}
            fill
            sizes="25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/75 via-dark-bg/20 to-transparent" />
          <div className="relative z-10 p-4 text-white">
            <h3 className="text-sm font-bold mb-1">{services?.[4]?.title}</h3>
            <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{services?.[4]?.desc}</p>
          </div>
        </div>

        {/* Card 6: Wellness — col-span-4 (full width) */}
        <div className="col-span-2 md:col-span-4 group relative overflow-hidden rounded-2xl bg-muted min-h-[220px] flex items-end shadow-lg">
          <AppImage
            src={services?.[5]?.image}
            alt={services?.[5]?.imageAlt}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700" />

          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/75 via-dark-bg/40 to-transparent" />
          <div className="relative z-10 p-6 md:p-8 text-white max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{services?.[5]?.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed">{services?.[5]?.desc}</p>
          </div>
        </div>
      </div>
    </div>);

}