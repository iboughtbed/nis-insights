import type { FooterItem, MainNavItem } from "~/types";

const links = {
  instagram: "https://instagram.com/insights.nis",
  github: "htpps://github.com/iboughtbed/nis-insights",
};

export const siteConfig = {
  name: "NIS Insights",
  url: "http://localhost:3000",
  // ogImage
  description:
    "Discover the pulse of our school with NIS Insights, your go-to source for engaging stories, student perspectives, and captivating visuals in the world of education.",
  links,
  mainNav: [
    { title: "Releases", href: "/releases" },
    { title: "Articles", href: "/articles" },
    { title: "Authors", href: "/authors" },
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
