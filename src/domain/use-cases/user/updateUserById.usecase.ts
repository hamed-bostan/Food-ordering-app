import { findUserByIdInDb, updateUserInDb } from "@/infrastructure/repositories/user.repository";
import { ValidationError } from "@/domain/errors";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";
import { UserUpdateDto, UserUpdateDtoSchema } from "@/application/dto/users/user.dto";
import { UserSchema, UserType } from "@/application/schemas/user.schema";
import { ObjectId } from "mongodb"; // Add this import for generating IDs

/**
 * Protect a specific super admin account
 */
const PROTECTED_ADMIN_PHONE = "09356776075";

/**
 * Use case: Update a user by ID (admin-only)
 */
export async function updateUserById(userId: string, fields: UserUpdateDto): Promise<UserType> {
  // Validate incoming update DTO
  const validatedFields = UserUpdateDtoSchema.parse(fields);

  // Fetch existing user
  const existingUser = await findUserByIdInDb(userId);
  if (!existingUser) throw new ValidationError("User not found");

  let safeFields: UserUpdateDto = { ...validatedFields };

  // Protect super admin from role/phone changes
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
      // Generate id if missing
      const finalAddr = {
        ...addr,
        id: addr.id || new ObjectId().toString(),
      };

      if (finalAddr.id && addr.id) {
        // Only merge if original had id
        const existingAddr = existingAddresses.find((a) => a.id === finalAddr.id);
        return existingAddr ? { ...existingAddr, ...finalAddr } : finalAddr;
      }
      return finalAddr;
    });

    safeFields.address = updatedAddresses;
  }

  // Update user in DB
  const updatedDbUser = await updateUserInDb(userId, safeFields);

  // Map DB object to domain entity
  const updatedUser = mapDbUserToDomain(updatedDbUser);

  // Final domain validation
  return UserSchema.parse(updatedUser);
}
