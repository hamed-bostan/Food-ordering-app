import Image from "next/image";
import image1 from "@/assets/images/bannerImages/banner-02.webp";
import DescriptionDetails from "./DescriptionDetails";
import CardSection from "./CardSection";

export default function DescriptionSection() {
  return (
    <section className="relative px-5 py-4 md:h-80 md:grid md:grid-cols-2 md:place-items-center lg:gap-x-10 lg:px-10 2xl:px-28">
      <Image
        src={image1}
        alt="description background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <DescriptionDetails />
      <CardSection />
    </section>
  );
}
