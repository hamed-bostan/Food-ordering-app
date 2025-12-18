import { ProductType } from "@/application/schemas/product.schema";
import { ProductCreateInput, ProductUpdateInput } from "@/application/dto/products/product.dto"; // Updated imports

export interface IProductRepository {
  insertProduct(product: ProductCreateInput): Promise<string>; // Now uses input with string
  fetchProducts(): Promise<ProductType[]>;
  fetchProductById(id: string): Promise<ProductType | null>;
  updateProduct(id: string, update: ProductUpdateInput): Promise<ProductType>; // Now uses input with string
  deleteProduct(id: string): Promise<boolean>;
}
