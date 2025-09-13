import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { normalizeUser } from "@/lib/user/user.utils";
import { UserRole } from "@/lib/user/user.types";
import { handleApiError } from "@/lib/errors/handleApiError";

/**
 * GET /api/user/[id]
 * Fetch a user by ID (self or admin only)
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Validate user ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid user ID" }, { status: 400 });
    }

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

    // Only allow self or admin
    if (payload.id !== id && payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Access denied" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return NextResponse.json({ error: "NotFound", message: "User not found" }, { status: 404 });
    }

    // ✅ Return standardized message + result
    return NextResponse.json({
      message: "User fetched successfully",
      result: normalizeUser(user),
    });
  } catch (error: unknown) {
    return handleApiError(error, "User API - GET");
  }
}

/**
 * PUT /api/user/[id]
 * Update a user by ID (self or admin only)
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Validate user ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid user ID" }, { status: 400 });
    }

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

    // Only allow self or admin
    if (payload.id !== id && payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Access denied" }, { status: 403 });
    }

    const body = await req.json();

    // Prevent _id from being updated
    delete body._id;

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Update the document
    const updateResult = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: body });

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "NotFound", message: "User not found" }, { status: 404 });
    }

    // Fetch updated user
    const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!updatedUser) {
      return NextResponse.json({ error: "NotFound", message: "User not found after update" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      result: normalizeUser(updatedUser),
    });
  } catch (error: unknown) {
    return handleApiError(error, "User API - PUT");
  }
}
