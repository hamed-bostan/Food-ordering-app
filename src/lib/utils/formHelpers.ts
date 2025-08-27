import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export function getErrorMessage(
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null
): string {
  if (!error) return "";
  if (typeof error === "string") return error;
  if ("message" in error && typeof error.message === "string")
    return error.message;
  return "";
}
