"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TiltCard } from "./TiltCard";
import { Code2, Sparkles, Terminal } from "lucide-react";

export const ProfileCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto z-10 perspective-1000">
      <TiltCard className="w-full relative rounded-full">
        {/* Animated Cyberpunk Glow Behind */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-primary via-accent to-purple-600 blur-2xl opacity-60 pointer-events-none"
        />

        {/* Rotating Tech Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-4px] rounded-full border-2 border-dashed border-primary/40 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-16px] rounded-full border border-accent/20 pointer-events-none"
        />

        {/* Profile Image Wrapper */}
        <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white/5 glass shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          {/* Holographic Scan Effect */}
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-accent/40 to-transparent z-20 pointer-events-none"
          />
          
          <Image
            src="/profile_pic.png"
            alt="Ishu Kumar - Full Stack Developer"
            fill
            className="object-cover object-top scale-[1.3] hover:scale-[1.4] transition-transform duration-700 ease-out filter contrast-125 saturate-110"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Floating "Available" Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap glass-panel px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] z-30"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Open to Freelance</span>
        </motion.div>

        {/* Floating Code Stats */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 -left-6 glass-panel p-3 rounded-2xl border border-primary/30 shadow-lg z-30"
        >
          <Code2 className="text-primary mb-1" size={20} />
          <div className="text-[10px] font-bold uppercase text-white/80">Java Mastery</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 -right-8 glass-panel p-3 rounded-2xl border border-accent/30 shadow-lg z-30"
        >
          <Sparkles className="text-accent mb-1" size={20} />
          <div className="text-[10px] font-bold uppercase text-white/80">AI Architect</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 -left-8 glass-panel p-3 rounded-2xl border border-purple-500/30 shadow-lg z-30"
        >
          <Terminal className="text-purple-400 mb-1" size={20} />
          <div className="text-[10px] font-bold uppercase text-white/80">Next.js Expert</div>
        </motion.div>
      </TiltCard>
    </div>
  );
};
