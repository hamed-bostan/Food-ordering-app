import { z } from "zod";

export const UserRoleEnum = z.enum(["user", "admin"]);

const optionalString = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => (val === "" ? null : val), schema.nullable().optional());

export const UserCreateFormSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: UserRoleEnum.default("user"),
  name: optionalString(z.string()),
  email: optionalString(z.string().email("Invalid email")),
  image: z.instanceof(File).optional(),
});

export const UserUpdateFormSchema = UserCreateFormSchema.partial();

export type UserCreateFormType = z.infer<typeof UserCreateFormSchema>;
export type UserUpdateFormType = z.infer<typeof UserUpdateFormSchema>;
