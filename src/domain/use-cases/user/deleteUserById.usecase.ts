import { deleteUserFromDb } from "@/infrastructure/repositories/user.repository";

export async function deleteUserById(userId: string): Promise<boolean> {
  return await deleteUserFromDb(userId);
}
