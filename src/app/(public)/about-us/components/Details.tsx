import Image from "next/image";
import image1 from "@/assets/images/bannerImages/banner-09.webp";
import { detailsText } from "@/presentation/constants/aboutUs";

export default function Details() {
  return (
    <section className="container px-5 py-4 mx-auto lg:px-10 2xl:px-28 ">
      <h2 className="font-bold mb-2 text-[#353535] 2xl:text-lg">درباره ما</h2>
      <div className="grid md:grid-cols-2 gap-y-5 md:gap-x-10">
        <div className="text-xs text-[#717171] xl:gap-x-14 2xl:gap-x-32 md:text-sm lg:text-base">
          {detailsText.map((item, index) => (
            <p key={index} className="text-justify">
              {item}
            </p>
          ))}
        </div>
        <Image
          src={image1}
          alt="About us image"
          className="object-cover object-center w-4/5 h-full mx-auto rounded-md md:w-full 2xl:h-4/5"
        />
      </div>
    </section>
  );
}
