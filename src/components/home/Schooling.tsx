"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from "next/link";

interface CurriculumItem {
  acf_fc_layout: string;
  curriculum_image: {
    url: string;
    alt: string;
  };
  curriculum_heading: string;
  curriculum_sub_heading?: string;
  curriculum_link: {
    title: string;
    url: string;
    target?: string;
  };
}

interface SchoolingProps {
  schooling_sub_heading: string;
  schooling_heading: string;
  curriculum: CurriculumItem[];
}

const Schooling: React.FC<SchoolingProps> = ({
  schooling_sub_heading,
  schooling_heading,
  curriculum,
}) => {
  // Ensure at least 6 items for the grid
  const items = curriculum.slice(0, 6);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const tileVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="py-16 px-0 w-full" ref={ref}>
      <div className="w-full mb-12 text-center">
        <h3 className="text-lg md:text-sm text-gray-600 mb-3">
          {schooling_sub_heading}
        </h3>
        <h2 className="text-3xl md:text-6xl  text-gray-900">
          {schooling_heading}
        </h2>
      </div>
      {/* Mobile Swiper Slider */}
      <div className="block md:hidden relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {items.map((item, idx) => {
            const linkUrl = item.curriculum_link?.url || '#';
            // Convert WordPress absolute URLs to relative paths for Next.js Link
            const nextHref = typeof linkUrl === 'string' ? linkUrl.replace(/^https?:\/\/[^/]+/, '') : '#';
            if (nextHref.startsWith('mailto:') || nextHref.startsWith('tel:')) return null;
            return (
              <SwiperSlide key={idx}>
                <Link
                  href={nextHref}
                  className="block"
                  title={item.curriculum_link?.title || ''}
                  prefetch={false}
                >
                  <motion.div
                    className="relative overflow-hidden aspect-square w-full group shadow-lg border border-white rounded-2xl"
                    initial="hidden"
                    animate={controls}
                    variants={tileVariants}
                    custom={idx}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.curriculum_image.url}
                        alt={item.curriculum_image.alt || item.curriculum_heading}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white w-full">
                      {item.curriculum_sub_heading && (
                        <div className="text-sm font-medium mb-1 opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                          {item.curriculum_sub_heading}
                        </div>
                      )}
                      <div className="text-lg md:text-lg font-semibold">
                        {item.curriculum_heading}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            );
          })}
          {/* Navigation Arrows */}
          <div className="swiper-button-prev !left-2 !text-white !top-1/2 !-translate-y-1/2 !z-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
          <div className="swiper-button-next !right-2 !text-white !top-1/2 !-translate-y-1/2 !z-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </Swiper>
      </div>
      {/* Desktop Swiper Slider */}
      <div className="hidden md:block relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={5}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {items.map((item, idx) => {
            const linkUrl = item.curriculum_link?.url || '#';
            const nextHref = typeof linkUrl === 'string' ? linkUrl.replace(/^https?:\/\/[^/]+/, '') : '#';
            return (
              <SwiperSlide key={idx}>
                <Link
                  href={nextHref}
                  className="block"
                  title={item.curriculum_link?.title || ''}
                  prefetch={false}
                >
                  <motion.div
                    className="relative overflow-hidden aspect-square w-full group shadow-lg border border-white rounded-2xl"
                    initial="hidden"
                    animate={controls}
                    variants={tileVariants}
                    custom={idx}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={item.curriculum_image.url}
                        alt={item.curriculum_image.alt || item.curriculum_heading}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-white w-full">
                      {item.curriculum_sub_heading && (
                        <div className="text-sm font-medium mb-1 opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                          {item.curriculum_sub_heading}
                        </div>
                      )}
                      <div className="text-lg md:text-lg font-semibold">
                        {item.curriculum_heading}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SwiperSlide>
            );
          })}
          {/* Navigation Arrows */}
          <div className="swiper-button-prev !left-2 !text-white !top-1/2 !-translate-y-1/2 !z-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </div>
          <div className="swiper-button-next !right-2 !text-white !top-1/2 !-translate-y-1/2 !z-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Schooling; 