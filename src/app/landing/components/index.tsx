import MenuSection from "./MenuSection";
import DescriptionSection from "./DescriptionSection";
import BranchOverview from "./branchOverview";
import image1 from "@/assets/images/bannerImages/banner-01.webp";
import Banner from "@/components/common/Banner";

export default function Landing() {
  return (
    <>
      <Banner imageSrc={image1} text="تجربه غذای سالم و گیاهی به سبک ترخینه" />
      <MenuSection />
      <DescriptionSection />
      <BranchOverview />
    </>
  );
}
