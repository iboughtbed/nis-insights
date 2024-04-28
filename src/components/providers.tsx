"use client";

import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";

import { TooltipProvider } from "~/components/ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  const darkPathnames = ["/", "/explore", "/releases"];
  const lightPathnames = ["/articles", "/blog"];

  return (
    <JotaiProvider>
      <NextThemesProvider
        forcedTheme={
          darkPathnames.includes(pathname)
            ? "dark"
            : lightPathnames.includes(pathname)
              ? "light"
              : undefined
        }
        {...props}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </JotaiProvider>
  );
}
