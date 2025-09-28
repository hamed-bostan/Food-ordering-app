import { z } from "zod";

// JSON-based form schema, image is optional
export const CreateProductFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative(),
  discount: z.number().min(0).max(100),
  score: z.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.boolean(),
  image: z.any().optional(),
});

export const UpdateProductFormSchema = z.object({
  category: z.string().min(1, "Category is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().nonnegative().optional(),
  discount: z.number().min(0).max(100).optional(),
  score: z.number().min(0).max(5).optional(),
  filter: z.string().optional(),
  mostsale: z.boolean().optional(),
  image: z.any().optional(),
});

// Types
export type CreateProductFormType = z.infer<typeof CreateProductFormSchema>;
export type UpdateProductFormType = z.infer<typeof UpdateProductFormSchema>;
