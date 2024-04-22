import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <div className="container relative flex max-w-3xl flex-col gap-8 py-8 pb-8 pt-6 md:py-8">
      <article className="lg:ml-auto lg:w-[50rem] xl:ml-0 xl:w-auto">
        <div className="mx-auto max-w-xl">
          <header className="mb-10 space-y-6">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-6 w-full" />
            <div className="flex items-center space-x-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
            <div className="relative my-10 md:ml-[-7rem] md:w-[calc(100%+7rem*2)]">
              <AspectRatio ratio={16 / 9}>
                <Skeleton className="size-full" />
              </AspectRatio>
            </div>
          </header>
          <Skeleton className="h-6 w-40" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="mx-auto mt-4 h-6 w-28" />
        </div>
      </article>
    </div>
  );
}
