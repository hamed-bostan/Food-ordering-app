"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import OtpRequestForm from "./OtpRequestForm";
import VerifyCodeForm from "./VerifyCodeForm";
import { otpOnlySchema, phoneSchema } from "@/lib/otp/otpValidationSchemas";
import { useSendOtp } from "../lib/mutations/useSendOtp";
import { useVerifyOtp } from "../lib/mutations/useVerifyOtp";

export default function Otp() {
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpStatus, setOtpStatus] = useState<"success" | "error" | "">("");

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

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

  const handleSendOtp = ({ userPhoneNumber }: { userPhoneNumber: string }) => {
    setMessage("");
    sendOtpMutation.mutate(userPhoneNumber, {
      onSuccess: () => {
        setOtpSent(true);
        setPhone(userPhoneNumber);
        setMessage("کد تایید ارسال شد.");
      },
      onError: (error: any) => {
        console.error("Send OTP error:", error);
        setMessage(
          error.response?.data?.message || "ارسال کد تایید با خطا مواجه شد."
        );
      },
    });
  };

  const handleResendOtp = () => {
    setMessage("");
    sendOtpMutation.mutate(phone, {
      onSuccess: () => setMessage("کد تایید مجددا ارسال شد."),
      onError: (error: any) => {
        console.error("Resend OTP error:", error);
        setMessage(
          error.response?.data?.message ||
            "ارسال مجدد کد تایید با خطا مواجه شد."
        );
      },
    });
  };

  const handleVerifyOtp = ({ otp }: { otp: string }) => {
    setMessage("");
    verifyOtpMutation.mutate(
      { userPhoneNumber: phone, otp },
      {
        onSuccess: () => {
          setOtpStatus("success");
          setMessage("کد تایید صحیح است");
        },
        onError: (error: any) => {
          setOtpStatus("error");
          setMessage(error.response?.data?.message || "خطا در برقراری ارتباط");
        },
      }
    );
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
            loading={verifyOtpMutation.isPending}
            message={message}
            register={otpRegister}
            errors={otpErrors}
            onSubmit={otpHandleSubmit(handleVerifyOtp)}
            setOtpStatus={setOtpStatus}
            otpStatus={otpStatus}
            setOtpValue={setOtpValue}
            goBack={handleGoBack}
            phone={phone}
            resendOtp={handleResendOtp}
          />
        ) : (
          <OtpRequestForm
            loading={sendOtpMutation.isPending}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(handleSendOtp)}
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
