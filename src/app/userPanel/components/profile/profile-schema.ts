import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().optional().or(z.literal("")), // allow empty string
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")), // allow empty
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
