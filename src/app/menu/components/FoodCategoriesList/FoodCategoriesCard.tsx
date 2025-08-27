import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { FoodCategoriesCardProps } from "../../lib/types";

export default function FoodCategoriesCard({
  item,
  setSelectedCategory,
  isSelected,
}: FoodCategoriesCardProps) {
  return (
    <button
      onClick={() => setSelectedCategory(item)}
      className="flex items-center gap-x-1 bg-[#EDEDED] rounded-md px-2 h-6 md:rounded-xl md:h-8"
    >
      <p
        className={`text-xs md:text-sm ${
          isSelected ? "text-[#417F56]" : "text-[#353535]"
        }`}
      >
        {item}
      </p>
      <ArrowBackOutlinedIcon
        sx={{
          color: isSelected ? "#417F56" : "#353535",
          fontSize: { xs: 15, md: 17 },
        }}
      />
    </button>
  );
}
