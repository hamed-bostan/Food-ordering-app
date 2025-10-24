import { z } from "zod";

/**
 * Domain / Entity schema
 */
export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  comment: z.string(),
  image: z.string().optional(), // URL in DB
  createdAt: z.coerce.date(),
});

export type TestimonialType = z.infer<typeof TestimonialSchema>;
