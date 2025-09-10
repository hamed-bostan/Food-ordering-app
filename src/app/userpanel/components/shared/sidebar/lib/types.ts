import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
};
