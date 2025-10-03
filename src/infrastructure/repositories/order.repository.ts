import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { CreateOrderDtoType, OrderType } from "@/application/schemas/order.schema";
import { mapDbOrderToDomain } from "../mappers/order.mapper";

export const collectionName = "orders";

type NewOrderForDb = CreateOrderDtoType & { createdAt: string };

/**
 * Insert a new order
 */
export async function insertOrderToDb(order: NewOrderForDb): Promise<ObjectId> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(order);
  return result.insertedId;
}

/**
 * Fetch all orders
 */
export async function fetchOrdersFromDb(): Promise<OrderType[]> {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map(mapDbOrderToDomain);
}

/**
 * Fetch one order by ID
 */
export async function findOrderByIdInDb(orderId: string): Promise<OrderType | null> {
  if (!ObjectId.isValid(orderId)) throw new Error("Invalid order ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(orderId) });

  return doc ? mapDbOrderToDomain(doc) : null;
}
