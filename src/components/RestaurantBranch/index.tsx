import Banner from "../common/Banner";
import ActionButton from "./ActionButton";
import Address from "./Address";
import BranchList from "./BranchList";
import FoodHighlights from "./foodHighlights";
import Testimonials from "./Testimonials";

export default function RestaurantBranch() {
  return (
    <section>
      <Banner
        imageSrc="/assets/images/bannerImages/banner-04.jpg"
        text="طعم بی‌نظیر طبیعت!"
      />
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
