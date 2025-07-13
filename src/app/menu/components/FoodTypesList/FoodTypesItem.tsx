import { FoodTypesProps } from "../../lib/food-types-list";

export default function FoodTypesItem({ type }: FoodTypesProps) {
  return (
    <p
      className={`border-b transition-all ${
        type === "غذای اصلی"
          ? "font-medium text-[#417F56] border-[#417F56] md:font-bold"
          : "border-transparent text-sm text-[#717171] md:text-base"
      }`}
    >
      {type}
    </p>
  );
}
