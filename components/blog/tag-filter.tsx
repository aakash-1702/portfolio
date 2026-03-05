"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { BlogPostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BlogListWithFilterProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export function BlogListWithFilter({ posts, allTags }: BlogListWithFilterProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
              activeTag === null
                ? "bg-[#c4a482]/10 border-[#c4a482]/30 text-[#c4a482]"
                : "border-white/[0.06] text-[#666] hover:text-white hover:border-white/[0.12]"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-300 ${
                activeTag === tag
                  ? "bg-[#c4a482]/10 border-[#c4a482]/30 text-[#c4a482]"
                  : "border-white/[0.06] text-[#666] hover:text-white hover:border-white/[0.12]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post list */}
      <LayoutGroup>
        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group block py-5 border-b transition-colors ${
                    post.featured
                      ? "border-l-2 border-l-[#c4a482]/30 border-b-white/[0.06] hover:border-b-white/[0.12] pl-5"
                      : "border-b-white/[0.06] hover:border-b-white/[0.12]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <time className="shrink-0 font-mono text-xs text-[#555] tabular-nums w-[90px]">
                        {formatDate(post.date)}
                      </time>
                      {post.tags[0] && (
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-[#666] bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5">
                          {post.tags[0]}
                        </span>
                      )}
                      <h2 className="text-sm font-medium text-white truncate group-hover:text-[#c4a482] transition-colors duration-300">
                        {post.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 sm:shrink-0 sm:pl-4">
                      <span className="text-[11px] text-[#555] font-mono">
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#666] mt-1.5 line-clamp-1 sm:pl-[90px] sm:ml-3">
                    {post.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm text-[#666]">No posts matching &ldquo;{activeTag}&rdquo;</p>
          <button
            onClick={() => setActiveTag(null)}
            className="text-xs text-[#c4a482] mt-2 hover:text-[#e5cdb4] transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}
    </>
  );
}
