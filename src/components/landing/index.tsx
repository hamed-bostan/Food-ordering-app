import MenuSection from "./MenuSection";
import DescriptionSection from "./DescriptionSection";
import Banner from "../common/Banner";
import BranchOverview from "./branchOverview";
import image1 from "@/assets/images/bannerImages/banner-01.jpg"

export default function index() {
  return (
    <>
      <Banner
        imageSrc={image1}
        text="تجربه غذای سالم و گیاهی به سبک ترخینه"
      />
      <MenuSection />
      <DescriptionSection />
      <BranchOverview />
    </>
  );
}
