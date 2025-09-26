import { z } from "zod";

// Domain / Entity schema
export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  comment: z.string(),
  image: z.string(),
});

// API / Use-case DTOs
export const CreateTestimonialDto = z.object({
  name: z.string(),
  date: z.string(),
  comment: z.string(),
  image: z.string().optional(),
});

export const UpdateTestimonialDto = z.object({
  name: z.string().optional(),
  date: z.string().optional(),
  comment: z.string().optional(),
  image: z.string().optional(),
});

// Domain / Entity type
export type TestimonialType = z.infer<typeof TestimonialSchema>;

// DTO types
export type CreateTestimonialDtoType = z.infer<typeof CreateTestimonialDto>;
export type UpdateTestimonialDtoType = z.infer<typeof UpdateTestimonialDto>;
