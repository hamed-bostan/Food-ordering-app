import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";

export function apiCallErrorHandler(error: unknown, action: string): never {
  console.error(`❌ [API] Failed to ${action}:`, error);
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiErrorResponse | undefined;
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      throw new Error("Authentication failed. Please log in again.");
    }
    if (response?.error === "ValidationError" && response.details?.length) {
      throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
    }
    if (response?.error === "ServerError" || response?.error === "NotFound") {
      throw new Error(response.message);
    }
  }
  throw new Error(`Unexpected error while trying to ${action}`);
}
