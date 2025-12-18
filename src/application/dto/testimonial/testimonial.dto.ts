import { z } from "zod";
import { TestimonialType } from "@/application/schemas/testimonial.schema";

export const TestimonialCreateDtoSchema = z.object({
  name: z.string(),
  comment: z.string(),
  image: z.instanceof(File).optional(),
});

export type TestimonialCreateDto = z.infer<typeof TestimonialCreateDtoSchema>;

export const TestimonialUpdateDtoSchema = TestimonialCreateDtoSchema.partial();
export type TestimonialUpdateDto = z.infer<typeof TestimonialUpdateDtoSchema>;

export type TestimonialInsertInput = {
  name: string;
  comment: string;
  image: string;
  createdAt: string;
};

export type TestimonialUpdateInput = Partial<Omit<TestimonialType, "id" | "createdAt">>;
