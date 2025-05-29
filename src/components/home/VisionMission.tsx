"use client";
import React from "react";
import { motion } from "framer-motion";

interface VisionMissionProps {
  mission: string;
  vision: string;
  missionLabel?: string;
  visionLabel?: string;
}

const VisionMission: React.FC<VisionMissionProps> = ({
  mission,
  vision,
  missionLabel = "Our Mission",
  visionLabel = "Our Vision",
}) => {
  return (
    <section className="w-full font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[340px]">
        {/* Mission */}
        <motion.div
          className="flex flex-col items-center justify-center bg-[#9d0202] text-white py-12 px-6 text-right md:text-right pt-40 pb-40"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-lg md:text-sm font-semibold uppercase mb-6 tracking-widest opacity-80 w-full">
            {missionLabel}
          </div>
          <div className="text-2xl md:text-3xl font-semibold leading-tight max-w-2xl ml-auto">
            {mission}
          </div>
        </motion.div>
        {/* Vision */}
        <motion.div
          className="flex flex-col items-center justify-center bg-gray-400 text-white py-22 px-6 text-left md:text-left pt-40 pb-40"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-lg md:text-sm font-semibold uppercase mb-6 tracking-widest opacity-80 w-full">
            {visionLabel}
          </div>
          <div className="text-2xl md:text-3xl font-semibold leading-tight max-w-2xl mr-auto">
            {vision}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission; 