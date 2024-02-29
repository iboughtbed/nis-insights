import { PlaceholderImage } from "~/components/placeholder-image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

type ReleaseCardSkeletonProps = React.ComponentPropsWithoutRef<typeof Card>;

export function ReleaseCardSkeleton({
  className,
  ...props
}: ReleaseCardSkeletonProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <AspectRatio ratio={1 / 1.41}>
        <PlaceholderImage isSkeleton asChild />
      </AspectRatio>
      <CardContent className="pt-4">
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
