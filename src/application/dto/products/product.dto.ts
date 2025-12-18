import { z } from "zod";
import { ProductCreateFormSchema, ProductUpdateFormSchema } from "@/application/schemas/product.form.schema";

// Existing (from your earlier context)
export const ProductCreateDtoSchema = ProductCreateFormSchema;
export type ProductCreateDto = z.infer<typeof ProductCreateDtoSchema>;

export const ProductUpdateDtoSchema = ProductUpdateFormSchema;
export type ProductUpdateDto = z.infer<typeof ProductUpdateDtoSchema>;

// New: DB/repo-friendly input types with image as string
export type ProductCreateInput = Omit<ProductCreateDto, "image"> & { image?: string };
export type ProductUpdateInput = Omit<ProductUpdateDto, "image"> & { image?: string };
