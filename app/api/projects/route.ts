import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

/**
 * GET /api/projects
 *
 * List all projects. Featured first, then by title.
 */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { title: "asc" }],
      select: {
        slug: true,
        title: true,
        description: true,
        longDescription: true,
        impact: true,
        stack: true,
        demoUrl: true,
        githubUrl: true,
        featured: true,
        status: true,
      },
    });

    return successResponse(projects);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch projects", 500);
  }
}
