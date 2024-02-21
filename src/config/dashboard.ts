import { type SidebarNavItem } from "~/types";

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[];
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      items: [],
    },
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "avatar",
      items: [],
    },
  ],
};
