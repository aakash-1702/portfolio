import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { BlogListWithFilter } from "@/components/blog/tag-filter";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing on backend systems, data modeling, and engineering practices.",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  ).sort();

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
      <header className="space-y-2 mb-10">
        <h1 className="text-2xl font-semibold text-white tracking-tight-custom">
          Blog
        </h1>
        <p className="text-sm text-[#777]">
          Writing about systems, architecture, and engineering decisions.
        </p>
      </header>

      {posts.length > 0 ? (
        <BlogListWithFilter posts={posts} allTags={allTags} />
      ) : (
        <div className="py-20 text-center">
          <p className="text-sm text-[#666]">No posts yet.</p>
          <p className="text-xs text-[#555] mt-1">Check back soon.</p>
        </div>
      )}

      <div className="pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs text-[#666] hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
        <a
          href="/blog/rss.xml"
          className="text-xs text-[#666] hover:text-[#c4a482] transition-colors font-mono"
        >
          RSS Feed
        </a>
      </div>
    </div>
  );
}
