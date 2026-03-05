import Link from "next/link";
import { getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function WritingTeaser() {
  const posts = getBlogPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight-custom text-white">
            Writing
          </h2>
          <p className="text-sm text-[#777] mt-1">
            Thinking out loud about engineering
          </p>
        </div>
        <Link
          href="/blog"
          className="text-sm text-[#666] hover:text-[#c4a482] transition-colors magnetic-hover"
        >
          Read all posts &rarr;
        </Link>
      </div>

      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center justify-between gap-4 py-4 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <h3 className="text-[15px] font-medium text-white truncate group-hover:text-[#c4a482] transition-colors duration-300">
                {post.title}
              </h3>
              {post.tags[0] && (
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-[#666] bg-white/[0.04] border border-white/[0.06] rounded-full px-2 py-0.5">
                  {post.tags[0]}
                </span>
              )}
            </div>
            <time className="shrink-0 font-mono text-xs text-[#555] tabular-nums">
              {formatDate(post.date)}
            </time>
          </Link>
        ))}
      </div>
    </section>
  );
}
