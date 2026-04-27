'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const staff = [
{
  name: 'Dr. Patricia Nguyen',
  role: 'Medical Director',
  bio: 'Board-certified geriatrician with 18 years in senior care. Leads our physician oversight and develops individualized care protocols.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_144fe309e-1763299127752.png",
  imageAlt: 'Professional Asian American female doctor in white coat with warm confident smile against a neutral background',
  credentials: 'MD, Geriatrics · Johns Hopkins'
},
{
  name: 'Marcus Thompson',
  role: 'Director of Nursing',
  bio: 'RN with a specialty in memory care. Marcus oversees all clinical staff and maintains our 24/7 care protocols.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a76459c2-1772714043915.png",
  imageAlt: 'Professional African American male nurse in scrubs with a calm and confident expression in a medical setting',
  credentials: 'RN, BSN · 14 Years Experience'
},
{
  name: 'Linda Kowalski',
  role: 'Activities Coordinator',
  bio: 'Certified recreational therapist who builds the monthly activities calendar — from art workshops to community garden days.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
  imageAlt: 'Smiling middle-aged Caucasian woman with warm expression in professional attire against a light background',
  credentials: 'CTRS · Recreation Therapy'
},
{
  name: 'James Rivera',
  role: 'Executive Chef',
  bio: 'Culinary Institute of America graduate who crafts seasonal menus in partnership with our dietitian to ensure every meal is both nourishing and delicious.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d155123b-1763296947586.png",
  imageAlt: 'Hispanic male chef in white chef coat with a professional and friendly expression in a kitchen setting',
  credentials: 'CIA Grad · Culinary Nutrition'
}];


export default function StaffSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('reveal-visible');}),
      { threshold: 0.08 }
    );
    el?.querySelectorAll('.reveal-hidden')?.forEach((child) => obs?.observe(child));
    return () => obs?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="staff" className="mb-20 pt-8 border-t border-border">
      <div className="reveal-hidden mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Our Team</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          The people who make the difference.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {staff?.map((member, idx) =>
        <div
          key={idx}
          className="group reveal-hidden"
          style={{ transitionDelay: `${idx * 0.1}s` }}>

            {/* Photo */}
            <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-muted relative">
              <AppImage
              src={member?.image}
              alt={member?.imageAlt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />

              {/* Bottom overlay for credentials */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-white/80 font-mono">{member?.credentials}</span>
              </div>
            </div>
            <h4 className="text-sm font-bold text-foreground mb-0.5">{member?.name}</h4>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{member?.role}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{member?.bio}</p>
          </div>
        )}
      </div>
    </section>);

}