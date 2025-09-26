import { NextRequest } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { ForbiddenError, UnauthorizedError } from "@/domain/errors";

export async function requireSelfOrAdmin(req: NextRequest, userId: string) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) throw new UnauthorizedError("Missing token");

  const token = authHeader.split(" ")[1];
  const payload = verifyJWT(token);
  if (payload.id !== userId && payload.role !== "admin") throw new ForbiddenError("Access denied");

  return payload;
}
