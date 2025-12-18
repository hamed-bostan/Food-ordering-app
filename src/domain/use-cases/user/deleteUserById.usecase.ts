import { ValidationError } from "@/domain/errors";
import { IUserRepository } from "@/domain/interfaces/iuser-repository";

export async function deleteUserByIdUseCase(repo: IUserRepository, userId: string): Promise<boolean> {
  const user = await repo.findById(userId);
  if (!user) throw new ValidationError("User not found");

  return await repo.delete(userId);
}
