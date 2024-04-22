"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export function OAuthSignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("Signed in successfully");
    } catch {
      toast.error("Something went wrong, please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Button onClick={handleSignIn} disabled={isLoading}>
        <Icons.google className="mr-2 size-4" />
        Google
      </Button>
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        className="w-full"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        Back
      </Button>
    </div>
  );
}
