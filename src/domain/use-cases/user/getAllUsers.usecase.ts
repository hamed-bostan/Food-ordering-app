import { UserType } from "@/application/schemas/user.schema";
import { IUserRepository } from "@/domain/interfaces/iuser-repository";

/**
 * Use case: Fetch all users (admin-only)
 */
export async function getAllUsersUseCase(repo: IUserRepository): Promise<UserType[]> {
  return await repo.findAll();
}
