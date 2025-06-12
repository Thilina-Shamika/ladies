'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getPrincipal } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false });

interface PrincipalImage {
  url: string;
  alt: string;
}

interface PrincipalACF {
  sub_heading: string;
  heading: string;
  qualifications: string;
  cover_image: PrincipalImage;
  term: string;
  country: string;
  content_heading: string;
  '1st_paragraph': string;
  past_principal_image: PrincipalImage;
  '2nd_paragraph': string;
  block_quote: string;
  images: {
    acf_fc_layout: string;
    principals_images: PrincipalImage;
    caption: string;
  }[];
  '3rd_paragraph': string;
  '2nd_block_quote': string;
  gallery: PrincipalImage[];
}

export default function PrincipalPage({ params }: { params: { slug: string } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [principal, setPrincipal] = useState<any>(null);

  React.useEffect(() => {
    const fetchPrincipal = async () => {
      const data = await getPrincipal(params.slug);
      if (!data) {
        notFound();
      }
      setPrincipal(data);
    };
    fetchPrincipal();
  }, [params.slug]);

  if (!principal) {
    return null;
  }

  const acf = principal.acf as PrincipalACF;

  // Prepare all images for lightbox
  const allImages = [
    ...(acf.past_principal_image ? [{ src: acf.past_principal_image.url, alt: acf.past_principal_image.alt || acf.heading }] : []),
    ...(acf.images || []).map(img => ({ src: img.principals_images.url, alt: img.principals_images.alt || img.caption })),
    ...(acf.gallery || []).map(img => ({ src: img.url, alt: img.alt || '' }))
  ];

  return (
    <main className="pb-8">
      {/* Cover Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 w-full h-full z-0">
          {acf.cover_image?.url && (
            <Image
              src={acf.cover_image.url}
              alt={acf.cover_image.alt || acf.heading}
              className="object-cover object-top w-full h-full"
              style={{ position: 'absolute', inset: 0 }}
              fill
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-12 w-full">
          <div className="text-white text-sm md:text-base font-semibold mb-4 tracking-widest uppercase drop-shadow">
            {acf.sub_heading}
          </div>
          <div className="text-white text-lg md:text-xl mb-2">
            {acf.term}
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-4 drop-shadow-lg font-light">
            {acf.heading}
          </h1>
          <div className="text-white text-lg md:text-xl mb-2">
            {acf.qualifications}
          </div>
          <div className="text-white text-lg md:text-xl">
            Country: {acf.country}
          </div>
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

          {/* Principal Image and Second Paragraph */}
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {acf.past_principal_image?.url && (
              <div className="md:w-1/3">
                <div className="relative aspect-[3/4] w-full">
                  <button
                    type="button"
                    className="w-full h-full"
                    onClick={() => {
                      setPhotoIndex(0);
                      setIsOpen(true);
                    }}
                  >
                    <Image
                      src={acf.past_principal_image.url}
                      alt={acf.past_principal_image.alt || acf.heading}
                      fill
                      className="object-cover rounded-lg cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            )}
            {acf['2nd_paragraph'] && (
              <div className="md:w-2/3">
                <div
                  className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                  dangerouslySetInnerHTML={{ __html: acf['2nd_paragraph'] }}
                />
              </div>
            )}
          </div>

          {/* Block Quote */}
          {acf.block_quote && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-h3:text-2xl prose-h3:font-light prose-h3:italic prose-h3:text-gray-900"
                dangerouslySetInnerHTML={{ __html: acf.block_quote }}
              />
            </div>
          )}

          {/* Principal Images with Captions */}
          {acf.images && acf.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {acf.images.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="relative aspect-[16/9] w-full mb-4">
                    <button
                      type="button"
                      className="w-full h-full"
                      onClick={() => {
                        setPhotoIndex(index + (acf.past_principal_image ? 1 : 0));
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        src={item.principals_images.url}
                        alt={item.principals_images.alt || item.caption}
                        fill
                        className="object-cover rounded-lg cursor-pointer"
                      />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 italic">
                    {item.caption}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Third Paragraph */}
          {acf['3rd_paragraph'] && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-p:mb-8 prose-p:leading-relaxed [&_p]:mb-8"
                dangerouslySetInnerHTML={{ __html: acf['3rd_paragraph'] }}
              />
            </div>
          )}

          {/* Second Block Quote */}
          {acf['2nd_block_quote'] && (
            <div className="mb-16">
              <div
                className="prose max-w-none text-gray-700 text-sm md:text-sm prose-h3:text-2xl prose-h3:font-light prose-h3:italic prose-h3:text-gray-900"
                dangerouslySetInnerHTML={{ __html: acf['2nd_block_quote'] }}
              />
            </div>
          )}

          {/* Gallery */}
          {acf.gallery && acf.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {acf.gallery.map((image, index) => (
                <div key={index} className="relative aspect-[16/9] w-full">
                  <button
                    type="button"
                    className="w-full h-full"
                    onClick={() => {
                      setPhotoIndex(index + (acf.past_principal_image ? 1 : 0) + (acf.images?.length || 0));
                      setIsOpen(true);
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || ''}
                      fill
                      className="object-cover rounded-lg cursor-pointer"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={allImages}
          index={photoIndex}
          on={{ view: ({ index }) => setPhotoIndex(index) }}
        />
      )}
    </main>
  );
} 