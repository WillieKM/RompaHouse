'use client';
import React, { useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const photos = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_16e57123c-1772203478362.png",
  alt: 'Warm sunlit common room with soft armchairs and natural light in an assisted living facility',
  caption: 'Main Common Room'
},
{
  src: "https://images.unsplash.com/photo-1666510104271-5b9d94f58a97",
  alt: 'Serene garden courtyard with lush green plants and stone walking paths bathed in afternoon sunlight',
  caption: 'Garden Courtyard'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_153c054a0-1772146258502.png",
  alt: 'Elegant senior dining room with white tablecloths fresh food and warm ambient lighting',
  caption: 'Dining Room'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1cfce91-1768635299802.png",
  alt: 'Bright wellness studio with senior residents doing gentle yoga on mats with large windows',
  caption: 'Wellness Studio'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_11b6245c1-1774555378321.png",
  alt: 'Senior residents laughing and playing cards together in a bright cheerful activity room',
  caption: 'Activities Room'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_188caa69b-1767039245504.png",
  alt: 'Modern rehabilitation gym with senior resident and therapist doing walking exercises',
  caption: 'Rehabilitation Center'
}];


export default function PhotoGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto = useCallback(() => {
    setLightboxIdx((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
  }, []);
  const nextPhoto = useCallback(() => {
    setLightboxIdx((prev) => prev !== null ? (prev + 1) % photos.length : null);
  }, []);

  return (
    <section id="gallery" className="mb-20 pt-8 border-t border-border">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">Photo Tour</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          See it for yourself.
        </h2>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, idx) =>
        <button
          key={idx}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => openLightbox(idx)}
          aria-label={`View photo: ${photo.caption}`}>

            <AppImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500" />

            <div className="absolute inset-0 bg-dark-bg/0 group-hover:bg-dark-bg/30 transition-colors duration-300 flex items-center justify-center">
              <Icon name="MagnifyingGlassPlusIcon" size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-bg/60 to-transparent">
              <span className="text-xs font-semibold text-white">{photo.caption}</span>
            </div>
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null &&
      <div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Photo lightbox">

          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <AppImage
              src={photos[lightboxIdx].src}
              alt={photos[lightboxIdx].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              priority />

            </div>
            <p className="text-center text-white/70 text-sm mt-3">{photos[lightboxIdx].caption}</p>

            {/* Controls */}
            <button
            onClick={closeLightbox}
            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-lg"
            aria-label="Close lightbox">

              <Icon name="XMarkIcon" size={18} />
            </button>
            <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Previous photo">

              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Next photo">

              <Icon name="ChevronRightIcon" size={18} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {photos.map((_, idx) =>
            <button
              key={idx}
              onClick={() => setLightboxIdx(idx)}
              aria-label={`Go to photo ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === lightboxIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />

            )}
            </div>
          </div>
        </div>
      }
    </section>);

}