'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  style,
  ...props
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if it's an external image (WordPress or other external sources)
  const isExternalImage = src.includes('kal.cse.mybluehost.me') || 
                         src.includes('ladies.local') || 
                         src.includes('http') ||
                         src.startsWith('//') ||
                         src.includes('vercel.app') ||
                         src.includes('vercel.com');

  // For external images, always use regular img tag to bypass Vercel optimization
  if (isExternalImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={(e) => {
          console.warn('Image failed to load:', src);
          setImageError(true);
        }}
        onLoad={() => setImageError(false)}
        {...props}
      />
    );
  }

  // For local images, try Next.js Image optimization first, then fallback
  if (useFallback || imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={(e) => {
          console.warn('Fallback image also failed to load:', src);
        }}
        {...props}
      />
    );
  }

  // Try Next.js Image optimization for local images
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      style={style}
      onError={() => {
        console.warn('Next.js Image optimization failed, falling back to regular img:', src);
        setUseFallback(true);
      }}
      unoptimized={isExternalImage} // Disable optimization for external images
      {...props}
    />
  );
};

export default SafeImage; 