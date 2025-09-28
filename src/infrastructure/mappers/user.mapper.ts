import { UserType } from "@/application/schemas/user.schema";
import { DbUser } from "../repositories/user.repository";

export function mapDbUserToDomain(user: DbUser): UserType {
  if (!user.createdAt) {
    throw new Error("Missing createdAt in DbUser"); // Runtime safeguard; adjust message/log as needed
  }

  return {
    id: user._id.toHexString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
    name: user.name ?? null,
    email: user.email ?? null,
    image: user.image ?? undefined,
    createdAt: new Date(user.createdAt), // Now always Date; TS happy
    date: user.date ? new Date(user.date) : undefined,
    address: user.address ? { value: user.address.value, coords: user.address.coords } : null,
  };
}
