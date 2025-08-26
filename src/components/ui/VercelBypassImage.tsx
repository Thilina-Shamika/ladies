'use client';

import React, { useState } from 'react';

interface VercelBypassImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fill?: boolean;
}

const VercelBypassImage: React.FC<VercelBypassImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  style,
  onClick,
  loading = 'lazy',
  priority = false,
  fill = false,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Force bypass for all external images to avoid 402 errors
  const isExternalImage = src.includes('kal.cse.mybluehost.me') || 
                         src.includes('ladies.local') || 
                         src.includes('http') ||
                         src.startsWith('//') ||
                         src.includes('vercel.app') ||
                         src.includes('vercel.com');

  // Always use native img tag for external images to bypass Vercel
  if (isExternalImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        style={style}
        loading={priority ? 'eager' : loading}
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.warn('VercelBypassImage failed to load:', src);
          setImageError(true);
        }}
        onClick={onClick}
        {...props}
      />
    );
  }

  // For local images, show loading state
  if (!imageLoaded && !imageError) {
    return (
      <div 
        className={`${className} bg-gray-200 animate-pulse`}
        style={{
          width: width || '100%',
          height: height || '200px',
          ...style
        }}
        {...props}
      />
    );
  }

  // For local images, show error state
  if (imageError) {
    return (
      <div 
        className={`${className} bg-gray-100 flex items-center justify-center text-gray-500 text-sm`}
        style={{
          width: width || '100%',
          height: height || '200px',
          ...style
        }}
        {...props}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  // For local images, use regular img tag as fallback
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      loading={priority ? 'eager' : loading}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
      onClick={onClick}
      {...props}
    />
  );
};

export default VercelBypassImage;
