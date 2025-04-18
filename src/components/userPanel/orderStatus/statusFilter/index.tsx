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
    <div className="flex gap-2 flex-wrap mb-7 md:gap-3 ">
      {filterLists.map((item, index) => (
        <FilterCard
          item={item}
          key={index}
          setSelectedCategory={setSelectedCategory}
          isSelected={selectedCategory === item}
        />
      ))}
    </div>
  );
}
