"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useEffect, useState } from "react";

const SERVICES = [
  "Full Stack Web Development",
  "SaaS Application Development",
  "AI Integration Services",
  "REST API Development",
  "Admin Dashboard Development",
  "Next.js Development",
  "Java Backend Development",
  "MongoDB Database Design",
  "Responsive UI Development",
  "Portfolio & Business Website Development"
];

const Counter = ({ end, label }: { end: number, label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{count}+</div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const Freelance = () => {
  return (
    <section id="freelance" className="py-12 md:py-24 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">Transform</span> Your Ideas?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I specialize in turning complex problems into elegant, scalable solutions. Whether you need a full-stack web application, a custom AI integration, or a modern SaaS platform, I deliver results that exceed expectations.
            </p>
            
            <div className="space-y-4 mb-8">
              {SERVICES.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-primary" size={20} />
                  <span className="font-medium">{service}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact"><AnimatedButton variant="primary" className="w-full md:w-auto">Start a Project</AnimatedButton></a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 md:p-12 rounded-3xl"
          >
            <div className="grid grid-cols-2 gap-8 gap-y-12">
              <Counter end={50} label="Projects Completed" />
              <Counter end={30} label="Technologies Used" />
              <Counter end={100} label="Client Satisfaction" />
              <Counter end={1000} label="Learning Hours" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
