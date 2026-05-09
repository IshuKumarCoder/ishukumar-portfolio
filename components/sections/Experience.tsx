"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Software Development Engineer",
    company: "MARK1 Private Limited",
    date: "Dec 2025 - Present",
    description: "Developed 'Mind Magnet' gamified AI-learning platform using Next.js 15, TypeScript, MongoDB, and Redux. Built adaptive learning systems, AI curriculum generators, and JWT auth.",
    icon: Star
  },
  {
    title: "Java Full Stack Development Training",
    company: "Qspiders / Jspiders",
    date: "Feb 2023 - Dec 2025",
    description: "Built full-stack apps (Java, Spring Boot, React). Developed REST APIs, responsive UIs, secure dashboards, and optimized SQL queries using JDBC.",
    icon: Briefcase
  },
  {
    title: "Bachelor of Technology in CSE",
    company: "Shaheed Bhagat Singh State Technical Campus",
    date: "2019 - 2023",
    description: "Computer Science & Engineering. CGPA: 7.3. Built foundational skills in algorithms, data structures, and software engineering principles.",
    icon: GraduationCap
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-black/30 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-start ${
                    idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass flex items-center justify-center border-primary/50 text-primary z-10 bg-background shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <Icon size={20} />
                  </div>

                  <div className="w-full md:w-1/2 pl-20 md:pl-0" />
                  
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                    idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}>
                    <div className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors">
                      <span className="text-primary font-mono text-sm mb-2 block">{exp.date}</span>
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <h4 className="text-muted-foreground mb-4">{exp.company}</h4>
                      <p className="text-sm text-white/70">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
