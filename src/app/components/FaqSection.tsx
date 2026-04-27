'use client';
import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'Is Rompa House licensed?',
    a: 'Yes. Rompa House is a fully licensed assisted living facility in Spokane, WA, operating under Washington State regulations.',
  },
  {
    q: 'Is there a Registered Nurse on site?',
    a: 'Yes. Our facility is led and overseen by a Registered Nurse who is involved in every resident\'s care plan and is present day-to-day to ensure clinical excellence is always paired with genuine human warmth.',
  },
  {
    q: 'What services are included?',
    a: 'We provide personal care assistance, medication management, nutritious meals, daily activities, housekeeping, laundry, and 24/7 support. Every resident receives a personalized care plan tailored to their unique needs.',
  },
  {
    q: 'Can family members visit?',
    a: 'Absolutely. We encourage family involvement and welcome visits from loved ones. Family connection is an important part of every resident\'s wellbeing at Rompa House.',
  },
  {
    q: 'How many residents do you serve?',
    a: 'Rompa House serves up to 16 residents. Our intentionally small size means every person receives truly individualized care — no one is ever just a room number.',
  },
  {
    q: 'Do you offer memory care?',
    a: 'Yes. We provide specialized memory support for adults living with Alzheimer\'s, dementia, or other memory-related conditions, with compassionate, structured care in a safe, home-like environment.',
  },
  {
    q: 'Is Rompa House affiliated with a church?',
    a: 'Yes. Rompa House is located in a beautifully renovated former convent in partnership with St. Ann Catholic Parish in East Central Spokane, bringing faith, dignity, and warmth to everything we do.',
  },
  {
    q: 'How do I start the admissions process?',
    a: 'Call us at (509) 381-5858 or (509) 617-6945, or fill out our contact form. Our team will schedule a free tour, answer your questions, and walk you through every step of the process.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('reveal-visible');
        });
      },
      { threshold: 0.1 }
    );
    el?.querySelectorAll('.reveal-hidden')?.forEach((child) => obs?.observe(child));
    return () => obs?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-10 bg-warm-bg border-t border-border" id="faq">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        {/* Left */}
        <div className="lg:col-span-4 reveal-hidden">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            We have<br />answers.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            Choosing the right care home for a loved one comes with many questions. Here are the ones we hear most often — answered honestly. We're always happy to talk by phone too.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-accent transition-colors min-h-[44px]"
          >
            Ask a Different Question
            <Icon name="ArrowRightIcon" size={16} />
          </a>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-8 divide-y divide-border reveal-hidden" style={{ transitionDelay: '0.15s' }}>
          {faqs?.map((faq, idx) => (
            <div key={idx} className="py-5">
              <button
                className="w-full flex items-center justify-between gap-4 text-left group min-h-[44px]"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span className={`text-base font-semibold transition-colors ${openIdx === idx ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                  {faq?.q}
                </span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${openIdx === idx ? 'bg-primary border-primary text-white' : 'border-border text-muted-foreground group-hover:border-primary group-hover:text-primary'}`}>
                  <Icon name={openIdx === idx ? 'MinusIcon' : 'PlusIcon'} size={14} />
                </span>
              </button>
              <div className={`faq-content ${openIdx === idx ? 'open' : ''}`}>
                <p className="text-sm text-muted-foreground leading-relaxed pt-4 pb-2 max-w-2xl">{faq?.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}