import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

/**
 * GET /api/timeline
 *
 * Return all timeline events ordered by the `order` field.
 * Includes Cache-Control header for read performance.
 */
export async function GET() {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: { order: "asc" },
      select: {
        year: true,
        title: true,
        description: true,
        type: true,
      },
    });

    const response = successResponse(events);

    // Add cache headers (5 minutes)
    response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");

    return response;
  } catch (err) {
    console.error("[GET /api/timeline]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch timeline", 500);
  }
}
