/**
 * Utility to completely bypass Vercel's image optimization and 402 errors
 */

/**
 * Check if an image URL should bypass Vercel optimization
 */
export function shouldBypassVercel(src: string): boolean {
  if (!src) return false;
  
  const bypassPatterns = [
    'kal.cse.mybluehost.me',
    'ladies.local',
    'http://',
    'https://',
    '//',
    'vercel.app',
    'vercel.com'
  ];
  
  return bypassPatterns.some(pattern => src.includes(pattern));
}

/**
 * Create a native img element that bypasses Vercel
 */
export function createBypassImage(
  src: string,
  alt: string,
  options: {
    className?: string;
    width?: number | string;
    height?: number | string;
    style?: React.CSSProperties;
    loading?: 'lazy' | 'eager';
    priority?: boolean;
    onClick?: () => void;
  } = {}
) {
  return {
    type: 'img',
    props: {
      src,
      alt,
      className: options.className || '',
      width: options.width,
      height: options.height,
      style: options.style,
      loading: options.priority ? 'eager' : (options.loading || 'lazy'),
      onClick: options.onClick,
    }
  };
}

/**
 * Replace Next.js Image with native img tag for external images
 */
export function getImageComponent(src: string): 'native' | 'next' {
  return shouldBypassVercel(src) ? 'native' : 'next';
}

/**
 * Process image URL to ensure it works
 */
export function processImageUrl(src: string): string {
  if (!src) return '';
  
  // Ensure proper protocol
  if (src.startsWith('//')) {
    return `https:${src}`;
  }
  
  // Ensure WordPress URLs are properly formatted
  if (src.includes('kal.cse.mybluehost.me') && !src.startsWith('http')) {
    return `https://${src}`;
  }
  
  return src;
}
