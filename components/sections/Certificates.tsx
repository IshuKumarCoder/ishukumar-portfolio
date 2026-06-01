"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";

const CERTIFICATES = [
  {
    title: "Java Development",
    issuer: "Qspiders",
    image: "/certificates/java_cer_qspiders.jpeg",
  },
  {
    title: "Internship Completion",
    issuer: "Industry Training",
    image: "/certificates/internship_cer.jpeg",
  },
  {
    title: "ChatGPT & AI Tools",
    issuer: "Professional Certification",
    image: "/certificates/chatgpt_cer.jpeg",
  },
  {
    title: "Google Gemini",
    issuer: "AI Certification",
    image: "/certificates/gemini_cer.jpeg",
  },
  {
    title: "DeepSeek AI",
    issuer: "AI Certification",
    image: "/certificates/deepseek_cer.jpeg",
  },
  {
    title: "Jesper AI",
    issuer: "AI Certification",
    image: "/certificates/jesperai_cer.jpeg",
  },
  {
    title: "Google Veo",
    issuer: "Generative AI",
    image: "/certificates/veo_cer.jpeg",
  },
  {
    title: "Stable Diffusion",
    issuer: "Generative AI",
    image: "/certificates/stable_defusion_cer.jpeg",
  },
];

type Certificate = (typeof CERTIFICATES)[number];

function CertificateDialog({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-dialog-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Close certificate"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-white/10 shrink-0">
          <div>
            <h3
              id="certificate-dialog-title"
              className="text-lg sm:text-xl font-bold"
            >
              {certificate.title}
            </h3>
            <p className="text-sm text-primary">{certificate.issuer}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-primary/20 transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative flex-1 min-h-0 bg-black/40 p-4 sm:p-6 overflow-auto">
          <div className="relative w-full aspect-[4/3] sm:aspect-auto sm:min-h-[min(70vh,600px)]">
            <Image
              src={certificate.image}
              alt={`${certificate.title} certificate`}
              fill
              className="object-contain"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CertificateCard({
  certificate,
  onSelect,
}: {
  certificate: Certificate;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0 glass-panel rounded-2xl overflow-hidden text-left group border border-white/5 hover:border-primary/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-[4/3] bg-black/30 overflow-hidden">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Award className="text-primary mb-2" size={22} />
          <h4 className="font-bold text-sm sm:text-base leading-tight">
            {certificate.title}
          </h4>
          <p className="text-xs sm:text-sm text-primary/90 mt-0.5">
            {certificate.issuer}
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view full certificate
          </p>
        </div>
      </div>
    </button>
  );
}

export const Certificates = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);

  const closeDialog = useCallback(() => setSelected(null), []);

  const marqueeItems = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <section
      id="certificates"
      className="py-12 md:py-24 bg-black/40 border-y border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Certificates</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Professional credentials and certifications. Select a card to view
            the full certificate.
          </p>
        </div>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div
          className="flex gap-6 px-3 animate-marquee"
          style={{ width: "fit-content", willChange: "transform" }}
        >
          {marqueeItems.map((certificate, i) => (
            <CertificateCard
              key={`${certificate.image}-${i}`}
              certificate={certificate}
              onSelect={() => setSelected(certificate)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <CertificateDialog certificate={selected} onClose={closeDialog} />
        )}
      </AnimatePresence>
    </section>
  );
};
