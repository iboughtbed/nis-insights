import { notFound, redirect } from "next/navigation";

import { EditReleaseForm } from "~/components/forms/edit-release-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { getServerAuthSession } from "~/server/auth";
import { getRelease } from "~/server/queries/release";

export default async function EditReleasePage({
  params,
}: {
  params: { releaseId: string };
}) {
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const { data } = await getRelease({ id: params.releaseId });

  if (!data?.release) {
    notFound();
  }

  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">Edit release</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Edit the release
        </PageHeaderDescription>
      </PageHeader>
      <EditReleaseForm id={params.releaseId} {...data.release} />
    </Shell>
  );
}
