import FilterCard from "./CategoriesCard";

export type Category = {
  id: number;
  type: string;
};

const categoriesLists: Category[] = [
  { id: 1, type: "همه" },
  { id: 2, type: "غذای اصلی" },
  { id: 3, type: "پیش غذا" },
  { id: 4, type: "دسر" },
  { id: 5, type: "نوشیدنی" },
];

export default function FoodCategories() {
  return (
    <div className="hidden md:flex flex-wrap mb-8 gap-2">
      {categoriesLists.map((item) => (
        <FilterCard item={item} key={item.id} />
      ))}
    </div>
  );
}
