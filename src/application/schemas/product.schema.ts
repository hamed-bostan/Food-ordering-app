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
});

// API / Use-case DTOs
export const CreateProductDto = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(), // accept string or number
  discount: z.coerce.number(),
  score: z.coerce.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.coerce.boolean(), // accept "true"/"false" or boolean
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

// Domain / Entity type
export type ProductType = z.infer<typeof ProductSchema>;

// DTO types
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;
