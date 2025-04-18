import { useProducts } from "@/hooks/useProducts";
import FoodCard from "./FoodCard";

export default function FoodList() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>در حال بارگزاری ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-3 md:gap-y-6">
      {products.map((item) => (
        <FoodCard item={item} key={item.id} />
      ))}
    </div>
  );
}
