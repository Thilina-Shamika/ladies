'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PrincipalMessageProps {
  image: { url: string; alt: string; };
  name: string;
  designation: string;
  subheading: string;
  heading: string;
  message: string;
  buttonText?: string;
  buttonLink?: { url: string; target?: string; };
  anniversaryImage?: { url: string; alt: string; };
}

export const PrincipalMessage: React.FC<PrincipalMessageProps> = ({
  image,
  name,
  designation,
  subheading,
  heading,
  message,
  buttonText,
  buttonLink,
  anniversaryImage,
}) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Principal Image with overlay and Anniversary Image */}
          <motion.div 
            className="flex flex-col md:flex-row gap-6 items-center relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {anniversaryImage && (
              <motion.div 
                className="relative w-full aspect-[3/4] sm:max-w-[300px] md:max-w-[200px] rounded-xl overflow-hidden shadow-xl z-20 md:-mr-16 bg-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Image
                  src={anniversaryImage.url}
                  alt={anniversaryImage.alt || "125 Years Anniversary"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 200px"
                  priority
                />
              </motion.div>
            )}
            <motion.div 
              className="relative w-full aspect-[3/4] max-w-md rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Image
                src={image.url}
                alt={image.alt || name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-6 py-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-lg md:text-2xl font-regular text-white mb-1">{name}</div>
                <div className="text-sm md:text-sm text-white/80">{designation}</div>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Right: Subheading, Heading, Message, Button */}
          <motion.div 
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-xs uppercase tracking-widest text-[#9d0202] font-semibold">{subheading}</span>
            </motion.div>
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {heading}
            </motion.h2>
            <motion.div
              className="prose prose-lg text-sm max-w-none text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: message }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            {buttonText && buttonLink?.url && (
              <motion.a
                href={buttonLink.url}
                target={buttonLink.target || undefined}
                rel={buttonLink.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block bg-[#9d0202] text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-white hover:text-[#9d0202] border-2 border-[#9d0202] transition-colors duration-300 text-base uppercase tracking-wide mt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {buttonText}
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 