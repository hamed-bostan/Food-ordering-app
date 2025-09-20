import { NextResponse } from "next/server";
import { fetchTestimonialsFromDb } from "@/infrastructure/repositories/testimonials.repository";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/testimonials
 */
export async function GET() {
  try {
    const testimonials = await fetchTestimonialsFromDb();
    return NextResponse.json({ message: "Testimonials fetched successfully", result: testimonials }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Testimonials API - GET");
  }
}
