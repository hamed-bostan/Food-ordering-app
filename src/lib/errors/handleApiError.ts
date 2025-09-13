import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Standardized API error handler.
 * Logs error to server and returns normalized JSON response.
 */
export function handleApiError(error: unknown, context: string) {
  console.error(`❌ [${context}]`, error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "ValidationError", message: "Invalid input", details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    // Custom message is safe to expose
    return NextResponse.json({ error: "ServerError", message: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "ServerError", message: "Unknown error" }, { status: 500 });
}
