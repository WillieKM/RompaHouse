'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';


const services = [
{
  id: 'assisted-living',
  title: 'Assisted Living',
  location: 'All Residences',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_128eb3087-1772198538478.png",
  imageAlt: 'Warm caregiver assisting elderly woman getting dressed in a bright private suite with morning sunlight',
  desc: 'Personalized daily support for adults — help with bathing, dressing, meals, mobility, and routines in a relaxed, home-like environment where residents feel comfortable and respected, not managed.',
  tags: ['Personal Care', 'Mobility Support', 'Daily Routines']
},
{
  id: 'resident-care',
  title: 'Resident Care',
  location: 'RN-Overseen',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png",
  imageAlt: 'Registered nurse reviewing care plan with elderly resident in a bright comfortable room',
  desc: 'Every resident receives a personalized care plan developed and overseen by our Registered Nurse, ensuring the highest standard of individualized attention.',
  tags: ['Individualized Care Plans', 'RN Oversight', 'Regular Reviews']
},
{
  id: 'medication-management',
  title: 'Medication Management',
  location: 'Daily Administration',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc225ff9-1772146890919.png",
  imageAlt: 'Caregiver carefully preparing medications for a senior resident with attention to detail',
  desc: 'Our RN-led team handles safe, accurate medication administration and monitoring every single day — giving families complete peace of mind.',
  tags: ['Safe Administration', 'Daily Monitoring', 'RN-Led']
},
{
  id: '24-7-services',
  title: '24/7 Special Services',
  location: 'Around the Clock',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17513afee-1776428709880.png",
  imageAlt: 'Caregiver attentively assisting a senior resident in a warm well-lit room at night',
  desc: 'Whether it\'s a midnight need or an early morning request, our team is always on call. Rompa House provides around-the-clock care and emergency response.',
  tags: ['24/7 On-Call', 'Emergency Response', 'On-Site RN']
},
{
  id: 'memory-support',
  title: 'Memory Support',
  location: 'Specialized Care',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18c828df4-1772237174497.png",
  imageAlt: 'Caregiver gently holding hands with an elderly resident in a bright softly lit memory care room',
  desc: 'Specialized, compassionate care for adults living with Alzheimer\'s, dementia, or other memory-related conditions — in a safe, familiar, home-like environment.',
  tags: ['Alzheimer\'s Care', 'Dementia Support', 'Structured Routines']
}];


export default function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const switchService = (idx: number) => {
    if (idx === activeIdx) return;
    setImageOpacity(0);
    setTimeout(() => {
      setActiveIdx(idx);
      setImageOpacity(1);
    }, 300);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal-hidden').forEach((child) => obs.observe(child));
    return () => obs.disconnect();
  }, []);

  const active = services[activeIdx];

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-10 max-w-7xl mx-auto" id="services">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-hidden">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Care tailored to<br />every individual.
          </h2>
        </div>
        <p className="text-base text-muted-foreground max-w-sm leading-relaxed">
          From personalized assisted living to specialized memory support — every service is designed around the whole person, delivered with dignity and compassion.
        </p>
      </div>

      {/* Interactive Switcher */}
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left: Service List */}
        <div className="lg:col-span-4 space-y-1 reveal-hidden">
          {services.map((svc, idx) =>
          <button
            key={svc.id}
            onClick={() => switchService(idx)}
            className={`w-full text-left group cursor-pointer service-tab transition-all duration-300 border-l-2 pl-5 py-4 pr-4 rounded-r-xl ${
            idx === activeIdx ?
            'active-tab border-primary bg-secondary' : 'border-transparent opacity-60 hover:opacity-90 hover:border-border hover:bg-muted/50'}`
            }>

              <h4 className={`text-base font-semibold transition-colors ${idx === activeIdx ? 'text-primary' : 'text-foreground'}`}>
                {svc.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">{svc.location}</p>
            </button>
          )}
        </div>

        {/* Right: Service Display */}
        <div className="lg:col-span-8 reveal-hidden" style={{ transitionDelay: '0.15s' }}>
          <div
            className="aspect-[16/10] card-rounded overflow-hidden bg-muted mb-8 shadow-xl"
            style={{ opacity: imageOpacity, transition: 'opacity 0.3s ease' }}>

            <AppImage
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" />

          </div>

          <div style={{ opacity: imageOpacity, transition: 'opacity 0.3s ease' }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">{active.title}</h3>
              <a
                href={`/services#${active.id}`}
                className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors">

                Learn More →
              </a>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">{active.desc}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) =>
              <span key={tag} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full border border-border">
                  {tag}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}