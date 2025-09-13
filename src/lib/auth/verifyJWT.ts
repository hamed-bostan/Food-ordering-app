import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { UserRole } from "@/lib/user/user.types";

/**
 * Verifies JWT from Authorization header.
 * Returns the decoded payload if valid.
 * Throws an error if missing, invalid, or expired.
 */
export function verifyJWT(req: NextRequest): { id?: string; role?: UserRole } {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or malformed token");
  }

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as { id?: string; role?: UserRole };
  } catch (err) {
    throw new Error("Forbidden: Invalid or expired token");
  }
}
