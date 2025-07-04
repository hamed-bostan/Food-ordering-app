import Image from "next/image";
import successfulPaymentImage from "@/assets/images/icons/successful-payment.png";
import CustomButton from "@/components/ui/CustomButton";

export default function SuccessfulPayment() {
  return (
    <div className="flex flex-col items-center px-5">
      <Image
        src={successfulPaymentImage}
        alt="successful payment image"
        className="w-32 mb-6 h-28 md:w-40 md:h-36 lg:w-48 lg:h-44 md:mb-12"
      />
      <p className="text-[#417F56] font-bold mb-4 md:text-lg lg:text-xl md:mb-6">
        پرداخت شما با موفقیت انجام شد!
      </p>
      <p className="text-xs text-[#417F56] md:text-base lg:text-lg">
        کد رهگیری سفارش شما: ۲۱۵۴۹۰۱۹
      </p>
      <div className="flex justify-center w-full mt-12 gap-x-4 md:mb-14">
        <CustomButton
          disableElevation
          sx={{
            backgroundColor: "transparent",
            color: "#417F56",
            fontSize: { xs: "0.75rem", md: "0.875rem" },
            border: "1px solid #417F56",
            width: { xs: "100%", md: "11rem" },
            height: { xs: "2rem", md: "2.25rem" },
            "&:hover": {
              backgroundColor: "#326343",
              color: "#FFF",
            },
          }}
        >
          بازگشت به صفحه اصلی
        </CustomButton>
        <CustomButton
          disableElevation
          size="small"
          sx={{
            width: { xs: "100%", md: "11rem" },
            height: { xs: "2rem", md: "2.25rem" },
            fontSize: { xs: "0.75rem", md: "0.875rem" },
          }}
        >
          پیگیری سفارش
        </CustomButton>
      </div>
    </div>
  );
}
