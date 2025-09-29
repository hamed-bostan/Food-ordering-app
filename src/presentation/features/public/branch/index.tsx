import Banner from "@/presentation/components/Banner";
import ActionButton from "./ActionButton";
import Address from "./Address";
import BranchList from "./BranchList";
import FoodHighlights from "./foodHighlights";
import image1 from "@/assets/images/bannerImages/banner-04.webp";
import { getTestimonials } from "@/infrastructure/apis/testimonial.api";
import { getProducts } from "@/infrastructure/apis/product.api";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function RestaurantBranch() {
  const testimonial = await getTestimonials();
  const products = await getProducts();

  return (
    <section>
      <Banner imageSrc={image1} text="طعم بی‌نظیر طبیعت!" />
      <FoodHighlights products={products.result} />
      <ActionButton />
      <div className="relative">
        <BranchList />
        <Address />
      </div>
      <TestimonialsCarousel testimonial={testimonial.result} />
    </section>
  );
}
