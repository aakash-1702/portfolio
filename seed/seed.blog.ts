import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { prisma } from "../lib/prisma";
import { calculateReadingTime } from "../lib/utils";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type BlogSeedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  content: string;
  contentFormat: string;
  readingTime: number;
};

function loadBlogPostsFromContent(): BlogSeedPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort();

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
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
      content,
      contentFormat: "mdx",
      readingTime: calculateReadingTime(content),
    } satisfies BlogSeedPost;
  });
}

export async function seedBlogPosts() {
  console.log("  📝 Seeding blog posts...");

  const blogPosts = loadBlogPostsFromContent();
  const keepSlugs = blogPosts.map((post) => post.slug);

  if (keepSlugs.length > 0) {
    await prisma.blogPost.deleteMany({
      where: {
        slug: {
          notIn: keepSlugs,
        },
      },
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { ...post },
      create: { ...post },
    });
  }

  console.log(`  ✓ ${blogPosts.length} blog post(s) seeded`);
}
