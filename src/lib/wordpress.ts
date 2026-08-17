import { WordPressPost, WordPressPage } from './utils';
import { WP_API_URL } from '@/config/constants';

function normalizeWordPressApiUrl(url: string) {
  return url.replace(/\/+$/, '');
}

export const WORDPRESS_API_URL = normalizeWordPressApiUrl(
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL || WP_API_URL
);

/** Build a WordPress REST URL without double slashes. */
export function wpApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${WORDPRESS_API_URL}${normalizedPath}`;
}

const WP_FETCH_TIMEOUT_MS = 30_000;

export async function wpFetch(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } }
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WP_FETCH_TIMEOUT_MS);

  try {
    return await fetch(wpApiUrl(path), {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

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
    const response = await wpFetch(
      `/wp-json/wp/v2/posts?_embed=wp:featuredmedia&page=${page}&per_page=${perPage}`,
      { next: { revalidate: 3600 } }
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

/** Posts for the news page — featured media only, not full embed. */
export async function getNewsPosts(perPage = 50): Promise<WordPressPost[]> {
  try {
    const response = await wpFetch(
      `/wp-json/wp/v2/posts?_embed=wp:featuredmedia&per_page=${perPage}&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news posts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return [];
  }
}

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export async function getAllCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await wpFetch(
      '/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,count&orderby=count&order=desc',
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await wpFetch(
      `/wp-json/wp/v2/posts?slug=${slug}&_fields=id,date,slug,title,content,excerpt`,
      { next: { revalidate: 3600 } }
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

export async function getPage(slug: string, options?: { embed?: boolean }) {
  try {
    if (!WORDPRESS_API_URL) {
      console.error('WordPress API URL is not configured');
      return null;
    }

    const embedQuery = options?.embed === false ? '' : '&_embed';
    const response = await wpFetch(
      `/wp-json/wp/v2/pages?slug=${slug}${embedQuery}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.error(`Failed to fetch page data for ${slug}:`, {
        status: response.status,
        statusText: response.statusText,
        url: wpApiUrl(`/wp-json/wp/v2/pages?slug=${slug}${embedQuery}`),
      });
      return null;
    }

    const pages = await response.json();
    
    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      console.warn(`No page data found for slug: ${slug}`);
      return null;
    }

    return pages[0];
  } catch (error) {
    console.error(`Error fetching page data for ${slug}:`, {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return null;
  }
}

/** Slugs that already have dedicated Next.js routes. The modular catch-all must not handle these. */
export const RESERVED_PAGE_SLUGS = new Set([
  'about-us',
  'administration',
  'advance-level-choices',
  'annual-reports',
  'archives',
  'blog',
  'career-guidance',
  'college-profile',
  'contact-us',
  'events',
  'history-of-ladies-college',
  'hostel-and-day-care',
  'in-the-classroom',
  'information-technology',
  'introduction',
  'kindergarten',
  'lcips',
  'learning-environments',
  'lilian-nixon-library',
  'mabel-simon-hall',
  'maintenance',
  'news',
  'nursery',
  'primary-middle-school',
  'principal',
  'principals-message',
  'privacy-policy',
  'resources',
  'school-hymn',
  'science-laboratory',
  'special-education-unit',
  'sports-complex',
  'terms-conditions',
  'the-ethos',
  'upper-school',
  '125-years',
]);

export type ModularPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  template?: string;
  acf?: {
    page_modules?: PageModule[] | false;
  };
};

export type WPMediaField = { url: string; alt?: string; title?: string } | false | null | undefined;

export type WPLinkField = {
  title?: string;
  url?: string;
  target?: string;
} | false | null | undefined;

export type WPFileField = {
  url?: string;
  title?: string;
  filename?: string;
} | false | null | undefined;

export type PageModule =
  | {
      acf_fc_layout: 'hero';
      sub_heading?: string;
      heading?: string;
      cover?: WPMediaField;
    }
  | {
      acf_fc_layout: 'text_block';
      content_subheading?: string;
      content_heading?: string;
      content?: string;
    }
  | {
      acf_fc_layout: 'two_column_intro';
      content_heading?: string;
      content_subheading?: string;
      content?: string;
    }
  | {
      acf_fc_layout: 'quote';
      quote?: string;
    }
  | {
      acf_fc_layout: 'image_text';
      image?: WPMediaField;
      image_position?: 'left' | 'right' | string;
      subheading?: string;
      heading?: string;
      content?: string;
      button?: WPLinkField;
    }
  | {
      acf_fc_layout: 'gallery';
      gallery?: Array<{ url: string; alt?: string; title?: string }>;
    }
  | {
      acf_fc_layout: 'downloads';
      heading?: string;
      files?: Array<{
        title?: string;
        file?: WPFileField;
      }>;
    }
  | {
      acf_fc_layout: 'people_grid';
      heading?: string;
      intro?: string;
      people?: Array<{
        image?: WPMediaField;
        name?: string;
        role?: string;
      }>;
    }
  | {
      acf_fc_layout: string;
      [key: string]: unknown;
    };

export async function getModularPage(slug: string): Promise<ModularPage | null> {
  try {
    if (!WORDPRESS_API_URL) return null;

    const response = await wpFetch(
      `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&acf_format=standard`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return null;

    const pages = await response.json();
    if (!Array.isArray(pages) || pages.length === 0) return null;

    return pages[0] as ModularPage;
  } catch (error) {
    console.error(`Error fetching modular page ${slug}:`, error);
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

export async function getPrincipal(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/principal?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch principal');
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching principal:', error);
    return null;
  }
}

export type WordPressFavicon = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  mime_type?: string;
};

export async function getFavicon(): Promise<WordPressFavicon | null> {
  try {
    const response = await wpFetch(
      '/wp-json/wp/v2/favicon?slug=favicon&acf_format=standard',
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch favicon data');
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    const faviconField = data[0]?.acf?.favicon;
    if (!faviconField || typeof faviconField !== 'object' || !faviconField.url) {
      return null;
    }

    return {
      url: faviconField.url,
      alt: faviconField.alt || 'Ladies\' College',
      width: faviconField.width,
      height: faviconField.height,
      mime_type: faviconField.mime_type,
    };
  } catch (error) {
    console.error('Error fetching favicon:', error);
    return null;
  }
} 