import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Shell } from "~/components/shells/shell";
import { getServerAuthSession } from "~/lib/auth";
import { DashboardManage } from "./dashboard-manage";

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

  return (
    <Shell variant="sidebar">
      <DashboardManage
        role={session?.user.role}
        _count={{
          articles: 1,
          comments: 1,
          releases: 2,
        }}
      />
    </Shell>
  );
}
