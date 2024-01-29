import Image from "next/image";
import Link from "next/link";

import heroImage3 from "public/images/colorful-mess-2.webp";
import heroImage2 from "public/images/colorful-mess.webp";
import heroImage1 from "public/images/dont-close-your-eyes.webp";
import heroImage4 from "public/images/history-of-paper.webp";

import articlesShowcase1 from "public/images/articles-showcase-1-lower.png";
import articlesShowcase2 from "public/images/articles-showcase-2-lower.png";

import teamPhoto from "public/images/team-photo.webp";

import { AnimatedButton } from "~/components/animated-button";
import { Reveal } from "~/components/motion/reveal";
import { Shell } from "~/components/shells/shell";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export default function HomePage() {
  return (
    <Shell>
      <Reveal>
        <section className="flex h-screen flex-col flex-nowrap gap-8 md:flex-row md:justify-between">
          <div className="shrink-0 text-center md:w-1/2 md:text-left">
            <h1 className="relative bg-[url('/images/animated-10.webp')] bg-cover bg-clip-text bg-[50%] bg-no-repeat text-6xl font-extrabold uppercase text-transparent lg:text-7xl xl:text-8xl">
              <span>NIS</span>
              <br />
              <span>Insights</span>
            </h1>
            <p className="pt-6 text-foreground/80">{siteConfig.description}</p>
            <div className="flex flex-col items-center gap-4 pt-6 md:flex-row">
              <AnimatedButton href="/releases">
                Read our latest release
              </AnimatedButton>
              <AnimatedButton
                href="/articles"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                )}
              >
                Explore
              </AnimatedButton>
            </div>
          </div>
          <div className="relative md:w-1/2">
            <div className="absolute inset-0 z-[3] bg-gradient-to-b from-background to-background/40 md:bg-gradient-to-r" />
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="col-span-2">
                <Image
                  alt="hero image"
                  src={heroImage1}
                  className="aspect-[2] h-full w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div className="col-span-1">
                <Image
                  alt="hero image"
                  src={heroImage2}
                  className="aspect-[1] h-full w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </div>
              <div className="col-span-1">
                <Image
                  alt="hero image"
                  src={heroImage3}
                  className="aspect-[1] h-full w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </div>
              <div className="col-span-2">
                <Image
                  alt="hero image"
                  src={heroImage4}
                  className="aspect-[2] h-full w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <section className="flex h-screen flex-col flex-nowrap gap-8 lg:flex-row-reverse lg:justify-between lg:gap-12">
          <div className="shrink-0 text-center lg:w-1/2 lg:text-left">
            <h1 className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-6xl font-extrabold uppercase text-transparent lg:bg-gradient-to-r lg:text-7xl xl:text-8xl">
              Discover the Latest Stories
            </h1>
            <p className="pt-6 text-foreground/80">
              Explore articles from our team members, uncover something fresh
              and intriguing, and share your thoughts.
            </p>
            <div className="pt-6">
              <AnimatedButton href="/articles">Discover</AnimatedButton>
            </div>
          </div>
          <div className="relative h-full w-full overflow-hidden bg-background/80 lg:w-1/2">
            <div className="absolute inset-0 z-[3]">
              <Image
                alt="artilces showcase"
                src={articlesShowcase1}
                className="absolute aspect-[4/3] rounded-xl object-cover"
                sizes="(max-width: 768px) 80vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 z-[2]">
              <Image
                alt="artilces showcase"
                src={articlesShowcase2}
                className="absolute left-14 top-28 aspect-[4/3] rounded-xl object-cover lg:left-28"
                sizes="(max-width: 768px) 80vw, 50vw"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <section className="relative flex h-screen flex-col flex-nowrap gap-24 md:flex-row md:justify-between">
          <div className="shrink-0 text-center md:w-1/2 lg:text-left">
            <h1 className="bg-gradient-to-br from-[#3b71ca] to-[#dc4c64] bg-clip-text text-6xl font-extrabold uppercase text-transparent lg:bg-gradient-to-r lg:text-7xl xl:text-8xl">
              Meet our team
            </h1>
            <p className="pt-6 text-foreground/80">
              Join Us: Elevate Your Creativity with Our Exceptional Team
            </p>
            <div className="flex flex-col items-center gap-4 pt-6 md:flex-row">
              <AnimatedButton href="/join-us">
                Become a part of our team
              </AnimatedButton>
              <AnimatedButton
                href="/authors"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                )}
              >
                See all authors
              </AnimatedButton>
            </div>
          </div>
          <div className="relative md:w-1/2">
            <Image
              alt="artilces showcase"
              src={teamPhoto}
              className="aspect-video rounded-xl object-cover"
              sizes="(max-width: 768px) 80vw, 30vw"
            />
          </div>
        </section>
      </Reveal>

      <Reveal
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <section className="flex h-screen flex-col items-center gap-4">
          <h1 className="bg-gradient-to-br from-slate-400 to-zinc-500 bg-clip-text text-3xl font-extrabold uppercase text-transparent lg:bg-gradient-to-r lg:text-6xl">
            <span className="text-slate-400">Insights</span> - Inspire. Create.
            Unite. Our Stories, Your Voice.
          </h1>
          <p className="text-xl font-extrabold uppercase text-foreground/95 lg:text-2xl">
            &quot;The only way to deal with this life meaningfully is to find
            passion in what you do, understanding that it&apos;s not the
            external circumstances that give life its value, but the way we
            choose to respond to them.&quot; - Albert Camus
          </p>
        </section>
      </Reveal>
    </Shell>
  );
}
