import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

// ─── In-memory rate limiter (IP-based, 5 requests per minute) ────────────────

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipHits) {
    if (now > entry.resetAt) ipHits.delete(ip);
  }
}, 5 * 60_000);

// ─── Validation helpers ──────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactBody(body: unknown): string[] {
  const errors: string[] = [];
  if (!body || typeof body !== "object") {
    return ["Request body is required"];
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    errors.push("name is required (2-80 characters)");
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    errors.push("A valid email is required");
  }
  if (typeof message !== "string" || message.length < 10 || message.length > 2000) {
    errors.push("message is required (10-2000 characters)");
  }

  return errors;
}

/**
 * POST /api/contact
 *
 * Handle contact form submissions.
 * Validates payload and rate-limits by IP.
 */
export async function POST(req: NextRequest) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";

  if (isRateLimited(ip)) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many requests. Please try again later.",
      429
    );
  }

  try {
    const body = await req.json();
    const errors = validateContactBody(body);

    if (errors.length > 0) {
      return errorResponse("VALIDATION_ERROR", "Invalid request payload", 400, errors);
    }

    const msg = await prisma.contactMessage.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        message: body.message.trim(),
      },
    });

    return successResponse(
      {
        id: msg.id,
        receivedAt: msg.receivedAt.toISOString(),
      },
      undefined,
      201
    );
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return errorResponse("INTERNAL_ERROR", "Failed to submit contact message", 500);
  }
}
