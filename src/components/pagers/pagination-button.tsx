import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface PaginationButtonProps {
  pageCount: number;
  page?: string;
  per_page?: string;
  createQueryString: (params: Record<string, string | number | null>) => string;
  siblingCount?: number;
}

export function PaginationButton({
  pageCount,
  page,
  per_page,
  createQueryString,
  siblingCount = 1,
}: PaginationButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") ?? "";

  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2;

    const range = [];
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page, siblingCount]);

  return (
    <Pagination>
      <PaginationContent>
        {Number(page) > 1 && (
          <PaginationPrevious
            href={`${pathname}?${createQueryString({
              page: Number(page) - 1,
              per_page: per_page ?? null,
            })}`}
          />
        )}

        {paginationRange.map((pageNumber, i) =>
          pageNumber === "..." ? (
            <PaginationEllipsis key={i} />
          ) : (
            <PaginationLink
              key={i}
              href={`${pathname}?${createQueryString({
                page: pageNumber,
                per_page: per_page ?? null,
                query: query.trim() ?? null,
              })}`}
              isActive={Number(page) === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          ),
        )}

        {Number(page) !== (pageCount ?? 10) && (
          <PaginationNext
            href={`${pathname}?${createQueryString({
              page: Number(page) + 1,
              per_page: per_page ?? null,
            })}`}
          />
        )}
      </PaginationContent>
    </Pagination>
  );
}
