import { useQuery } from "@tanstack/react-query";
import FoodCard from "./FoodCard";
import { getProducts } from "@/lib/productApi";

export default function FoodList() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>در حال بارگزاری ...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-3 md:gap-y-6">
      {products.map((item) => (
        <li key={item.id}>
          <FoodCard item={item} />
        </li>
      ))}
    </ul>
  );
}
