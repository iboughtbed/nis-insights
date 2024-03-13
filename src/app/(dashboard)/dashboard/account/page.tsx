import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { UserProfile } from "~/components/auth/user-profile";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
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
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="w-full overflow-hidden"
      >
        <UserProfile
          user={{
            username: session.user.username,
            name: session.user.name,
          }}
        />
      </section>
    </Shell>
  );
}
