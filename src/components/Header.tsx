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
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const navText = scrolled ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-foreground hover:text-primary hover:bg-black/5';
  const logoText = scrolled ? 'text-white' : 'text-foreground';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-dark-bg/95 shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={36} />
            <span className={`font-bold text-lg tracking-tight leading-none transition-colors ${logoText}`}>
              Rompa<span className="font-light"> House</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => (item.dropdown ? handleMouseEnter(item.label) : undefined)}
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                {item.href && !item.dropdown ? (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 flex items-center gap-1 ${navText}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all duration-200 flex items-center gap-1 ${navText}`}
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
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary">
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

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg ${
                scrolled
                  ? 'bg-white text-primary hover:bg-primary hover:text-white'
                  : 'bg-white text-primary hover:bg-primary hover:text-white'
              }`}
            >
              Schedule a Tour
            </Link>
          </div>

          <button
            className={`lg:hidden p-2.5 rounded-full border flex items-center justify-center transition-colors ${
              scrolled
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-white text-primary border-border shadow'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
    {mobileOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl transition-all duration-500"
    onClick={() => setMobileOpen(false)}
  >
    <div
      className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-dark-bg border-l border-white/10 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top */}
      <div className="flex items-center justify-between px-6 pt-7 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <AppLogo size={34} />

          <span className="text-white font-bold text-lg tracking-tight">
            Rompa<span className="font-light"> House</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="w-11 h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center"
        >
          <Icon name="XMarkIcon" size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col px-5 py-5 overflow-y-auto h-[calc(100%-100px)]">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="border-b border-white/10"
          >
            {item.dropdown ? (
              <>
                <button
                  className="w-full flex items-center justify-between py-5 text-white font-semibold text-base"
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}

                  <Icon
                    name="ChevronDownIcon"
                    size={18}
                    className={`transition-transform duration-300 ${
                      mobileExpanded === item.label
                        ? 'rotate-180'
                        : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 overflow-hidden ${
                    mobileExpanded === item.label
                      ? 'grid-rows-[1fr] opacity-100 pb-4'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden flex flex-col gap-1">
                    {item.dropdown.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="px-4 py-3 rounded-2xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="block font-medium">
                          {sub.label}
                        </span>

                        {sub.description && (
                          <span className="block text-xs text-white/40 mt-1">
                            {sub.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Link
                href={item.href!}
                className="flex items-center py-5 text-white font-semibold text-base hover:text-accent transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}

        {/* CTA */}
        <div className="mt-8 pt-2">
          <Link
            href="/contact"
            className="w-full flex items-center justify-center px-6 py-4 bg-white text-primary font-bold uppercase tracking-widest rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Schedule a Tour
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <a
            href="tel:+15093815858"
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-4"
          >
            <Icon name="PhoneIcon" size={16} />
            <span className="text-sm">(509) 381-5858</span>
          </a>

          <a
            href="mailto:contact@rompahouse.com"
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
          >
            <Icon name="EnvelopeIcon" size={16} />
            <span className="text-sm">
              contact@rompahouse.com
            </span>
          </a>
        </div>
      </nav>
    </div>
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
