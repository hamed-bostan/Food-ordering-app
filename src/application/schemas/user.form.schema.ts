import { z } from "zod";
import { BaseUserSchema, UserRoleEnum } from "./user.schema";
import { AddressCreateSchema, AddressUpdateSchema } from "./address.form.schema";

export const UserCreateFormSchema = BaseUserSchema.extend({
  image: z.instanceof(File).optional(),
  address: z.array(AddressCreateSchema).optional(),
})
  .omit({ role: true })
  .extend({ role: UserRoleEnum.default("user") });

export const UserUpdateFormSchema = UserCreateFormSchema.partial().extend({
  address: z.array(AddressUpdateSchema).optional(),
});

export type UserCreateFormType = z.infer<typeof UserCreateFormSchema>;
export type UserUpdateFormType = z.infer<typeof UserUpdateFormSchema>;
