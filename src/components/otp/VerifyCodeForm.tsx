import {
  BaseSyntheticEvent,
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import CustomButton from "@/components/ui/CustomButton";

type Props = {
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

export default function VerifyCodeForm({
  loading,
  register,
  onSubmit,
  setOtpValue,
  otpStatus,
  goBack,
  phone,
  resendOtp,
  setOtpStatus,
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
      <p className="text-[#717171] text-sm">
        کد تایید پنج‌رقمی به شماره {phone} ارسال شد.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="flex gap-4 mb-2" dir="ltr">
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
              autoFocus={index === 0} // focus on first input
              className={`h-8 text-center border rounded w-[3.125rem] transition-colors outline-none focus:border-2 focus:border-[#717171] ${
                otpStatus === "success"
                  ? "border-[#417F56] border-2"
                  : otpStatus === "error"
                  ? "border-[#C30000] border-2"
                  : "border-[#717171]"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-x-1 text-[#717171] text-xs items-center mb-4">
          <AccessTimeIcon fontSize="small" />
          {timeLeft > 0 ? (
            <p className="ml-auto">{formatTime()} تا دریافت مجدد کد</p>
          ) : (
            <button
              type="button"
              className="ml-auto text-[#417F56]"
              onClick={() => {
                resendOtp();
                setTimeLeft(120); // reset timer after resending
                setOtpValues(["", "", "", "", ""]); // clear inputs
                setOtpValue("otp", ""); //  clear react-hook-form state
                inputsRef.current[0]?.focus(); // optional: focus first input again
                setOtpStatus("");
              }}
            >
              دریافت مجدد کد
            </button>
          )}

          <button type="button" onClick={goBack} className="text-[#417F56]">
            ویرایش شماره
          </button>
        </div>

        <CustomButton type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال تایید..." : "تایید"}
        </CustomButton>
      </form>
    </>
  );
}
