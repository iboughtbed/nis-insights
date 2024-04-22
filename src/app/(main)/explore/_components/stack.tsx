"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import * as React from "react";

export function Stack() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const [currentSection, setCurrentSection] = React.useState(1);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const firstOpacity = useTransform(scrollYProgress, [0, 0.3, 0.31], [1, 1, 0]);
  const secondOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.33, 0.7, 0.71],
    [0, 1, 1, 0],
  );
  const thirdOpacity = useTransform(scrollYProgress, [0.72, 0.8, 1], [0, 1, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.31) {
      setCurrentSection(1);
    } else if (latest >= 0.31 && latest < 0.71) {
      setCurrentSection(2);
    } else {
      setCurrentSection(3);
    }
  });

  return (
    <div ref={ref} className="hidden gap-16 md:flex">
      <div className="flex-1">
        <div className="sticky left-0 top-0 flex h-screen items-center">
          <div>
            <h5 className="mb-4 text-sm font-semibold tracking-tighter text-[#a594fd] max-md:text-center">
              INSIGHTS
            </h5>
            <div>
              <h3 className="mb-4 text-3xl font-semibold max-md:text-center md:text-4xl lg:text-5xl xl:text-7xl">
                Find inspiration.
                <br />
                Insights for you.
              </h3>
              <p className="font-light text-muted-foreground max-md:text-balance max-md:text-center md:pr-[30%]">
                You can explore fresh ideas alongside our rapidly expanding
                group of members.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500vh] flex-1">
        <div className="sticky left-0 top-0 flex h-screen items-center">
          <motion.div
            style={{ opacity: firstOpacity }}
            className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
          >
            <div className="w-full rounded-3xl bg-[#101010]">
              <div className="flex flex-col items-center px-10 py-16 text-center">
                <h3 className="mb-4 text-3xl font-semibold">
                  Read articles from <br /> our authors
                </h3>
                <p className="max-w-xs font-light text-muted-foreground max-md:text-balance">
                  Find every category, community, guides, insights and much more
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: secondOpacity }}
            className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
          >
            <div className="w-full rounded-3xl bg-[#101010]">
              <div className="flex flex-col items-center px-10 py-16 text-center">
                <h3 className="mb-4 text-3xl font-semibold">
                  See what you&apos;re missing
                </h3>
                <p className="max-w-xs font-light text-muted-foreground max-md:text-balance">
                  Find every category, community, guides, insights and much more
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: thirdOpacity }}
            className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
          >
            <div className="w-full rounded-3xl bg-[#101010]">
              <div className="flex flex-col items-center px-10 py-16 text-center">
                <h3 className="mb-4 text-3xl font-semibold">
                  Read our blog <br />
                  and watch us grow
                </h3>
                <p className="max-w-xs font-light text-muted-foreground max-md:text-balance">
                  Latest and fresh news about recent events in our school
                </p>
              </div>
            </div>
          </motion.div>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <span className="text-xs opacity-40">0{currentSection}</span>
            <div className="relative h-[400px] w-1 overflow-hidden rounded-full bg-[#232323]">
              <motion.span
                style={{ height: progressHeight }}
                className="absolute left-0 top-0 w-full rounded-full bg-[#A594FD]"
              ></motion.span>
            </div>
            <span className="text-xs opacity-40">03</span>
          </div>
        </div>
      </div>
    </div>
  );
}
