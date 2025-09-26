import { findProductByIdInDb, deleteProductFromDb } from "@/infrastructure/repositories/product.repository";
import { deleteImageFromStorage } from "../storage/deleteImage";
import { ValidationError } from "@/domain/errors";

/** Shared bucket/folder constants */
const PRODUCTS_BUCKET = "food-images";

/**
 * Delete product and its associated image from storage
 */
export async function deleteProductUseCase(productId: string): Promise<boolean> {
  // Find existing product
  const existing = await findProductByIdInDb(productId);
  if (!existing) throw new ValidationError("Product not found");

  // Delete image from storage if exists
  if (existing.image) {
    await deleteImageFromStorage(existing.image, PRODUCTS_BUCKET);
  }

  // Delete product from DB
  return await deleteProductFromDb(productId);
}
