import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

/**
 * GET /api/blog/:slug
 *
 * Fetch a single blog post by slug.
 * Returns the full meta + content + contentFormat.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return errorResponse("BLOG_NOT_FOUND", "Blog post not found", 404);
    }

    // Don't expose drafts to the public
    if (post.draft) {
      return errorResponse("BLOG_NOT_FOUND", "Blog post not found", 404);
    }

    return successResponse({
      meta: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        category: post.category,
        tags: post.tags,
        featured: post.featured,
        draft: post.draft,
        readingTime: post.readingTime,
      },
      content: post.content,
      contentFormat: post.contentFormat,
    });
  } catch (err) {
    console.error("[GET /api/blog/:slug]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch blog post", 500);
  }
}
