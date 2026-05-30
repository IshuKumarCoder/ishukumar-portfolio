"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle } from "lucide-react";
import Image from "next/image";

import { TiltCard } from "@/components/ui/TiltCard";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    title: "Mind Magnet – AI Learning Platform",
    description:
      "A futuristic AI-powered gamified learning platform with dynamic curriculum generation and adaptive learning.",
    features: [
      "AI Curriculum Generator",
      "Dynamic Learning Levels",
      "Gamification System",
      "Localized Content",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "AI APIs"],
    github: "https://github.com/IshuKumarCoder/MindMagnet",
    demo: "https://mind-magnet-three.vercel.app/",
    imageLink: "/projectimages/mindmagnet.png",
  },
  {
    title: "Xilvar",
    description:
      "A website for scrap the precious metals price form intrenet and show on website in chart format. Also sell the unique coins of gold and silver",
    features: [
      "Dynamic Content",
      "Responsive Design",
      "Dynamic Precius metals price according to location",
      "scraping precius metal prices using playwright and cheerio",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright", "cheerio"],
    github: "https://github.com/IshuKumarCoder/xilvar",
    imageLink: "/projectimages/xilvar.png",
  },
  {
    title: "Marbleliza - Marble Portfolio",
    description:
      "Portfolio website for Marbleliza company. Admin can add and remove products and see the requests of customers. Users can request for products and admin will get the request in their dashboard. It is a buisness website for marble company.",
    features: [
      "Dynamic Content",
      "Responsive Design",
      "Project Showcases",
      "Client Testimonials",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/IshuKumarCoder/Marbleliza",
    demo: "https://www.marbleliza.com/",
    imageLink: "/projectimages/marbliza.png",
  },
  {
    title: "Car Rental System",
    description:
      "A scalable car rental platform with smart filtering and real-time booking workflows.",
    features: [
      "JWT Authentication",
      "Smart Car Search",
      "Personalized Recommendations",
      "Real-time Rental Mgmt",
    ],
    tags: ["React.js", "Express.js", "Node.js", "MongoDB"],
    github: "https://github.com/IshuKumarCoder",
    imageLink: "/projectimages/carRental.png",
    demo: "#",
  },
  {
    title: "Smart Contact Management System",
    description:
      "A scalable smart contact manager where users can create accounts and manage contacts securely.",
    features: [
      "Google & GitHub OAuth",
      "OTP Authentication",
      "Secure Dashboard",
      "Optimized SQL Queries",
    ],
    tags: ["Java", "Spring Boot", "SQL", "Thymeleaf"],
    github: "https://github.com/IshuKumarCoder",
    imageLink: "/projectimages/smartcon.png",
    demo: "#",
  },
];

type Project = (typeof PROJECTS)[number];

function ProjectCardContent({ project }: { project: Project }) {
  const hasImage = Boolean(project.imageLink);

  return (
    <TiltCard className="group rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col relative cursor-pointer shadow-2xl border border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col md:flex-row relative z-10 min-h-0 md:min-h-[480px]">
        <div
          className={cn(
            "p-4 sm:p-6 md:p-12 flex-1 flex flex-col justify-between order-2 md:order-1",
            hasImage && "md:border-r border-white/10",
          )}
        >
          <div>
            <div className="flex justify-between items-start gap-2 mb-2 sm:mb-4 md:mb-6">
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <div className="flex gap-1.5 sm:gap-2 relative z-20 shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 sm:p-2 bg-white/5 rounded-full hover:bg-primary transition-colors"
                >
                  <Github size={18} className="sm:w-5 sm:h-5" />
                </a>
                {"demo" in project && project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 sm:p-2 bg-white/5 rounded-full hover:bg-primary transition-colors"
                  >
                    <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base md:text-xl leading-snug sm:leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-8 md:mt-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-xs md:text-sm font-medium px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full bg-primary/10 text-primary-foreground border border-primary/20 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {hasImage && (
          <div className="w-full md:w-[50%] lg:w-[55%] p-4 sm:p-6 md:p-12 flex flex-col items-center justify-between bg-[#030305] order-1 md:order-2 relative overflow-hidden">
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[80px] rounded-full pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-full max-w-[11rem] sm:max-w-[14rem] md:max-w-md lg:max-w-lg relative z-10 group-hover:-translate-y-2 transition-transform duration-500 mb-3 sm:mb-6 md:mb-10">
              <div className="relative bg-[#0a0a0f] border-[3px] sm:border-[4px] md:border-[6px] border-[#1a1a24] rounded-t-lg sm:rounded-t-xl rounded-b-sm aspect-video overflow-hidden shadow-2xl">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#050508] rounded-full z-20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
                <Image
                  src={project.imageLink!}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 40vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative w-[116%] -ml-[8%] h-2.5 sm:h-3 md:h-4 bg-gradient-to-b from-[#2a2a35] to-[#1a1a24] rounded-b-lg sm:rounded-b-xl rounded-t-[2px] shadow-[0_12px_24px_rgba(0,0,0,0.8)] md:shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex justify-center border-t border-white/10">
                <div className="w-1/4 h-1 sm:h-1.5 md:h-2 bg-[#15151e] rounded-b-md shadow-inner" />
              </div>
            </div>

            <div className="w-full relative z-10 pt-2 sm:pt-4 md:pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 md:gap-y-4 gap-x-4 md:gap-x-6">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-white/80"
                  >
                    <CheckCircle className="text-primary shrink-0 mt-0.5" size={14} />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

const STACK_ITEM_CLASS =
  "h-auto min-h-0 my-0 p-0 rounded-none shadow-none bg-transparent max-w-6xl mx-auto w-full";

export const Projects = () => {
  return (
    <section id="projects" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            A showcase of my recent work, highlighting technical complexity and beautiful design.
          </p>
        </motion.div>
      </div>

      <ScrollStack
        innerClassName="pt-2 sm:pt-4 pb-[40rem] sm:pb-[46rem] md:pb-[52rem] px-4 sm:px-6 md:px-12 max-w-7xl mx-auto"
        itemDistance={100}
        itemStackDistance={30}
        stackPosition="18%"
        scaleEndPosition="10%"
        baseScale={0.88}
        itemScale={0.035}
        blurAmount={2}
      >
        {PROJECTS.map((project) => (
          <ScrollStackItem key={project.title} itemClassName={STACK_ITEM_CLASS}>
            <ProjectCardContent project={project} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};
