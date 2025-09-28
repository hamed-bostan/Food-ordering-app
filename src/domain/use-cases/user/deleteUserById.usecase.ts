import { deleteUserFromDb, findUserByIdInDb } from "@/infrastructure/repositories/user.repository";
import { ValidationError } from "@/domain/errors";

const PROTECTED_ADMIN_PHONE = "09356776075";

export async function deleteUserById(userId: string): Promise<boolean> {
  const user = await findUserByIdInDb(userId);
  if (!user) throw new ValidationError("User not found");

  // Prevent deleting the protected admin
  if (user.phoneNumber === PROTECTED_ADMIN_PHONE) {
    throw new ValidationError("This admin user cannot be deleted");
  }

  return await deleteUserFromDb(userId);
}
