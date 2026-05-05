import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function CtaBanner() {
  return (
    <section className="py-24 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl min-h-[400px] flex items-center">
          {/* Background image */}
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_10a38da2b-1772157582294.png"
            alt="Bright, warm assisted living common room with comfortable seating, natural light and a peaceful atmosphere"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover" />

          {/* Scrim — dark left to right for white text */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-10 md:px-16 py-16 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-4">Ready to Take the Next Step?</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              Come see what home really feels like.
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              Tour our community, meet our team, and ask every question on your mind — with no pressure, no obligation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-white text-primary text-sm font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-xl min-h-[44px] flex items-center">

                Schedule a Free Tour
              </Link>
              <a
                href="tel:+15093815858"
                className="px-7 py-3.5 bg-white/15 border border-white/30 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white/25 transition-all duration-300 min-h-[44px] flex items-center">

                Call (509) 381-5858
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
