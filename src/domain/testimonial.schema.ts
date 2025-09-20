import { z } from "zod";

export const baseTestimonialSchema = z.object({
  name: z.string(),
  date: z.string(),
  comment: z.string(),
});

// DB-stored testimonial (image as string)
export const testimonialSchema = baseTestimonialSchema.extend({
  image: z.string(),
});

// Server-side input validation (if needed)
export const testimonialInputSchema = baseTestimonialSchema.extend({});

// Types
export type TestimonialModel = z.infer<typeof testimonialSchema> & { id: string };
export type NewTestimonialModel = z.infer<typeof testimonialSchema>; // no id for inserts
