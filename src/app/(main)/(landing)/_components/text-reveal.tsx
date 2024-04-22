"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as React from "react";

interface TextRevealProps {
  children: string;
}

export function TextReveal({ children }: TextRevealProps) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "end 1.1"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className="relative pb-10 pt-20 md:pt-40">
      <div className="relative h-[200vh]">
        <div className="sticky left-0 top-0 flex h-1/2 items-center md:px-20">
          <div className="max-w-screen-lg md:ml-8">
            <div className="relative">
              <p className="flex flex-wrap text-3xl font-semibold md:text-6xl">
                {words.map((word, index) => {
                  const start = index / words.length;
                  const end = start + 1 / words.length;

                  return (
                    <Word
                      key={index}
                      range={[start, end]}
                      progress={scrollYProgress}
                    >
                      {word}
                    </Word>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WordProps {
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-3 mt-3">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
