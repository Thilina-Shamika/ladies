"use client";
import React from "react";
import { motion } from "framer-motion";

interface ValuesProps {
  subheading: string;
  heading: string;
  content: string;
}

const Values: React.FC<ValuesProps> = ({ subheading, heading, content }) => {
  return (
    <motion.section
      className="py-16 bg-white w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="text-[#9d0202] text-xs md:text-sm font-semibold uppercase mb-3 tracking-widest">
          {subheading}
        </div>
        <h2 className="text-3xl md:text-6xl text-gray-900 mb-8 leading-tight">
          {heading}
        </h2>
        <div
          className="prose prose-lg mx-auto text-gray-700 text-center"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.section>
  );
};

export default Values; 