"use client";

import { useSearchParams } from "next/navigation";
import * as React from "react";

import { PaginationButton } from "~/components/pagination-button";
import { ArticleCard } from "./article-card";
import { ArticleCardSkeleton } from "./article-card-skeleton";

interface ArticlesProps {
  articles: {
    id: string;
    title: string;
    introduction: string;
    coverImage: string;
    createdAt: Date;
    author: {
      username: string;
    };
  }[];
  pageCount: number;
}

export function Articles({ articles, pageCount }: ArticlesProps) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </React.Suspense>
      </div>
      <PaginationButton
        pageCount={pageCount}
        page={page}
        per_page={per_page}
        createQueryString={createQueryString}
      />
    </div>
  );
}
