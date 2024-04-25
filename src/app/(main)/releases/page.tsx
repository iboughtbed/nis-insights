import Image from "next/image";

// import { getReleases } from "~/server/queries/release";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default async function ReleasesPage() {
  // const { releases } = await getReleases();

  return (
    <div className="container">
      <div className="relative flex flex-col items-center gap-8 py-8 pb-10 md:py-16">
        <h1 className="mt-4 font-bold tracking-wide md:text-9xl md:leading-[4.5rem]">
          NIS INSIGHTS
        </h1>
        <div className="absolute">
          <AspectRatio ratio={1 / 1.41}>
            <Image
              src="/images/dont-close-your-eyes.webp"
              alt=""
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
              priority
              fill
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}
