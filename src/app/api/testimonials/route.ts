import { NextResponse } from "next/server";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { fetchTestimonialsUseCase } from "@/domain/use-cases/testimonial/fetchTestimonials.usecase";

/**
 * GET /api/testimonials
 */

export async function GET() {
  try {
    const testimonials = await fetchTestimonialsUseCase();
    return NextResponse.json({ message: "Testimonials fetched successfully", result: testimonials }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Testimonials API - GET");
  }
}
