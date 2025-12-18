import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";

export async function fetchTestimonialsUseCase(repository: ITestimonialRepository): Promise<TestimonialType[]> {
  return await repository.fetchTestimonials();
}
