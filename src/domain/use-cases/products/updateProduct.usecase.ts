import { findProductByIdInDb, updateProductInDb } from "@/infrastructure/repositories/product.repository";
import { ValidationError } from "@/domain/errors";
import { uploadImageToStorage } from "../storage/uploadImage";
import { deleteImageFromStorage } from "../storage/deleteImage";
import { ProductType } from "@/application/schemas/product.schema";
import { ProductUpdateDto } from "@/application/dto/products/product.dto";
import { ProductRecordUpdate } from "@/infrastructure/db/products/product.db.types";

const PRODUCTS_BUCKET = "food-images";
const PRODUCTS_FOLDER = "products";

export async function updateProductUseCase(
  productId: string,
  fields: ProductUpdateDto,
  newImage?: File
): Promise<ProductType> {
  const existing = await findProductByIdInDb(productId);
  if (!existing) throw new ValidationError("Product not found");

  let imageUrl = existing.image;
  if (newImage) {
    if (existing.image) {
      await deleteImageFromStorage(existing.image, PRODUCTS_BUCKET);
    }
    imageUrl = await uploadImageToStorage(newImage, PRODUCTS_BUCKET, PRODUCTS_FOLDER);
  }

  const dbUpdate: ProductRecordUpdate = {
    ...fields,
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  const updated = await updateProductInDb(productId, dbUpdate);

  return { ...updated, image: imageUrl };
}
