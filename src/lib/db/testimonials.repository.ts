import { NewTestimonialType, TestimonialType } from "@/app/branch/lib/testimonial.schema";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

export type TestimonialDocument = {
  _id: ObjectId;
  image: string;
  name: string;
  date: string;
  comment: string;
};

const collectionName = "testimonials";

export function mapToTestimonialType(doc: TestimonialDocument): TestimonialType {
  return {
    id: doc._id.toString(),
    image: doc.image,
    name: doc.name,
    date: doc.date,
    comment: doc.comment,
  };
}

export async function insertTestimonialToDb(testimonial: NewTestimonialType): Promise<ObjectId> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<NewTestimonialType>(collectionName);
    const result = await collection.insertOne(testimonial);
    return result.insertedId;
  } catch (error) {
    console.error("❌ Failed to insert testimonial into MongoDB:", error);
    throw new Error("Database insert failed");
  }
}

export async function fetchTestimonialsFromDb(): Promise<TestimonialType[]> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<TestimonialDocument>(collectionName);
    const testimonials = await collection.find({}).toArray();
    return testimonials.map(mapToTestimonialType);
  } catch (error) {
    console.error("❌ Failed to fetch testimonials from MongoDB:", error);
    throw new Error("Database fetch failed");
  }
}
