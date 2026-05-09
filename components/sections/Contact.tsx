"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Github, Linkedin, FileText } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8 w-full"
          >
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <a href="mailto:ishukumarishu786@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:neon-shadow transition-all shrink-0">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-medium text-foreground">Email</div>
                    <div className="truncate">ishukumarishu786@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:neon-shadow transition-all shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <div>Contact Me</div>
                  </div>
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <h4 className="font-medium mb-4">Social Profiles</h4>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/IshuKumarCoder" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/ishu-kumar-460996229/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="/resume/ishu-kumar-(M1).pdf" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-primary/20 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium pr-5">
                    <FileText size={20} />
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
            <form className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Project Type</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white appearance-none">
                  <option>Full Stack Development</option>
                  <option>AI Integration</option>
                  <option>SaaS Development</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Message</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-white resize-none" placeholder="Tell me about your project..." />
              </div>

              <AnimatedButton variant="primary" className="w-full flex gap-2 justify-center">
                Send Message <Send size={16} />
              </AnimatedButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
