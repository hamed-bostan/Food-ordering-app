"use client";

import { useState } from "react";
import ContentSection from "./ContentSection";
import image1 from "@/assets/images/bannerImages/banner-10.webp";
import { tabDetails } from "@/lib/faq";
import Banner from "@/components/common/Banner";

type ActiveTab = "faq" | "rules" | "privacyPolicy";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("faq");

  function handleTabClick(tab: ActiveTab) {
    setActiveTab(tab);
  }

  return (
    <>
      <Banner
        imageSrc={image1}
        text="سوالات متداول از ترخینه"
        isButton={false}
      />
      <CategoryNavigation
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <ContentDisplay activeTab={activeTab} />
    </>
  );
}

type CategoryNavigationProps = {
  handleTabClick: (tab: ActiveTab) => void;
  activeTab: ActiveTab;
};

type Tab = {
  id: ActiveTab;
  label: string;
};

function CategoryNavigation({
  handleTabClick,
  activeTab,
}: CategoryNavigationProps) {
  const tabs: Tab[] = [
    { id: "faq", label: "سوالات متداول" },
    { id: "rules", label: "قوانین ترخینه" },
    { id: "privacyPolicy", label: "حریم خصوصی" },
  ];

  return (
    <nav className="text-sm text-[#717171] bg-[#EDEDED] flex gap-x-4 h-10 px-5 items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`border-b border-[#417F56] border-opacity-0 ${
            activeTab === tab.id
              ? "font-bold text-[#417F56] border-opacity-100 py-2"
              : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

type ContentDisplayProps = {
  activeTab: ActiveTab;
};

function ContentDisplay({ activeTab }: ContentDisplayProps) {
  const filteredSections = tabDetails.filter(
    (section) => section.category === activeTab
  );

  return (
    <section className="px-5 pt-3 pb-6">
      <ul className="border border-[#CBCBCB] rounded-sm px-0.5">
        {filteredSections.map((section) => (
          <li key={section.id}>
            <ContentSection details={[section]} />
          </li>
        ))}
      </ul>
    </section>
  );
}
