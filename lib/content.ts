import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostMeta } from "./types";
import { calculateReadingTime } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: (data.title as string) ?? "",
        description: (data.description as string) ?? "",
        date: (data.date as string) ?? "",
        category: (data.category as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        featured: (data.featured as boolean) ?? false,
        draft: (data.draft as boolean) ?? false,
        readingTime: calculateReadingTime(content),
      } satisfies BlogPostMeta;
    })
    .filter((post) => process.env.NODE_ENV === "development" || !post.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getBlogPost(
  slug: string
): { meta: BlogPostMeta; content: string } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const meta: BlogPostMeta = {
    slug,
    title: (data.title as string) ?? "",
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    category: (data.category as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    featured: (data.featured as boolean) ?? false,
    draft: (data.draft as boolean) ?? false,
    readingTime: calculateReadingTime(content),
  };

  return { meta, content };
}

export function getProjectContent(slug: string): string | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}
