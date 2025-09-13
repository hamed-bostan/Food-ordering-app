import axios from "axios";
import api from "../axios";
import { ApiErrorResponse } from "@/types/api-error";

export type SendOtpInput = { phoneNumber: string };
export type SendOtpResponse = { message: string; result: { otp: string } };

export const sendOtp = async (formData: SendOtpInput): Promise<SendOtpResponse> => {
  try {
    const { data } = await api.post<SendOtpResponse>("/auth/send-otp", formData);

    if (!data.result) throw new Error("Failed to send OTP");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to send OTP:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while sending OTP");
  }
};
