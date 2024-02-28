import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import { EditArticleForm } from "~/components/forms/edit-article-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Separator } from "~/components/ui/separator";
import { formatDate } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { getArticle } from "~/server/queries/article";

export default async function EditArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const session = await getServerAuthSession();

  const articleWithAuthorId = await db.article.findUnique({
    where: {
      id: params.articleId,
    },
    select: {
      authorId: true,
    },
  });

  if (session?.user.id !== articleWithAuthorId?.authorId) {
    redirect("/");
  }

  const result = await getArticle({ id: params.articleId });

  if (!result.data?.article) {
    notFound();
  }

  const { article } = result.data;

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">New article</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Publish a new article
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
            <span>{formatDate(new Date("02.02.2023"))}</span>
            <span>
              (
              {formatDistanceToNow(new Date("02.02.2023"), {
                addSuffix: true,
              })}
              )
            </span>
          </span>
        </span>
      </div>
      <Separator className="my-4" />
      <div className="relative mt-6">
        {article.coverImage ? (
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="cover"
              src={article.coverImage}
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
              fill
            />
          </AspectRatio>
        ) : (
          <p>No cover image</p>
        )}
      </div>
      <Separator className="my-8" />

      <EditArticleForm
        id={params.articleId}
        title={article.title}
        introduction={article.introduction}
        content={article.content}
        coverImage={article.coverImage}
      />
    </Shell>
  );
}
