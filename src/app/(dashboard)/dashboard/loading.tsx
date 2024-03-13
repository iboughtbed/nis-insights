import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { Skeleton } from "~/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <Shell variant="sidebar">
      <PageHeader className="p-2">
        <PageHeaderHeading>Dashboard manager</PageHeaderHeading>
        <PageHeaderDescription>
          Manage the content by clicking on the cards
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2">
        <div className="col-span-full flex flex-wrap gap-4">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </Shell>
  );
}
