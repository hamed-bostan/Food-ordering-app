import FoodTypesCard from "./FoodTypesCard";

export type FoodCategory = {
  id: number;
  type: string;
};

const foodTypes: FoodCategory[] = [
  { id: 1, type: "غذای اصلی" },
  { id: 2, type: "پیش غذا" },
  { id: 3, type: "دسر" },
  { id: 4, type: "نوشیدنی" },
];

export default function FoodTypesList() {
  return (
    <div className="flex gap-x-4 bg-[#EDEDED] mb-2 px-5 lg:px-10 2xl:px-28 h-10 md:gap-x-6 md:h-12 md:mb-4">
      {foodTypes.map((item) => (
        <FoodTypesCard item={item} key={item.id} />
      ))}
    </div>
  );
}
