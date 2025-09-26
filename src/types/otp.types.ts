import { PhoneFormData } from "@/application/schemas/otpSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { OtpOnlyFormData } from "@/application/schemas/otpSchema";

export type OtpRequestFormProps = {
  loading: boolean;
  register: UseFormRegister<PhoneFormData>;
  errors: FieldErrors<PhoneFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
};

export type OtpVerifyFormProps = {
  loading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  setOtpValue: UseFormSetValue<OtpOnlyFormData>;
  otpStatus: OtpStatus;
  goBack: () => void;
  phone: string;
  resendOtp: () => void;
  otpCode?: string;
};

export type OtpStatus = "success" | "error" | "";
