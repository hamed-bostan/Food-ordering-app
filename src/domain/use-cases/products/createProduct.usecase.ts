import { ProductType } from "@/application/schemas/product.schema";
import { uploadImageToStorage } from "../storage/uploadImage";
import { insertProductToDb } from "@/infrastructure/repositories/product.repository";
import { ProductCreateDto } from "@/application/dto/products/product.dto";
import { ProductRecordInsert } from "@/infrastructure/db/products/product.db.types";

/**
 * Create product with image
 */
export async function createProductWithImageUseCase(data: ProductCreateDto, imageFile?: File): Promise<ProductType> {
  let imageUrl = "";
  if (imageFile) {
    imageUrl = await uploadImageToStorage(imageFile, "food-images", "products");
  }

  const createdAt = new Date();
  const productToInsert: ProductRecordInsert = {
    ...data,
    image: imageUrl,
    createdAt: createdAt.toISOString(),
  };

  const insertedId = await insertProductToDb(productToInsert);

  const product: ProductType = {
    ...data,
    id: insertedId,
    image: imageUrl,
    createdAt,
  };

  return product;
}
