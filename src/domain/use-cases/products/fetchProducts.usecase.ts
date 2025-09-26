import { fetchProductsFromDb } from "@/infrastructure/repositories/product.repository";

export async function fetchProducts() {
  // Here you can add business rules if needed
  return fetchProductsFromDb();
}
