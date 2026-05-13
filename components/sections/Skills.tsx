"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript ES6+", level: 95 },
      { name: "TypeScript", level: 90 },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5 / CSS3", level: 90 },
    ]
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js / Express.js", level: 85 },
      { name: "Spring Boot", level: 85 },
      { name: "MongoDB", level: 90 },
      { name: "SQL", level: 85 },
    ]
  },
  {
    title: "AI, Automation & DevOps",
    skills: [
      { name: "n8n (Workflow Automation)", level: 90 },
      { name: "Ollama / Qwen", level: 85 },
      { name: "Agentic AI / Integrations", level: 85 },
      { name: "Git / GitHub", level: 95 },
      { name: "Vercel / AWS EC2", level: 80 },
    ]
  }
];

const ICONS = [
  "/techicons/reactjs.png",
  "/techicons/nextjs-light.png",
  "/techicons/typescript.png",
  "/techicons/javascript.png",
  "/techicons/html5.png",
  "/techicons/css3.png",
  "/techicons/tailwind.png",
  "/techicons/nodejs-alt.png",
  "/techicons/java.png",
  "/techicons/springboot-initializer.png",
  "/techicons/mongodb.png",
  "/techicons/azure-sql-db.png",
  "/techicons/redis.png",
  "/techicons/aws-light.png",
  "/techicons/vercel-light.png",
  "/techicons/git.png",
  "/techicons/github.png",
  "/techicons/openai.png",
  "/techicons/claudecode-color.png",
  "/techicons/cursor.png",
  "/techicons/intellij.png",
  "/techicons/vscode.png",
  "/techicons/postman.png",
  "/techicons/antigravity-color.svg",
  "/techicons/leetcode.png",
  "/techicons/bootstrap.png",
  "/techicons/ollama.png",
];

const ICONS_SET = [...ICONS, ...ICONS, ...ICONS, ...ICONS];
const REVERSED_ICONS_SET = [...ICONS].reverse();
const REVERSED_ICONS_SET_FULL = [...REVERSED_ICONS_SET, ...REVERSED_ICONS_SET, ...REVERSED_ICONS_SET, ...REVERSED_ICONS_SET];

export const Skills = () => {
  return (
    <section id="skills" className="py-12 md:py-24 bg-black/50 relative border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building scalable, modern, and intelligent applications.
          </p>
        </motion.div>

        {/* Infinite Scrolling Tech Marquee */}
        <div className="relative w-full overflow-hidden mb-20 flex flex-col gap-6 py-4 border-y border-white/10 bg-black/20">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Upper Row: Right to Left */}
          <div className="flex gap-8 whitespace-nowrap px-4 animate-marquee w-max group" style={{ animationDuration: '120s' }}>
            {ICONS_SET.map((icon, idx) => (
              <div 
                key={`upper-${idx}`} 
                className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 glass-panel p-3 md:p-4 rounded-2xl flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all cursor-pointer"
              >
                <img src={icon} alt="Tech Icon" className={`w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity ${(icon.includes('github')|| icon.includes('ollama') || icon.includes('openai') || icon.includes('cursor')) ? 'invert' : ''}`} />
              </div>
            ))}
          </div>

          {/* Lower Row: Left to Right */}
          <div className="flex gap-8 whitespace-nowrap px-4 animate-marquee w-max group" style={{ animationDuration: '120s', animationDirection: 'reverse' }}>
            {REVERSED_ICONS_SET_FULL.map((icon, idx) => (
              <div 
                key={`lower-${idx}`} 
                className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 glass-panel p-3 md:p-4 rounded-2xl flex items-center justify-center hover:scale-110 hover:bg-white/10 transition-all cursor-pointer"
              >
                <img src={icon} alt="Tech Icon" className={`w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity ${(icon.includes('github') || icon.includes('ollama')|| icon.includes('openai') || icon.includes('cursor')) ? 'invert' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent relative"
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
