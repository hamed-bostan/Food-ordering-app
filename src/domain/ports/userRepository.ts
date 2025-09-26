import { UserType } from "@/application/schemas/user.schema";

export interface IUserRepository {
  fetchAll(): Promise<UserType[]>;
  findById(id: string): Promise<UserType | null>;
  findByPhone(phone: string): Promise<UserType | null>;
  insert(user: { phoneNumber: string; role: string }): Promise<string>; // returns inserted id
  updateById(id: string, patch: Partial<UserType>): Promise<UserType>;
  deleteById(id: string): Promise<void>;
}
