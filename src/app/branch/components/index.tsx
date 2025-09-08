import Banner from "@/components/ui/Banner";
import ActionButton from "./ActionButton";
import Address from "./Address";
import BranchList from "./BranchList";
import FoodHighlights from "./foodHighlights";
import image1 from "@/assets/images/bannerImages/banner-04.webp";
import TestimonialSlider from "./TestimonialSlider";
import { getTestimonials } from "@/lib/api/testimonial";

export default async function RestaurantBranch() {
  const testimonialDetails = await getTestimonials();

  return (
    <section>
      <Banner imageSrc={image1} text="طعم بی‌نظیر طبیعت!" />
      <FoodHighlights />
      <ActionButton />
      <div className="relative">
        <BranchList />
        <Address />
      </div>
      <TestimonialSlider testimonialDetails={testimonialDetails} />
    </section>
  );
}
