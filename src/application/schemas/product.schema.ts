import { z } from "zod";

// Domain / Entity schema
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
  image: z.string(),

  // domain-only field, always present
  createdAt: z.coerce.date(),
});

// API / Use-case DTOs (clients should NOT set createdAt)
export const CreateProductDto = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  discount: z.coerce.number(),
  score: z.coerce.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.coerce.boolean(),
  image: z.string().optional(),
});

export const UpdateProductDto = z.object({
  category: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  discount: z.coerce.number().optional(),
  score: z.coerce.number().min(0).max(5).optional(),
  filter: z.string().optional(),
  mostsale: z.coerce.boolean().optional(),
  image: z.string().optional(),
});

// Types
export type ProductType = z.infer<typeof ProductSchema>;
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;
