import { menuInformation } from "@/presentation/constants/landing";
import MenuSectionItem from "./MenuSectionItem";

export default function MenuSection() {
  return (
    <section className="px-5 mb-16 text-[#353535] lg:px-10 2xl:px-28">
      <h2 className="mb-3 font-bold text-center md:text-xl md:mb-7">منوی رستوران</h2>
      <ul className="grid grid-cols-2 place-items-center gap-x-4 md:gap-x-6 gap-y-16 md:grid-cols-4 xl:gap-x-24">
        {menuInformation.map((item) => (
          <MenuSectionItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
