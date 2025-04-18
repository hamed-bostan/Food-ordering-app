import Banner from "../common/Banner";
import BranchList from "./BranchList";

export default function ContactUs() {
  return (
    <section >
      <Banner
        imageSrc="/assets/images/bannerImages/banner-08.jpg"
        text="با ترخینه در تماس باشید."
      />
      <BranchList />
    </section>
  );
}
