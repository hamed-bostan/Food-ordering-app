"use client";

import Image from "next/image";
import { userMenuItems } from "../common/UserMenuItems";
import { Divider } from "@mui/material";
import image1 from "@/assets/images/avatars/01.png";
import { useSession } from "next-auth/react";

type SidebarProps = {
  setActiveTab: (index: number) => void;
  activeTab: number;
  // Another solution
  // setActiveTab: Dispatch<SetStateAction<number>>;
};

export default function Sidebar({ setActiveTab, activeTab }: SidebarProps) {
  return (
    <section className="hidden md:block border border-[#CBCBCB] rounded-lg px-2 py-4 min-h-[21.375rem] max-h-[21.375rem] lg:min-w-72">
      <UserInformation />
      <Divider />
      <SidebarMenu setActiveTab={setActiveTab} activeTab={activeTab} />
    </section>
  );
}

function UserInformation() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center mb-2 gap-x-5">
      {session?.user?.image ? (
        <Image
          src={session?.user?.image}
          width={100}
          height={100}
          alt="user avatar"
          className="w-20 h-20 rounded-full"
        />
      ) : (
        <Image
          src={image1}
          width={100}
          height={100}
          alt="user avatar"
          className="w-20 h-20"
        />
      )}
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-[#353535]">
          {session?.user?.name ? session.user.name : "نام خود را وارد کنید."}
        </p>
        <p className="text-xs text-[#717171]">09121234567</p>
        <p className="text-xs text-[#717171]">
          {session?.user?.email && session.user.email}
        </p>
      </div>
    </div>
  );
}

function SidebarMenu({ setActiveTab, activeTab }: SidebarProps) {
  return (
    <div className="flex flex-col mt-2 gap-y-2">
      {userMenuItems.map((item, index) => (
        <div
          onClick={() => setActiveTab(item.tabIndex)}
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
        </div>
      ))}
    </div>
  );
}
