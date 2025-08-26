'use client';

import React, { useState } from 'react';

interface ForceNativeImageProps {
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

const ForceNativeImage: React.FC<ForceNativeImageProps> = ({
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

  // Always use native img tag - no Next.js Image component at all
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
        console.warn('ForceNativeImage failed to load:', src);
        setImageError(true);
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default ForceNativeImage;
