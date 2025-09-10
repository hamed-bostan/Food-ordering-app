import { Divider } from "@mui/material";
import UserInformation from "./UserInformation";
import { SidebarProps } from "./lib/types";
import SidebarMenu from "./SidebarMenu";

export default function Sidebar({ setActiveTab, activeTab }: SidebarProps) {
  return (
    <section className="hidden md:block border border-[#CBCBCB] rounded-lg px-2 py-4 min-h-[21.375rem] max-h-[21.375rem] lg:min-w-72">
      <UserInformation />
      <Divider />
      <SidebarMenu setActiveTab={setActiveTab} activeTab={activeTab} />
    </section>
  );
}
