import { User, UserRole } from "./user.types";

// Utility to normalize MongoDB documents into our User type
export function normalizeUser(mongoUser: any): User {
  return {
    id: mongoUser._id?.toString() || mongoUser.id?.toString() || "",
    phoneNumber: mongoUser.phoneNumber,
    role: mongoUser.role as UserRole,
    name: mongoUser.name ?? null,
    email: mongoUser.email ?? null,
    image: mongoUser.image ?? null,
    createdAt: mongoUser.createdAt ?? null,
  };
}
