'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const faqs = [
  {
    q: 'How do I schedule a tour?',
    a: 'Call us at (509) 381-5858 or (509) 617-6945, or fill out our contact form. We\'ll schedule a free tour of our home, answer your questions, and talk through whether Rompa House is the right fit for your loved one\'s care needs.',
  },
  {
    q: 'How long does the admissions process take?',
    a: 'Once we receive your inquiry, our team responds promptly. The process includes a free tour, a care assessment, and developing a personalized care plan. We can move at whatever pace works best for your family.',
  },
  {
    q: 'How many residents does Rompa House serve?',
    a: 'We serve up to 16 residents. Our intentionally small size means every person receives truly individualized care in a setting that feels like home — never a facility.',
  },
  {
    q: 'Can family members visit anytime?',
    a: 'Absolutely. We encourage family involvement and welcome visits from loved ones. Family connection is an important part of every resident\'s wellbeing and quality of life at Rompa House.',
  },
  {
    q: 'Is Rompa House affiliated with a church?',
    a: 'Yes. Rompa House is located in a beautifully renovated former convent in East Central Spokane, in partnership with St. Ann Catholic Parish. We bring faith, dignity, and warmth to everything we do.',
  },
];

export default function ContactFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 md:px-10 bg-warm-bg border-t border-border" id="faq">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-14">
        {/* Left */}
        <div className="lg:col-span-4">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Before You Call</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-5 leading-tight">
            Quick answers<br />to common questions.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Still have questions after reading through? Our admissions team is always happy to talk — no pressure, no obligation.
          </p>
          <a
            href="tel:+15093815858"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-accent transition-colors min-h-[44px]"
          >
            <Icon name="PhoneIcon" size={15} />
            Call (509) 381-5858
          </a>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-8 divide-y divide-border">
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
      {/* Bottom CTA strip */}
      <div className="max-w-7xl mx-auto mt-16 bg-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Ready to take the next step?</h3>
          <p className="text-white/75 text-sm">Schedule a tour or send an inquiry — our team responds within 24 hours.</p>
        </div>
        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-primary text-sm font-bold rounded-full hover:bg-secondary transition-colors min-h-[44px] flex items-center"
          >
            Schedule a Tour
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 bg-white/15 border border-white/30 text-white text-sm font-bold rounded-full hover:bg-white/25 transition-colors min-h-[44px] flex items-center"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}