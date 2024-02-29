import { ErrorCard } from "~/components/cards/error-card";
import { Shell } from "~/components/shells/shell";

export default function ArticleNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Article not found"
        description="The article may have been deleted"
        retryLink="/articles"
        retryLinkText="Go to Home"
      />
    </Shell>
  );
}
