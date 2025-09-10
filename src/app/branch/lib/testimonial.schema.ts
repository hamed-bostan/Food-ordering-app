// Base schema with common fields
import { z } from "zod";

export const baseTestimonialSchema = z.object({
  name: z.string(),
  date: z.string(),
  comment: z.string(),
});

// Schema for database-stored testimonials (with image as string)
export const testimonialSchema = baseTestimonialSchema.extend({
  image: z.string(),
});

// Schema for server-side input validation (with coercion, no image)
export const testimonialInputSchema = baseTestimonialSchema.extend({
  // No coercions needed if all are strings, but add if necessary
});

// Type for testimonials retrieved from the database (with id)
export type TestimonialType = z.infer<typeof testimonialSchema> & { id: string }; // id is stringified _id

// Type for new testimonials to be inserted (no id)
export type NewTestimonialType = z.infer<typeof testimonialSchema>; // No id for MongoDB inserts
