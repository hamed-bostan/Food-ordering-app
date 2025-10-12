import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { CreateOrderDtoType, OrderType } from "@/application/schemas/order.schema";
import { mapDbOrderToDomain } from "../mappers/order.mapper";

export const collectionName = "orders";

type NewOrderForDb = CreateOrderDtoType & {
  createdAt: string;
};

/**
 * Insert a new order into MongoDB
 */
export async function insertOrderToDb(order: NewOrderForDb): Promise<ObjectId> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(collectionName).insertOne(order);
    return result.insertedId;
  } catch (error) {
    console.error("❌ [Repository] Failed to insert order:", error);
    throw new Error("Database error while inserting order");
  }
}

/**
 * Fetch all orders
 */
export async function fetchOrdersFromDb(): Promise<OrderType[]> {
  try {
    const db = await connectToDatabase();
    const docs = await db.collection(collectionName).find({}).toArray();

    return docs.map(mapDbOrderToDomain);
  } catch (error) {
    console.error("❌ [Repository] Failed to fetch orders:", error);
    throw new Error("Database error while fetching orders");
  }
}

/**
 * Fetch a single order by ID
 */
export async function findOrderByIdInDb(orderId: string): Promise<OrderType | null> {
  try {
    if (!ObjectId.isValid(orderId)) {
      throw new Error("Invalid order ID");
    }

    const db = await connectToDatabase();
    const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(orderId) });

    return doc ? mapDbOrderToDomain(doc) : null;
  } catch (error) {
    console.error(`❌ [Repository] Failed to fetch order with ID ${orderId}:`, error);
    throw new Error("Database error while fetching order by ID");
  }
}
