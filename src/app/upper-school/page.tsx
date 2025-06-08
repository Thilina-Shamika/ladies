import React from 'react';
import Image from 'next/image';
import { getPage } from '@/lib/wordpress';
import UpperSchoolGallery from '@/components/upper-school/UpperSchoolGallery';

interface GalleryImage {
  url: string;
  alt?: string;
  title?: string;
}

interface ResultAnalysis {
  acf_fc_layout: string;
  heading: string;
  upload_your_pdf_file_here?: {
    url: string;
    title?: string;
  };
}

interface UpperSchoolACF {
  sub_heading?: string;
  heading?: string;
  cover_image?: {
    url: string;
    alt?: string;
  };
  content_heading?: string;
  '1st_paragraph'?: string;
  gallery?: GalleryImage[];
  result_analysis?: ResultAnalysis[];
}

export default async function UpperSchoolPage() {
  const pageData = await getPage('upper-school');
  const acf = (pageData?.acf || {}) as UpperSchoolACF;

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading || 'Upper School'}
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Content Heading */}
          {acf.content_heading && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light leading-tight">
                {acf.content_heading}
              </h2>
            </div>
          )}

          {/* First Paragraph */}
          {acf['1st_paragraph'] && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf['1st_paragraph'] }}
              />
            </div>
          )}

          {/* Result Analysis */}
          {Array.isArray(acf.result_analysis) && acf.result_analysis.length > 0 && (
            <div className="mb-16 space-y-8">
              {acf.result_analysis.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6">
                  <div className="text-lg font-semibold text-gray-900">{item.heading}</div>
                  {item.upload_your_pdf_file_here?.url && (
                    <a
                      href={item.upload_your_pdf_file_here.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-4 py-2 bg-[#9d0202] text-white rounded hover:bg-[#7a0101] transition"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Gallery */}
          <UpperSchoolGallery gallery={acf.gallery || []} />
        </div>
      </section>
    </main>
  );
} 