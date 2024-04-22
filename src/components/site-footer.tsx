import Link from "next/link";

import { Icons } from "~/components/icons";
import { ModeToggle } from "~/components/mode-toogle";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 w-full bg-background">
      <div className="container">
        <div className="flex flex-col gap-8 pb-8 pt-6 md:py-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <div>
              <Link href="/" className="flex w-fit items-center space-x-2">
                <Icons.logo />
                <span className="sr-only">Home</span>
              </Link>
            </div>
            <div className="flex flex-1 flex-wrap gap-10">
              {siteConfig.footerNav.map((item) => (
                <div key={item.title} className="space-y-3">
                  <h4 className="text-base font-medium">{item.title}</h4>
                  <ul className="space-y-2.5">
                    {item.items.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          target={link?.external ? "_blank" : undefined}
                          rel={link?.external ? "noreferrer" : undefined}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.title}
                          <span className="sr-only">{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
              Built by{" "}
              <Link
                href="https://github.com/iboughtbed"
                target="_blank"
                rel="noreferrer"
                className="font-semibold transition-colors hover:text-foreground"
              >
                iboughtbed
                <span className="sr-only">github</span>
              </Link>
              .
            </div>
            <div className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Icons.gitHub className="size-4" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
