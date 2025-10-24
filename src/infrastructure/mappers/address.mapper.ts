import { ObjectId } from "mongodb";
import { UserCreateDto, UserUpdateDto } from "@/application/dto/users/user.dto";

/**
 * Normalizes an address array — ensures each address has a unique `id`.
 */
export function normalizeAddress(address?: UserCreateDto["address"] | UserUpdateDto["address"]) {
  return (
    address?.map((addr) => ({
      id: addr.id ?? new ObjectId().toString(),
      value: addr.value,
      coords: addr.coords,
    })) ?? null
  );
}
