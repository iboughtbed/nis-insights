import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    introduction: string;
    coverImage: string;
    createdAt: Date;
    author: {
      username: string;
    };
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`}>
      <span className="sr-only">{article.title}</span>
      <article className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
            className="rounded-lg border object-cover"
          />
        </AspectRatio>
        <div className="space-y-2 lg:px-4">
          <CardDescription>
            {format(article.createdAt, "MMM dd, yyyy")}
          </CardDescription>
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {article.introduction}
            </CardDescription>
          </CardHeader>
        </div>
      </article>
    </Link>
  );
}
