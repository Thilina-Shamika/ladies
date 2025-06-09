// Use environment variable if available, otherwise fall back to environment-based URL
export const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://kal.cse.mybluehost.me'
    : 'http://ladies.local'); 