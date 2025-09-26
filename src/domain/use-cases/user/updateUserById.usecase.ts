import { findUserByIdInDb, updateUserInDb } from "@/infrastructure/repositories/user.repository";
import { UpdateUserDto, UpdateUserDtoType, UserSchema, UserType } from "@/application/schemas/user.schema";
import { ValidationError } from "@/domain/errors";

export async function updateUserById(userId: string, fields: UpdateUserDtoType): Promise<UserType> {
  // Validate incoming data
  const validatedFields = UpdateUserDto.parse(fields);

  // Ensure user exists
  const existing = await findUserByIdInDb(userId);
  if (!existing) throw new ValidationError("User not found");

  // Update user in DB
  const updatedUser = await updateUserInDb(userId, validatedFields);

  // Map to domain entity
  return UserSchema.parse(updatedUser);
}
