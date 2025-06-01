// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  // use type aliases inside the module instead of interfaces
  type UserRole = "GitHub User" | "Google User" | string;

  // Extend User type
  type ExtendedUser = {
    role?: UserRole;
  };

  // Extend Session user type
  type ExtendedSessionUser = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
  };

  interface User extends ExtendedUser {}
  interface Session {
    user: ExtendedSessionUser;
  }
}
