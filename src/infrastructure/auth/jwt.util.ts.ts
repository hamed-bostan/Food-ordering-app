import jwt from "jsonwebtoken";
import { UserRoleType } from "@/application/schemas/user.schema";

export type JWTPayload = { id?: string; role?: UserRoleType; [key: string]: any };

export function verifyJWT(token: string): JWTPayload {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET!) as JWTPayload;
  } catch {
    throw new Error("Forbidden: Invalid or expired token");
  }
}
