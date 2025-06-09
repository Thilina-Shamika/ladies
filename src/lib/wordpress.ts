import { WordPressPost, WordPressPage } from './utils';
import { WP_API_URL } from '@/config/constants';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

interface MenuLink {
  title: string;
  url: string;
  target: string;
}

interface TopBarMenuItem {
  acf_fc_layout: 'top_menu_items';
  item_name: string;
  item_link: MenuLink;
}

interface SocialMediaItem {
  acf_fc_layout: 'social_items';
  social_media_name: string;
  social_media_url: string;
  icons: boolean;
}

interface MainMenuItem {
  acf_fc_layout: 'main_menu';
  main_menu_item_name: string;
  main_menu_item_link: MenuLink;
}

interface WordPressImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    '1536x1536': string;
    '1536x1536-width': number;
    '1536x1536-height': number;
    '2048x2048': string;
    '2048x2048-width': number;
    '2048x2048-height': number;
  };
}

export type WordPressHeader = {
  id: number;
  acf: {
    top_bar_phone: string;
    top_bar_email: string;
    top_bar_menu: TopBarMenuItem[];
    social_media_icons: SocialMediaItem[];
    main_logo: WordPressImage;
    main_menu_items: MainMenuItem[];
  };
};

export async function getHeader(): Promise<WordPressHeader | null> {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/wp-json/wp/v2/top-bar-header?_embed&acf=true`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Header API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        errorText
      });
      throw new Error(`Failed to fetch header: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const headers = await response.json();
    
    if (!headers || !Array.isArray(headers) || headers.length === 0) {
      console.warn('No header data found in response');
      return null;
    }

    return headers[0];
  } catch (error) {
    console.error('Error fetching header:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
}

export async function getNonce(): Promise<string> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/users/me`, {
      credentials: 'include',
    });
    
    if (response.ok) {
      const nonce = response.headers.get('X-WP-Nonce');
      return nonce || '';
    }
    return '';
  } catch (error) {
    console.error('Error getting nonce:', error);
    return '';
  }
}

export async function getPosts(page = 1, perPage = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&slug=${slug}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/wp-json/wp/v2/pages?_embed`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export async function getPage(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || WP_API_URL;
    const response = await fetch(`${apiUrl}/wp-json/wp/v2/pages?slug=${slug}&_embed`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`No page data found for slug: ${slug}`);
      return null;
    }

    const pages = await response.json();
    return pages[0] || null;
  } catch (error) {
    console.error(`Error fetching page data for ${slug}:`, error);
    return null;
  }
}

export interface Slide {
  acf_fc_layout: string;
  slide_subheading: string;
  slide_heading: string;
  short_description?: string;
  slide_button_text?: string;
  slide_button_link?: {
    title: string;
    url: string;
    target?: string;
  };
  slide: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface PrincipalImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PrincipalButtonLink {
  title: string;
  url: string;
  target?: string;
}

export interface HomePage {
  id: number;
  acf: {
    home_slider: Slide[];
    principal: PrincipalImage;
    principals_name: string;
    designation_or_qualifications: string;
    principals_message_subheading: string;
    principals_message_heading: string;
    principals_message: string;
    principals_section_button_text?: string;
    principals_section_button_link?: PrincipalButtonLink;
    "125_years": WordPressImage;
    about_us_subhaeding?: string;
    about_heading?: string;
    about_description?: string;
    about_button_text?: string;
    about_button_link?: { title: string; url: string; target?: string };
    about_image?: WordPressImage;
    about_image2?: WordPressImage;
    about_background_image?: WordPressImage;
    tile_items?: {
      acf_fc_layout: string;
      tile_image: WordPressImage;
      tile_heading: string;
      tile_link: { title: string; url: string; target?: string };
    }[];
    schooling_sub_heading?: string;
    schooling_heading?: string;
    curriculum?: {
      acf_fc_layout: string;
      curriculum_image: WordPressImage;
      curriculum_heading: string;
      curriculum_link: string;
    }[];
  };
}

export async function getHomePage(): Promise<HomePage | null> {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=home&acf_format=standard`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Home Page API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,
        errorText
      });
      throw new Error(`Failed to fetch home page: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn('No home page data found in response');
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error fetching home page:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
}

export async function getCategoriesByIds(ids: number[]): Promise<{ id: number; name: string; slug: string; count: number }[]> {
  if (!ids.length) return [];
  const params = ids.map(id => `include[]=${id}`).join('&');
  const response = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/categories?${params}&_fields=id,name,slug,count`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) return [];
  return response.json();
} 