import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Skeleton } from "~/components/ui/skeleton";

export default function PostLoading() {
  return (
    <article className="container flex flex-col gap-8 max-xl:items-center lg:max-w-[60rem] xl:max-w-[76rem]">
      <div className="flex w-full max-w-3xl flex-col gap-8 py-8 md:py-10">
        <div className="space-y-2">
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-6 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col max-xl:max-w-3xl xl:grid xl:grid-cols-[1fr_300px]">
        <div className="flex max-w-3xl flex-col gap-8">
          <AspectRatio ratio={16 / 9}>
            <Skeleton className="size-full" />
          </AspectRatio>
          <Skeleton className="h-6 w-40" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
