import { z } from "zod";
import { BaseUserSchema } from "./user.schema";
import { AddressSchema } from "./address.schema";
import { AddressUpdateSchema } from "./address.form.schema";

export const userProfileSchema = BaseUserSchema.pick({
  name: true,
  phoneNumber: true,
  email: true,
  image: true,
  address: true,
}).extend({
  name: BaseUserSchema.shape.name.or(z.literal("")),
  phoneNumber: BaseUserSchema.shape.phoneNumber.optional().or(z.literal("")),
  email: BaseUserSchema.shape.email
    .or(z.literal(""))
    .refine((val) => !val || z.string().email("Invalid email").safeParse(val).success, { message: "Invalid email" }),
  image: BaseUserSchema.shape.image.optional(),
  address: z.array(AddressSchema).optional(),
});
export type UserProfileType = z.infer<typeof userProfileSchema>;

export const adminProfileSchema = userProfileSchema.extend({
  role: z.enum(["user", "admin", "root"]).optional(),
});
export type AdminProfileType = z.infer<typeof adminProfileSchema>;

// Override phoneNumber to make it required (no empty allowed)
export const adminFormProfileSchema = userProfileSchema.omit({ phoneNumber: true }).extend({
  phoneNumber: z
    .string()
    .min(1, "Phone number cannot be empty")
    .regex(/^\d{11}$/, "Phone number must be 11 digits"),
  address: z.array(AddressUpdateSchema).optional(),
  role: z.enum(["user", "admin", "root"]).optional(),
});
export type AdminFormProfileType = z.infer<typeof adminFormProfileSchema>;
