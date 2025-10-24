import { z } from "zod";

/**
 * DTO for creating a product (server-side)
 */
export const ProductCreateDtoSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  discount: z.coerce.number().min(0).max(100),
  score: z.coerce.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.coerce.boolean(),
  image: z.string().optional(), // URL when present
});

export const ProductUpdateDtoSchema = ProductCreateDtoSchema.partial();

export type ProductCreateDto = z.infer<typeof ProductCreateDtoSchema>;
export type ProductUpdateDto = z.infer<typeof ProductUpdateDtoSchema>;
