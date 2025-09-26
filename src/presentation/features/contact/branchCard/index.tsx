import { Branch } from "@/types/contact.types";
import ActionButtons from "./ActionButtons";
import DisplayImage from "./DisplayImage";

export default function BranchCard({ title, image, address, phoneNumber, workTime }: Branch) {
  return (
    <article className="border border-[#CBCBCB] rounded-sm overflow-hidden md:grid md:grid-cols-2 md:h-52 group md:rounded-lg md:hover:shadow-md">
      <DisplayImage image={image} title={title} />
      <div className="text-[#717171] text-xs text-center p-4 pt-2 md:px-3 md:text-sm md:flex md:flex-col md:justify-center md:py-0">
        <h3 className="block text-sm mb-2 text-[#353535] md:text-base md:font-medium md:mb-3">{title}</h3>
        <p className="mb-0.5 md:mb-1">آدرس: {address}</p>
        <p className="mb-0.5 md:mb-1">شماره تماس: {phoneNumber}</p>
        <p className="mb-3 md:mb-4">ساعت کاری: {workTime}</p>
        <ActionButtons />
      </div>
    </article>
  );
}
