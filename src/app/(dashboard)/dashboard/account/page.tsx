import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

export default async function AccountPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col gap-8 pb-8 pt-6 md:py-8">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <div className="w-full overflow-hidden">
        {/* <UserProfile
          user={{
            username: session.user.username,
            name: session.user.name,
          }}
        /> */}
      </div>
    </div>
  );
}
