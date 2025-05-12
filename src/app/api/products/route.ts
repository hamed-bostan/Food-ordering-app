import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}
