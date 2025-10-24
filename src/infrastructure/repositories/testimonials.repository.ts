import { ObjectId } from "mongodb";
import { TestimonialType } from "@/application/schemas/testimonial.schema";
import { connectToDatabase } from "@/infrastructure/db/mongodb";
import { mapDbTestimonialToDomain } from "../mappers/testimonial.mapper";
import { TestimonialRecordInsert, TestimonialRecordUpdate } from "../db/testimonial/testimonial.db.types";

export const collectionName = "testimonials";

/**
 * Fetch a single testimonial by MongoDB _id
 */
export async function findTestimonialByIdInDb(testimonialId: string): Promise<TestimonialType | null> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(testimonialId) });

  return doc ? mapDbTestimonialToDomain(doc) : null;
}

/**
 * Insert a new testimonial
 */

export async function insertTestimonialToDb(testimonial: TestimonialRecordInsert): Promise<string> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(testimonial);
  return result.insertedId.toString();
}

/**
 * Fetch all testimonials
 */
export async function fetchTestimonialsFromDb(): Promise<TestimonialType[]> {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map(mapDbTestimonialToDomain);
}

/**
 * Update a testimonial by MongoDB _id
 */
export async function updateTestimonialInDb(
  testimonialId: string,
  update: TestimonialRecordUpdate
): Promise<TestimonialType> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const updateResult = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(testimonialId) }, { $set: update });

  if (updateResult.matchedCount === 0) throw new Error("Testimonial not found");

  const updatedDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(testimonialId) });
  if (!updatedDoc) throw new Error("Testimonial not found after update");

  return mapDbTestimonialToDomain(updatedDoc);
}

/**
 * Delete a testimonial by MongoDB _id
 */
export async function deleteTestimonialFromDb(testimonialId: string): Promise<boolean> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(testimonialId) });

  if (result.deletedCount === 0) throw new Error("Testimonial not found or already deleted");

  return true;
}
