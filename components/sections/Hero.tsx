"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Hero3D } from "@/components/3d/Hero3D";
import { TerminalEffect } from "@/components/ui/TerminalEffect";
import { Github, Linkedin, Code, Mail, ExternalLink } from "lucide-react";

import { ProfileCard } from "@/components/ui/ProfileCard";

const ROLES = [
  "Full Stack Java & AI Developer",
  "Next.js Developer",
  "Scalable System Architect",
  "Freelancer"
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delayOffset: number) => ({
    opacity: 1,
    transition: {
      delayChildren: delayOffset,
      staggerChildren: 0.15,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [delayOffset, setDelayOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Determine delay based on whether the preloader has played in this session
    const hasLoaded = sessionStorage.getItem("portfolio_loaded");
    if (!hasLoaded) {
      setDelayOffset(2.5); // Wait for preloader
    } else {
      setDelayOffset(0.1); // Quick load
    }

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" id="home">
      {/* 3D Background */}
      <Hero3D />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        custom={delayOffset}
        className="container relative z-10 py-6 px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="flex flex-col items-start gap-6">
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-primary mb-2"
          >
            Available for Freelance Work
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight flex flex-wrap"
          >
            <span className="mr-3">Hi, I'm</span> 
            <span className="text-gradient flex">
              {"Ishu Kumar".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: delayOffset + 0.5 + (index * 0.05), duration: 0.5, ease: "easeOut" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="h-10 overflow-hidden">
            <motion.div
              key={currentRole}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-medium text-muted-foreground"
            >
              {ROLES[currentRole]}
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-lg"
          >
            I build scalable web applications, AI-integrated systems, and SaaS products. Bridging the gap between creative frontend aesthetics and robust backend architectures.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
            <a href="#contact"><AnimatedButton variant="primary">Hire Me</AnimatedButton></a>
            <a href="#projects"><AnimatedButton variant="secondary">View Projects</AnimatedButton></a>
            <a href="/resume/ishu-kumar-(M1).pdf" download><AnimatedButton variant="outline">Download Resume</AnimatedButton></a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 mt-6">
            {[
              { Icon: Github, href: "https://github.com/IshuKumarCoder" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/ishu-kumar-460996229/" },
              { Icon: Code, href: "https://leetcode.com/u/ishukumarleet/" },
              { Icon: ExternalLink, href: "https://mind-magnet-three.vercel.app/"}
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -5, color: "#8b5cf6" }}
                className="p-3 glass rounded-full text-foreground hover:neon-shadow transition-all"
              >
                <item.Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="hidden lg:block relative w-full flex justify-center items-center"
        >
          <ProfileCard />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delayOffset + 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ willChange: "transform" }}
          className="w-5 h-8 border-2 border-muted-foreground rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
