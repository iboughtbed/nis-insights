import type { Metadata } from "next";

import { CreateArticleForm } from "~/components/forms/create-article-form";
import { Shell } from "~/components/shells/shell";

export const metadata: Metadata = {
  title: "New article",
  description: "Write your article and share it with the world",
};

export default function NewArticlePage() {
  return (
    <Shell variant="markdown">
      <CreateArticleForm />
    </Shell>
  );
}
