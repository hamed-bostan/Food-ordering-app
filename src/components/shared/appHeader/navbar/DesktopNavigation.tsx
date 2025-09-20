import { NavigationItem } from "@/types/app-header.types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DesktopNavigationProps = {
  navigationItems: NavigationItem[];
};

export default function DesktopNavigation({ navigationItems }: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex gap-x-6">
      {navigationItems.map((item) => (
        <NavigationList key={item.id} item={item} />
      ))}
    </div>
  );
}

type NavigationListProps = {
  item: NavigationItem;
};

function NavigationList({ item }: NavigationListProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-1">
      <Link href={item.path}>
        <span
          className={`text-sm text-[#353535] ${
            pathname === item.path ? "text-[#417F56] text-lg font-bold border-b border-current" : ""
          }`}
        >
          {item.text}
        </span>
      </Link>
      {item.icon && <Image src={item.icon} width={40} height={40} alt="arrow down icon" className="w-4 h-4" />}
    </div>
  );
}
