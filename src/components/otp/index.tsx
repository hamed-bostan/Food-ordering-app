"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import OtpRequestForm from "./OtpRequestForm";
import VerifyCodeForm from "./VerifyCodeForm";

const schema = z.object({
  phone: z
    .string()
    .min(11, "شماره باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  otp: z.string().length(6, "کد تایید باید ۶ رقم باشد").optional(), // OTP validation is optional at first
});

type FormData = z.infer<typeof schema>;

export default function Otp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP was sent
  const [otpCode, setOtpCode] = useState(""); // Store OTP code for verification

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ phone, otp }: FormData) => {
    setLoading(true);
    setMessage("");

    // If OTP is being verified
    if (otpSent) {
      // Replace with actual OTP verification logic
      if (otp === otpCode) {
        setMessage("کد تایید صحیح است.");
      } else {
        setMessage("کد تایید اشتباه است.");
      }
      setLoading(false);
      return;
    }

    // If OTP is being sent
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Renamed variable
    try {
      const { data } = await axios.post("/api/auth/send-otp", {
        phone,
        otp: generatedOtp, // Use the generated OTP here
      });

      setOtpSent(true); // OTP sent successfully
      setOtpCode(otp || ""); // Default to empty string if otp is undefined

      setMessage("کد با موفقیت ارسال شد.");
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(error.response?.data?.error || "ارسال با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
      <div className="flex flex-col items-center mb-6 gap-y-8">
        {otpSent ? (
          <VerifyCodeForm />
        ) : (
          <OtpRequestForm
            message={message}
            loading={loading}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </div>
      <p className="text-[#353535] text-xs text-center">
        ورود و عضویت در ترخینه به منزله قبول قوانین و مقررات است.
      </p>
    </div>
  );
}
