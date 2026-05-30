import { Hero } from "@/components/sections/Hero";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Freelance } from "@/components/sections/Freelance";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <section className="lg:hidden container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex justify-center overflow-x-clip">
        <ProfileCard className="max-w-[min(100%,20rem)] sm:max-w-md" />
      </section>
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Skills /></ScrollReveal>
      <ScrollReveal><Projects /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><Achievements /></ScrollReveal>
      <ScrollReveal><Freelance /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </div>
  );
}
