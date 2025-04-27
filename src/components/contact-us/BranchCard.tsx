import Image from "next/image";
import Link from "next/link";
import CustomButton from "../ui/CustomButton";
import { Branch } from "./BranchList";
import expandDesktopIcon from "@/assets/images/icons/expand-desktop.svg";

type BranchCardProps = {
  data: Branch;
};

export default function BranchCard({ data }: BranchCardProps) {
  const { title, image, address, phoneNumber, workTime } = data;

  return (
    <div className="border border-[#CBCBCB] rounded-sm overflow-hidden md:grid md:grid-cols-2 md:h-52 group md:rounded-lg md:hover:shadow-md">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          priority
          className="object-cover w-full h-28 md:h-52"
        />
        <div className="hidden md:block absolute inset-0 bg-[#181818] opacity-0 group-hover:opacity-65 transition-opacity duration-300 z-20"></div>
        <Image
          width={40}
          height={40}
          src={expandDesktopIcon}
          alt="expand icon"
          className="absolute z-30 hidden w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2 md:group-hover:block"
        />
      </div>
      <div className="text-[#717171] text-xs text-center p-4 pt-2 md:px-3 md:text-sm md:flex md:flex-col md:justify-center md:py-0">
        <h3 className="block text-sm mb-2 text-[#353535] md:text-base md:font-medium md:mb-3">
          {title}
        </h3>
        <p className="mb-0.5 md:mb-1">آدرس: {address}</p>
        <p className="mb-0.5 md:mb-1">شماره تماس: {phoneNumber}</p>
        <p className="mb-3 md:mb-4">ساعت کاری: {workTime}</p>
        <div className="flex justify-center transition-all duration-300 gap-x-4 md:opacity-0 md:group-hover:opacity-100 sm:w-4/5 md:w-4/5 sm:mx-auto">
          <Link href="/branch" passHref className="w-full">
            <CustomButton
              variant="outlined"
              sx={{
                p: 0,
                width: "100%",
                height: { xs: "1.5rem", md: "2.25rem" },
                color: "#417F56",
                borderColor: "#417F56",
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                backgroundColor: "transparent",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "#417F56",
                },
              }}
            >
              صفحه شعبه
            </CustomButton>
          </Link>
          <CustomButton
            sx={{
              p: 0,
              width: "100%",
              height: { xs: "1.5rem", md: "2.25rem" },
              fontSize: { xs: "0.75rem", md: "0.875rem" },
            }}
          >
            دیدن در نقشه
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
