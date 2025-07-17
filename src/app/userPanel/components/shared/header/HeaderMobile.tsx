"use client";

import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import { tabsConfig } from "./TabsConfig";
import { Dispatch, SetStateAction } from "react";
import { useLogoutDialog } from "@/app/userPanel/context/LogoutContext";

type HeaderMobileProps = {
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
};

export default function HeaderMobile({
  setActiveTab,
  activeTab,
}: HeaderMobileProps) {
  const { openLogoutDialog } = useLogoutDialog();

  function handleNext() {
    if (activeTab < 3) {
      setActiveTab(activeTab + 1);
    }

    if (activeTab === 1) {
      openLogoutDialog();
    }
  }

  function handlePrevious() {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  }

  return (
    <div className="flex justify-between mb-6 md:hidden">
      <ArrowForwardOutlined
        onClick={handleNext}
        sx={{
          fontSize: 16,
          color: activeTab === tabsConfig.length - 1 ? "#A0A0A0" : "#353535",
          cursor: "pointer",
          pointerEvents: activeTab === tabsConfig.length - 1 ? "none" : "auto",
        }}
      />
      <h1 className="text-sm font-bold text-[#353535]">
        {tabsConfig[activeTab].label}
      </h1>
      <ArrowBackOutlined
        onClick={handlePrevious}
        sx={{
          opacity: activeTab === 0 ? 0 : 1, // Use 0 or 1 for opacity
          cursor: activeTab !== 0 ? "pointer" : "auto", // Use 'pointer' or 'auto' for cursor
          fontSize: 16,
          color: "#353535",
        }}
      />
    </div>
  );
}
