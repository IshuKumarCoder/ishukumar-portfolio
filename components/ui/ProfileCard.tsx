"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TiltCard } from "./TiltCard";
import { Code2, Sparkles, Terminal, VolumeX } from "lucide-react";

const INTRO_VIDEO_SRC = "/introvideo/intro.mp4";
const PROFILE_POSTER = "/profile_pic.png";

type ProfileCardProps = {
  /** Tighter layout for the mobile section between Hero and About */
  compact?: boolean;
};

export const ProfileCard = ({ compact = false }: ProfileCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || userPausedRef.current) return;

    video.volume = 1;
    video.muted = false;
    try {
      await video.play();
      setIsPlaying(true);
      setIsMuted(false);
      return;
    } catch {
      // Browsers block audible autoplay until the page has been interacted with
    }

    video.muted = true;
    try {
      await video.play();
      setIsPlaying(true);
      setIsMuted(true);
    } catch {
      // Playback blocked entirely; cover image stays visible
    }
  }, []);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mobile: autoplay when profile card or About section is in view
  useEffect(() => {
    if (!isCoarsePointer) return;

    const targets = [mediaRef.current, document.getElementById("about")].filter(
      Boolean,
    ) as Element[];

    if (targets.length === 0) return;

    const visible = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }

        if (visible.size > 0) {
          void playVideo();
        } else {
          userPausedRef.current = false;
          pauseVideo();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [isCoarsePointer, playVideo, pauseVideo]);

  const handleMouseEnter = () => {
    if (isCoarsePointer) return;
    userPausedRef.current = false;
    void playVideo();
  };

  const handleMouseLeave = () => {
    if (isCoarsePointer) return;
    userPausedRef.current = false;
    pauseVideo();
  };

  const handleClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      // A click counts as the gesture that unlocks audio
      if (video.muted) {
        video.muted = false;
        video.volume = 1;
        setIsMuted(false);
        return;
      }

      userPausedRef.current = true;
      pauseVideo();
      return;
    }

    userPausedRef.current = false;
    video.volume = 1;
    video.muted = false;
    try {
      await video.play();
      setIsPlaying(true);
      setIsMuted(false);
    } catch {
      // Ignore play failures from gesture/policy
    }
  };

  return (
    <div
      className={`relative w-full mx-auto z-10 perspective-1000 ${
        compact ? "max-w-full" : "max-w-md"
      }`}
    >
      <TiltCard className="w-full relative rounded-full">
        {/* Animated Cyberpunk Glow Behind */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-primary via-accent to-purple-600 blur-2xl opacity-60 pointer-events-none"
        />

        {/* Rotating Tech Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="absolute inset-[-4px] rounded-full border-2 border-dashed border-primary/40 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="absolute inset-[-16px] rounded-full border border-accent/20 pointer-events-none"
        />

        {/* Profile media: image cover + intro video */}
        <div
          ref={mediaRef}
          role="button"
          tabIndex={0}
          aria-label={
            isPlaying
              ? isMuted
                ? "Turn on intro video sound"
                : "Pause intro video"
              : "Play intro video with sound"
          }
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              void handleClick();
            }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white/5 glass shadow-[0_0_40px_rgba(139,92,246,0.3)] cursor-pointer select-none"
        >
          {/* Holographic Scan Effect */}
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-accent/40 to-transparent z-20 pointer-events-none"
          />

          <video
            ref={videoRef}
            src={INTRO_VIDEO_SRC}
            poster={PROFILE_POSTER}
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
            className="absolute inset-0 h-full w-full object-cover object-center scale-100 transition-transform duration-700 ease-out filter contrast-125 saturate-110"
          />

          {/* Same profile cover while paused */}
          <Image
            src={PROFILE_POSTER}
            alt="Ishu Kumar - Full Stack Developer"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-top scale-[1.3] transition-opacity duration-500 ease-out filter contrast-125 saturate-110 pointer-events-none ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Shown only when the browser blocked audio until a click */}
          {isPlaying && isMuted && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md z-20 pointer-events-none">
              <VolumeX size={12} />
              Tap for sound
            </div>
          )}
        </div>

        {/* Floating "Available" Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap glass-panel px-4 py-2 rounded-full border border-green-500/30 flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)] z-30 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-400 tracking-wider uppercase">Open to Freelance</span>
        </motion.div>

        {/* Floating Code Stats */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className={`absolute glass-panel p-2 sm:p-3 rounded-2xl border border-primary/30 shadow-lg z-30 pointer-events-none ${
            compact
              ? "top-6 left-0 sm:top-12 sm:-left-4"
              : "top-12 -left-6"
          }`}
        >
          <Code2 className="text-primary mb-1" size={compact ? 16 : 20} />
          <div className="text-[9px] sm:text-[10px] font-bold uppercase text-white/80">Java Mastery</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ willChange: "transform" }}
          className={`absolute glass-panel p-2 sm:p-3 rounded-2xl border border-accent/30 shadow-lg z-30 pointer-events-none ${
            compact
              ? "top-20 right-0 sm:top-32 sm:-right-6"
              : "top-32 -right-8"
          }`}
        >
          <Sparkles className="text-accent mb-1" size={compact ? 16 : 20} />
          <div className="text-[9px] sm:text-[10px] font-bold uppercase text-white/80">AI Architect</div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform" }}
          className={`absolute glass-panel p-2 sm:p-3 rounded-2xl border border-purple-500/30 shadow-lg z-30 pointer-events-none ${
            compact
              ? "bottom-20 left-0 sm:bottom-24 sm:-left-6"
              : "bottom-24 -left-8"
          }`}
        >
          <Terminal className="text-purple-400 mb-1" size={compact ? 16 : 20} />
          <div className="text-[9px] sm:text-[10px] font-bold uppercase text-white/80">Next.js Expert</div>
        </motion.div>
      </TiltCard>
    </div>
  );
};
