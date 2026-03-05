import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SharePost } from "@/components/blog/share-post";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Get all posts for prev/next navigation
  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-16">
      <div className="flex gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Header */}
          <header className="mb-12 space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#666]">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              <span>·</span>
              <span>{post.meta.readingTime} min read</span>
              {post.meta.category && (
                <>
                  <span>·</span>
                  <span>{post.meta.category}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight-custom">
              {post.meta.title}
            </h1>

            <p className="text-sm text-[#888] leading-relaxed">
              {post.meta.description}
            </p>

            {post.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#666] bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <article className="prose prose-invert prose-zinc max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-[#999] prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-strong:text-white prose-code:text-zinc-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-li:text-[#999]">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </article>

          {/* Share */}
          <div className="mt-12 pt-6 border-t border-white/[0.06]">
            <SharePost title={post.meta.title} slug={slug} />
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-stretch justify-between gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col gap-1 text-left flex-1 min-w-0"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                  ← Previous
                </span>
                <span className="text-sm text-[#888] group-hover:text-[#c4a482] transition-colors truncate">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col gap-1 text-right flex-1 min-w-0"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                  Next →
                </span>
                <span className="text-sm text-[#888] group-hover:text-[#c4a482] transition-colors truncate">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Back link */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <Link
              href="/blog"
              className="text-xs text-[#666] hover:text-white transition-colors"
            >
              ← All posts
            </Link>
          </div>
        </div>

        {/* Sidebar — Table of Contents */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
          <TableOfContents content={post.content} />
        </aside>
      </div>
    </div>
  );
}
