import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import { EditArticleForm } from "~/components/forms/edit-article-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
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

  const { data } = await getArticle({ id: params.articleId });

  if (!data?.article) {
    notFound();
  }

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Edit article</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Edit your article
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
      <Separator className="my-4" />
      <div className="relative mt-6">
        {data.article.coverImage ? (
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
        ) : (
          <p>No cover image</p>
        )}
      </div>
      <Separator className="my-8" />

      <EditArticleForm
        id={params.articleId}
        title={data.article.title}
        introduction={data.article.introduction}
        content={data.article.content}
        coverImage={data.article.coverImage}
        coverImageKey={data.article.coverImageKey}
      />
    </Shell>
  );
}
