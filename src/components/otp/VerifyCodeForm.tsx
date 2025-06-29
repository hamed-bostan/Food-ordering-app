"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import CustomButton from "../ui/CustomButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Props = {
  loading: boolean;
  message: string;
  register: UseFormRegister<{ otp: string }>;
  errors: FieldErrors<{ otp: string }>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function VerifyCodeForm({ loading, register, onSubmit }: Props) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const otpArray = Array.from(
      inputsRef.current.map((input) => input?.value || "")
    );
    otpArray[index] = val;

    const otpString = otpArray.join("");
    register("otp").onChange({
      target: { value: otpString },
    } as any);

    if (val && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (
      e.key === "Backspace" &&
      !inputsRef.current[index]?.value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <p className="text-lg font-bold text-[#353535]">کد تایید</p>
      <p className="text-[#717171] text-sm">کد تایید پنج‌رقمی ارسال شد.</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-8">
        <div className="flex gap-4" dir="ltr">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-8 text-center border border-[#717171] rounded w-[3.125rem]"
            />
          ))}
        </div>

        <div className="flex gap-x-1 text-[#717171] text-xs items-center">
          <AccessTimeIcon fontSize="small" />
          {timeLeft > 0 ? (
            <p className="ml-auto">{formatTime()} تا دریافت مجدد کد</p>
          ) : (
            <button className="ml-auto text-[#417F56]">دریافت مجدد کد</button>
          )}
          <button>ویرایش شماره</button>
        </div>

        <CustomButton type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال تایید..." : "تایید"}
        </CustomButton>
      </form>
    </>
  );
}
