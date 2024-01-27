"use client";

// import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { usePathname } from "next/navigation";

import { TooltipProvider } from "~/components/ui/tooltip";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();

  return (
    <NextThemesProvider
      forcedTheme={pathname === "/" ? "dark" : undefined}
      {...props}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}

// interface PageTransitionProvider {
//   children: React.ReactNode;
// }

// export function PageTransitionProvider({ children }: PageTransitionProvider) {
//   const pathname = usePathname();

//   if (!["/", "/releases", "/articles", "/authors"].includes(pathname)) {
//     return <>{children}</>;
//   }

//   const columns = 5;

//   const animate = {
//     initial: { top: 0 },
//     enter: (index: number) => ({
//       top: "100%",
//       transition: {
//         duration: 0.5,
//         delay: 0.05 * index,
//       },
//     }),
//   };

//   return (
//     <AnimatePresence mode="wait">
//       <div key={pathname}>
//         <div className="pointer-events-none fixed left-0 top-0 z-[100] flex h-screen w-screen">
//           {Array.from({ length: columns }).map((_, i) => (
//             <motion.div
//               key={i}
//               initial="initial"
//               animate="enter"
//               exit="initial"
//               variants={animate}
//               custom={columns - i}
//               style={{ willChange: "transform" }}
//               className="relative h-full w-full bg-black"
//             />
//           ))}
//         </div>
//         {children}
//       </div>
//     </AnimatePresence>
//   );
// }
