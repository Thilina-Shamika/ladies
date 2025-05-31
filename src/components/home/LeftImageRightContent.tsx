import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LeftImageRightContentProps {
  imageUrl: string;
  imageAlt?: string;
  heading?: string;
  subheading?: string;
  content: string;
  introHeading?: string;
  introSubheading?: string;
}

function getExcerpt(html: string, length = 160) {
  // Remove HTML tags and get the first N chars
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.length > length ? text.slice(0, length) + '…' : text;
}

export const LeftImageRightContent: React.FC<LeftImageRightContentProps> = ({
  imageUrl,
  imageAlt = '',
  heading,
  subheading,
  content,
  introHeading,
  introSubheading,
}) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="w-full flex justify-center md:justify-start items-center">
          {imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-xl w-full aspect-[4/3] flex-shrink-0 relative">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
              />
            </div>
          )}
        </div>
        {/* Right: Content */}
        <div>
          {subheading && (
            <div className="text-xs md:text-sm text-[#9d0202] font-semibold uppercase mb-2 tracking-widest">{subheading}</div>
          )}
          {heading && (
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-2">{heading}</h2>
          )}
          {introHeading && (
            <h3 className="text-2xl md:text-4xl text-gray-900 mb-2">{introHeading}</h3>
          )}
          {introSubheading && (
            <div className="text-lg md:text-sm text-[#9d0202]  mb-4 whitespace-pre-line">{introSubheading}</div>
          )}
          {content && (
            <div className="prose max-w-none text-gray-700 text-base md:text-sm prose-p:mb-6 force-paragraph-space mt-8 mb-6" dangerouslySetInnerHTML={{ __html: content }} />
          )}
          <Link href="/introduction" className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide">
            Read More
          </Link>
        </div>
      </div>
    </div>
  </section>
); 