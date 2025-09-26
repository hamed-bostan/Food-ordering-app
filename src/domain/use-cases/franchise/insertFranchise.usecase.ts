import { insertFranchiseToDb } from "@/infrastructure/repositories/franchise.repository";

export async function insertFranchise(data: Record<string, unknown>) {
  // You can add validation or business logic here (e.g., check required fields)
  return insertFranchiseToDb(data);
}
