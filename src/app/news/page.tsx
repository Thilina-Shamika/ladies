import React from 'react';
import Image from 'next/image';
import Blog from '@/components/home/Blog';
import { getPage } from '@/lib/wordpress';

interface NewsACF {
  news_image?: {
    url: string;
    alt: string;
  };
  news_heading?: string;
  news_subheading?: string;
}

export default async function NewsPage() {
  const data = await getPage('news');
  const acf = (data?.acf || {}) as NewsACF;
  return (
    <>
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.news_image?.url && (
            <Image
              src={acf.news_image.url}
              alt={acf.news_image.alt || acf.news_heading || ''}
              fill
              className="object-cover object-center w-full h-full"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm  mb-3 tracking-widest uppercase drop-shadow">
            {acf.news_subheading ?? ''}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.news_heading ?? ''}
          </h1>
        </div>
      </section>
      <Blog />
    </>
  );
} 