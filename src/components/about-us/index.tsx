import Banner from "../common/Banner";
import Details from "./Details";
import Highlights from "./Highlights";
import image1 from "@/assets/images/bannerImages/banner-07.webp";

export default function AboutUs() {
  return (
    <section>
      <Banner imageSrc={image1} text="درباره ترخینه بیشتر بدانید!" />
      <Details />
      <Highlights />
    </section>
  );
}
