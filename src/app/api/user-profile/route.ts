import { connectDB } from "@/lib/mongoose";
import { UserProfile } from "@/models/UserProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Connects to the MongoDB database
  await connectDB();

  // Get the data sent from the client (like form input)
  const data = await req.json();

  // Save the data as a new user in the database
  const user = await UserProfile.create(data);

  // Send the saved user back to the client as a response
  return NextResponse.json(user);
}
