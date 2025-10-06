import { UserType } from "@/application/schemas/user.schema";
import { DbUser } from "../repositories/db.types";

export function mapDbUserToDomain(user: DbUser): UserType {
  return {
    id: user._id.toHexString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? undefined,
    date: user.date ? new Date(user.date) : undefined,
    address:
      user.address?.map((addr) => ({
        id: addr.id ?? crypto.randomUUID(), // <-- ensure every address has an id
        value: addr.value,
        coords: addr.coords,
      })) ?? null,
    createdAt: new Date(user.createdAt),
  };
}
