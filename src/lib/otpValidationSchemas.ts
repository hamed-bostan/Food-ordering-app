import { z } from "zod";

export const phoneSchema = z.object({
  userPhoneNumber: z
    .string()
    .min(11, "شماره باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export const otpSchema = phoneSchema.extend({
  otp: z.string().length(5, "کد تایید باید ۵ رقم باشد"),
});

export const otpOnlySchema = z.object({
  otp: z.string().length(5, "کد تایید باید ۵ رقم باشد"),
});
