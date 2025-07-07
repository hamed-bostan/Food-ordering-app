import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { BaseSyntheticEvent } from "react";

type FormData = {
  userPhoneNumber: string;
  otp?: string;
};

export type OtpRequestFormProps = {
  loading: boolean;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
};

export type VerifyCodeFormProps = {
  loading: boolean;
  message: string;
  register: UseFormRegister<{ otp: string }>;
  setOtpValue: UseFormSetValue<{ otp: string }>;
  errors: FieldErrors<{ otp: string }>;
  onSubmit: (e?: BaseSyntheticEvent) => void;
  otpStatus: "success" | "error" | "";
  setOtpStatus: (status: "success" | "error" | "") => void;
  goBack: () => void;
  phone: string;
  resendOtp: () => void;
};
