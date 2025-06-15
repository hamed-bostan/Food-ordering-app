import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      phone_number: user.phone_number ?? "",
      name: user.name ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
    });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
