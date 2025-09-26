import {
  findTestimonialByIdInDb,
  deleteTestimonialFromDb,
} from "@/infrastructure/repositories/testimonials.repository";
import { deleteImageFromStorage } from "../storage/deleteImage";
import { ValidationError } from "@/domain/errors";

/**
 * Delete testimonial and its associated image from storage
 */
export async function deleteTestimonialUseCase(testimonialId: string): Promise<boolean> {
  // 1. Find existing testimonial
  const existing = await findTestimonialByIdInDb(testimonialId);
  if (!existing) throw new ValidationError("Testimonial not found");

  // 2. Delete image from storage if exists
  if (existing.image) {
    await deleteImageFromStorage(existing.image, "testimonials");
  }

  // 3. Delete testimonial from DB
  return await deleteTestimonialFromDb(testimonialId);
}
