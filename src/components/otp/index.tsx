import { Typography } from "@mui/material";
import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import Input from "../ui/Input";
import CustomButton from "../ui/CustomButton";

export default function Otp() {
  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
      <div className="flex flex-col mb-6 gap-y-8">
        <p className="text-[#353535] font-[700] text-center text-lg">
          ورود / ثبت‌نام
        </p>
        <p className="text-[#717171]  text-center">
          شماره همراه خود را وارد کنید.
        </p>
        <Input label="شماره همراه" sx={{ width: "20rem" }} size="medium" />
        <CustomButton sx={{ height: "53px" }}>ورود</CustomButton>
      </div>
      <p className="text-[#353535] text-xs text-center">
        ورود و عضویت در ترخینه به منزله قبول قوانین و مقررات است.
      </p>
    </div>
  );
}
