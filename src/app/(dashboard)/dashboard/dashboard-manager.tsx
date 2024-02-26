"use client";

import type { UserRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useMounted } from "~/hooks/use-mounted";
import { cn, formatDateToLocale } from "~/lib/utils";
import { getArticles, getReleases } from "~/server/queries/dashboard";
import { DashboardCardWrapper } from "./helpers";

interface DashboardManagerProps {
  _count: {
    releases: number;
    articles: number;
  };
  role: UserRole;
}

export function DashboardManager({ _count, role }: DashboardManagerProps) {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2">
      <div className="col-span-full flex flex-wrap gap-4">
        {role === "ADMIN" && (
          <Link
            href="/new/release"
            className={cn(buttonVariants({ variant: "secondary" }), "gap-1")}
          >
            <PlusIcon className="size-4" />
            <span>New release</span>
          </Link>
        )}

        {(role === "ADMIN" || role === "WRITER") && (
          <Link
            href="/new/article"
            className={cn(buttonVariants({ variant: "secondary" }), "gap-1")}
          >
            <PlusIcon className="size-4" />
            <span>New article</span>
          </Link>
        )}
      </div>

      {role === "ADMIN" && (
        <DashboardCardWrapper
          title={`${_count.releases} releases have been released`}
          description="Releases can be modified or posted only by admins"
        >
          <ManageReleases />
        </DashboardCardWrapper>
      )}

      {(role === "ADMIN" || role === "WRITER") && (
        <DashboardCardWrapper
          title={`You have posted ${_count.articles} articles`}
          description="Manage your articles"
        >
          <ManageArticles />
        </DashboardCardWrapper>
      )}
    </div>
  );
}

function ManageReleases() {
  const { isLoading, data } = useQuery({
    queryKey: ["dashboard-releases"],
    queryFn: async () => {
      const { releases } = await getReleases();
      return { releases };
    },
  });

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.releases && !data?.releases.length) {
    return <p>Nothing here yet...</p>;
  }

  return (
    <div className="flex flex-col gap-4 pr-4">
      {data?.releases.map((release) => (
        <Card key={release.id}>
          <CardHeader>
            <CardTitle>{formatDateToLocale(release.date)}</CardTitle>
            <CardDescription>
              This release was posted on {formatDateToLocale(release.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/release/${release.id}/edit`}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Edit
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ManageArticles() {
  const { isLoading, data } = useQuery({
    queryKey: ["dashboard-releases"],
    queryFn: async () => {
      const { articles } = await getArticles();
      return { articles };
    },
  });

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.articles && !data?.articles.length) {
    return <p>Nothing here yet...</p>;
  }

  return (
    <div className="flex flex-col gap-4 pr-4">
      {data?.articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            <CardDescription>
              This article was posted on {formatDateToLocale(article.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/article/${article.id}/edit`}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Edit
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
