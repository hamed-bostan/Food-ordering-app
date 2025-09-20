import { User, UserRole } from "@/types/user.types";

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
    date: mongoUser.date ? new Date(mongoUser.date).toISOString().split("T")[0] : null,
    address: mongoUser.address
      ? {
          value: mongoUser.address.value,
          coords: mongoUser.address.coords,
        }
      : null,
  };
}
