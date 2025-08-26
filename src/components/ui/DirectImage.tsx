'use client';

import React, { useState } from 'react';

interface DirectImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

const DirectImage: React.FC<DirectImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  style,
  onClick,
  loading = 'lazy',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle image loading states
  const handleLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleError = () => {
    console.warn('DirectImage failed to load:', src);
    setImageError(true);
    setImageLoaded(false);
  };

  // Show loading placeholder
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

  // Show error placeholder
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

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={style}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
      {...props}
    />
  );
};

export default DirectImage;
