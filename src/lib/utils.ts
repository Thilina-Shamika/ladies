import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Decode HTML entities in text content
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  
  // Create a temporary DOM element to decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Decode HTML entities in text content (server-side safe)
 */
export function decodeHtmlEntitiesSafe(text: string): string {
  if (!text) return text;
  
  // Common HTML entities mapping
  const entityMap: Record<string, string> = {
    '&#8211;': '\u2013', // en dash
    '&#8212;': '\u2014', // em dash
    '&#8216;': '\u2018', // left single quotation mark
    '&#8217;': '\u2019', // right single quotation mark
    '&#8220;': '\u201C', // left double quotation mark
    '&#8221;': '\u201D', // right double quotation mark
    '&#8230;': '\u2026', // horizontal ellipsis
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };
  
  let decoded = text;
  for (const [entity, char] of Object.entries(entityMap)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  
  return decoded;
}

export type WordPressPost = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
  acf?: Record<string, unknown>;
  categories?: number[];
  link?: string;
};

export type WordPressPage = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    sub_heading?: string;
    heading?: string;
    cover_image?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    content_heading?: string;
    '1st_paragraph'?: string;
    block_quote?: string;
    '2nd_paragraph'?: string;
  };
}; 