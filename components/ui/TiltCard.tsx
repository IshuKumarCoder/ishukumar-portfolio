"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const TiltCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const opacity = useTransform([x, y], ([latestX, latestY]: number[]) => {
    return Math.abs(latestX) + Math.abs(latestY) > 0 ? 0.2 : 0;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const newX = (e.clientX - left - width / 2) / 15;
    const newY = -(e.clientY - top - height / 2) / 15;
    x.set(newX);
    y.set(newY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative perspective-1000", className)}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent transition-opacity duration-300 pointer-events-none rounded-inherit"
        style={{
          opacity,
          transform: `translateZ(20px)`
        }}
      />
      {children}
    </motion.div>
  );
};
