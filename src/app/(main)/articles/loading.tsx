import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { ArticleCardSkeleton } from "~/components/skeletons/article-card-skeleton";
import { Separator } from "~/components/ui/separator";

export default function ArticlesLoading() {
  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Articles</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Read and search articles from out best writers in the world!
        </PageHeaderDescription>
      </PageHeader>
      <Separator />
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </Shell>
  );
}
