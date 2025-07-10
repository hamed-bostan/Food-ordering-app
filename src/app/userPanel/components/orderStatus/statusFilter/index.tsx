import FilterCard from "./FilterCard";
import { FilterCategory, SetCategoryType } from "../types";

type StatusFilterProps = {
  setSelectedCategory: SetCategoryType;
  selectedCategory: FilterCategory;
  filterLists: readonly FilterCategory[]; // Accept filterLists as a prop
};

export default function StatusFilter({
  setSelectedCategory,
  selectedCategory,
  filterLists,
}: StatusFilterProps) {
  return (
    <ul className="flex flex-wrap gap-2 mb-7 md:gap-3 ">
      {filterLists.map((item, index) => (
        <li key={index}>
          <FilterCard
            item={item}
            setSelectedCategory={setSelectedCategory}
            isSelected={selectedCategory === item}
          />
        </li>
      ))}
    </ul>
  );
}
