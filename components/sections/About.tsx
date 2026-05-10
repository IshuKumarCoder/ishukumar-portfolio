"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Rocket, Server, Smartphone } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Globe, title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks." },
  { icon: Cpu, title: "AI Integration", desc: "Implementing LLMs, agentic AI, and smart features." },
  { icon: Rocket, title: "SaaS Development", desc: "Scalable architecture for modern software services." },
  { icon: Server, title: "REST API Development", desc: "Robust and secure backend systems." },
  { icon: Code2, title: "Modern UI/UX", desc: "Beautiful, intuitive, and conversion-focused designs." },
  { icon: Smartphone, title: "Responsive Design", desc: "Flawless experiences across all devices." },
];

export const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            I'm a passionate Full Stack Java & AI Developer dedicated to building impactful software. With expertise in both 
            frontend aesthetics (React/Next.js) and robust backend scalability (Java/Spring Boot), I bridge the gap between stunning design and complex engineering.
          </p>
          <p className="text-lg text-muted-foreground">
            Beyond standard web development, I architect intelligent Agentic AI Systems that automate workflows and deliver Next-Gen user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-2xl group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
};
