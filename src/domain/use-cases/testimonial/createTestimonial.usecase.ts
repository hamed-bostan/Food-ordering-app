import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const TESTIMONIALS_BUCKET = "food-images";
const TESTIMONIALS_FOLDER = "testimonials";

export async function createTestimonialWithImageUseCase(
  data: { name: string; comment: string },
  repository: ITestimonialRepository,
  storage: IImageStorageGateway,
  imageFile?: File
): Promise<TestimonialType> {
  let imageUrl = "";
  if (imageFile) {
    imageUrl = await storage.uploadImage(imageFile, TESTIMONIALS_BUCKET, TESTIMONIALS_FOLDER);
  }

  const createdAt = new Date();

  const testimonialToInsert = {
    name: data.name,
    comment: data.comment,
    image: imageUrl,
    createdAt: createdAt.toISOString(),
  };

  const insertedId = await repository.insertTestimonial(testimonialToInsert);

  const testimonial: TestimonialType = {
    id: insertedId,
    name: data.name,
    comment: data.comment,
    image: imageUrl,
    createdAt,
  };

  return testimonial;
}
