import { z } from "zod";

export const TestimonialCreateDtoSchema = z.object({
  name: z.string(),
  comment: z.string(),
  image: z.instanceof(File).optional(),
});

export type TestimonialCreateDto = z.infer<typeof TestimonialCreateDtoSchema>;

export const TestimonialUpdateDtoSchema = TestimonialCreateDtoSchema.partial();
export type TestimonialUpdateDto = z.infer<typeof TestimonialUpdateDtoSchema>;
