import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import { getErrorMessage } from "@/utils/formHelpers";
import { ChangeEvent } from "react";

export default function IndividualProfile() {
  const {
    register,
    setValue,
    watch,
    formState: { errors, touchedFields },
    clearErrors,
  } = useFormContext();

  const nationalIdValue = watch("nationalId") || "0";
  const isTouched = touchedFields.nationalId; // true if user interacted

  function handleNationalIdChange(e: ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    // Always start with 0
    if (!value.startsWith("0")) {
      value = "0" + value.replace(/^0+/, "");
    }

    // Remove non-digit characters
    value = value.replace(/\D/g, "");

    // Limit to 10 digits total
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setValue("nationalId", value);
  }

  function handleFocus() {
    clearErrors("nationalId"); // Clear error as soon as user focuses
  }

  function getBorderColor(value: string, error?: any, touched?: boolean) {
    if (error) return "red";
    if (!touched) return "#CBCBCB"; // default gray border if not touched
    if (value.length < 10) return "orange";
    if (value.length === 10) return "green";
    return "#CBCBCB";
  }

  const borderColor = getBorderColor(
    nationalIdValue,
    errors.nationalId,
    isTouched
  );

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
          type="text"
          inputProps={{ maxLength: 10 }}
          error={!!errors.nationalId}
          helperText={getErrorMessage(errors.nationalId)}
          value={nationalIdValue}
          onChange={handleNationalIdChange}
          onFocus={handleFocus}
          borderColor={borderColor}
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
