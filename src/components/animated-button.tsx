import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  href,
  children,
  className,
}: AnimatedButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "lg", className }),
        "group relative overflow-hidden",
      )}
    >
      <div className="absolute h-[calc(2.5rem*8)] w-[calc(2.5rem*8)] scale-0 rounded-full bg-purple-600 opacity-0 transition-transform duration-700 group-hover:scale-100 group-hover:opacity-100" />
      <span className="z-[3] transition-colors duration-700 group-hover:text-white">
        {children}
      </span>
    </Link>
  );
}
