import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function GET() {
  await connectDB(); // Connect to MongoDB
  const products = await Product.find(); // Get all products from the collection
  return NextResponse.json(products); // Return as JSON
}
