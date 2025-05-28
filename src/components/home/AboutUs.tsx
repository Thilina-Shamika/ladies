"use client";

import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";

interface AboutUsProps {
  subheading?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  image2Url?: string;
  image2Alt?: string;
  backgroundImageUrl?: string;
}

const DEFAULTS = {
  subheading: "About Us",
  heading: "Welcome to Our School",
  description:
    "We are committed to providing a nurturing environment where students can excel academically, socially, and personally. Our dedicated staff and vibrant community ensure every child thrives.",
  buttonText: "Learn More",
  buttonLink: "#",
  imageUrl: "/about-placeholder.jpg",
  imageAlt: "About our school",
  image2Url: undefined,
  image2Alt: undefined,
  backgroundImageUrl: undefined,
};

const AboutUs: React.FC<AboutUsProps> = ({
  subheading = DEFAULTS.subheading,
  heading = DEFAULTS.heading,
  description = DEFAULTS.description,
  buttonText = DEFAULTS.buttonText,
  buttonLink = DEFAULTS.buttonLink,
  imageUrl = DEFAULTS.imageUrl,
  imageAlt = DEFAULTS.imageAlt,
  image2Url = DEFAULTS.image2Url,
  image2Alt = DEFAULTS.image2Alt,
  backgroundImageUrl = DEFAULTS.backgroundImageUrl,
}) => {
  return (
    <motion.section
      className="relative bg-gray-100 py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: backgroundImageUrl ? `url('${backgroundImageUrl}')` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-10 bg-gradient-to-r from-white to-transparent"
        style={{ opacity: 0.85 }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col items-start">
            <span className="text-xs uppercase tracking-widest text-[#9d0202] font-semibold mb-2">
              {subheading}
            </span>
            <h2 className="text-3xl md:text-6xl text-gray-900 mb-6 leading-tight">
              {heading}
            </h2>
            <div
              className="text-gray-700 text-sm md:text-sm mb-8 max-w-xl prose prose-p:mb-4"
              dangerouslySetInnerHTML={{ __html: description || '' }}
            />
            {buttonText && buttonLink && (
              (() => {
                let nextHref = buttonLink.replace(/^https?:\/\/[^/]+/, '');
                if (nextHref.startsWith('mailto:') || nextHref.startsWith('tel:')) {
                  return (
                    <a
                      href={nextHref}
                      className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide"
                    >
                      {buttonText}
                    </a>
                  );
                }
                return (
                  <Link
                    href={nextHref}
                    className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide"
                  >
                    {buttonText}
                  </Link>
                );
              })()
            )}
          </div>
          {/* Right: Images */}
          <div className="w-full flex flex-col md:flex-row gap-4 justify-center md:justify-end items-center">
            <div className="rounded-xl overflow-hidden shadow-xl max-w-[350px] w-full aspect-[4/5] flex-shrink-0">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={350}
                height={438}
                className="object-cover object-center w-full h-full"
                sizes="(max-width: 768px) 90vw, 350px"
                priority
              />
            </div>
            {image2Url && (
              <div className="rounded-xl overflow-hidden shadow-xl max-w-[350px] w-full aspect-[4/5] flex-shrink-0">
                <Image
                  src={image2Url}
                  alt={image2Alt || 'About image 2'}
                  width={350}
                  height={438}
                  className="object-cover object-center w-full h-full"
                  sizes="(max-width: 768px) 90vw, 350px"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs; 