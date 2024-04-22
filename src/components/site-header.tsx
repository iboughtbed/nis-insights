import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

interface SiteHeaderProps {
  user?: Session["user"];
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 py-5 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex items-center justify-between">
        <Drawer shouldScaleBackground={false}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-3xl border border-current text-sm md:hidden"
            >
              Menu
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Navigate To</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col items-center gap-4 p-4">
                {siteConfig.mainNav
                  .slice()
                  .reverse()
                  .map((item, index) => (
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
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="hidden items-center gap-2 text-sm md:flex">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-center rounded-3xl border border-current px-3 py-1 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center py-3"
        >
          <Icons.logo />
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-3xl border border-current px-3 py-1 font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
          >
            Instagram
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-3xl border border-current px-3 py-1 font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:flex"
          >
            Github
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-8 rounded-full p-0"
                >
                  <Image
                    src="/avatars/kanye.webp"
                    alt="avatar"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <DashboardIcon
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/account">
                      <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/signout">
                    <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/signin"
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
                "rounded-3xl text-sm",
              )}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
