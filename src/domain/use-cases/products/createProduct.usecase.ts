import { CreateProductDtoType, CreateProductDto, ProductType } from "@/application/schemas/product.schema";
import { uploadImageToStorage } from "../storage/uploadImage";
import { ValidationError } from "@/domain/errors";
import { insertProductToDb } from "@/infrastructure/repositories/product.repository";

/**
 * Create a new product with an image
 * @param formData FormData from client containing product fields and image
 */
export async function createProductWithImageUseCase(formData: FormData): Promise<ProductType> {
  // Extract non-image fields from FormData
  const fields: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== "image") fields[key] = value;
  }

  // Validate fields with DTO schema
  const validatedFields: CreateProductDtoType = CreateProductDto.parse({
    ...fields,
    price: Number(fields.price),
    discount: Number(fields.discount),
    score: Number(fields.score),
    mostsale: fields.mostsale === "true" || fields.mostsale === true,
  });

  // Extract image file
  const image = formData.get("image") as File | null;
  if (!image) throw new ValidationError("Image is required");

  // Upload image to storage
  const imageUrl = await uploadImageToStorage(image, "food-images", "products");

  // Assign createdAt timestamp
  const createdAt = new Date();

  // Insert into DB (repository)
  const insertedId = await insertProductToDb({
    ...validatedFields,
    image: imageUrl,
    createdAt: createdAt.toISOString(), // send ISO string to DB
  });

  // Return fully typed ProductType (domain entity)
  const product: ProductType = {
    id: insertedId.toHexString(),
    category: validatedFields.category,
    title: validatedFields.title,
    description: validatedFields.description,
    price: validatedFields.price,
    discount: validatedFields.discount,
    score: validatedFields.score,
    mostsale: validatedFields.mostsale,
    filter: validatedFields.filter ?? undefined, // keep optional consistent
    image: imageUrl,
    createdAt,
  };

  return product;
}
