import "~/styles/mdx.css";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { allAuthors, allPosts } from "contentlayer/generated";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "~/components/mdx/mdx-components";
import { Shell } from "~/components/shell";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { absoluteUrl, cn } from "~/lib/utils";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const authors = post.authors.map((author) =>
    allAuthors.find((a) => a.title === author?.replace(/\r$/, "")),
  );

  return (
    <Shell as="article" variant="markdown">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
        See all posts
      </Link>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground"></div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="flex items-center space-x-4 pt-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://instagram.com/${author.instagram}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={40}
                    height={40}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.instagram}
                    </p>
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-md border bg-muted"
            priority
          />
        </AspectRatio>
      )}
      <Mdx code={post.body.code} />
    </Shell>
  );
}
