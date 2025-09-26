import { UpdateProductDtoType, UpdateProductDto, ProductType } from "@/application/schemas/product.schema";
import { findProductByIdInDb, updateProductInDb } from "@/infrastructure/repositories/product.repository";
import { ValidationError } from "@/domain/errors";
import { uploadImageToStorage } from "../storage/uploadImage";
import { deleteImageFromStorage } from "../storage/deleteImage";

/** Shared bucket/folder constants */
const PRODUCTS_BUCKET = "food-images";
const PRODUCTS_FOLDER = "products";

/**
 * Update a product, optionally replacing its image
 */
export async function updateProductUseCase(
  productId: string,
  fields: Partial<Omit<ProductType, "id" | "image">>, // exclude image from fields
  newImage?: File
): Promise<ProductType> {
  // Validate partial fields using UpdateProductDto schema
  const validatedFields: UpdateProductDtoType = UpdateProductDto.parse(fields);

  // Prepare variable for the updated image URL
  let imageUrl: string | undefined;

  if (newImage) {
    // Find existing product to delete old image
    const existing = await findProductByIdInDb(productId);
    if (!existing) throw new ValidationError("Product not found");

    if (existing.image) {
      await deleteImageFromStorage(existing.image, PRODUCTS_BUCKET);
    }

    // Upload new image
    imageUrl = await uploadImageToStorage(newImage, PRODUCTS_BUCKET, PRODUCTS_FOLDER);
  }

  // Update product in DB with validated fields + optional new image
  const updatedDoc = await updateProductInDb(productId, {
    ...validatedFields,
    ...(imageUrl ? { image: imageUrl } : {}),
  });

  // Return ProductType (ensure image is always string)
  return {
    id: updatedDoc.id,
    category: updatedDoc.category,
    title: updatedDoc.title,
    description: updatedDoc.description,
    price: updatedDoc.price,
    discount: updatedDoc.discount,
    score: updatedDoc.score,
    mostsale: updatedDoc.mostsale,
    filter: updatedDoc.filter,
    image: updatedDoc.image, // guaranteed string from DB
  };
}
