"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Zap } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  unlockedAt: number | null;
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "welcome", title: "New Challenger", description: "You entered Ishu's universe.", unlockedAt: null },
  { id: "scroll_25", title: "Explorer", description: "Scrolled 25% of the portfolio.", unlockedAt: null },
  { id: "scroll_75", title: "Deep Diver", description: "Reached the depths of the portfolio.", unlockedAt: null },
  { id: "projects", title: "Tech Inspector", description: "Viewed the Projects section.", unlockedAt: null },
];

export const GamificationSystem = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [popup, setPopup] = useState<Achievement | null>(null);
  
  const xpRef = useRef(0);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const idx = prev.findIndex((a) => a.id === id);
      if (idx > -1 && !prev[idx].unlockedAt) {
        const updated = [...prev];
        updated[idx].unlockedAt = Date.now();
        setPopup(updated[idx]);
        
        const newXp = xpRef.current + 500;
        xpRef.current = newXp;
        setXp(newXp); // 500 XP per achievement
        
        // Hide popup after 4 seconds
        setTimeout(() => setPopup(null), 4000);
        return updated;
      }
      return prev;
    });
  };

  useEffect(() => {
    // Unlock welcome immediately
    setTimeout(() => unlockAchievement("welcome"), 1500);

    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPos / (docHeight - windowHeight)) * 100;

        // Base XP from scrolling
        const scrollXp = Math.floor(scrollPercentage * 10);
        if (scrollXp > xpRef.current) {
          xpRef.current = scrollXp;
          setXp((prev) => Math.max(prev, scrollXp));
        }

        if (scrollPercentage > 25) unlockAchievement("scroll_25");
        if (scrollPercentage > 75) unlockAchievement("scroll_75");

        const projectsEl = document.getElementById("projects");
        if (projectsEl && scrollPos + windowHeight > projectsEl.offsetTop) {
          unlockAchievement("projects");
        }
        
        throttleTimeout = null;
      }, 100); // Throttle scroll processing to 100ms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  useEffect(() => {
    // Level up logic (every 1000 XP)
    const newLevel = Math.floor(xp / 1000) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [xp, level]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* HUD (Heads Up Display) */}
      <div className="fixed top-24 right-6 z-40 hidden md:flex flex-col gap-2 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            {level}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Level {level}</span>
            <div className="w-32 h-2 bg-black/50 rounded-full overflow-hidden mt-1 relative">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${(xp % 1000) / 10}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            <span className="text-[10px] text-white/50 text-right mt-0.5">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Achievement Popup Notification */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 glass-panel border border-primary/30 p-4 rounded-xl flex items-center gap-4 max-w-sm shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
              <Award size={24} />
            </div>
            <div>
              <div className="text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                <Zap size={10} /> Achievement Unlocked
              </div>
              <div className="font-bold text-white">{popup.title}</div>
              <div className="text-xs text-muted-foreground">{popup.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
