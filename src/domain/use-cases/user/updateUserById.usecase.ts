import { findUserByIdInDb, updateUserInDb } from "@/infrastructure/repositories/user.repository";
import { UpdateUserDto, UpdateUserDtoType, UserSchema, UserType } from "@/application/schemas/user.schema";
import { ValidationError } from "@/domain/errors";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";

const PROTECTED_ADMIN_PHONE = "09356776075";

export async function updateUserById(userId: string, fields: UpdateUserDtoType): Promise<UserType> {
  const validatedFields = UpdateUserDto.parse(fields);
  const existing = await findUserByIdInDb(userId);
  if (!existing) throw new ValidationError("User not found");

  let safeFields = { ...validatedFields };

  // Protect super admin
  if (existing.phoneNumber === PROTECTED_ADMIN_PHONE) {
    delete safeFields.phoneNumber;
    if (safeFields.role && safeFields.role !== "admin") delete safeFields.role;
  }

  // Merge address if provided
  if (safeFields.address && existing.address) {
    safeFields.address = { ...existing.address, value: safeFields.address.value };
  }

  const updatedDbUser = await updateUserInDb(userId, safeFields);
  const updatedUser = mapDbUserToDomain(updatedDbUser);

  return UserSchema.parse(updatedUser);
}
