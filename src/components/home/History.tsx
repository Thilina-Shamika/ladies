"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HistoryProps {
  subheading: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imageAlt?: string;
  image2Url?: string;
  image2Alt?: string;
}

const History: React.FC<HistoryProps> = ({
  subheading,
  heading,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  imageAlt = '',
  image2Url = '',
  image2Alt = '',
}) => {
  // Convert backend URL to frontend URL
  let nextHref = buttonLink.replace(/^https?:\/\/[^/]+/, '');
  if (nextHref === '') nextHref = '/';

  return (
    <motion.section
      className="md:py-16 mb-16 bg-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Images */}
        <div className="w-full flex justify-center md:justify-start items-center relative min-h-[360px]">
          {imageUrl ? (
            <div className="rounded-xl overflow-hidden shadow-2xl max-w-[420px] w-full aspect-[16/9] flex-shrink-0 relative z-10">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={420}
                height={236}
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 90vw, 420px"
                quality={90}
                priority
              />
            </div>
          ) : (
            <div className="rounded-xl bg-gray-200 w-full max-w-[420px] aspect-[16/9] flex items-center justify-center text-gray-400 shadow-2xl relative z-10">
              No Image
            </div>
          )}
          {image2Url && (
            <div
              className="rounded-xl overflow-hidden shadow-2xl max-w-[300px] w-[300px] aspect-[16/9] flex-shrink-0 absolute -bottom-12 left-16 bg-white z-20 border-8 border-white"
              style={{
                transform: 'rotate(-8deg)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
              }}
            >
              <Image
                src={image2Url}
                alt={image2Alt}
                width={300}
                height={170}
                className="object-cover object-center w-full h-full"
                sizes="300px"
                quality={90}
                priority
              />
            </div>
          )}
        </div>
        {/* Right: Text */}
        <div className="flex mt-12 flex-col items-start">
          <span className="text-xs uppercase tracking-widest text-[#9d0202] font-semibold mb-2">
            {subheading}
          </span>
          <h2 className="text-3xl md:text-5xl text-gray-900 mb-6 leading-tight">
            {heading}
          </h2>
          <div className="text-gray-700 text-base md:text-sm mb-8 max-w-xl prose prose-p:mb-4">
            {description}
          </div>
          {buttonText && nextHref && (
            <Link
              href={nextHref}
              className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide"
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default History; 