import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().optional(),
  phone_number: z
    .string()
    .min(11, "شماره تماس باید 11 رقم باشد.")
    .regex(/^\d+$/, "شماره تماس فقط باید عدد باشد."),
  email: z.string().email("ایمیل معتبر وارد کنید"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
