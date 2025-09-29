import { CardItemProps } from "@/types/landing.types";

export default function CardItem({ icon: Icon, text }: CardItemProps) {
  return (
    <li className="flex flex-col items-center gap-y-1 md:gap-y-3 text-[#FFFFFF]">
      <Icon sx={{ fontSize: { xs: 23, md: 28 } }} />
      <p className="block text-xs text-center md:text-sm">{text}</p>
    </li>
  );
}
