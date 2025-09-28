import { z } from "zod";

export const UserRoleEnum = z.enum(["user", "admin"]);

// Utility for nullable optional strings
const optionalString = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => (val === "" ? null : val), schema.nullable().optional());

export const UserSchema = z.object({
  id: z.string(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: UserRoleEnum,
  name: optionalString(z.string()),
  email: optionalString(z.string().email("Invalid email")),
  image: optionalString(z.string().url("Invalid URL")),
  date: z.preprocess((val) => (val === "" ? undefined : val), z.coerce.date().optional()),
  address: z
    .object({
      value: z.string(),
      coords: z.tuple([z.number(), z.number()]),
    })
    .nullable()
    .optional(),

  createdAt: z.coerce.date(), // domain only, always present
});

// DTOs
export const CreateUserDto = UserSchema.omit({ id: true, createdAt: true });
export const UpdateUserDto = CreateUserDto.partial();

// Types
export type UserRoleType = z.infer<typeof UserRoleEnum>;
export type UserType = z.infer<typeof UserSchema>;
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
