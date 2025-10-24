import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbProductToDomain } from "../mappers/product.mapper";
import { ProductType } from "@/application/schemas/product.schema";
import { ProductRecordInsert, ProductRecordUpdate } from "../db/products/product.db.types";

export const collectionName = "products";

/**
 * Fetch a single product by ID
 */
export async function findProductByIdInDb(productId: string): Promise<ProductType | null> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(productId) });

  return doc ? mapDbProductToDomain(doc) : null;
}

/**
 * Insert a new product
 */
export async function insertProductToDb(product: ProductRecordInsert): Promise<string> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(product);
  return result.insertedId.toString();
}

/**
 * Fetch all products
 */
export async function fetchProductsFromDb(): Promise<ProductType[]> {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map(mapDbProductToDomain);
}

/**
 * Update a product
 */
export async function updateProductInDb(productId: string, update: ProductRecordUpdate): Promise<ProductType> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).updateOne({ _id: new ObjectId(productId) }, { $set: update });

  if (result.matchedCount === 0) throw new Error("Product not found");

  const updatedDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(productId) });
  if (!updatedDoc) throw new Error("Product not found after update");

  return mapDbProductToDomain(updatedDoc);
}

/**
 * Delete a product
 */
export async function deleteProductFromDb(productId: string): Promise<boolean> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(productId) });

  if (result.deletedCount === 0) throw new Error("Product not found or already deleted");

  return true;
}
