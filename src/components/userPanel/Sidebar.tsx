import Image from "next/image";
import { userMenuItems } from "../common/UserMenuItems";
import { Divider } from "@mui/material";

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
  return (
    <div className="flex gap-x-5 items-center mb-2">
      <Image
        src="/assets/images/avatars/01.png"
        width={100}
        height={100}
        alt="user avatar"
        className="w-20 h-20"
      />
      <div className="flex flex-col gap-y-2">
        <span className="text-sm text-[#353535]">محمد محمدی</span>
        <span className="text-xs text-[#717171]">09121234567</span>
      </div>
    </div>
  );
}

function SidebarMenu({ setActiveTab, activeTab }: SidebarProps) {
  return (
    <div className="flex flex-col gap-y-2 mt-2">
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
