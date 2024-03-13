import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { Skeleton } from "~/components/ui/skeleton";

export default function EditArticleLoading() {
  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Edit article</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Edit your article
        </PageHeaderDescription>
      </PageHeader>

      <Skeleton className="h-40 w-full" />

      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}

      <Skeleton className="h-40 w-full" />
    </Shell>
  );
}
