import { NextRequest } from "next/server";

/**
 * Check whether the request carries a valid admin Bearer token.
 * Compares against the ADMIN_API_KEY environment variable.
 */
export function isAuthorizedAdmin(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return false;

  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;

  return token === adminKey;
}
