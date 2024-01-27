"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  variants?: {
    hidden?: {
      opacity?: number;
      x?: number;
      y?: number;
    };
    visible?: {
      opacity?: number;
      x?: number;
      y?: number;
    };
  };
  transition?: {
    duration?: number;
    delay?: number;
  };
}

export function Reveal({ children, variants, transition }: RevealProps) {
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
    <div ref={ref} className="relative overflow-hidden">
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
