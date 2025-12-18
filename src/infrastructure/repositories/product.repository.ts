import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbProductToDomain } from "../mappers/product.mapper";
import { ProductType } from "@/application/schemas/product.schema";
import { IProductRepository } from "@/domain/interfaces/IProductRepository";
import { ProductRecordInsert, ProductRecordUpdate } from "../db/products/product.db.types";
import { ProductCreateInput, ProductUpdateInput } from "@/application/dto/products/product.dto";

export class ProductRepository implements IProductRepository {
  private collectionName = "products";

  async insertProduct(product: ProductCreateInput): Promise<string> {
    const db = await connectToDatabase();
    const insertData: ProductRecordInsert = product as ProductRecordInsert; // Type cast if needed (assumes alignment)
    const result = await db.collection(this.collectionName).insertOne(insertData);
    return result.insertedId.toString();
  }

  async fetchProducts(): Promise<ProductType[]> {
    const db = await connectToDatabase();
    const docs = await db.collection(this.collectionName).find({}).toArray();
    return docs.map(mapDbProductToDomain);
  }

  async fetchProductById(id: string): Promise<ProductType | null> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const db = await connectToDatabase();
    const doc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    return doc ? mapDbProductToDomain(doc) : null;
  }

  async updateProduct(id: string, update: ProductUpdateInput): Promise<ProductType> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const db = await connectToDatabase();
    const updateData: ProductRecordUpdate = update as ProductRecordUpdate; // Type cast if needed (assumes alignment)
    const result = await db.collection(this.collectionName).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    if (result.matchedCount === 0) throw new Error("Product not found");
    const updatedDoc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) throw new Error("Product not found after update");
    return mapDbProductToDomain(updatedDoc);
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid product ID");
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Product not found or already deleted");
    return true;
  }
}
