"use client";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

type SendOtpInput = { phoneNumber: string };
type SendOtpResponse = { message: string; otp: string };

export function useSendOtp() {
  return useMutation<SendOtpResponse, Error, SendOtpInput>({
    mutationFn: async (data: SendOtpInput) => {
      const response = await api.post<SendOtpResponse>("/auth/send-otp", data);
      return response.data;
    },
  });
}
