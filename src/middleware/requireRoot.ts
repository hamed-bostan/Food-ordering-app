import { NextRequest } from "next/server";
import { UnauthorizedError, ForbiddenError } from "@/domain/errors";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";

export async function requireRoot(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Missing or invalid authorization header");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Missing token");
  }

  const payload = verifyJWT(token);

  // Only root allowed
  if (payload.role !== "root") {
    throw new ForbiddenError("Only root can access this resource");
  }

  return payload;
}
