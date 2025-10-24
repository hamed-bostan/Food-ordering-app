import { findTestimonialByIdInDb, updateTestimonialInDb } from "@/infrastructure/repositories/testimonials.repository";
import { ValidationError } from "@/domain/errors";
import { uploadImageToStorage } from "../storage/uploadImage";
import { deleteImageFromStorage } from "../storage/deleteImage";
import { TestimonialSchema, TestimonialType } from "@/application/schemas/testimonial.schema";
import { TestimonialUpdateDto } from "@/application/dto/testimonial/testimonial.dto";
import { TestimonialRecordUpdate } from "@/infrastructure/db/testimonial/testimonial.db.types";

const TESTIMONIALS_BUCKET = "testimonials";
const TESTIMONIALS_FOLDER = "testimonials";

export async function updateTestimonialUseCase(
  testimonialId: string,
  fields: TestimonialUpdateDto,
  newImage?: File
): Promise<TestimonialType> {
  // Fetch existing testimonial if we need to replace the image
  let imageUrl: string | undefined;

  if (newImage) {
    const existing = await findTestimonialByIdInDb(testimonialId);
    if (!existing) throw new ValidationError("Testimonial not found");

    if (existing.image) {
      await deleteImageFromStorage(existing.image, TESTIMONIALS_BUCKET);
    }

    imageUrl = await uploadImageToStorage(newImage, TESTIMONIALS_BUCKET, TESTIMONIALS_FOLDER);
  }

  // Map client DTO → DB-safe type
  const dbUpdate: TestimonialRecordUpdate = {
    name: fields.name,
    comment: fields.comment,
    ...(imageUrl ? { image: imageUrl } : {}), // only string here
  };

  const updated = await updateTestimonialInDb(testimonialId, dbUpdate);

  return TestimonialSchema.parse(updated);
}
