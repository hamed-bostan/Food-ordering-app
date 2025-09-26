"use client";

import Image from "next/image";
import logo from "@/assets/images/icons/Logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpRequestForm from "./OtpRequestForm";
import { OtpOnlyFormData, otpOnlySchema, PhoneFormData, phoneSchema } from "@/application/schemas/otpSchema";
import { useAuthOtp } from "@/hooks/auth-otp.hook";
import OtpVerifyForm from "./OtpVerifyForm";

export default function Otp() {
  const { state, handlers, loading } = useAuthOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
  } = useForm<OtpOnlyFormData>({
    resolver: zodResolver(otpOnlySchema),
  });

  return (
    <div className="flex flex-col items-center pb-20 pt-14">
      <Image src={logo} alt="logo image" className="h-20 mb-20 w-52" />

      <div className="flex flex-col items-center mb-3 gap-y-6">
        {state.otpSent ? (
          <OtpVerifyForm
            loading={loading.verifying}
            onSubmit={otpHandleSubmit(handlers.handleVerifyOtp)}
            otpStatus={state.otpStatus}
            setOtpValue={setOtpValue}
            goBack={handlers.handleGoBack}
            phone={state.phoneNumber}
            resendOtp={handlers.handleResendOtp}
            otpCode={state.otpCode || ""}
          />
        ) : (
          <OtpRequestForm
            loading={loading.sending}
            register={register}
            errors={errors}
            onSubmit={handleSubmit(handlers.handleSendOtp)}
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
