import { Shell } from "~/components/shell";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

export default function ArticleLoading() {
  return (
    <Shell variant="markdown">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="mb-2 h-16 w-full pt-6" />
      <Separator />
      <Skeleton className="mt-6 h-96 w-full" />
      <Separator />
      <Skeleton className="h-96 w-full" />
    </Shell>
  );
}
