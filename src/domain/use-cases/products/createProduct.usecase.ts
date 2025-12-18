import { ProductType } from "@/application/schemas/product.schema";
import { ProductCreateDto } from "@/application/dto/products/product.dto";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";
import { IImageStorageGateway } from "@/domain/interfaces/IImageStorageGateway";

const PRODUCTS_BUCKET = "food-images";
const PRODUCTS_FOLDER = "products";

export async function createProductWithImageUseCase(
  data: ProductCreateDto,
  repository: IProductRepository,
  storage: IImageStorageGateway,
  imageFile?: File // Optional last
): Promise<ProductType> {
  let imageUrl = "";
  if (imageFile) {
    imageUrl = await storage.uploadImage(imageFile, PRODUCTS_BUCKET, PRODUCTS_FOLDER);
  }

  const createdAt = new Date();
  // Omit 'image' (which could be File | undefined) to avoid type conflict
  const { image, ...dataWithoutImage } = data;
  const productToInsert = {
    ...dataWithoutImage,
    image: imageUrl,
    createdAt: createdAt.toISOString(),
  };

  const insertedId = await repository.insertProduct(productToInsert);

  // Use dataWithoutImage for the final product to ensure no File type leaks in
  const product: ProductType = {
    ...dataWithoutImage,
    id: insertedId,
    image: imageUrl,
    createdAt,
  };

  return product;
}
