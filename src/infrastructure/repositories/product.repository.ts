import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { CreateProductDtoType, ProductType } from "@/application/schemas/product.schema";

export const collectionName = "products";

type NewProductForDb = CreateProductDtoType & { createdAt: string };

/**
 * Map MongoDB document to ProductModel
 */
/**
 * Map MongoDB document to ProductType
 */
export function mapToProductType(doc: any): ProductType {
  return {
    id: doc._id.toString(),
    category: doc.category,
    image: doc.image,
    title: doc.title,
    description: doc.description,
    price: doc.price,
    discount: doc.discount,
    score: doc.score,
    filter: doc.filter ?? undefined,
    mostsale: doc.mostsale,
    createdAt: new Date(doc.createdAt), // convert to Date and include
  };
}

/**
 * Fetch a single product by MongoDB _id
 */
export async function findProductByIdInDb(productId: string): Promise<ProductType | null> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(productId) });

  return doc ? mapToProductType(doc) : null;
}

/**
 * Insert a new product
 */
export async function insertProductToDb(product: NewProductForDb): Promise<ObjectId> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(product);
  return result.insertedId;
}

/**
 * Fetch all products
 */
export async function fetchProductsFromDb(): Promise<ProductType[]> {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map(mapToProductType);
}

/**
 * Update a product by MongoDB _id
 */
export async function updateProductInDb(
  productId: string,
  update: Partial<Omit<ProductType, "id">>
): Promise<ProductType> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  // Prevent overwriting id
  if ("id" in update) delete (update as any).id;

  const db = await connectToDatabase();
  const updateResult = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(productId) }, { $set: update });

  if (updateResult.matchedCount === 0) throw new Error("Product not found");

  const updatedDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(productId) });
  if (!updatedDoc) throw new Error("Product not found after update");

  return mapToProductType(updatedDoc);
}

/**
 * Delete a product by MongoDB _id
 */
export async function deleteProductFromDb(productId: string): Promise<boolean> {
  if (!ObjectId.isValid(productId)) throw new Error("Invalid product ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(productId) });

  if (result.deletedCount === 0) throw new Error("Product not found or already deleted");

  return true;
}
