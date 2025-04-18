import { FoodCategory } from ".";

type FoodTypesCardProps = {
  item: FoodCategory;
};

export default function FoodTypesCard({ item }: FoodTypesCardProps) {
  return (
    <div className="flex items-center ">
      <span
        className={`border-b transition-all ${
          item.type === "غذای اصلی"
            ? "font-medium text-[#417F56] border-[#417F56] md:font-bold"
            : "border-transparent text-sm text-[#717171] md:text-base"
        }`}
      >
        {item.type}
      </span>
    </div>
  );
}
