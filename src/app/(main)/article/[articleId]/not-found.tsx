import { ErrorCard } from "~/components/error-card";

export default function ArticleNotFound() {
  return (
    <div className="container flex h-[100dvh] max-w-md flex-col justify-center gap-8 pb-8 pt-6 md:py-8">
      <ErrorCard
        title="Article not found"
        description="The article may have been deleted"
        retryLink="/articles"
        retryLinkText="Go to Home"
      />
    </div>
  );
}
