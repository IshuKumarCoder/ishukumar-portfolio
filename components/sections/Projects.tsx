"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
    demo: "https://mind-magnet-three.vercel.app/",
    imageLink: "/projectimages/mindmagnet.png",
  },
  {
    title: "Xilvar",
    description: "A website for scrap the precious metals price form intrenet and show on website in chart format. Also sell the unique coins of gold and silver",
    features: ["Dynamic Content", "Responsive Design", "Dynamic Precius metals price according to location", "scraping precius metal prices using playwright and cheerio"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright", "cheerio"],
    github: "https://github.com/IshuKumarCoder/xilvar",
    imageLink: "/projectimages/xilvar.png",
    // demo: "https://xilvar.com/"
  },
  {
    title: "Marbleliza - Marble Portfolio",
    description: "Portfolio website for Marbleliza company. Admin can add and remove products and see the requests of customers. Users can request for products and admin will get the request in their dashboard. It is a buisness website for marble company.",
    features: ["Dynamic Content", "Responsive Design", "Project Showcases", "Client Testimonials"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/IshuKumarCoder/Marbleliza",
    demo: "https://www.marbleliza.com/",
    imageLink: "/projectimages/marbliza.png",
  },
  {
    title: "Car Rental System",
    description: "A scalable car rental platform with smart filtering and real-time booking workflows.",
    features: ["JWT Authentication", "Smart Car Search", "Personalized Recommendations", "Real-time Rental Mgmt"],
    tags: ["React.js", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/IshuKumarCoder",
    imageLink: "/projectimages/carRental.png",
    demo: "#"
  },
  {
    title: "Smart Contact Management System",
    description: "A scalable smart contact manager where users can create accounts and manage contacts securely.",
    features: ["Google & GitHub OAuth", "OTP Authentication", "Secure Dashboard", "Optimized SQL Queries"],
    tags: ["Java", "Spring Boot", "SQL", "Thymeleaf"],
    github: "https://github.com/IshuKumarCoder",
    imageLink: "/projectimages/smartcon.png",
    demo: "#"
  }
  
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" ref={containerRef} className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, highlighting technical complexity and beautiful design.
          </p>
        </motion.div>

        {/* The wrapper that contains all sticky cards */}
        <div className="relative z-10 mt-10 pb-[10vh]">
          {PROJECTS.map((project, idx) => {
            const total = PROJECTS.length;
            // The card starts scaling down when it hits the top (progress relative to its index)
            const start = idx / total;
            
            // Calculate precisely how small this card should be at the very end.
            // Bottom-most card (idx=0) will be smallest. Top-most card (idx=4) stays scale 1.
            const targetScale = 1 - (total - 1 - idx) * 0.05; 
            
            const scale = useTransform(scrollYProgress, [start, 1], [1, targetScale]);
            
            // Increment the top slightly for a layered "stacked deck" effect
            const top = `calc(15vh + ${idx * 30}px)`;

            return (
              <div 
                key={project.title} 
                className="sticky w-full flex justify-center mb-[40vh]" 
                style={{ top }}
              >
                <motion.div
                  style={{ scale, transformOrigin: "top center" }}
                  className="w-full max-w-6xl drop-shadow-2xl"
                >
                  <TiltCard className="group rounded-3xl overflow-hidden flex flex-col relative cursor-pointer shadow-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl">
                    {/* Glowing hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* ENTIRE CARD CONTENT: Left / Right Split */}
                    <div className="flex flex-col md:flex-row relative z-10 min-h-[500px]">
                      
                      {/* Left Side: Text Content & Tags */}
                      <div className={`p-8 md:p-12 flex-1 flex flex-col justify-between order-2 md:order-1 ${(project as any).imageLink ? 'md:border-r border-white/10' : ''}`}>
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <h3 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                            <div className="flex gap-2 relative z-20 shrink-0 ml-4">
                              <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                                <Github size={20} />
                              </a>
                              {project.demo !== "#" && (
                                <a href={project.demo} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                                  <ExternalLink size={20} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">{project.description}</p>
                        </div>
                        
                        {/* Tags at bottom of left side */}
                        <div className="flex flex-wrap gap-2 mt-12">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary-foreground border border-primary/20 backdrop-blur-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Laptop Mockup & Features */}
                      {(project as any).imageLink && (
                        <div className="w-full md:w-[50%] lg:w-[55%] p-8 md:p-12 flex flex-col items-center justify-between bg-[#030305] order-1 md:order-2 relative overflow-hidden">
                          {/* Radial glow behind laptop */}
                          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[80px] rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          {/* Pure CSS Laptop Mockup */}
                          <div className="w-full max-w-[18rem] sm:max-w-md lg:max-w-lg relative z-10 group-hover:-translate-y-2 transition-transform duration-500 mb-10">
                            {/* Screen Bezel */}
                            <div className="relative bg-[#0a0a0f] border-[4px] sm:border-[6px] border-[#1a1a24] rounded-t-xl rounded-b-sm aspect-video overflow-hidden shadow-2xl">
                              {/* Camera dot */}
                              <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#050508] rounded-full z-20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"></div>
                              {/* Screen Image */}
                              <Image 
                                src={(project as any).imageLink} 
                                alt={project.title} 
                                fill 
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                              />
                            </div>
                            {/* Keyboard Base */}
                            <div className="relative w-[116%] -ml-[8%] h-3 sm:h-4 bg-gradient-to-b from-[#2a2a35] to-[#1a1a24] rounded-b-xl rounded-t-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex justify-center border-t border-white/10">
                              {/* Trackpad Indentation */}
                              <div className="w-1/4 h-1.5 sm:h-2 bg-[#15151e] rounded-b-md shadow-inner"></div>
                            </div>
                          </div>

                          {/* Features at bottom of right side */}
                          <div className="w-full relative z-10 mt-auto pt-6 border-t border-white/10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                              {project.features.map(feature => (
                                <div key={feature} className="flex items-start gap-3 text-sm md:text-base text-white/80">
                                  <CheckCircle className="text-primary shrink-0 mt-0.5" size={18} />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
