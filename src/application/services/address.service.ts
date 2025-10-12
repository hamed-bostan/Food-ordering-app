import { AddressRepository } from "@/infrastructure/repositories/address.repository";
import { AddressType } from "../schemas/address.schema";

export const AddressService = {
  async fetchAll(userId: string, token: string) {
    try {
      return await AddressRepository.getAddresses(userId, token);
    } catch (err) {
      console.error("❌ [Service] Failed to fetch addresses:", err);
      throw err;
    }
  },

  async save(userId: string, addresses: AddressType[], token: string) {
    try {
      return await AddressRepository.saveAddresses(userId, addresses, token);
    } catch (err) {
      console.error("❌ [Service] Failed to save addresses:", err);
      throw err;
    }
  },
};
