import CustomButton from "@/components/ui/CustomButton";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type PaymentMessageProps = {
  image: StaticImageData;
  mainText: string;
  mainTextColor?: string;
  secondaryText: string;
  secondaryTextColor?: string;
  secondButtonText: string;
};

export default function PaymentMessage({
  image,
  mainText,
  mainTextColor,
  secondaryText,
  secondaryTextColor,
  secondButtonText,
}: PaymentMessageProps) {
  return (
    <div className="flex flex-col items-center px-5">
      <Image
        src={image}
        alt="payment status image"
        className="w-32 mb-6 h-28 md:w-40 md:h-36 lg:w-48 lg:h-44 md:mb-12"
      />
      <p
        className={`mb-4 font-bold md:text-lg lg:text-xl md:mb-6 text-[${mainTextColor}]`}
      >
        {mainText}
      </p>
      <p
        className={`text-xs md:text-base lg:text-lg text-[${secondaryTextColor}]`}
      >
        {secondaryText}
      </p>
      <div className="flex justify-center w-full mt-12 gap-x-4 md:mb-14">
        <Link
          href={"/"}
          className="text-[#417F56] text-xs md:text-sm border border-[#417F56] w-full md:w-44 h-8 md:h-9 hover:text-[#FFF] hover:bg-[#326343] rounded flex justify-center items-center"
        >
          بازگشت به صفحه اصلی
        </Link>
        <CustomButton
          disableElevation
          size="small"
          sx={{
            width: { xs: "100%", md: "11rem" },
            height: { xs: "2rem", md: "2.25rem" },
            fontSize: { xs: "0.75rem", md: "0.875rem" },
          }}
        >
          {secondButtonText}
        </CustomButton>
      </div>
    </div>
  );
}
