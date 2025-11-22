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
      <h2>AUTO CI CD 6</h2>
      <h2>AUTO CI CD 8</h2>
      <h2>AUTO CI CD 10</h2>
      <h2>AUTO CI CD 20</h2>
      <h2>AUTO CI CD 30</h2>
      <h2>AUTO CI CD 40</h2>
      <h2>AUTO CI CD 50</h2>
      <h2>AUTO CI CD 50</h2>
      <h2>AUTO CI CD 60</h2>
      <h2>AUTO CI CD 70</h2>
      <h2>AUTO CI CD 80</h2>
      <h2>AUTO CI CD 90</h2>
      <h2>AUTO CI CD 100</h2>
      <h2>AUTO CI CD 110</h2>
    </>
  );
}
