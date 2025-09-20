import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/infrastructure/db/mongodb";
import jwt from "jsonwebtoken";
import { MongoUser, UserRole } from "@/types/user.types";
import { normalizeUser } from "@/infrastructure/repositories/user.normalize";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";


/**
 * GET /api/admin/users
 * Admin-only: Fetch all users
 */
export async function GET(req: NextRequest) {
  try {
    // Verify JWT from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Forbidden", message: "Missing or invalid token" }, { status: 403 });
    }
    const token = authHeader.split(" ")[1];

    let payload: { id?: string; role?: UserRole };
    try {
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { id?: string; role?: UserRole };
    } catch {
      return NextResponse.json({ error: "Forbidden", message: "Invalid token" }, { status: 403 });
    }

    // Admin only
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Fetch all users
    const users = await usersCollection.find({}).toArray();

    // Normalize DB documents into safe user objects
    const normalizedUsers = users.map((u) => normalizeUser(u as MongoUser & { _id: any }));

    // Standardized message + result
    return NextResponse.json(
      {
        message: "Users fetched successfully",
        result: normalizedUsers,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Users API - GET");
  }
}
