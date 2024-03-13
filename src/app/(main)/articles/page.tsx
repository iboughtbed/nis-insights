import type { Metadata } from "next";

import { Articles } from "~/components/articles";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { Separator } from "~/components/ui/separator";
import { articlesSearchParamsSchema } from "~/lib/validations/params";
import { getArticles } from "~/server/queries/article";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Explore articles from our team members, uncover something fresh and intriguing, and share your thoughts",
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
  // Number of items per page
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  const { data } = await getArticles({ limit, offset });

  const pageCount = Math.ceil((data?.count ?? 0) / limit);

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Articles</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Read and search articles from out best writers in the world!
        </PageHeaderDescription>
      </PageHeader>
      <Separator />
      {!!data?.articles.length ? (
        <Articles articles={data.articles} pageCount={pageCount} />
      ) : (
        <p>No articles yet...</p>
      )}
    </Shell>
  );
}
