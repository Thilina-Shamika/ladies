import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';

interface NurseryACF {
  sub_heading?: string;
  heading?: string;
  cover_image?: {
    url: string;
    alt: string;
  };
  content_heading?: string;
  '1st_paragraph'?: string;
  block_quote?: string;
  '2nd_paragraph'?: string;
}

export default async function NurseryPage() {
  const nurseryPageData = await getPage('nursery');
  const acf = (nurseryPageData?.acf || {}) as NurseryACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'Nursery'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
          <div className="text-white text-sm md:text-base font-semibold mb-4 tracking-widest uppercase drop-shadow">
            {acf.sub_heading ?? ''}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {acf.heading ?? ''}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Content Heading */}
          {acf.content_heading && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl text-[#1a1a1a] font-light leading-tight">
                {acf.content_heading}
              </h2>
            </div>
          )}

          {/* First Paragraph */}
          {acf['1st_paragraph'] && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-[#1a1a1a] text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf['1st_paragraph'] }}
              />
            </div>
          )}

          {/* Block Quote */}
          {acf.block_quote && (
            <div className="mb-16">
              <div className="relative pl-8 border-l-4 border-[#9d0202] bg-gray-50/50 p-8 rounded-r-lg">
                <div
                  className="wysiwyg-content"
                  dangerouslySetInnerHTML={{ __html: acf.block_quote }}
                />
              </div>
            </div>
          )}

          {/* Second Paragraph */}
          {acf['2nd_paragraph'] && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-[#1a1a1a] text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf['2nd_paragraph'] }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 