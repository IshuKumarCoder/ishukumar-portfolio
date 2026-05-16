"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already loaded in this session
    const hasLoaded = sessionStorage.getItem("portfolio_loaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const dismissLoader = () => {
      setIsLoading(false);
      sessionStorage.setItem("portfolio_loaded", "true");
    };

    // Set loaded after animation
    const timer = setTimeout(dismissLoader, 2500);

    // Allow user to skip by scrolling or clicking
    window.addEventListener("wheel", dismissLoader, { once: true });
    window.addEventListener("touchmove", dismissLoader, { once: true });
    window.addEventListener("click", dismissLoader, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", dismissLoader);
      window.removeEventListener("touchmove", dismissLoader);
      window.removeEventListener("click", dismissLoader);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030305]"
        >
          {/* Futuristic minimalist loader */}
          <div className="relative flex flex-col items-center">
            {/* Logo / Name reveal */}
            <motion.div className="overflow-hidden mb-4 flex gap-[0.2em]">
              {"ISHU KUMAR".split("").map((char, index) => (
                <motion.h1 
                  key={index}
                  initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.05, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="text-4xl md:text-5xl font-bold text-white tracking-tighter"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.h1>
              ))}
            </motion.div>
            
            {/* Glowing progress line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="h-full bg-primary relative"
              >
                <div className="absolute top-0 right-0 bottom-0 w-10 bg-white blur-[5px] opacity-50" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Loading Experience
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
