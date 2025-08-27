"use client";

import { useState } from "react";
import { useSendOtp } from "./useSendOtp";
import { useVerifyOtp } from "./useVerifyOtp";

export function useOtp() {
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpStatus, setOtpStatus] = useState<"success" | "error" | "">("");

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

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
    setOtpStatus("");
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

  return {
    state: {
      message,
      otpSent,
      phone,
      otpStatus,
    },
    handlers: {
      handleSendOtp,
      handleResendOtp,
      handleVerifyOtp,
      handleGoBack,
    },
    loading: {
      sending: sendOtpMutation.isPending,
      verifying: verifyOtpMutation.isPending,
    },
  };
}
