'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageType {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface ITGalleryProps {
  images: ImageType[];
}

export default function ITGallery({ images }: ITGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  return (
    <div className="w-full">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[16/9]">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt || 'Selected gallery image'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 