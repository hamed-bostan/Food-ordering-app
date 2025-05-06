"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import Input from "../ui/Input";
import CustomButton from "../ui/CustomButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function Otp() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleRequestOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/request-otp", { phone });

      if (res.status === 200) {
        setOtpSent(true);
      } else {
        alert("مشکلی در ارسال کد رخ داده است.");
      }
    } catch (error) {
      console.error("OTP error:", error);
      alert("ارسال کد ناموفق بود.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        phone,
        otp,
        redirect: true, // redirect to homepage or dashboard
        callbackUrl: "/",
      });

      if (!res?.ok) {
        alert("کد وارد شده صحیح نیست.");
      }
    } catch (error) {
      console.error("Verify error:", error);
      alert("ورود با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

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

        {!otpSent ? (
          <Input
            label="شماره همراه"
            sx={{ width: "20rem" }}
            size="medium"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        ) : (
          <Input
            label="کد تایید"
            sx={{ width: "20rem" }}
            size="medium"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <CustomButton
          onClick={otpSent ? handleVerifyOtp : handleRequestOtp}
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : otpSent ? "ورود" : "ارسال کد"}
        </CustomButton>
      </div>
      <p className="text-[#353535] text-xs text-center">
        ورود و عضویت در ترخینه به منزله قبول قوانین و مقررات است.
      </p>
    </div>
  );
}
