import type { Metadata } from "next";

import { CreateReleaseForm } from "~/components/forms/create-release-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";

import { Shell } from "~/components/shells/shell";

export const metadata: Metadata = {
  title: "New release",
  description: "Publish a new release",
};

export default function NewReleasePage() {
  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">New release</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Publish a new release
        </PageHeaderDescription>
      </PageHeader>
      <CreateReleaseForm />
    </Shell>
  );
}
