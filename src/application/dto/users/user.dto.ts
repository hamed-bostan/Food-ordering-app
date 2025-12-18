import { AddressCreateSchema, AddressUpdateSchema } from "@/application/schemas/address.form.schema";
import { BaseUserSchema } from "@/application/schemas/user.schema";
import { z } from "zod";

export const UserCreateDtoSchema = BaseUserSchema.extend({
  address: z.array(AddressCreateSchema).optional(),
});

export const UserUpdateDtoSchema = BaseUserSchema.partial().extend({
  email: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || z.string().email("Invalid email").safeParse(val).success, {
      message: "Invalid email",
    }),
  address: z.array(AddressUpdateSchema).optional(),
});

export type UserCreateDto = z.infer<typeof UserCreateDtoSchema>;
export type UserUpdateDto = z.infer<typeof UserUpdateDtoSchema>;
