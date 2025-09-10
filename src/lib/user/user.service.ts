import { findUserInDb, insertUserToDb } from "./user.repository";

// Handles business logic using repository functions.
// Encapsulates the “what to do” rules without directly touching the DB.

async function findOrCreateUser(userPhoneNumber: string) {
  let user = await findUserInDb(userPhoneNumber);
  if (!user) {
    await insertUserToDb({ userPhoneNumber, role: "user" });
    user = await findUserInDb(userPhoneNumber);
    if (!user) throw new Error("Failed to create user");
  }
  return user;
}

export const userService = {
  findOrCreateUser,
};
