import { fetchCPStats } from "@/lib/cp-stats-fetcher";
import { successResponse, errorResponse } from "@/lib/api-response";

/**
 * GET /api/cp-stats
 *
 * Fetch live competitive programming stats from LeetCode and CodeChef.
 * Results are cached in-memory for 30 minutes.
 */
export async function GET() {
  try {
    const stats = await fetchCPStats();

    const response = successResponse(stats);

    // Cache for 5 minutes at CDN, stale-while-revalidate for 10 min
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (err) {
    console.error("[GET /api/cp-stats]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to fetch CP stats", 500);
  }
}
