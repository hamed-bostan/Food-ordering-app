import { ObjectId } from "mongodb";
import { NewProductType, ProductType } from "@/lib/schemas/product.schema";
import { connectToDatabase } from "./mongodb";
import { handleDbError } from "../utils/handleDbError";

export const collectionName = "products";

export function mapToProductType(doc: any, id?: string): ProductType {
  return {
    id: id || doc._id.toString(),
    category: doc.category,
    image: doc.image,
    title: doc.title,
    description: doc.description,
    price: doc.price,
    discount: doc.discount,
    score: doc.score,
    filter: doc.filter,
    mostsale: doc.mostsale,
  };
}

export async function insertProductToDb(product: NewProductType): Promise<ObjectId> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(product);
    return result.insertedId;
  } catch (error) {
    handleDbError(error, "Failed to insert product into MongoDB");
  }
}

export async function fetchProductsFromDb(): Promise<ProductType[]> {
  try {
    const db = await connectToDatabase();
    const products = await db.collection(collectionName).find({}).toArray();
    return products.map((doc) => mapToProductType(doc));
  } catch (error) {
    handleDbError(error, "Failed to fetch products");
  }
}
