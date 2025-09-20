import { ObjectId } from "mongodb";
import { NewTestimonialModel, TestimonialModel } from "@/domain/testimonial.schema";
import { connectToDatabase } from "@/infrastructure/db/mongodb";

export const collectionName = "testimonials";

/**
 * Map MongoDB document to TestimonialType
 */
export function mapToTestimonialType(doc: any): TestimonialModel {
  return {
    id: doc._id.toString(),
    image: doc.image,
    name: doc.name,
    date: doc.date,
    comment: doc.comment,
  };
}

/**
 * Fetch a single testimonial by MongoDB _id
 */
export async function findTestimonialByIdInDb(testimonialId: string): Promise<TestimonialModel | null> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  const db = await connectToDatabase();
  const doc = await db.collection(collectionName).findOne({ _id: new ObjectId(testimonialId) });

  return doc ? mapToTestimonialType(doc) : null;
}

/**
 * Insert a new testimonial
 */
export async function insertTestimonialToDb(testimonial: NewTestimonialModel): Promise<ObjectId> {
  const db = await connectToDatabase();
  const result = await db.collection(collectionName).insertOne(testimonial);
  return result.insertedId;
}

/**
 * Fetch all testimonials
 */
export async function fetchTestimonialsFromDb(): Promise<TestimonialModel[]> {
  const db = await connectToDatabase();
  const docs = await db.collection(collectionName).find({}).toArray();
  return docs.map(mapToTestimonialType);
}

/**
 * Update a testimonial by MongoDB _id
 */
export async function updateTestimonialInDb(
  testimonialId: string,
  update: Partial<Pick<TestimonialModel, "name" | "image" | "date" | "comment">>
): Promise<TestimonialModel> {
  if (!ObjectId.isValid(testimonialId)) throw new Error("Invalid testimonial ID");

  if ("id" in update) delete (update as any).id; // Prevent overwriting _id/id

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
