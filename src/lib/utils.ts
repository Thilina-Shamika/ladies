import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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