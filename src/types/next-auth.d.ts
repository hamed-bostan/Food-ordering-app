import NextAuth from "next-auth";

declare module "next-auth" {
  // Define a reusable type for user roles
  type UserRole = "GitHub User" | "Google User" | string;

  // Define a type alias for your session user
  type SessionUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };

  // Override the default Session type to include your custom user shape
  interface Session {
    user: SessionUser; // ✅ Not optional anymore
  }
}
