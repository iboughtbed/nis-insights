"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Icons } from "~/components/icons";
import { Button, buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { useMounted } from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";

export function SignOutButtons() {
  const router = useRouter();
  const mounted = useMounted();
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      try {
        await signOut({
          callbackUrl: "/",
        });
      } catch {
        toast.error("Something went wrong, please try again.");
      }
    });
  }

  return (
    <div className="flex w-full items-center gap-2">
      {mounted ? (
        <Button
          aria-label="Sign out"
          size="sm"
          className="w-full"
          onClick={handleSignOut}
          disabled={isPending}
        >
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Sign out
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground",
          )}
        >
          Sign out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  );
}
