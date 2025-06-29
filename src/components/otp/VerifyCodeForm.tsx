import {
  BaseSyntheticEvent,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomButton from "../ui/CustomButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

type Props = {
  loading: boolean;
  message: string;
  register: UseFormRegister<{ otp: string }>;
  setOtpValue: UseFormSetValue<{ otp: string }>;
  errors: FieldErrors<{ otp: string }>;
  onSubmit: (e?: BaseSyntheticEvent) => void;
  otpStatus: "success" | "error" | "";
};

export default function VerifyCodeForm({
  loading,
  register,
  onSubmit,
  setOtpValue,
  otpStatus,
}: Props) {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
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

    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);

    const otpString = newOtpValues.join("");
    setOtpValue("otp", otpString); // <-- correct react-hook-form state update

    if (val && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <>
      <p className="text-lg font-bold text-[#353535]">کد تایید</p>
      <p className="text-[#717171] text-sm">کد تایید پنج‌رقمی ارسال شد.</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-8">
        <div className="flex gap-4" dir="ltr">
          {otpValues.map((val, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`h-8 text-center border rounded w-[3.125rem] transition-colors ${
                otpStatus === "success"
                  ? "border-green-500"
                  : otpStatus === "error"
                  ? "border-red-500"
                  : "border-[#717171]"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-x-1 text-[#717171] text-xs items-center">
          <AccessTimeIcon fontSize="small" />
          {timeLeft > 0 ? (
            <p className="ml-auto">{formatTime()} تا دریافت مجدد کد</p>
          ) : (
            <button type="button" className="ml-auto text-[#417F56]">
              دریافت مجدد کد
            </button>
          )}
          <button type="button">ویرایش شماره</button>
        </div>

        <CustomButton type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال تایید..." : "تایید"}
        </CustomButton>
      </form>
    </>
  );
}
