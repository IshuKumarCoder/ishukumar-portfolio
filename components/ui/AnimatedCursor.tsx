"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const AnimatedCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for trailing effect
  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", mouseMove, { passive: true });
    document.documentElement.addEventListener("mouseenter", mouseEnter);
    document.documentElement.addEventListener("mouseleave", mouseLeave);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("magnetic")
      ) {
        setIsHovering((prev) => (prev !== true ? true : prev));
      } else {
        setIsHovering((prev) => (prev !== false ? false : prev));
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.documentElement.removeEventListener("mouseenter", mouseEnter);
      document.documentElement.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Main Cursor Blob */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: isHovering ? "#ffffff" : "#8b5cf6",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
      />
      {/* Outer Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 -ml-12 -mt-12 rounded-full pointer-events-none z-[99] blur-3xl opacity-30 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: "#06b6d4",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      />
    </>
  );
};
