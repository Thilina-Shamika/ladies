// Use environment variable if available, otherwise fall back to environment-based URL
export const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://ladies.local'
    : 'https://kal.cse.mybluehost.me'); 