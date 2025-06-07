import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';

interface CollegeProfileACF {
  subheading?: string;
  heading?: string;
  content_heading?: string;
  "1st_paragraph"?: string;
  block_quote?: string;
  image?: {
    url: string;
    alt: string;
  };
  "2nd_paragraph"?: string;
  excerpts_from_ladies?: string;
  cover_image?: {
    url: string;
    alt: string;
  };
}

export default async function CollegeProfilePage() {
  const pageData = await getPage('college-profile');
  const acf = (pageData?.acf || {}) as CollegeProfileACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'College Profile'}
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
            {acf.subheading ?? 'ABOUT US'}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-8 drop-shadow-lg font-light">
            {acf.heading ?? 'College Profile'}
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

          {/* Image */}
          {acf.image?.url && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={acf.image.url}
                  alt={acf.image.alt || 'College Profile Image'}
                  width={1196}
                  height={397}
                  className="w-full h-auto"
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

          {/* Excerpts from Ladies */}
          {acf.excerpts_from_ladies && (
            <div className="max-w-4xl mx-auto">
              <div className="border-4 border-[#9d0202] p-8 rounded-lg">
                <div
                  className="wysiwyg-content"
                  dangerouslySetInnerHTML={{ __html: acf.excerpts_from_ladies }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 