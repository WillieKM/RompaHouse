'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  {
    icon: 'HeartIcon',
    label: 'Compassion First',
    desc: 'Every interaction is guided by genuine warmth and patience — residents are known as people, not patients.',
  },
  {
    icon: 'ShieldCheckIcon',
    label: 'Dignity & Respect',
    desc: 'RN-led care plans protect each resident\'s independence and honor their individual choices every day.',
  },
  {
    icon: 'HomeIcon',
    label: 'Family-Style Living',
    desc: 'We intentionally serve up to 16 residents so every person receives truly individualized attention.',
  },
  {
    icon: 'BuildingLibraryIcon',
    label: 'Faith & Community',
    desc: 'Housed in a renovated former convent in partnership with St. Ann Catholic Parish, faith and fellowship are woven into daily life.',
  },
];

export default function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('reveal-visible'); }),
      { threshold: 0.08 }
    );
    el?.querySelectorAll('.reveal-hidden')?.forEach((child) => obs?.observe(child));
    return () => obs?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-10 bg-warm-bg border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal-hidden mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">What We Stand For</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            The values behind every day at Rompa House.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values?.map((v, idx) => (
            <div
              key={idx}
              className="reveal-hidden p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Icon name={v.icon} size={20} className="text-primary group-hover:text-white transition-colors" />
              </div>

              <h4 className="text-base font-bold text-foreground mb-2">{v?.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{v?.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
