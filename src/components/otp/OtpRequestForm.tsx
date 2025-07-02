import CustomButton from "@/components/ui/CustomButton";
import Input from "@/components/ui/Input";
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
      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="h-[4.375rem]">
          <Input
            {...register("phone")}
            error={!!errors.phone}
            label="شماره همراه"
            sx={{ width: "20rem", mb: 1 }}
            size="small"
          />
          {errors.phone && (
            <p className="text-xs text-[#C30000]">{errors.phone.message}</p>
          )}
        </div>
        <CustomButton type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ارسال کد"}
        </CustomButton>
      </form>
    </>
  );
}
