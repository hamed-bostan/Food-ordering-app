import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  // Define all possible roles in your app
  export type UserRole = "GitHub User" | "Google User" | "user" | "admin";

  // Strongly typed user object for session
  export type SessionUser = {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    phoneNumber?: string;
  };

  // Extend Session with typed user
  export interface Session {
    user: SessionUser;
  }

  // Extend User (DB) object with typed role
  export interface User extends DefaultUser {
    role?: UserRole;
    phoneNumber?: string;
  }
}

declare module "next-auth/jwt" {
  import { UserRole } from "next-auth";

  // JWT payload typings
  export interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole;
    phoneNumber?: string;
  }
}
