"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import * as React from "react";

import { StackItem } from "./shared";

export function Stack() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const [currentSection, setCurrentSection] = React.useState(1);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) {
      setCurrentSection(1);
    } else if (latest >= 0.3 && latest < 0.7) {
      setCurrentSection(2);
    } else {
      setCurrentSection(3);
    }
  });

  return (
    <div ref={ref} className="relative hidden gap-8 px-16 md:flex 2xl:gap-16">
      <div className="flex-1">
        <div className="sticky left-0 top-0 flex h-screen items-center">
          <div>
            <h5 className="mb-4 text-sm font-semibold tracking-tighter text-[#a594fd] max-md:text-center">
              INSIGHTS
            </h5>
            <div>
              <h3 className="mb-4 text-3xl font-semibold max-md:text-center md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                Discover at <br /> the speed <br /> of thought.
              </h3>
              <p className="pr-[30%] font-light text-muted-foreground max-md:text-balance max-md:text-center">
                You can explore fresh ideas alongside our rapidly expanding
                group of members.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500vh] flex-1">
        <div className="sticky left-0 top-0 flex h-screen items-center">
          {currentSection === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 250 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                stiffness: 1000,
                damping: 100,
              }}
              className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
            >
              <StackItem
                title="Read articles from our authors"
                description="Find every category, community, guides, insights and much more"
                link={{
                  href: "/articles",
                  title: "Read Articles",
                }}
              />
            </motion.div>
          )}

          {currentSection === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 250 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                stiffness: 1000,
                damping: 100,
              }}
              className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
            >
              <StackItem
                title="See what you're missing"
                description="Latest and fresh news about recent events in our school"
                link={{
                  href: "/releases",
                  title: "Read Releases",
                }}
              />
            </motion.div>
          )}

          {currentSection === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 250 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                stiffness: 1000,
                damping: 100,
              }}
              className="absolute left-0 top-0 flex h-full w-full items-center pr-16"
            >
              <StackItem
                title="Read our blog and watch us grow"
                description="We will be sharing our progress and impact on school community"
                link={{
                  href: "/blog",
                  title: "Read Blog",
                }}
              />
            </motion.div>
          )}

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <span className="text-xs opacity-40">0{currentSection}</span>
            <div className="relative h-[300px] w-1 overflow-hidden rounded-full bg-[#232323]">
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
