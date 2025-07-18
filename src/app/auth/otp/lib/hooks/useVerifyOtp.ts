"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Params = { userPhoneNumber: string; otp: string };

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ userPhoneNumber, otp }: Params) => {
      const response = await axios.post("/api/auth/verify-otp", {
        userPhoneNumber,
        otp,
      });
      return response.data;
    },
  });
}
