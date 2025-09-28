"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { sendOtp, SendOtpResponse } from "@/infrastructure/apis/auth.api";

type OtpStatus = "success" | "error" | "";

type AuthOtpState = {
  message: string;
  otpSent: boolean;
  phoneNumber: string;
  otpStatus: OtpStatus;
  otpCode?: string;
};

type AuthOtpHandlers = {
  handleSendOtp: (args: { phoneNumber: string }) => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleVerifyOtp: (args: { otp: string }) => Promise<void>;
  handleGoBack: () => void;
};

type AuthOtpLoading = {
  sending: boolean;
  verifying: boolean;
};

type UseAuthOtpReturn = {
  state: AuthOtpState;
  handlers: AuthOtpHandlers;
  loading: AuthOtpLoading;
};

export function useAuthOtp(): UseAuthOtpReturn {
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpStatus, setOtpStatus] = useState<OtpStatus>("");
  const [otpCode, setOtpCode] = useState<string>();
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  const handleSendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
    setMessage("");
    setSending(true);
    try {
      const res: SendOtpResponse = await sendOtp({ phoneNumber });
      setOtpSent(true);
      setPhoneNumber(phoneNumber);
      setMessage(res.message);
      setOtpCode(res.result.code);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage("ارسال کد تایید با خطا مواجه شد.");
    } finally {
      setSending(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage("");
    setSending(true);
    try {
      const res: SendOtpResponse = await sendOtp({ phoneNumber });
      setMessage("کد تایید مجددا ارسال شد.");
      setOtpCode(res.result.code);
    } catch (error) {
      if (error instanceof Error) setMessage(error.message);
      else setMessage("ارسال مجدد کد تایید با خطا مواجه شد.");
    } finally {
      setSending(false);
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
        setMessage(typeof res.error === "string" ? res.error : "کد تایید نامعتبر است.");
      } else {
        setOtpStatus("success");
        setMessage("ورود موفقیت‌آمیز بود");
        router.push("/manage/users");
      }
    } catch (error) {
      setOtpStatus("error");
      if (error instanceof Error) setMessage(error.message);
      else setMessage("خطا در برقراری ارتباط");
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
    loading: { sending, verifying },
  };
}
