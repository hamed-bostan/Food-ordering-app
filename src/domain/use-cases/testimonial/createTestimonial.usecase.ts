import { CreateTestimonialDtoType, TestimonialType } from "@/application/schemas/testimonial.schema";
import { insertTestimonialToDb } from "@/infrastructure/repositories/testimonials.repository";
import { uploadImageToStorage } from "../storage/uploadImage";

export async function createTestimonialWithImageUseCase(
  data: CreateTestimonialDtoType,
  imageFile?: File
): Promise<TestimonialType> {
  try {
    // Upload image if provided
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToStorage(imageFile, "testimonials", "testimonials");
    }

    // Prepare testimonial to insert (DB stores createdAt as string)
    const createdAt = new Date(); // keep Date object for domain entity
    const testimonialToInsert = {
      ...data,
      image: imageUrl,
      createdAt: createdAt.toISOString(), // store as string in DB
    };

    // Insert into DB
    const insertedId = await insertTestimonialToDb(testimonialToInsert);

    // Return fully typed domain entity with Date object
    const testimonial: TestimonialType = {
      ...data,
      id: insertedId.toString(),
      image: imageUrl,
      createdAt, // ✅ keep as Date for domain
    };

    return testimonial;
  } catch (error) {
    console.error("❌ Error in createTestimonialWithImageUseCase:", error);
    throw error;
  }
}
