"use client";

import { SectionIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { cn } from "~/lib/utils";

export function ArticleCategoriesNav() {
  const pathname = usePathname();

  const items = [
    { title: "All categories", href: "/articles" },
    { title: "Community", href: "/articles/community" },
    { title: "Guides", href: "/articles/guides" },
    { title: "Insights", href: "/articles/insights" },
  ];

  return (
    <>
      <nav className="mt-10 hidden sm:block">
        <div className="flex gap-4 font-medium">
          {items.map((item, index) => (
            <Link key={index} href={item.href}>
              <Badge
                variant={item.href === pathname ? "default" : "outline"}
                className="text-sm"
              >
                {item.title}
              </Badge>
            </Link>
          ))}
        </div>
      </nav>

      <Drawer shouldScaleBackground={false}>
        <DrawerTrigger asChild>
          <button className="flex items-center gap-2 sm:hidden">
            <SectionIcon className="size-4" />
            {items.find((item) => item.href === pathname)?.title}
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Select a category</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center gap-4 p-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
