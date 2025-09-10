import { z } from "zod";
import { baseProductSchema } from "./product.schema";

// Schema for client-side form validation
export const productFormSchema = baseProductSchema.extend({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  filter: z.string().min(1, "Filter is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

// Type for form data
export type ProductFormType = z.infer<typeof productFormSchema>;
