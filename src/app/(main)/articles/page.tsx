import type { Metadata } from "next";

import { articlesSearchParamsSchema } from "~/lib/validations/params";
import { getArticles } from "~/server/queries/article";
import { ArticleCategoriesNav } from "./_components/article-categories-nav";
import { Articles } from "./_components/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Learn more about NIS Insights, our journey, and school news",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { page, per_page } = articlesSearchParamsSchema.parse(searchParams);

  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const perPageAsNumber = Number(per_page);
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  const { articles, pageCount } = await getArticles({ limit, offset });

  return (
    <div className="bg-circuit container">
      <div className="absolute inset-0 bg-gradient-to-t from-background" />
      <div className="relative flex flex-col gap-8 pb-8 pt-6 md:py-8 md:pb-10">
        <div>
          <h1 className="mt-16 text-sm font-medium text-indigo-600">
            Articles
          </h1>
          <p className="mt-4 text-4xl font-bold leading-[3rem] tracking-tight text-gray-950 sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem]">
            News, insights and more
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Learn more about NIS Insights, our journey, and school news.
          </p>
        </div>
        <ArticleCategoriesNav />
        <Articles articles={articles} pageCount={pageCount} />
      </div>
    </div>
  );
}
