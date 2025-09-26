import { NextRequest } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { UnauthorizedError, ForbiddenError } from "@/domain/errors";

export async function requireAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing or invalid authorization header");
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyJWT(token);

  if (payload.role !== "admin") {
    throw new ForbiddenError("Admins only");
  }

  return payload;
}
