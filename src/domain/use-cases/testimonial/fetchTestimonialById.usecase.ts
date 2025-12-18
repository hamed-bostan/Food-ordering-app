import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";

export async function fetchTestimonialByIdUseCase(
  id: string,
  repository: ITestimonialRepository
): Promise<TestimonialType | null> {
  return await repository.fetchTestimonialById(id);
}
