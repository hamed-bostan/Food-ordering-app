"use client";

import { useState } from "react";
import image1 from "@/assets/images/bannerImages/banner-10.webp";
import Banner from "@/components/ui/Banner";
import CategoryNavigation from "./CategoryNavigation";
import ContentDisplay from "./ContentDisplay";
import { ActiveTab } from "@/types/faq.types";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("faq");

  function handleTabClick(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <>
      <Banner imageSrc={image1} text="سوالات متداول از ترخینه" isButton={false} />
      <CategoryNavigation handleTabClick={handleTabClick} activeTab={activeTab} />
      <ContentDisplay activeTab={activeTab} />
    </>
  );
}
