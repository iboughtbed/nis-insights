import { Skeleton } from "~/components/ui/skeleton";
import { ArticleCardSkeleton } from "./_components/article-card-skeleton";

export default function ArticlesLoading() {
  return (
    <div className="container flex flex-col gap-8 pb-8 pt-6 md:py-8 md:pb-10 lg:max-w-[60rem] xl:max-w-[76rem]">
      <div>
        <h1 className="mt-16 text-sm font-medium text-indigo-600">Articles</h1>
        <p className="mt-4 text-4xl font-bold leading-[3rem] tracking-tight text-gray-950 sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem]">
          News, insights and more
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Learn more about NIS Insights, our journey, and school news.
        </p>
      </div>
      <div className="mt-10 hidden items-center gap-4 sm:flex">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-20 rounded-md" />
        ))}
      </div>
      <Skeleton className="h-5 w-20 sm:hidden" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
