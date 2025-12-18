import { ValidationError } from "@/domain/errors";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const TESTIMONIALS_BUCKET = "food-images";

export async function deleteTestimonialUseCase(
  testimonialId: string,
  repository: ITestimonialRepository,
  storage: IImageStorageGateway
): Promise<boolean> {
  const existing = await repository.fetchTestimonialById(testimonialId);
  if (!existing) throw new ValidationError("Testimonial not found");

  if (existing.image) {
    await storage.deleteImage(existing.image, TESTIMONIALS_BUCKET);
  }

  return await repository.deleteTestimonial(testimonialId);
}
