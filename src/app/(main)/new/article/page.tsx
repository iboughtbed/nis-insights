import type { Metadata } from "next";

import { CreateArticleForm } from "~/components/forms/create-article-form";
import { Shell } from "~/components/shells/shell";

export const metadata: Metadata = {
  title: "New article",
  description: "Create a new article using the markdown editor.",
};

export default function NewArticlePage() {
  return (
    <Shell variant="markdown">
      <CreateArticleForm />
    </Shell>
  );
}
