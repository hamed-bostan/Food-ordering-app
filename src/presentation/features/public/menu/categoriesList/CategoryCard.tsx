import { CategoryCardProps } from "@/types/menu.types";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function CategoryCard({ item, setSelectedCategory, isSelected }: CategoryCardProps) {
  return (
    <button
      onClick={() => setSelectedCategory(item)}
      className="flex items-center gap-x-1 bg-[#EDEDED] rounded-md px-2 h-6 md:rounded-xl md:h-8"
    >
      <p className={`text-xs md:text-sm ${isSelected ? "text-[#417F56]" : "text-[#353535]"}`}>{item}</p>
      <ArrowBackOutlinedIcon
        sx={{
          color: isSelected ? "#417F56" : "#353535",
          fontSize: { xs: 15, md: 17 },
        }}
      />
    </button>
  );
}
