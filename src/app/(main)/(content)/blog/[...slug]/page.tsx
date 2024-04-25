import "~/styles/mdx.css";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { allAuthors, allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Mdx } from "~/components/mdx/mdx-components";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { getTableOfContents } from "~/lib/toc";
import { absoluteUrl, cn } from "~/lib/utils";
import { PostTableOfContents } from "../_components/toc";

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

  const toc = await getTableOfContents(post.body.raw);

  return (
    <article className="container flex flex-col gap-8 max-xl:items-center lg:max-w-[60rem] xl:max-w-[76rem]">
      <div className="flex max-w-3xl flex-col gap-8 py-8 md:py-10">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }), "self-start")}
        >
          <ChevronLeftIcon className="mr-2 size-4" aria-hidden="true" />
          See all posts
        </Link>
        <div className="space-y-2">
          <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-secondary-foreground">
            {post.description}
          </p>
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
      </div>
      <div className="flex w-full flex-col gap-16 max-xl:max-w-3xl xl:grid xl:grid-cols-[1fr_300px]">
        <div className="flex max-w-3xl flex-col gap-8">
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
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <PostTableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </article>
  );
}
