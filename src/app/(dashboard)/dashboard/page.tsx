import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { getCounts } from "~/server/queries/dashboard";
import { DashboardManager } from "./dashboard-manager";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your articles and comments.",
};

export default async function DashboardPage() {
  // TODO: add responsive design and clean up

  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  const { articlesCount, releasesCount } = await getCounts();

  return (
    <Shell variant="sidebar">
      <PageHeader className="p-2">
        <PageHeaderHeading>Dashboard manager</PageHeaderHeading>
        <PageHeaderDescription>
          Manage the content by clicking on the cards
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="content-info"
        aria-labelledby="content-info-heading"
        className="w-full overflow-hidden"
      >
        {session.user.role !== "USER" && (
          <DashboardManager
            role={user.role}
            _count={{
              articles: articlesCount,
              releases: releasesCount,
            }}
          />
        )}
      </section>
    </Shell>
  );
}
