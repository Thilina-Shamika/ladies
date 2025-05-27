'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from '@/lib/wordpress';

interface HomeSliderProps {
  slides: Slide[];
}

export function HomeSlider({ slides }: HomeSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds for Ken Burns

    return () => clearInterval(timer);
  }, [slides.length]);

  // Ken Burns animation variants
  const kenBurns = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.08, x: 10, y: 10, transition: { duration: 7, ease: 'easeInOut' } },
    exit: { opacity: 0, transition: { duration: 1.5, ease: 'easeInOut' } },
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-white dark:bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={slides[currentSlide].slide.url}
            alt={slides[currentSlide].slide.alt}
            className="w-full h-full object-cover object-center"
            variants={kenBurns}
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#000000] to-transparent" />

          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Vertical lines */}
            <div className="absolute inset-0 flex justify-between opacity-20">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-px h-full bg-white" />
              ))}
            </div>
            {/* Horizontal lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-20">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-px w-full bg-white" />
              ))}
            </div>
          </div>

          {/* Text Content inside container */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10">
            <div className="container mx-auto px-4">
              <div className="w-full md:w-3/5 max-w-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-sm font-light tracking-widest mb-2 text-white"
                >
                  {slides[currentSlide].slide_subheading}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-regular text-white mb-6 break-words md:max-w-[90%]"
                >
                  {slides[currentSlide].slide_heading}
                </motion.div>
                {slides[currentSlide].short_description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-white max-w-lg mb-6 text-sm md:text-sm"
                  >
                    {slides[currentSlide].short_description}
                  </motion.p>
                )}
                {slides[currentSlide].slide_button_text && slides[currentSlide].slide_button_link?.url && (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    href={slides[currentSlide].slide_button_link.url}
                    target={slides[currentSlide].slide_button_link.target || undefined}
                    rel={slides[currentSlide].slide_button_link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="inline-block bg-white text-[#9d0202] font-semibold px-6 py-3 rounded shadow hover:bg-[#9d0202] hover:text-white transition-colors duration-300 text-base uppercase tracking-wide"
                  >
                    {slides[currentSlide].slide_button_text}
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 