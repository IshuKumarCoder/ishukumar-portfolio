"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex Johnson",
    role: "CEO at TechStart",
    content: "Ishu delivered our SaaS platform ahead of schedule. His understanding of full-stack architecture and UI design is exceptional.",
    avatar: "/avatar.png"
  },
  {
    name: "Sarah Williams",
    role: "Product Manager",
    content: "The AI integration he built saved us hundreds of hours. A true professional who understands both code and business needs.",
    avatar: "/avatar.png"
  },
  {
    name: "Michael Chen",
    role: "Founder, LearnAI",
    content: "One of the best freelance developers I've worked with. The code quality and responsiveness of the application are world-class.",
    avatar: "/avatar.png"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-black/40 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
        </div>
      </div>

      {/* Auto-scrolling row */}
      <div className="relative w-full flex overflow-x-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-6 px-3"
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {/* Duplicate for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] flex-shrink-0 glass-panel p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 text-primary/20" size={40} />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.content}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
