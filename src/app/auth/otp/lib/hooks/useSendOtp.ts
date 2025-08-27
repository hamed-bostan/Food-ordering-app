"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSendOtp() {
  return useMutation({
    mutationFn: async (userPhoneNumber: string) => {
      const response = await axios.post("/api/auth/send-otp", {
        userPhoneNumber,
      });
      return response.data;
    },
  });
}
