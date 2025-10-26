import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbOrderToDomain } from "../mappers/order.mapper";
import { CreateOrderDtoType } from "@/application/dto/orders/order.dto";
import { OrderType } from "@/application/schemas/order.schema";

export const collectionName = "orders";

type NewOrderForDb = Omit<CreateOrderDtoType, "id"> & {
  _id?: ObjectId;
  createdAt: string;
};

/**
 * Insert a new order into MongoDB
 */
export async function insertOrderToDb(order: NewOrderForDb): Promise<string> {
  try {
    const db = await connectToDatabase();
    const result = await db.collection(collectionName).insertOne(order);
    return result.insertedId.toString(); // Convert ObjectId to string
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
    if (!ObjectId.isValid(orderId)) throw new Error("Invalid order ID");

    const db = await connectToDatabase();
    const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(orderId) });

    return doc ? mapDbOrderToDomain(doc) : null;
  } catch (error) {
    console.error(`❌ [Repository] Failed to fetch order with ID ${orderId}:`, error);
    throw new Error("Database error while fetching order by ID");
  }
}

/**
 * Update an existing order by ID
 */
export async function updateOrderInDb(orderId: string, updatedFields: Partial<OrderType>): Promise<OrderType> {
  if (!ObjectId.isValid(orderId)) throw new Error("Invalid order ID");

  const db = await connectToDatabase();

  const result = await db.collection(collectionName).updateOne({ _id: new ObjectId(orderId) }, { $set: updatedFields });

  if (result.matchedCount === 0) throw new Error("Order not found");

  const updatedDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(orderId) });

  if (!updatedDoc) throw new Error("Order not found after update");

  return mapDbOrderToDomain(updatedDoc);
}

/**
 * Delete an order by ID
 */
export async function deleteOrderFromDb(orderId: string): Promise<boolean> {
  if (!ObjectId.isValid(orderId)) throw new Error("Invalid order ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(orderId) });

  if (result.deletedCount === 0) throw new Error("Order not found or already deleted");

  return true;
}
