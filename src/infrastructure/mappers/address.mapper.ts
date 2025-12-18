import { ObjectId } from "mongodb";
import { AddressType } from "@/application/schemas/address.schema";
import { AddressCreateType, AddressUpdateType } from "@/application/schemas/address.form.schema";

export function normalizeAddress(
  address: AddressCreateType[] | AddressUpdateType[] | undefined
): AddressType[] | undefined {
  if (!address) return undefined;

  return address.map((addr) => ({
    id: "id" in addr && addr.id ? addr.id : new ObjectId().toString(),
    value: addr.value,
    coords: addr.coords,
  }));
}
