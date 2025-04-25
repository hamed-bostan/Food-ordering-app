import Image, { StaticImageData } from "next/image";
import image1 from "@/assets/images/firstPageImages/01.png";
import image2 from "@/assets/images/firstPageImages/02.png";
import image3 from "@/assets/images/firstPageImages/03.png";
import image4 from "@/assets/images/firstPageImages/04.png";

type MenuItem = {
  id: number;
  image: StaticImageData;
  text: string;
};

const menuInformation: MenuItem[] = [
  {
    id: 1,
    image: image1,
    text: "غذای اصلی",
  },
  {
    id: 2,
    image: image2,
    text: "پیش غذا",
  },
  {
    id: 3,
    image: image3,
    text: "دسر",
  },
  {
    id: 4,
    image: image4,
    text: "نوشیدنی",
  },
];

export default function MenuSection() {
  return (
    <div className="px-5 mb-16 text-[#353535] lg:px-10 2xl:px-28">
      <h1 className="mb-3 font-bold text-center md:text-xl md:mb-7">
        منوی رستوران
      </h1>
      <div className="grid grid-cols-2 place-items-center gap-x-4 md:gap-x-6 gap-y-16 md:grid-cols-4 xl:gap-x-24">
        {menuInformation.map((item) => {
          return (
            <div
              className="relative flex justify-center w-full h-28 lg:h-36"
              key={item.id}
            >
              <Image
                src={item.image}
                alt={item.text}
                className="object-contain w-full"
              />
              <div className="bg-[#417F56] shadow-xl w-full h-20 rounded-sm absolute top-1/2 -z-10 lg:h-24 max-w-56 md:max-w-full"></div>
              <span className="text-xs w-24 h-8 bg-[#F9F9F9] rounded-sm shadow-md flex items-center justify-center absolute -bottom-1/2 -translate-y-1/2 md:text-base  lg:bottom-0 lg:translate-y-full lg:w-32 lg:h-10">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
