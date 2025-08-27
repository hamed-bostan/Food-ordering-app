import { categoryNavigationItems } from "../lib/category-navigation-item";
import { CategoryNavigationProps } from "../lib/types";

export default function CategoryNavigation({
  handleTabClick,
  activeTab,
}: CategoryNavigationProps) {
  return (
    <nav className="text-sm text-[#717171] bg-[#EDEDED] flex gap-x-4 h-10 px-5 items-center">
      {categoryNavigationItems.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`border-b border-[#417F56] border-opacity-0 ${
            activeTab === tab.id
              ? "font-bold text-[#417F56] border-opacity-100 py-2"
              : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
