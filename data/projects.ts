import type { ProjectData } from "@/lib/types";

export const projects: ProjectData[] = [
  {
    slug: "basecase",
    title: "BaseCase",
    description:
      "A DSA tracking platform with relational data modeling, nested transactions, and progress tracking.",
    longDescription:
      "Full-stack DSA practice tracking platform built with a relational schema design: Sheet → Section → Problem. Features nested transactions for atomic progress updates, optimistic UI, and Vercel deployment.",
    impact: "Full-stack DSA tracker · 500+ problems tracked with atomic transactions",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "TailwindCSS"],
    demoUrl: "https://basecase.vercel.app",
    githubUrl: "https://github.com/akash/basecase",
    featured: true,
    status: "active",
  },
  {
    slug: "portfolio",
    title: "Portfolio v2",
    description:
      "Production-grade personal site with MDX blog, dynamic OG images, and premium dark theme.",
    longDescription:
      "Rebuilt from scratch with Next.js 16 App Router, Framer Motion animations, and a custom design system. Features MDX blog engine, RSS feed, dynamic OG image generation, and full SEO optimization.",
    impact: "Next.js 16 App Router · Lighthouse 100 · Dark premium design system",
    stack: ["Next.js", "TypeScript", "MDX", "Framer Motion", "TailwindCSS"],
    githubUrl: "https://github.com/akash/portfolio",
    featured: false,
    status: "active",
  },
];
