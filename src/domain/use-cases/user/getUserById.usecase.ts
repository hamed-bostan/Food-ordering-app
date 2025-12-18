import { UserType } from "@/application/schemas/user.schema";
import { IUserRepository } from "@/domain/interfaces/iuser-repository";

export async function getUserByIdUseCase(repo: IUserRepository, userId: string): Promise<UserType> {
  const user = await repo.findById(userId);
  if (!user) throw new Error("User not found");

  return user;
}
