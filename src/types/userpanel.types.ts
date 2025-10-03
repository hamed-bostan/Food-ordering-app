import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
};

export type TabConfig = {
  label: string;
  tabIndex: number;
};
