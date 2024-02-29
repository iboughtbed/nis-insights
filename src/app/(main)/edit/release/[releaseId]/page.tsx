import { redirect } from "next/navigation";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";
import { getServerAuthSession } from "~/server/auth";

export default async function EditReleasePage() {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Edit release</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Edit the release
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
