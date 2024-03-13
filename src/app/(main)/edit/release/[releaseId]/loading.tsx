import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { Skeleton } from "~/components/ui/skeleton";

export default function NewReleaseLoading() {
  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Edit release</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Edit the release
        </PageHeaderDescription>
      </PageHeader>

      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-10 w-full" />
    </Shell>
  );
}
