import Banner from "@/presentation/components/Banner";
import image1 from "@/assets/images/bannerImages/banner-08.webp";
import ContactBranchList from "@/presentation/features/public/contact/ContactBranchList";

export default function ContactPage() {
  return (
    <section>
      <Banner imageSrc={image1} text="This is amazing" />
      <ContactBranchList />
    </section>
  );
}
