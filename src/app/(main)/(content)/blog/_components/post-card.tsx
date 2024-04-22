import { type Post } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { PlaceholderImage } from "~/components/placeholder-image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

interface PostCardProps {
  post: Post;
  i: number;
}

export function PostCard({ post, i }: PostCardProps) {
  return (
    <Link key={post.slug} href={post.slug}>
      <span className="sr-only">{post.title}</span>
      <article className="space-y-4">
        <AspectRatio ratio={16 / 9}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
              className="rounded-lg border object-cover"
              priority={i <= 1}
            />
          ) : (
            <PlaceholderImage asChild />
          )}
        </AspectRatio>
        <div className="space-y-2">
          <CardDescription>{format(post.date, "MMM dd, yyyy")}</CardDescription>
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {post.description}
            </CardDescription>
          </CardHeader>
        </div>
      </article>
    </Link>
  );
}
