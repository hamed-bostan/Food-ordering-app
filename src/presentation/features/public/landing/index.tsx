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
      <p>Hello world Updated.</p>
      <h1>Welcome to NearFood — SUCCESSFUL DEPLOY</h1>
    </>
  );
}
