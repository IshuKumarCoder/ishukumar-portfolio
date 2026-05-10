"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Github, Linkedin, FileText } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4 md:px-0">
            Have a project in mind or want to discuss opportunities? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 w-full"
          >
            <div className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <a href="mailto:ishukumarishu786@gmail.com" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:neon-shadow transition-all shrink-0">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="overflow-hidden min-w-0">
                    <div className="font-medium text-foreground text-sm sm:text-base">Email</div>
                    <div className="truncate text-xs sm:text-sm">ishukumarishu786@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:neon-shadow transition-all shrink-0">
                    <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm sm:text-base">WhatsApp</div>
                    <div className="text-xs sm:text-sm">Contact Me</div>
                  </div>
                </a>
              </div>

              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Social Profiles</h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a href="https://github.com/IshuKumarCoder" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors">
                    <Github size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/ishu-kumar-460996229/" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors">
                    <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a href="/resume/ishu-kumar-(M1).pdf" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium pr-4 sm:pr-5">
                    <FileText size={18} className="sm:w-5 sm:h-5" />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full"
          >
            <form className="glass-panel p-5 sm:p-6 md:p-8 rounded-2xl space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-white/70">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white text-sm sm:text-base" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-white/70">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white text-sm sm:text-base" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-white/70">Project Type</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white appearance-none text-sm sm:text-base">
                  <option>Full Stack Development</option>
                  <option>AI Integration</option>
                  <option>SaaS Development</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium text-white/70">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white resize-none text-sm sm:text-base" placeholder="Tell me about your project..." />
              </div>

              <AnimatedButton variant="primary" className="w-full flex gap-2 justify-center mt-2">
                Send Message <Send size={18} className="sm:w-5 sm:h-5" />
              </AnimatedButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
