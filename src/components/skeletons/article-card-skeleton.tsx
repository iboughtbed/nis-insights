import { PlaceholderImage } from "~/components/placeholder-image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

type ArticleCardSkeletonProps = React.ComponentPropsWithoutRef<typeof Card>;

export function ArticleCardSkeleton({
  className,
  ...props
}: ArticleCardSkeletonProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <AspectRatio ratio={16 / 9}>
        <PlaceholderImage className="rounded-lg" isSkeleton asChild />
      </AspectRatio>
      <CardHeader>
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="space-y-2.5 p-4">
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
