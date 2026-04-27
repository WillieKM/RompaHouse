'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  name: 'Margaret Sullivan',
  role: 'Daughter of Resident',
  location: 'Spokane, WA',
  quote: 'Visionary care with genuine warmth.',
  body: 'Moving my mother here was the hardest decision we ever made as a family — and the best. The staff remembered her birthday, her favorite music, and made her feel like she belonged. She\'s happier now than she\'s been in years.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1658b37dd-1763299021458.png",
  imageAlt: 'Smiling middle-aged woman with short brown hair against a light neutral background',
  rotation: '-rotate-6',
  position: 'absolute left-0 top-1/2 -translate-y-1/2'
},
{
  name: 'James Whitfield',
  role: 'Son of Resident',
  location: 'Seattle, WA',
  quote: 'Peace of mind, every single day.',
  body: 'I live three states away and the team here keeps me updated with photos and calls. My father has made genuine friends here. The activities program is extraordinary — he paints twice a week now.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a5ca983-1763300171126.png",
  imageAlt: 'Professional man with glasses and grey hair smiling confidently against a white background',
  rotation: 'rotate-8',
  position: 'absolute left-20 top-1/3 -translate-y-1/2'
},
{
  name: 'Dorothy Chen',
  role: 'Resident, 3 years',
  location: 'Spokane, WA',
  quote: 'This is truly my home.',
  body: 'I was nervous about leaving my house of 40 years. But from the first week, the staff and other residents made me feel so welcome. The garden here reminds me of my own backyard.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1efdba370-1772807069382.png",
  imageAlt: 'Elderly Asian woman with warm smile and silver hair in a bright indoor setting',
  rotation: '-rotate-4',
  position: 'absolute right-20 top-1/4 -translate-y-1/2'
},
{
  name: 'Robert Okafor',
  role: 'Son of Resident',
  location: 'San Francisco, CA',
  quote: 'The staff genuinely care.',
  body: 'What sets Rompa House apart isn\'t the beautiful facilities — it\'s the people. Every nurse, every aide, every activity coordinator treats residents like family. That\'s rare and incredibly valuable.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_174db4fd4-1772095787854.png",
  imageAlt: 'Smiling African American man in his forties with a warm expression against a light grey background',
  rotation: 'rotate-6',
  position: 'absolute right-0 top-1/2 -translate-y-1/2'
}];


// Center testimonial (featured)
const featured = testimonials?.[0];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('reveal-visible');
        });
      },
      { threshold: 0.1 }
    );
    el?.querySelectorAll('.reveal-hidden')?.forEach((child) => obs?.observe(child));
    return () => obs?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-10 bg-warm-bg" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal-hidden">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Voices From Our Community</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            What families and residents say.
          </h2>
        </div>

        {/* Desktop: Overlapping portrait layout */}
        <div className="hidden md:block relative h-[580px] max-w-5xl mx-auto reveal-hidden" style={{ transitionDelay: '0.2s' }}>
          {/* Side portrait cards */}
          {testimonials?.map((t, idx) =>
          <div
            key={idx}
            className={`${t?.position} ${t?.rotation} w-44 h-60 card-rounded overflow-hidden shadow-xl opacity-70 hover:opacity-100 transition-opacity duration-300`}>

              <AppImage
              src={t?.image}
              alt={t?.imageAlt}
              fill
              sizes="176px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />

            </div>
          )}

          {/* Center featured card */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-md">
            <div className="bg-card p-10 card-rounded shadow-2xl text-center border border-border">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <AppImage
                  src={featured?.image}
                  alt={featured?.imageAlt}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full" />

              </div>
              <h4 className="text-lg font-bold text-foreground mb-0.5">{featured?.name}</h4>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">{featured?.role} · {featured?.location}</p>
              <p className="text-2xl font-bold text-muted-foreground italic mb-5">"</p>
              <p className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">{featured?.quote}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{featured?.body}</p>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden flex flex-col gap-6">
          {testimonials?.map((t, idx) =>
          <div key={idx} className="bg-card p-8 card-rounded shadow-lg border border-border reveal-hidden" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage
                  src={t?.image}
                  alt={t?.imageAlt}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full" />

                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">{t?.name}</h4>
                  <p className="text-xs text-muted-foreground">{t?.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t?.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}