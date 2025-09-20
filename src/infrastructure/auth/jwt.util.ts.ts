import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { UserRole } from "@/types/user.types";

export type JWTPayload = { id?: string; role?: UserRole; [key: string]: any };

export function verifyJWT(req: NextRequest): JWTPayload {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or malformed token");
  }

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JWTPayload;
  } catch {
    throw new Error("Forbidden: Invalid or expired token");
  }
}
