import { UserType } from "@/application/schemas/user.schema";
import { DbUser } from "../repositories/user.repository";

export function mapDbUserToDomain(user: DbUser): UserType {
  return {
    id: user._id.toHexString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? undefined,
    createdAt: user.createdAt ?? undefined,
    date: user.date ? new Date(user.date).toISOString().split("T")[0] : undefined,
    address: user.address
      ? {
          value: user.address.value,
          coords: user.address.coords,
        }
      : null,
  };
}
