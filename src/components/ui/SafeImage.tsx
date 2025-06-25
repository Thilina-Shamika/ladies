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

  // For external images (like WordPress), use regular img tag to avoid 402 errors
  const isExternalImage = src.includes('kal.cse.mybluehost.me') || src.includes('ladies.local');

  if (useFallback || isExternalImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onError={() => setUseFallback(true)}
        {...props}
      />
    );
  }

  // For local images, try Next.js Image optimization
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
      onError={() => setUseFallback(true)}
      {...props}
    />
  );
};

export default SafeImage; 