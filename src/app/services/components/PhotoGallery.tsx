'use client';

import React, { useCallback, useMemo, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const photos = [
  {
    src: '/rompa-living-area.jpeg',
    alt: 'Living area at Rompa House',
    caption: 'Living Area',
    category: 'Living Spaces',
  },
  {
    src: '/rompa-dining.jpeg',
    alt: 'Dining room at Rompa House',
    caption: 'Dining Room',
    category: 'Dining',
  },
  {
    src: '/rompa-dining-2.jpeg',
    alt: 'Second dining room view at Rompa House',
    caption: 'Dining Room',
    category: 'Dining',
  },
  {
    src: '/rompa-kitchen-1.jpeg',
    alt: 'Kitchen at Rompa House',
    caption: 'Kitchen',
    category: 'Dining',
  },
  {
    src: '/rompa-kitchen-2.jpeg',
    alt: 'Second kitchen view at Rompa House',
    caption: 'Kitchen',
    category: 'Dining',
  },
  {
    src: '/rompa-bedroom.jpeg',
    alt: 'Bedroom at Rompa House',
    caption: 'Bedroom',
    category: 'Rooms',
  },
  {
    src: '/rompa-bedroom-2.jpeg',
    alt: 'Second bedroom view at Rompa House',
    caption: 'Bedroom',
    category: 'Rooms',
  },
  {
    src: '/rompa-entrance.jpeg',
    alt: 'Entrance at Rompa House',
    caption: 'Entrance',
    category: 'Exterior',
  },
  {
    src: '/rompa-hallway.jpeg',
    alt: 'Hallway at Rompa House',
    caption: 'Hallway',
    category: 'Living Spaces',
  },
  {
    src: '/rompa-hallway-2.jpeg',
    alt: 'Second hallway view at Rompa House',
    caption: 'Hallway',
    category: 'Living Spaces',
  },
];

const categories = ['All', 'Living Spaces', 'Dining', 'Rooms', 'Exterior'];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return photos;
    return photos.filter((photo) => photo.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  return (
    <section id="gallery" className="mb-24 pt-10 border-t border-border">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-3">
            Photo Tour
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            See Rompa House for yourself.
          </h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
          Explore our warm, home-like spaces designed for comfort, dignity, and daily connection.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setLightboxIdx(null);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-primary border border-border hover:bg-secondary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {filteredPhotos.map((photo, idx) => {
          const featured = idx === 0 || idx === 2 || idx === 5;

          return (
            <button
              key={`${photo.src}-${idx}`}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`View photo: ${photo.caption}`}
              className={`group relative overflow-hidden rounded-2xl bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-md hover:shadow-2xl transition-all duration-300 ${
                featured
                  ? 'col-span-2 md:col-span-3 aspect-[5/3]'
                  : 'col-span-1 md:col-span-2 aspect-[4/3]'
              }`}
            >
              <AppImage
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover brightness-110 contrast-105 group-hover:scale-105 transition-transform duration-500"
              />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow">
                  {photo.category}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-xl">
                  <Icon name="MagnifyingGlassPlusIcon" size={24} />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                <span className="text-base font-bold text-white drop-shadow-md">
                  <p className="absolute bottom-4 left-4 text-white text-sm font-semibold tracking-wide">
  {photo.caption}
</p>
                  {photo.caption}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {lightboxIdx !== null && filteredPhotos[lightboxIdx] && (
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
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl">
              <AppImage
                src={filteredPhotos[lightboxIdx].src}
                alt={filteredPhotos[lightboxIdx].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between mt-4 text-white">
              <div>
                <p className="text-base font-bold">
                  {filteredPhotos[lightboxIdx].caption}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
                  {filteredPhotos[lightboxIdx].category}
                </p>
              </div>
              <p className="text-xs text-white/50">
                {lightboxIdx + 1} / {filteredPhotos.length}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-5 -right-5 w-11 h-11 bg-white rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-lg"
              aria-label="Close lightbox"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>

            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Previous photo"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Next photo"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
