import crypto from "crypto";
import { supabaseAdmin } from "@/infrastructure/supabase/supabase.client";
import { productInputSchema, NewProductType, ProductType } from "@/domain/product.schema";
import {
  deleteProductFromDb,
  findProductByIdInDb,
  insertProductToDb,
  mapToProductType,
  updateProductInDb,
} from "@/infrastructure/repositories/product.repository";

const BUCKET_NAME = "food-images";

// Create product with image
export async function createProductWithImage(fields: Record<string, string>, image: File): Promise<ProductType> {
  // Validate fields
  const validated = productInputSchema.parse(fields);

  // Upload image to Supabase
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileExtension = image.name.split(".").pop() || "jpg";
  const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, { contentType: image.type });

  if (uploadError) throw new Error("Failed to upload product image");

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  const imageUrl = urlData.publicUrl;

  // Save in DB
  const product: NewProductType = { ...(validated as unknown as NewProductType), image: imageUrl };
  const insertedId = await insertProductToDb(product);

  return mapToProductType({ ...product, _id: insertedId } as any);
}

// Update product with optional image replacement
export async function updateProductWithImage(
  productId: string,
  fields: Record<string, string>,
  image?: File
): Promise<ProductType> {
  const validated = productInputSchema.partial().parse(fields);

  let imageUrl: string | undefined;
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType: image.type });

    if (uploadError) throw new Error("Failed to upload product image");

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    imageUrl = urlData.publicUrl;
  }

  const updatedProduct = await updateProductInDb(productId, {
    ...validated,
    ...(imageUrl ? { image: imageUrl } : {}),
  });

  return updatedProduct;
}

// Delete product with image cleanup
export async function deleteProductWithImage(productId: string): Promise<boolean> {
  const product = await findProductByIdInDb(productId);
  if (!product) throw new Error("Product not found");

  // Try to delete image from Supabase
  if (product.image) {
    const filePath = product.image.split("/").pop();
    if (filePath) {
      await supabaseAdmin.storage.from(BUCKET_NAME).remove([`${BUCKET_NAME}/${filePath}`]);
    }
  }

  return deleteProductFromDb(productId);
}
