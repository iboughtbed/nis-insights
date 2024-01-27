"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useCallback, useEffect, useState } from "react";

import { ArticleCard } from "~/components/cards/article-card";
import { PaginationButton } from "~/components/pagers/pagination-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { useDebounce } from "~/hooks/use-debounce";

interface ArticlesProps {
  articles: {
    id: string;
    title: string;
    introduction: string;
    createdAt: Date;
    author: {
      username: string;
    };
  }[];
  pageCount: number;
}

export default function Articles({ articles, pageCount }: ArticlesProps) {
  // const pathname = usePathname();
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
      <section className="p-1">
        <SearchForm
          initialQuery={searchParams.get("query")}
          createQueryString={createQueryString}
        />
      </section>
      <Separator />
      <section className="flex flex-col gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </section>
      <PaginationButton
        pageCount={pageCount}
        page={page}
        per_page={per_page}
        createQueryString={createQueryString}
      />
    </div>
  );
}

interface SearchFormProps {
  initialQuery: string | null;
  createQueryString: (params: Record<string, string | number | null>) => string;
}

function SearchForm({ initialQuery, createQueryString }: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery ?? "");
  const debouncedQuery = useDebounce(query);

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  useEffect(() => {
    if (debouncedQuery.length <= 0) {
      setQuery("");
      return;
    }

    startTransition(() => {
      const newQueryString = createQueryString({
        page: Number(page),
        per_page: Number(per_page),
        query: query.trim() ?? null,
      });

      router.push(`${pathname}?${newQueryString}`, {
        scroll: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="search"
        placeholder="Search..."
        className="flex-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
