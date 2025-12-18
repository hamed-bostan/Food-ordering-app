import { ValidationError } from "@/domain/errors";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const PRODUCTS_BUCKET = "food-images";

export async function deleteProductUseCase(
  productId: string,
  repository: IProductRepository,
  storage: IImageStorageGateway
): Promise<boolean> {
  // Find existing product
  const existing = await repository.fetchProductById(productId);
  if (!existing) throw new ValidationError("Product not found");

  // Delete image from storage if exists
  if (existing.image) {
    await storage.deleteImage(existing.image, PRODUCTS_BUCKET);
  }

  // Delete product from DB
  return await repository.deleteProduct(productId);
}
