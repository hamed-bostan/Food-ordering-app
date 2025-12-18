import { ValidationError } from "@/domain/errors";
import { ProductType } from "@/application/schemas/product.schema";
import { ProductUpdateDto } from "@/application/dto/products/product.dto";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const PRODUCTS_BUCKET = "food-images";
const PRODUCTS_FOLDER = "products";

export async function updateProductUseCase(
  productId: string,
  fields: ProductUpdateDto,
  repository: IProductRepository,
  storage: IImageStorageGateway,
  newImage?: File // Optional last
): Promise<ProductType> {
  const existing = await repository.fetchProductById(productId);
  if (!existing) throw new ValidationError("Product not found");

  let imageUrl = existing.image;
  if (newImage) {
    if (existing.image) {
      await storage.deleteImage(existing.image, PRODUCTS_BUCKET);
    }
    imageUrl = await storage.uploadImage(newImage, PRODUCTS_BUCKET, PRODUCTS_FOLDER);
  }

  // Omit 'image' (which could be File | undefined) to avoid type conflict
  const { image, ...fieldsWithoutImage } = fields;
  const dbUpdate = {
    ...fieldsWithoutImage,
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  const updated = await repository.updateProduct(productId, dbUpdate);

  return { ...updated, image: imageUrl || "" };
}
