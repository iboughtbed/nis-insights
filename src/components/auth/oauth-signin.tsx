"use client";

// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

export function OAuthSignIn() {
  const router = useRouter();

  // const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    // setIsLoading(true);
    // await signIn("google", { callbackUrl: "/" });
    toast.success("Successfully logged in! Redirecting...");
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Button
        onClick={handleSignIn}
        // disabled={isLoading}
      >
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => router.back()}
        // disabled={isLoading}
      >
        Back
      </Button>
    </div>
  );
}
