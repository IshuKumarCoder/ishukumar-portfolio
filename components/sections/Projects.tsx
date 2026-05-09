"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle } from "lucide-react";
import Image from "next/image";

import { TiltCard } from "@/components/ui/TiltCard";

const PROJECTS = [
  {
    title: "Mind Magnet – AI Learning Platform",
    description: "A futuristic AI-powered gamified learning platform with dynamic curriculum generation and adaptive learning.",
    features: ["AI Curriculum Generator", "Dynamic Learning Levels", "Gamification System", "Localized Content"],
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "AI APIs"],
    github: "https://github.com/IshuKumarCoder/MindMagnet",
    demo: "https://mind-magnet-three.vercel.app/"
  },
  {
    title: "Marbleliza - Marble Portfolio",
    description: "Portfolio website for Marbleliza company. Admin can add and remove products and see the requests of customers. Users can request for products and admin will get the request in their dashboard. It is a buisness website for marble company.",
    features: ["Dynamic Content", "Responsive Design", "Project Showcases", "Client Testimonials"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/IshuKumarCoder/Marbleliza",
    demo: "https://www.marbleliza.com/"
  },
  {
    title: "Xilvar",
    description: "A website for scrap the precious metals price form intrenet and show on website in chart format. Also sell the unique coins of gold and silver",
    features: ["Dynamic Content", "Responsive Design", "Dynamic Precius metals price according to location", "scraping precius metal prices using playwright and cheerio"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright", "cheerio"],
    github: "https://github.com/IshuKumarCoder/xilvar",
    // demo: "https://xilvar.com/"
  },
  {
    title: "Smart Contact Management System",
    description: "A scalable smart contact manager where users can create accounts and manage contacts securely.",
    features: ["Google & GitHub OAuth", "OTP Authentication", "Secure Dashboard", "Optimized SQL Queries"],
    tags: ["Java", "Spring Boot", "SQL", "Thymeleaf"],
    github: "https://github.com/IshuKumarCoder",
    demo: "#"
  },
  {
    title: "Car Rental System",
    description: "A scalable car rental platform with smart filtering and real-time booking workflows.",
    features: ["JWT Authentication", "Smart Car Search", "Personalized Recommendations", "Real-time Rental Mgmt"],
    tags: ["React.js", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/IshuKumarCoder",
    demo: "#"
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, highlighting technical complexity and beautiful design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard className="group glass-panel rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer">
                {/* Glowing hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <div className="flex gap-2 relative z-20">
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                        <Github size={18} />
                      </a>
                      {project.demo !== "#" && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <div className="space-y-2 mb-8 flex-1">
                    {project.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="text-primary" size={14} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
