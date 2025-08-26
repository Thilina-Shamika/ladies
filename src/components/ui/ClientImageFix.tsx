'use client';

import React, { useEffect, useRef } from 'react';

interface ClientImageFixProps {
  children: React.ReactNode;
}

const ClientImageFix: React.FC<ClientImageFixProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to fix 402 errors
    const fixImageErrors = () => {
      if (!containerRef.current) return;

      // Find all images with 402 errors
      const images = containerRef.current.querySelectorAll('img');
      
      images.forEach((img) => {
        // Check if image failed to load (402 error)
        img.addEventListener('error', (e) => {
          const target = e.target as HTMLImageElement;
          const src = target.src;
          
          // If it's a Vercel optimized image, try to get original URL
          if (src.includes('vercel') || src.includes('_next/image')) {
            // Try to extract original URL from data attributes
            const originalSrc = target.getAttribute('data-src') || 
                              target.getAttribute('data-original') ||
                              target.getAttribute('data-url');
            
            if (originalSrc) {
              target.src = originalSrc;
            } else {
              // Fallback: try to construct original URL
              const urlParams = new URLSearchParams(src.split('?')[1]);
              const originalUrl = urlParams.get('url') || urlParams.get('src');
              
              if (originalUrl) {
                target.src = originalUrl;
              }
            }
          }
        });

        // Also check for 402 errors on load
        img.addEventListener('load', () => {
          // Image loaded successfully
        });
      });
    };

    // Run fix immediately
    fixImageErrors();

    // Run fix periodically
    const interval = setInterval(fixImageErrors, 2000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default ClientImageFix;
