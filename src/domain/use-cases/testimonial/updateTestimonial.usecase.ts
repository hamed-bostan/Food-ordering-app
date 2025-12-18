import { ValidationError } from "@/domain/errors";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { TestimonialUpdateInput } from "@/application/dto/testimonial/testimonial.dto";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const TESTIMONIALS_BUCKET = "food-images";
const TESTIMONIALS_FOLDER = "testimonials";

export async function updateTestimonialUseCase(
  testimonialId: string,
  fields: { name?: string; comment?: string },
  repository: ITestimonialRepository,
  storage: IImageStorageGateway,
  newImage?: File
): Promise<TestimonialType> {
  const existing = await repository.fetchTestimonialById(testimonialId);
  if (!existing) throw new ValidationError("Testimonial not found");

  let imageUrl = existing.image ?? "";
  if (newImage) {
    if (existing.image) {
      await storage.deleteImage(existing.image, TESTIMONIALS_BUCKET);
    }
    imageUrl = await storage.uploadImage(newImage, TESTIMONIALS_BUCKET, TESTIMONIALS_FOLDER);
  }

  const dbUpdate: TestimonialUpdateInput = {
    ...fields,
    ...(newImage ? { image: imageUrl } : {}),
  };

  const updated = await repository.updateTestimonial(testimonialId, dbUpdate);

  return updated;
}