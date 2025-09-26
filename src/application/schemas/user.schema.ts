import { z } from "zod";

export const UserRoleEnum = z.enum(["user", "admin"]);

// Domain / Entity schema (DB-stored user)
export const UserSchema = z.object({
  id: z.string(),
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: UserRoleEnum,
  name: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  image: z
    .string()
    .url()
    .catch("") // if invalid, set as empty string
    .optional(),

  createdAt: z.string().optional(),
  date: z.string().optional(),
  address: z
    .object({
      value: z.string(),
      coords: z.tuple([z.number(), z.number()]),
    })
    .nullable()
    .optional(),
});

// DTOs
export const CreateUserDto = UserSchema.omit({ id: true });
export const UpdateUserDto = CreateUserDto.partial();

// Types
export type UserRoleType = z.infer<typeof UserRoleEnum>;
export type UserType = z.infer<typeof UserSchema>;
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
