import { z } from "zod";

export const ProductCreateFormSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().nonnegative(),
  discount: z.coerce.number().min(0).max(100),
  score: z.coerce.number().min(0).max(5),
  filter: z.string().optional(),
  mostsale: z.coerce.boolean(),
  image: z.instanceof(File).optional(),
});

export const ProductUpdateFormSchema = ProductCreateFormSchema.partial();

export type ProductCreateFormType = z.infer<typeof ProductCreateFormSchema>;
export type ProductUpdateFormType = z.infer<typeof ProductUpdateFormSchema>;
