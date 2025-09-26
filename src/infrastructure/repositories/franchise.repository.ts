import { connectToDatabase } from "@/infrastructure/db/mongodb";

export const collectionName = "franchises";

export async function insertFranchiseToDb(data: Record<string, unknown>) {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(data);

  if (!result.insertedId) {
    throw new Error("Failed to insert franchise");
  }

  return { id: result.insertedId.toHexString(), ...data };
}

export async function fetchFranchisesFromDb() {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map((doc) => ({ id: doc._id.toHexString(), ...doc }));
}
