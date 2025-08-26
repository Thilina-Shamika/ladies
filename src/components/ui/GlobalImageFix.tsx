'use client';

import { useEffect } from 'react';

export default function GlobalImageFix() {
  useEffect(() => {
    // Function to fix any remaining Next.js Image components
    const fixNextImages = () => {
      // Find all Next.js Image components
      const nextImages = document.querySelectorAll('img[data-nimg]');
      
      nextImages.forEach((img) => {
        const src = img.getAttribute('src');
        if (src && src.includes('_next/image')) {
          // Extract original URL from the optimized URL
          try {
            const url = new URL(src);
            const originalUrl = url.searchParams.get('url');
            if (originalUrl) {
              // Replace with original URL
              img.setAttribute('src', originalUrl);
              img.removeAttribute('data-nimg');
              img.removeAttribute('data-nimg-intrinsic');
              img.removeAttribute('data-nimg-fill');
            }
          } catch (error) {
            console.warn('Failed to parse image URL:', src);
          }
        }
      });
    };

    // Run immediately
    fixNextImages();

    // Run periodically to catch dynamically added images
    const interval = setInterval(fixNextImages, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}
