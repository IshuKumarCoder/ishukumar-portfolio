"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

import { MagneticWrapper } from "@/components/ui/MagneticWrapper";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = "primary", className, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 neon-shadow",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-primary/50 text-primary hover:bg-primary/10",
      ghost: "hover:bg-accent/10 text-accent-foreground",
    };

    return (
      <MagneticWrapper>
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            className
          )}
          {...props}
        >
          {children}
        </motion.button>
      </MagneticWrapper>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";
