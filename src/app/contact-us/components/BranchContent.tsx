import { BranchContentProps } from "../lib/types";

export default function BranchContent({
  title,
  address,
  phoneNumber,
  workTime,
}: BranchContentProps) {
  return (
    <>
      <h3 className="block text-sm mb-2 text-[#353535] md:text-base md:font-medium md:mb-3">
        {title}
      </h3>
      <p className="mb-0.5 md:mb-1">آدرس: {address}</p>
      <p className="mb-0.5 md:mb-1">شماره تماس: {phoneNumber}</p>
      <p className="mb-3 md:mb-4">ساعت کاری: {workTime}</p>
    </>
  );
}
