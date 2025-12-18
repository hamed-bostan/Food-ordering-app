import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbOrderToDomain } from "../mappers/order.mapper";
import { OrderType } from "@/application/schemas/order.schema";
import { IOrderRepository } from "@/domain/interfaces/IOrderRepository";
import {
  CreateOrderDtoType as OrderCreateInput,
  UpdateOrderDtoType as OrderUpdateInput,
} from "@/application/dto/orders/order.dto";

export class OrderRepository implements IOrderRepository {
  private collectionName = "orders";

  async insertOrder(order: OrderCreateInput): Promise<string> {
    const db = await connectToDatabase();
    const insertData = { ...order, createdAt: new Date().toISOString() };
    const result = await db.collection(this.collectionName).insertOne(insertData);
    return result.insertedId.toString();
  }

  async fetchOrders(): Promise<OrderType[]> {
    const db = await connectToDatabase();
    const docs = await db.collection(this.collectionName).find({}).toArray();
    return docs.map(mapDbOrderToDomain);
  }

  async fetchOrderById(id: string): Promise<OrderType | null> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid order ID");
    const db = await connectToDatabase();
    const doc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    return doc ? mapDbOrderToDomain(doc) : null;
  }

  async updateOrder(id: string, update: OrderUpdateInput): Promise<OrderType> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid order ID");
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.matchedCount === 0) throw new Error("Order not found");
    const updatedDoc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) throw new Error("Order not found after update");
    return mapDbOrderToDomain(updatedDoc);
  }

  async deleteOrder(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid order ID");
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Order not found or already deleted");
    return true;
  }
}
