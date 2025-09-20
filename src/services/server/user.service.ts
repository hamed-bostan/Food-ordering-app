import { normalizeUser } from "@/infrastructure/repositories/user.normalize";
import { User } from "@/types/user.types";
import {
  findUserByIdInDb,
  findUserByPhoneInDb,
  insertUserToDb,
  updateUserInDb,
} from "@/infrastructure/repositories/user.repository";

export async function getUserByIdService(userId: string): Promise<User> {
  const user = await findUserByIdInDb(userId);
  if (!user) throw new Error("User not found");
  return normalizeUser(user);
}

export async function updateUserByIdService(
  userId: string,
  update: Partial<Pick<User, "name" | "email" | "role" | "phoneNumber" | "image" | "date" | "address">>
): Promise<User> {
  const updatedUser = await updateUserInDb(userId, update);
  return normalizeUser(updatedUser);
}

// New: find or create user by phone number
export async function findOrCreateUserByPhone(phoneNumber: string): Promise<User> {
  let user = await findUserByPhoneInDb(phoneNumber);

  if (!user) {
    const insertedId = await insertUserToDb({
      phoneNumber,
      role: "user", // default role
    });

    user = await findUserByIdInDb(insertedId.toHexString());
    if (!user) throw new Error("Failed to create user");
  }

  return normalizeUser(user);
}

export const userService = {
  getUserByIdService,
  updateUserByIdService,
  findOrCreateUserByPhone,
};
