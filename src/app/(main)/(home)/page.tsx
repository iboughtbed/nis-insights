import { Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Announcement } from "~/components/announcement";
import { TextVelocity } from "~/components/text-velocity";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Benefits } from "./_components/benefits";
import { HeroImage } from "./_components/hero-image";
import { TextReveal } from "./_components/text-reveal";
import { PreloadResources } from "./preload-resources";

export default function HomePage() {
  const tags = [
    "Community",
    "Guides",
    "Insights",
    "Blog",
    "Events",
    "News",
    "Science",
  ];

  return (
    <div className="container">
      <PreloadResources />

      <div className="flex flex-col">
        <div className="relative overflow-hidden pb-10 pt-8 md:pt-16">
          <div className="relative flex flex-col items-center">
            <Announcement />
            <h1 className="bg-colorful-animation relative mt-6 text-center text-4xl font-bold leading-[3rem] tracking-tight max-md:text-balance sm:max-w-4xl sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem] lg:text-8xl">
              A magazine club with a twist
            </h1>
            <p className="mt-3 max-w-xl text-balance text-center md:text-lg">
              Magazines, articles for everyone. Find and read anytime
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Link
                href="/explore"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "animated-button rounded-3xl",
                )}
              >
                <div className="animated-button-bg"></div>
                <span className="animated-button-text">Explore</span>
              </Link>
              <Link
                href="/join-us"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "animated-button rounded-3xl",
                )}
              >
                <div className="animated-button-bg"></div>
                <span className="animated-button-text">Join Us</span>
              </Link>
            </div>
          </div>
        </div>

        <HeroImage />

        <Benefits />

        <TextReveal>
          In Insights everything is made with love that come with pixel perfect
          design, interactivity and motion out of the box. Instead of searching
          for a long time, simply choose the right content from our library of
          content and see the magic unfold.
        </TextReveal>

        <div className="relative overflow-hidden pb-10 pt-16 md:px-8">
          <div className="flex flex-col gap-6">
            <div className="animated-box mb-6 flex w-full flex-col-reverse rounded-3xl md:flex-row md:items-center">
              <div className="flex-1">
                <div className="container">
                  <h5 className="mb-4 text-center text-sm font-semibold tracking-tighter text-[#a594fd]">
                    VISUALISE INFO
                  </h5>
                  <div>
                    <h3 className="mb-4 text-center font-semibold lg:text-3xl xl:text-5xl">
                      World class information at your fingertips
                    </h3>
                    <p className="mb-6 text-balance text-center font-light text-muted-foreground">
                      You can discover new things with our fast-growing
                      community
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="w-full p-4 pr-0 md:p-8 xl:p-16">
                  <AspectRatio ratio={648 / 565}>
                    <Image
                      src="/images/active-users.png"
                      alt=""
                      className="absolute inset-0 rounded-xl object-cover"
                      sizes="(max-width: 768px) 90vw, 80vw"
                      fill
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <div className="animated-box h-full rounded-3xl">
                  <div className="flex flex-col">
                    <div className="p-8 pb-0 xl:p-16 xl:pb-0">
                      <div className="relative">
                        <div>
                          <AspectRatio ratio={1335 / 903}>
                            <Image
                              src="/images/active-users-group.png"
                              alt=""
                              className="rounded-xl object-cover"
                              sizes="(max-width: 768px) 90vw, 80vw"
                              fill
                            />
                          </AspectRatio>
                        </div>
                      </div>
                    </div>
                    <div className="px-14 pb-16 pt-10">
                      <h5 className="mb-4 text-sm font-semibold tracking-tighter text-[#a594fd] max-md:text-center">
                        INSIGHTS
                      </h5>
                      <div>
                        <h3 className="mb-4 text-3xl font-semibold max-md:text-center">
                          Find inspiration.
                          <br />
                          Insights for you.
                        </h3>
                        <p className="font-light text-muted-foreground max-md:text-balance max-md:text-center md:pr-[30%]">
                          You can explore fresh ideas alongside our rapidly
                          expanding group of members.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="animated-box h-full rounded-3xl">
                  <div className="flex flex-col">
                    <div className="p-4">
                      <div>
                        <AspectRatio ratio={575 / 360}>
                          <Image
                            src="/images/embed.png"
                            alt=""
                            className="rounded-xl object-cover"
                            sizes="(max-width: 768px) 90vw, 80vw"
                            fill
                          />
                        </AspectRatio>
                      </div>
                    </div>
                    <div className="px-14 pb-16 pt-10">
                      <h5 className="mb-4 text-sm font-semibold tracking-tighter text-[#a594fd] max-md:text-center">
                        EMBED
                      </h5>
                      <div>
                        <h3 className="mb-4 text-3xl font-semibold max-md:text-center">
                          A window <br /> into your work.
                        </h3>
                        <p className="font-light text-muted-foreground max-md:text-balance max-md:text-center md:pr-[30%]">
                          Simply paste a link to any of the hundreds of contents
                          you read and Insights will seamlessly package your
                          collection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden px-4 pb-10 pt-16 md:px-8 md:pt-48 xl:px-16">
          <div className="mb-20 text-center">
            <div className="mb-4 flex items-center justify-center gap-1 text-[#a594fd]">
              <Sparkle className="size-4" />
              <h4 className="text-xl">NIS INSIGHTS</h4>
            </div>
            <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              What are you waiting for, <br /> start browsing our library
            </h2>
          </div>

          <div className="mb-8 flex flex-col gap-6 md:flex-row">
            <Link
              href="/articles"
              className="rounded-3xl border-purple-600 border-opacity-0 bg-[#101010] text-center outline-none ring-0 ring-purple-600 ring-opacity-0 transition-all duration-500 ease-out hover:border-opacity-100 hover:ring-[3px] hover:ring-opacity-30 focus:ring-[3px] focus:ring-opacity-30 active:border-opacity-100 active:ring-[1px] active:ring-opacity-30 md:flex-1"
            >
              <div className="pb-6 pt-14">
                <Image
                  src="/images/articles-icon.png"
                  alt=""
                  className="mx-auto rounded-xl object-cover"
                  width={120}
                  height={120}
                />
              </div>
              <div className="px-8 pb-12">
                <h3 className="mb-5 text-xl font-semibold md:text-2xl">
                  Articles
                </h3>
                <p className="text-muted-foreground">
                  Find every category, community, guides, insights and much more
                </p>
              </div>
            </Link>
            <Link
              href="/releases"
              className="flex-1 rounded-3xl border-purple-600 border-opacity-0 bg-[#101010] text-center outline-none ring-0 ring-purple-600 ring-opacity-0 transition-all duration-500 ease-out hover:border-opacity-100 hover:ring-[3px] hover:ring-opacity-30 focus:ring-[3px] focus:ring-opacity-30 active:border-opacity-100 active:ring-[1px] active:ring-opacity-30"
            >
              <div className="pb-6 pt-14">
                <Image
                  src="/images/releases-icon.png"
                  alt=""
                  className="mx-auto rounded-xl object-cover"
                  width={120}
                  height={120}
                />
              </div>
              <div className="px-8 pb-12">
                <h3 className="mb-5 text-xl font-semibold md:text-2xl">
                  Releases
                </h3>
                <p className="text-muted-foreground">
                  Latest and fresh news about recent events in our school
                </p>
              </div>
            </Link>
            <Link
              href="/blog"
              className="flex-1 rounded-3xl border-purple-600 border-opacity-0 bg-[#101010] text-center outline-none ring-0 ring-purple-600 ring-opacity-0 transition-all duration-500 ease-out hover:border-opacity-100 hover:ring-[3px] hover:ring-opacity-30 focus:ring-[3px] focus:ring-opacity-30 active:border-opacity-100 active:ring-[1px] active:ring-opacity-30"
            >
              <div className="pb-6 pt-14">
                <Image
                  src="/images/blog-icon.png"
                  alt=""
                  className="mx-auto rounded-xl object-cover"
                  width={120}
                  height={120}
                />
              </div>
              <div className="px-8 pb-12">
                <h3 className="mb-5 text-xl font-semibold md:text-2xl">Blog</h3>
                <p className="text-muted-foreground">
                  Learn more about Insights, our journey, and our impact on
                  communitys.
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden flex-col items-center md:flex">
            <div className="flex max-w-screen-sm flex-wrap justify-center">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="group relative m-2 rounded-3xl bg-[rgb(16,16,16)] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Sparkle className="size-4 text-[#a594fd] transition-transform duration-500 group-hover:rotate-90" />
                    <span>{tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-32">
          <div className="relative">
            <Link
              href="/join-us"
              className="absolute left-0 top-0 h-full w-full opacity-0"
            >
              Join Us
            </Link>
            <div className="overflow-hidden">
              <TextVelocity>Join Us</TextVelocity>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
