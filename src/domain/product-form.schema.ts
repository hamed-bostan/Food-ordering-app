import { z } from "zod";

export const productFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative(),
  discount: z.number().min(0).max(100),
  score: z.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.boolean(),
  image: z
    .any()
    .refine((files) => !files || files instanceof FileList, "Invalid file input")
    .optional(),
});

export type ProductFormType = z.infer<typeof productFormSchema> & {
  image?: FileList;
};
