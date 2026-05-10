"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Code, Award } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

const ACHIEVEMENTS = [
  { icon: Code, title: "200+", desc: "DSA Problems Solved" },
  { icon: Star, title: "5 Star", desc: "HackerRank Rating" },
  { icon: Award, title: "Certified", desc: "Java Full Stack" },
  { icon: Trophy, title: "Mastery", desc: "AI Integrations" },
  { icon: Medal, title: "Multiple", desc: "Full Stack Projects" },
];

const CERTIFICATIONS = [
  { title: "Java Full Stack Certification", issuer: "Jspiders / Qspiders" },
  { title: "AI Mastery", issuer: "Coursiv.com" },
  { title: "DSA in Java", issuer: "HackerRank" },
  { title: "Web Development Bootcamp", issuer: "Udemy" }
];

export const Achievements = () => {
  return (
    <section id="achievements" className="py-12 md:py-24 relative overflow-hidden bg-black/40 border-y border-white/5">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Achievements & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A testament to continuous learning, problem-solving, and professional excellence.
          </p>
        </motion.div>

        {/* Counters / Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard className="flex flex-col items-center p-6 glass-panel rounded-2xl hover:border-primary/50 transition-colors group h-full">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <div className="text-2xl font-bold mb-1 text-white">{item.title}</div>
                <div className="text-xs text-center text-muted-foreground uppercase tracking-wider">{item.desc}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Certifications List */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Award className="text-primary" /> Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-lg text-white mb-1">{cert.title}</div>
                  <div className="text-sm text-primary">{cert.issuer}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <Medal size={20} className="text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
