import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "~/components/placeholder-image";

import { AspectRatio } from "~/components/ui/aspect-ratio";
import { badgeVariants } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn, formatDate } from "~/lib/utils";

interface ArticleCardProps {
  id: string;
  title: string;
  introduction: string;
  coverImage: string | null;
  createdAt: Date;
  author: {
    username: string;
  };
}

export function ArticleCard({
  id,
  title,
  introduction,
  coverImage,
  createdAt,
  author,
}: ArticleCardProps) {
  return (
    <Card>
      <AspectRatio ratio={16 / 9}>
        {coverImage ? (
          <Link href={`/article/${id}`} className="absolute inset-0">
            <Image
              alt={title}
              src={coverImage}
              className="absolute inset-0 rounded-t-lg object-cover"
              sizes="(max-width: 768px) 90vw, 50vw"
              fill
            />
          </Link>
        ) : (
          <PlaceholderImage className="rounded-t-lg" asChild />
        )}
      </AspectRatio>
      <CardHeader>
        <CardDescription className="mb-2 flex items-center gap-2">
          <Image
            alt={author.username}
            src="/images/avatar.png"
            className="relative h-8 w-8 rounded-full"
            width={64}
            height={64}
          />
          <span className="flex flex-col">
            <span className="text-foreground transition-colors hover:text-foreground/80">
              {author.username}
            </span>
            <span className="flex items-center gap-1">
              <span>{formatDate(createdAt)}</span>
              <span>
                (
                {formatDistanceToNow(createdAt, {
                  addSuffix: true,
                })}
                )
              </span>
            </span>
          </span>
        </CardDescription>
        <CardTitle>
          <Link
            href={`/article/${id}`}
            className="transition-colors hover:text-foreground/80"
          >
            {title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 pt-1">
          {["News", "Insights", "Art"].map((tag, i) => (
            <span
              key={i}
              className={cn(badgeVariants({ variant: "secondary" }))}
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>{introduction}</p>
      </CardContent>
    </Card>
  );
}
