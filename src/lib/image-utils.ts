/**
 * Utility functions for handling images and bypassing Vercel's image optimization
 */

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

/**
 * Check if an image URL is external (not from the same domain)
 */
export function isExternalImage(src: string): boolean {
  if (!src) return false;
  
  // Check for common external patterns
  const externalPatterns = [
    'kal.cse.mybluehost.me',
    'ladies.local',
    'http://',
    'https://',
    '//'
  ];
  
  return externalPatterns.some(pattern => src.includes(pattern));
}

/**
 * Get the appropriate image component based on the image source
 */
export function getImageComponent(src: string): 'direct' | 'safe' | 'next' {
  if (isExternalImage(src)) {
    return 'direct'; // Use DirectImage for external images
  }
  
  // For local images, use SafeImage which has fallback
  return 'safe';
}

/**
 * Process image URL to ensure it works with Vercel limitations
 */
export function processImageUrl(src: string): string {
  if (!src) return '';
  
  // Ensure external URLs have proper protocol
  if (src.startsWith('//')) {
    return `https:${src}`;
  }
  
  // Ensure WordPress URLs are properly formatted
  if (src.includes('kal.cse.mybluehost.me') && !src.startsWith('http')) {
    return `https://${src}`;
  }
  
  return src;
}

/**
 * Create image configuration object
 */
export function createImageConfig(
  src: string,
  alt: string,
  options: Partial<ImageConfig> = {}
): ImageConfig {
  return {
    src: processImageUrl(src),
    alt,
    width: options.width,
    height: options.height,
    className: options.className,
    priority: options.priority,
    loading: options.loading || 'lazy',
  };
}

/**
 * Get fallback image URL if main image fails
 */
export function getFallbackImageUrl(originalSrc: string): string {
  // You can implement fallback logic here
  // For example, return a placeholder image or a different version
  return originalSrc;
}
