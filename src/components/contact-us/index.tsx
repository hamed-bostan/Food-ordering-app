import Banner from "../common/Banner";
import BranchList from "./BranchList";
import image1 from "@/assets/images/bannerImages/banner-08.jpg";

export default function ContactUs() {
  return (
    <section>
      <Banner imageSrc={image1} text="با ترخینه در تماس باشید." />
      <BranchList />
    </section>
  );
}
