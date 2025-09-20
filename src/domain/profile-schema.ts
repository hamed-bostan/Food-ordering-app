import { z } from "zod";

// base schema
export const profileSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.string().optional(),
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
});

export type ProfileModel = z.infer<typeof profileSchema>;

// admin schema extends base
export const adminProfileSchema = profileSchema.extend({
  role: z.enum(["user", "admin"]),
});

export type AdminProfileModel = z.infer<typeof adminProfileSchema>;
