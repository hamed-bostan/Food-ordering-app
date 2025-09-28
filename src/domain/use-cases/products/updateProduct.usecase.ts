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
  fields: Partial<Omit<ProductType, "id" | "image" | "createdAt">>, // exclude id, image, createdAt
  newImage?: File
): Promise<ProductType> {
  // Find existing product first
  const existing = await findProductByIdInDb(productId);
  if (!existing) throw new ValidationError("Product not found");

  // Validate partial fields
  const validatedFields: UpdateProductDtoType = UpdateProductDto.parse(fields);

  // Handle image replacement
  let imageUrl = existing.image; // default to existing image
  if (newImage) {
    if (existing.image) {
      await deleteImageFromStorage(existing.image, PRODUCTS_BUCKET);
    }
    imageUrl = await uploadImageToStorage(newImage, PRODUCTS_BUCKET, PRODUCTS_FOLDER);
  }

  // Update in DB
  const updatedDoc = await updateProductInDb(productId, {
    ...validatedFields,
    image: imageUrl,
  });

  // Return fully typed ProductType, including createdAt
  const product: ProductType = {
    id: updatedDoc.id,
    category: updatedDoc.category,
    title: updatedDoc.title,
    description: updatedDoc.description,
    price: updatedDoc.price,
    discount: updatedDoc.discount,
    score: updatedDoc.score,
    mostsale: updatedDoc.mostsale,
    filter: updatedDoc.filter ?? undefined,
    image: updatedDoc.image,
    createdAt: existing.createdAt, // preserve original creation timestamp
  };

  return product;
}
