"use client";

import { useState } from "react";
import { useSendOtp } from "./useSendOtp";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type OtpStatus = "success" | "error" | "";

type UseOtpState = {
  message: string;
  otpSent: boolean;
  phoneNumber: string;
  otpStatus: OtpStatus;
  otpCode?: string;
};

type UseOtpHandlers = {
  handleSendOtp: (args: { phoneNumber: string }) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleVerifyOtp: (args: { otp: string }) => Promise<void>;
  handleGoBack: () => void;
};

type UseOtpLoading = {
  sending: boolean;
  verifying: boolean;
};

type UseOtpReturn = {
  state: UseOtpState;
  handlers: UseOtpHandlers;
  loading: UseOtpLoading;
};

export function useOtp(): UseOtpReturn {
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("");
  const [otpCode, setOtpCode] = useState<string>();
  const [verifying, setVerifying] = useState(false);

  const sendOtpMutation = useSendOtp();
  const router = useRouter();

  const handleSendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
    setMessage("");
    try {
      const res = await sendOtpMutation.mutateAsync({ phoneNumber });
      setOtpSent(true);
      setPhoneNumber(phoneNumber);
      setMessage(res.message);
      setOtpCode(res.otp);
    } catch (error: any) {
      console.error("Send OTP error:", error);
      setMessage(error.response?.data?.message || "ارسال کد تایید با خطا مواجه شد.");
    }
  };

  const handleResendOtp = async () => {
    setMessage("");
    try {
      const res = await sendOtpMutation.mutateAsync({ phoneNumber });
      setMessage("کد تایید مجددا ارسال شد.");
      setOtpCode(res.otp);
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      setMessage(error.response?.data?.message || "ارسال مجدد کد تایید با خطا مواجه شد.");
    }
  };

  const handleVerifyOtp = async ({ otp }: { otp: string }) => {
    setMessage("");
    setOtpStatus("");
    setVerifying(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        phoneNumber,
        otp,
      });

      if (res?.error) {
        setOtpStatus("error");
        setMessage(res.error);
      } else {
        setOtpStatus("success");
        setMessage("ورود موفقیت‌آمیز بود");
        router.push("/dashboard/products");
      }
    } catch (error: any) {
      setOtpStatus("error");
      setMessage(error.message || "خطا در برقراری ارتباط");
    } finally {
      setVerifying(false);
    }
  };

  const handleGoBack = () => {
    setOtpSent(false);
    setOtpStatus("");
    setOtpCode(undefined);
  };

  return {
    state: { message, otpSent, phoneNumber, otpStatus, otpCode },
    handlers: { handleSendOtp, handleResendOtp, handleVerifyOtp, handleGoBack },
    loading: { sending: sendOtpMutation.isPending, verifying },
  };
}
