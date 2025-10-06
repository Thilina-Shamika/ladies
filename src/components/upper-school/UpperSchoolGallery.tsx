"use client";
import React, { useState } from "react";
import DirectImage from "@/components/ui/DirectImage";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

interface GalleryImage {
  url: string;
  alt?: string;
  title?: string;
}

export default function UpperSchoolGallery({ gallery }: { gallery: GalleryImage[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const galleryImages = (gallery || []).map(img => ({ src: img.url, alt: img.alt || '', title: img.title || '' }));

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow hover:shadow-xl transition"
            onClick={() => { setPhotoIndex(idx); setIsOpen(true); }}
          >
            <DirectImage
              src={img.url}
              alt={img.alt || ''}
              className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
              width="100%"
              height="100%"
            />
          </button>
        ))}
      </div>
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={galleryImages}
          index={photoIndex}
          on={{ view: ({ index }) => setPhotoIndex(index) }}
        />
      )}
    </div>
  );
} 