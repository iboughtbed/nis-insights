import Image from "next/image";

import { AnimatedButton } from "~/components/animated-button";
import { Reveal } from "~/components/motion/reveal";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ReleasesPage() {
  return (
    <Shell>
      <Reveal>
        <section className="flex min-h-screen flex-col flex-nowrap gap-8 lg:flex-row">
          <div className="relative lg:w-1/2 lg:px-8 xl:w-1/3">
            <Card>
              <div className="p-4">
                <AspectRatio ratio={1 / 1.41}>
                  <Image
                    alt="release cover"
                    src="/images/cover-image.webp"
                    fill
                    className="absolute inset-0 rounded-md object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                </AspectRatio>
              </div>
            </Card>
          </div>
          <div className="shrink-0 text-center lg:w-1/2 lg:text-left">
            <h1 className="text-6xl font-extrabold uppercase lg:text-7xl">
              See what you&apos;re <span>missing</span>
            </h1>
            <p className="pt-6 text-foreground/80">
              02/02/24 - don&apos;t miss the most interesting events
            </p>
            <div className="pt-6">
              <AnimatedButton href="/release">
                Read our latest release
              </AnimatedButton>
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
        <section className="grid min-h-screen grid-cols-1 gap-8 md:grid-cols-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index}>
              <CardHeader className="py-4">
                <CardTitle>02/02/24</CardTitle>
              </CardHeader>
              <div className="p-4">
                <AspectRatio ratio={1 / 1.41}>
                  <Image
                    alt="release cover"
                    src="/images/cover-image.webp"
                    fill
                    className="absolute inset-0 rounded-md object-cover"
                    priority
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                </AspectRatio>
              </div>
              <CardContent>
                <AnimatedButton href="/release" className="w-full">
                  Read
                </AnimatedButton>
              </CardContent>
            </Card>
          ))}
        </section>
      </Reveal>
    </Shell>
  );
}
