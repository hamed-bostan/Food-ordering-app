"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpOnlySchema, phoneSchema } from "@/lib/otp/otpValidationSchemas";
import OtpRequestForm from "./OtpRequestForm";
import VerifyCodeForm from "./VerifyCodeForm";
import { useOtp } from "../lib/hooks/useOtp";

export default function Otp() {
  const {
    state: { message, otpSent, phone, otpStatus },
    handlers: { handleSendOtp, handleResendOtp, handleVerifyOtp, handleGoBack },
    loading: { sending, verifying },
  } = useOtp();

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

  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />
      <div className="flex flex-col items-center mb-3 gap-y-6">
        {otpSent ? (
          <VerifyCodeForm
            loading={verifying}
            message={message}
            register={otpRegister}
            errors={otpErrors}
            onSubmit={otpHandleSubmit(handleVerifyOtp)}
            otpStatus={otpStatus}
            setOtpValue={setOtpValue}
            goBack={handleGoBack}
            phone={phone}
            resendOtp={handleResendOtp}
          />
        ) : (
          <OtpRequestForm
            loading={sending}
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
