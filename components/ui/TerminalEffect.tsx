"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TerminalEffect = () => {
  const [text, setText] = useState("");
  const fullText = `> Initializing developer profile...
> Loading skills: React, Next.js, Node.js, AI...
> Establishing database connections...
> Deploying agentic AI systems...
> Ready to build amazing products.`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="w-full max-w-md mx-auto mt-8 bg-black/80 rounded-lg overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="mx-auto text-xs text-white/50 font-mono">bash - ishu@macbook</div>
      </div>
      <div className="p-4 font-mono text-xs md:text-sm text-green-400 h-32 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {text.split("\n").map((line, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">{line}</div>
          ))}
          <span className="animate-pulse">_</span>
        </motion.div>
      </div>
    </div>
  );
};
