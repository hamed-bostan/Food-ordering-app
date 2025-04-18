import Banner from "../common/Banner";
import Details from "./Details";
import Highlights from "./Highlights";

export default function AboutUs() {
  return (
    <section>
      <Banner
        imageSrc="/assets/images/bannerImages/banner-07.jpg"
        text="درباره ترخینه بیشتر بدانید!"
      />
      <Details />
      <Highlights />
    </section>
  );
}
