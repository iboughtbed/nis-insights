import "~/styles/mdx.css";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Markdown } from "~/components/mdx/markdown";
import { TracingBeam } from "~/components/motion/tracing-beam";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { formatDate } from "~/lib/utils";
import { getArticle } from "~/server/queries/article";

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const { data } = await getArticle({ id: params.articleId });

  if (!data?.article) {
    notFound();
  }

  const article = data.article;

  return (
    <Shell variant="markdown">
      <TracingBeam>
        <article>
          <PageHeader>
            <PageHeaderHeading size="lg">{article.title}</PageHeaderHeading>
            <PageHeaderDescription size="sm" className="pt-4">
              {article.introduction}
            </PageHeaderDescription>
          </PageHeader>
          <div className="mb-2 flex items-center gap-2 pt-6">
            <Image
              alt="avatar"
              src="/images/avatar.png"
              className="h-8 w-8 rounded-full"
              width={64}
              height={64}
            />
            <span className="flex flex-col">
              <span className="text-foreground transition-colors hover:text-foreground/80">
                {article.author.username}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span>{formatDate(article.createdAt)}</span>
                <span>
                  (
                  {formatDistanceToNow(article.createdAt, {
                    addSuffix: true,
                  })}
                  )
                </span>
              </span>
            </span>
          </div>
          {article.coverImage && (
            <>
              <Separator className="my-4" />
              <div className="relative mt-6">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    alt="cover"
                    src={article.coverImage}
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 90vw, 50vw"
                    priority
                    fill
                  />
                </AspectRatio>
              </div>
            </>
          )}
          <Separator className="my-8" />
          <div className="prose relative dark:prose-invert">
            <Markdown source={article.content} />
          </div>
        </article>
      </TracingBeam>
    </Shell>
  );
}
