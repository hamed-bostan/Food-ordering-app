import { ProductType } from "@/application/schemas/product.schema";

/**
 * DB insert type (what MongoDB expects when creating a product)
 */
export type ProductRecordInsert = Omit<ProductType, "id" | "createdAt"> & {
  image?: string; // optional
  createdAt: string; // DB stores as string
};

export type ProductRecordUpdate = Partial<Omit<ProductRecordInsert, "id">>;
