import { NextResponse } from "next/server";
import { fetchTestimonialsUseCase } from "@/domain/use-cases/testimonial/fetchTestimonials.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { TestimonialRepository } from "@/infrastructure/repositories/testimonials.repository";

/**
 * GET /api/testimonials
 */

export async function GET() {
  try {
    const repository = new TestimonialRepository();
    const testimonials = await fetchTestimonialsUseCase(repository);
    return NextResponse.json({ message: "Testimonials fetched successfully", result: testimonials }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Testimonials API - GET");
  }
}
