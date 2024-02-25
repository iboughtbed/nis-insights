"use client";

import type { UserRole } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
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
import { getReleasesCount } from "~/server/queries/release";
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
  // const { isLoading, data } = useQuery({
  //   queryKey: ["dashboard-releases"],
  //   queryFn: async () => {
  //     const { count } = await getReleasesCount();
  //     return { count };
  //   },
  // });

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  return (
    <div className="flex h-screen flex-col gap-4 pr-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>02/02/24</CardTitle>
            <CardDescription>
              This release was posted on 03/02/24
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/release"
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
  return (
    <div className="flex h-screen flex-col gap-4 pr-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              dolores?
            </CardTitle>
            <CardDescription>
              This article was posted on 03/02/24
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/article"
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
