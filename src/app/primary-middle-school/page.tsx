import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';
import UpperSchoolGallery from '@/components/upper-school/UpperSchoolGallery';

interface PrimaryMiddleSchoolACF {
  subheading?: string;
  heading?: string;
  cover?: {
    url: string;
    alt: string;
  };
  content_heading?: string;
  "1st_paragraph"?: string;
  block_quote?: string;
  "2nd_paragraph"?: string;
  gallery?: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
}

export default async function PrimaryMiddleSchoolPage() {
  const pageData = await getPage('primary-middle-school');
  const acf = (pageData?.acf || {}) as PrimaryMiddleSchoolACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover?.url && (
            <Image
              src={acf.cover.url}
              alt={acf.cover.alt || acf.heading || 'Primary & Middle School'}
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
            {acf.subheading ?? 'LEARNING ENVIRONMENTS'}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {acf.heading ?? 'Primary & Middle School'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Content Heading */}
          {acf.content_heading && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light leading-tight">
                {acf.content_heading}
              </h2>
            </div>
          )}

          {/* First Paragraph */}
          {acf["1st_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }}
              />
            </div>
          )}

          {/* Block Quote */}
          {acf.block_quote && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative pl-8 border-l-4 border-[#9d0202] bg-gray-50/50 p-8 rounded-r-lg">
                <div
                  className="wysiwyg-content"
                  dangerouslySetInnerHTML={{ __html: acf.block_quote }}
                />
              </div>
            </div>
          )}

          {/* Second Paragraph */}
          {acf["2nd_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf["2nd_paragraph"] }}
              />
            </div>
          )}

          {/* Gallery */}
          {acf.gallery && acf.gallery.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <UpperSchoolGallery gallery={acf.gallery} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 