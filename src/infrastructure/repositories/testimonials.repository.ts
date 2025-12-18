import { ObjectId } from "mongodb";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbTestimonialToDomain } from "../mappers/testimonial.mapper";
import { ITestimonialRepository } from "@/domain/interfaces/ITestimonialRepository";
import { TestimonialInsertInput, TestimonialUpdateInput } from "@/application/dto/testimonial/testimonial.dto";

export class TestimonialRepository implements ITestimonialRepository {
  private collectionName = "testimonials";

  async insertTestimonial(testimonial: TestimonialInsertInput): Promise<string> {
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).insertOne(testimonial);
    return result.insertedId.toString();
  }

  async fetchTestimonials(): Promise<TestimonialType[]> {
    const db = await connectToDatabase();
    const docs = await db.collection(this.collectionName).find({}).toArray();
    return docs.map(mapDbTestimonialToDomain);
  }

  async fetchTestimonialById(id: string): Promise<TestimonialType | null> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid testimonial ID");
    const db = await connectToDatabase();
    const doc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    return doc ? mapDbTestimonialToDomain(doc) : null;
  }

  async updateTestimonial(id: string, update: TestimonialUpdateInput): Promise<TestimonialType> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid testimonial ID");
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.matchedCount === 0) throw new Error("Testimonial not found");
    const updatedDoc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    if (!updatedDoc) throw new Error("Testimonial not found after update");
    return mapDbTestimonialToDomain(updatedDoc);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) throw new Error("Invalid testimonial ID");
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("Testimonial not found or already deleted");
    return true;
  }
}