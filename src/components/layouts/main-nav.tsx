"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import type { MainNavItem } from "~/types";

interface MainNavProps {
  items: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden items-end md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold transition-colors hover:text-foreground/80 sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
