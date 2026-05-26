'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navItems = [
  {
    label: 'Services',
    dropdown: [
      {
        label: 'Assisted Living',
        href: '/services',
        description: 'Personalized daily support',
      },
      {
        label: 'Memory Care',
        href: '/services',
        description: 'Compassionate cognitive support',
      },
    ],
  },
  {
    label: 'About',
    dropdown: [
      {
        label: 'Our Home',
        href: '/about',
        description: 'Learn about Rompa House',
      },
      {
        label: 'Photo Tour',
        href: '/services',
        description: 'Explore our residence',
      },
    ],
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navClasses = scrolled
    ? 'bg-dark-bg/95 backdrop-blur-xl shadow-xl py-3'
    : 'bg-transparent py-5';

  const textClasses = scrolled ? 'text-white' : 'text-white';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navClasses}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
            >
              <AppLogo size={38} />

              <span
                className={`font-bold text-xl tracking-tight transition-colors duration-300 ${textClasses}`}
              >
                Rompa House
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${textClasses}`}
                      >
                        {item.label}

                        <Icon
                          name="ChevronDownIcon"
                          size={14}
                        />
                      </button>

                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="w-72 rounded-3xl border border-white/10 bg-dark-bg/95 backdrop-blur-2xl shadow-2xl overflow-hidden p-3">
                          {item.dropdown.map((sub, idx) => (
                            <Link
                              key={idx}
                              href={sub.href}
                              className="block rounded-2xl p-4 hover:bg-white/5 transition-all duration-300"
                            >
                              <div className="text-white font-semibold">
                                {sub.label}
                              </div>

                              <div className="text-sm text-white/55 mt-1">
                                {sub.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`text-sm font-semibold tracking-wide uppercase transition-colors duration-300 hover:text-accent ${textClasses}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className="px-7 py-4 rounded-full bg-white text-primary font-bold uppercase tracking-widest text-sm shadow-[0_15px_45px_rgba(0,0,0,0.2)] hover:bg-primary hover:text-white transition-all duration-300"
              >
                Schedule a Tour
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transition-colors duration-300 ${textClasses}`}
              aria-label="Open Menu"
            >
              <Icon
                name="Bars3Icon"
                size={22}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xl transition-all duration-500"
          onClick={() => setMobileOpen(false)}
        >
          <div
            ref={navRef}
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
                  Rompa House
                </span>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="w-11 h-11 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center"
              >
                <Icon
                  name="XMarkIcon"
                  size={20}
                />
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
                            mobileExpanded === item.label
                              ? null
                              : item.label
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
                            >
                              <span className="block font-medium">
                                {sub.label}
                              </span>

                              <span className="block text-xs text-white/40 mt-1">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="flex items-center py-5 text-white font-semibold text-base hover:text-accent transition-colors"
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
                  <Icon
                    name="PhoneIcon"
                    size={16}
                  />

                  <span className="text-sm">
                    (509) 381-5858
                  </span>
                </a>

                <a
                  href="mailto:contact@rompahouse.com"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Icon
                    name="EnvelopeIcon"
                    size={16}
                  />

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
  );
}
