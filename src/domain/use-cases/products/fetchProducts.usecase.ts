import { ProductType } from "@/application/schemas/product.schema";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";

export async function fetchProducts(repository: IProductRepository): Promise<ProductType[]> {
  // Here you can add business rules if needed
  return repository.fetchProducts();
}
