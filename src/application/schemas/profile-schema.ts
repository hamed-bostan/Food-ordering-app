import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.string().optional(),

  // ✅ keep as string for <input type="date">, optional
  date: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), "تاریخ معتبر وارد کنید")
    .optional()
    .or(z.literal("")),

  address: z
    .object({
      value: z.string(),
      coords: z.tuple([z.number(), z.number()]),
    })
    .optional()
    .nullable(),

  // ❌ createdAt removed (read-only, not in form)
});

export type UserProfileType = z.infer<typeof userProfileSchema>;

export const adminProfileSchema = userProfileSchema.extend({
  role: z.enum(["user", "admin"]).optional(),
});

export type AdminProfileType = z.infer<typeof adminProfileSchema>;
