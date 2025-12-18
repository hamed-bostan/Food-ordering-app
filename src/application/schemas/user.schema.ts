import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const UserRoleEnum = z.enum(["root", "admin", "user"]);
export type UserRoleType = z.infer<typeof UserRoleEnum>;

export const BaseUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 11 digits"),
  role: UserRoleEnum,
  image: z.string().url("Invalid URL").optional(),
  address: z.array(AddressSchema).optional(),
});

export const UserSchema = BaseUserSchema.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
});

export type UserType = z.infer<typeof UserSchema>;
