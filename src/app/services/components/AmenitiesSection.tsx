'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const amenities = [
{ icon: 'HomeIcon', label: 'Comfortable Private Rooms', desc: 'Thoughtfully designed private rooms in a beautifully renovated historic convent — a real home, not a clinical facility' },
{ icon: 'SparklesIcon', label: 'Nutritious Meals', desc: 'Home-cooked, nutritious meals served daily in a warm, communal dining setting that feels like family' },
{ icon: 'SunIcon', label: 'Outdoor Spaces', desc: 'Peaceful outdoor areas where residents can enjoy fresh air, nature, and a sense of calm and familiarity' },
{ icon: 'MusicalNoteIcon', label: 'Daily Activity Programs', desc: 'Memory-enriching programs, social events, and community activities tailored to each resident\'s abilities and interests' },
{ icon: 'UsersIcon', label: 'Spiritual & Community Programs', desc: 'Faith-centered community events and spiritual programs in partnership with St. Ann Catholic Parish' },
{ icon: 'TruckIcon', label: 'Daily Housekeeping & Laundry', desc: 'Full housekeeping and laundry services so residents can focus on living comfortably and joyfully' }];


const galleryImages = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png",
  alt: 'Bright sunlit common room with soft armchairs and warm wood floors in an assisted living facility'
},
{
  src: "https://images.unsplash.com/photo-1670248549364-0fb3840b86d9",
  alt: 'Lush landscaped garden courtyard with stone pathways and green plants bathed in afternoon sunlight'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_153c054a0-1772146258502.png",
  alt: 'Elegant senior living dining room with fresh seasonal food and warm ambient lighting on white tablecloths'
}];


export default function AmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('reveal-visible');}),
      { threshold: 0.08 }
    );
    el.querySelectorAll('.reveal-hidden').forEach((child) => obs.observe(child));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="amenities" className="mb-20 pt-8 border-t border-border">
      <div className="reveal-hidden mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Life at Rompa House</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          A home designed for living well.
        </h2>
      </div>

      {/* Photo row */}
      <div className="grid grid-cols-3 gap-3 mb-10 reveal-hidden" style={{ transitionDelay: '0.1s' }}>
        {galleryImages.map((img, idx) =>
        <div key={idx} className="aspect-[4/3] overflow-hidden rounded-xl">
            <AppImage
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 33vw, 25vw"
            className={`object-cover hover:scale-105 transition-transform duration-700 parallax-img`}
            style={{ transform: `translateY(0px)` }} />

          </div>
        )}
      </div>

      {/* Feature list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal-hidden" style={{ transitionDelay: '0.2s' }}>
        {amenities.map((a, idx) =>
        <div key={idx} className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
              <Icon name={a.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">{a.label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>);

}