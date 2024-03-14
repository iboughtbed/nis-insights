import type { Author } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  author: Author;
  i: number;
}

export function AuthorCard({ author, i }: AuthorCardProps) {
  return (
    <Link
      key={author.slug}
      href={`/author/${author.title}`}
      className="rounded-3xl bg-secondary/50 px-8 py-10"
    >
      <span className="sr-only">{author.name}</span>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={author.avatar}
          alt={author.title}
          width={196}
          height={196}
          className="rounded-full bg-white"
          priority={i <= 1}
        />
        <div className="flex flex-col items-center">
          <p className="font-medium">{author.name}</p>
          <p className="text-muted-foreground">{author.role}</p>
        </div>
        <div>
          @{author.instagram}
          <span className="sr-only">{author.instagram}</span>
        </div>
      </div>
    </Link>
  );
}
