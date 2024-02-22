"use client";

import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

interface CoverRevealProps {
  children: React.ReactNode;
  mainVariants?: Variants;
  slideVariants?: Variants;
  slideColor?: string;
}

export function CoverReveal({
  children,
  mainVariants,
  slideVariants,
  slideColor,
}: CoverRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void mainControls.start("visible");
      void slideControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={
          mainVariants ?? {
            hidden: {
              opacity: 0,
              y: 75,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }
        }
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={
          slideVariants ?? {
            hidden: { left: 0 },
            visible: { left: "100%" },
          }
        }
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className={cn(
          "absolute bottom-1 left-0 right-0 top-1 z-20 bg-purple-600",
          slideColor,
        )}
      ></motion.div>
    </div>
  );
}
