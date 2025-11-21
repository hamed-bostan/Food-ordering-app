"use client";

import MenuSection from "./RestaurantMenuSection";
import BranchOverview from "./branchOverview";
import image1 from "@/assets/images/bannerImages/banner-01.webp";
import Banner from "@/presentation/components/Banner";
import LandingDescriptionSection from "./descriptionSection";
import ChatBox from "@/ChatBox";

export default function Landing() {
  return (
    <>
      <Banner imageSrc={image1} text="تجربه غذای سالم و گیاهی به سبک ترخینه" />
      <MenuSection />
      <LandingDescriptionSection />
      <BranchOverview />
      <ChatBox />
      <h2>Welcome to NearFood App-6 — DEPLOYED </h2>
      <h2>AUTO CI CD</h2>
    </>
  );
}
