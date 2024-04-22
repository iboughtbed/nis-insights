import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your articles and comments",
};

export default async function DashboardPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col gap-8 pb-8 pt-6 md:py-8">
      <div className="w-full overflow-hidden"></div>
    </div>
  );
}
