"use client";

import type { UserRole } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useMounted } from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";
import { deleteArticle } from "~/server/actions/article";
import { deleteRelease } from "~/server/actions/release";
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
        <div className="col-span-full flex flex-wrap gap-4">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
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
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["dashboard-releases"],
    queryFn: async () => {
      const { releases } = await getReleases();
      return { releases };
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      await deleteRelease({ id });
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.releases && !data?.releases.length) {
    return <p>Nothing here yet...</p>;
  }

  function handleDelete(id: string) {
    mutate(id);
  }

  return (
    <div className="flex flex-col gap-4 pr-4">
      {data?.releases.map((release) => (
        <Card key={release.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/release/${release.id}`} className="hover:underline">
                {format(release.date, "dd/MM/yy")}
              </Link>
            </CardTitle>
            <CardDescription>
              This release was posted on {format(release.createdAt, "dd/MM/yy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link
              href={`/edit/release/${release.id}`}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Edit
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the releases and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(release.id)}
                    disabled={isPending}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ManageArticles() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["dashboard-articles"],
    queryFn: async () => {
      const { articles } = await getArticles();
      return { articles };
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      await deleteArticle({ id });
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.articles && !data?.articles.length) {
    return <p>Nothing here yet...</p>;
  }

  function handleDelete(id: string) {
    mutate(id);
  }

  return (
    <div className="flex flex-col gap-4 pr-4">
      {data?.articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <CardTitle className="line-clamp-2">
              <Link href={`/article/${article.id}`} className="hover:underline">
                {article.title}
              </Link>
            </CardTitle>
            <CardDescription>
              This article was posted on {format(article.createdAt, "dd/MM/yy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link
              href={`/edit/article/${article.id}`}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Edit
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the release and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(article.id)}
                    disabled={isPending}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
