import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Category } from ".";

type CategoriesCardProps = {
  item: Category;
};

export default function CategoriesCard({ item }: CategoriesCardProps) {
  return (
    <div className="flex items-center gap-x-1 bg-[#EDEDED] px-2 rounded-xl h-8 cursor-pointer">
      <span className="text-xs lg:text-sm">{item.type}</span>
      <ArrowBackOutlinedIcon sx={{ fontSize: 16 }} />
    </div>
  );
}
