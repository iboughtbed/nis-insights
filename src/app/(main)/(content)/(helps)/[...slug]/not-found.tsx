import { ErrorCard } from "~/components/error-card";

export default function PageNotFound() {
  return (
    <div className="container flex h-[100dvh] max-w-md flex-col justify-center gap-8 pb-8 pt-6 md:py-8">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </div>
  );
}
