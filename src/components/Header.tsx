'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Assisted Living', href: '/services#assisted-living', description: 'Personalized daily support' },
      { label: 'Memory Support', href: '/services#memory-support', description: 'Alzheimer\'s & dementia care' },
      { label: 'Medication Management', href: '/services#medication-management', description: 'RN-led daily administration' },
      { label: '24/7 Special Services', href: '/services#24-7-services', description: 'Around-the-clock care' },
    ],
  },
  {
    label: 'About',
    href: '/services#amenities',
    dropdown: [
      { label: 'Our Story', href: '/services#amenities', description: 'Family-led, RN-overseen care' },
      { label: 'Our Facility', href: '/services#gallery', description: 'A renovated historic convent' },
      { label: 'Our Team', href: '/services#staff', description: 'Compassionate caregivers' },
      { label: 'Admissions', href: '/contact', description: 'How to get started' },
    ],
  },
  {
    label: 'FAQ',
    href: '/#faq',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      {/* FIXED HEADER */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark-bg/95 shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={36} />
            <span className="font-bold text-lg tracking-tight text-white">
              Rompa<span className="font-light"> House</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1">
                    {item.label}
                    {item.dropdown && (
                      <Icon
                        name="ChevronDownIcon"
                        size={12}
                        className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                )}

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
                      {item.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="flex flex-col px-5 py-3.5 hover:bg-primary/5 transition-colors border-b border-border last:border-0"
                        >
                          <span className="text-sm font-semibold text-foreground hover:text-primary">
                            {sub.label}
                          </span>
                          {sub.description && (
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-white text-primary text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
            >
              Schedule a Tour
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden p-2.5 bg-white/10 rounded-full text-white border border-white/20 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-dark-bg/95" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 left-0 w-full pt-24 px-6 pb-10">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href || '#'}
                  className="block px-4 py-4 text-white border-b border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
