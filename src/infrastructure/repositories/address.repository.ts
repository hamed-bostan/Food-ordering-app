import { AddressType } from "@/application/schemas/address.schema";
import { getUserById, updateUserProfile } from "../apis/user.api";

export const AddressRepository = {
  async getAddresses(userId: string, token: string): Promise<AddressType[]> {
    const user = await getUserById(userId, token);
    return user.result.address || [];
  },

  async saveAddresses(userId: string, addresses: AddressType[], token: string) {
    const updated = await updateUserProfile(userId, { address: addresses }, token);
    return updated.result.address || [];
  },
};
