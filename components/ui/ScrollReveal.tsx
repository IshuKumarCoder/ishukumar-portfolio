"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  width?: "w-full" | "w-auto";
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const ScrollReveal = ({ 
  children, 
  delay = 0, 
  width = "w-full",
  direction = "up"
}: ScrollRevealProps) => {
  
  const getVariants = () => {
    const base = { opacity: 0, filter: "blur(12px)" };
    switch (direction) {
      case "up": return { hidden: { ...base, y: 40 }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
      case "down": return { hidden: { ...base, y: -40 }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } };
      case "left": return { hidden: { ...base, x: 40 }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } };
      case "right": return { hidden: { ...base, x: -40 }, visible: { opacity: 1, x: 0, filter: "blur(0px)" } };
      case "none": return { hidden: base, visible: { opacity: 1, filter: "blur(0px)" } };
    }
  };

  return (
    <motion.div
      className={`relative ${width}`}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};
