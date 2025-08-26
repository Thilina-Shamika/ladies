'use client';

import React from 'react';

interface EmergencyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const EmergencyImage: React.FC<EmergencyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  style,
  onClick,
  ...props
}) => {
  // Use dangerouslySetInnerHTML to create pure HTML img tag
  const imgHtml = `
    <img 
      src="${src}" 
      alt="${alt}" 
      class="${className}"
      ${width ? `width="${width}"` : ''}
      ${height ? `height="${height}"` : ''}
      style="${style ? Object.entries(style).map(([key, value]) => `${key}: ${value}`).join('; ') : ''}"
      ${onClick ? 'onclick="this.onclick()"' : ''}
      loading="lazy"
    />
  `;

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: imgHtml }}
      onClick={onClick}
      {...props}
    />
  );
};

export default EmergencyImage;
