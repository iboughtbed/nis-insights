import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface StackItemProps {
  title: string;
  description: string;
  link: {
    href: string;
    title: string;
  };
}

export function StackItem({ title, description, link }: StackItemProps) {
  return (
    <div className="animated-box flex h-[400px] w-full flex-col items-center justify-center rounded-3xl bg-[#101010]">
      <div className="flex flex-col items-center px-10 py-16 text-center">
        <h3 className="mb-4 text-3xl font-semibold">{title}</h3>
        <p className="mb-8 max-w-xs font-light text-muted-foreground max-md:text-balance">
          {description}
        </p>
        <Link
          href={link.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "rounded-3xl",
          )}
        >
          {link.title}
        </Link>
      </div>
    </div>
  );
}
