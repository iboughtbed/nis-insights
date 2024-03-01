"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { ArticleCard } from "~/components/cards/article-card";
import { PaginationButton } from "~/components/pagers/pagination-button";

interface ArticlesProps {
  articles: {
    id: string;
    title: string;
    introduction: string;
    coverImage: string | null;
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

  const createQueryString = useCallback(
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
      <div className="flex flex-col gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
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
