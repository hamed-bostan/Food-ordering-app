import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "@/lib/utils/formHelpers";
import useNumericField from "@/hooks/numeric-field.hook";
import Input from "@/components/ui/Input";

export default function IndividualProfile() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const nationalId = useNumericField("nationalId", 10, "0");
  const phone = useNumericField("phone", 11, "09");

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
          type="text"
          {...nationalId.registerProps}
          value={nationalId.value}
          error={nationalId.error}
          helperText={nationalId.helperText}
          onChange={nationalId.onChange}
          onFocus={nationalId.onFocus}
          onBlur={nationalId.onBlur}
          borderColor={nationalId.borderColor}
          inputProps={nationalId.inputProps}
        />

        <Input
          label="شماره تماس"
          type="text"
          {...phone.registerProps}
          value={phone.value}
          error={phone.error}
          helperText={phone.helperText}
          onChange={phone.onChange}
          onFocus={phone.onFocus}
          onBlur={phone.onBlur}
          borderColor={phone.borderColor}
          inputProps={phone.inputProps}
        />
      </div>
    </div>
  );
}
