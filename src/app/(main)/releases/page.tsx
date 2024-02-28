import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { AnimatedButton } from "~/components/animated-button";
import { Reveal } from "~/components/motion/reveal";
import { PageHeader, PageHeaderHeading } from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getReleases } from "~/server/queries/release";

export default async function ReleasesPage() {
  const { data } = await getReleases({});

  const latestRelease = data?.releases.shift();

  return (
    <Shell>
      {latestRelease && (
        <Reveal>
          <section className="flex min-h-screen flex-col flex-nowrap gap-8 md:flex-row">
            <div className="relative md:w-1/2 md:px-8 xl:w-1/3">
              <Link href={`/release/${latestRelease.id}`}>
                <Card>
                  <div className="p-4">
                    <AspectRatio ratio={1 / 1.41}>
                      <Image
                        alt="release cover"
                        src={latestRelease.coverImage}
                        fill
                        className="absolute inset-0 rounded-md object-cover"
                        priority
                        sizes="(max-width: 768px) 90vw, 30vw"
                      />
                    </AspectRatio>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="shrink-0 text-center md:w-1/2 md:text-left">
              <h1 className="text-6xl font-extrabold uppercase md:text-7xl">
                See what you&apos;re <span>missing</span>
              </h1>
              <p className="pt-6 text-foreground/80">
                {format(latestRelease.date, "dd/MM/yy")} - don&apos;t miss the
                most interesting events
              </p>
              <div className="pt-6">
                <AnimatedButton href={`/release/${latestRelease.id}`}>
                  Read our latest release
                </AnimatedButton>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <PageHeader>
        <PageHeaderHeading>Previous releases</PageHeaderHeading>
      </PageHeader>

      <Reveal
        variants={{
          hidden: { opacity: 0, x: 75 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <section className="grid min-h-screen grid-cols-1 gap-8 md:grid-cols-4">
          {data?.releases.map((release) => (
            <Card key={release.id}>
              <CardHeader className="py-4">
                <CardTitle>{format(release.date, "dd/MM/yy")}</CardTitle>
              </CardHeader>
              <div className="p-4">
                <AspectRatio ratio={1 / 1.41}>
                  <Link
                    href={`/release/${release.id}`}
                    className="absolute inset-0"
                  >
                    <Image
                      alt="release cover"
                      src={release.coverImage}
                      fill
                      className="absolute inset-0 rounded-md object-cover"
                      priority
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </Link>
                </AspectRatio>
              </div>
              <CardContent>
                <AnimatedButton
                  href={`/release/${release.id}`}
                  className="w-full"
                >
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
