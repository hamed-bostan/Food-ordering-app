import Image, { StaticImageData } from "next/image";
import CustomButton from "../ui/CustomButton";

type BannerProps = {
  styleContainer?: string;
  imageSrc: string | StaticImageData;
  text: string;
  isButton?: boolean;
};

export default function Banner({
  styleContainer = "",
  imageSrc,
  text,
  isButton = true,
}: BannerProps) {
  return (
    <div className={`relative h-44 mb-6 md:h-48 ${styleContainer}`}>
      <Image
        src={imageSrc}
        alt={text}
        width={2500}
        height={400}
        className="object-cover w-full h-full"
      />
      <span className="absolute top-1/2 right-1/2 text-[#E5F2E9] -translate-y-1/2 translate-x-1/2 text-nowrap md:text-xl">
        {text}
      </span>
      {isButton && (
        <CustomButton className="absolute translate-x-1/2 right-1/2 bottom-16">
          سفارش آنلاین غذا
        </CustomButton>
      )}
    </div>
  );
}
