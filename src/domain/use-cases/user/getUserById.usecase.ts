import { findUserByIdInDb } from "@/infrastructure/repositories/user.repository";
import { mapDbUserToDomain } from "@/infrastructure/mappers/user.mapper";
import { UserType } from "@/application/schemas/user.schema";

export async function getUserById(userId: string): Promise<UserType> {
  const dbUser = await findUserByIdInDb(userId);
  if (!dbUser) throw new Error("User not found");

  return mapDbUserToDomain(dbUser);
}
