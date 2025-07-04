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

const phoneSchema = z.object({
  phone: z
    .string()
    .min(11, "شماره باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

const otpSchema = z.object({
  phone: z
    .string()
    .min(11)
    .regex(/^09\d{9}$/),
  otp: z.string().length(5, "کد تایید باید ۵ رقم باشد"),
});

export default function Otp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpStatus, setOtpStatus] = useState<"success" | "error" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>({
    resolver: zodResolver(phoneSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
  } = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema.pick({ otp: true })),
  });

  const sendOtp = async ({ phone }: { phone: string }) => {
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("/api/auth/send-otp", { phone });

      if (data.success) {
        setOtpSent(true);
        setPhone(phone);
        setMessage("کد تایید ارسال شد.");
      } else {
        setMessage(data.message || "ارسال پیامک ناموفق بود.");
      }
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(error.response?.data?.message || "ارسال با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("/api/auth/send-otp", { phone });

      if (data.success) {
        setMessage("کد تایید مجددا ارسال شد.");
      } else {
        setMessage(data.message || "ارسال مجدد پیامک ناموفق بود.");
      }
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      setMessage(
        error.response?.data?.message || "ارسال مجدد با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: { otp: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: data.otp }),
      });

      const result = await res.json();

      if (result.success) {
        setOtpStatus("success");
        setMessage("کد تایید صحیح است");
      } else {
        setOtpStatus("error");
        setMessage(result.error || "کد تایید اشتباه است");
      }
    } catch (err) {
      setOtpStatus("error");
      setMessage("خطا در برقراری ارتباط");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setOtpSent(false);
    setOtpStatus("");
  };

  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
      <div className="flex flex-col items-center mb-3 gap-y-6">
        {otpSent ? (
          <VerifyCodeForm
            loading={loading}
            message={message}
            register={otpRegister}
            errors={otpErrors}
            onSubmit={otpHandleSubmit(verifyOtp)}
            otpStatus={otpStatus}
            setOtpValue={setOtpValue}
            goBack={handleGoBack}
            phone={phone}
            resendOtp={resendOtp}
          />
        ) : (
          <OtpRequestForm
            loading={loading}
            message={message}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(sendOtp)}
          />
        )}
      </div>
      <p className="text-[#353535] text-xs text-center">
        ورود و عضویت در ترخینه به منزله قبول
        <span className="text-[#417F56]"> قوانین و مقررات </span> است.
      </p>
    </div>
  );
}
