import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { TestimonialInsertInput, TestimonialUpdateInput } from "@/application/dto/testimonial/testimonial.dto";

export interface ITestimonialRepository {
  insertTestimonial(testimonial: TestimonialInsertInput): Promise<string>;
  fetchTestimonials(): Promise<TestimonialType[]>;
  fetchTestimonialById(id: string): Promise<TestimonialType | null>;
  updateTestimonial(id: string, update: TestimonialUpdateInput): Promise<TestimonialType>;
  deleteTestimonial(id: string): Promise<boolean>;
}
