"use client";

import { useState } from "react";
import image1 from "@/assets/images/bannerImages/banner-10.webp";
import Banner from "@/presentation/components/Banner";
import { ActiveTab } from "@/types/faq.types";
import FaqTabs from "./FaqTabs";
import FaqTabContent from "./FaqTabContent";

export default function Faq() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("faq");

  function handleTabClick(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <>
      <Banner imageSrc={image1} text="سوالات متداول از ترخینه" isButton={false} />
      <FaqTabs handleTabClick={handleTabClick} activeTab={activeTab} />
      <FaqTabContent activeTab={activeTab} />
    </>
  );
}
