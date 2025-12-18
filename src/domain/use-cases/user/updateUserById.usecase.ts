import { ValidationError } from "@/domain/errors";
import { UserUpdateDto, UserUpdateDtoSchema } from "@/application/dto/users/user.dto";
import { UserSchema, UserType } from "@/application/schemas/user.schema";
import { randomUUID } from "crypto"; // For generating IDs in domain
import { IUserRepository } from "@/domain/interfaces/iuser-repository";

/**
 * Use case: Update a user by ID (admin-only)
 */
export async function updateUserByIdUseCase(
  repo: IUserRepository,
  userId: string,
  fields: UserUpdateDto
): Promise<UserType> {
  // Validate incoming update DTO
  const validatedFields = UserUpdateDtoSchema.parse(fields);

  // Fetch existing user (domain entity)
  const existingUser = await repo.findById(userId);
  if (!existingUser) throw new ValidationError("User not found");

  const safeFields: UserUpdateDto = { ...validatedFields };

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
        id: addr.id || randomUUID(),
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

  // Update user via repository
  const updatedUser = await repo.update(userId, safeFields);

  // Final domain validation
  return UserSchema.parse(updatedUser);
}
