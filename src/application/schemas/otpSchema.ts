import { z } from "zod";

export const otpSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "شماره معتبر نیست")
    .max(15, "شماره معتبر نیست")
    .regex(/^\d+$/, "شماره باید فقط عدد باشد"),
  otp: z
    .string()
    .length(5, "کد باید پنج رقم باشد")
    .regex(/^\d{5}$/, "کد باید فقط عدد باشد"),
  createdAt: z.coerce.date(), // domain timestamp
});

export const phoneSchema = otpSchema.pick({ phoneNumber: true });
export const otpOnlySchema = otpSchema.pick({ otp: true });

// Export inferred types
export type OtpFormData = z.infer<typeof otpSchema>;
export type PhoneFormData = z.infer<typeof phoneSchema>;
export type OtpOnlyFormData = z.infer<typeof otpOnlySchema>;
