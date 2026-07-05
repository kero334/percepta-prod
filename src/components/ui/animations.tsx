"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Extremely fast transition (150ms-250ms) as requested for responsiveness
export const transition: any = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
};

export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const MotionSection = motion.create("section");

export function AnimatedSection({ children, className, delay = 0, as = "section", id }: { children: ReactNode; className?: string; delay?: number, as?: any, id?: string }) {
  const Component = as === "section" ? MotionSection : motion.create(as as any);
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...transition, delay }}
    >
      {children}
    </Component>
  );
}

const MotionDiv = motion.create("div");

export function FadeInView({ children, className, delay = 0, as = "div" }: { children: ReactNode; className?: string; delay?: number; as?: any }) {
  const Component = as === "div" ? MotionDiv : motion.create(as as any);
  return (
    <Component
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...transition, delay }}
    >
      {children}
    </Component>
  );
}

export function StaggerContainer({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: transition
        },
      }}
    >
      {children}
    </motion.div>
  );
}
