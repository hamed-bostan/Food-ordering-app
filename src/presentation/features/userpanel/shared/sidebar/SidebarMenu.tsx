"use client";

import { ActionMenuItem, LinkMenuItem, MenuItem, userMenuItems } from "@/presentation/features/public/shared/UserMenuItems";
import { useLogoutDialog } from "@/context/logout-dialog.context";
import { SidebarProps } from "@/types/userpanel.types";
import Link from "next/link";

function isLink(item: MenuItem): item is LinkMenuItem {
  return "href" in item;
}

function isAction(item: MenuItem): item is ActionMenuItem {
  return "action" in item;
}

export default function SidebarMenu({ setActiveTab, activeTab }: SidebarProps) {
  const { openLogoutDialog } = useLogoutDialog();

  function handleAction(item: ActionMenuItem, index: number) {
    setActiveTab(index);

    if (item.action === "logout") {
      openLogoutDialog();
    }
  }

  return (
    <div className="flex flex-col mt-2 gap-y-2">
      {userMenuItems.map((item, index) => {
        const isActive = activeTab === item.tabIndex;
        const isLast = index === userMenuItems.length - 1;

        const iconElement = <item.icon sx={{ fontSize: isActive ? 20 : 18 }} />;

        const textClass = `
          text-[#353535] flex gap-x-1 w-fit items-center text-sm cursor-pointer 
          ${isActive ? "text-[#417F56]" : ""}
          ${isLast ? "text-[#C30000]" : ""}
        `;

        if (isLink(item)) {
          return (
            <Link key={index} href={item.href} onClick={() => setActiveTab(index)} className={textClass}>
              {iconElement}
              <span>{item.label}</span>
            </Link>
          );
        }

        if (isAction(item)) {
          return (
            <button key={index} onClick={() => handleAction(item, index)} className={textClass}>
              {iconElement}
              <span>{item.label}</span>
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}
