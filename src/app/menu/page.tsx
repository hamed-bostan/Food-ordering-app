import { getProducts } from "@/lib/api/product.api";
import RestaurantMenu from "./components";
export const dynamic = "force-dynamic";

export default async function RestaurantMenuPage() {
  const products = await getProducts();
  return <RestaurantMenu products={products.result} />;
}
