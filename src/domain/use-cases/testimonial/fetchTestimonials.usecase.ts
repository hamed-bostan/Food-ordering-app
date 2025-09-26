import { fetchTestimonialsFromDb } from "@/infrastructure/repositories/testimonials.repository";
import { TestimonialType } from "@/application/schemas/testimonial.schema";

/**
 * Fetch all testimonials (admin only in routes)
 */
export async function fetchTestimonialsUseCase(): Promise<TestimonialType[]> {
  return fetchTestimonialsFromDb();
}
