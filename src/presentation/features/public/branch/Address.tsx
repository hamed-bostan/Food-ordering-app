import Image from "next/image";
import locationIcon from "@/assets/images/icons/location.svg";
import callCallingIcon from "@/assets/images/icons/call-calling.svg";
import clockIcon from "@/assets/images/icons/clock.svg";

export default function Address() {
  return (
    <address className="not-italic grid grid-cols-2 text-xs text-[#353535] gap-y-2 p-2 border-2 border-[#417F56] rounded-sm absolute  left-5 right-5 z-50 bg-[#FFFFFF] md:grid-cols-3 lg:text-sm md:left-20 md:right-20 lg:left-56 lg:right-56 lg:p-3 -bottom-10 md:-bottom-[3.75rem] lg:-bottom-20">
      <div className="flex items-center col-span-full gap-x-1 md:col-start-2 md:col-span-1 md:flex md:flex-col">
        <Image
          src={locationIcon}
          alt="location icon"
          className="w-4 h-4 md:mb-2 md:w-6 md:h-6"
        />
        <p className="text-center">
          شهرک اکباتان، فاز ۳، مجتمع
          <span className="md:block">تجاری کوروش، طبقه سوم</span>
        </p>
      </div>
      <div className="flex items-center gap-x-1 md:col-start-1 md:row-start-1 md:flex md:flex-col">
        <Image
          src={callCallingIcon}
          alt="phone call icon"
          className="w-4 h-4 md:mb-2 md:w-6 md:h-6"
        />
        <p>۰۲۱-۳۳۵۳۵۳۵۴</p>
        <p className="hidden md:block">۰۲۱-۳۳۵۳۵۳۵۶</p>
      </div>
      <div className="flex gap-x-1 md:col-start-3 md:flex md:flex-col md:items-center">
        <Image
          src={clockIcon}
          alt="clock icon"
          className="w-4 h-4 md:mb-2 md:w-6 md:h-6"
        />
        <p>همه روزه از ساعت ۱۲ الی ۲۳ </p>
      </div>
    </address>
  );
}
