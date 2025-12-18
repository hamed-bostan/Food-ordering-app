import { UserType } from "@/application/schemas/user.schema";
import { UserCreateDto, UserUpdateDto } from "@/application/dto/users/user.dto";

export interface IUserRepository {
  findAll(): Promise<UserType[]>;
  findById(id: string): Promise<UserType | null>;
  findByPhone(phone: string): Promise<UserType | null>;
  create(user: UserCreateDto): Promise<UserType>;
  update(id: string, update: UserUpdateDto): Promise<UserType>;
  delete(id: string): Promise<boolean>;
}
