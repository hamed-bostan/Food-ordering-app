import { CreateProductDtoType, CreateProductDto, ProductType } from "@/application/schemas/product.schema";
import { uploadImageToStorage } from "../storage/uploadImage";
import { ValidationError } from "@/domain/errors";
import { insertProductToDb } from "@/infrastructure/repositories/product.repository";

/**
 * Create a new product with an image
 * @param formData FormData from client containing product fields and image
 */
export async function createProductWithImageUseCase(formData: FormData): Promise<ProductType> {
  // Extract non-image fields
  const fields: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "image") fields[key] = value;
  }

  // Validate fields
  const validatedFields: CreateProductDtoType = CreateProductDto.parse({
    ...fields,
    price: Number(fields.price),
    discount: Number(fields.discount),
    score: Number(fields.score),
    mostsale: fields.mostsale === "true" || fields.mostsale === true,
  });

  // Extract image
  const image = formData.get("image") as File | null;
  if (!image) throw new ValidationError("Image is required");

  // Upload image
  const imageUrl = await uploadImageToStorage(image, "food-images", "products");

  // Insert into DB
  const insertedId = await insertProductToDb({
    ...validatedFields,
    image: imageUrl,
    createdAt: new Date().toISOString(),
  });

  // Return ProductType (explicitly assign all required fields)
  return {
    id: insertedId.toHexString(),
    category: validatedFields.category,
    title: validatedFields.title,
    description: validatedFields.description,
    price: validatedFields.price,
    discount: validatedFields.discount,
    score: validatedFields.score,
    mostsale: validatedFields.mostsale,
    filter: validatedFields.filter,
    image: imageUrl,
  };
}
