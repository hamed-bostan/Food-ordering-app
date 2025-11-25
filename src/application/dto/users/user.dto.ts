import { AddressCreateSchema } from "@/application/schemas/address.form.schema";
import { UserRoleEnum } from "@/application/schemas/user.schema";
import { z } from "zod";

const optionalString = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => (val === "" ? null : val), schema.nullable().optional());

/**
 * DTO for creating a user (server-side)
 */
export const UserCreateDtoSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: UserRoleEnum.default("user"),
  name: optionalString(z.string()),
  email: optionalString(z.string().email("Invalid email")),
  image: optionalString(z.string().url("Invalid URL")),
  address: z.array(AddressCreateSchema).nullable().optional(),
});

export const UserUpdateDtoSchema = UserCreateDtoSchema.partial();

export type UserCreateDto = z.infer<typeof UserCreateDtoSchema>;
export type UserUpdateDto = z.infer<typeof UserUpdateDtoSchema>;
