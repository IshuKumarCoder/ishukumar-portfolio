"use client";

import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ui/ProfileCard";

export const HeroProfileMobile = () => {
  return (
    <section
      aria-label="Profile photo"
      className="lg:hidden relative z-10 w-full overflow-x-clip"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="container mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 flex justify-center"
      >
        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
          <ProfileCard compact />
        </div>
      </motion.div>
    </section>
  );
};
