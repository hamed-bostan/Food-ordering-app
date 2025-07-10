import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Category } from ".";

type CategoriesCardProps = {
  item: Category;
};

export default function CategoriesCard({ item }: CategoriesCardProps) {
  return (
    <button className="flex items-center gap-x-1 bg-[#EDEDED] px-2 rounded-xl h-8">
      <p className="text-xs lg:text-sm">{item.type}</p>
      <ArrowBackOutlinedIcon sx={{ fontSize: 16 }} />
    </button>
  );
}
