'use client';
import React, { useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const photos = [
  {
    src: '/images/living-room.jpg',
    alt: 'Cozy main living room at Rompa House',
    caption: 'Main Living Room',
  },
  {
    src: '/images/garden.jpg',
    alt: 'Outdoor garden courtyard at Rompa House',
    caption: 'Garden Courtyard',
  },
  {
    src: '/images/dining.jpg',
    alt: 'Dining room at Rompa House',
    caption: 'Dining Room',
  },
  {
    src: '/images/activity-room.jpg',
    alt: 'Activity room at Rompa House',
    caption: 'Activities Room',
  },
  {
    src: '/images/private-room.jpg',
    alt: 'Private resident room at Rompa House',
    caption: 'Private Room',
  },
  {
    src: '/images/common-area.jpg',
    alt: 'Comfortable shared common area at Rompa House',
    caption: 'Common Area',
  },
];

export default function PhotoGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prevPhoto = useCallback(() => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    );
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % photos.length : null
    );
  }, []);

  return (
    <section id="gallery" className="mb-20 pt-8 border-t border-border">
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">
            Photo Tour
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            See Rompa House for yourself.
          </h2>
        </div>

        <p className="text-sm text-muted-foreground max-w-md">
          A warm, home-like setting designed for comfort, dignity, and daily connection.
        </p>
      </div>

      {/* Premium Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {photos.map((photo, idx) => {
          const featured = idx === 0 || idx === 3;

          return (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              aria-label={`View photo: ${photo.caption}`}
              className={`group relative overflow-hidden rounded-2xl bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-md hover:shadow-xl transition-all duration-300 ${
                featured
                  ? 'col-span-2 md:col-span-3 aspect-[5/3]'
                  : 'col-span-1 md:col-span-3 aspect-[4/3]'
              }`}
            >
              <AppImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover brightness-110 contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg">
                  <Icon name="MagnifyingGlassPlusIcon" size={24} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <span className="text-sm font-bold text-white drop-shadow-md">
                  {photo.caption}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <AppImage
                src={photos[lightboxIdx].src}
                alt={photos[lightboxIdx].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between mt-4 text-white">
              <p className="text-sm text-white/80">
                {photos[lightboxIdx].caption}
              </p>
              <p className="text-xs text-white/50">
                {lightboxIdx + 1} / {photos.length}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="absolute -top-5 -right-5 w-11 h-11 bg-white rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-lg"
              aria-label="Close lightbox"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Previous photo"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next photo"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-5">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`Go to photo ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === lightboxIdx ? 'w-8 bg-white' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
