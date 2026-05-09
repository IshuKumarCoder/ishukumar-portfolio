"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TiltCard = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = -(e.clientY - top - height / 2) / 15;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: position.y, rotateY: position.x }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      className={cn("relative perspective-1000", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none rounded-inherit"
        style={{
          opacity: Math.abs(position.x) + Math.abs(position.y) > 0 ? 0.2 : 0,
          transform: `translateZ(20px)`
        }}
      />
      {children}
    </motion.div>
  );
};
