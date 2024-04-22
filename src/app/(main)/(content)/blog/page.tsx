import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import * as React from "react";

import { Separator } from "~/components/ui/separator";
import { PostCard } from "./_components/post-card";
import { PostCardSkeleton } from "./_components/post-card-skeleton";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore the latest news and updates from the community",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  return null;

  return (
    <div className="bg-circuit container lg:max-w-[60rem] xl:max-w-[80rem]">
      <div className="relative flex flex-col gap-8 pb-8 pt-6 md:py-8 md:pb-10">
        {/* <div>
          <h1 className="mt-4 text-sm font-medium text-indigo-600">Blog</h1>
          <p className="mt-4 max-w-screen-lg text-4xl font-bold leading-[3rem] tracking-tight text-gray-950 sm:text-5xl sm:leading-[4rem] md:text-6xl md:leading-[4.5rem]">
            Exploring our journey, progress, and community development
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Learn more about NIS Insights, our journey, and school news.
          </p>
        </div> */}
        <Separator className="mb-2.5" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <React.Suspense
            fallback={Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          >
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} i={i} />
            ))}
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}