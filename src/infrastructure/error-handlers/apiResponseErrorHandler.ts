import { ForbiddenError, UnauthorizedError, ValidationError } from "@/domain/errors";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiResponseErrorHandler(error: unknown, context: string) {
  console.error(`❌ [${context}]`, error); // Consistent logging

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "ValidationError", message: "Invalid input", details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof ValidationError) {
    return NextResponse.json({ error: "ValidationError", message: error.message }, { status: 400 });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Unauthorized", message: error.message }, { status: 401 });
  }

  if (error instanceof ForbiddenError) {
    return NextResponse.json({ error: "Forbidden", message: error.message }, { status: 403 });
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: "ServerError", message: error.message }, { status: 500 });
  }

  return NextResponse.json({ error: "ServerError", message: "Unknown error" }, { status: 500 });
}
