"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import OtpRequestForm from "./OtpRequestForm";
import VerifyCodeForm from "./VerifyCodeForm";
import { otpOnlySchema, phoneSchema } from "@/lib/otpValidationSchemas";

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
  } = useForm<{ userPhoneNumber: string }>({
    resolver: zodResolver(phoneSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
  } = useForm<{ otp: string }>({
    resolver: zodResolver(otpOnlySchema),
  });

  const sendOtp = async ({ userPhoneNumber }: { userPhoneNumber: string }) => {
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/send-otp", { userPhoneNumber });
      setOtpSent(true);
      setPhone(userPhoneNumber);
      setMessage("کد تایید ارسال شد.");
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(
        error.response?.data?.message || "ارسال کد تایید با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/send-otp", { userPhoneNumber: phone });
      setMessage("کد تایید مجددا ارسال شد.");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      setMessage(
        error.response?.data?.message || "ارسال مجدد کد تایید با خطا مواجه شد."
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: { otp: string }) => {
    setLoading(true);
    setMessage("");

    try {
      await axios.post("/api/auth/verify-otp", {
        userPhoneNumber: phone,
        otp: data.otp,
      });

      setOtpStatus("success");
      setMessage("کد تایید صحیح است");
    } catch (error: any) {
      setOtpStatus("error");
      setMessage(error.response?.data?.message || "خطا در برقراری ارتباط");
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
            setOtpStatus={setOtpStatus}
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
