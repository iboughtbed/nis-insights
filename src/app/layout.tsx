import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "~/components/providers";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster as Sonner } from "~/components/ui/sonner";
import { siteConfig } from "~/config/site";
import { fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["NIS Insights", "NIS Uralsk"],
  authors: [
    {
      name: "iboughtbed",
      url: "https://github.com/iboughtbed",
    },
  ],
  creator: "iboughtbed",
  // openGraph
  // twitter
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", fontSans.className)}>
        {/* <PageTransitionProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div vaul-drawer-wrapper="">{children}</div>
          <TailwindIndicator />
          <Sonner />
        </ThemeProvider>
        {/* </PageTransitionProvider> */}
      </body>
    </html>
  );
}
