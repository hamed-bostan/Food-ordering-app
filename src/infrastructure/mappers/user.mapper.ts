import { UserType } from "@/application/schemas/user.schema";
import { DbUser } from "@/infrastructure/repositories/db.types";

/**
 * Maps a database-level user record to a domain-level UserType.
 */
export function mapDbUserToDomain(user: DbUser): UserType {
  return {
    id: user._id.toHexString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? undefined,
    address:
      user.address?.map((addr) => ({
        id: addr.id ?? crypto.randomUUID(),
        value: addr.value,
        coords: addr.coords,
      })) ?? null,
    createdAt: new Date(user.createdAt), // always cast to Date
  };
}
