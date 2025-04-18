import { Divider } from "@mui/material";
import Image from "next/image";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";

export default function OnlinePayment() {
  return (
    <div className="p-4 border border-[#CBCBCB] rounded-lg md:grid md:grid-cols-[30fr_60fr] mb-3 md:mb-5">
      <div className="flex items-center gap-x-1 text-[#353535] mb-2 md:mb-0 md:items-start">
        <WalletOutlinedIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
        <span className="text-sm">درگاه پرداخت</span>
      </div>
      <Divider className="md:hidden" />
      <div className="flex gap-x-2 pt-4 mb-2 justify-center md:justify-start md:pt-0">
        <Image
          src="/assets/images/bank/bank-saman.jpg"
          width={50}
          height={50}
          alt="bank image"
          className="w-20 h-20 lg:w-28 lg:h-28"
        />
        <Image
          src="/assets/images/bank/bank-melat.jpg"
          width={50}
          height={50}
          alt="bank image"
          className="w-20 h-20 lg:w-28 lg:h-28"
        />
        <Image
          src="/assets/images/bank/bank-parsian.jpg"
          width={50}
          height={50}
          alt="bank image"
          className="w-20 h-20 lg:w-28 lg:h-28"
        />
      </div>
      <div className="text-xs text-[#717171] text-center md:col-start-2 md:text-start md:w-fit">
        <p>پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.‌</p>
        <p className="md:px-4">
          (لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)
        </p>
      </div>
    </div>
  );
}
