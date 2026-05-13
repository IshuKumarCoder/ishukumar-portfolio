"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial preference, default to dark unless explicitly light
    const isDarkMode = localStorage.getItem("theme") !== "light";
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return <div className="w-9 h-9"></div>;

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-border/50 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-4 h-4" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-4 h-4" />
        </motion.div>
      )}
    </button>
  );
};
