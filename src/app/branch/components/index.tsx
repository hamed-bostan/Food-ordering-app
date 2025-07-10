import Banner from "@/components/common/Banner";
import ActionButton from "./ActionButton";
import Address from "./Address";
import BranchList from "./BranchList";
import FoodHighlights from "./foodHighlights";
import Testimonials from "./Testimonials";
import image1 from "@/assets/images/bannerImages/banner-04.webp";

export default function RestaurantBranch() {
  return (
    <section>
      <Banner imageSrc={image1} text="طعم بی‌نظیر طبیعت!" />
      <FoodHighlights />
      <ActionButton />
      <div className="relative">
        <BranchList />
        <Address />
      </div>
      <Testimonials />
    </section>
  );
}
