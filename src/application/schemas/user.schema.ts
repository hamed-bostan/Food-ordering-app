import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const UserRoleEnum = z.enum(["root", "admin", "user"]);

const optionalString = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => (val === "" ? null : val), schema.nullable().optional());

export const UserSchema = z.object({
  id: z.string(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: UserRoleEnum,
  name: optionalString(z.string()),
  email: optionalString(z.string().email("Invalid email")),
  image: optionalString(z.string().url("Invalid URL")),
  address: z.array(AddressSchema).nullable().optional(),
  createdAt: z.coerce.date(),
});

export type UserRoleType = z.infer<typeof UserRoleEnum>;
export type UserType = z.infer<typeof UserSchema>;
