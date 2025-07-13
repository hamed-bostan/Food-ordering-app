import Image from "next/image";
import { menuInformation } from "../lib/menu-data";

export default function MenuSection() {
  return (
    <section className="px-5 mb-16 text-[#353535] lg:px-10 2xl:px-28">
      <h2 className="mb-3 font-bold text-center md:text-xl md:mb-7">
        منوی رستوران
      </h2>
      <ul className="grid grid-cols-2 place-items-center gap-x-4 md:gap-x-6 gap-y-16 md:grid-cols-4 xl:gap-x-24">
        {menuInformation.map((item) => (
          <li
            className="relative flex justify-center w-full list-none h-28 lg:h-36"
            key={item.id}
          >
            <figure className="flex justify-center">
              <Image
                src={item.image}
                alt={item.text}
                className="object-contain w-full"
              />
              <div className="bg-[#417F56] shadow-xl w-full h-20 rounded-sm absolute top-1/2 -z-10 lg:h-24 max-w-56 md:max-w-full"></div>
              <figcaption className="text-xs w-24 h-8 bg-[#F9F9F9] rounded-sm shadow-md flex items-center justify-center absolute -bottom-1/2 -translate-y-1/2 md:text-base  lg:bottom-0 lg:translate-y-full lg:w-32 lg:h-10">
                {item.text}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
