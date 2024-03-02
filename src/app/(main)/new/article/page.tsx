import type { Metadata } from "next";

import { CreateArticleForm } from "~/components/forms/create-article-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shells/shell";

export const metadata: Metadata = {
  title: "New article",
  description: "Write your article and share it with the world",
};

export default async function NewArticlePage() {
  return (
    <Shell variant="markdown">
      <PageHeader>
        <PageHeaderHeading size="sm">New article</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Publish a new article
        </PageHeaderDescription>
      </PageHeader>
      <CreateArticleForm />
    </Shell>
  );
}
