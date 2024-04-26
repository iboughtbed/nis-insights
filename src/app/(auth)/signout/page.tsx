import type { Metadata } from "next";

import { SignOutButtons } from "../_components/signout-buttons";

export const metadata: Metadata = {
  title: "Sign out",
  description: "Sign out of your account",
};

export default function SignOutPage() {
  return (
    <div className="container flex max-w-xs flex-col gap-8 pb-8 pt-6 md:py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
          Sign out
        </h1>
        <p className="max-w-[750px] text-sm text-muted-foreground sm:text-base">
          Are you sure you want to sign out?
        </p>
      </div>
      <SignOutButtons />
    </div>
  );
}
