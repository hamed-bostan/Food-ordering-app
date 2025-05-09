"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import CustomButton from "../ui/CustomButton";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "کد باید ۶ رقم باشد")
    .regex(/^\d{6}$/, "فقط عدد مجاز است"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyCodeForm() {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const onSubmit = (data: OtpFormData) => {
    console.log("✅ OTP submitted:", data.otp);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const currentOtp = getValues("otp").split("");
    currentOtp[index] = val;
    setValue("otp", currentOtp.join(""));

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !getValues("otp")[index] && index > 0) {
      const currentOtp = getValues("otp").split("");
      currentOtp[index - 1] = "";
      setValue("otp", currentOtp.join(""));
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <p className="text-lg font-bold text-[#353535]">کد تایید</p>
      <p className="text-[#717171] text-sm">کد تایید پنج‌رقمی ارسال شد.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputsRef.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={field.value[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="h-8 text-lg text-center border border-[#717171] rounded w-[3.125rem]"
                />
              ))}
            </div>
          )}
        />

        {errors.otp && (
          <p className="text-sm text-red-500">{errors.otp.message}</p>
        )}

        <CustomButton type="submit" className="w-full">
          تایید
        </CustomButton>
      </form>
    </>
  );
}
