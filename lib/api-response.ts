import { NextResponse } from "next/server";

/**
 * Wrap data in the standard success envelope.
 */
export function successResponse<T>(
  data: T,
  meta?: Record<string, unknown>,
  status = 200
) {
  const body: Record<string, unknown> = { success: true, data };
  if (meta) body.meta = meta;
  return NextResponse.json(body, { status });
}

/**
 * Wrap an error in the standard error envelope.
 */
export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown[]
) {
  const error: Record<string, unknown> = { code, message };
  if (details && details.length > 0) error.details = details;
  return NextResponse.json({ success: false, error }, { status });
}
