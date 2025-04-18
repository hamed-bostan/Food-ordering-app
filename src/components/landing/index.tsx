import MenuSection from "./MenuSection";
import DescriptionSection from "./DescriptionSection";
import Banner from "../common/Banner";
import BranchOverview from "./branchOverview";

export default function index() {
  return (
    <>
      <Banner
        imageSrc="/assets/images/bannerImages/banner-01.jpg"
        text="تجربه غذای سالم و گیاهی به سبک ترخینه"
      />
      <MenuSection />
      <DescriptionSection />
      <BranchOverview />
    </>
  );
}
