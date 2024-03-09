import "~/styles/mdx.css";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Mdx } from "~/components/mdx/mdx-components";
import { TracingBeam } from "~/components/motion/tracing-beam";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { siteConfig } from "~/config/site";
import { absoluteUrl, formatDate, truncate } from "~/lib/utils";
import { db } from "~/server/db";
import { getArticle } from "~/server/queries/article";

export async function generateMetadata({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const article = await db.article.findUnique({
    where: {
      id: params.articleId,
    },
    select: {
      title: true,
      introduction: true,
    },
  });

  if (!article) {
    return {};
  }

  const description = truncate(article.introduction);

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: absoluteUrl(`/article/${params.articleId}`),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [siteConfig.ogImage],
      creator: "@iboughtbed",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const { data } = await getArticle({ id: params.articleId });

  if (!data?.article) {
    notFound();
  }

  return (
    <Shell variant="markdown" className="relative">
      <TracingBeam>
        <article className="relative">
          <PageHeader>
            <PageHeaderHeading size="lg">
              {data.article.title}
            </PageHeaderHeading>
            <PageHeaderDescription className="pt-4">
              {data.article.introduction}
            </PageHeaderDescription>
          </PageHeader>
          <div className="mb-2 flex items-center gap-2 pt-6">
            <Image
              alt="avatar"
              src="/avatars/morty.png"
              className="h-8 w-8 rounded-full"
              width={64}
              height={64}
            />
            <span className="flex flex-col">
              <span className="text-foreground transition-colors hover:text-foreground/80">
                {data.article.author.username}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span>{formatDate(data.article.createdAt)}</span>
                <span>
                  (
                  {formatDistanceToNow(data.article.createdAt, {
                    addSuffix: true,
                  })}
                  )
                </span>
              </span>
            </span>
          </div>
          {data.article.coverImage && (
            <>
              <Separator className="my-4" />
              <div className="relative mt-6">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    alt="article cover"
                    src={data.article.coverImage}
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
            <Mdx source={data.article.content} />
          </div>
        </article>
      </TracingBeam>
    </Shell>
  );
}
