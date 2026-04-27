import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-bold text-base tracking-tight text-foreground">
                Rompa<span className="font-light"> House</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Licensed Assisted Living Facility<br />Spokane, WA
            </p>
            <p className="text-xs text-muted-foreground">
              In partnership with St. Ann Catholic Parish
            </p>
          </div>

          {/* Our Services */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">Our Services</p>
            <Link href="/services#assisted-living" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Assisted Living</Link>
            <Link href="/services#resident-care" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resident Care</Link>
            <Link href="/services#medication-management" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Medication Management</Link>
            <Link href="/services#24-7-services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">24/7 Special Services</Link>
            <Link href="/services#memory-support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Memory Support</Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">Quick Links</p>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</Link>
            <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admissions</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground">Contact Us</p>
            <a href="tel:+15093815858" className="text-sm text-muted-foreground hover:text-primary transition-colors">(509) 381-5858</a>
            <a href="tel:+15096176945" className="text-sm text-muted-foreground hover:text-primary transition-colors">(509) 617-6945</a>
            <a href="mailto:contact@rompahouse.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">contact@rompahouse.com</a>
            <p className="text-sm text-muted-foreground leading-relaxed">2116 E 1st Ave<br />Spokane, WA 99202</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Rompa House Assisted Living | Spokane, WA · Licensed Assisted Living Facility | State of Washington</p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}