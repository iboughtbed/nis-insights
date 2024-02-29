import { PlaceholderImage } from "~/components/placeholder-image";
import { Shell } from "~/components/shells/shell";
import { ReleaseCardSkeleton } from "~/components/skeletons/release-card-skeleton";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function ReleasesLoading() {
  return (
    <Shell>
      <section className="flex min-h-screen flex-col flex-nowrap gap-8 md:flex-row">
        <div className="relative md:w-1/2 md:px-8 xl:w-1/3">
          <Card>
            <div className="p-4">
              <AspectRatio ratio={1 / 1.41}>
                <PlaceholderImage isSkeleton asChild />
              </AspectRatio>
            </div>
          </Card>
        </div>
        <div className="shrink-0 text-center md:w-1/2 md:text-left">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="mt-6 h-12 w-full" />
          <Skeleton className="mt-6 h-10 w-full" />
        </div>
      </section>

      <section className="relative min-h-screen">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ReleaseCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
