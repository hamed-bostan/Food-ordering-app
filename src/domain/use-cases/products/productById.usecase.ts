import { ProductType } from "@/application/schemas/product.schema";
import { findProductByIdInDb } from "@/infrastructure/repositories/product.repository";

/**
 * Fetch a single product by ID
 */
export async function fetchProductByIdUseCase(productId: string): Promise<ProductType> {
  const product = await findProductByIdInDb(productId);
  if (!product) throw new Error("Product not found");
  return product;
}
