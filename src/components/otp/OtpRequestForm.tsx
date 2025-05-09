import CustomButton from "../ui/CustomButton";
import Input from "../ui/Input";
import { OtpFormProps } from "@/types/otpForm";

export default function OtpRequestForm({
  message,
  loading,
  register,
  errors,
  onSubmit,
}: OtpFormProps) {
  return (
    <>
      <p className="text-[#353535] font-[700] text-lg">ورود / ثبت‌نام</p>
      <p className="text-[#717171] ">شماره همراه خود را وارد کنید.</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-8">
        <Input
          {...register("phone")}
          error={!!errors.phone}
          label="شماره همراه"
          sx={{ width: "20rem" }}
          size="medium"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ارسال کد"}
        </CustomButton>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </>
  );
}
