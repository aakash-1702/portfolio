import type { NavItem } from "./types";

export const SITE_CONFIG = {
  name: "Akash Dwivedi",
  title: "Akash Dwivedi — Software Engineer",
  description:
    "Backend-focused full-stack engineer building scalable systems. 3rd year B.Tech CSE.",
  url: "https://akashdwivedi.dev",
  github: "https://github.com/akash",
  linkedin: "https://linkedin.com/in/akash",
  email: "akash@example.com",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
