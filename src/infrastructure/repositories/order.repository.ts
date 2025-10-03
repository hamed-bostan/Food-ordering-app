import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { CreateOrderDtoType, OrderType } from "@/application/schemas/order.schema";

export const collectionName = "orders";

type NewOrderForDb = CreateOrderDtoType & { createdAt: string };

/**
 * Map MongoDB document to OrderType
 */
export function mapToOrderType(doc: any): OrderType {
  return {
    id: doc._id.toString(),
    branch: doc.branch,
    deliveryMethod: doc.deliveryMethod,
    paymentMethod: doc.paymentMethod,
    items: doc.items,
    totalPrice: doc.totalPrice,
    createdAt: new Date(doc.createdAt),
  };
}

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
  return docs.map(mapToOrderType);
}

/**
 * Fetch one order by ID
 */
export async function findOrderByIdInDb(orderId: string): Promise<OrderType | null> {
  if (!ObjectId.isValid(orderId)) throw new Error("Invalid order ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(orderId) });

  return doc ? mapToOrderType(doc) : null;
}
