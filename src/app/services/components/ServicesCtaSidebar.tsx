'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const quickLinks = [
  { label: 'Assisted Living', href: '#assisted-living' },
  { label: 'Resident Care', href: '#resident-care' },
  { label: 'Medication Management', href: '#medication-management' },
  { label: '24/7 Special Services', href: '#24-7-services' },
  { label: 'Memory Support', href: '#memory-support' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Our Team', href: '#staff' },
  { label: 'Photo Gallery', href: '#gallery' },
];

export default function ServicesCtaSidebar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${isSticky ? 'sticky top-24' : ''} transition-all duration-300`}>
      {/* CTA Card */}
      <div className="bg-primary rounded-2xl p-7 text-primary-foreground mb-5 shadow-xl">
        <h3 className="text-lg font-bold mb-2">Ready to visit?</h3>
        <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6">
          Schedule a personal tour and experience Rompa House for yourself — no obligation.
        </p>
        <Link
          href="/contact"
          className="block w-full text-center px-5 py-3 bg-white text-primary text-sm font-bold rounded-xl hover:bg-secondary transition-colors min-h-[44px] flex items-center justify-center"
        >
          Schedule a Tour
        </Link>
        <Link
          href="/contact"
          className="block w-full text-center px-5 py-3 mt-3 border border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors min-h-[44px] flex items-center justify-center"
        >
          Send an Inquiry
        </Link>
      </div>
      {/* Quick Contact */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Contact</p>
        <a href="tel:+15093815858" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors mb-3 min-h-[44px]">
          <Icon name="PhoneIcon" size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold">(509) 381-5858</span>
        </a>
        <a href="tel:+15096176945" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors mb-3 min-h-[44px]">
          <Icon name="PhoneIcon" size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold">(509) 617-6945</span>
        </a>
        <a href="mailto:contact@rompahouse.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors min-h-[44px]">
          <Icon name="EnvelopeIcon" size={16} className="text-primary flex-shrink-0" />
          <span className="text-sm font-semibold">contact@rompahouse.com</span>
        </a>
      </div>
      {/* Quick nav */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">On This Page</p>
        <nav className="flex flex-col gap-1">
          {quickLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 min-h-[44px] group"
            >
              <Icon name="ChevronRightIcon" size={12} className="text-border group-hover:text-primary transition-colors" />
              {link?.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}