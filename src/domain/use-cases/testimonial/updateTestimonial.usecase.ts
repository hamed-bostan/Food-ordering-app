import { findTestimonialByIdInDb, updateTestimonialInDb } from "@/infrastructure/repositories/testimonials.repository";
import { ValidationError } from "@/domain/errors";
import { uploadImageToStorage } from "../storage/uploadImage";
import { deleteImageFromStorage } from "../storage/deleteImage";
import {
  UpdateTestimonialDto,
  UpdateTestimonialDtoType,
  TestimonialSchema,
  TestimonialType,
} from "@/application/schemas/testimonial.schema";

const TESTIMONIALS_BUCKET = "testimonials";
const TESTIMONIALS_FOLDER = "testimonials";

export async function updateTestimonialUseCase(
  testimonialId: string,
  fields: Partial<Omit<TestimonialType, "id" | "image">>,
  newImage?: File
): Promise<TestimonialType> {
  // Validate partial fields
  const validatedFields: UpdateTestimonialDtoType = UpdateTestimonialDto.parse(fields);

  let imageUrl: string | undefined;

  if (newImage) {
    const existing = await findTestimonialByIdInDb(testimonialId);
    if (!existing) throw new ValidationError("Testimonial not found");

    if (existing.image) {
      await deleteImageFromStorage(existing.image, TESTIMONIALS_BUCKET);
    }

    imageUrl = await uploadImageToStorage(newImage, TESTIMONIALS_BUCKET, TESTIMONIALS_FOLDER);
  }

  const updated = await updateTestimonialInDb(testimonialId, {
    ...validatedFields,
    ...(imageUrl ? { image: imageUrl } : {}),
  });

  return TestimonialSchema.parse(updated);
}
