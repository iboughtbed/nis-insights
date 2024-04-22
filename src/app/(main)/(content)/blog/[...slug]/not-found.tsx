import { ErrorCard } from "~/components/error-card";

export default function BlogNotFound() {
  return (
    <div className="container flex h-[100dvh] max-w-md flex-col justify-center gap-8 pb-8 pt-6 md:py-8">
      <ErrorCard
        title="Post not found"
        description="The post you are looking for does not exist"
        retryLink="/blog"
        retryLinkText="Go to Blog"
      />
    </div>
  );
}
