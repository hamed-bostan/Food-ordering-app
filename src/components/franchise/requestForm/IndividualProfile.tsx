import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import { getErrorMessage } from "@/utils/formHelpers";

export default function IndividualProfile() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-10">
      <span className="block mb-6">مشخصات فردی متقاضی</span>
      <div className="flex gap-x-4">
        <Input
          label="نام و نام خانوادگی"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={getErrorMessage(errors.fullName)}
        />
        <Input
          label="کدملی"
          {...register("nationalId")}
          error={!!errors.nationalId}
          helperText={getErrorMessage(errors.nationalId)}
        />
        <Input
          label="شماره تماس"
          {...register("phone")}
          error={!!errors.phone}
          helperText={getErrorMessage(errors.phone)}
        />
      </div>
    </div>
  );
}
