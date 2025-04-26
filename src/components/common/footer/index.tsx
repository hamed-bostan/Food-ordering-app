import Image from "next/image";
import ContactForm from "./ContactForm";
import Navigation from "./Navigation";
import image1 from "@/assets/images/bannerImages/banner-03.webp";

export default function Footer() {
  return (
    <section className="relative grid w-full grid-cols-2 px-5 py-4 lg:px-10 2xl:px-28">
      <Image
        src={image1}
        alt="footer background"
        fill
        className="object-cover z-[-1]"
        priority // if it's important to load fast
      />
      <Navigation />
      <ContactForm />
    </section>
  );
}
