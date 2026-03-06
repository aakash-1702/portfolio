import type { NavItem } from "./types";

export const SITE_CONFIG = {
  name: "Akash Dwivedi",
  title: "Akash Dwivedi — Software Engineer",
  description:
    "Backend-focused full-stack engineer building scalable systems. 3rd year B.Tech CSE.",
  url: "https://akashdwivedi.dev",
  github: "https://github.com/aakash-1702",
  linkedin: "https://www.linkedin.com/in/aakash49/",
  email: "dwivediakash1702@gmail.com",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
