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
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'nav-scrolled py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 group">
            <AppLogo size={36} />
            <span className="font-bold text-lg tracking-tight text-white leading-none">
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
                    className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-1"
                  >
                    {item.label}
                    {item.dropdown && (
                      <Icon
                        name="ChevronDownIcon"
                        size={12}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
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
                    <div className="glass-card rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                      {item.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          className="flex flex-col px-5 py-3.5 hover:bg-primary/5 transition-colors group border-b border-border/50 last:border-0"
                        >
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{sub.label}</span>
                          {sub.description && (
                            <span className="text-xs text-muted-foreground mt-0.5">{sub.description}</span>
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

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2.5 bg-white/15 backdrop-blur-md rounded-full text-white border border-white/20 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-md bg-dark-bg/95"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-full pt-24 px-6 pb-10 overflow-y-auto max-h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-4 text-white font-semibold text-base border-b border-white/10 min-h-[44px]"
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <Icon
                          name="ChevronDownIcon"
                          size={16}
                          className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 py-2 flex flex-col gap-1">
                          {item.dropdown.map((sub, idx) => (
                            <Link
                              key={idx}
                              href={sub.href}
                              className="py-3 px-4 text-white/70 text-sm hover:text-white transition-colors min-h-[44px] flex items-center"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="block px-4 py-4 text-white font-semibold text-base border-b border-white/10 min-h-[44px] flex items-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-4 bg-primary text-white font-bold rounded-full text-sm min-h-[44px] flex items-center justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Schedule a Tour
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}