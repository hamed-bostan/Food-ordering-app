import { NewTestimonialType, TestimonialType } from "@/app/branch/lib/testimonial.schema";
import { handleDbError } from "../utils/handleDbError";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

const collectionName = "testimonials";

export function mapToTestimonialType(doc: any, id?: string): TestimonialType {
  return {
    id: id || doc._id.toString(),
    image: doc.image,
    name: doc.name,
    date: doc.date,
    comment: doc.comment,
  };
}

export async function insertTestimonialToDb(testimonial: NewTestimonialType): Promise<ObjectId> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(testimonial);
    return result.insertedId;
  } catch (error) {
    handleDbError(error, "Failed to insert testimonial into MongoDB");
  }
}

export async function fetchTestimonialsFromDb(): Promise<TestimonialType[]> {
  try {
    const db = await connectToDatabase();
    const testimonials = await db.collection(collectionName).find({}).toArray();
    return testimonials.map((doc) => mapToTestimonialType(doc));
  } catch (error) {
    handleDbError(error, "Failed to fetch testimonials");
  }
}
