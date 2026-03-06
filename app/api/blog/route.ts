import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { isAuthorizedAdmin } from "@/lib/api-auth";
import { calculateReadingTime } from "@/lib/utils";

/**
 * GET /api/blog
 *
 * List blog posts with optional filtering and pagination.
 * Drafts are excluded unless the caller is an authenticated admin.
 *
 * Query params: tag, featured, page, limit
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const tag = searchParams.get("tag");
    const featuredParam = searchParams.get("featured");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10))
    );

    const isAdmin = isAuthorizedAdmin(req);

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    // Exclude drafts from public view
    if (!isAdmin) {
      where.draft = false;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (featuredParam !== null) {
      where.featured = featuredParam === "true";
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          slug: true,
          title: true,
          description: true,
          date: true,
          category: true,
          tags: true,
          featured: true,
          draft: true,
          readingTime: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return successResponse(posts, {
      total,
      page,
      limit,
      hasNextPage: page * limit < total,
    });
  } catch (err) {
    console.error("[GET /api/blog]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch blog posts", 500);
  }
}

/**
 * POST /api/blog
 *
 * Admin-only: create a new blog post.
 * Requires Authorization: Bearer <ADMIN_API_KEY>
 */
export async function POST(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return errorResponse("UNAUTHORIZED", "Missing or invalid admin token", 401);
  }

  try {
    const body = await req.json();
    const errors: string[] = [];

    // Validate required fields
    if (!body.slug || typeof body.slug !== "string")
      errors.push("slug is required");
    if (!body.title || typeof body.title !== "string")
      errors.push("title is required");
    if (!body.description || typeof body.description !== "string")
      errors.push("description is required");
    if (!body.date || typeof body.date !== "string")
      errors.push("date is required (ISO-8601)");
    if (!body.category || typeof body.category !== "string")
      errors.push("category is required");

    if (errors.length > 0) {
      return errorResponse("VALIDATION_ERROR", "Invalid request payload", 400, errors);
    }

    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({
      where: { slug: body.slug },
    });
    if (existing) {
      return errorResponse("SLUG_EXISTS", `Blog post with slug "${body.slug}" already exists`, 409);
    }

    const content = body.content ?? "";
    const readingTime = calculateReadingTime(content);

    const post = await prisma.blogPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        description: body.description,
        date: body.date,
        category: body.category,
        tags: body.tags ?? [],
        featured: body.featured ?? false,
        draft: body.draft ?? false,
        content,
        contentFormat: body.contentFormat ?? "mdx",
        readingTime,
      },
    });

    return successResponse({ slug: post.slug }, undefined, 201);
  } catch (err) {
    console.error("[POST /api/blog]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to create blog post", 500);
  }
}