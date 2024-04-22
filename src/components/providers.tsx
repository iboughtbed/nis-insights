"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";

import { TooltipProvider } from "~/components/ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  const darkPathnames = ["/", "/explore"];
  const lightPathnames = [""];

  return (
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
  );
}
