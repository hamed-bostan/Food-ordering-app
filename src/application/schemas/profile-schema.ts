import { z } from "zod";
import { AddressSchema } from "./address.schema";
import { AddressCreateSchema } from "./address.form.schema";

export const userProfileSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.string().optional(),
  address: z.array(AddressSchema).optional().nullable(),
});

export type UserProfileType = z.infer<typeof userProfileSchema>;

export const adminProfileSchema = userProfileSchema.extend({
  role: z.enum(["user", "admin"]).optional(),
});

export type AdminProfileType = z.infer<typeof adminProfileSchema>;

export const adminFormProfileSchema = z.object({
  name: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, "شماره تماس باید 11 رقم عدد باشد.")
    .optional()
    .or(z.literal("")),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  image: z.string().optional(),
  address: z.array(AddressCreateSchema).optional().nullable(),
  role: z.enum(["user", "admin"]).optional(),
});

export type AdminFormProfileType = z.infer<typeof adminFormProfileSchema>;
