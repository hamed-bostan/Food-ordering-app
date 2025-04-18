import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { SetCategoryType, FilterCategory } from "../types";

type FilterCardProps = {
  item: FilterCategory;
  setSelectedCategory: SetCategoryType;
  isSelected: boolean;
};

export default function FilterCard({
  item,
  setSelectedCategory,
  isSelected,
}: FilterCardProps) {
  return (
    <div
      onClick={() => setSelectedCategory(item)}
      className="flex items-center gap-x-1 bg-[#EDEDED] rounded-md px-2 h-6 md:rounded-xl md:h-8 cursor-pointer"
    >
      <span
        className={`text-xs lg:text-sm ${
          isSelected ? "text-[#417F56]" : "text-[#353535]"
        }`}
      >
        {item}
      </span>
      <ArrowBackOutlinedIcon
        sx={{
          color: isSelected ? "#417F56" : "#353535",
          fontSize: { xs: 14, md: 16 },
        }}
      />
    </div>
  );
}
