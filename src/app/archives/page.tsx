import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';

interface ArchivesACF {
  sub_heading?: string;
  heading?: string;
  cover_image?: { url: string; alt: string };
  content_sub_heading?: string;
  content_heading?: string;
  "1st_paragraph"?: string;
  image?: { url: string; alt: string };
  "2nd_paragraph"?: string;
  block_quote?: string;
  "3rd_paragraph"?: string;
  gallery_heading?: string;
  youtube_link?: string;
}

export default async function ArchivesPage() {
  const pageData = await getPage('archives');
  const acf = (pageData?.acf || {}) as ArchivesACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      {acf.cover_image?.url && (
        <section className="relative min-h-[40vh] flex items-center justify-center bg-gray-900">
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'Archives'}
              className="object-cover object-center w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full">
            {acf.sub_heading && (
              <div className="text-white text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase drop-shadow">
                {acf.sub_heading}
              </div>
            )}
            {acf.heading && (
              <h1 className="text-3xl md:text-6xl text-white mb-4 drop-shadow-lg">
                {acf.heading}
              </h1>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            {acf.content_sub_heading && (
              <div className="text-[#9d0202] text-sm md:text-sm font-semibold mb-3 tracking-widest uppercase">
                {acf.content_sub_heading}
              </div>
            )}
            {acf.content_heading && (
              <h2 className="text-2xl md:text-3xl text-gray-900 mb-8">
                {acf.content_heading}
              </h2>
            )}
            {acf["1st_paragraph"] && (
              <div className="wysiwyg-content mb-8" dangerouslySetInnerHTML={{ __html: acf["1st_paragraph"] }} />
            )}
            {acf.image?.url && (
              <div className="flex justify-center mb-8">
                <div className="rounded-xl overflow-hidden shadow-xl w-full max-w-2xl">
                  <Image
                    src={acf.image.url}
                    alt={acf.image.alt || 'Archives'}
                    width={800}
                    height={533}
                    className="w-full h-auto object-cover object-center"
                  />
                </div>
              </div>
            )}
            {acf["2nd_paragraph"] && (
              <div className="wysiwyg-content mb-8" dangerouslySetInnerHTML={{ __html: acf["2nd_paragraph"] }} />
            )}
            {acf.block_quote && (
              <div className="max-w-4xl mx-auto mb-16">
                <div className="relative pl-8 border-l-4 border-[#9d0202] bg-gray-50/50 p-8 rounded-r-lg">
                  <div className="wysiwyg-content" dangerouslySetInnerHTML={{ __html: acf.block_quote }} />
                </div>
              </div>
            )}
            {acf["3rd_paragraph"] && (
              <div className="wysiwyg-content mb-8" dangerouslySetInnerHTML={{ __html: acf["3rd_paragraph"] }} />
            )}
            {acf.gallery_heading && (
              <h2 className="text-2xl md:text-3xl text-[#9d0202] text-center mb-8">{acf.gallery_heading}</h2>
            )}
            {acf.youtube_link && (
              <div className="flex justify-center">
                <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    src={acf.youtube_link.replace('watch?v=', 'embed/')}
                    title="School Archives Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 