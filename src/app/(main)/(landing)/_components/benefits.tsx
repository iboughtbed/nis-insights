"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { AspectRatio } from "~/components/ui/aspect-ratio";

export function Benefits() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  // const translateX = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
  // const translateY = useTransform(scrollYProgress, [0, 0.4], [20, 0]);

  const lowY = useSpring(
    useTransform(scrollYProgress, (latest) => latest * 120),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  const lowMidY = useSpring(
    useTransform(scrollYProgress, (latest) => latest * 80),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  // const highMidY = useSpring(
  //   useTransform(scrollYProgress, (latest) => latest * -80),
  //   {
  //     stiffness: 500,
  //     damping: 90,
  //   },
  // );

  const highY = useSpring(
    useTransform(scrollYProgress, (latest) => latest * -120),
    {
      stiffness: 1000,
      damping: 100,
    },
  );

  const blocksY = useSpring(
    useTransform(scrollYProgress, (latest) => latest * -240),
    {
      stiffness: 1000,
      damping: 100,
    },
  );

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen px-4 pb-10 pt-20 md:pt-40"
    >
      <div className="hidden md:block">
        <div className="pl-40">
          <div className="mb-4 flex items-center gap-1 text-[#a594fd]">
            <Sparkle className="size-4" />
            <h4>Find new content</h4>
          </div>
          <h2 className="text-7xl font-semibold tracking-tight">
            A new, easy
            <br />
            way to discover
          </h2>
        </div>
        <div className="-mx-60 grid grid-cols-6 gap-6">
          <div>
            <motion.div
              style={{
                y: highY,
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <motion.div style={{ opacity, scale }}>
                  <AspectRatio ratio={825 / 660}>
                    <Image
                      src="/images/benefits/analytics.png"
                      alt=""
                      className="rounded-xl object-cover"
                      fill
                    />
                  </AspectRatio>
                </motion.div>
              </div>
              <div>
                <AspectRatio ratio={825 / 1140}>
                  <Image
                    src="/images/benefits/poll.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
          <div className="mt-20">
            <motion.div style={{ y: lowMidY }} className="flex flex-col gap-6">
              <div>
                <AspectRatio ratio={825 / 1140}>
                  <Image
                    src="/images/benefits/inspiration-board.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
              <div>
                <AspectRatio ratio={552 / 130}>
                  <Image
                    src="/images/benefits/figma.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
          <div className="mt-36">
            <motion.div style={{ y: lowY }} className="flex flex-col gap-6">
              <div>
                <AspectRatio ratio={552 / 482}>
                  <Image
                    src="/images/benefits/views.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
          <div className="mt-24">
            <motion.div style={{ y: highY }} className="flex flex-col gap-6">
              <div>
                <AspectRatio ratio={825 / 192}>
                  <Image
                    src="/images/benefits/roadmap.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
              <div>
                <AspectRatio ratio={825 / 720}>
                  <Image
                    src="/images/benefits/kanye.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
          <div className="-mt-48">
            <motion.div
              style={{ y: lowMidY, width: "100%" }}
              className="flex flex-col gap-6"
            >
              <div className="w-full">
                <motion.div style={{ scale, opacity }}>
                  <AspectRatio ratio={825 / 780}>
                    <Image
                      src="/images/benefits/stats.png"
                      alt=""
                      className="rounded-xl object-cover"
                      fill
                    />
                  </AspectRatio>
                </motion.div>
              </div>
              <div>
                <AspectRatio ratio={825 / 1140}>
                  <Image
                    src="/images/benefits/timeline.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
          <div className="-mt-32">
            <motion.div style={{ y: lowY }} className="flex flex-col gap-6">
              <div>
                <AspectRatio ratio={825 / 1140}>
                  <Image
                    src="/images/benefits/mission.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
              <div>
                <AspectRatio ratio={550 / 480}>
                  <Image
                    src="/images/benefits/announcement.png"
                    alt=""
                    className="rounded-xl object-cover"
                    fill
                  />
                </AspectRatio>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <div>
          <div>
            <AspectRatio ratio={1179 / 2304}>
              <Image
                src="/images/benefits/blocks.png"
                alt=""
                className="rounded-xl object-cover"
                fill
              />
            </AspectRatio>
          </div>
          <div className="absolute left-1/2 top-3/4 w-full -translate-x-1/2 -translate-y-3/4">
            <motion.div style={{ y: blocksY }}>
              <AspectRatio ratio={1020 / 600}>
                <Image
                  src="/images/benefits/discover.png"
                  alt=""
                  className="rounded-xl object-cover"
                  fill
                />
              </AspectRatio>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
