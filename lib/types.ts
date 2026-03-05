export type ProjectData = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  impact?: string;
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "active" | "archived" | "wip";
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: number;
};

export type CPStats = {
  leetcode: { rating: number; solved: number; profile: string; percentile?: string };
  codeforces?: { rating: number; maxRating: number; profile: string; percentile?: string };
  codechef: { stars: number; rating: number; profile: string };
  guardian: { current: number; target: number };
  lastUpdated: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  type: "education" | "project" | "achievement";
};
