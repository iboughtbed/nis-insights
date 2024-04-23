"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { AspectRatio } from "~/components/ui/aspect-ratio";

export function HeroImage() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, -50]);

  return (
    <div ref={ref} className="relative pb-10 pt-16">
      <div className="relative mx-auto flex flex-col items-center">
        <div className="w-full max-w-screen-xl [perspective:800px]">
          <motion.div style={{ rotateX }}>
            <AspectRatio ratio={1600 / 960}>
              <Image
                src="/images/hero-image.png"
                alt=""
                className="rounded-xl object-cover"
                sizes="(max-width: 768px) 90vw, 80vw"
                priority
                fill
              />
            </AspectRatio>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
