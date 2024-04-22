import { allAuthors } from "contentlayer/generated";
import type { Metadata } from "next";
import * as React from "react";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Separator } from "~/components/ui/separator";

import { AuthorCard } from "./_components/author-card";
import { AuthorCardSkeleton } from "./_components/author-card-skeleton";

export const metadata: Metadata = {
  title: "Authors",
  description: "Meet our team",
};

export default function AuthorsPage() {
  return (
    <div className="container flex flex-col gap-8 pb-8 pt-6 md:py-8 md:pb-10">
      <PageHeader>
        <PageHeaderHeading>Meet our team</PageHeaderHeading>
        <PageHeaderDescription>
          We&apos;re a dynamic group of individuals who are passionate about
          what we do and dedicated to delivering the best results for our
          readers.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <AuthorCardSkeleton key={i} />
          ))}
        >
          {allAuthors.map((author, i) => (
            <AuthorCard key={author.slug} author={author} i={i} />
          ))}
        </React.Suspense>
      </div>
    </div>
  );
}
