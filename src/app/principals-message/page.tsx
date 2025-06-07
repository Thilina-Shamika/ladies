import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';

interface PrincipalsMessageACF {
  subheading?: string;
  heading?: string;
  cover_image?: {
    url: string;
    alt: string;
  };
  content_heading?: string;
  principals_image?: {
    url: string;
    alt: string;
  };
  "1st_paragraph"?: string;
  "2nd_paragraph"?: string;
  block_quote?: string;
  "3rd_paragraph"?: string;
  principals_name?: string;
}

export default async function PrincipalsMessagePage() {
  const pageData = await getPage('principals-message');
  const acf = (pageData?.acf || {}) as PrincipalsMessageACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'Principal\'s Message'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
          <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
            {acf.subheading ?? 'ABOUT US'}
          </div>
          <h1 className="text-3xl md:text-6xl text-white mb-8 drop-shadow-lg">
            {acf.heading ?? 'Principal\'s Message'}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Two Columns Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            {/* Left Column: Principal's Image */}
            <div className="relative">
              {acf.principals_image?.url && (
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={acf.principals_image.url}
                    alt={acf.principals_image.alt || acf.principals_name || 'Principal'}
                    width={800}
                    height={533}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
            {/* Right Column: Content */}
            <div>
              {acf.content_heading && (
                <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
                  {acf.content_heading}
                </h2>
              )}
              {acf["1st_paragraph"] && (
                <div 
                  className="wysiwyg-content"
                  dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }}
                />
              )}
            </div>
          </div>

          {/* Second Paragraph */}
          {acf["2nd_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-16">
              <div 
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: acf["2nd_paragraph"] }}
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

          {/* Third Paragraph */}
          {acf["3rd_paragraph"] && (
            <div className="max-w-4xl mx-auto mb-16">
              <div 
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: acf["3rd_paragraph"] }}
              />
            </div>
          )}

          {/* Principal's Name and Title */}
          {acf.principals_name && (
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {acf.principals_name}
              </h3>
              <p className="text-gray-600 text-sm">
                Ladies College Principal
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 