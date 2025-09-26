import { CreateTestimonialDtoType, TestimonialType } from "@/application/schemas/testimonial.schema";
import { insertTestimonialToDb } from "@/infrastructure/repositories/testimonials.repository";
import { uploadImageToStorage } from "../storage/uploadImage";

export async function createTestimonialWithImageUseCase(
  data: CreateTestimonialDtoType,
  imageFile?: File
): Promise<TestimonialType> {
  try {
    let imageUrl = "";

    if (imageFile) {
      imageUrl = await uploadImageToStorage(imageFile, "testimonials", "testimonials");
    }

    const testimonialToInsert = {
      ...data,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    const insertedId = await insertTestimonialToDb(testimonialToInsert);

    return {
      ...testimonialToInsert,
      id: insertedId,
    };
  } catch (error) {
    console.error("❌ Error in createTestimonialWithImageUseCase:", error);
    throw error;
  }
}
