"use client";

import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "~/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  transition?: {
    duration?: number;
    delay?: number;
  };
}

export function Reveal({
  children,
  className,
  variants,
  transition,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void mainControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={
          variants ?? {
            hidden: { opacity: 0, x: -75 },
            visible: { opacity: 1, x: 0 },
          }
        }
        initial="hidden"
        animate={mainControls}
        transition={transition ?? { duration: 0.5, delay: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
