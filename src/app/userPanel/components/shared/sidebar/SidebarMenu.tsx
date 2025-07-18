"use client";

import { useLogoutDialog } from "@/app/userPanel/context/LogoutContext";
import { userMenuItems } from "@/components/shared/UserMenuItems";
import { SidebarProps } from "./lib/types";

export default function SidebarMenu({ setActiveTab, activeTab }: SidebarProps) {
  const { openLogoutDialog } = useLogoutDialog();

  function handleClick(index: number) {
    setActiveTab(index);

    if (index === 2) {
      openLogoutDialog();
    }
  }

  return (
    <div className="flex flex-col mt-2 gap-y-2">
      {userMenuItems.map((item, index) => (
        <button
          onClick={() => handleClick(item.tabIndex)}
          key={index}
          className={`
        text-[#353535] flex gap-x-1 w-fit items-center text-sm cursor-pointer 
        ${activeTab === item.tabIndex ? "text-[#417F56]" : ""}
        ${index === userMenuItems.length - 1 ? "text-[#C30000]" : ""}`}
        >
          <item.icon
            sx={{
              fontSize: activeTab === item.tabIndex ? 20 : 18,
            }}
          />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
