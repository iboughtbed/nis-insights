import { Skeleton } from "~/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 pb-8 pt-6 md:py-8">
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2">
        <div className="col-span-full flex flex-wrap gap-4">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
