import { fetchUsersFromDb } from "@/infrastructure/repositories/user.repository";
import { UserType } from "@/application/schemas/user.schema";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";

/**
 * Use case: Fetch all users (admin-only)
 */
export async function getAllUsers(): Promise<UserType[]> {
  const dbUsers = await fetchUsersFromDb();
  return dbUsers.map(mapDbUserToDomain);
}
