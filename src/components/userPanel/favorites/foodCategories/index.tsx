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
    <ul className="flex-wrap hidden gap-2 mb-8 md:flex">
      {categoriesLists.map((item) => (
        <li key={item.id}>
          <FilterCard item={item} />
        </li>
      ))}
    </ul>
  );
}
