import { connectDB } from "@/lib/mongoose";
import { UserProfile } from "@/models/UserProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const user = await UserProfile.create(data);
  return NextResponse.json(user);
}
