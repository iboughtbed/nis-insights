import { Skeleton } from "~/components/ui/skeleton";

export default function NewArticleLoading() {
  return (
    <div className="container relative flex flex-col">
      <div className="flex flex-col items-center pb-10 pt-8">
        <h1 className="text-center text-4xl font-bold tracking-tight">
          Create a new article
        </h1>
        <p className="mt-2 text-balance text-center">Markdown is used</p>
      </div>

      <div className="pb-10 pt-8">
        <Skeleton className="h-40 w-full" />

        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}

        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
