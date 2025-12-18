import { z } from "zod";

export const TestimonialCreateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(1, "Comment is required"),
  image: z.instanceof(File).optional(),
});

export const TestimonialUpdateFormSchema = TestimonialCreateFormSchema.partial();

export type TestimonialCreateFormType = z.infer<typeof TestimonialCreateFormSchema>;
export type TestimonialUpdateFormType = z.infer<typeof TestimonialUpdateFormSchema>;
