import { getErrorMessage } from "@/utils/formHelpers";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

export default function useNumericField(
  name: string,
  maxLength: number,
  leading?: string
) {
  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors, touchedFields },
    clearErrors,
  } = useFormContext();

  const isTouched = touchedFields[name];

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;

    // Remove non-digit characters
    val = val.replace(/\D/g, "");

    // Add leading if needed
    if (leading && !val.startsWith(leading)) {
      val = leading + val.replace(new RegExp("^" + leading + "+"), "");
    }

    // Enforce max length
    if (val.length > maxLength) {
      val = val.slice(0, maxLength);
    }

    setValue(name, val, { shouldTouch: true });
    clearErrors(name); // Hide error while typing
  }

  function handleFocus() {
    clearErrors(name); // Hide error on focus
  }

  function handleBlur() {
    trigger(name); // Revalidate on blur
  }

  function getBorderColor() {
    if (errors[name]) return "red";
    if (!isTouched) return "#CBCBCB";
    const currentVal = watch(name);
    if (currentVal?.length < maxLength) return "orange";
    if (currentVal?.length === maxLength) return "green";
    return "#CBCBCB";
  }

  return {
    registerProps: register(name),
    error: !!errors[name],
    helperText: getErrorMessage(errors[name]),
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    borderColor: getBorderColor(),
    inputProps: { maxLength },
  };
}
