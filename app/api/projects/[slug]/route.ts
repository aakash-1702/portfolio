import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

/**
 * GET /api/projects/:slug
 *
 * Fetch a single project by slug with full content.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return errorResponse("PROJECT_NOT_FOUND", "Project not found", 404);
    }

    return successResponse({
      slug: project.slug,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription,
      impact: project.impact,
      stack: project.stack,
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
      status: project.status,
      content: project.content,
      contentFormat: project.contentFormat,
    });
  } catch (err) {
    console.error("[GET /api/projects/:slug]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch project", 500);
  }
}
