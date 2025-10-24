import { z } from "zod";

/**
 * Domain / Entity schema
 */
export const ProductSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  score: z.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.boolean(),
  image: z.string().optional(),
  createdAt: z.coerce.date(),
});

export type ProductType = z.infer<typeof ProductSchema>;
