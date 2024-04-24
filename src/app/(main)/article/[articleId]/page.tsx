import "~/styles/mdx.css";

import { format } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MemoizedReactMarkdown } from "~/components/mdx/markdown";
import { TracingBeam } from "~/components/tracing-beam";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Badge } from "~/components/ui/badge";
import { siteConfig } from "~/config/site";
import { absoluteUrl, truncate } from "~/lib/utils";
import { db } from "~/server/db";
import { getArticle } from "~/server/queries/article";

export async function generateMetaarticle({
  params,
}: {
  params: { articleId: string };
}): Promise<Metadata> {
  const article = await db.query.articles.findFirst({
    where: (model, { eq }) => eq(model.id, params.articleId),
    columns: {
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
  const { article } = await getArticle({ id: params.articleId });

  if (!article) {
    notFound();
  }

  return (
    <div className="container relative flex max-w-3xl flex-col gap-8 py-8 pb-8 pt-6 md:py-8">
      <TracingBeam>
        <article>
          <div className="mx-auto max-w-xl">
            <header>
              <Badge className="mr-2">{article.category}</Badge>
              <span className="text-sm">
                {format(article.createdAt, "MMM dd, yyyy")}
              </span>
              <div className="flex flex-col">
                <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {article.title}
                </h1>
                <div className="my-4">
                  <p>{article.introduction}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 pb-4">
                <Image
                  alt="avatar"
                  src="/avatars/morty.png"
                  className="h-8 w-8 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col">
                  <span>{article.author.username}</span>
                </div>
              </div>
              <div className="relative my-10">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    alt="article cover"
                    src={article.coverImage}
                    className="rounded-lg border object-cover"
                    sizes="(max-width: 768px) 90vw, 50vw"
                    priority
                    fill
                  />
                </AspectRatio>
              </div>
            </header>
            <div className="relative">
              <MemoizedReactMarkdown>{article.content}</MemoizedReactMarkdown>
            </div>
          </div>
        </article>
      </TracingBeam>
    </div>
  );
}
