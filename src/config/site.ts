import type { FooterItem, MainNavItem, NavItem } from "~/types";

const links = {
  instagram: "https://instagram.com/insights.nis",
  github: "https://github.com/iboughtbed/nis-insights",
};

export const siteConfig = {
  name: "NIS Insights",
  url: "https://nis-insights.org/",
  ogImage: "https://nis-insights.org/og.png",
  description:
    "Discover the pulse of our school with NIS Insights, your go-to source for engaging stories, student perspectives, and captivating visuals in the world of education",
  slogan: "Insights - inspire. create. unite. our stories, your voice.",
  links,
  commandNav: [{ title: "Home", href: "/" }] satisfies NavItem[],
  mainNav: [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Explore", href: "/explore" },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: "Help",
      items: [
        { title: "About", href: "/about", external: false },
        { title: "Contact", href: "/contact", external: false },
        { title: "Terms", href: "/terms", external: false },
        { title: "Privacy", href: "/privacy", external: false },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Instagram",
          href: links.instagram,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};

export type SiteConfig = typeof siteConfig;
