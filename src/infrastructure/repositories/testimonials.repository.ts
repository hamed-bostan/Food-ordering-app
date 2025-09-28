import { ObjectId } from "mongodb";
import {
  CreateTestimonialDtoType,
  TestimonialSchema,
  TestimonialType,
  UpdateTestimonialDtoType,
} from "@/application/schemas/testimonial.schema";
import { connectToDatabase } from "@/infrastructure/db/mongodb";

export const collectionName = "testimonials";

/**
 * Map MongoDB document to domain entity (TestimonialType)
 */
export function mapToTestimonialType(doc: any): TestimonialType {
  const mapped = {
    id: doc._id.toString(),
    image: doc.image,
    name: doc.name,
    date: doc.date,
    comment: doc.comment,
    createdAt: new Date(doc.createdAt), // convert string -> Date
  };
  return TestimonialSchema.parse(mapped); // validate before returning
}

/**
 * Fetch a single testimonial by MongoDB _id
 */
export async function findTestimonialByIdInDb(testimonialId: string): Promise<TestimonialType | null> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(testimonialId) });

  return doc ? mapToTestimonialType(doc) : null;
}

/**
 * Insert a new testimonial
 */
export async function insertTestimonialToDb(
  testimonial: CreateTestimonialDtoType & { createdAt: string }
): Promise<string> {
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
  return docs.map(mapToTestimonialType);
}

/**
 * Update a testimonial by MongoDB _id
 */
export async function updateTestimonialInDb(
  testimonialId: string,
  update: UpdateTestimonialDtoType
): Promise<TestimonialType> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const updateResult = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(testimonialId) }, { $set: update });

  if (updateResult.matchedCount === 0) throw new Error("Testimonial not found");

  const updatedDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(testimonialId) });
  if (!updatedDoc) throw new Error("Testimonial not found after update");

  return mapToTestimonialType(updatedDoc);
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
