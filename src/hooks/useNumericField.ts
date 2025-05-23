import { getErrorMessage } from "@/utils/formHelpers";
import { ChangeEvent, FocusEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function useNumericField(
  name: string,
  maxLength: number,
  leading = "0"
) {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors, touchedFields },
    clearErrors,
  } = useFormContext();

  const value = watch(name) || leading;
  const isTouched = touchedFields[name];

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;

    // Ensure the value starts with the correct leading digit(s)
    if (!val.startsWith(leading)) {
      val = leading + val.replace(/^0+/, "");
    }

    // Keep only digits
    val = val.replace(/\D/g, "");

    // Enforce max length
    if (val.length > maxLength) {
      val = val.slice(0, maxLength);
    }

    // Update the form value and mark it as touched
    setValue(name, val, { shouldTouch: true });
    clearErrors(name); // Hide error while typing
  }

  function handleFocus() {
    clearErrors(name); // Hide error on focus
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    trigger(name); // Revalidate field on blur
  }

  function getBorderColor() {
    if (errors[name]) return "red";
    if (!isTouched) return "#CBCBCB";
    if (value.length < maxLength) return "orange";
    if (value.length === maxLength) return "green";
    return "#CBCBCB";
  }

  return {
    registerProps: register(name),
    value,
    error: !!errors[name],
    helperText: getErrorMessage(errors[name]),
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    borderColor: getBorderColor(),
    inputProps: { maxLength },
  };
}
