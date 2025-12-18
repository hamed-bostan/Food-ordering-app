import { ProductType } from "@/application/schemas/product.schema";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";

export async function fetchProductByIdUseCase(productId: string, repository: IProductRepository): Promise<ProductType> {
  const product = await repository.fetchProductById(productId);
  if (!product) throw new Error("Product not found");
  return product;
}
