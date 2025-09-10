import { z } from "zod";

// Base schema with common fields
export const baseProductSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number().min(0),
  discount: z.number().min(0),
  score: z.number().min(0).max(5),
  filter: z.string(),
  mostsale: z.boolean(),
});

// Schema for database-stored products (with image as string)
export const productSchema = baseProductSchema.extend({
  image: z.string(),
});

// Schema for server-side input validation (with coercion, no image)
export const productInputSchema = baseProductSchema.extend({
  price: z.coerce.number().min(0),
  discount: z.coerce.number().min(0),
  score: z.coerce.number().min(0).max(5),
  mostsale: z.coerce.boolean(),
});

// Type for products retrieved from the database (with id)
export type ProductType = z.infer<typeof productSchema> & { id: string }; // id is stringified _id

// Type for new products to be inserted (no id)
export type NewProductType = z.infer<typeof productSchema>; // No id for MongoDB inserts
