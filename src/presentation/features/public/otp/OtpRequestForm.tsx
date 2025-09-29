import CustomButton from "@/presentation/components/CustomButton";
import Input from "@/presentation/components/Input";
import { OtpRequestFormProps } from "@/types/otp.types";

export default function OtpRequestForm({ loading, register, errors, onSubmit }: OtpRequestFormProps) {
  return (
    <>
      <p className="text-[#353535] font-[700] text-lg">ورود / ثبت‌نام</p>
      <p className="text-[#717171]">شماره همراه خود را وارد کنید.</p>

      <form onSubmit={onSubmit} className="flex flex-col">
        <div className="h-[4.375rem]">
          <Input
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            label="شماره همراه"
            sx={{ width: "20rem", mb: 1 }}
            size="small"
          />
          {errors.phoneNumber && <p className="text-xs text-[#C30000]">{errors.phoneNumber.message}</p>}
        </div>

        <CustomButton type="submit" disabled={loading}>
          {loading ? "در حال ارسال..." : "ارسال کد"}
        </CustomButton>
      </form>
    </>
  );
}
