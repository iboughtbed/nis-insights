import { Shell } from "~/components/shells/shell";
import { Skeleton } from "~/components/ui/skeleton";

export default function ReleaseLoading() {
  return (
    <Shell className="min-h-screen">
      <Skeleton className="h-[80vh] w-full" />
    </Shell>
  );
}
