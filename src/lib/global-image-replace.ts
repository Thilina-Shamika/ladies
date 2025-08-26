import React from 'react';

/**
 * Global Image Replacement System
 * Completely bypasses Vercel's image optimization
 */

// Override Next.js Image component globally
if (typeof window !== 'undefined') {
  // Replace Next.js Image with native img tag
  const originalImage = (window as any).__NEXT_IMAGE_IMPORTED__;
  if (originalImage) {
    (window as any).__NEXT_IMAGE_IMPORTED__ = function Image(props: any) {
      const { src, alt, className, width, height, style, ...rest } = props;
      return React.createElement('img', {
        src,
        alt,
        className,
        width,
        height,
        style,
        loading: 'lazy',
        ...rest
      });
    };
  }
}

// Utility to force native img tags
export function createNativeImage(src: string, alt: string, options: any = {}) {
  return {
    type: 'img',
    props: {
      src,
      alt,
      className: options.className || '',
      width: options.width,
      height: options.height,
      style: options.style,
      loading: options.loading || 'lazy',
      ...options
    }
  };
}

// Force all images to be native
export function forceNativeImages() {
  if (typeof window !== 'undefined') {
    // Override any remaining Next.js Image components
    const images = document.querySelectorAll('img[data-nimg]');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && src.includes('vercel')) {
        // Replace with direct URL
        const originalSrc = img.getAttribute('data-src') || src;
        img.setAttribute('src', originalSrc);
        img.removeAttribute('data-nimg');
      }
    });
  }
}
