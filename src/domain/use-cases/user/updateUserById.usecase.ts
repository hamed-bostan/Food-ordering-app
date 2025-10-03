import { findUserByIdInDb, updateUserInDb } from "@/infrastructure/repositories/user.repository";
import { UpdateUserDto, UpdateUserDtoType, UserSchema, UserType } from "@/application/schemas/user.schema";
import { ValidationError } from "@/domain/errors";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";

// Protect a specific super admin account
const PROTECTED_ADMIN_PHONE = "09356776075";

export async function updateUserById(userId: string, fields: UpdateUserDtoType): Promise<UserType> {
  // Validate incoming update fields
  const validatedFields = UpdateUserDto.parse(fields);

  // Fetch existing user
  const existingUser = await findUserByIdInDb(userId);
  if (!existingUser) throw new ValidationError("User not found");

  let safeFields: UpdateUserDtoType = { ...validatedFields };

  // Protect super admin
  if (existingUser.phoneNumber === PROTECTED_ADMIN_PHONE) {
    delete safeFields.phoneNumber;
    if (safeFields.role && safeFields.role !== "admin") delete safeFields.role;
  }

  // Merge addresses if provided
  if (safeFields.address) {
    const incomingAddresses = Array.isArray(safeFields.address) ? safeFields.address : [safeFields.address];

    const existingAddresses = existingUser.address
      ? Array.isArray(existingUser.address)
        ? existingUser.address
        : [existingUser.address]
      : [];

    const updatedAddresses = incomingAddresses.map((addr) => {
      if (addr.id) {
        const existingAddr = existingAddresses.find((a) => a.id === addr.id);
        return existingAddr ? { ...existingAddr, ...addr } : addr;
      }
      return addr;
    });

    safeFields.address = updatedAddresses;
  }

  // Update in DB
  const updatedDbUser = await updateUserInDb(userId, safeFields);

  // Map DB object to domain
  const updatedUser = mapDbUserToDomain(updatedDbUser);

  // Validate final domain object
  return UserSchema.parse(updatedUser);
}
